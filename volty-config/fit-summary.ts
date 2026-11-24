import { defineAutomation, z } from '~/automation'

const MONTHLY: Record<string, number> = { '<500': 300, '500-2k': 1200, '2k-10k': 5000, '10k+': 15000 }

const CASES: Record<string, string> = {
  Education: 'Happy Fish (swim school) says it automates 1,800+ messages a day',
  'Clinics & Spas': 'Yong Kang TCM says bookings rose 20%',
  B2B: 'Yat Guan says quote turnaround fell from 3 days to 1',
  'E-commerce': 'Cake Inspiration says it has 75% fewer lost leads',
  Retail: 'Mister Mobile says it saves about 120 man-hours a day',
}

const FEATURES: Record<string, string[]> = {
  'Slow replies': ['Replies in seconds, 24/7, in their language', 'Rules route chats to the right team', 'Draft mode: staff approve until you trust it'],
  'Repetitive questions': ['AI answers FAQs from your own documents', 'Books and updates your CRM for you', 'Staff corrections become rules it follows'],
  'Leads slipping through': ['One inbox for every channel', 'CRM fields fill in from the chat', 'Approved follow-ups and team alerts'],
  'No visibility': ['Dashboards built from your own data', 'Every channel in one inbox, with SLAs', 'Custom fields and segments in the CRM'],
}

const CHANNELS = ['whatsapp', 'instagram', 'messenger', 'email', 'web']

// Plan rule (kept in step with section 14 of the knowledge file): by monthly conversations,
// Plus under 500 (Pro with 3+ channels), Pro 500 to 2k, Max 2k to 10k, Enterprise 10k+.
// This tool does not score leads: lead-capture.ts and the instructions hold the hot/warm/cold rule.
export default defineAutomation({
  id: 'fit-summary',
  trigger: { kind: 'tool' },
  input: z.object({
    name: z.string(),
    industry: z.string(),
    channel: z.string(),
    extra: z.string(),
    volume: z.string(),
    pain: z.string(),
    tool: z.string(),
    team: z.string(),
    timeline: z.string(),
  }),
  output: z.object({
    title: z.string(),
    plan: z.string(),
    features: z.string(),
    example: z.string(),
    estimate: z.string(),
    footnote: z.string(),
  }),
  async run({ input }) {
    const first1 = CHANNELS.some((c) => input.channel.toLowerCase().includes(c)) ? 1 : 0
    const n = first1 + (input.extra === 'one' ? 1 : input.extra === 'two+' ? 2 : 0)

    let plan: string
    if (!(input.volume in MONTHLY)) {
      plan = 'Plus, US$159/month, to start: 6 seats and 1,000 contacts. Our team can size it with you.'
    } else if (input.volume === '10k+') {
      plan = "Enterprise, priced on request: 10k+ conversations a month is beyond Max's 5,000 contacts."
    } else if (input.volume === '2k-10k') {
      plan = 'Max, US$799/month: 5,000 contacts and 40 seats fit 2k to 10k conversations a month.'
    } else if (input.volume === '500-2k') {
      plan = 'Pro, US$399/month: 20 seats and 2,000 contacts suit 500 to 2k conversations a month.'
    } else if (n >= 3) {
      plan = `Pro, US$399/month: under 500 chats, but ${n} channels usually need a bigger team (20 seats).`
    } else {
      plan = 'Plus, US$159/month: 6 seats and 1,000 contacts cover under 500 conversations a month.'
    }

    const painKey = FEATURES[input.pain] ? input.pain : 'Repetitive questions'
    const features = FEATURES[painKey].map((f) => `• ${f}`).join('\n')

    const c = CASES[input.industry] ?? CASES['E-commerce']
    const example = `Similar: ${c} (their claim).`

    const vol = MONTHLY[input.volume] ?? 1200
    const hours = Math.round((Math.round(vol * 0.5 * 0.7) * 2) / 60)
    const estimate = `~${hours} hrs/month saved*`

    const extraText = input.extra === 'one' ? ' +1' : input.extra === 'two+' ? ' +2 or more' : ''
    const basis = [
      input.industry,
      `${input.channel}${extraText}`,
      `${input.volume} a month`,
      input.pain.toLowerCase(),
      ...(input.tool && input.tool !== '-' ? [`tool: ${input.tool}`] : []),
      ...(input.team && input.team !== '-' ? [`team: ${input.team}`] : []),
      `start: ${input.timeline}`,
    ].join(' · ')
    const footnote = `*Assumes 50% repetitive, 2 min each, 70% AI-resolved. Based on: ${basis}`

    const first = input.name && input.name !== '-' ? `, ${input.name}` : ''
    return { title: `Here's your Volty fit${first}`, plan, features, example, estimate, footnote }
  },
})
