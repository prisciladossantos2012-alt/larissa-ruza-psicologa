import { useEffect, useRef } from "react";
import * as THREE from "three";
import { watchVisibility, INK, TERRACOTTA } from "./stipple";

/**
 * An ink thread for the specialties section. It starts tangled and untangles as the visitor
 * scrolls through the list. The cursor plucks it like a string (spring physics).
 */
const ThreadLine = ({ className = "", sectionId }: { className?: string; sectionId: string }) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current, canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let renderer: THREE.WebGLRenderer;
    try { renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true }); } catch { return; }
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(DPR);
    renderer.setClearColor(0, 0);

    const N = 520;
    let W = 1, H = 1;
    // tangled and straight versions of the same thread, in 0..1 box coordinates
    const tangled = new Float32Array(N * 2), straight = new Float32Array(N * 2);
    const build = () => {
      for (let i = 0; i < N; i++) {
        const u = i / (N - 1);
        const t = u * Math.PI * 2 * 5.5;
        const r = 0.2 + 0.09 * Math.sin(t * 1.3) + 0.06 * Math.cos(t * 3.1);
        tangled[i * 2] = 0.5 + r * Math.cos(t) * 1.15 + 0.06 * Math.sin(t * 2.2);
        tangled[i * 2 + 1] = 0.45 + r * Math.sin(t * 1.07) + 0.04 * Math.cos(t * 1.7);
        straight[i * 2] = 0.04 + u * 0.92;
        straight[i * 2 + 1] = 0.55 + 0.05 * Math.sin(u * Math.PI * 3) * (1 - u * 0.4);
      }
      // the loose end leaves the tangle toward the bottom right
      for (let i = Math.floor(N * 0.88); i < N; i++) {
        const k = (i - N * 0.88) / (N * 0.12);
        tangled[i * 2] = tangled[Math.floor(N * 0.88) * 2] + k * 0.32;
        tangled[i * 2 + 1] = tangled[Math.floor(N * 0.88) * 2 + 1] + k * 0.3;
      }
    };
    build();

    const P = new Float32Array(N * 2), V = new Float32Array(N * 2);
    const verts = new Float32Array(N * 2 * 3);
    const colors = new Float32Array(N * 2 * 3);
    const ink = new THREE.Color(INK), terra = new THREE.Color(TERRACOTTA);
    for (let i = 0; i < N; i++) {
      const c = i > N * 0.88 ? terra : ink;
      for (const s of [0, 1]) colors.set([c.r, c.g, c.b], (i * 2 + s) * 3);
    }
    const index: number[] = [];
    for (let i = 0; i < N - 1; i++) { const a = i * 2; index.push(a, a + 1, a + 2, a + 1, a + 3, a + 2); }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(verts, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geo.setIndex(index);
    const mat = new THREE.MeshBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.92, side: THREE.DoubleSide });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.frustumCulled = false;
    const scene = new THREE.Scene();
    scene.add(mesh);
    const camera = new THREE.OrthographicCamera(0, 1, 0, -1, -1, 1);

    const resize = () => {
      W = wrap.clientWidth; H = wrap.clientHeight;
      if (!W || !H) return;
      renderer.setSize(W, H, false);
      camera.left = 0; camera.right = W; camera.top = 0; camera.bottom = -H;
      camera.updateProjectionMatrix();
    };
    resize();
    let progress = 0, target = 0;
    for (let i = 0; i < N; i++) { P[i * 2] = tangled[i * 2] * W; P[i * 2 + 1] = tangled[i * 2 + 1] * H; }
    const ro = new ResizeObserver(resize); ro.observe(wrap);

    const section = document.getElementById(sectionId);
    const readScroll = () => {
      if (!section) return;
      const r = section.getBoundingClientRect();
      const vh = window.innerHeight;
      target = Math.min(1, Math.max(0, (vh * 0.75 - r.top) / (r.height * 0.75)));
    };
    readScroll();
    window.addEventListener("scroll", readScroll, { passive: true });

    const mouse = { x: -9999, y: -9999, px: -9999, py: -9999 };
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    let running = true;
    const stopWatch = watchVisibility(wrap, (v) => { const was = running; running = v; if (v && !was) { raf = requestAnimationFrame(frame); } });
    let raf = 0;
    const width = 2.2;
    const frame = () => {
      if (!running) return;
      progress += (target - progress) * (reduce ? 1 : 0.06);
      const e = progress * progress * (3 - 2 * progress);
      const mvx = mouse.x - mouse.px, mvy = mouse.y - mouse.py;
      mouse.px = mouse.x; mouse.py = mouse.y;
      for (let i = 0; i < N; i++) {
        const rx = (tangled[i * 2] + (straight[i * 2] - tangled[i * 2]) * e) * W;
        const ry = (tangled[i * 2 + 1] + (straight[i * 2 + 1] - tangled[i * 2 + 1]) * e) * H;
        let vx = V[i * 2], vy = V[i * 2 + 1];
        vx = vx * 0.86 + (rx - P[i * 2]) * 0.06;
        vy = vy * 0.86 + (ry - P[i * 2 + 1]) * 0.06;
        const dx = P[i * 2] - mouse.x, dy = P[i * 2 + 1] - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (!reduce && d2 < 3600) {
          // the cursor drags the thread with it, like a finger through a string
          const k = 1 - Math.sqrt(d2) / 60;
          vx += mvx * 0.35 * k + (dx / 60) * 2 * k;
          vy += mvy * 0.35 * k + (dy / 60) * 2 * k;
        }
        V[i * 2] = vx; V[i * 2 + 1] = vy;
        P[i * 2] += vx; P[i * 2 + 1] += vy;
      }
      for (let i = 0; i < N; i++) {
        const a = Math.max(0, i - 1), b = Math.min(N - 1, i + 1);
        let tx = P[b * 2] - P[a * 2], ty = P[b * 2 + 1] - P[a * 2 + 1];
        const l = Math.hypot(tx, ty) || 1; tx /= l; ty /= l;
        const w = width * (i > N * 0.88 ? 1.4 : 1);
        const nx = -ty * w, ny = tx * w;
        const x = P[i * 2], y = -P[i * 2 + 1];
        verts.set([x + nx, y - ny, 0, x - nx, y + ny, 0], i * 6);
      }
      geo.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      running = false; cancelAnimationFrame(raf); stopWatch(); ro.disconnect();
      window.removeEventListener("scroll", readScroll);
      window.removeEventListener("pointermove", onMove);
      geo.dispose(); mat.dispose(); renderer.dispose();
    };
  }, [sectionId]);

  return (
    <div ref={wrapRef} className={className} aria-hidden="true">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};

export default ThreadLine;
