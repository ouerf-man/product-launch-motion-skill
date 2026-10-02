# Match a reference video

Use this when the user supplies a video they love ("make it like this"). Copy the **motion grammar, pacing, palette logic and shot structure**. Never copy the reference's logo, copywriting, photos or product. Every photo becomes a code-drawn illustration of the user's product.

1. **Ingest.** Move the file into the project and probe it for fps and duration. Screen recordings are often 60 fps containers holding 30 fps content.
2. **Detect scenes.** Run `python3 scripts/scene-scan.py ref.mov` to get every cut or fast transition, plus a motion-magnitude curve.
3. **Look closely.** Run `bash scripts/contact-sheets.sh ref.mov`: 15 fps sheets for the whole film, plus 30–60 fps sheets ±0.4 s around each transition. Actually open and read them.
4. **Sample colours.** Pull hex values from flat regions, avoiding player overlays and gradients.
5. **Write `MOTION-SPEC.md`.** Include:
   - a shot table with start and end in frames
   - per shot: layout, elements, text size and weight, and motion (from → to, frames, ease, drift rates)
   - a transition catalogue
   - the global grammar (see `motion-grammar.md`)
6. **Map the user's content shot for shot.** Write the on-screen text and VO script fitted to the rhythm (~2.3 words/s). Replace every photo or mask with an illustration card of the same size, timing and blur.
7. **Get approval:** the user approves the script and mapping.
8. **Voice:** generate the voice, export word timings, and sync every beat to its word (±0.05 s). If the voice runs long, time-stretch it with `atempo` ≤ 1.15 rather than cutting approved words.
9. **Build** with the 60 fps grammar, then QA:
   - `hyperframes check`
   - side-by-side frame sheets against the reference
   - `scripts/jump-scan.py` with 0 unexplained flags
   - watch it at full speed
10. **Deliver** with an honest list of where it still differs from the reference.
