import {
  ArrowRight,
  BookOpen,
  Calculator,
  Code,
  ExternalLink,
  Languages,
  MessageSquareText,
  Moon,
  Route,
  ShieldCheck,
  Sun,
  Tags,
  Workflow,
  Zap,
} from 'lucide-react'
import type { ReactNode } from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { GITHUB_URL, HOSTED_CHAT_URL, LINKEDIN_URL, REPO_URL } from './config'
import { openWidget } from './widget'

type Scenario = { title: string; tag: string; prompt: string | null; hint: string; icon: ReactNode }

const SCENARIOS: Scenario[] = [
  {
    title: 'Hot clinic lead',
    tag: 'Hot',
    prompt: 'I run a clinic with ~5k WhatsApp chats a month and want to start now',
    hint: 'Gets a demo offer and hands off to Sales',
    icon: <Zap className="size-5" aria-hidden />,
  },
  {
    title: 'Just browsing',
    tag: 'Cold',
    prompt: "I'm a student just looking around",
    hint: 'Gets friendly resources, no pressure',
    icon: <MessageSquareText className="size-5" aria-hidden />,
  },
  {
    title: 'Bahasa Melayu',
    tag: 'Language',
    prompt: 'Saya ada kedai dobi di Johor, nak tahu pasal Volty',
    hint: 'Replies in Malay, not Indonesian',
    icon: <Languages className="size-5" aria-hidden />,
  },
  {
    title: 'Savings calculator',
    tag: 'Quick path',
    prompt: null,
    hint: 'Tap “Calculate my time savings”',
    icon: <Calculator className="size-5" aria-hidden />,
  },
]

const FLOW = [
  { n: '1', title: 'Opening buttons', text: 'See how it works, Pricing, Is Volty right for me, Calculate savings, Compare, Talk to a human.' },
  { n: '2', title: 'Qualification', text: 'Industry, channels, volume, pain and timeline. Taps or typing both work.' },
  { n: '3', title: 'Fit summary card', text: 'Plan and price, features for the stated pain, a case study and a savings estimate.' },
  { n: '4', title: 'Action buttons', text: 'Start the 7-day trial, book a demo, see pricing, or ask anything.' },
]

const ROUTES = [
  { label: 'Hot lead', text: 'Owner alert and a high-priority conversation; the demo button hands off to Sales.' },
  { label: 'Existing customer', text: 'Skips sales questions and goes to the Support team.' },
  { label: 'Human request', text: 'Honoured at any point, in any message.' },
]

const SCORES = [
  { level: 'Hot', tone: 'bg-accent text-white', rule: 'Starting now with 2,000+ conversations a month (any number of channels), or 500–2,000 conversations on 2+ channels.' },
  { level: 'Warm', tone: 'bg-accent-soft text-accent', rule: 'A fit, but not urgent. Pushed to the 7-day free trial.' },
  { level: 'Cold', tone: 'bg-surface text-muted border border-line', rule: 'Just exploring, a student, or under 500 conversations a month with no urgency. Sent resources.' },
]

const UNDER_THE_HOOD = [
  { icon: <BookOpen className="size-5" aria-hidden />, title: 'Knowledge base from voltade.com', text: 'The agent answers from a file built from the public site: plans, features, case studies, comparisons and security.' },
  { icon: <Tags className="size-5" aria-hidden />, title: 'Custom fields and labels', text: 'Nine lead fields plus lead:hot, lead:warm, lead:cold and existing-customer labels, filled from the chat.' },
  { icon: <Workflow className="size-5" aria-hidden />, title: 'Lead-capture automation', text: 'One run per visit reads the finished conversation, scores it, stores it and alerts the owner on hot leads.' },
  { icon: <Route className="size-5" aria-hidden />, title: 'Routing and handoff', text: 'Sales and Support teams with plain-language handoff rules; a human request is always honoured.' },
  { icon: <ShieldCheck className="size-5" aria-hidden />, title: 'Guardrails', text: 'No invented prices, jailbreak-safe, replies in the visitor’s language, and internal scoring is never mentioned to visitors.' },
  { icon: <Code className="size-5" aria-hidden />, title: 'Typed-answer AI fallback', text: '“around 3000” maps to the right volume band; when the flow cannot tell, the AI takes over instead of guessing.' },
]

function ThemeToggle() {
  const [dark, setDark] = useState(() => document.documentElement.dataset.theme === 'dark' || (!document.documentElement.dataset.theme && matchMedia('(prefers-color-scheme: dark)').matches))
  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light'
  }, [dark])
  return (
    <button
      type="button"
      onClick={() => {
        const next = !dark
        setDark(next)
        try {
          localStorage.setItem('theme', next ? 'dark' : 'light')
        } catch {
          /* private mode */
        }
      }}
      className="inline-flex size-10 items-center justify-center rounded-full border border-line bg-surface text-ink transition hover:border-accent"
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {dark ? <Sun className="size-5" aria-hidden /> : <Moon className="size-5" aria-hidden />}
    </button>
  )
}

function SectionTitle({ id, eyebrow, children }: { id: string; eyebrow: string; children: ReactNode }) {
  return (
    <div className="mb-8 max-w-2xl">
      <p className="mb-2 text-sm font-medium text-accent">{eyebrow}</p>
      <h2 id={id} className="text-2xl font-semibold tracking-tight sm:text-3xl">
        {children}
      </h2>
    </div>
  )
}

const btnPrimary =
  'inline-flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-accent-strong'
const btnGhost =
  'inline-flex items-center justify-center gap-2 rounded-full border border-line bg-bg px-5 py-3 text-sm font-semibold text-ink transition hover:border-accent'

export default function App() {
  const [toast, setToast] = useState('')
  const timer = useRef<number>(0)

  const say = useCallback((text: string) => {
    setToast(text)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setToast(''), 5000)
  }, [])

  const openChat = useCallback(() => {
    if (openWidget() === 'hosted') say('Opened the hosted chat in a new tab.')
  }, [say])

  const tryScenario = useCallback(
    async (s: Scenario) => {
      let copied = false
      if (s.prompt) {
        try {
          await navigator.clipboard.writeText(s.prompt)
          copied = true
        } catch {
          /* clipboard blocked */
        }
      }
      const where = openWidget()
      if (where === 'hosted') say('Opened the hosted chat in a new tab.' + (copied ? ' Prompt copied. Paste it in as your first message.' : ''))
      else if (s.prompt) say(copied ? 'Prompt copied. Paste it into the chat as your first message.' : `Type this in the chat: ${s.prompt}`)
      else say('Tap “Calculate my time savings” in the chat.')
    },
    [say],
  )

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-white">
        Skip to content
      </a>

      <header className="sticky top-0 z-30 border-b border-line bg-bg/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <span className="flex items-center gap-2 text-sm font-semibold">
            <span className="inline-flex size-7 items-center justify-center rounded-lg bg-accent text-white">
              <Zap className="size-4" aria-hidden />
            </span>
            Lead-qualifier demo
          </span>
          <div className="flex items-center gap-2">
            <a href={REPO_URL} className="hidden items-center gap-1.5 rounded-full px-3 py-2 text-sm text-muted transition hover:text-ink sm:inline-flex" target="_blank" rel="noreferrer">
              Source <ExternalLink className="size-3.5" aria-hidden />
            </a>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main id="main">
        {/* Hero */}
        <section className="hero-glow" aria-labelledby="hero-title">
          <div className="mx-auto max-w-6xl px-5 pb-20 pt-16 sm:pb-28 sm:pt-24">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-line bg-bg/70 px-3 py-1 text-xs font-medium text-muted">
              <span className="size-1.5 rounded-full bg-accent" aria-hidden /> Built by Kirman for the Volty hiring round
            </p>
            <h1 id="hero-title" className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-6xl">
              An AI lead-qualifier for Volty
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-muted sm:text-xl">
              Qualifies, scores and routes website leads in under 2 minutes — built entirely with Claude Code + the volty CLI.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button type="button" className={btnPrimary} onClick={openChat}>
                Open the chat <ArrowRight className="size-4" aria-hidden />
              </button>
              <a className={btnGhost} href={REPO_URL} target="_blank" rel="noreferrer">
                View source <ExternalLink className="size-4" aria-hidden />
              </a>
            </div>
            <p className="mt-4 text-sm text-muted">
              Prefer a full page?{' '}
              <a className="font-medium text-accent underline-offset-4 hover:underline" href={HOSTED_CHAT_URL} target="_blank" rel="noreferrer">
                Open the hosted chat page
              </a>
              .
            </p>
          </div>
        </section>

        {/* Try it */}
        <section className="mx-auto max-w-6xl px-5 py-16 sm:py-20" aria-labelledby="try-title">
          <SectionTitle id="try-title" eyebrow="Try it">
            Four ways to meet the bot
          </SectionTitle>
          <ul className="grid gap-4 sm:grid-cols-2">
            {SCENARIOS.map((s) => (
              <li key={s.title}>
                <button
                  type="button"
                  onClick={() => tryScenario(s)}
                  className="group flex h-full w-full flex-col items-start gap-3 rounded-2xl border border-line bg-surface p-6 text-left transition hover:border-accent"
                >
                  <span className="flex w-full items-center justify-between">
                    <span className="inline-flex size-10 items-center justify-center rounded-xl bg-accent-soft text-accent">{s.icon}</span>
                    <span className="rounded-full border border-line px-2.5 py-0.5 text-xs text-muted">{s.tag}</span>
                  </span>
                  <span className="text-lg font-semibold">{s.title}</span>
                  {s.prompt ? <span className="text-sm text-ink/90">“{s.prompt}”</span> : null}
                  <span className="text-sm text-muted">{s.hint}</span>
                  <span className="mt-auto inline-flex items-center gap-1 pt-1 text-sm font-medium text-accent">
                    {s.prompt ? 'Copy and open the chat' : 'Open the chat'} <ArrowRight className="size-4 transition group-hover:translate-x-0.5" aria-hidden />
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </section>

        {/* How it works */}
        <section className="border-y border-line bg-surface" aria-labelledby="how-title">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
            <SectionTitle id="how-title" eyebrow="How it works">
              From first tap to the right person
            </SectionTitle>
            <ol className="grid gap-4 md:grid-cols-4">
              {FLOW.map((f, i) => (
                <li key={f.n} className="relative rounded-2xl border border-line bg-bg p-5">
                  <span className="mb-3 inline-flex size-8 items-center justify-center rounded-full bg-accent text-sm font-semibold text-white">{f.n}</span>
                  <h3 className="font-semibold">{f.title}</h3>
                  <p className="mt-1 text-sm text-muted">{f.text}</p>
                  {i < FLOW.length - 1 ? <ArrowRight className="absolute -right-[18px] top-1/2 z-10 hidden size-5 -translate-y-1/2 text-accent md:block" aria-hidden /> : null}
                </li>
              ))}
            </ol>

            <div className="mt-6 grid gap-4 lg:grid-cols-5">
              <div className="rounded-2xl border border-line bg-bg p-6 lg:col-span-3">
                <h3 className="mb-4 font-semibold">5 · Routing</h3>
                <ul className="grid gap-3 sm:grid-cols-3">
                  {ROUTES.map((r) => (
                    <li key={r.label} className="rounded-xl border border-line bg-surface p-4">
                      <p className="text-sm font-semibold text-accent">{r.label}</p>
                      <p className="mt-1 text-sm text-muted">{r.text}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <figure className="rounded-2xl border border-line bg-bg p-6 text-sm lg:col-span-2" aria-label="Example fit summary card">
                <figcaption className="mb-3 text-xs font-medium uppercase tracking-wide text-muted">What the card looks like</figcaption>
                <p className="font-semibold">Here’s your Volty fit, Ricky</p>
                <p className="mt-2">Max, US$799/month: 5,000 contacts and 40 seats fit 2k to 10k conversations a month.</p>
                <ul className="mt-2 space-y-0.5 text-muted">
                  <li>• Replies in seconds, 24/7, in their language</li>
                  <li>• Rules route chats to the right team</li>
                  <li>• Draft mode: staff approve until you trust it</li>
                </ul>
                <p className="mt-2 text-muted">Similar: Yong Kang TCM says bookings rose 20% (their claim).</p>
                <p className="font-medium">~58 hrs/month saved*</p>
                <p className="mt-1 text-xs text-muted">*Assumes 50% repetitive, 2 min each, 70% AI-resolved.</p>
              </figure>
            </div>
          </div>
        </section>

        {/* Lead scoring */}
        <section className="mx-auto max-w-6xl px-5 py-16 sm:py-20" aria-labelledby="score-title">
          <SectionTitle id="score-title" eyebrow="Lead scoring">
            Hot, warm or cold, and why
          </SectionTitle>
          <div className="overflow-hidden rounded-2xl border border-line">
            <table className="w-full border-collapse text-left text-sm">
              <caption className="sr-only">Lead scoring rules</caption>
              <thead className="bg-surface text-muted">
                <tr>
                  <th scope="col" className="w-28 px-5 py-3 font-medium">Score</th>
                  <th scope="col" className="px-5 py-3 font-medium">Criteria</th>
                </tr>
              </thead>
              <tbody>
                {SCORES.map((s) => (
                  <tr key={s.level} className="border-t border-line align-top">
                    <th scope="row" className="px-5 py-4">
                      <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${s.tone}`}>{s.level}</span>
                    </th>
                    <td className="px-5 py-4">{s.rule}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 rounded-xl bg-accent-soft px-4 py-3 text-sm text-ink">
            <strong>Skip the contact step</strong> and the lead is scored one level lower: hot becomes warm, warm becomes cold.
          </p>
        </section>

        {/* Under the hood */}
        <section className="border-t border-line bg-surface" aria-labelledby="hood-title">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
            <SectionTitle id="hood-title" eyebrow="Under the hood">
              Six pieces, all configured with the volty CLI
            </SectionTitle>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {UNDER_THE_HOOD.map((f) => (
                <li key={f.title} className="rounded-2xl border border-line bg-bg p-6">
                  <span className="mb-4 inline-flex size-10 items-center justify-center rounded-xl bg-accent-soft text-accent">{f.icon}</span>
                  <h3 className="font-semibold">{f.title}</h3>
                  <p className="mt-1 text-sm text-muted">{f.text}</p>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-muted">
              Every config file is in the repo under <code className="rounded bg-accent-soft px-1.5 py-0.5 text-accent">volty-config/</code>.{' '}
              <a className="font-medium text-accent underline-offset-4 hover:underline" href={REPO_URL} target="_blank" rel="noreferrer">
                Read the README
              </a>
              .
            </p>
          </div>
        </section>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            <span className="font-medium text-ink">Kirman Shahab</span> ·{' '}
            <a className="underline-offset-4 hover:text-ink hover:underline" href={GITHUB_URL} target="_blank" rel="noreferrer">
              GitHub (kirmandev)
            </a>
            {LINKEDIN_URL ? (
              <>
                {' '}
                ·{' '}
                <a className="underline-offset-4 hover:text-ink hover:underline" href={LINKEDIN_URL} target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
              </>
            ) : null}
          </p>
          <p>Demo built for the Volty hiring round</p>
        </div>
      </footer>

      <div role="status" aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-24 z-40 flex justify-center px-4">
        {toast ? <p className="pointer-events-auto max-w-md rounded-2xl bg-ink px-4 py-3 text-sm text-bg shadow-lg">{toast}</p> : null}
      </div>
    </>
  )
}
