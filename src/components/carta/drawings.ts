// Ink drawings, one per theme of the page, later sampled into stipple dots.
// Ink (#1f2340) gives dots; terracotta (#c24e30) marks the coloured accents.
import { INK, TERRACOTTA, drawMoth, type Draw } from "./stipple";

const S = 512;
const C = S / 2;

// About: a route of paper planes between the places she has lived (Brazil, Spain, Ireland)
export const drawRoute: Draw = (g) => {
  g.translate(C, C);
  g.strokeStyle = "rgba(31,35,64,.35)"; g.lineWidth = 3;
  g.beginPath(); g.arc(0, 0, 205, 0, Math.PI * 2); g.stroke();
  for (const k of [0.35, 0.7]) { g.beginPath(); g.ellipse(0, 0, 205, 205 * k, 0, 0, Math.PI * 2); g.stroke(); }
  for (const k of [0.4, 0.8]) { g.beginPath(); g.ellipse(0, 0, 205 * k, 205, 0, 0, Math.PI * 2); g.stroke(); }
  const brazil: [number, number] = [-95, 105], spain: [number, number] = [70, -40], ireland: [number, number] = [35, -120];
  g.strokeStyle = INK; g.lineWidth = 7; g.setLineDash([16, 12]); g.lineCap = "round";
  g.beginPath(); g.moveTo(...brazil); g.quadraticCurveTo(-60, -90, ...spain); g.stroke();
  g.beginPath(); g.moveTo(...spain); g.quadraticCurveTo(120, -110, ...ireland); g.stroke();
  g.setLineDash([]);
  for (const [x, y] of [brazil, spain, ireland]) { g.beginPath(); g.arc(x, y, 15, 0, Math.PI * 2); g.fillStyle = TERRACOTTA; g.fill(); }
  // the paper plane, leaving Ireland
  g.save(); g.translate(130, -175); g.rotate(-0.5);
  g.beginPath(); g.moveTo(-50, 0); g.lineTo(55, -22); g.lineTo(-18, 30); g.closePath(); g.fillStyle = INK; g.fill();
  g.beginPath(); g.moveTo(-18, 30); g.lineTo(-8, 8); g.lineTo(55, -22); g.fillStyle = "rgba(31,35,64,.5)"; g.fill();
  g.restore();
};

// Specialties: a head in profile with a tangle of thoughts inside
const head = (g: CanvasRenderingContext2D) => {
  g.beginPath();
  g.moveTo(175, 486);
  g.bezierCurveTo(158, 410, 92, 340, 108, 238);
  g.bezierCurveTo(124, 118, 255, 58, 340, 104);
  g.bezierCurveTo(404, 140, 416, 205, 404, 252);
  g.lineTo(436, 304); g.lineTo(404, 316); g.lineTo(410, 342); g.lineTo(396, 352);
  g.bezierCurveTo(400, 384, 372, 398, 342, 395);
  g.lineTo(334, 486);
};
export const drawMind: Draw = (g) => {
  head(g); g.fillStyle = "rgba(31,35,64,.12)"; g.fill();
  head(g); g.strokeStyle = INK; g.lineWidth = 10; g.lineJoin = "round"; g.stroke();
  g.save(); g.translate(258, 228);
  g.strokeStyle = TERRACOTTA; g.lineWidth = 5; g.lineCap = "round";
  g.beginPath();
  for (let t = 0; t <= Math.PI * 2 * 6; t += 0.03) {
    const r = 58 + 26 * Math.sin(t * 1.3) + 16 * Math.cos(t * 3.1);
    const x = r * Math.cos(t) + 14 * Math.sin(t * 2.2), y = r * 0.82 * Math.sin(t * 1.07) + 10 * Math.cos(t * 1.7);
    if (t === 0) g.moveTo(x, y); else g.lineTo(x, y);
  }
  g.stroke(); g.restore();
};

// Services: two armchairs facing each other, the room where therapy happens
const armchair = (g: CanvasRenderingContext2D) => {
  g.fillStyle = "rgba(31,35,64,.78)"; g.strokeStyle = INK; g.lineWidth = 6; g.lineJoin = "round";
  // back
  g.beginPath(); g.moveTo(-70, -10); g.bezierCurveTo(-78, -120, -40, -150, -10, -140); g.lineTo(-18, -10); g.closePath(); g.fill(); g.stroke();
  // seat
  g.beginPath(); g.moveTo(-74, -12); g.lineTo(60, -12); g.quadraticCurveTo(72, -12, 72, 4); g.lineTo(72, 24); g.lineTo(-74, 24); g.closePath();
  g.fillStyle = "rgba(31,35,64,.5)"; g.fill(); g.stroke();
  // arm
  g.beginPath(); g.moveTo(-60, -40); g.quadraticCurveTo(20, -58, 52, -36); g.lineTo(52, -12); g.lineTo(-60, -12); g.closePath();
  g.fillStyle = "rgba(31,35,64,.65)"; g.fill(); g.stroke();
  // legs
  g.lineWidth = 7; g.lineCap = "round";
  for (const [x1, x2] of [[-64, -72], [62, 70]]) { g.beginPath(); g.moveTo(x1, 24); g.lineTo(x2, 70); g.stroke(); }
};
export const drawChairs: Draw = (g) => {
  g.save(); g.translate(150, 300); armchair(g); g.restore();
  g.save(); g.translate(362, 300); g.scale(-1, 1); armchair(g); g.restore();
  // a small table with a cup of tea between them
  g.strokeStyle = INK; g.lineWidth = 6; g.lineCap = "round";
  g.beginPath(); g.ellipse(C, 300, 34, 9, 0, 0, Math.PI * 2); g.stroke();
  g.beginPath(); g.moveTo(C, 309); g.lineTo(C, 368); g.moveTo(C - 22, 368); g.lineTo(C + 22, 368); g.stroke();
  g.fillStyle = TERRACOTTA; g.beginPath(); g.moveTo(C - 12, 270); g.lineTo(C + 12, 270); g.lineTo(C + 9, 292); g.lineTo(C - 9, 292); g.closePath(); g.fill();
  g.strokeStyle = TERRACOTTA; g.lineWidth = 4; g.beginPath(); g.arc(C + 15, 280, 6, -1.2, 1.2); g.stroke();
  // rug
  g.strokeStyle = "rgba(31,35,64,.35)"; g.lineWidth = 3; g.beginPath(); g.ellipse(C, 380, 210, 30, 0, 0, Math.PI * 2); g.stroke();
};

// Investment and social values: an old key, because access to care is a right
export const drawKey: Draw = (g) => {
  g.translate(C, C);
  g.rotate(-0.6);
  g.strokeStyle = INK; g.fillStyle = INK;
  g.lineWidth = 18; g.beginPath(); g.arc(0, -150, 62, 0, Math.PI * 2); g.stroke();
  g.lineWidth = 8;
  for (let k = 0; k < 3; k++) { const a = (k * Math.PI * 2) / 3 - Math.PI / 2; g.beginPath(); g.arc(Math.cos(a) * 26, -150 + Math.sin(a) * 26, 18, 0, Math.PI * 2); g.stroke(); }
  g.fillRect(-11, -88, 22, 290);
  g.fillRect(-20, -80, 40, 12); g.fillRect(-20, -62, 40, 10);
  g.fillRect(11, 150, 60, 20); g.fillRect(11, 175, 45, 18); g.fillRect(11, 120, 50, 16);
  g.fillStyle = TERRACOTTA; g.beginPath(); g.arc(0, -150, 14, 0, Math.PI * 2); g.fill();
};

// Testimonials: an embroidered heart, stitched in dots
const heartPath = (g: CanvasRenderingContext2D, k: number) => {
  g.beginPath();
  g.moveTo(0, 170 * k);
  g.bezierCurveTo(-40 * k, 120 * k, -210 * k, 40 * k, -200 * k, -60 * k);
  g.bezierCurveTo(-190 * k, -160 * k, -60 * k, -190 * k, 0, -95 * k);
  g.bezierCurveTo(60 * k, -190 * k, 190 * k, -160 * k, 200 * k, -60 * k);
  g.bezierCurveTo(210 * k, 40 * k, 40 * k, 120 * k, 0, 170 * k);
  g.closePath();
};
export const drawHeart: Draw = (g) => {
  g.translate(C, C + 10);
  heartPath(g, 1.08); g.fillStyle = TERRACOTTA; g.fill();
  heartPath(g, 0.86); g.fillStyle = "rgba(247,242,234,1)"; g.fill();
  heartPath(g, 0.86); g.fillStyle = "rgba(31,35,64,.18)"; g.fill();
  g.strokeStyle = INK; g.lineWidth = 5; g.setLineDash([12, 10]);
  heartPath(g, 0.78); g.stroke();
  g.setLineDash([]);
};

// Contact: a door left ajar, light spilling onto the floor — the first step
export const drawDoor: Draw = (g) => {
  // light on the floor
  g.fillStyle = "rgba(194,78,48,.55)";
  g.beginPath(); g.moveTo(232, 448); g.lineTo(352, 448); g.lineTo(470, 500); g.lineTo(200, 500); g.closePath(); g.fill();
  // opening (light inside the frame)
  g.fillStyle = "rgba(194,78,48,.35)"; g.fillRect(232, 92, 120, 356);
  // frame
  g.strokeStyle = INK; g.lineWidth = 12; g.lineJoin = "round";
  g.strokeRect(150, 86, 208, 368);
  // the door panel, swung open toward us
  g.beginPath(); g.moveTo(156, 92); g.lineTo(236, 116); g.lineTo(236, 424); g.lineTo(156, 448); g.closePath();
  g.fillStyle = "rgba(31,35,64,.82)"; g.fill(); g.lineWidth = 6; g.stroke();
  g.strokeStyle = "rgba(247,242,234,.6)"; g.lineWidth = 3;
  g.strokeRect(172, 150, 46, 110); g.strokeRect(172, 290, 46, 110);
  g.fillStyle = TERRACOTTA; g.beginPath(); g.arc(222, 275, 9, 0, Math.PI * 2); g.fill();
  // floor line
  g.strokeStyle = INK; g.lineWidth = 6; g.beginPath(); g.moveTo(60, 456); g.lineTo(480, 456); g.stroke();
};

// order follows the page: hero · about · specialties · services · investment · testimonials · contact
export const THEMES: Draw[] = [drawMoth, drawRoute, drawMind, drawChairs, drawKey, drawHeart, drawDoor];
