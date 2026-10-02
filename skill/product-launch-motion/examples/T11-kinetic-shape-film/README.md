# Louagi v6: build notes

- **Render:** `renders/louagi-hook-v6.mp4`. 1920×1080, 60 fps, 49.5 s, H.264 + AAC stereo. True peak −1.7 dBFS, −13.4 LUFS integrated.
- **Source:** `index.html` is one monolithic composition with one paused GSAP timeline, `window.__timelines["main"]`.
  - It is generated from `../v6-src/` (`head.html` + `art.js` + `scenes.js`, assembled by `build.py`, which inlines the icons and `words.json`).
  - You can edit `index.html` directly, but the next `build.py` run overwrites those edits.
- **Previous version:** v5 is backed up to `../index-v5.html.bak`.

## Voice placement and sync model

| line | start (s) | gap before |
|---|---|---|
| l01 | 0.100 | |
| l02 | 2.457 | 0.20 |
| l03 | 7.020 | 0.25 |
| l04 | 12.537 | 0.30 |
| l05 | 17.865 | 0.25 |
| l06 | 26.622 | 0.20 |
| l07 | 37.118 | 0.20 |
| l08 | 41.840 | 0.20 |
| l09 | 45.638 | 0.25 |

Every beat in the JS is written as `w(line, wordIndex)`, which is the line start plus `word.s` from `assets/vo-v6/fast/words.json`. Visual hits therefore land on their word (±1 frame) by construction.

**Music:** `music-v6.mp3` is placed in three pieces.
- **musA** (media 6.0 s) plays the quiet intro bed from 0 to 4.75 s.
- **musB** starts at 4.507 s with `data-media-start=2.0`. This puts the 10.0 s lift at **12.507 s**, 30 ms before «انتهى» at 12.537 s.
- **musC** starts at 44.3 s, re-using media 25.79 s. That is exactly 8 bars (16.0 s at 120 BPM, correlation 0.90) before the point where musB is crossfaded out. It covers the end card and fades out from 48.9 to 49.5 s.
- A volume lane keeps the bed at about 0.22 under the voice, swells to about 0.30 in each voice gap, and runs at about 0.34 on the intro.

**SFX:** 45 cues at 0.10–0.30 (whoosh / whoosh-short / click / click-soft / pop / impact-bass / riser / typing). None are glassy.

## Shot table (absolute times)

| # | time (s) | shot | syncs to |
|---|---|---|---|
| S01 | 0.00–2.46 | Close-up 5.2× on «سَاعَةً» + van tile. Snap zoom-out (12 f power3.out + x-blur), then 1.3→1.0. The line re-centres as words cut in. 7 illustrated tiles flip-book in. | snap on «ساعة» 0.31 (word goes mustard→ink). «ضاعت» 0.80, «وأنت» 1.21 and «تنتظر؟» 1.53 (royal→ink) each hard-cut in. Pre-cut accent at 2.17. |
| S02 | 2.46–3.55 | «الحَرّ» with 8 illustration cards (heat tile, station queue, thermometer 43°, fanning figure, water bottle, sun tile, drop tile, nested shape). Radial burst, 8 f expo.out, DOF on 3 cards, outward drift. | burst on «الحرّ» 2.457 |
| S03 | 3.33–5.20 | Iris zoom-through into mustard/lemon/butter rings. A card counter-rotates and pulls out ×0.65 (quart.out). It shows «٥» + seat row → «/ ٨» + «مَقَاعِد». | iris + «٥» + seats filling on «وخمسة» 3.33. «مقاعد» 3.82. «/ ٨» + 3 empty seats flash red on «ثمانية» 4.34. |
| TR | 4.93–5.20 | Horizontal push left: 16 f power2.inOut, 28 px x-blur. The lead pentagon lags by 10 f (expo.out). | «راكب» 5.13 |
| S04 | 4.93–6.70 | «رَاكِبٌ وَاحِدٌ فَقَطْ…» between a huge nested pentagon (person icon), a green squircle (seat icon) and a red circle (clock). The composition rolls from −13° to 0°. | «واحد» 5.66 and «فقط» 6.08 (red→ink) cut in |
| S05 | 6.30–7.05 | Tilt; the shapes fly off (power3.in + blur); the camera frames the red clock circle (60 % H). The hands snap from 10:10 to 10:25, then whip up. | clock snap 6.74; whip 6.95 |
| S06 | 6.95–9.08 | Bars ("minutes waited") rise as the camera tilts up (expo.out). The staircase chunks «مَرَّ» «ةً» «أُ» «خْرَ» «ى» (split only at non-joining letters) drop onto one baseline. The bars collapse into a 3D queue of red/coral/blush/lilac louage cards. A 20 % H tilt follows, then a hard chunk pop-off at one per 4 f. | bars from «تنظر» 7.02; merge lands on «مرة» 8.06 / «أخرى» 8.48 |
| S07 | 9.08–10.64 | Diagonal pan across 6 perspective cards (departure boards, van rear doors, royal steering-wheel "C" card). Velocity: a 4 f kick, cruise at 1270 px/s, then a whip to 4000 px/s with blur. | pan kick on «وموعدك» 9.08. Board tags flip «في الموعد»→«مُتَأَخِّر» on «يتأخر» 9.71. |
| S08 | 10.45–12.6 | The whip decelerates onto 5 illustration cards: figure checking a watch, phone «٨/٥», empty bench, suitcase, calendar. Slow drift, then a power2.in push-in with the cards streaming out. | landing on «واللواج» 10.53. Phone pulse on «لم» 11.03; progress-bar wobble on «يمتلئ» 11.19; push on «بعد» 11.61. |
| S09 | 11.72–14.36 | Seed (lav squircle + royal dot) grows into a continuous infinite nested zoom: 10 layers lav→royal◇→butter→sky heptagon→lemon→mustard◇→coral→blush→red◇→cream. A monotone-spline zoom decelerates into the logo. | royal layer covers the frame on «انتهى» 12.54 (music lift + bass). Lemon on «زمن» 13.03, mustard on «الانتظار» 13.27. |
| S10 | 14.36–17.86 | Logo: lav disc, royal + sky squircles spinning CCW at about 110/104°/s (ramped in), white heptagon with «لُوَاجِي» and the van-front mark. Zoom-out ×0.52 (sine.inOut), hold, then a power2.in push. | settle on «هذا» 14.28 / «لواجي» 14.60 |
| S11 | 17.86–20.05 | Mask cascade, all as fast irises: van-on-road in the sky squircle; seat-grid pattern in the organic circle; booking phone in the heptagon. Then a white ring + inner circle (QR ticket, family boarding, e-Dinar wallet), a stopwatch grid in the outer circle, and a royal disc that expands to fill the frame. | «احجز» 17.86, «مقعدك» 18.24, «ثوان» 18.90, «وادفع» 19.57, ring expand on «بالدينار» 19.91 |
| S12 | 20.05–24.0 | 3D Arabic word drum (16 rows, −8° slant). Fly-in ×2.8 from the right; spin-down; 4 detents (18 f sine.inOut) with a white cursor. | lands on «الدِّينَارُ الإِلِكْتُرُونِيّ» 20.56; «رِحْلَاتُك» on «رحلتك» 21.80; «تَتَبُّعٌ مُبَاشِر» on «مباشرة» 22.31; «الخَرِيطَة» on «الخريطة» 23.17 |
| S13 | 23.91–26.62 | Explode: drum ×0.3, labels scatter. An 8-icon dock pops centre-out (one per 3 f, colour flash → navy). Haze; drift up; wave. | explode on «كل» 23.91; wave on «تطبيق» 25.07 |
| S14 | 26.62–35.3 | Pull-back reveal into the dashboard window (quart.out 32 f). The UI builds from colour-block placeholders that wipe away in 4 f. Pills flash. Light-leak wash during the push. A green sliver becomes a seat-map card and the cursor picks 2 seats. Sky flash, then a wide live-map card with the van pin moving along the dotted route. A pink sliver becomes the ETA card (minute bars). The camera never stops. | reveal «من» 26.62; greeting «أول» 26.86; pills «موعد» 27.90 / «والمقاعد» 29.01 / «ورصيدك» 30.52; seat card «اختر» 31.56, clicks «مقعدك» 31.84 and «بنفسك» 32.32; map «يصل» 33.72; ETA «بالدقيقة» 34.44 |
| S15 | 35.3–37.05 | Organic feathered reveal of a dusk station illustration behind the UI. Cards turn smoked glass (backdrop blur). DOF push ×1.6. «بِدُونِ مُكَالَمَات ✓» chip. | reveal «دون» 35.32; chip «مكالمة» 35.59 |
| S16 | 37.06–40.81 | White assistant panel slides up (8 f expo.out + creep). Send; the question moves up; mascot avatar + thinking dots; the answer types at 85 cps; «احجزي المقعدين» chip. | panel «وإن» 37.12; send «اسأل» 38.41; answer «الذكي» 39.59; chip «يجيبك» 40.35 |
| S17 | 40.81–41.2 | Crash zoom ×4.6 into the panel (power3.in + blur) → white. | «في الحال» 40.81 |
| S18 | 41.2–42.6 | Mascot snaps in; royal glow bloom (36 f); the user bubble types «هَلْ أَدْفَعُ بِالدِّينَارِ الإِلِكْتُرُونِيّ؟»; blurred ghost bubbles; drift left. | |
| S19 | 42.25–43.0 | Red (ticket) and green (seat) cards accelerate through (power2.in to about 4000 px/s). The yellow panel slides in from the right and lands (24 f power2.inOut). | |
| S20 | 42.95–44.1 | Yellow prompt: mascot, «إِلَى أَيْنَ نُسَافِرُ اليَوْمَ يَا سَلْمَى؟». Types «احجز لي مقعدين غدًا على السابعة صباحًا» at 76 cps. The cursor clicks send and the text dims. | typing «الذهاب» 43.12; send «وهو» 43.79 |
| S21 | 44.1–44.65 | Lemon road "mountain" rises (18 f expo.out). Butter + mustard van-front squares rise. Whip up with rotation, revealing the table underneath. | rise «يتولى» 44.10; whip «الحجز» 44.51 |
| S22 | 44.25–45.85 | White 3D table «حَجْزُك» (seat, payment, driver, ticket rows). Pills flash red→yellow→green «تَمّ ✓» down the rows; hover band; green check; DOF bands. | cascade from «الحجز» 44.58 |
| S23 | 45.62–47.2 | Whip up into the e-ticket page on a royal edge: «تَذْكِرَتُك», QR, «٣، ٤», «٠٧:٠٠», «٢٤٫٠٠ د.ت». Field icons flash blue→red→yellow. | whip on «لواجي» 45.64; seat value pop on «مقعدك» 46.51 |
| END | 46.95–49.5 | Push left into the logo lockup (lagging stack, quart.out), squircles still spinning. Tagline cuts in. | «مَقْعَدُكَ يَنْتَظِرُكَ،» on «ينتظرك» 47.07 (royal→ink); «لَا العَكْسُ.» on «لا» 47.97 (red→ink) |

## Quality gates

- **A. Jump scan.** 60 fps, 192×108 gray, mean-abs-diff, flag when diff > 6 and > 2.5× the 7-frame median: **0 flagged frames** in the final render.
  - Fixes made along the way:
    - S06's opaque background popped over the S05 whip, and S11 irises and the ring popped in one frame.
    - The S01 snap had a 2-frame spike.
    - The UI colour-block flips and card swaps were single-frame. They are now 3–6-frame wipes, so they read as snaps without a one-frame spike.
  - Largest sustained diffs are the X4 push (5.05–5.17, ≈ 6–7 % W per frame, as in the reference), the pan whip, the crash zoom and the whip-ups. Each spans 6–10 frames.
- **B. Motion grammar.** 8 f expo.out entrances, power3.in exits, spatial transitions only (push, iris, zoom-through, whip, wipe, pull-back), directional SVG motion blur on fast moves, and a continuous drift/rotation layer everywhere. Runs of under 0.08 mean diff are slow sub-pixel drifts, not frozen frames.
- **C. `npx hyperframes check`.** 0 errors, contrast clean.
  - Warnings: `composition_file_too_large`, plus one `escaped_container`. The latter is the S08 photo layer, which is intentionally parked one pan-length off-canvas and rides in on the pan.
  - Intentional text layering is marked with `data-layout-allow-overlap`: the drum, the flying labels, the AI panel over the dashboard, and the stacked status pills.

## Deviations from MOTION-SPEC and why

- **Hard cuts X2/X3/X5 kept their energy but are spatial:**
  - S02 → S03 is an iris zoom-through.
  - S04 → S05 is a camera move that frames the red circle (shapes fly off), not a match cut.
  - Reason: "no single-frame background pops".
- **Single-frame colour swaps are softened:**
  - The S09 infinite zoom is continuous nested layers (each layer covers the frame in turn) instead of recolouring.
  - S11 photo swaps and S14 placeholder flips are 3–11-frame irises/wipes.
- **Shot durations follow the voice:**
  - S03 is 1.6 s (ref 0.78 s), S08 2 s (ref 0.75 s) and S09 + S10 about 6 s (ref 4.4 s). The extra time is filled with beats (counter flips, seat fills, drift, push), not slower moves.
  - S12 has 4 detents plus creep.
- **The departures row is 6 cards (ref 7)**, so the pan clears the frame before the scatter lands.
- **S06 word** is «مَرَّةً أُخْرَى» (VO "مرة أخرى"), not «الانتظار». It splits cleanly at non-joining letters, so each chunk renders exactly as in the joined word.
- **S12 drum** is right-aligned at about 74 % W (RTL text) instead of left-aligned at 35 %. Motion directions are unchanged.
- **Dashboard** layout is RTL (rail on the right, greeting right-aligned) because it is an Arabic app UI. All camera moves keep the reference directions.
- **The S15 "photo"** is a code-drawn dusk station, darkened so the white glass-UI text passes contrast.
- **END lockup** is new (the reference recording ends mid-shot): 2.5 s, entered by a push.
