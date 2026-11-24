# Contact fields and labels

Created with `volty contacts manage-attribute-definition` and `volty contacts describe-label`.

## Contact fields

| Key | Type | Allowed values |
|---|---|---|
| `industry` | list | Education, Clinics & Spas, B2B, E-commerce, Retail, Other |
| `channels_used` | text | Main channel, plus "(+1 other)" or "(+2 or more other)" |
| `monthly_volume` | list | `<500`, `500-2k`, `2k-10k`, `10k+` |
| `main_pain` | list | slow replies, repetitive questions, leads slipping through, no visibility |
| `current_tool` | text | Spreadsheets, Another helpdesk, Nothing (anything else is not stored) |
| `team_size` | text | Just me, 2 to 5, 6 to 20, 20+ (anything else is not stored) |
| `timeline` | list | now, 1-3 months, just exploring |
| `lead_score` | list | hot, warm, cold |
| `company` | text | As typed, if given |
| `stated_email` | text | The work email the visitor typed in chat |
| `stated_phone` | text | The WhatsApp number the visitor typed in chat |

`stated_email` and `stated_phone` exist because an automation cannot write a contact's real email or phone
identifier (see the README). They hold what the visitor typed, nothing verified.

## Contact labels

All four are set to "Volty may add this automatically" and carry a plain-language description the agent reads.

| Label | Meaning |
|---|---|
| `lead:hot` | Wants to start now with 2,000+ monthly conversations on any number of channels, or 500-2,000 conversations on 2+ channels |
| `lead:warm` | Fits Volty but is not urgent: lower volume, or a timeline of 1-3 months |
| `lead:cold` | Just exploring, a student, or no clear need |
| `existing-customer` | Already uses Volty and writes in for support |

A label only exists once a contact carries it, so a placeholder contact had to hold all four before they could
be described. Delete that contact only after checking the labels survive.
