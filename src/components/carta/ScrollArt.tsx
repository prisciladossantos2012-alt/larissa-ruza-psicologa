import { useEffect, useRef } from "react";
import * as THREE from "three";
import { sampleDrawing, seeded, INK, TERRACOTTA } from "./stipple";
import { THEMES } from "./drawings";
import { breathBus, guidedBreath } from "@/components/mind/breath";

/**
 * One field of ink dots that follows the whole page. Each section ([data-room="n"]) has a
 * drawing for its theme; as the visitor scrolls, the dots let go of one drawing and settle
 * into the next. A section can reserve a place for its drawing with an empty
 * [data-art-anchor] element; otherwise the drawing sits to the side as a faint watermark
 * behind the reading. The cursor parts the dots, a click scatters them, and the field
 * breathes with the "Breathe with me" guide.
 */

const VIEW_H = 2 * 8 * Math.tan((40 / 2) * (Math.PI / 180)); // world height seen by the camera at z = 0
const EXTENT = 4.4; // drawings span -2.2..2.2

function padTo(src: Float32Array, N: number) {
  const out = new Float32Array(N * 4);
  const n = src.length / 4;
  for (let i = 0; i < N; i++) out.set(src.subarray((i % n) * 4, (i % n) * 4 + 4), i * 4);
  return out;
}

type Tf = { x: number; y: number; s: number; a: number };

const ScrollArt = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.innerWidth < 768;
    const N = small ? 4200 : 7200;
    const LAST = THEMES.length - 1;

    let renderer: THREE.WebGLRenderer;
    try { renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true }); } catch { return; }
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(DPR);
    renderer.setClearColor(0, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.set(0, 0, 8);

    const rnd = seeded(2026);
    const targets = THEMES.map((d) => padTo(sampleDrawing(d, N, rnd), N));
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) pos.set(targets[0].subarray(i * 4, i * 4 + 3), i * 3);
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    targets.forEach((t, i) => geo.setAttribute("t" + i, new THREE.BufferAttribute(t, 4)));
    const r4 = new Float32Array(N * 4);
    for (let i = 0; i < r4.length; i++) r4[i] = Math.random();
    geo.setAttribute("rnd", new THREE.BufferAttribute(r4, 4));

    const idx = THEMES.map((_, i) => i);
    const uniforms = {
      uMorph: { value: 0 }, uTime: { value: 0 }, uBreath: { value: 0 }, uScatter: { value: 0 },
      uSize: { value: (small ? 2.2 : 2.4) * DPR }, uScale: { value: 1 },
      uMouse: { value: new THREE.Vector2(99, 99) }, uMouseOn: { value: 0 }, uAlpha: { value: 1 },
      uInk: { value: new THREE.Color(INK) }, uAccent: { value: new THREE.Color(TERRACOTTA) },
    };
    const mat = new THREE.ShaderMaterial({
      uniforms, transparent: true, depthWrite: false,
      vertexShader: `
        ${idx.map((i) => `attribute vec4 t${i};`).join("")}
        attribute vec4 rnd;
        uniform float uMorph, uTime, uBreath, uScatter, uSize, uScale, uMouseOn;
        uniform vec2 uMouse;
        varying float vAcc; varying float vA;
        float W(float m, float i){ return clamp(1.0 - abs(m - i), 0.0, 1.0); }
        void main(){
          float s = sin(fract(uMorph) * 3.14159);
          float m = clamp(uMorph + (rnd.x - 0.5) * 0.8 * s, 0.0, ${LAST}.0);
          ${idx.map((i) => `float w${i} = W(m, ${i}.0);`).join("")}
          vec3 p = ${idx.map((i) => `t${i}.xyz * w${i}`).join(" + ")};
          vAcc = ${idx.map((i) => `t${i}.w * w${i}`).join(" + ")};
          // the moth beats its wings
          float beat = 0.8 + 0.2 * cos(uTime * 2.1);
          p.x *= mix(1.0, beat, w0 * smoothstep(0.1, 1.6, abs(p.x)));
          float mid = sin(fract(m) * 3.14159);
          p += vec3(sin(p.y * 1.6 + uTime * 0.5 + rnd.y * 6.28), cos(p.x * 1.4 + uTime * 0.4 + rnd.z * 6.28), 0.0) * (0.012 + 0.9 * mid);
          p.xy *= 1.0 + uBreath * 0.05;
          // cursor (in drawing space) parts the dots; a click scatters them for a moment
          vec2 d = p.xy - uMouse; float dl = length(d);
          float f = smoothstep(1.3, 0.0, dl) * uMouseOn;
          vec2 dir = dl > 0.001 ? d / dl : vec2(0.0, 1.0);
          p.xy += (dir * (0.35 + rnd.x * 1.0) + vec2(-dir.y, dir.x) * (rnd.y - 0.5) * 0.7) * f;
          p.xy += vec2(rnd.z - 0.5, rnd.w - 0.5) * 3.2 * uScatter;
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_Position = projectionMatrix * mv;
          gl_PointSize = uSize * (0.6 + rnd.w * 0.9) * clamp(uScale, 0.6, 1.3);
          vA = 0.4 + 0.5 * rnd.z;
        }`,
      fragmentShader: `
        precision mediump float;
        uniform vec3 uInk, uAccent; uniform float uAlpha;
        varying float vAcc; varying float vA;
        void main(){
          float d = length(gl_PointCoord - 0.5);
          if (d > 0.5) discard;
          gl_FragColor = vec4(mix(uInk, uAccent, step(0.5, vAcc)), smoothstep(0.5, 0.3, d) * vA * uAlpha);
        }`,
    });
    const points = new THREE.Points(geo, mat);
    points.frustumCulled = false;
    scene.add(points);

    let W = window.innerWidth, H = window.innerHeight;
    const resize = () => {
      W = window.innerWidth; H = window.innerHeight;
      renderer.setSize(W, H, false);
      camera.aspect = W / H; camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener("resize", resize);

    let rooms: HTMLElement[] = [];
    const collect = () => { rooms = Array.from(document.querySelectorAll<HTMLElement>("[data-room]")).sort((a, b) => +a.dataset.room! - +b.dataset.room!); };
    collect();
    const smooth = (a: number, b: number, x: number) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
    const progress = () => {
      if (!rooms.length) return 0;
      const y = window.scrollY + H * 0.5;
      const c = rooms.map((el) => { const r = el.getBoundingClientRect(); return r.top + window.scrollY + r.height * 0.5; });
      if (y <= c[0]) return 0;
      for (let i = 0; i < c.length - 1; i++) if (y < c[i + 1]) return i + smooth(0.25, 0.75, (y - c[i]) / (c[i + 1] - c[i]));
      return c.length - 1;
    };

    // where each drawing should sit: in its anchor if the section reserved one, else as a side watermark
    const toWorld = (px: number, py: number) => ({ x: ((px - W / 2) / H) * VIEW_H, y: (-(py - H / 2) / H) * VIEW_H });
    const placement = (i: number): Tf => {
      const anchor = rooms[i]?.querySelector<HTMLElement>("[data-art-anchor]");
      if (anchor) {
        const r = anchor.getBoundingClientRect();
        if (r.height > 20 && r.width > 20) {
          const w = toWorld(r.left + r.width / 2, r.top + r.height / 2);
          return { x: w.x, y: w.y, s: (Math.min(r.height, r.width * 1.1) / H) * VIEW_H / EXTENT, a: 1 };
        }
      }
      const wide = W >= 1024;
      const w = toWorld(wide ? W * 0.8 : W * 0.5, H * 0.52);
      return { x: w.x, y: w.y, s: ((wide ? 0.6 : 0.5) * VIEW_H) / EXTENT, a: wide ? 0.2 : 0.12 };
    };

    const mouse = { x: -9999, y: -9999, on: false };
    const onMove = (e: PointerEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; mouse.on = e.pointerType === "mouse"; };
    const onLeave = () => { mouse.on = false; };
    let scatter = 0;
    const cur: Tf = { x: 0, y: 0, s: 1, a: 1 };
    const onDown = (e: PointerEvent) => {
      // a click on (or right next to) the drawing scatters it
      const w = toWorld(e.clientX, e.clientY);
      const dx = (w.x - cur.x) / cur.s, dy = (w.y - cur.y) / cur.s;
      if (dx * dx + dy * dy < 2.4 * 2.4 && cur.a > 0.5) scatter = 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    let morph = progress(), time = 0, raf = 0, recollect = 0, first = true;
    const clock = new THREE.Clock();
    const frame = () => {
      const dt = Math.min(clock.getDelta(), 0.05);
      time += reduce ? 0 : dt;
      if ((recollect += dt) > 2) { recollect = 0; collect(); }
      morph += (progress() - morph) * (reduce ? 1 : Math.min(1, dt * 2.6));
      uniforms.uMorph.value = morph;
      uniforms.uTime.value = time;

      const i0 = Math.min(LAST, Math.floor(morph)), i1 = Math.min(LAST, i0 + 1), f = morph - i0;
      const A = placement(i0), B = placement(i1);
      const target: Tf = { x: A.x + (B.x - A.x) * f, y: A.y + (B.y - A.y) * f, s: A.s + (B.s - A.s) * f, a: A.a + (B.a - A.a) * f };
      const k = first ? 1 : Math.min(1, dt * 7);
      first = false;
      cur.x += (target.x - cur.x) * k; cur.y += (target.y - cur.y) * k; cur.s += (target.s - cur.s) * k;
      const alive = Math.sin(f * Math.PI);
      cur.a = target.a + (1 - target.a) * alive * 0.85;
      points.position.set(cur.x, cur.y, 0);
      points.scale.setScalar(cur.s);
      uniforms.uScale.value = cur.s;
      uniforms.uAlpha.value = cur.a;
      points.rotation.y = reduce ? 0 : Math.sin(time * 0.25) * 0.15;

      const now = performance.now();
      const ambient = reduce ? 0 : 0.5 - 0.5 * Math.cos((now / 10000) * Math.PI * 2);
      const guided = breathBus.start !== null ? guidedBreath(now - breathBus.start).value : null;
      uniforms.uBreath.value += ((guided ?? ambient * 0.6) - uniforms.uBreath.value) * Math.min(1, dt * 5);

      const mw = toWorld(mouse.x, mouse.y);
      uniforms.uMouse.value.set((mw.x - cur.x) / cur.s, (mw.y - cur.y) / cur.s);
      uniforms.uMouseOn.value += ((mouse.on && cur.a > 0.4 ? 1 : 0) - uniforms.uMouseOn.value) * 0.1;
      scatter *= 0.93;
      uniforms.uScatter.value += (scatter - uniforms.uScatter.value) * 0.2;

      renderer.render(scene, camera);
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      document.removeEventListener("pointerleave", onLeave);
      geo.dispose(); mat.dispose(); renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="fixed inset-0 z-0 w-full h-full pointer-events-none" />;
};

export default ScrollArt;
