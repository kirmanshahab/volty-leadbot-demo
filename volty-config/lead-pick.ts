import { defineAutomation, z } from '~/automation'

export default defineAutomation({
  id: 'lead-pick',
  trigger: { kind: 'tool' },
  input: z.object({ value: z.string().describe('The answer the visitor tapped') }),
  output: z.object({ value: z.string() }),
  async run({ input }) {
    return { value: input.value.slice(0, 80) }
  },
})
