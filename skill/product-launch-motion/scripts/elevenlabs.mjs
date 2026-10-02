#!/usr/bin/env node
// ElevenLabs helper for launch-video skills. No dependencies (Node 18+ fetch).
//
// Key lookup: $ELEVENLABS_API_KEY, else ELEVENLABS_API_KEY=... in --env file (default ./.env).
// Never hard-code or print the key.
//
// Usage:
//   node elevenlabs.mjs voices [--env path]
//       → prints voice_id | name | labels | description (premade + your library)
//   node elevenlabs.mjs tts --script lines.json --voice <id> --out <dir> [--model eleven_v4 (locked default)]
//       [--stability 0.5] [--similarity 0.75] [--style 0] [--speed 1.0] [--env path]
//       lines.json = [{ "id": "l01", "text": "..." }, ...]
//       → <dir>/<id>.mp3 per line + <dir>/manifest.json with durations (ffprobe) and per-character timings.
//       Each request passes previous_text/next_text so prosody flows across lines.
//   node elevenlabs.mjs music --prompt "..." --seconds 45 --out music.mp3 [--env path]
//       → original instrumental track (ElevenLabs Music). Describe mood, BPM and where the lift/drop should land.

import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const args = process.argv.slice(2);
const cmd = args[0];
const opt = (name, def) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : def;
};

function apiKey() {
  if (process.env.ELEVENLABS_API_KEY) return process.env.ELEVENLABS_API_KEY.trim();
  const envPath = opt("env", ".env");
  if (fs.existsSync(envPath)) {
    const m = fs.readFileSync(envPath, "utf8").match(/^ELEVENLABS_API_KEY=(.+)$/m);
    if (m) return m[1].trim();
  }
  console.error("No ELEVENLABS_API_KEY found (env var or --env file).");
  process.exit(2);
}

async function api(url, init = {}, { soft = false } = {}) {
  const res = await fetch(`https://api.elevenlabs.io${url}`, {
    ...init,
    headers: { "xi-api-key": apiKey(), "Content-Type": "application/json", ...(init.headers || {}) },
  });
  if (!res.ok && soft) return res;
  if (!res.ok) {
    console.error(`ElevenLabs ${res.status}: ${await res.text()}`);
    process.exit(1);
  }
  return res;
}

function probeDuration(file) {
  try {
    return Number(execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", file]).toString().trim());
  } catch {
    return null;
  }
}

if (cmd === "voices") {
  const res = await api("/v1/voices");
  const { voices } = await res.json();
  for (const v of voices) {
    const labels = Object.values(v.labels || {}).join(", ");
    console.log(`${v.voice_id} | ${v.name} | ${v.category} | ${labels} | ${(v.description || "").slice(0, 90)}`);
  }
} else if (cmd === "tts") {
  const lines = JSON.parse(fs.readFileSync(opt("script"), "utf8"));
  const voice = opt("voice");
  const out = opt("out", "vo");
  if (!voice) { console.error("--voice required"); process.exit(2); }
  fs.mkdirSync(out, { recursive: true });
  const settings = {
    stability: Number(opt("stability", 0.5)),
    similarity_boost: Number(opt("similarity", 0.75)),
    style: Number(opt("style", 0)),
    use_speaker_boost: true,
    speed: Number(opt("speed", 1.0)),
  };
  const manifest = { voice_id: voice, model_id: opt("model", "eleven_v4"), settings, lines: [] };
  for (let i = 0; i < lines.length; i++) {
    const { id, text } = lines[i];
    const body = {
      text,
      model_id: manifest.model_id,
      voice_settings: settings,
      previous_text: lines.slice(0, i).map((l) => l.text).join(" ") || undefined,
      next_text: lines.slice(i + 1).map((l) => l.text).join(" ") || undefined,
    };
    const url = `/v1/text-to-speech/${voice}/with-timestamps?output_format=mp3_44100_128`;
    let res = await api(url, { method: "POST", body: JSON.stringify(body) }, { soft: true });
    if (!res.ok) {
      const err = await res.text();
      if (!/previous_text|next_text/.test(err)) { console.error(`ElevenLabs ${res.status}: ${err}`); process.exit(1); }
      // model doesn't support stitching context → retry plain
      delete body.previous_text; delete body.next_text;
      res = await api(url, { method: "POST", body: JSON.stringify(body) });
    }
    const j = await res.json();
    const file = path.join(out, `${id}.mp3`);
    fs.writeFileSync(file, Buffer.from(j.audio_base64, "base64"));
    const a = j.alignment || {};
    const speechEnd = a.character_end_times_seconds?.at(-1) ?? null;
    manifest.lines.push({ id, text, file, duration: probeDuration(file), speech_end: speechEnd, alignment: a });
    console.log(`${id}  ${probeDuration(file)?.toFixed(2)}s  "${text}"`);
  }
  fs.writeFileSync(path.join(out, "manifest.json"), JSON.stringify(manifest, null, 2));
} else if (cmd === "music") {
  const body = { prompt: opt("prompt"), music_length_ms: Math.round(Number(opt("seconds", 30)) * 1000), force_instrumental: true };
  const res = await api("/v1/music", { method: "POST", body: JSON.stringify(body) });
  const out = opt("out", "music.mp3");
  fs.writeFileSync(out, Buffer.from(await res.arrayBuffer()));
  console.log(`${out}  ${probeDuration(out)?.toFixed(2)}s`);
} else {
  console.log("usage: elevenlabs.mjs voices | music --prompt .. --seconds N --out f.mp3 | tts --script lines.json --voice <id> --out <dir>");
}
