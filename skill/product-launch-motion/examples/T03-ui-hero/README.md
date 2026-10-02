# T03 — UI-Motion Hero Reveal ("Linear-style")

- **Type:** T3 UI-Motion Hero Reveal
- **Fake brand:** Driftbase (deploy platform). Wordmark plus a branch-glyph mark in SVG. Fictional workspace "Halcyon", project `storefront-web`, and a demo store "Lumen & Co." All data is invented.
- **Feature:** Preview environments for every branch
- **Format:** 1920×1080, 30 fps, H.264 + AAC
- **Length:** 31.0 s
- **Render:** `../renders/T03-ui-hero.mp4`
- **Project:** `video/index.html` (one monolithic HyperFrames composition)

## Brand system
- Colors: canvas `#07080B`, panels `#0E1015` / `#13161D`, ink `#EDEEF2`, accent periwinkle `#7B8CFF` / `#A3AEFF`, success mint `#3DDC97`, building amber `#F5B454`
- Type: Inter (display + UI) and JetBrains Mono (branches, URLs, terminal)
- Radii: 22 for windows, 14 for buttons, pills for tags
- Labels are small and sentence-case with a mono index chip (`01`, `02`, `03`)

## Camera
One continuous 3D camera (`#cam`, perspective 2400) moves across the rebuilt dashboard:
- blurred, tilted drift during the hook
- un-blur, then settle into a 3D hero pose (rotX 18° / rotY −14°)
- slow drift, then a push toward the new deployment
- macro push-in to 1.85× on "Open preview" with a spotlight
- pull back: the dashboard recedes behind the preview window
- the wall of previews in isometric tilt

The floating terminal and detail panel sit at a real z-depth (translateZ) for parallax.

## Beats
| Time | On-screen text | Visual |
|---|---|---|
| 0.0–3.4 | "See it live. / Before you merge." | Dashboard heavily blurred and tilted, drifting slowly |
| 3.4–6.6 | "New in Driftbase" · "Preview environments" · "for every branch." | Logo mark pops, title words blur in |
| 6.3–7.6 | — | UI un-blurs and swings into the 3D hero pose |
| 7.6–12.3 | **01 Push any branch** | Terminal floats forward and types `git push origin feat/checkout-v2`. A new "Building" row slides into the deployments table. The camera pushes in, and the detail panel shows 5 build steps ticking green (1.2s … 2.0s) |
| 12.4–14.9 | **02 A live URL, instantly** | Status flips to Ready and the URL `checkout-v2.storefront.drift.run` appears. Macro push-in and spotlight; the cursor clicks "Open preview" at **14.5 s**, on the music drop |
| 14.7–21.0 | **03 Review together, then merge** | Preview browser opens on the fictional Lumen & Co. checkout. Two comment pins appear (Maya: "Promo field above the total?" → "Fixed in 4b1e09a"; Theo: "Flow feels fast. Ship it."). Merge request #482 shows 4 green checks; the cursor clicks Merge → "Merged · Preview cleaned up automatically" |
| 21.0–24.5 | "One preview per branch." | Pull back to a tilted wall of 30 branch preview cards |
| 24.5–27.3 | "Preview every branch. / Merge with confidence." | Tagline on a dark field with a soft glow |
| 27.5–31.0 | "driftbase" · "Preview environments · available today on every plan" · `driftbase.dev` | Logo lockup, availability line, CTA pill |

## Audio
- **Music:** `bgm-tech.mp3` (minimal synth + piano), `data-media-start=17.55`, so the track's energy drop (32.05 s) lands on the "Open preview" click at 14.5 s. Volume 0.45, 0.5 s fade-in, fade-out from 29.6 to 31 s.
- **SFX** (from `_shared/sfx`, volume 0.16–0.42):
  - whooshes on scene moves
  - typing + key-press on the terminal
  - soft clicks on build steps and checks
  - pops on the new row, Ready, and comments
  - riser into the drop
  - click + low bass impact on "Open preview"
  - click on Merge
  - low impact on the logo
  - No glassy or shimmer sounds.

## QA
- `npm run check` passes: 0 errors, and 41/41 contrast checks pass.
- The 3D dashboard (`#stagewrap`) and the wall grid are marked `data-layout-ignore`. The layout audit reads 3D-transformed bounding boxes as false overlaps, so I checked those areas visually on snapshots instead.
- Page copy under the comment bubbles is marked `data-layout-allow-overlap` on purpose.
