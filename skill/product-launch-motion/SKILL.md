---
name: product-launch-motion
description: Make a product or feature launch video for any brand, fully generated in code (HTML + GSAP rendered to MP4 with HyperFrames). No footage, no stock. Interviews the user about the product, the feature and the brand, recommends the best video type from 12 (teaser, kinetic type, UI hero reveal, feature drop, roundup, before/after, problem→solution, use-case montage, integration, milestone, launch-week series, kinetic shape brand film), or rebuilds the motion of a reference video the user loves, captures real product screens through Claude in Chrome or asks for a precise shot list, then builds, reviews and renders. Optional ElevenLabs voice-over. Use for "launch video", "feature announcement video", "promo for our new feature", "changelog clip", "teaser", "launch week videos".
---

# Product Launch Motion

Turn a product or feature into a launch video that looks hand-made by a motion studio, generated entirely in code.

**Engine:** [HyperFrames](https://hyperframes.heygen.com) (HTML compositions → MP4). Before writing any composition, load `/hyperframes` and read `/hyperframes-core` (contract + lint pitfalls). If HyperFrames skills are missing: `npx hyperframes skills update`.

**Hard rules**
- Everything is generated in code. Never propose real footage, live action, a presenter on camera, stock video or external 3D.
- Never invent product facts, stats, quotes or customer logos. Every on-screen claim needs a source the user gave you. Demo/UI numbers inside a recreated product screen are fine and must be fictional.
- Real customer data never appears in a video. Recreate screens with fictional names and content.
- Sound-off first: the story must read from text and picture alone.

## Workflow

Run the steps in order. Steps marked **GATE** wait for the user.

### 1. Intake — ask, don't assume (GATE)
Ask in one compact message (multiple choice where possible). Full question bank: `references/intake.md`.
1. **Product + feature:** what is it, who is it for, what pain does it remove, what is new exactly?
2. **Launch size:** major launch · big feature · small feature/changelog · teaser · launch week · integration · milestone.
3. **Message:** the one thing a viewer must remember (offer 2–3 options drafted from what you learned).
4. **Proof:** any real, approved number, quote or logo? (If none → no stats.)
5. **Availability + CTA:** GA / beta / plan, date, CTA text + URL.
6. **Platform:** LinkedIn · X · website hero · Product Hunt · YouTube · Reels/TikTok/Shorts → sets aspect ratio + length (`references/platform-specs.md`).
7. **Brand:** website URL, brand guide / UI kit / Figma, logo SVG, fonts, colors (`references/intake.md` § Brand).
8. **Product access:** product URL to open in the user's Chrome, or screenshots (step 3).
9. **Voice-over:** yes / no. If yes → which **language**, and an **ElevenLabs API key**.
10. **Music:** a licensed track the user owns, or an **original track generated with ElevenLabs Music** (`scripts/elevenlabs.mjs music`), or none. Never use unlicensed music.
11. **Reference video?** "Is there a launch video whose style you love?" If yes, follow `references/reference-replication.md`. Copy its motion and structure, never its brand, copy or photos.
12. **Font:** offer a specimen sheet of 6–12 candidate fonts rendered with the user's real lines (headline, sentence, UI string) and let them pick. For Arabic, check that the font supports tashkeel. Check the licence before any public use.

Read the product site yourself first (WebFetch / Chrome) so questions are informed, not generic.

### 2. Recommend the video type (GATE)
If the user supplied a reference video, skip the menu: the reference defines the type.
Use `references/video-types.md` (11 types, beat templates, decision matrix). Recommend **2–3 options**, best first, each with: why it fits, length, format, what assets it needs, difficulty. Default = the lowest-difficulty type that serves the launch size. Show the matching example from the repo README so the user can see it. User picks.

### 3. Get product visuals
- **A. Direct access (preferred):** open the product with Claude in Chrome (`mcp__claude-in-chrome__*`) using the user's logged-in session. If it lands on a login page, ask the user to sign in themselves; never type passwords. Browse read-only (never save, delete, or submit). Capture the states the chosen type needs and write down layouts, labels, colors, flows.
- **B. Shot list fallback:** if there is no access, send the per-type shot list from `references/asset-capture.md` (which screen, which state, light/dark, resolution, clean demo data).
- Rebuild every screen in HTML/CSS with fictional data. Recreated, simplified UI reads better in motion than raw screenshots and keeps private data out.

### 4. Brand system
Extract tokens into `:root` CSS variables: canvas, ink, primary, accents (with usage ratio), display + body font (`@font-face` to local files), radii, shadow style, motion personality. Logo as inline SVG. If the brand has a UI kit HTML/CSS, mine it. Missing pieces → neutral defaults, say so.

### 5. Storyboard + script (GATE)
Write `STORYBOARD.md`: a table with time · scene · on-screen text · visual · sound. Follow the chosen type's beat template and `references/craft-rules.md`:
- ≤8 words per card, hold ≥ `max(1.2s, 0.5 + 0.33×words)`, hook in the first 2–3 s.
- 3 product moments max, one idea each.
- End card: tagline → availability → logo → CTA/URL.

If voice-over: add a **VO line per scene**, sized to the scene (~150 wpm), in the chosen language. **The user approves the storyboard and the VO script before any audio is generated.**

### 6. Voice-over (only if requested)
`node scripts/elevenlabs.mjs voices` → pick a **natural, calm** voice that matches the brand tone (avoid voices that sound synthetic; offer 2–3 short samples if unsure). Model is locked to `eleven_v4`. Store the key in a `.env` file (`ELEVENLABS_API_KEY=…`, chmod 600, git-ignored), never in code or chat output.
```bash
node scripts/elevenlabs.mjs tts --env .env --script vo/lines.json --voice <voice_id> --out assets/vo
```
It writes one mp3 per line plus `manifest.json` with durations. Place each line at its scene start. If a line overruns its scene, retime the scene, not the voice. Duck music to ~0.2 under VO.

### 7. Build
`npx hyperframes init video --non-interactive --example=blank --skill=general-video`, then write `index.html`. Patterns that work (see `examples/*/index.html`):
- Word-by-word blur-in helper.
- Count-up helper.
- Iris and push transitions.
- Seeded PRNG for decorative grids.
- UI cards with a slow 3D tilt drift.
- Cursor with a click ripple.
- Spotlight or highlight ring on the key element.

Audio:
- Align the key reveal to the music's energy drop: measure it, then offset with `data-media-start`.
- SFX: soft clicks, pops, whooshes, low impacts, riser.
- **Never glassy or shimmer sounds** (sparkle, chime, ping, bells).
- Music bed: about 0.45 without VO, about 0.2 under VO, with fade in and fade out.

### 8. Review loop
Motion must follow `references/motion-grammar.md`: 8-frame snap entrances, continuous drift, spatial transitions only, an event every ~0.5 s. Render at 60 fps.
1. `npx hyperframes check` must pass with 0 errors and every contrast check passing.
2. `npx hyperframes snapshot --at <8–15 key times>`, then **look at the contact sheet**.
3. Fix overlaps, empty frames, cut-off text and off-brand moments. Snapshot again.
4. Only then render: `npx hyperframes render --fps 60 -o renders/<name>.mp4`.
5. **Jump scan:** `python3 scripts/jump-scan.py renders/<name>.mp4` must report 0 unexplained flags. A flag usually means a scene background appeared on one frame, or two tweens are fighting over one property.
6. Verify the file: duration, audio present, peaks under −1 dB.

### 9. Deliver + learn
Send the MP4 and list what was assumed. Ask for notes. Turn every note into a rule for this brand (e.g. a `BRAND-RULES.md` next to the project) so the next video starts from it.

## Files
- `references/intake.md`: question bank, brand checklist, minimum brief gate.
- `references/video-types.md`: the 11 types with beat templates and the decision matrix.
- `references/craft-rules.md`: text, pacing, motion, end cards, sound, accessibility.
- `references/asset-capture.md`: Chrome capture protocol and per-type shot lists.
- `references/platform-specs.md`: aspect ratios, lengths, safe zones.
- `references/audio-and-voice.md`: music, SFX and the ElevenLabs flow, including Arabic.
- `references/motion-grammar.md`: measured timings, eases, the 10 rules, anti-patterns, jump QA.
- `references/reference-replication.md`: workflow to match a reference video shot for shot.
- `scripts/jump-scan.py`, `scripts/scene-scan.py`, `scripts/contact-sheets.sh`: QA and reference-analysis tools.
- `scripts/elevenlabs.mjs`: ElevenLabs CLI (voices, tts with timings). Node 18+, no dependencies.
- `examples/<type>/`: source `index.html` and README for each example video (assets not included).
