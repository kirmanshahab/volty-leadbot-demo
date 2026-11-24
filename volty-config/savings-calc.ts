import { defineAutomation, z } from '~/automation'

const MONTHLY: Record<string, number> = { '<500': 300, '500-2k': 1200, '2k-10k': 5000, '10k+': 15000 }
const PCT: Record<string, number> = { '25%': 0.25, '50%': 0.5, '75%': 0.75 }

export default defineAutomation({
  id: 'savings-calc',
  trigger: { kind: 'tool' },
  input: z.object({ volume: z.string(), repetitive: z.string() }),
  output: z.object({ text: z.string() }),
  async run({ input }) {
    const vol = MONTHLY[input.volume] ?? 1200
    const pct = PCT[input.repetitive] ?? 0.5
    const repeat = Math.round(vol * pct)
    const handled = Math.round(repeat * 0.7)
    const hours = Math.round((handled * 2) / 60)
    const cost = hours * 10
    const text =
      'Your estimate:\n' +
      `- About ${vol.toLocaleString('en-US')} conversations a month, ${input.repetitive} of them repetitive = ~${repeat.toLocaleString('en-US')} repetitive questions.\n` +
      `- If Volty's AI resolves 70% of those, that is ~${handled.toLocaleString('en-US')} questions, about ${hours} hours saved a month, about US$${cost.toLocaleString('en-US')} of staff time.\n` +
      'Assumptions: the middle of your volume range, 2 minutes per repetitive question, a 70% AI resolution rate (a cautious guess, not a promise) and US$10 an hour of staff time. Your numbers will differ.'
    return { text }
  },
})
