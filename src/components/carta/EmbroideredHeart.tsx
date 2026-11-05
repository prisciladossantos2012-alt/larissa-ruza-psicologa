import { useEffect, useRef } from "react";
import * as THREE from "three";
import { watchVisibility } from "./stipple";
import { breathBus, guidedBreath } from "@/components/mind/breath";

/**
 * An embroidered heart patch: satin-stitched burgundy rim with a scalloped edge, a cream
 * woven centre and a running stitch. The fabric ripples, bulges under the cursor and tilts
 * toward it. Drawn entirely in a shader.
 */
const EmbroideredHeart = ({ className = "" }: { className?: string }) => {
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

    const uniforms = {
      uTime: { value: 0 }, uMouse: { value: new THREE.Vector2(9, 9) }, uHover: { value: 0 }, uBreath: { value: 0 },
    };
    const mat = new THREE.ShaderMaterial({
      uniforms, transparent: true, side: THREE.DoubleSide, depthWrite: false,
      vertexShader: `
        uniform float uTime, uHover, uBreath; uniform vec2 uMouse;
        varying vec2 vUv; varying vec3 vPos;
        void main(){
          vUv = uv;
          vec3 p = position;
          p.z += 0.035 * sin(p.x * 4.0 + uTime * 1.3) * cos(p.y * 3.5 + uTime);
          vec2 d = p.xy - uMouse;
          p.z += 0.22 * exp(-dot(d, d) * 5.0) * uHover;
          p.z += uBreath * 0.05 * (1.0 - dot(p.xy, p.xy) * 0.4);
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          vPos = mv.xyz;
          gl_Position = projectionMatrix * mv;
        }`,
      fragmentShader: `
        precision highp float;
        varying vec2 vUv; varying vec3 vPos;
        float dot2(vec2 v){ return dot(v, v); }
        float sdHeart(vec2 p){
          p.x = abs(p.x);
          if (p.y + p.x > 1.0) return sqrt(dot2(p - vec2(0.25, 0.75))) - sqrt(2.0) / 4.0;
          return sqrt(min(dot2(p - vec2(0.0, 1.0)), dot2(p - 0.5 * max(p.x + p.y, 0.0)))) * sign(p.x - p.y);
        }
        void main(){
          vec2 p = (vUv - vec2(0.5, 0.1)) * 1.3;
          float d = sdHeart(p);
          float ang = atan(p.y - 0.45, p.x);
          float edge = d - 0.028 * (0.5 + 0.5 * cos(ang * 26.0));   // scalloped crochet edge
          vec3 n = normalize(cross(dFdx(vPos), dFdy(vPos)));
          float light = 0.72 + 0.38 * max(dot(n, normalize(vec3(-0.4, 0.6, 0.9))), 0.0);
          if (edge > 0.0) {
            // soft shadow of the patch on the paper
            float sd = sdHeart(p - vec2(0.035, -0.05)) - 0.03;
            float a = 0.2 * (1.0 - smoothstep(-0.02, 0.07, sd));
            if (a < 0.003) discard;
            gl_FragColor = vec4(vec3(0.24, 0.16, 0.12), a);
            return;
          }
          vec3 col;
          if (d > -0.14) {
            // satin stitches across the rim
            float s = fract(dot(p, normalize(vec2(1.0, 0.55))) * 75.0);
            float thread = 0.78 + 0.22 * sin(s * 6.2832);
            col = vec3(0.56, 0.12, 0.17) * thread;
          } else {
            // woven cream centre
            vec2 g = fract(p * 95.0);
            float weave = 0.93 + 0.07 * (step(0.5, g.x) * step(0.5, g.y) + step(g.x, 0.5) * step(g.y, 0.5));
            col = vec3(0.95, 0.91, 0.82) * weave;
            // running stitch just inside the rim
            float band = 1.0 - smoothstep(0.004, 0.009, abs(d + 0.185));
            float dash = step(0.42, fract(ang * 7.0));
            col = mix(col, vec3(0.12, 0.14, 0.25), band * dash);
            // a few terracotta french knots
            for (int k = 0; k < 5; k++) {
              float fk = float(k);
              vec2 c = vec2(-0.2 + 0.1 * fk, 0.42 + 0.08 * sin(fk * 1.7));
              col = mix(col, vec3(0.76, 0.31, 0.19), 1.0 - smoothstep(0.012, 0.02, length(p - c)));
            }
          }
          // a rim of thread catches the light where the edge rolls over
          col *= light * (1.0 - 0.25 * smoothstep(-0.03, 0.0, edge));
          gl_FragColor = vec4(col, 1.0);
        }`,
    });
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2, 96, 96), mat);
    const scene = new THREE.Scene();
    scene.add(mesh);
    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 20);
    camera.position.set(0, 0, 4);

    const resize = () => {
      const w = wrap.clientWidth, h = wrap.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h; camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize); ro.observe(wrap);

    const mouse = new THREE.Vector2(9, 9), tilt = new THREE.Vector2();
    let inside = false;
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      inside = x > -0.05 && x < 1.05 && y > -0.05 && y < 1.05;
      mouse.set((x * 2 - 1) * 1.1, -(y * 2 - 1) * 1.1);
      tilt.set(Math.max(-1, Math.min(1, x * 2 - 1)), Math.max(-1, Math.min(1, y * 2 - 1)));
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    let running = true;
    const stopWatch = watchVisibility(wrap, (v) => { const was = running; running = v; if (v && !was) { clock.getDelta(); raf = requestAnimationFrame(frame); } });
    const clock = new THREE.Clock();
    let raf = 0, time = 0;
    const frame = () => {
      if (!running) return;
      const dt = Math.min(clock.getDelta(), 0.05);
      time += reduce ? 0 : dt;
      uniforms.uTime.value = time;
      uniforms.uMouse.value.lerp(mouse, 0.2);
      uniforms.uHover.value += ((inside ? 1 : 0) - uniforms.uHover.value) * 0.08;
      const now = performance.now();
      const ambient = reduce ? 0 : 0.5 - 0.5 * Math.cos((now / 10000) * Math.PI * 2);
      const guided = breathBus.start !== null ? guidedBreath(now - breathBus.start).value : null;
      uniforms.uBreath.value += ((guided ?? ambient) - uniforms.uBreath.value) * 0.1;
      mesh.rotation.y += ((reduce ? 0 : tilt.x * 0.35) - mesh.rotation.y) * 0.06;
      mesh.rotation.x += ((reduce ? 0 : tilt.y * 0.3) - mesh.rotation.x) * 0.06;
      mesh.rotation.z = -0.08 + (reduce ? 0 : Math.sin(time * 0.4) * 0.03);
      renderer.render(scene, camera);
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      running = false; cancelAnimationFrame(raf); stopWatch(); ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      mesh.geometry.dispose(); mat.dispose(); renderer.dispose();
    };
  }, []);

  return (
    <div ref={wrapRef} className={className} aria-hidden="true">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};

export default EmbroideredHeart;
