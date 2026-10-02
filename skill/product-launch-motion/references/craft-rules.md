# Craft rules (sound-off first)

## Text
- One idea per card. **≤8 words** (aim for 3–6), ≤2 lines, headlines ≤30 characters per line.
- Hold time after the text finishes animating in: `max(1.2 s, 0.5 s + 0.33 s × words)`.
- Whole video: about 2–2.7 words per second at most (a 30 s video carries 60–80 words at most).
- Word-by-word reveals: 0.25–0.33 s per word, then hold the full line for at least 0.8 s.
- Minimum sizes at 1080 px wide:

  | Text | Size |
  |---|---|
  | Hook | 60–72 px bold |
  | CTA | 48–60 px |
  | Floor | 36 px |
  | Small UI labels | 22–28 px (16:9 only) |

- Contrast ≥ 4.5:1 (3:1 for large text). `hyperframes check` enforces this.

## Story
- Hook in 0–3 s. Never open on a slow logo sting.
- Show, don't claim: the typed prompt is the subtitle, and status verbs ("Evaluating…" → "✓ Passed") narrate.
- Narration patterns:
  - Parallel headline ladders: "It drafts / It schedules / It ships".
  - Swap-the-last-word lines.
  - Counters as proof.
  - The cursor as protagonist.
  - A macro punch-in on the hero button.
- At most 3 product moments, each with a 2–4 word label.

## Motion
- **Camera:** UI tilted 6–20° with a slow drift; a macro push to the key button, then pull back; end on a zoom-out to a "wall" of outputs.
- **Entrances:** fast snap (0.15–0.5 s, `power3.out` / `expo.out`) with blur → sharp.
- **Never let the frame fully settle** before a cut.
- **Transitions:** iris in the brand color on the music drop; panel slide-up; horizontal push; a shape that becomes the logo's mark.
- **Pacing:** shots of 1.5–3 s, text cards of 1.5–2 s, teasers ~1 cut/s.

## End card
Tagline → availability line ("Available today", a date) → logo → CTA/URL. Hold 2–4 s.

## Sound
- The music drop lands on the reveal.
- SFX stay subtle (0.15–0.45): clicks for UI, pops for items, whooshes for transitions, a low impact on the drop, a riser into it.
- **No glassy or shimmer SFX.**

## Accessibility
- ≤3 flashes per second.
- Captions for the VO version: the on-screen text should already carry the story.

## Data
- Fictional data in recreated UI.
- Real metrics only from the user, with a source.
- Illustrative numbers are labelled "Illustrative".
