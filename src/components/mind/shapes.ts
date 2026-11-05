// Particle targets for the "Psyché" scroll journey.
// Every shape returns N points as vec4: xyz + accent flag (0..1).

export type Shape = Float32Array;

// Deterministic PRNG so the shapes (and the Rorschach blot) are identical on every visit.
export function makeRand(seed = 7) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const TAU = Math.PI * 2;

export function buildShapes(N: number) {
  const R = makeRand(1957);
  const gauss = () => (R() + R() + R() - 1.5) / 1.5;
  const dir = (): [number, number, number] => {
    const u = R() * 2 - 1, a = R() * TAU, s = Math.sqrt(1 - u * u);
    return [s * Math.cos(a), u, s * Math.sin(a)];
  };
  const out = () => new Float32Array(N * 4);
  const put = (a: Float32Array, i: number, x: number, y: number, z: number, acc = 0) => {
    a[i * 4] = x; a[i * 4 + 1] = y; a[i * 4 + 2] = z; a[i * 4 + 3] = acc;
  };

  // 0 · Psyché: the butterfly (Fay's butterfly curve), with eyespots like an Apollo butterfly.
  const butterfly = out();
  const eyes: [number, number, number][] = [
    [1.0, 0.65, 0.22], [-1.0, 0.65, 0.22], [0.62, -0.95, 0.15], [-0.62, -0.95, 0.15],
  ];
  for (let i = 0; i < N; i++) {
    const r = R();
    if (r < 0.07) {
      // body
      put(butterfly, i, gauss() * 0.04, (R() - 0.55) * 1.7, gauss() * 0.04, 0);
    } else if (r < 0.17) {
      // eyespot rings
      const e = eyes[i % 4];
      const a = R() * TAU, rr = e[2] * (0.75 + R() * 0.3);
      put(butterfly, i, e[0] + Math.cos(a) * rr, e[1] + Math.sin(a) * rr, gauss() * 0.02, 1);
    } else if (r < 0.2) {
      // antennae
      const s = i % 2 ? 1 : -1, t = R();
      put(butterfly, i, s * t * 0.35, 0.82 + t * 0.6, 0, 0);
    } else {
      const th = R() * TAU * 6;
      const rad = Math.exp(Math.cos(th)) - 2 * Math.cos(4 * th) - Math.pow(Math.sin(th / 12), 5);
      const edge = R() < 0.45;
      const f = edge ? 0.97 + R() * 0.04 : Math.sqrt(R());
      const k = 0.42 * rad * f;
      put(butterfly, i, Math.sin(th) * k, Math.cos(th) * k - 0.25, gauss() * 0.03, edge ? 0.35 : 0);
    }
  }

  // 1 · Ψ: the letter that names the field.
  const psi = out();
  const stroke = (x: number, y: number) => {
    const d = dir(), rr = 0.11 * Math.cbrt(R());
    return [x + d[0] * rr, y + d[1] * rr, d[2] * rr] as const;
  };
  for (let i = 0; i < N; i++) {
    const r = R();
    let p: readonly [number, number, number];
    if (r < 0.3) p = stroke(0, -1.9 + R() * 3.7); // stem
    else if (r < 0.62) { const t = Math.PI + R() * Math.PI; p = stroke(Math.cos(t) * 1.15, 0.55 + Math.sin(t) * 1.05); } // cup
    else if (r < 0.86) { const s = R() < 0.5 ? -1 : 1; p = stroke(s * 1.15, 0.55 + R() * 1.15); } // arms
    else p = stroke((R() - 0.5) * 0.9, -1.9); // foot
    put(psi, i, p[0], p[1], p[2], r < 0.3 ? 0.4 : 0);
  }

  // 2 · The knot: what brings people to therapy. Tangled, but one continuous line.
  const knot = out();
  for (let i = 0; i < N; i++) {
    const t = R() * TAU, p = 3, q = 7;
    const rr = 1.25 + 0.55 * Math.cos(q * t);
    const tube = 0.09 + 0.05 * R();
    const d = dir();
    put(knot, i, rr * Math.cos(p * t) + d[0] * tube, rr * Math.sin(p * t) * 0.92 + d[1] * tube, 0.55 * Math.sin(q * t) + d[2] * tube, R() < 0.06 ? 1 : 0);
  }

  // 3 · Breath: a calm sphere that expands and contracts.
  const breath = out();
  for (let i = 0; i < N; i++) {
    const shell = R() < 0.78;
    const d = dir();
    const rr = shell ? 1.75 + gauss() * 0.03 : 1.75 * Math.cbrt(R()) * 0.85;
    const lat = Math.asin(d[1]);
    const band = Math.abs(Math.sin(lat * 9)) < 0.18;
    put(breath, i, d[0] * rr, d[1] * rr, d[2] * rr, shell && band ? 0.6 : 0);
  }

  // 4 · Chrysalis: change takes time.
  const chrysalis = out();
  for (let i = 0; i < N; i++) {
    if (R() < 0.05) { put(chrysalis, i, gauss() * 0.015, 1.75 + R() * 1.0, 0, 0.8); continue; } // silk thread
    const u = R();
    const y = 1.75 - u * 3.6;
    const prof = Math.pow(Math.sin(Math.PI * u), 0.75) * (0.62 + 0.25 * u);
    const ang = R() * TAU;
    const rib = Math.abs(Math.sin(ang * 3 + y * 4)) < 0.12;
    const rr = prof * (rib ? 1.04 : 0.98 + gauss() * 0.02);
    put(chrysalis, i, Math.cos(ang) * rr, y, Math.sin(ang) * rr, rib ? 0.7 : 0);
  }

  // 5 · Rorschach: a symmetric ink blot, folded on its vertical axis.
  const blot = out();
  const BR = makeRand(42);
  const blobs: [number, number, number, number][] = [];
  for (let k = 0; k < 11; k++) blobs.push([0.08 + BR() * 1.75, -1.7 + BR() * 3.3, 0.12 + BR() * 0.33, 0.6 + BR()]);
  blobs.push([0.05, 0.2, 0.32, 1.4], [0.05, -0.9, 0.26, 1.2], [0.05, 1.2, 0.2, 1]);
  const wsum = blobs.reduce((s, b) => s + b[3], 0);
  for (let i = 0; i < N; i++) {
    let pick = R() * wsum, b = blobs[0];
    for (const bb of blobs) { pick -= bb[3]; if (pick <= 0) { b = bb; break; } }
    const x = Math.abs(b[0] + gauss() * b[2]);
    const y = b[1] + gauss() * b[2] * 1.2;
    put(blot, i, i % 2 ? x : -x, y, gauss() * 0.05, R() < 0.08 ? 1 : 0);
  }

  // 6 · The world: threads from Brazil to the cities where Brazilians live.
  const globe = out();
  const Rg = 1.8;
  const ll = (lat: number, lon: number, h = 0): [number, number, number] => {
    const la = (lat * Math.PI) / 180, lo = (lon * Math.PI) / 180, r = Rg * (1 + h);
    return [r * Math.cos(la) * Math.sin(lo), r * Math.sin(la), r * Math.cos(la) * Math.cos(lo)];
  };
  const home: [number, number] = [-23.55, -46.63]; // São Paulo
  const cities: [number, number][] = [[38.72, -9.14], [40.42, -3.7], [51.5, -0.12], [40.71, -74.0], [35.68, 139.69], [-33.87, 151.2], [52.37, 4.9]];
  for (let i = 0; i < N; i++) {
    const r = R();
    if (r < 0.66) {
      const band = Math.floor(R() * 17);
      put(globe, i, ...ll(-80 + band * 10 + gauss() * 0.8, R() * 360), 0);
    } else if (r < 0.92) {
      const c = cities[i % cities.length], t = R();
      // great-circle-ish arc lifted off the surface
      const a = ll(home[0], home[1]), b = ll(c[0], c[1]);
      const m: [number, number, number] = [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
      const len = Math.hypot(...m) || 1, lift = Rg * (1 + Math.sin(t * Math.PI) * 0.32);
      put(globe, i, (m[0] / len) * lift, (m[1] / len) * lift, (m[2] / len) * lift, 1);
    } else {
      const c = r < 0.95 ? home : cities[i % cities.length];
      const q = ll(c[0], c[1], 0.01), d = dir(), rr = 0.08 * Math.cbrt(R());
      put(globe, i, q[0] + d[0] * rr, q[1] + d[1] * rr, q[2] + d[2] * rr, 1);
    }
  }

  return [butterfly, psi, knot, breath, chrysalis, blot, globe];
}

// Base and accent color per chapter. The first chapter sits on the night sky, the rest on paper.
export const PALETTE: { base: string; accent: string; alpha: number }[] = [
  { base: "#EEF1FF", accent: "#E9C27D", alpha: 0.95 }, // butterfly on night sky
  { base: "#2B44A6", accent: "#7C8FE0", alpha: 0.6 },  // Ψ
  { base: "#5B5FB8", accent: "#C97B63", alpha: 0.55 }, // knot
  { base: "#3D7FB0", accent: "#2B44A6", alpha: 0.55 }, // breath
  { base: "#6E9E8A", accent: "#C9963F", alpha: 0.6 },  // chrysalis
  { base: "#1E2A5A", accent: "#5B5FB8", alpha: 0.55 }, // Rorschach ink
  { base: "#2B44A6", accent: "#C9963F", alpha: 0.6 },  // world
];
