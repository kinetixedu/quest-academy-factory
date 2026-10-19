#!/usr/bin/env python3
"""Cut a cartoon figure off its plain cream background.

usage: python3 tools/cutout.py in.png out.png [--tol 26] [--scale 2]

The illustrations are generated on a flat cream background with bold dark
outlines, so a flood fill from the image border (colour distance < tol from
the border median) removes the background without touching the figure.
Interior pockets that touch nothing outside stay opaque on purpose.
"""
import sys, argparse
import numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage

ap = argparse.ArgumentParser()
ap.add_argument('src'); ap.add_argument('dst')
ap.add_argument('--tol', type=float, default=26)
ap.add_argument('--scale', type=float, default=2)
a = ap.parse_args()

im = Image.open(a.src).convert('RGB')
if a.scale != 1:
    im = im.resize((round(im.width * a.scale), round(im.height * a.scale)), Image.LANCZOS)
px = np.asarray(im).astype(np.float32)
h, w, _ = px.shape
border = np.concatenate([px[0], px[-1], px[:, 0], px[:, -1]])
bg = np.median(border, axis=0)
near = np.sqrt(((px - bg) ** 2).sum(-1)) < a.tol
lab, _ = ndimage.label(near)
edge = set(np.unique(np.concatenate([lab[0], lab[-1], lab[:, 0], lab[:, -1]]))) - {0}
bgmask = np.isin(lab, list(edge))
# drop the bottom row from the border set: figures are cropped at the waist,
# so the body touching the bottom edge must stay opaque (it does, since the
# body colour is far from cream). Clean small specks.
bgmask = ndimage.binary_opening(bgmask, iterations=1)
alpha = np.where(bgmask, 0, 255).astype(np.uint8)
am = Image.fromarray(alpha).filter(ImageFilter.GaussianBlur(0.8 * a.scale))
out = im.convert('RGBA'); out.putalpha(am)
bb = am.point(lambda v: 255 if v > 8 else 0).getbbox()
if bb: out = out.crop(bb)
out.save(a.dst, optimize=True)
print(a.dst, out.size, 'bg', bg.round().tolist())
