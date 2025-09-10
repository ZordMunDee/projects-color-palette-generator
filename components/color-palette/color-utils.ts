import type { Mode } from "./types";

export function uid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export function hslToHex(h: number, s: number, l: number) {
  h = ((h % 360) + 360) % 360;
  s = clamp(s, 0, 100) / 100;
  l = clamp(l, 0, 100) / 100;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0,
    g = 0,
    b = 0;
  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  const toHex = (v: number) =>
    Math.round((v + m) * 255)
      .toString(16)
      .padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export function paletteFromMode(size: number, mode: Mode) {
  const baseH = rand(0, 360);
  const out: string[] = [];
  for (let i = 0; i < size; i++) {
    const hueShift = i * (360 / size) + rand(-6, 6);
    if (mode === "pastel")
      out.push(hslToHex((baseH + hueShift) % 360, rand(35, 55), rand(72, 88)));
    else if (mode === "neon")
      out.push(hslToHex((baseH + hueShift) % 360, rand(80, 100), rand(50, 60)));
    else if (mode === "earth")
      out.push(
        hslToHex((baseH + hueShift + 20) % 360, rand(25, 45), rand(35, 55))
      );
    else if (mode === "mono")
      out.push(
        hslToHex(
          baseH,
          rand(40, 60),
          rand(25 + i * (60 / size), 35 + i * (60 / size))
        )
      );
    else out.push(hslToHex(rand(0, 360), rand(30, 95), rand(35, 80)));
  }
  return out;
}
