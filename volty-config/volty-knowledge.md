# Volty / Voltade knowledge file

Compiled 2026-11-24 from https://volty.voltade.com/llms.txt (the live CLI guide) and voltade.com (home, features, pricing in US$ and S$, 4 industry pages, integrations, 10 case studies, all 17 /product/ pages, /security, /ai-governance and the main /compare pages). Figures marked "(vendor claim)" are marketing statistics from voltade.com that nobody has verified. Pages not read: /blog and the compare pages for Pepper Cloud, Zendesk, Manychat, Tidio, Gorgias, Freshdesk, Intercom and Front.

## 1. Company and product

- Voltade Pte. Ltd. (Singapore) makes **Volty**, an "AI helpdesk customised to your business". A Meta Business Partner.
- Puts WhatsApp, Messenger, Instagram DMs, web chat and email in one shared inbox. An AI agent replies and takes actions in connected systems.
- Built so a team can customise it by asking Volty, or with a coding agent (Claude Code, Codex) through the `volty` CLI.
- Safety model: the agent starts in **draft mode** (every reply waits for a person). Anything that spends money, reaches many people or cannot be undone waits for a person's approval. PII is tokenised before the AI reads it. No training on customer data. Holds the CSA Cyber Essentials Mark and is CASA Tier 2 penetration tested.
- Headline claims (vendor claim): >90% of enquiries automated, +20% lead conversion, 6x man-hour savings, 10+ markets.
- Free trial: 7 days, no credit card.

## 2. Pricing (US market, billed monthly)

| Plan | Price | Seats | Active contacts | Notable extras |
|---|---|---|---|---|
| Plus | $159/mo | 6 | 1,000 | AI agents, automations, custom web apps, all integrations |
| Pro (recommended) | $399/mo | 20 | 2,000 | Custom roles, deals pipeline with companies, WhatsApp loyalty, click-to-WhatsApp ad attribution, broadcast A/B tests |
| Max | $799/mo | 40 | 5,000 | Row rules, approve right, audit export, SSO, developer testing in CI |
| Enterprise | Talk to us | custom | custom | Governance, directory provisioning, two-person approval, own AI gateway |

- Every plan includes the whole helpdesk, every channel, unlimited inboxes and every integration (no integration tiers).
- Allowances: AI replies per month about 750-1,500 (Plus), 1,500-3,000 (Pro), 3,000-7,500 (Max). Volty requests per month: 300k, 500k, 1M.
- Add-ons: $17 per extra seat, $10 per 100 active contacts, $12 per 1,000 AI credits, $9 per 100k Volty requests.
- An AI agent reply or action costs 2-5 credits. A draft, prompt or summary costs 1. An active contact is one who sends or receives a message in the billing month.
- Meta's WhatsApp message fees are billed separately.
- When a subscription ends Volty stops replying, and a cancelled workspace is purged after 30 days.
- **Prices differ by market.** https://voltade.com/pricing is the US page (US$). https://voltade.com/sg/pricing is the Singapore page (S$). `?market=sg` does not switch it. `/my/pricing` is a 404.
- Singapore (S$): Plus S$199, Pro S$500, Max S$1,000, **Ultra S$2,000** (80 seats, 12,000 contacts, 2M requests; Ultra is listed on the S$ page only). Add-ons: S$22 per seat, S$13 per 100 contacts, S$16 per 1,000 AI credits, S$12 per 100k requests. The S$ page also has a Singapore grant FAQ (PSG and EDG closed to new applications on 29 Sep 2026; EDGE Grant and NTUC CTC Grant mentioned).
- Conflict on the site: the /compare pages say Plus is "about US$159... same plans and allowances in every country", but the S$ page charges S$199. **Bot rule:** quote the plan names and the USD price from /pricing, say Singapore pricing is in S$, and always link the pricing page. Never state a price that isn't in this file. The pricing page is the source of truth.
- Removing the "Powered by Volty" footer on the web chat is an Ultra-only feature.

## 3. Features (voltade.com)

- **Helpdesk:** team inbox and ticketing, assignment (round-robin, rules, open-conversation caps), broadcasts, conversation labels, handoff to staff.
- **AI agent:** answers from the business's own information, in the customer's language. Transcribes voice notes and reads photos and documents. Can book into Google Calendar, add leads to HubSpot, look up orders, and so on. Each inbox can be Live (replies itself), Draft (staff approve) or off. A staff reply pauses the AI in that thread for 30 minutes.
- **Learned rules:** staff corrections become rules the agent reads on every turn, and they can be retired.
- **CRM:** contacts, companies, deals, custom fields. The agent fills in details a customer mentions.
- **Apps and automations:** mini apps (dashboards, quote builders), appointment reminders, payment collection, follow-ups, quotation PDFs, finance tagging. An admin approves each automation and every run is logged.
- **WhatsApp specifics:** approved templates outside the 24-hour window. Groups only on Official Business Account numbers. History import (up to 6 months) and migration from SleekFlow, respond.io and Envoy.
- **Channels:** WhatsApp, Messenger, Instagram, web chat, in-app support, email (Outlook, Gmail, any inbox).

## 4. Industries

- **Education** (/industries/education): books trial classes, stores level and subject as custom fields, post-trial follow-up templates, term broadcasts. Examples: Happy Fish, Overmugged, illum.e, EtonHouse, TuitionGenius.
- **Clinics and spas:** books, moves and confirms appointments through Plato, NexHealth, Open Dental, DrChrono, Healthie or Google Calendar. Reminders with Confirm and Reschedule buttons. Medical questions are handed to the front desk. Scheduling only, not health records, no BAA. Data stored in Singapore.
- **B2B:** collects quote specs, drafts replies from price lists in a shared Outlook mailbox, reads purchase-order PDFs, routes by keyword or round-robin, syncs to HubSpot.
- **Ecommerce and retail:** answers from the store catalog and policies, order lookup and update through APIs, learned rules, broadcasts, click-to-WhatsApp attribution.

## 5. Integrations (/integrations, "272" shown, partly verified)

- Featured: Shopify, HubSpot, Salesforce, Zoho, Attio, Slack, Microsoft Teams, Outlook, Google Calendar, Google Sheets, Notion, Odoo, WooCommerce, Square, QuickBooks, Xero, NetSuite, Zoom, Trello, ClickUp, Typeform, Wix, plus WhatsApp Business API, Instagram, Messenger, TikTok Ads.
- Clinic and booking systems: Plato Medical, Cliniko, Nookal, Dentally, Feegow, DrChrono, Healthie, Elation, Semble, NexHealth, Open Dental, WESS, Bookeo, TutorCruncher.
- Field and property: ServiceM8, Housecall Pro, JobNimbus, Rentvine, Propertyware, Smokeball, Lawmatics.
- **Custom API** and **MCP server**: any system with an API (paste a key and ask Volty to connect).
- The long tail (hundreds of vertical tools) is on the page. A verbatim list was only partly read.

## 6. Case studies (all figures are the customer's claims on voltade.com)

- **Cutis** (clinic): about 100% of patient messages sent as the agent wrote them (half automatic, half one-click approved). 24-second average first reply. 90% of after-hours messages answered within 15 minutes. Plato integration.
- **EtonHouse** (education): "Lumina" lesson planner. Lesson planning cut from a day to 1 hour (90%). S$1M+ per year in productivity savings.
- **Cake Inspiration** (F&B): 75% fewer lost leads. 91% of conversations resolved without a human. Median reply 5 seconds, down from 9 hours.
- **Happy Fish** (swim school): 1,800+ messages a day automated, 50 extra sign-ups a week, 10+ staff hours saved a week.
- **Sgcarmart** (automotive): moved off SleekFlow. A team of 5 with no tech background built 16+ apps and automations in days.
- **Prologue Clinic:** 70% of Volty replies end in a booking. Staff time cut from 3 hours to 30 minutes a day.
- **Yong Kang TCM:** +20% bookings. Peak-time resolution cut from 30 minutes to under 5. No headcount growth despite 60% more chat traffic.
- **Yat Guan** (manufacturing): quote turnaround 3 days to 1. 95% spec accuracy in English, Mandarin and Malay.
- **Mister Mobile** (retail): 585k customers and 1.05M orders merged into one CRM. About 120 man-hours a day saved.
- **The Bon Pet** (ecommerce): 27 automations and 11 mini apps over Shopify data. No outcome numbers given.
- Index-only: illum.e (60+ hours a month saved, +20% conversion), Overmugged (50 hours a month), Lo & Behold Group (50% less manpower in some back-office roles).

## 7. Volty CLI: capabilities by area

The CLI is `volty <family> <op>`. Run `volty <op> --help` for flags. Prod calls need `VOLTY_ENV=prod VOLTY_ORG=<id>`. A person's key calls operations only, and an admin must approve ops marked "held". Sending or scheduling a broadcast and transferring ownership are done only by a person in the app.

### Website chat widgets (`widgets`, `chat-flow`, `inboxes chat-setup`)
- `widgets create` makes a web chat channel, its own inbox and the site widget (`--website`), or a launcher for a connected WhatsApp number (`--channel-instance-id`). `--target in_app` makes in-app support.
- Options: name, card title, launcher label, icon, greeting, WhatsApp prefill (`{page}` placeholder), primary colour, position, default country, allowed domains, font, branding, Google Analytics, QR code, logo.
- `widgets get` / `list` read the full config, the **paste-ready script-tag embed snippet**, the **link to the chat page**, and whether the snippet last started and where.
- `widgets update`, `delete`, `pause` / `resume` (in-app), `read-site` (re-reads the site's colour, font, logo, headline), `shortcut-set` / `shortcut-remove` (opening-page shortcuts), `upload-logo`, `upload-photo`, `report` (visitors, page views, launcher clicks, attribution).
- **Quick paths** (a fixed, scripted flow in front of Volty, off by default): `chat-flow get | save-draft | try | try-automation | set-enabled | set-channels | publish`. They are a TypeScript file and can run on web, WhatsApp, Messenger, Instagram and email.
- Testing: `debug wake-sync --web-chat <channel id>` sends as a website visitor into the Sandbox inbox, where quick paths do not run. `chat-flow try` tests quick paths. `instructions preview-reply` answers a made-up visitor on a draft of the instructions.
- Only an admin or owner creates or changes a widget, and on prod every change goes live at once.

### AI agents (`agents`, `instructions`, `learned`, `skills`, `memory`)
- `agents list | get | enable | disable`, `set-disclosure` (the AI-disclosure opening and closing lines, which must say it is an AI), `set-effort` (minimal to high, workspace-wide).
- `inboxes set-reply-mode` (Live, Draft or off, and after-hours mode), `set-default-agent`, `inboxes try` / `try-result` (replay a past conversation with nothing sent), `usage-estimate`.
- `instructions get | update | suggest-edit | preview-reply | compile-cards`: three layers (workspace, team, per inbox "About this inbox").
- `learned add | list | retire`, `learning list` (proposed knowledge), `memory add | edit` (per contact or staff member), `skills install-template | set-enabled | view`.
- `canned-responses` (create, get, list, update, delete).
- `debug wake-sync` and `session-sync` run real turns, and `logs` and `debug llm-io` show what the model saw and did.

### Knowledge base (`knowledge`, `drive`, `sources`, `web`)
- `knowledge update` and `delete` edit or remove a file in the workspace knowledge base (shared Drive files).
- `inboxes knowledge-preview` shows what Volty knows in an inbox (the About field, hand-off list, team roster).
- `widgets read-site` and the website source read a site's pages. The integrations page says a connected website is re-read nightly.
- Related: `drive` (files), `sources` (call external sources), `web fetch`, `attachments list | read`.
- The CLI offers no single "upload a document to the knowledge base" op. `knowledge` only edits or deletes. Adding content probably goes through `drive` or the app, and I have not confirmed this.

### Contacts and custom fields (`contacts`, `companies`, `tables`, `rows`)
- `contacts create | get | list | update | merge | delete | block | mute`, identifiers (`add-identifier`, `set-primary-identifier`, ...), `add-imported`.
- Custom fields: `contacts list-attribute-definitions`, `manage-attribute-definition` (Settings, Contact fields), `propose-attribute-definition`, `reorder-attribute-definitions`, `get-attribute`.
- `companies create | get | list | update | set-attribute | set-billing-contact`. `contacts set-company`.
- Free-form data: `tables` and `rows` (create, import CSV, insert) with `access grant | revoke`. Also `deals`, `orders`, `tickets`.

### Tags and labels
- **Contact Labels** (about the person): `contacts labels | update | update-labels | describe-label | delete-label`, `conversations add-contact-label`. `describe-label --auto-add` lets Volty add the label itself.
- **Ticket Labels** (about the issue): `tickets labels | set-label | add-label | remove-label | delete-label`.
- `filters` (saved conversation views, drafted from a sentence) and `tickets views`.

### Automations (`automations`, `webhooks`, `sources`, `followups`)
- `automations list | template | create | get | update-source | approve | reject | pause | resume | run-now | runs | restore | set-cap | delete`.
- Triggers include a schedule, an inbound message, a table row added, a webhook, and the events listed in llms.txt (for example `conversation.created`, `message.received`, `deal.stage_changed`, `invoice.overdue`, `staff.mentioned`).
- Three gallery templates: stalled deals nudge, appointment reminder, monthly broadcast.
- An admin approves each deploy. A deploy fails approval if its test run failed. `ctx.fetch` hosts are bound to enabled integrations.
- Also `webhooks`, `secrets`, `keys` (service keys), `email-templates`, `whatsapp-templates`, `broadcasts` (draft only), `followups`, `mini-apps`.

### Handoff and routing (`inboxes`, `org`, `conversations`, `involve`, `consult`)
- Teams: `org create-team --handoff "<when Volty hands over>"`, `org update-team --handoff`, `org set-member-assignable` (assignable, away times, open-limit).
- Inbox hand-off topics and target: `inboxes get`, `inboxes set-handoff-target` (alert managers after N minutes), `set-first-response`, `set-sla-policy`, `sla-policies`.
- Assignment: `inboxes set-routing-mode | set-routing-policy | set-routing-cap | add-routing-rule | update-routing-rule | get-routing` (plain-language policy plus ordered rules, first match wins).
- On a conversation: `conversations assign-team | reassign-user | reassign-primary | reassign-agent` (turns Volty off with null) `| unassign | assignment-reason`.
- Agent-initiated: `involve staff` (pulls a staff member in) and `consult` (asks one staff member a question). `agents disable` stops Volty from waking.

## 8. Public link to a hosted chat widget?

**Yes for a web chat.** `volty widgets get --id <id>` returns the **link to its chat page**: the chat alone on a hosted page, which the business can paste into a WhatsApp away message or email auto-reply, or send to someone to try it. It also returns the script-tag embed snippet. The link's exact URL format is not documented, and I have not created a widget, so I have not seen one. The "In-app support" widget is an embed inside the business's own app, with no mention of a hosted page. A WhatsApp launcher opens the connected WhatsApp number.

## 9. Product pages (/product/*, all 17 read; the pages carry no prices)

- **Website and app AI** (/product/website-app-ai): install is "one script tag". You list the allowed websites, and a domain covers its subdomains. The same chat embeds in your own web app. The page does not say where the widget is hosted. Over 20 card types (product carousel, time slots, forms, reply buttons, choice, rating and others). The visitor can confirm a phone number or email in chat, and the chat can continue on WhatsApp or email. Window events (`volty:chat-started`, `volty:details-confirmed`) can feed Google Analytics. "Powered by Volty" footer removal is Ultra only.
- **Inbox:** separate inboxes per team, each with its own channels, rules and reply settings. Open, snoozed and resolved states. Per-person open-chat cap. First-reply target counted in business hours, with a manager alert after a set wait. Saved replies via "/". SLA tracking.
- **Team assignment:** rules by segment, keyword, channel or hours. "Rules, then Volty" mode lets the AI choose from a plain-language policy. On handoff the teammate becomes owner, Volty steps back in the same chat, the customer is told and history is kept.
- **WhatsApp agent:** answers 24/7, reads voice notes and documents, books in Google Calendar, writes to HubSpot. Free-form replies only within 24 hours of the customer's last message, then approved templates. Draft first, then live per inbox.
- **Messenger and Instagram agent:** connects through one Facebook Page. Carries ad-click context into the chat and handles story replies.
- **Email AI:** Outlook and Microsoft 365 shared mailboxes or forwarding. Reads attachments, labels, routes and drafts replies. Stored in Singapore.
- **Broadcasts:** one approved template to up to 20 segments, 5,000 hand-picked contacts or a 200,000-row spreadsheet. Meta's tier limits apply (250 / 2,000 / 10,000 / 100,000 per 24 hours). An opt-out button on every broadcast. Reports show sent, delivered, read, replied and failed.
- **CRM:** custom fields (text, number, yes/no, date, list) on customers, companies and deals. Auto-filled from chats. Sensitive fields (consent, financial, health) are never filled automatically. Self-filling segments. Import from CSV, WhatsApp Business app or Outlook. HubSpot, Salesforce, Attio and Pipedrive syncing.
- **Marketing channels:** tracks website visits by source (Google, social, AI, ads), asks leads how they heard, and gives a funnel. Covers only your own site.
- **Appointment booking, reminders, payment collection, automated follow-up, quotation PDF, finance AP/AR, order and inventory, dashboards:** all built by chatting and approved by an admin. Follow-up only messages people who already wrote in or are in a broadcast audience you added. Payment collection does not move money. Finance tagging "is not perfect, which is why you review the first week".
- Sample numbers in page mockups (for example "Chats this week 186") are illustrative, not results.

## 10. Competitors (/compare, as Volty states them: not independently checked)

- **SleekFlow:** SleekFlow is a helpdesk your team configures. Volty is "an AI helpdesk for builders" with an agent that configures itself. Claims: AI agents that act and every integration on every Volty plan, where SleekFlow gates them to higher plans. SleekFlow Pro is about US$110-204 and Premium about US$328-405 a month depending on country. Volty's honest take: SleekFlow is better for WeChat, LINE and the widest channel list.
- **Respond.io:** Respond.io routes conversations to people, and Volty's AI answers them. Respond.io Starter is US$99 a month (US$79 billed yearly) and Growth is US$199 (US$159 yearly). Respond.io has the widest channel coverage (VoIP, LINE, custom channels) and is a mature product. Volty has a built-in migration that keeps numbers, history, templates and team. Workflows and directly connected channels stay behind.
- **Wati:** a WhatsApp specialist. Volty also does email, and its AI agent is included, where Wati's Astra agent is a separate subscription. Wati is "a simpler and cheaper starting point" for broadcasts plus a short FAQ flow you maintain yourself.
- **Twilio:** sells WhatsApp as an API at US$0.005 per message, with no inbox. Volty is an inbox, CRM and AI agent with no per-message fee of its own. Twilio also sells SMS and voice, which Volty does not offer.
- **Others** named on /compare but not read: Pepper Cloud, Meta Business Agent, Zendesk, Manychat, Tidio, Gorgias, Freshdesk, Intercom, Front. /compare/whatsapp-helpdesk-alternatives lists vendor-published prices (for example Zendesk Suite Team from US$55 per agent, Intercom Essential from US$29 per seat plus US$0.99 per Fin outcome).
- Fair-answer rule for the bot: state each page's "honest take" and don't disparage. Quote a competitor price only as "Volty's comparison page says...". The competitor prices vary by page and region.

## 11. Security and governance (/security, /ai-governance)

- Certifications: CASA Tier 2 (valid to 15 Apr 2027), Cyber Essentials Mark (valid to 15 Oct 2028), claimed PDPA compliance, Meta Business Partner. **SOC 2 Type II is "in progress", not held.** Pen test by TAC Security in Feb 2026 scored 9.7/10.
- Hosting: AWS Singapore (database, backups) and Cloudflare. AI model calls go through OpenRouter to hosts "mostly in the United States" under zero data retention. "No, Voltade does not use customer data to train AI models."
- Retention: audit logs 18 months, conversations for the life of the conversation, point-in-time recovery for 14 days. Deletion on request. Uptime SLA 99.5%.
- Governance: agents are scoped, auditable and reversible. Draft mode per inbox. Refunds, contact-attribute commits and WhatsApp template sends never auto-execute. No autonomous payments, no regulated decisions (credit, insurance, medical, legal). Customer messages are treated as untrusted (prompt-injection defence). An organisation-wide kill switch exists.
- Inconsistencies on the site: TLS 1.2/1.3 versus TLS 1.3, and passwordless sign-in versus password rules. Don't quote either point.

## 12. How documents get into the knowledge base

The "knowledge base" is the **workspace Drive**: the shared Drive files the whole team sees. The agent reads them for facts about the business.
- **CLI (no UI needed):** `volty drive upload --path <path on Drive> --file <local file>` uploads a file (up to 25 MiB). Add `--overwrite` to replace one. `drive list-folder`, `drive read-file`, `drive get-node` and `drive search-volume` read it back. `knowledge update` edits a file in place and `knowledge delete` removes one.
- A website source (`sources add` with the site URL) also lets Volty read the site's pages. Web chat creation does this automatically.
- In the app, the same files are on the **Drive** page (the shared Drive page the whole team sees). I haven't seen the app UI, so I can't give exact click steps. I'll verify the upload with the CLI in step 2 and report how it shows up.

## 13. Open questions
- Exact URL shape of the chat-page link, and whether it depends on the allowed-domains setting.
- Which Drive folder the agent treats as its knowledge base, and whether a file's text is searchable by the agent straight after upload.
- /compare pages for Pepper Cloud, Meta Business Agent, Zendesk, Manychat, Tidio, Gorgias, Freshdesk, Intercom and Front were not read.

## 14. The website quick path's plan card (what visitors were already told)

- Plan rule of thumb, by monthly conversations: under 500 = Plus (Pro if the visitor uses 3 or more channels), 500 to 2k = Pro, 2k to 10k = Max, 10k+ = Enterprise on request. It is a guide, not a quote: plans are sized by active contacts (Plus 1,000, Pro 2,000, Max 5,000).
- Time-saving estimate assumptions: the middle of the visitor's range (300, 1,200, 5,000 or 15,000 conversations), 50% repetitive unless the visitor chose 25% or 75%, 2 minutes per repetitive question, a 70% AI resolution rate (a cautious guess, not a promise) and US$10 an hour of staff time.
- The quick path does not email the summary to the visitor. It asks "Want our team to follow up with this summary?"; a Yes hands the visitor's details to the Sales team, which follows up.

## 15. Answering rules (facts the assistant must keep to)

- Pricing: quote plan names and US$ prices from section 2 and always link https://voltade.com/pricing. Singapore prices are in S$ at https://voltade.com/sg/pricing. The /my/pricing page does not exist, and the compare pages saying prices are "the same in every country" conflicts with the S$ page, so never promise a price in another currency.
- Customer results are the customer's own claims: say "Cake Inspiration says...", never state them as fact.
- Competitors: answer fairly from section 10, including where the competitor is the better fit (SleekFlow for WeChat and LINE, Respond.io for the widest channels, Wati as a cheaper WhatsApp start, Twilio for SMS and voice). Quote a competitor price only as "Volty's comparison page says...". Never disparage anyone.
- Security: SOC 2 is in progress, so never say Volty is SOC 2 certified. Give no legal, medical or financial advice.
- Trial: 7 days free, no credit card, https://volty.voltade.com/signup.
