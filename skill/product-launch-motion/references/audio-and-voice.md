# Audio and voice

## Music
- **Licensed tracks only.** Use a file the user provides and confirms they may use, or a royalty-free library they hold rights to. This skill ships no music.
- **Find the energy drop:** decode with ffmpeg, compute RMS per 0.5 s, estimate BPM from onset autocorrelation. Snippet:
  ```bash
  ffmpeg -v error -i music.mp3 -ac 1 -ar 11025 -f s16le - | python3 -c "
  import sys,numpy as np
  x=np.frombuffer(sys.stdin.buffer.read(),dtype=np.int16).astype(float)/32768;h=11025//2
  r=[np.sqrt(np.mean(x[i:i+h]**2)) for i in range(0,len(x)-h,h)]
  [print(f'{i/2:6.1f}s','#'*int(r[i]*200)) for i in range(0,len(r),2)]"
  ```
- **Align the drop** to the reveal: `data-media-start = drop_time − reveal_time`.
- **Volume:** ~0.45 without VO, ~0.2 under VO. Fade in 0.5 s and out over the last 1–1.5 s with a `data-automation` volume lane.

## SFX
- Use: soft clicks (UI), pops (items appearing), whooshes (transitions), a low impact (drop), a riser (into the drop), typing (prompts).
- Volume 0.15–0.45. No glassy, shimmering or bell-like sounds.
- Pixabay SFX (Pixabay Content License) are a safe source.

## Voice-over (ElevenLabs)
1. **Ask at intake:** VO yes/no, the language, and the API key. Save the key to `.env` (`ELEVENLABS_API_KEY=…`, chmod 600, git-ignored).
2. **Write the script:** one line per scene, sized to the scene at ~150 wpm, in the chosen language. On-screen text and VO complement each other; VO may say more than the cards.
3. **Get approval** of the script table (scene, line, seconds) **before** generating.
4. **Choose a voice:** `node scripts/elevenlabs.mjs voices`.
   - Pick a natural, calm voice matching the brand tone.
   - Reject voices that sound synthetic.
   - Unsure? Generate one sample line with 2–3 voices and let the user pick.
5. **Model:** `eleven_v4` (default in the script).
6. **Generate:**
   ```bash
   node scripts/elevenlabs.mjs tts --env .env --script vo/lines.json --voice <id> --out assets/vo
   ```
   `lines.json` = `[{"id":"l01","text":"…"}]` → `assets/vo/l01.mp3…` plus `manifest.json` (durations, character timings).
7. **Place the lines:** each `<audio id="vo-l01" src="assets/vo/l01.mp3" data-start="…" data-duration="…">` goes at its scene start. Shift by ±0.2 s to avoid overlapping a hard cut. If a line runs past its scene, extend the scene.

## Original music (ElevenLabs Music)
```bash
node scripts/elevenlabs.mjs music --env .env --seconds 50 --out assets/audio/music.mp3 \
  --prompt "Instrumental modern product launch, playful and elegant, plucky synths, light percussion, 120 BPM. 0-12s curious (problem), clear lift at 12s (product reveal), confident groove, resolved ending. No vocals, leaves room for a voice-over."
```
Measure where the energy actually lifts (RMS snippet above), then shift the track (`data-start` / `data-media-start`) so the lift hits the reveal word. If the track ends early, reuse a later section a whole number of bars back for the end card.

## Arabic voice-over
- Use **Modern Standard Arabic** voices from the shared library. They work by voice ID without adding them to the library; search with `/v1/shared-voices?language=ar&use_cases=advertisement`. In this project's tests, users rejected dialect voices (e.g. Tunisian) as unnatural.
- Write the script with **full tashkeel**. Unvowelled text gets mispronounced.
- For brand names, generate 2–3 spelling variants (e.g. لُوَاجِي / لُوَّاجِي / لُووَاجِي), concatenate them into one A/B/C file, and let the user pick by ear.
- If a line runs long and the model ignores `speed`, time-stretch with `ffmpeg -filter:a atempo=1.1x` (≤ 1.15) and scale the word timings by the same factor.
- Export word timings from the manifest alignment and sync each visual to its **word**, not just to the start of the line.
