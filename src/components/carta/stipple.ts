// Ink drawings sampled into stipple dots. Shared by the WebGL elements of the "Carta" home page.

export const INK = "#1f2340";
export const TERRACOTTA = "#c24e30";
const S = 512;

export type Draw = (g: CanvasRenderingContext2D) => void;

const wingPath = (g: CanvasRenderingContext2D) => {
  g.beginPath();
  g.moveTo(0, 0);
  g.bezierCurveTo(30, -120, 200, -170, 220, -80);
  g.bezierCurveTo(232, -20, 150, -6, 100, 0);
  g.bezierCurveTo(180, 20, 200, 120, 120, 150);
  g.bezierCurveTo(60, 170, 20, 90, 0, 0);
  g.closePath();
};

// an engraved moth, in the spirit of the vintage illustration she uses (drawn from scratch)
export const drawMoth: Draw = (g) => {
  g.translate(S / 2, S / 2 + 10);
  for (const side of [1, -1]) {
    g.save();
    g.scale(side, 1);
    wingPath(g);
    const grad = g.createRadialGradient(0, 0, 10, 0, 0, 230);
    grad.addColorStop(0, "rgba(31,35,64,.85)");
    grad.addColorStop(0.55, "rgba(31,35,64,.3)");
    grad.addColorStop(1, "rgba(31,35,64,.6)");
    g.fillStyle = grad; g.fill();
    g.lineWidth = 6; g.strokeStyle = INK; g.stroke();
    g.save(); wingPath(g); g.clip();
    g.strokeStyle = "rgba(31,35,64,.7)"; g.lineWidth = 2.5;
    for (let k = 0; k < 9; k++) { const a = -1.15 + k * 0.28; g.beginPath(); g.moveTo(0, 0); g.quadraticCurveTo(80 * Math.cos(a), 80 * Math.sin(a) - 10, 240 * Math.cos(a), 240 * Math.sin(a)); g.stroke(); }
    g.restore();
    for (const [x, y, r] of [[140, -70, 30], [105, 95, 22]]) {
      g.beginPath(); g.arc(x, y, r, 0, Math.PI * 2); g.fillStyle = INK; g.fill();
      g.beginPath(); g.arc(x, y, r * 0.62, 0, Math.PI * 2); g.fillStyle = "rgba(247,242,234,1)"; g.fill();
      g.beginPath(); g.arc(x, y, r * 0.34, 0, Math.PI * 2); g.fillStyle = TERRACOTTA; g.fill();
    }
    g.restore();
  }
  g.beginPath(); g.ellipse(0, 10, 13, 70, 0, 0, Math.PI * 2); g.fillStyle = INK; g.fill();
  g.lineWidth = 4; g.strokeStyle = INK;
  for (const s of [1, -1]) { g.beginPath(); g.moveTo(0, -55); g.quadraticCurveTo(s * 25, -120, s * 55, -140); g.stroke(); }
};

export function seeded(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Sample N dots from a drawing; darker ink gets more dots. Returns xyz + accent flag per dot. */
export function sampleDrawing(draw: Draw, N: number, rnd: () => number, extent = 2.2) {
  const c = document.createElement("canvas");
  c.width = c.height = S;
  const g = c.getContext("2d")!;
  draw(g);
  const img = g.getImageData(0, 0, S, S).data;
  const out = new Float32Array(N * 4);
  let n = 0, guard = 0;
  while (n < N && guard++ < N * 400) {
    const x = Math.floor(rnd() * S), y = Math.floor(rnd() * S);
    const i = (y * S + x) * 4;
    const a = img[i + 3] / 255;
    if (a < 0.02) continue;
    const r = img[i], gg = img[i + 1], b = img[i + 2];
    const lum = (0.299 * r + 0.587 * gg + 0.114 * b) / 255;
    if (rnd() > Math.pow(a * (1 - lum * 0.85), 0.9)) continue;
    out[n * 4] = ((x - S / 2) / (S / 2)) * extent;
    out[n * 4 + 1] = -((y - S / 2) / (S / 2)) * extent;
    out[n * 4 + 2] = (rnd() - 0.5) * 0.2;
    out[n * 4 + 3] = r > gg + 50 && r > b + 50 ? 1 : 0;
    n++;
  }
  return out.subarray(0, n * 4);
}

/** Runs `onVisible(true/false)` as the element enters or leaves the viewport. */
export function watchVisibility(el: Element, onVisible: (v: boolean) => void) {
  if (!("IntersectionObserver" in window)) { onVisible(true); return () => {}; }
  const io = new IntersectionObserver((es) => onVisible(es[0].isIntersecting), { rootMargin: "120px" });
  io.observe(el);
  return () => io.disconnect();
}
