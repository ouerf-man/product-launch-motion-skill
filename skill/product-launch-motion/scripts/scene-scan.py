#!/usr/bin/env python3
"""Scene / transition detection + motion curve for a reference video.
Usage: python3 scene-scan.py ref.mov [--fps 60]"""
import subprocess, argparse
import numpy as np
a = argparse.ArgumentParser(); a.add_argument("video"); a.add_argument("--fps", type=float, default=60); o = a.parse_args()
raw = subprocess.run(["ffmpeg", "-v", "error", "-i", o.video, "-vf", f"fps={o.fps},scale=160:90,format=gray", "-f", "rawvideo", "-"], capture_output=True, check=True).stdout
d = np.frombuffer(raw, dtype=np.uint8).reshape(-1, 90, 160).astype(float)
df = np.abs(np.diff(d, axis=0)).mean(axis=(1, 2)); med = np.convolve(df, np.ones(15) / 15, "same")
print("== cuts / fast transitions (t, diff) ==")
for i, v in enumerate(df):
    if v > 12 and v > 3 * max(med[i], 1): print(f"{(i + 1) / o.fps:7.3f}s  {v:5.1f}")
print("== motion per 0.5s (mean diff) ==")
step = int(o.fps / 2)
print(" ".join(f"{k / 2:.1f}:{df[k * step:(k + 1) * step].mean():.1f}" for k in range(len(df) // step)))
