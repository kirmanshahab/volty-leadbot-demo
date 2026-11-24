import { defineAutomation, z } from '~/automation'

// Replace with your own values before deploying: the staff user to alert, and the web chat inbox id.
const OWNER = 'YOUR_OWNER_USER_ID'

type Msg = { id: string; role: string; text?: string | null; createdAt?: string }

const TIMELINE: Record<string, string> = { now: 'now', 'in 1 to 3 months': '1-3 months', 'just exploring': 'just exploring' }
const TOOLS = ['Spreadsheets', 'Another helpdesk', 'Nothing']
const TEAMS = ['Just me', '2 to 5', '6 to 20', '20+']
const VOLUMES = ['<500', '500-2k', '2k-10k', '10k+']
const PAINS = ['slow replies', 'repetitive questions', 'leads slipping through', 'no visibility']
const INDUSTRIES = ['Education', 'Clinics & Spas', 'B2B', 'E-commerce', 'Retail', 'Other']

// Used only for old cards that carry no "start:" part.
function timelineOf(l: string): string | undefined {
  if (TIMELINE[l]) return TIMELINE[l]
  if (/just exploring|browsing|not sure|someday|no rush|later/.test(l)) return 'just exploring'
  if (/now|asap|today|immediately|this week|right away/.test(l)) return 'now'
  const months = /(\d+)\s*(?:-|to)?\s*(\d+)?\s*month/.exec(l)
  if (months) return Number(months[1]) <= 3 ? '1-3 months' : 'just exploring'
  if (/next month|soon|few months|couple of months/.test(l)) return '1-3 months'
  return undefined
}

// One run per visit: starts when the conversation is created, checks the transcript every 45 seconds
// until the summary card appears (quick path finished) or Volty takes over, then stores the lead once.
// Scoring rule (same as the instructions): hot = 2k+ conversations a month and start now (any number of
// channels), or 500-2k and start now with 2+ channels. A skipped follow-up lowers the score one level.
export default defineAutomation({
  id: 'lead-capture',
  trigger: { kind: 'event', name: 'conversation.created', filter: { inboxId: 'YOUR_WEB_CHAT_INBOX_ID' } },
  input: z.object({ conversationId: z.string().optional() }),
  output: z.object({ stored: z.boolean(), reason: z.string().optional(), score: z.string().optional(), count: z.number().optional() }),
  async run({ input, ctx }) {
    const sortByTime = (list: Msg[]) =>
      [...list].sort((a, b) => {
        const ta = a.createdAt ?? ''
        const tb = b.createdAt ?? ''
        return ta < tb ? -1 : ta > tb ? 1 : 0
      })
    const isCard = (m: Msg) => m.role === 'system' && (m.text ?? '').startsWith("Here's your Volty fit")

    // Reads the finished quick path in a transcript and stores the lead. Used by the one-run-per-visit path
    // and by the catch-up path below.
    const store = async (conversationId: string, chrono: Msg[], onlyIfChanged = false) => {
      const cardMsg = chrono.find((m) => m.role === 'system' && (m.text ?? '').startsWith("Here's your Volty fit")) as Msg
      const lines = (cardMsg.text ?? '').split('\n')
      const title = lines[0] ?? ''
      const commaAt = title.indexOf(', ')
      // no name in the title means the visitor skipped the follow-up
      const skipped = commaAt < 0
      let name: string | undefined = commaAt >= 0 ? title.slice(commaAt + 2).trim().slice(0, 60) : undefined

      const basisLine = lines.find((x) => x.includes('Based on: ')) ?? ''
      const parts = basisLine.slice(basisLine.indexOf('Based on: ') + 10).split(' · ')
      const industryRaw = parts[0]
      const industry = INDUSTRIES.includes(industryRaw) ? industryRaw : undefined
      const channelPart = parts[1] ?? ''
      const channelRaw = channelPart.split(' +')[0]
      const channel = channelRaw && channelRaw !== 'Other' ? channelRaw : channelRaw === 'Other' ? 'Other' : undefined
      const extra = channelPart.includes('+2') ? 2 : channelPart.includes('+1') ? 1 : 0
      const volumeRaw = (parts[2] ?? '').replace(' a month', '')
      const volume = VOLUMES.includes(volumeRaw) ? volumeRaw : undefined
      const pain = PAINS.includes(parts[3] ?? '') ? parts[3] : undefined
      let tool: string | undefined
      let team: string | undefined
      let timeline: string | undefined
      for (const p of parts.slice(4)) {
        if (p.startsWith('tool: ') && TOOLS.includes(p.slice(6))) tool = p.slice(6)
        else if (p.startsWith('team: ') && TEAMS.includes(p.slice(6))) team = p.slice(6)
        else if (p.startsWith('start: ')) timeline = ['now', '1-3 months', 'just exploring'].includes(p.slice(7)) ? p.slice(7) : undefined
      }

      // email, WhatsApp number and company come from what the visitor typed; values stay as the transcript shows them
      let email: string | undefined
      let phone: string | undefined
      let company: string | undefined
      for (let i = 1; i < chrono.length; i++) {
        const m = chrono[i]
        if (m.role !== 'contact') continue
        let j = i - 1
        while (j > 0 && chrono[j].role === 'contact') j--
        const q = (chrono[j].text ?? '').toLowerCase()
        const a = (m.text ?? '').trim()
        if (!timeline && q.includes('when are you looking')) timeline = timelineOf(a.toLowerCase())
        else if (q.includes('work email')) email = a.slice(0, 200)
        else if (q.includes('whatsapp number')) phone = a.slice(0, 60)
        else if (q.includes('company name')) company = /^(skip|none|no|n\/a|-)$/i.test(a) ? undefined : a.slice(0, 80)
        else if (!name && q.includes("what's your name")) name = a.slice(0, 60)
      }

      const channelsCount = (channel ? 1 : 0) + extra
      const big = volume === '2k-10k' || volume === '10k+'
      let score: 'hot' | 'warm' | 'cold'
      if (timeline === 'now' && (big || (volume === '500-2k' && channelsCount >= 2))) score = 'hot'
      else if (timeline === 'just exploring' || (volume === '<500' && timeline !== 'now')) score = 'cold'
      else score = 'warm'
      if (skipped) score = score === 'hot' ? 'warm' : 'cold'

      const attributes: Record<string, string> = { lead_score: score }
      if (industry) attributes.industry = industry
      if (channel) attributes.channels_used = extra > 0 ? `${channel} (+${extra === 2 ? '2 or more' : '1'} other)` : channel
      if (volume) attributes.monthly_volume = volume
      if (pain) attributes.main_pain = pain
      if (tool) attributes.current_tool = tool
      if (team) attributes.team_size = team
      if (timeline) attributes.timeline = timeline
      if (company) attributes.company = company

      const conv = (await ctx.volty.conversations.get({ conversationId: conversationId })) as {
        contactId?: string
        conversation?: { contactId?: string }
      }
      const contactId = conv.contactId ?? conv.conversation?.contactId
      if (!contactId) return { stored: false, reason: 'no contact' }

      // catch-up runs only act when the stored score would change, so a rerun never alerts twice
      if (onlyIfChanged) {
        const res = (await ctx.volty.contacts.get({ id: contactId })) as { contact?: { attributes?: Record<string, unknown> } }
        if (res.contact?.attributes?.lead_score === score) return { stored: false, reason: 'already stored' }
      }

      const labels = ['lead:hot', 'lead:warm', 'lead:cold']
      await ctx.volty.contacts.update({
        id: contactId,
        attributes,
        addSegments: [`lead:${score}`],
        removeSegments: labels.filter((x) => x !== `lead:${score}`),
        ...(name && name !== '-' ? { displayName: name } : {}),
      })

      // A routine cannot write a contact's email or phone identifier, so what the visitor typed is kept in two
      // text fields. The transcript holds personal data as tokens, so each value is expanded first (a logged
      // call). Best effort: a failure here must not lose the lead above.
      const typed: Record<string, string> = {}
      try {
        if (email) {
          const e = (await ctx.volty.privacy.expand({ text: email })) as { text: string; unknown?: string[] }
          if (!(e.unknown ?? []).length) typed.stated_email = e.text
        }
        if (phone) {
          const p = (await ctx.volty.privacy.expand({ text: phone })) as { text: string; unknown?: string[] }
          if (!(p.unknown ?? []).length) typed.stated_phone = p.text
        }
        if (Object.keys(typed).length > 0) await ctx.volty.contacts.update({ id: contactId, attributes: typed })
      } catch {
        // left in the transcript only
      }

      if (score === 'hot') {
        try {
          await ctx.volty.conversations.setPriority({ ids: [conversationId], priority: 'high' })
        } catch {
          // priority is a nicety
        }
        const who = name && name !== '-' ? name : 'a website visitor'
        const summary = [
          `Hot lead: ${who}${company ? `, ${company}` : ''}`,
          `Industry: ${attributes.industry ?? 'not given'}`,
          `Channels: ${attributes.channels_used ?? 'not given'}`,
          `Monthly volume: ${volume ?? 'not given'}`,
          `Main pain: ${pain ?? 'not given'}`,
          `Current tool: ${tool ?? 'not given'}`,
          `Team size: ${team ?? 'not given'}`,
          `Timeline: ${timeline ?? 'not given'}`,
          'Reached the results card on the quick path.',
        ].join('\n')
        await ctx.volty.staff.notify({ userId: OWNER, message: summary, conversationId: conversationId })
        await ctx.volty.staff.email({
          userId: OWNER,
          subject: `Hot lead on voltade.com: ${who}`,
          body: `${summary}\n\nOpen the conversation in Volty (inbox: Volty website assistant).`,
        })
      }

      return { stored: true, score }
    }

    if (input.conversationId) {
      let chrono: Msg[] = []
      let found = false
      for (let i = 0; i < 14; i++) {
        await ctx.sleep(45000)
        const all = (await ctx.volty.messaging.listMessages({
          conversationId: input.conversationId,
          limit: 100,
        })) as { messages: Msg[] }
        chrono = sortByTime(all.messages ?? [])
        if (chrono.some(isCard)) {
          found = true
          break
        }
        if (chrono.some((m) => m.role === 'agent')) return { stored: false, reason: 'Volty took over before the summary card' }
      }
      if (!found) return { stored: false, reason: 'no summary card within 10 minutes' }
      return await store(input.conversationId, chrono)
    }

    // Catch-up (a manual run with no input): store every recent web chat that has a finished quick path.
    const recent = (await ctx.volty.conversations.list({ limit: 25 })) as {
      conversations: Array<{ id: string; inboxId?: string | null }>
    }
    let count = 0
    for (const c of recent.conversations ?? []) {
      if (c.inboxId !== 'YOUR_WEB_CHAT_INBOX_ID') continue
      const all = (await ctx.volty.messaging.listMessages({ conversationId: c.id, limit: 100 })) as { messages: Msg[] }
      const chrono = sortByTime(all.messages ?? [])
      if (!chrono.some(isCard)) continue
      const r = await store(c.id, chrono, true)
      if (r.stored) count++
    }
    return { stored: count > 0, count }
  },
})
