import { useEffect, useRef } from "react";
import * as THREE from "three";
import { buildShapes, PALETTE } from "./shapes";
import { breathBus, guidedBreath } from "./breath";

/**
 * Fixed WebGL layer behind the page. Sections tagged with data-mind="n" pull the
 * particles into chapter n's shape as they reach the middle of the screen.
 * Purely decorative: aria-hidden, pointer-events none, and it never touches forms.
 */
const MindField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const skyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const sky = skyRef.current;
    if (!canvas || !sky) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.innerWidth < 768;
    const N = small ? 6000 : 13000;
    const LAST = PALETTE.length - 1;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true, powerPreference: "high-performance" });
    } catch {
      return; // no WebGL: the site works exactly as before
    }
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(DPR);
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0, 8);

    const shapes = buildShapes(N);
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) { pos[i * 3] = shapes[0][i * 4]; pos[i * 3 + 1] = shapes[0][i * 4 + 1]; pos[i * 3 + 2] = shapes[0][i * 4 + 2]; }
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    shapes.forEach((s, i) => geo.setAttribute("t" + i, new THREE.BufferAttribute(s, 4)));
    const rnd = new Float32Array(N * 4);
    for (let i = 0; i < rnd.length; i++) rnd[i] = Math.random();
    geo.setAttribute("rnd", new THREE.BufferAttribute(rnd, 4));

    const uniforms: Record<string, THREE.IUniform> = {
      uMorph: { value: 0 }, uTime: { value: 0 }, uBreath: { value: 0 }, uSize: { value: small ? 15 : 13 },
      uPixel: { value: DPR }, uMouse: { value: new THREE.Vector3(99, 99, 0) }, uMouseOn: { value: 0 }, uFade: { value: 1 },
    };
    PALETTE.forEach((p, i) => {
      uniforms["uB" + i] = { value: new THREE.Color(p.base) };
      uniforms["uA" + i] = { value: new THREE.Color(p.accent) };
      uniforms["uL" + i] = { value: small && i > 0 ? p.alpha * 0.7 : p.alpha };
    });

    const idx = PALETTE.map((_, i) => i);
    const vs = `
      ${idx.map((i) => `attribute vec4 t${i};`).join("")}
      attribute vec4 rnd;
      uniform float uMorph, uTime, uBreath, uSize, uPixel, uMouseOn, uFade;
      uniform vec3 uMouse;
      ${idx.map((i) => `uniform vec3 uB${i}; uniform vec3 uA${i}; uniform float uL${i};`).join("")}
      varying vec3 vColor; varying float vAlpha;
      float W(float m, float i){ return clamp(1.0 - abs(m - i), 0.0, 1.0); }
      void main(){
        float s = sin(fract(uMorph) * 3.14159);
        float m = clamp(uMorph + (rnd.x - 0.5) * 0.6 * s, 0.0, ${LAST}.0);
        ${idx.map((i) => `float w${i} = W(m, ${i}.0);`).join("")}

        // the butterfly breathes with its wings
        vec3 b = t0.xyz;
        float flap = sin(uTime * 1.1) * 0.55 + 0.15;
        b = vec3(b.x * cos(flap), b.y, abs(b.x) * sin(flap) * -1.0 + b.z);

        vec3 p = b * w0 ${idx.slice(1).map((i) => `+ t${i}.xyz * w${i}`).join(" ")};
        float acc = t0.w * w0 ${idx.slice(1).map((i) => `+ t${i}.w * w${i}`).join(" ")};

        // slow drift, a little stronger while shapes change
        float mid = sin(fract(m) * 3.14159);
        vec3 drift = vec3(sin(p.y * 1.3 + uTime * 0.35 + rnd.y * 6.28), sin(p.z * 1.5 + uTime * 0.3 + rnd.z * 6.28), sin(p.x * 1.2 + uTime * 0.4 + rnd.w * 6.28));
        p += drift * (0.02 + 0.75 * mid);

        // breathing: the whole field expands on the in-breath (strongest on the breath sphere)
        p *= 1.0 + uBreath * (0.06 + 0.12 * w3);

        vec4 world = modelMatrix * vec4(p, 1.0);
        vec2 d = world.xy - uMouse.xy; float dl = length(d);
        float f = smoothstep(1.2, 0.0, dl) * uMouseOn;
        world.xy += d / (dl + 0.001) * f * 0.35;
        vec4 mv = viewMatrix * world;
        gl_Position = projectionMatrix * mv;
        gl_PointSize = uSize * uPixel * (0.45 + rnd.w * 0.8) * (1.0 + mid * 0.4) / -mv.z;

        vec3 base = uB0 * w0 ${idx.slice(1).map((i) => `+ uB${i} * w${i}`).join(" ")};
        vec3 accent = uA0 * w0 ${idx.slice(1).map((i) => `+ uA${i} * w${i}`).join(" ")};
        float al = uL0 * w0 ${idx.slice(1).map((i) => `+ uL${i} * w${i}`).join(" ")};
        vColor = mix(base, accent, clamp(acc, 0.0, 1.0));
        vAlpha = (0.35 + 0.6 * rnd.z) * al * uFade;
      }`;
    const fs = `
      precision mediump float;
      varying vec3 vColor; varying float vAlpha;
      void main(){
        float d = length(gl_PointCoord - 0.5);
        if (d > 0.5) discard;
        gl_FragColor = vec4(vColor, smoothstep(0.5, 0.15, d) * vAlpha);
      }`;
    const mat = new THREE.ShaderMaterial({ uniforms, vertexShader: vs, fragmentShader: fs, transparent: true, depthWrite: false });
    const points = new THREE.Points(geo, mat);
    points.frustumCulled = false;
    const group = new THREE.Group();
    group.add(points);
    scene.add(group);

    let baseX = 0, baseY = 0;
    const resize = () => {
      const w = window.innerWidth, h = window.innerHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      const wide = w >= 1024;
      baseX = wide ? Math.min(2.6, 1.2 + (w / h - 1) * 1.6) : 0;
      baseY = wide ? 0 : 0.6;
      group.scale.setScalar(wide ? 1 : w < 640 ? 0.72 : 0.85);
    };
    resize();
    window.addEventListener("resize", resize);

    // scroll → chapter
    let chapters: HTMLElement[] = [];
    const collect = () => { chapters = Array.from(document.querySelectorAll<HTMLElement>("[data-mind]")).sort((a, b) => +a.dataset.mind! - +b.dataset.mind!); };
    collect();
    const smooth = (a: number, b: number, x: number) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
    const scrollMorph = () => {
      if (!chapters.length) return 0;
      const y = window.scrollY + window.innerHeight * 0.5;
      const c = chapters.map((el) => { const r = el.getBoundingClientRect(); return r.top + window.scrollY + r.height * 0.5; });
      if (y <= c[0]) return 0;
      for (let i = 0; i < c.length - 1; i++) if (y < c[i + 1]) return i + smooth(0.2, 0.8, (y - c[i]) / (c[i + 1] - c[i]));
      return c.length - 1;
    };
    const skyFade = () => {
      const hero = chapters[0];
      if (!hero) return 0;
      const r = hero.getBoundingClientRect();
      return 1 - smooth(0.25, 0.95, -r.top / Math.max(1, r.height));
    };

    // pointer: particles step aside gently
    const ndc = new THREE.Vector2();
    let pointer = false;
    const onMove = (e: PointerEvent) => { ndc.set((e.clientX / window.innerWidth) * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1); pointer = e.pointerType === "mouse"; };
    const onLeave = () => { pointer = false; };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    const tmp = new THREE.Vector3(), dirV = new THREE.Vector3();

    let morph = scrollMorph(), time = 0, raf = 0, recollect = 0;
    const clock = new THREE.Clock();
    const frame = () => {
      const dt = Math.min(clock.getDelta(), 0.05);
      time += dt * (reduce ? 0.15 : 1);
      if ((recollect += dt) > 2) { recollect = 0; collect(); }
      const target = scrollMorph();
      morph += (target - morph) * (reduce ? 1 : Math.min(1, dt * 3));

      // resting rhythm: 6 breaths per minute (5 s in, 5 s out), the pace used in coherent breathing
      const now = performance.now();
      const ambient = reduce ? 0 : 0.5 - 0.5 * Math.cos((now / 10000) * Math.PI * 2);
      const guided = breathBus.start !== null ? guidedBreath(now - breathBus.start).value : null;
      const want = guided ?? ambient * 0.6;
      uniforms.uBreath.value += (want - uniforms.uBreath.value) * Math.min(1, dt * 6);

      uniforms.uMorph.value = morph;
      uniforms.uTime.value = time;
      const fade = skyFade();
      sky.style.opacity = fade.toFixed(3);

      group.rotation.y = (reduce ? 0 : time * 0.06) * (morph > 0.5 ? 1 : 0.2) + ndc.x * 0.18;
      group.rotation.x = -ndc.y * 0.1;
      group.position.x += (baseX - group.position.x) * 0.06;
      group.position.y += (baseY - group.position.y) * 0.06;

      if (pointer) {
        tmp.set(ndc.x, ndc.y, 0.5).unproject(camera);
        dirV.copy(tmp).sub(camera.position).normalize();
        uniforms.uMouse.value.copy(camera.position).addScaledVector(dirV, -camera.position.z / dirV.z);
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

  return (
    <>
      <div
        ref={skyRef}
        aria-hidden="true"
        className="fixed inset-0 z-0 pointer-events-none"
        style={{ background: "radial-gradient(120% 90% at 70% 40%, #1d2c6b 0%, #121b44 45%, #0b1130 100%)" }}
      />
      <canvas ref={canvasRef} aria-hidden="true" className="fixed inset-0 z-0 w-full h-full pointer-events-none" />
    </>
  );
};

export default MindField;
