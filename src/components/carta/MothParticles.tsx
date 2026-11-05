import { useEffect, useRef } from "react";
import * as THREE from "three";
import { drawMoth, sampleDrawing, seeded, watchVisibility, INK, TERRACOTTA } from "./stipple";
import { breathBus, guidedBreath } from "@/components/mind/breath";

/**
 * A stippled moth resting by the hero photo. It beats its wings slowly; when the cursor
 * passes, its dots scatter like dust and drift back into shape.
 */
const MothParticles = ({ className = "" }: { className?: string }) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current, canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.innerWidth < 768;

    let renderer: THREE.WebGLRenderer;
    try { renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true }); } catch { return; }
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(DPR);
    renderer.setClearColor(0, 0);

    const pts = sampleDrawing(drawMoth, small ? 2200 : 3400, seeded(7));
    const N = pts.length / 4;
    const pos = new Float32Array(N * 3), acc = new Float32Array(N), rnd = new Float32Array(N * 4);
    for (let i = 0; i < N; i++) {
      pos[i * 3] = pts[i * 4]; pos[i * 3 + 1] = pts[i * 4 + 1]; pos[i * 3 + 2] = pts[i * 4 + 2];
      acc[i] = pts[i * 4 + 3];
    }
    for (let i = 0; i < rnd.length; i++) rnd[i] = Math.random();
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.setAttribute("acc", new THREE.BufferAttribute(acc, 1));
    geo.setAttribute("rnd", new THREE.BufferAttribute(rnd, 4));

    const uniforms = {
      uTime: { value: 0 }, uMouse: { value: new THREE.Vector2(9, 9) }, uHover: { value: 0 }, uScatter: { value: 0 },
      uSize: { value: 1.9 * DPR }, uBreath: { value: 0 },
      uInk: { value: new THREE.Color(INK) }, uAccent: { value: new THREE.Color(TERRACOTTA) },
    };
    const mat = new THREE.ShaderMaterial({
      uniforms, transparent: true, depthWrite: false,
      vertexShader: `
        attribute float acc; attribute vec4 rnd;
        uniform float uTime, uHover, uScatter, uSize, uBreath; uniform vec2 uMouse;
        varying float vAcc; varying float vA;
        void main(){
          vec3 p = position;
          // wings beat slowly from the body outward
          float beat = 0.8 + 0.2 * cos(uTime * 2.1);
          p.x *= mix(1.0, beat, smoothstep(0.1, 1.6, abs(p.x)));
          p.y += 0.05 * sin(uTime * 1.2);
          p.xy *= 1.0 + uBreath * 0.04;
          // the cursor blows the dots away like dust
          vec2 d = p.xy - uMouse; float dl = length(d);
          float f = smoothstep(1.4, 0.0, dl) * uHover;
          vec2 dir = dl > 0.001 ? d / dl : vec2(0.0, 1.0);
          vec2 swirl = vec2(-dir.y, dir.x);
          p.xy += (dir * (0.4 + rnd.x * 1.2) + swirl * (rnd.y - 0.5) * 0.8) * f;
          // a click sends the whole moth into a cloud for a moment
          p.xy += vec2(rnd.z - 0.5, rnd.w - 0.5) * 3.0 * uScatter;
          p.xy += vec2(sin(uTime * 0.7 + rnd.y * 6.28), cos(uTime * 0.6 + rnd.z * 6.28)) * 0.012;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
          gl_PointSize = uSize * (0.6 + rnd.w * 0.9);
          vAcc = acc; vA = 0.35 + 0.5 * rnd.z;
        }`,
      fragmentShader: `
        precision mediump float;
        uniform vec3 uInk, uAccent; varying float vAcc; varying float vA;
        void main(){
          float d = length(gl_PointCoord - 0.5);
          if (d > 0.5) discard;
          gl_FragColor = vec4(mix(uInk, uAccent, vAcc), smoothstep(0.5, 0.3, d) * vA);
        }`,
    });
    const points = new THREE.Points(geo, mat);
    const scene = new THREE.Scene();
    scene.add(points);
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, -10, 10);

    const K = 2.5;
    const resize = () => {
      const w = wrap.clientWidth, h = wrap.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      const a = w / h;
      camera.left = -K * a; camera.right = K * a; camera.top = K; camera.bottom = -K;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize); ro.observe(wrap);

    const mouse = new THREE.Vector2(9, 9);
    let inside = false;
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      inside = x > -0.1 && x < 1.1 && y > -0.1 && y < 1.1;
      mouse.set((x * 2 - 1) * K * (r.width / r.height), -(y * 2 - 1) * K);
    };
    let scatter = 0;
    const onClick = () => { scatter = 1; };
    window.addEventListener("pointermove", onMove, { passive: true });
    wrap.addEventListener("pointerdown", onClick);

    let running = true;
    const stopWatch = watchVisibility(wrap, (v) => { const was = running; running = v; if (v && !was) { clock.getDelta(); raf = requestAnimationFrame(frame); } });
    const clock = new THREE.Clock();
    let raf = 0, time = 0;
    const frame = () => {
      if (!running) return;
      const dt = Math.min(clock.getDelta(), 0.05);
      time += reduce ? 0 : dt;
      uniforms.uTime.value = time;
      uniforms.uMouse.value.lerp(mouse, 0.25);
      uniforms.uHover.value += ((inside ? 1 : 0) - uniforms.uHover.value) * 0.08;
      scatter *= 0.94; uniforms.uScatter.value += (scatter - uniforms.uScatter.value) * 0.2;
      const now = performance.now();
      const ambient = reduce ? 0 : 0.5 - 0.5 * Math.cos((now / 10000) * Math.PI * 2);
      const guided = breathBus.start !== null ? guidedBreath(now - breathBus.start).value : null;
      uniforms.uBreath.value += ((guided ?? ambient) - uniforms.uBreath.value) * 0.1;
      points.rotation.z = reduce ? 0 : Math.sin(time * 0.3) * 0.06 - 0.12;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      running = false; cancelAnimationFrame(raf); stopWatch(); ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerdown", onClick);
      geo.dispose(); mat.dispose(); renderer.dispose();
    };
  }, []);

  return (
    <div ref={wrapRef} className={className} aria-hidden="true">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};

export default MothParticles;
