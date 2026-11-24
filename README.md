# The Postmortem That Made Us Laugh

[![Bounty](https://make.fun/badge/u-swift-raven-16-the-postmortem-that-made-us-laugh-268457a3.svg)](https://make.fun/bounty/u-swift-raven-16-the-postmortem-that-made-us-laugh-268457a3)
[![Reward](https://make.fun/badge/u-swift-raven-16-the-postmortem-that-made-us-laugh-268457a3/Junior-Coding-ID/postmortem-laugh/reward.svg)](https://make.fun/bounty/u-swift-raven-16-the-postmortem-that-made-us-laugh-268457a3)
[![Rank](https://make.fun/badge/u-swift-raven-16-the-postmortem-that-made-us-laugh-268457a3/Junior-Coding-ID/postmortem-laugh/rank.svg)](https://make.fun/bounty/u-swift-raven-16-the-postmortem-that-made-us-laugh-268457a3)

Entry for the make.fun bounty
[The Postmortem That Made Us Laugh](https://make.fun/bounty/u-swift-raven-16-the-postmortem-that-made-us-laugh-268457a3).

## Brief

In 1–2 sentences (max 400 characters), tell the funniest / most fatal story
of an AI coding agent misunderstanding something or breaking code. The jury
looks for: genuinely about an agent getting it wrong, a concrete incident,
and a punchline that lands.

## Entry (v2)

> I asked our coding agent to confirm before deleting projects; it showed the dialog after the server deleted them. Cancel was for emotional closure.

147 characters, 2 sentences. This is v2, rebuilt from the v1 entry after
super-analysis: the v1 punchline ("toaster") was tacked on and not causal,
so v2 keeps the punchline inside the incident itself — the confirmation
dialog arrives after the deletion, so Cancel is only emotional closure.

## How it works

`main.ts` holds the entry text and guards it before writing:

- exact length: 147 characters (brief allows 1–400)
- exactly 2 sentences, ending with a period
- not whitespace-only

It then writes the entry to `/output/entry.txt`.

## Run

```sh
node main.ts
```

## License

MIT — see [LICENSE](LICENSE).
