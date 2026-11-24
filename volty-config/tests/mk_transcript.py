# python -I mk_transcript.py <scenario> -> prints a transcript JSON (oldest first) shaped like the quick path
import json
import sys

scenario = sys.argv[1]
SC = {
    'hot-yes': dict(basis='Clinics & Spas · WhatsApp · 2k-10k a month · slow replies · tool: Spreadsheets · team: 6 to 20 · start: now', follow=True, name='Alex'),
    'hot-skip': dict(basis='Clinics & Spas · WhatsApp · 2k-10k a month · slow replies · start: now', follow=False, name=None),
    'mid-one-channel': dict(basis='Retail · WhatsApp · 500-2k a month · leads slipping through · start: now', follow=True, name='Jo'),
    'mid-two-channels': dict(basis='Retail · WhatsApp +1 · 500-2k a month · leads slipping through · start: now', follow=True, name='Jo'),
    'student': dict(basis='Education · Email · <500 a month · repetitive questions · tool: Nothing · start: just exploring', follow=True, name='Sam'),
    'garbage': dict(basis='Clinics & Spas · WhatsApp · 2k-10k a month · slow replies · tool: Yes · team: 10k · start: now', follow=True, name='Sam'),
    'ai-first': None,
}
sc = SC[scenario]
t = [0]
out = []


def add(role, text):
    t[0] += 1
    out.append({'id': f'm{t[0]:03d}', 'role': role, 'text': text, 'createdAt': f'2026-11-24T10:00:{t[0]:02d}Z'})


add('system', 'Hi! I am the welcome message')
add('contact', 'Is Volty right for my business?')
if sc is None:
    add('agent', 'Hello from the AI')
else:
    if sc['follow']:
        add('system', "What's your name?")
        add('contact', sc['name'])
        add('system', 'And your work email?')
        add('contact', 'pii:emEXAMPLE')
        add('system', 'Your WhatsApp number, with country code?')
        add('contact', '+65 9000 0000')
        add('system', 'Your company name? (optional, type skip to leave it)')
        add('contact', 'Example Clinic')
    title = "Here's your Volty fit" + (', ' + sc['name'] if sc['follow'] else '')
    nl = chr(10)
    add('system', title + nl + nl + 'Max, US$799/month' + nl + nl + '• a' + nl + nl + 'Similar: x' + nl + '~58 hrs/month saved*' + nl + nl + '*Assumes 50% repetitive. Based on: ' + sc['basis'])
print(json.dumps(out))
