# Motion grammar (measured frame by frame from a premium launch film)

Durations are frames at 60 fps (×2 of a 30 fps source). Render at **60 fps** (`npx hyperframes render --fps 60`).

| Move | Duration | Ease | Notes |
|---|---|---|---|
| Entrance (text, card, tile) | 8 f (0.13 s) | expo.out | from ~50% scale, often pre-rotated 10–15°, with motion blur |
| Settle / pull-out | 30–32 f | quart.out | e.g. card scale ×0.65 while it keeps rotating |
| Plate push (scene → scene) | 16 f | power2.inOut | the new plate's lead shape lags by 6 f; peak ~7800 px/s |
| Whip / exit | 4–8 f | power3.in | up to ~4000 px/s, blur ∝ speed |
| Pan cruise | — | linear | ~1270 px/s, then whip |
| Word cylinder step | 18 f, hold 16–24 f | sine.inOut | new highlight every ~0.6 s |
| Logo rings | continuous | none | ~105°/s, never stop |
| Infinite zoom | 64 f | expo.out | layers grow continuously; colour swaps on single frames every 4–8 f |
| UI typing | — | — | 60–80 chars/s |
| Camera push / light-leak wash | 1–2 s | sine.inOut | |

## The 10 rules
1. **Snap in, glide out.** Entrances take 8 f, then a slow tail that is still moving at the cut.
2. **Cut on motion.** Every shot starts already moving.
3. **Hand off velocity.** The outgoing direction and speed carry into the incoming element.
4. **Spatial transitions only.** Push, zoom-through, mask grow, whip or rise. Never use opacity cross-dissolves.
5. **Swap colour, keep geometry.** Colour swaps happen on single frames while the shapes stay continuous.
6. **Keep something moving.** Every frame has at least one rotating or zooming layer, and the camera drifts 3–15% per second.
7. **Ease asymmetrically.** Entrances use expo or quart out, exits use power in, camera moves use in-out.
8. **One event every 0.5–0.6 s.**
9. **Headlines arrive whole.** They appear on a hard cut, sometimes tinted in a brand colour for 15–25 f.
10. **Blur with speed.** Use motion blur on whips and pans, and depth-of-field blur on near and far layers.

## Anti-patterns (each caused a rejected version)
- **Blur fades of 0.5–0.8 s** feel mushy and slow.
- **Elements that stop after arriving** make the film feel dead.
- **A clip whose full background appears on one frame** reads as a "sudden jump". Every scene must enter through an animated mask, push or zoom.
- **Two tweens on the same property of the same element** fight each other, or an `immediateRender` snaps, and that causes jumps.
- **Huge black slab type** is not elegant. Use medium-weight, moderate-size centred words.
- **Abstract shapes alone** don't tell the story. Pair them with icons and illustrations.

## QA: jump scan (required before delivery)
```bash
python3 scripts/jump-scan.py renders/video.mp4
```
It flags frames where the mean frame difference is greater than 6 and more than 2.5× the local 7-frame median. Fix every flagged frame that isn't an intended cut.
