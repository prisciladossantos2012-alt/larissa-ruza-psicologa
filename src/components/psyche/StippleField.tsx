import { useEffect, useRef } from "react";
import * as THREE from "three";
import { breathBus, guidedBreath } from "@/components/mind/breath";

/**
 * A fluid field of ink dots behind the home page. The dots are stippling: each chapter is
 * a small ink drawing from @lariruza.psi's world (the engraved moth, her wooden chair, a
 * tangled thread, a breath, an old key, the crochet heart, an arch of Seville), sampled
 * into points by darkness. Scrolling morphs one drawing into the next, the cursor parts the
 * dots, and the field breathes with the "Breathe with me" guide.
 * Sections tagged [data-room="n"] select drawing n. Decorative only.
 */

const INK = "#1f2340";
const TERRACOTTA = "#c24e30";
const S = 512; // drawing canvas size

type Draw = (g: CanvasRenderingContext2D) => void;

// ---------- the drawings (ink on a transparent canvas; terracotta marks accents) ----------
const wingPath = (g: CanvasRenderingContext2D) => {
  g.beginPath();
  g.moveTo(0, 0);
  g.bezierCurveTo(30, -120, 200, -170, 220, -80);
  g.bezierCurveTo(232, -20, 150, -6, 100, 0);
  g.bezierCurveTo(180, 20, 200, 120, 120, 150);
  g.bezierCurveTo(60, 170, 20, 90, 0, 0);
  g.closePath();
};

const drawMoth: Draw = (g) => {
  g.translate(S / 2, S / 2 + 10);
  for (const side of [1, -1]) {
    g.save();
    g.scale(side, 1);
    wingPath(g);
    const grad = g.createRadialGradient(0, 0, 10, 0, 0, 230);
    grad.addColorStop(0, "rgba(31,35,64,.85)");
    grad.addColorStop(0.55, "rgba(31,35,64,.35)");
    grad.addColorStop(1, "rgba(31,35,64,.6)");
    g.fillStyle = grad; g.fill();
    g.lineWidth = 6; g.strokeStyle = INK; g.stroke();
    // veins
    g.save(); wingPath(g); g.clip();
    g.strokeStyle = "rgba(31,35,64,.7)"; g.lineWidth = 2.5;
    for (let k = 0; k < 9; k++) { const a = -1.15 + k * 0.28; g.beginPath(); g.moveTo(0, 0); g.quadraticCurveTo(80 * Math.cos(a), 80 * Math.sin(a) - 10, 240 * Math.cos(a), 240 * Math.sin(a)); g.stroke(); }
    g.restore();
    // eyespots
    for (const [x, y, r] of [[140, -70, 30], [105, 95, 22]]) {
      g.beginPath(); g.arc(x, y, r, 0, Math.PI * 2); g.fillStyle = INK; g.fill();
      g.beginPath(); g.arc(x, y, r * 0.62, 0, Math.PI * 2); g.fillStyle = "rgba(246,239,227,1)"; g.fill();
      g.beginPath(); g.arc(x, y, r * 0.34, 0, Math.PI * 2); g.fillStyle = TERRACOTTA; g.fill();
    }
    g.restore();
  }
  g.beginPath(); g.ellipse(0, 10, 13, 70, 0, 0, Math.PI * 2); g.fillStyle = INK; g.fill();
  g.lineWidth = 4; g.strokeStyle = INK;
  for (const s of [1, -1]) { g.beginPath(); g.moveTo(0, -55); g.quadraticCurveTo(s * 25, -120, s * 55, -140); g.stroke(); }
};

const drawChair: Draw = (g) => {
  // her wooden spindle chair, drawn in a slight three-quarter view
  g.translate(S / 2, S / 2);
  g.lineCap = "round"; g.strokeStyle = INK;
  const line = (w: number, x1: number, y1: number, x2: number, y2: number) => { g.lineWidth = w; g.beginPath(); g.moveTo(x1, y1); g.lineTo(x2, y2); g.stroke(); };
  line(14, -95, -200, -105, 210); line(14, 70, -190, 62, 215); // back posts into back legs
  line(12, -60, 40, -48, 235); line(12, 120, 40, 112, 230); // front legs
  g.beginPath(); g.moveTo(-105, 20); g.lineTo(70, 22); g.lineTo(125, 48); g.lineTo(-58, 48); g.closePath();
  g.fillStyle = "rgba(31,35,64,.75)"; g.fill();
  g.lineWidth = 6; g.stroke();
  line(16, -98, -190, 72, -180); // top rail
  for (const y of [-120, -60]) line(8, -100, y, 69, y + 8);
  for (const x of [-50, -5, 35]) line(6, x, -175, x - 2, 20);
  line(7, -100, 150, 65, 158); line(7, -52, 165, 115, 165);
  g.fillStyle = TERRACOTTA; g.beginPath(); g.ellipse(10, 34, 70, 8, 0, 0, Math.PI * 2); g.fill(); // a cushion line of colour
};

const drawKnot: Draw = (g) => {
  // a tangled thread: one continuous line that loops on itself
  g.translate(S / 2, S / 2);
  g.lineCap = "round"; g.lineJoin = "round"; g.strokeStyle = INK; g.lineWidth = 7;
  g.beginPath();
  for (let t = 0; t <= Math.PI * 2 * 7; t += 0.02) {
    const r = 120 + 70 * Math.sin(t * 1.3) + 40 * Math.cos(t * 3.1);
    const x = r * Math.cos(t) + 40 * Math.sin(t * 2.2);
    const y = r * Math.sin(t * 1.07) + 30 * Math.cos(t * 1.7);
    if (t === 0) g.moveTo(x, y); else g.lineTo(x, y);
  }
  g.stroke();
  // the loose end, in colour: where the untangling starts
  g.strokeStyle = TERRACOTTA; g.lineWidth = 9;
  g.beginPath(); g.moveTo(150, 120); g.bezierCurveTo(200, 160, 210, 210, 240, 230); g.stroke();
};

const drawBreath: Draw = (g) => {
  // an ensō drawn with a brush: thick, dry, left open
  g.translate(S / 2, S / 2);
  for (let k = 0; k < 220; k++) {
    const t = (k / 220) * Math.PI * 1.85 - 1.2;
    const w = 26 * Math.sin((k / 220) * Math.PI) + 6;
    const r = 175 + Math.sin(k * 0.21) * 4;
    g.beginPath(); g.arc(Math.cos(t) * r, Math.sin(t) * r, w / 2, 0, Math.PI * 2);
    g.fillStyle = `rgba(31,35,64,${0.35 + 0.4 * Math.random()})`; g.fill();
  }
  g.beginPath(); g.arc(0, 0, 18, 0, Math.PI * 2); g.fillStyle = TERRACOTTA; g.fill();
};

const drawKey: Draw = (g) => {
  g.translate(S / 2, S / 2);
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

const heartPath = (g: CanvasRenderingContext2D, k: number) => {
  g.beginPath();
  g.moveTo(0, 170 * k);
  g.bezierCurveTo(-40 * k, 120 * k, -210 * k, 40 * k, -200 * k, -60 * k);
  g.bezierCurveTo(-190 * k, -160 * k, -60 * k, -190 * k, 0, -95 * k);
  g.bezierCurveTo(60 * k, -190 * k, 190 * k, -160 * k, 200 * k, -60 * k);
  g.bezierCurveTo(210 * k, 40 * k, 40 * k, 120 * k, 0, 170 * k);
  g.closePath();
};
const drawHeart: Draw = (g) => {
  // the crochet heart: a scalloped terracotta rim around a lightly stitched centre
  g.translate(S / 2, S / 2 + 10);
  heartPath(g, 1.08); g.fillStyle = TERRACOTTA; g.fill();
  heartPath(g, 0.86); g.fillStyle = "rgba(246,239,227,1)"; g.fill();
  heartPath(g, 0.86); g.fillStyle = "rgba(31,35,64,.22)"; g.fill();
  g.strokeStyle = INK; g.lineWidth = 4; g.setLineDash([10, 9]);
  heartPath(g, 0.8); g.stroke();
  g.setLineDash([]);
};

const drawArch: Draw = (g) => {
  // a window of Seville: horseshoe arch, slender columns, the sun inside
  g.translate(S / 2, S / 2 + 30);
  g.strokeStyle = INK; g.lineWidth = 14;
  g.beginPath(); g.moveTo(-130, 200); g.lineTo(-130, -40); g.arc(0, -40, 130, Math.PI, 0); g.lineTo(130, 200); g.stroke();
  g.lineWidth = 6;
  g.beginPath(); g.moveTo(-160, 200); g.lineTo(-160, -40); g.arc(0, -40, 160, Math.PI, 0); g.lineTo(160, 200); g.stroke();
  g.lineWidth = 12; g.beginPath(); g.moveTo(-200, 205); g.lineTo(200, 205); g.stroke();
  g.fillStyle = TERRACOTTA; g.beginPath(); g.arc(0, 60, 48, 0, Math.PI * 2); g.fill();
  g.fillStyle = "rgba(31,35,64,.28)"; g.fillRect(-120, 130, 240, 60);
};

const DRAWINGS: Draw[] = [drawMoth, drawChair, drawKnot, drawBreath, drawKey, drawHeart, drawArch];

// sample N points from a drawing, with probability following its darkness
function sampleDrawing(draw: Draw, N: number, rnd: () => number) {
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
    const ink = a * (1 - lum * 0.85);
    if (rnd() > Math.pow(ink, 0.9)) continue;
    const accent = r > gg + 50 && r > b + 50 ? 1 : 0;
    out[n * 4] = ((x - S / 2) / (S / 2)) * 2.2;
    out[n * 4 + 1] = -((y - S / 2) / (S / 2)) * 2.2;
    out[n * 4 + 2] = (rnd() - 0.5) * 0.35;
    out[n * 4 + 3] = accent;
    n++;
  }
  for (; n < N; n++) { out[n * 4] = (rnd() - 0.5) * 6; out[n * 4 + 1] = (rnd() - 0.5) * 4; out[n * 4 + 2] = -2; out[n * 4 + 3] = 0; }
  return out;
}

const StippleField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.innerWidth < 768;
    const N = small ? 5000 : 9000;
    const LAST = DRAWINGS.length - 1;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
    } catch {
      return;
    }
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(DPR);
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.set(0, 0, 8);

    let seed = 2026;
    const rnd = () => { seed = (seed + 0x6d2b79f5) >>> 0; let t = seed; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
    const targets = DRAWINGS.map((d) => sampleDrawing(d, N, rnd));

    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) { pos[i * 3] = targets[0][i * 4]; pos[i * 3 + 1] = targets[0][i * 4 + 1]; pos[i * 3 + 2] = targets[0][i * 4 + 2]; }
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    targets.forEach((t, i) => geo.setAttribute("t" + i, new THREE.BufferAttribute(t, 4)));
    const r4 = new Float32Array(N * 4);
    for (let i = 0; i < r4.length; i++) r4[i] = Math.random();
    geo.setAttribute("rnd", new THREE.BufferAttribute(r4, 4));

    const idx = DRAWINGS.map((_, i) => i);
    const uniforms = {
      uMorph: { value: 0 }, uTime: { value: 0 }, uBreath: { value: 0 }, uPixel: { value: DPR },
      uSize: { value: small ? 2.6 : 2.9 }, uMouse: { value: new THREE.Vector3(99, 99, 0) }, uMouseOn: { value: 0 },
      uAlpha: { value: small ? 0.55 : 0.9 }, uInk: { value: new THREE.Color(INK) }, uAccent: { value: new THREE.Color(TERRACOTTA) },
    };
    const mat = new THREE.ShaderMaterial({
      uniforms, transparent: true, depthWrite: false,
      vertexShader: `
        ${idx.map((i) => `attribute vec4 t${i};`).join("")}
        attribute vec4 rnd;
        uniform float uMorph, uTime, uBreath, uPixel, uSize, uMouseOn;
        uniform vec3 uMouse;
        varying float vAcc; varying float vA;
        float W(float m, float i){ return clamp(1.0 - abs(m - i), 0.0, 1.0); }
        void main(){
          float s = sin(fract(uMorph) * 3.14159);
          float m = clamp(uMorph + (rnd.x - 0.5) * 0.8 * s, 0.0, ${LAST}.0);
          ${idx.map((i) => `float w${i} = W(m, ${i}.0);`).join("")}
          vec3 p = ${idx.map((i) => `t${i}.xyz * w${i}`).join(" + ")};
          vAcc = ${idx.map((i) => `t${i}.w * w${i}`).join(" + ")};
          float mid = sin(fract(m) * 3.14159);
          // dots drift like ink in water, more so while one drawing becomes the next
          p += vec3(sin(p.y * 1.6 + uTime * 0.5 + rnd.y * 6.28), cos(p.x * 1.4 + uTime * 0.4 + rnd.z * 6.28), sin(uTime * 0.3 + rnd.w * 6.28)) * (0.012 + 0.9 * mid);
          p.xy *= 1.0 + uBreath * 0.06;
          vec4 world = modelMatrix * vec4(p, 1.0);
          vec2 d = world.xy - uMouse.xy; float dl = length(d);
          float f = smoothstep(1.1, 0.0, dl) * uMouseOn;
          world.xy += d / (dl + 0.001) * f * 0.45;
          vec4 mv = viewMatrix * world;
          gl_Position = projectionMatrix * mv;
          gl_PointSize = uSize * uPixel * (0.6 + rnd.w * 0.9) * (8.0 / -mv.z);
          vA = 0.55 + 0.45 * rnd.z;
        }`,
      fragmentShader: `
        precision mediump float;
        uniform vec3 uInk, uAccent; uniform float uAlpha;
        varying float vAcc; varying float vA;
        void main(){
          float d = length(gl_PointCoord - 0.5);
          if (d > 0.5) discard;
          gl_FragColor = vec4(mix(uInk, uAccent, step(0.5, vAcc)), smoothstep(0.5, 0.32, d) * vA * uAlpha);
        }`,
    });
    const points = new THREE.Points(geo, mat);
    points.frustumCulled = false;
    const group = new THREE.Group();
    group.add(points);
    scene.add(group);

    let baseX = 0, baseY = 0, baseS = 1;
    const resize = () => {
      const w = window.innerWidth, h = window.innerHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      const wide = w >= 1024;
      baseX = wide ? Math.min(2.7, 1.3 + (w / h - 1) * 1.6) : 0;
      baseY = wide ? -0.1 : 0.4;
      baseS = wide ? 1 : w < 640 ? 0.78 : 0.9;
    };
    resize();
    window.addEventListener("resize", resize);

    let rooms: HTMLElement[] = [];
    const collect = () => { rooms = Array.from(document.querySelectorAll<HTMLElement>("[data-room]")).sort((a, b) => +a.dataset.room! - +b.dataset.room!); };
    collect();
    const smooth = (a: number, b: number, x: number) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
    const progress = () => {
      if (!rooms.length) return 0;
      const y = window.scrollY + window.innerHeight * 0.5;
      const c = rooms.map((el) => { const r = el.getBoundingClientRect(); return r.top + window.scrollY + r.height * 0.5; });
      if (y <= c[0]) return 0;
      for (let i = 0; i < c.length - 1; i++) if (y < c[i + 1]) return i + smooth(0.2, 0.8, (y - c[i]) / (c[i + 1] - c[i]));
      return c.length - 1;
    };

    const ndc = new THREE.Vector2();
    let pointer = false;
    const onMove = (e: PointerEvent) => { ndc.set((e.clientX / window.innerWidth) * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1); pointer = e.pointerType === "mouse"; };
    const onLeave = () => { pointer = false; };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    const tmp = new THREE.Vector3(), dir = new THREE.Vector3();

    let morph = progress(), time = 0, raf = 0, recollect = 0;
    const clock = new THREE.Clock();
    const frame = () => {
      const dt = Math.min(clock.getDelta(), 0.05);
      time += dt * (reduce ? 0.15 : 1);
      if ((recollect += dt) > 2) { recollect = 0; collect(); }
      morph += (progress() - morph) * (reduce ? 1 : Math.min(1, dt * 2.8));
      uniforms.uMorph.value = morph;
      uniforms.uTime.value = time;

      // the hero drawing is shown in full; behind reading sections it settles into a faint
      // watermark, and comes alive again while it turns into the next drawing
      const rest = small ? 0.16 : 0.24;
      const settle = morph <= 1 ? 1 - (1 - rest) * smooth(0, 1, morph) : rest;
      const moving = Math.sin((morph % 1) * Math.PI);
      uniforms.uAlpha.value = (small ? 0.6 : 0.9) * (settle + (1 - settle) * moving * 0.85);
      const xTarget = baseX * (morph <= 1 ? 1 - 0.55 * smooth(0, 1, morph) : 0.45);

      const now = performance.now();
      const ambient = reduce ? 0 : 0.5 - 0.5 * Math.cos((now / 10000) * Math.PI * 2);
      const guided = breathBus.start !== null ? guidedBreath(now - breathBus.start).value : null;
      uniforms.uBreath.value += ((guided ?? ambient * 0.6) - uniforms.uBreath.value) * Math.min(1, dt * 5);

      group.position.x += (xTarget - group.position.x) * 0.06;
      group.position.y += (baseY - group.position.y) * 0.06;
      group.scale.setScalar(baseS);
      group.rotation.y = (reduce ? 0 : Math.sin(time * 0.25) * 0.22) + ndc.x * 0.2;
      group.rotation.x = -ndc.y * 0.12;

      if (pointer) {
        tmp.set(ndc.x, ndc.y, 0.5).unproject(camera);
        dir.copy(tmp).sub(camera.position).normalize();
        uniforms.uMouse.value.copy(camera.position).addScaledVector(dir, -camera.position.z / dir.z);
      }
      uniforms.uMouseOn.value += ((pointer ? 1 : 0) - uniforms.uMouseOn.value) * 0.1;

      renderer.render(scene, camera);
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      geo.dispose(); mat.dispose(); renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="fixed inset-0 z-0 w-full h-full pointer-events-none" />;
};

export default StippleField;
