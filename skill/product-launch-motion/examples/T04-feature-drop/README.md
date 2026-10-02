# T04 — Feature Drop / Changelog Clip

- **Type:** T4 Feature Drop / Changelog Clip (one feature, one interaction, no intro)
- **Fake brand:** Tallyo — invoicing app (invented; wordmark + tally-bars mark built in SVG/CSS)
- **Feature:** Bulk-edit invoices
- **Format:** 1920×1080, 30 fps, MP4 (H.264 + AAC)
- **Length:** 9.5 s
- **Render:** `../renders/T04-feature-drop.mp4`
- **Project:** `video/index.html` (HyperFrames, single monolithic composition)

## Brand system (shared with T09)
- Colors: paper `#F4F6F1`, ink `#10201A`, emerald primary `#0F7A55`, mint `#CFF1E0`, peach `#FFD9C2`; status pills Draft / Sent (`#2B50C8`) / Paid (`#0F7A55`)
- Type: Sora 700 (display, wordmark) + Inter 400/500/700 (UI/body)
- Radii: window 24, cards 18, controls 12, pills 999
- Look: light framed app window on a soft mint→peach gradient, dot grain, emerald-tinted shadows

## Beats
| Time | On-screen text | Visual |
|---|---|---|
| 0.0–1.3 | "New · Bulk-edit invoices" (caption) | Starts mid-action: Invoices table with 2 rows already ticked; cursor ticks 3 more, floating bulk bar counts 2→5 |
| 1.3–2.0 | — | Cursor to "Edit fields" in the bulk bar, click |
| 2.0–3.7 | "Edit 5 invoices" (UI) | Camera pushes in on the popover; Status select opens; Draft → **Sent** picked |
| 3.8–4.4 | "Apply to 5 invoices" (UI) | Cursor clicks Apply — lands on the music drop (4.4 s) |
| 4.4–6.3 | "5 invoices updated" (toast) | Camera pulls back; Draft pills cascade to Sent row by row; bar morphs into toast |
| 6.3–7.2 | — | Window drops away; caption travels to centre and grows |
| 7.2–9.5 | "Bulk-edit invoices" → "Now in Tallyo · every plan" → tallyo wordmark → "tallyo.app/changelog" | End card |

## Audio
- Music: `bgm-tech` (minimal synth + piano), `data-media-start` 27.65 s so the track's drop (32.05 s) hits the Apply click at 4.4 s; vol 0.45, fade in 0.5 s, fade out last 1.4 s
- SFX (subtle, 0.2–0.35): click-soft (row ticks, select, option), click (Edit, Apply), pop (toast), whoosh-short (end transition). No glassy sounds, no VO.

All data (clients, amounts, invoice numbers) is fictional.
