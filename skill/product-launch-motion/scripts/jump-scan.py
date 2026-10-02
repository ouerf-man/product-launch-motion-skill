#!/usr/bin/env python3
"""Flag sudden visual jumps in a rendered video.
Usage: python3 jump-scan.py video.mp4 [--fps 60] [--thresh 6] [--ratio 2.5]
Prints timestamps whose frame-to-frame mean abs difference is > thresh and > ratio x the local 7-frame median."""
import subprocess, sys, argparse
import numpy as np
a = argparse.ArgumentParser(); a.add_argument("video"); a.add_argument("--fps", type=float, default=60)
a.add_argument("--thresh", type=float, default=6); a.add_argument("--ratio", type=float, default=2.5)
o = a.parse_args()
raw = subprocess.run(["ffmpeg", "-v", "error", "-i", o.video, "-vf", f"fps={o.fps},scale=192:108,format=gray", "-f", "rawvideo", "-"], capture_output=True, check=True).stdout
d = np.frombuffer(raw, dtype=np.uint8).reshape(-1, 108, 192).astype(float)
df = np.abs(np.diff(d, axis=0)).mean(axis=(1, 2)); med = np.convolve(df, np.ones(7) / 7, "same")
flags = [(i + 1) / o.fps for i, v in enumerate(df) if v > o.thresh and v > o.ratio * max(med[i], 1)]
print(f"frames: {len(d)}  flagged: {len(flags)}")
for t in flags: print(f"  {t:7.3f}s")
sys.exit(1 if flags else 0)
