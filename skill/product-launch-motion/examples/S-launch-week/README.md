# S — Launch-Week Series (package demo) · Driftbase Launch Week

- **Type:** S Launch-Week Series. This one video shows the whole system: teaser → Day 1…5 bumpers → bento recap → end card.
- **Fake brand:** Driftbase (deploy platform). Same brand as `T03-ui-hero`: near-black `#07080B`, one electric periwinkle accent `#7B8CFF`, Inter + JetBrains Mono, branch-glyph mark, `driftbase.dev`.
- **Series system:** one title template (DAY 0N / 05 in mono, a 2-word feature name, a ≤5-word sub, a date line, and a tilted UI panel on the right), a persistent top bar with a MON–FRI rail that fills day by day, a colour-wipe bumper before each day, and a fixed colour per day: D1 `#7B8CFF`, D2 `#3DDC97`, D3 `#F5B454`, D4 `#FF7A9C`, D5 `#5CD3F5`.
- **Format:** 1920×1080, 30 fps, **24.0 s** → `../renders/S-launch-week.mp4`
- **Music:** `bgm-tech` (minimal synth + piano, 120 BPM), `data-media-start=29.04` so the drop (32.04 s) hits the Day 1 bumper at 3.0 s. Each day is 6 beats (3.0 s). Fades in over 0.5 s and out over the last 1.4 s.
- **SFX:** riser in the teaser, soft clicks as the 5 day-ticks light up, a short whoosh on every bumper, a low impact on the drop, clicks and pops for UI actions, typing for the CLI, and a low impact on the logo. Nothing glassy.

## Beats
| Time | On-screen text | Visual |
|---|---|---|
| 0.0–3.0 | driftbase · **Launch Week** · "Five days. Five launches." | Dark grid with a periwinkle glow. The MON–FRI ticks ignite in each day's colour on half-beats. Riser builds. |
| 2.72–3.3 | DAY 1 | Periwinkle wipe bumper, on the music drop |
| 3.0–6.0 | DAY 01 / 05 · **Preview environments** · "A URL per branch." | 3 PR branches flip Building → Ready, and preview URLs appear |
| 6.0–9.0 | DAY 02 / 05 · **Instant rollbacks** · "Undo in one click." | Deploy list shows v42 with a 5xx spike. The cursor clicks "Roll back", Live moves to v41, and a toast reads "Rolled back in 1.2s". |
| 9.0–12.0 | DAY 03 / 05 · **Edge logs** · "Every request, streamed live." | A mono log stream scrolls. A `status: 500` filter turns on and the error rows stay highlighted. |
| 12.0–15.0 | DAY 04 / 05 · **Secrets sync** · "One vault, every env." | Env-var table. The P/S/D environment chips light up, then a "Synced to 3 environments" banner appears. |
| 15.0–18.0 | DAY 05 / 05 · **CLI 2.0** · "Ship from your terminal." | `drift deploy --prod` types in, 3 checkmarks print, then "Live in 9s" |
| 18.0–21.3 | **Five launches. One week.** | Bento recap: 5 day tiles (day colour bar, DAY N · DOW, name, glyph) plus a periwinkle brand tile. Tiles pop on beats, then the camera pushes into the brand tile. |
| 21.35–24.0 | driftbase · **Launch Week · all five live today** · driftbase.dev/launch-week → | Periwinkle end card with dark lockup and CTA pill |

All data (branches, deploys, logs, keys) is fictional demo content.
