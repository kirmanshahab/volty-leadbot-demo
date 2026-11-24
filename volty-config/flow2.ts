import { aiCheck, aiRoute, ask, automation, button, defineChatFlow, message, option } from '~/chat-flow'

export default defineChatFlow({
  start: 'welcome',
  steps: {
    welcome: message({
      say: "Hi, I'm Volty's assistant 👋 See how Volty fits your business in 2 minutes.\n\nYou're chatting with Volty's AI assistant, here to answer questions about Volty. A person can step in at any time.",
      buttons: [
        button('Find my Volty fit (2 min)', 'q_industry'),
        button('Calculate my time savings', 'c_vol'),
        button('Pricing', 'pricing'),
        button('See how Volty works', 'how'),
        button('Compare Volty vs a competitor', 'cmp'),
        button('Talk to a human', 'human'),
      ],
      otherwise: 'volty',
    }),

    how: message({
      say: 'Volty is an AI helpdesk. It puts WhatsApp, Instagram, Messenger, email and web chat in one shared inbox, with an AI agent that answers customers and takes actions in your systems, like booking an appointment or updating your CRM. It starts in draft mode, so a person approves replies until you decide otherwise.',
      buttons: [
        button('Is Volty right for me?', 'q_industry'),
        button('Pricing', 'pricing'),
        button('Talk to a human', 'human'),
      ],
      otherwise: 'volty',
    }),

    pricing: message({
      say: 'Plans are billed monthly with a 7-day free trial, no credit card. In US$: Plus $159 (6 seats, 1,000 active contacts), Pro $399 (20 seats, 2,000 contacts), Max $799 (40 seats, 5,000 contacts), and Enterprise on request. Every plan includes all channels and integrations. Meta bills WhatsApp messages separately. Full details: https://voltade.com/pricing. Singapore prices are in S$ at https://voltade.com/sg/pricing.',
      buttons: [
        button('Which plan fits me?', 'q_industry'),
        button('Start 7-day free trial', 'trial'),
        button('Talk to sales', 'human'),
        button('Ask me anything', 'ask_any'),
      ],
      otherwise: 'volty',
    }),
    pricing_end: message({
      say: 'Plans are billed monthly with a 7-day free trial, no credit card. In US$: Plus $159, Pro $399, Max $799, and Enterprise on request, with all channels on every plan. Meta bills WhatsApp messages separately. Full details: https://voltade.com/pricing. Singapore prices are in S$ at https://voltade.com/sg/pricing.',
      buttons: [
        button('Start 7-day free trial', 'trial'),
        button('Book a demo / talk to sales', 'demo'),
        button('Ask me anything', 'ask_any'),
      ],
      otherwise: 'volty',
    }),

    human: message({
      say: "Of course. I'm connecting you with our team now, and someone will reply here soon.",
      next: 'team',
    }),
    demo: message({
      say: "Great. I'm bringing in our Sales team to set up a demo, and someone will reply here soon.",
      next: 'team',
    }),
    trial: message({
      say: 'Start your 7-day free trial here, no credit card needed: https://volty.voltade.com/signup',
      buttons: [
        button('Book a demo / talk to sales', 'demo'),
        button('See pricing', 'pricing_end'),
        button('Ask me anything', 'ask_any'),
      ],
      otherwise: 'volty',
    }),
    ask_any: message({
      say: 'Sure, type your question and I will answer from what Volty has published.',
      next: 'volty',
    }),

    q_industry: message({
      say: 'Great, a few quick taps. What industry are you in?',
      buttons: [
        button('Education', 'i_edu'),
        button('Clinics & Spas', 'i_clinic'),
        button('B2B', 'i_b2b'),
        button('E-commerce', 'i_ecom'),
        button('Retail', 'i_retail'),
        button('Other', 'i_other'),
      ],
      otherwise: 'i_route',
    }),
    i_route: aiRoute({
      decide: 'Which industry is the visitor in?',
      options: [
        option('Education', 'schools, tutoring, swim schools, courses, training', 'i_edu'),
        option('Clinics & Spas', 'clinics, dental, aesthetics, TCM, spas, salons, wellness', 'i_clinic'),
        option('B2B', 'sells to other businesses: manufacturing, wholesale, agencies, software', 'i_b2b'),
        option('E-commerce', 'sells online through a web shop or marketplace', 'i_ecom'),
        option('Retail', 'physical shops and stores', 'i_retail'),
        option('Other', 'anything else, such as finance, property, laundry, logistics', 'i_other'),
      ],
      sure: 0.7,
      unsure: 'i_other',
    }),
    i_edu: automation({ run: 'lead-pick', input: { value: 'Education' }, save: 'industry', next: 'q_channel', failed: 'volty' }),
    i_clinic: automation({ run: 'lead-pick', input: { value: 'Clinics & Spas' }, save: 'industry', next: 'q_channel', failed: 'volty' }),
    i_b2b: automation({ run: 'lead-pick', input: { value: 'B2B' }, save: 'industry', next: 'q_channel', failed: 'volty' }),
    i_ecom: automation({ run: 'lead-pick', input: { value: 'E-commerce' }, save: 'industry', next: 'q_channel', failed: 'volty' }),
    i_retail: automation({ run: 'lead-pick', input: { value: 'Retail' }, save: 'industry', next: 'q_channel', failed: 'volty' }),
    i_other: automation({ run: 'lead-pick', input: { value: 'Other' }, save: 'industry', next: 'q_channel', failed: 'volty' }),

    q_channel: message({
      say: 'Which channel do your customers use most?',
      buttons: [
        button('WhatsApp', 'ch_wa'),
        button('Instagram', 'ch_ig'),
        button('Messenger', 'ch_ms'),
        button('Email', 'ch_em'),
        button('Web chat', 'ch_web'),
      ],
      otherwise: 'ch_route',
    }),
    ch_route: aiRoute({
      decide: 'Which one channel do the visitor customers use most?',
      options: [
        option('WhatsApp', 'WhatsApp or WhatsApp Business', 'ch_wa'),
        option('Instagram', 'Instagram DMs', 'ch_ig'),
        option('Messenger', 'Facebook Messenger', 'ch_ms'),
        option('Email', 'email', 'ch_em'),
        option('Web chat', 'chat on a website', 'ch_web'),
        option('Something else', 'any other channel such as phone, SMS, WeChat, LINE or Telegram', 'ch_other'),
      ],
      sure: 0.7,
      unsure: 'volty',
    }),
    ch_wa: automation({ run: 'lead-pick', input: { value: 'WhatsApp' }, save: 'channel', next: 'q_extra', failed: 'volty' }),
    ch_ig: automation({ run: 'lead-pick', input: { value: 'Instagram' }, save: 'channel', next: 'q_extra', failed: 'volty' }),
    ch_ms: automation({ run: 'lead-pick', input: { value: 'Messenger' }, save: 'channel', next: 'q_extra', failed: 'volty' }),
    ch_em: automation({ run: 'lead-pick', input: { value: 'Email' }, save: 'channel', next: 'q_extra', failed: 'volty' }),
    ch_web: automation({ run: 'lead-pick', input: { value: 'Web chat' }, save: 'channel', next: 'q_extra', failed: 'volty' }),
    ch_other: automation({ run: 'lead-pick', input: { value: 'Other' }, save: 'channel', next: 'q_extra', failed: 'volty' }),

    q_extra: message({
      say: 'Do you use another channel too?',
      buttons: [
        button('Just this one', 'ex_0'),
        button('One more', 'ex_1'),
        button('Two or more', 'ex_2'),
      ],
      otherwise: 'ex_route',
    }),
    ex_route: aiRoute({
      decide: 'How many other channels does the visitor use besides the main one?',
      options: [
        option('None', 'no other channel, only the main one, or a no', 'ex_0'),
        option('One', 'exactly one other channel', 'ex_1'),
        option('Two or more', 'two or more other channels', 'ex_2'),
      ],
      sure: 0.7,
      unsure: 'volty',
    }),
    ex_0: automation({ run: 'lead-pick', input: { value: 'none' }, save: 'extra', next: 'q_volume', failed: 'volty' }),
    ex_1: automation({ run: 'lead-pick', input: { value: 'one' }, save: 'extra', next: 'q_volume', failed: 'volty' }),
    ex_2: automation({ run: 'lead-pick', input: { value: 'two+' }, save: 'extra', next: 'q_volume', failed: 'volty' }),

    q_volume: message({
      say: 'Roughly how many customer conversations do you handle a month?',
      buttons: [
        button('Under 500', 'v_1'),
        button('500 to 2k', 'v_2'),
        button('2k to 10k', 'v_3'),
        button('10k+', 'v_4'),
      ],
      otherwise: 'v_route',
    }),
    v_route: aiRoute({
      decide: 'Which band holds the number of customer conversations a month the visitor wrote? Use the number they gave, even when it is rough.',
      options: [
        option('Under 500', 'fewer than 500 a month, such as 50, 100 or 300', 'v_1'),
        option('500 to 2k', 'from 500 up to 2,000 a month', 'v_2'),
        option('2k to 10k', 'from 2,000 up to 10,000 a month, such as 3000 or 5k', 'v_3'),
        option('10k+', 'more than 10,000 a month', 'v_4'),
      ],
      sure: 0.7,
      unsure: 'volty',
    }),
    v_1: automation({ run: 'lead-pick', input: { value: '<500' }, save: 'volume', next: 'q_pain', failed: 'volty' }),
    v_2: automation({ run: 'lead-pick', input: { value: '500-2k' }, save: 'volume', next: 'q_pain', failed: 'volty' }),
    v_3: automation({ run: 'lead-pick', input: { value: '2k-10k' }, save: 'volume', next: 'q_pain', failed: 'volty' }),
    v_4: automation({ run: 'lead-pick', input: { value: '10k+' }, save: 'volume', next: 'q_pain', failed: 'volty' }),

    q_pain: message({
      say: "What's your biggest pain right now?",
      buttons: [
        button('Slow replies', 'p_1'),
        button('Repetitive questions', 'p_2'),
        button('Leads slipping through', 'p_3'),
        button('No visibility', 'p_4'),
      ],
      otherwise: 'p_route',
    }),
    p_route: aiRoute({
      decide: 'What is the visitor biggest pain with customer messages?',
      options: [
        option('Slow replies', 'customers wait too long for an answer', 'p_1'),
        option('Repetitive questions', 'the same questions again and again, wanting automation', 'p_2'),
        option('Leads slipping through', 'enquiries or leads get missed or lost', 'p_3'),
        option('No visibility', 'no overview, reports or tracking of conversations', 'p_4'),
      ],
      sure: 0.7,
      unsure: 'volty',
    }),
    p_1: automation({ run: 'lead-pick', input: { value: 'Slow replies' }, save: 'pain', next: 'q_tool', failed: 'volty' }),
    p_2: automation({ run: 'lead-pick', input: { value: 'Repetitive questions' }, save: 'pain', next: 'q_tool', failed: 'volty' }),
    p_3: automation({ run: 'lead-pick', input: { value: 'Leads slipping through' }, save: 'pain', next: 'q_tool', failed: 'volty' }),
    p_4: automation({ run: 'lead-pick', input: { value: 'No visibility' }, save: 'pain', next: 'q_tool', failed: 'volty' }),

    q_tool: message({
      say: 'Using anything today? (optional)',
      buttons: [
        button('Spreadsheets', 't_sheet'),
        button('Another helpdesk', 't_help'),
        button('Nothing', 't_none'),
        button('Skip', 't_skip'),
      ],
      otherwise: 'tool_route',
    }),
    tool_route: aiRoute({
      decide: 'What does the visitor use today to handle customer messages?',
      options: [
        option('Spreadsheets', 'spreadsheets, Excel, Google Sheets, notes or manual tracking', 't_sheet'),
        option('Another helpdesk', 'a named helpdesk, CRM, inbox or chat tool such as Zendesk, Intercom, SleekFlow or HubSpot', 't_help'),
        option('Nothing', 'nothing, or only the phone and the normal WhatsApp app', 't_none'),
        option('Skip', 'wants to skip or does not want to say', 't_skip'),
        option('Yes without saying what', 'only says yes or that they use something, without naming it', 'tool_which'),
      ],
      sure: 0.7,
      unsure: 'tool_again',
    }),
    tool_which: message({
      say: 'Which one?',
      buttons: [
        button('Spreadsheets', 't_sheet'),
        button('Another helpdesk', 't_help'),
        button('Nothing', 't_none'),
        button('Skip', 't_skip'),
      ],
      otherwise: 'tool_route2',
    }),
    tool_route2: aiRoute({
      decide: 'What does the visitor use today to handle customer messages?',
      options: [
        option('Spreadsheets', 'spreadsheets, Excel, Google Sheets, notes or manual tracking', 't_sheet'),
        option('Another helpdesk', 'a named helpdesk, CRM, inbox or chat tool such as Zendesk, Intercom, SleekFlow or HubSpot', 't_help'),
        option('Nothing', 'nothing, or only the phone and the normal WhatsApp app', 't_none'),
        option('Skip', 'wants to skip or does not want to say', 't_skip'),
      ],
      sure: 0.7,
      unsure: 't_skip',
    }),
    tool_again: message({
      say: 'Sorry, I did not catch that. Using anything today? (optional)',
      buttons: [
        button('Spreadsheets', 't_sheet'),
        button('Another helpdesk', 't_help'),
        button('Nothing', 't_none'),
        button('Skip', 't_skip'),
      ],
      otherwise: 't_skip',
    }),
    t_sheet: automation({ run: 'lead-pick', input: { value: 'Spreadsheets' }, save: 'tool', next: 'q_team', failed: 'volty' }),
    t_help: automation({ run: 'lead-pick', input: { value: 'Another helpdesk' }, save: 'tool', next: 'q_team', failed: 'volty' }),
    t_none: automation({ run: 'lead-pick', input: { value: 'Nothing' }, save: 'tool', next: 'q_team', failed: 'volty' }),
    t_skip: automation({ run: 'lead-pick', input: { value: '-' }, save: 'tool', next: 'q_team', failed: 'volty' }),

    q_team: message({
      say: 'How big is the team that answers customers? (optional)',
      buttons: [
        button('Just me', 'm_1'),
        button('2 to 5', 'm_2'),
        button('6 to 20', 'm_3'),
        button('20+', 'm_4'),
        button('Skip', 'm_skip'),
      ],
      otherwise: 'team_route',
    }),
    team_route: aiRoute({
      decide: 'How many people are on the visitor team that answers customers?',
      options: [
        option('Just me', 'only one person, the visitor alone', 'm_1'),
        option('2 to 5', 'two to five people', 'm_2'),
        option('6 to 20', 'six to twenty people', 'm_3'),
        option('20+', 'more than twenty people', 'm_4'),
        option('Skip', 'wants to skip or does not want to say', 'm_skip'),
      ],
      sure: 0.7,
      unsure: 'team_again',
    }),
    team_again: message({
      say: 'Sorry, I did not catch that. How big is the team that answers customers? (optional)',
      buttons: [
        button('Just me', 'm_1'),
        button('2 to 5', 'm_2'),
        button('6 to 20', 'm_3'),
        button('20+', 'm_4'),
        button('Skip', 'm_skip'),
      ],
      otherwise: 'm_skip',
    }),
    m_1: automation({ run: 'lead-pick', input: { value: 'Just me' }, save: 'team', next: 'q_timeline', failed: 'volty' }),
    m_2: automation({ run: 'lead-pick', input: { value: '2 to 5' }, save: 'team', next: 'q_timeline', failed: 'volty' }),
    m_3: automation({ run: 'lead-pick', input: { value: '6 to 20' }, save: 'team', next: 'q_timeline', failed: 'volty' }),
    m_4: automation({ run: 'lead-pick', input: { value: '20+' }, save: 'team', next: 'q_timeline', failed: 'volty' }),
    m_skip: automation({ run: 'lead-pick', input: { value: '-' }, save: 'team', next: 'q_timeline', failed: 'volty' }),

    q_timeline: message({
      say: 'When are you looking to get started?',
      buttons: [
        button('Now', 'tl_now'),
        button('In 1 to 3 months', 'tl_13'),
        button('Just exploring', 'tl_ex'),
      ],
      otherwise: 'tl_route',
    }),
    tl_route: aiRoute({
      decide: 'When does the visitor want to get started?',
      options: [
        option('Now', 'now, asap, today, this week or as soon as possible', 'tl_now'),
        option('In 1 to 3 months', 'within the next one to three months, next month or soon', 'tl_13'),
        option('Just exploring', 'just browsing, no plan, later than three months or not sure', 'tl_ex'),
      ],
      sure: 0.7,
      unsure: 'volty',
    }),
    tl_now: automation({ run: 'lead-pick', input: { value: 'now' }, save: 'timeline', next: 'q_send', failed: 'volty' }),
    tl_13: automation({ run: 'lead-pick', input: { value: '1-3 months' }, save: 'timeline', next: 'q_send', failed: 'volty' }),
    tl_ex: automation({ run: 'lead-pick', input: { value: 'just exploring' }, save: 'timeline', next: 'q_send', failed: 'volty' }),

    q_send: message({
      say: 'That is everything I need. Want our team to follow up with this summary?',
      buttons: [button('Yes', 'q_name'), button('Skip for now', 'fit_skip')],
      otherwise: 'send_route',
    }),
    send_route: aiCheck({
      check: 'Does the visitor want the team to follow up with them?',
      sure: 0.7,
      yes: 'q_name',
      no: 'fit_skip',
      unsure: 'volty',
    }),
    q_name: ask({ say: "What's your name?", save: 'leadName', next: 'q_email' }),
    q_email: ask({
      say: 'And your work email?',
      save: 'leadEmail',
      expect: 'email',
      retry: "That doesn't look like an email address. Could you type it again?",
      next: 'q_phone',
    }),
    q_phone: ask({
      say: 'Your WhatsApp number, with country code?',
      save: 'leadPhone',
      expect: 'phone',
      retry: 'Could you include the country code, like +65 9123 4567?',
      next: 'q_company',
    }),
    q_company: ask({
      say: 'Your company name? (optional, type skip to leave it)',
      save: 'leadCompany',
      next: 'fit_yes',
    }),
    fit_yes: automation({
      run: 'fit-summary',
      input: { name: '{leadName}', industry: '{industry.value}', channel: '{channel.value}', extra: '{extra.value}', volume: '{volume.value}', pain: '{pain.value}', tool: '{tool.value}', team: '{team.value}', timeline: '{timeline.value}' },
      save: 'fit',
      next: 'card',
      failed: 'volty',
    }),
    fit_skip: automation({
      run: 'fit-summary',
      input: { name: '-', industry: '{industry.value}', channel: '{channel.value}', extra: '{extra.value}', volume: '{volume.value}', pain: '{pain.value}', tool: '{tool.value}', team: '{team.value}', timeline: '{timeline.value}' },
      save: 'fit',
      next: 'card',
      failed: 'volty',
    }),
    card: message({
      say: '{fit.title}\n\n{fit.plan}\n\n{fit.features}\n\n{fit.example}\n{fit.estimate}\n\n{fit.footnote}',
      buttons: [
        button('Start 7-day free trial', 'trial'),
        button('Book a demo / talk to sales', 'demo'),
        button('See pricing', 'pricing_end'),
        button('Ask me anything', 'ask_any'),
      ],
      otherwise: 'volty',
    }),

    c_vol: message({
      say: 'Quick estimate. Roughly how many customer conversations do you handle a month?',
      buttons: [
        button('Under 500', 'cv_1'),
        button('500 to 2k', 'cv_2'),
        button('2k to 10k', 'cv_3'),
        button('10k+', 'cv_4'),
      ],
      otherwise: 'cv_route',
    }),
    cv_route: aiRoute({
      decide: 'Which band holds the number of customer conversations a month the visitor wrote? Use the number they gave, even when it is rough.',
      options: [
        option('Under 500', 'fewer than 500 a month, such as 50, 100 or 300', 'cv_1'),
        option('500 to 2k', 'from 500 up to 2,000 a month', 'cv_2'),
        option('2k to 10k', 'from 2,000 up to 10,000 a month, such as 3000 or 5k', 'cv_3'),
        option('10k+', 'more than 10,000 a month', 'cv_4'),
      ],
      sure: 0.7,
      unsure: 'volty',
    }),
    cv_1: automation({ run: 'lead-pick', input: { value: '<500' }, save: 'cvol', next: 'c_pct', failed: 'volty' }),
    cv_2: automation({ run: 'lead-pick', input: { value: '500-2k' }, save: 'cvol', next: 'c_pct', failed: 'volty' }),
    cv_3: automation({ run: 'lead-pick', input: { value: '2k-10k' }, save: 'cvol', next: 'c_pct', failed: 'volty' }),
    cv_4: automation({ run: 'lead-pick', input: { value: '10k+' }, save: 'cvol', next: 'c_pct', failed: 'volty' }),
    c_pct: message({
      say: 'And roughly what share of them are repetitive questions?',
      buttons: [button('About 25%', 'cp_1'), button('About 50%', 'cp_2'), button('About 75%', 'cp_3')],
      otherwise: 'cp_route',
    }),
    cp_route: aiRoute({
      decide: 'What share of the visitor conversations are repetitive questions?',
      options: [
        option('About 25%', 'under about 37 percent, a minority', 'cp_1'),
        option('About 50%', 'about 37 to 62 percent, around half', 'cp_2'),
        option('About 75%', 'over about 62 percent, most of them', 'cp_3'),
      ],
      sure: 0.7,
      unsure: 'volty',
    }),
    cp_1: automation({ run: 'lead-pick', input: { value: '25%' }, save: 'cpct', next: 'c_run', failed: 'volty' }),
    cp_2: automation({ run: 'lead-pick', input: { value: '50%' }, save: 'cpct', next: 'c_run', failed: 'volty' }),
    cp_3: automation({ run: 'lead-pick', input: { value: '75%' }, save: 'cpct', next: 'c_run', failed: 'volty' }),
    c_run: automation({
      run: 'savings-calc',
      input: { volume: '{cvol.value}', repetitive: '{cpct.value}' },
      save: 'calc',
      next: 'c_show',
      failed: 'volty',
    }),
    c_show: message({
      say: '{calc.text}',
      buttons: [
        button('Is Volty right for me?', 'q_industry'),
        button('Start 7-day free trial', 'trial'),
        button('Talk to sales', 'demo'),
        button('Ask me anything', 'ask_any'),
      ],
      otherwise: 'volty',
    }),

    cmp: message({
      say: 'Which tool are you comparing Volty with?',
      buttons: [
        button('SleekFlow', 'cmp_sleek'),
        button('Respond.io', 'cmp_respond'),
        button('Wati', 'cmp_wati'),
        button('Twilio', 'cmp_twilio'),
        button('Another one', 'cmp_other'),
      ],
      otherwise: 'volty',
    }),
    cmp_sleek: message({
      say: "SleekFlow is a helpdesk your team configures, and Volty is built around an AI agent that acts on its own. Volty's comparison page says every integration and the AI agent are on every Volty plan, where SleekFlow gates them to higher plans. To be fair, that same page says SleekFlow is the better pick for WeChat, LINE and the widest channel list. More: https://voltade.com/compare",
      buttons: [button('Start 7-day free trial', 'trial'), button('Talk to sales', 'demo'), button('Ask me anything', 'ask_any')],
      otherwise: 'volty',
    }),
    cmp_respond: message({
      say: "Respond.io is a mature product with the widest channel coverage, including VoIP, LINE and custom channels, and it routes conversations to your people. Volty puts an AI agent in front of them, and has a built-in migration that keeps your numbers, history, templates and team, though workflows and directly connected channels stay behind (all per Volty's comparison page). More: https://voltade.com/compare",
      buttons: [button('Start 7-day free trial', 'trial'), button('Talk to sales', 'demo'), button('Ask me anything', 'ask_any')],
      otherwise: 'volty',
    }),
    cmp_wati: message({
      say: "Wati is a WhatsApp specialist, and Volty's own page calls it a simpler, cheaper starting point for broadcasts plus a short FAQ flow you maintain. Volty also covers email and includes its AI agent, where Wati's Astra agent is a separate subscription (per Volty's comparison page). More: https://voltade.com/compare",
      buttons: [button('Start 7-day free trial', 'trial'), button('Talk to sales', 'demo'), button('Ask me anything', 'ask_any')],
      otherwise: 'volty',
    }),
    cmp_twilio: message({
      say: "Twilio sells WhatsApp as an API, with no inbox, and also SMS and voice, which Volty does not offer. Volty is a ready-made inbox, CRM and AI agent with no per-message fee of its own, though Meta's WhatsApp charges still apply (per Volty's comparison page). More: https://voltade.com/compare",
      buttons: [button('Start 7-day free trial', 'trial'), button('Talk to sales', 'demo'), button('Ask me anything', 'ask_any')],
      otherwise: 'volty',
    }),
    cmp_other: message({
      say: 'Tell me which tool, and what matters most to you. I will compare fairly from what Volty has published, and say so when I am not sure.',
      next: 'volty',
    }),
  },
})
