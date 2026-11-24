// Local test for lead-capture.ts: bun harness.ts <transcript.json (oldest first)>
// Runs the automation's run() against a mocked ctx (sleep is instant, calls are recorded).
import { readFileSync, writeFileSync } from 'node:fs'

const [, , transcriptFile] = process.argv
const src = readFileSync(new URL('../lead-capture.ts', import.meta.url), 'utf8').replace(
  "import { defineAutomation, z } from '~/automation'",
  'const mkz = () => new Proxy(function () {}, { get: () => mkz(), apply: () => mkz() }); const z = mkz(); const defineAutomation = (x: any) => x;',
)
writeFileSync(new URL('./.lead-capture.harness.ts', import.meta.url), src)
const mod = (await import('./.lead-capture.harness.ts')).default
const msgs = JSON.parse(readFileSync(transcriptFile, 'utf8'))
const calls: unknown[] = []
const ctx = {
  sleep: async () => {},
  volty: {
    messaging: { listMessages: async ({ limit }: { limit: number }) => ({ messages: msgs.slice(-limit).reverse() }) }, // shuffled order on purpose
    privacy: { expand: async (a: { text: string }) => ({ text: a.text.startsWith('pii:') ? 'visitor@example.com' : a.text, unknown: [] }) },
    conversations: { get: async () => ({ contactId: 'cnt:test' }), setPriority: async (a: unknown) => { calls.push(['setPriority', a]); return {} } },
    contacts: { update: async (a: unknown) => { calls.push(['contacts.update', a]); return {} } },
    staff: {
      notify: async (a: { message: string }) => { calls.push(['staff.notify', a.message]); return {} },
      email: async (a: { subject: string }) => { calls.push(['staff.email', a.subject]); return {} },
    },
  },
}
const out = await mod.run({ input: { conversationId: 'x' }, ctx })
console.log(JSON.stringify(out))
for (const c of calls) console.log(JSON.stringify(c))
