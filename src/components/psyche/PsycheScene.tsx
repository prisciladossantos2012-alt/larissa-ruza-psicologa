import { useEffect, useRef } from "react";
import * as THREE from "three";
import { Reflector } from "three/examples/jsm/objects/Reflector.js";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { breathBus, guidedBreath } from "@/components/mind/breath";

/**
 * A quiet, surreal building the visitor walks through while scrolling.
 * Each [data-room="n"] section moves the camera to room n:
 * 0 the key in the niche · 1 the moon gate and the chair · 2 the corridor and the stairs
 * 3 the mirror · 4 the keyhole door · 5 the ensō · 6 sunrise.
 * Decorative only: aria-hidden, pointer-events none, never touches forms.
 */

const FOG = new THREE.Color("#666e98");
const WALL = new THREE.Color("#9da3c8");
const WARM = new THREE.Color("#f4d6a2");

const ROOM_Z = [-6, -22, -38, -54, -70, -86, -102];
type Stop = { pos: [number, number, number]; look: [number, number, number] };
const STOPS: Stop[] = [
  { pos: [-0.4, 1.7, 5.5], look: [1.0, 2.7, -6] },
  { pos: [0.2, 1.6, ROOM_Z[1] + 9], look: [0.4, 2.6, ROOM_Z[1] - 4] },
  { pos: [-0.3, 1.7, ROOM_Z[2] + 8.5], look: [-1.2, 2.4, ROOM_Z[2] - 6] },
  { pos: [0.1, 1.6, ROOM_Z[3] + 8], look: [1.2, 2.2, ROOM_Z[3] - 3] },
  { pos: [0, 1.6, ROOM_Z[4] + 8.5], look: [0, 2.5, ROOM_Z[4] - 4] },
  { pos: [0.2, 1.8, ROOM_Z[5] + 8], look: [0, 2.8, ROOM_Z[5] - 4] },
  { pos: [0, 1.6, ROOM_Z[6] + 9], look: [0, 3.2, ROOM_Z[6] - 16] },
];

// ---------- procedural textures ----------
function plasterTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 256;
  const g = c.getContext("2d")!;
  g.fillStyle = "#808080";
  g.fillRect(0, 0, 256, 256);
  const img = g.getImageData(0, 0, 256, 256);
  for (let i = 0; i < img.data.length; i += 4) {
    const v = 118 + Math.random() * 20;
    img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
  }
  g.putImageData(img, 0, 0);
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(6, 6);
  return t;
}

function wingTexture() {
  const c = document.createElement("canvas");
  c.width = 256; c.height = 256;
  const g = c.getContext("2d")!;
  // one wing (right side). The hinge sits on the left edge.
  g.beginPath();
  g.moveTo(4, 128);
  g.bezierCurveTo(60, 10, 230, -10, 240, 70);
  g.bezierCurveTo(250, 120, 170, 130, 130, 132);
  g.bezierCurveTo(200, 150, 220, 230, 150, 246);
  g.bezierCurveTo(90, 256, 40, 190, 4, 128);
  g.closePath();
  const grad = g.createLinearGradient(0, 0, 256, 256);
  grad.addColorStop(0, "#fbf8f2");
  grad.addColorStop(1, "#e6e0d6");
  g.fillStyle = grad;
  g.fill();
  g.lineWidth = 3; g.strokeStyle = "rgba(60,60,80,.55)"; g.stroke();
  // eyespots, like the Apollo butterfly in Larissa's photo
  const spot = (x: number, y: number, r: number) => {
    g.beginPath(); g.arc(x, y, r, 0, Math.PI * 2); g.fillStyle = "#2c2c36"; g.fill();
    g.beginPath(); g.arc(x, y, r * 0.62, 0, Math.PI * 2); g.fillStyle = "#c9573a"; g.fill();
    g.beginPath(); g.arc(x, y, r * 0.22, 0, Math.PI * 2); g.fillStyle = "#fbf8f2"; g.fill();
  };
  spot(150, 70, 17); spot(150, 196, 13);
  g.fillStyle = "rgba(44,44,54,.75)";
  g.beginPath(); g.ellipse(200, 52, 9, 6, 0.4, 0, Math.PI * 2); g.fill();
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function glowTexture(inner: string) {
  const c = document.createElement("canvas");
  c.width = c.height = 256;
  const g = c.getContext("2d")!;
  const r = g.createRadialGradient(128, 128, 0, 128, 128, 128);
  r.addColorStop(0, inner);
  r.addColorStop(1, "rgba(0,0,0,0)");
  g.fillStyle = r;
  g.fillRect(0, 0, 256, 256);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

// ---------- geometry helpers ----------
function wallWithHole(hole: THREE.Path, width = 44, height = 16, depth = 0.8) {
  const s = new THREE.Shape();
  s.moveTo(-width / 2, 0); s.lineTo(width / 2, 0); s.lineTo(width / 2, height); s.lineTo(-width / 2, height); s.lineTo(-width / 2, 0);
  s.holes.push(hole);
  const g = new THREE.ExtrudeGeometry(s, { depth, bevelEnabled: false, curveSegments: 48 });
  g.translate(0, 0, -depth / 2);
  return g;
}
function archPath(cx: number, w: number, h: number, y0 = 0) {
  const p = new THREE.Path();
  p.moveTo(cx - w / 2, y0); p.lineTo(cx - w / 2, y0 + h);
  p.absarc(cx, y0 + h, w / 2, Math.PI, 0, true);
  p.lineTo(cx + w / 2, y0); p.lineTo(cx - w / 2, y0);
  return p;
}
function circlePath(cx: number, cy: number, r: number) {
  const p = new THREE.Path();
  p.absarc(cx, cy, r, 0, Math.PI * 2, false);
  return p;
}
function keyholePath() {
  const p = new THREE.Path();
  const cy = 3.0, r = 1.1, top = cy - Math.sqrt(r * r - 0.36);
  p.moveTo(-1.25, 0); p.lineTo(-0.6, top);
  p.absarc(0, cy, r, Math.atan2(top - cy, -0.6) + Math.PI * 2, Math.atan2(top - cy, 0.6), true);
  p.lineTo(1.25, 0); p.lineTo(-1.25, 0);
  return p;
}

const PsycheScene = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.innerWidth < 768;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: !small, powerPreference: "high-performance" });
    } catch {
      return; // no WebGL: the CSS background stays and the site works as before
    }
    const DPR = Math.min(window.devicePixelRatio || 1, small ? 1.5 : 2);
    renderer.setPixelRatio(DPR);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.9;
    renderer.shadowMap.enabled = !small;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const scene = new THREE.Scene();
    scene.background = FOG.clone();
    const fog = new THREE.FogExp2(FOG, 0.034);
    scene.fog = fog;
    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    pmrem.dispose();

    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 200);

    // light: soft sky + a low warm sun that throws long shadows
    scene.add(new THREE.HemisphereLight("#d0d4f0", "#3f4668", 1.0));
    const sun = new THREE.DirectionalLight("#fff0da", 2.2);
    sun.position.set(-10, 14, 8);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    sun.shadow.bias = -0.0004;
    sun.shadow.normalBias = 0.03;
    const sc = sun.shadow.camera as THREE.OrthographicCamera;
    sc.left = -18; sc.right = 18; sc.top = 18; sc.bottom = -18; sc.near = 1; sc.far = 60;
    scene.add(sun, sun.target);

    const disposables: { dispose: () => void }[] = [];
    const track = <T extends { dispose: () => void }>(x: T) => { disposables.push(x); return x; };

    const plaster = track(plasterTexture());
    const wallMat = track(new THREE.MeshStandardMaterial({ color: WALL, roughness: 0.96, metalness: 0, bumpMap: plaster, bumpScale: 0.6 }));
    const darkMat = track(new THREE.MeshStandardMaterial({ color: "#26262e", roughness: 0.35, metalness: 0.75 }));
    const warmMat = track(new THREE.MeshBasicMaterial({ color: WARM, fog: false }));
    const add = (m: THREE.Object3D) => { scene.add(m); return m; };
    const mesh = (g: THREE.BufferGeometry, m: THREE.Material, shadow = true) => {
      track(g);
      const x = new THREE.Mesh(g, m);
      x.castShadow = shadow; x.receiveShadow = true;
      return x;
    };

    // water floor: a mirror with a tinted, shadow-catching film on top
    const mirrorRes = small ? 0.35 : 0.5;
    const floor = new Reflector(track(new THREE.PlaneGeometry(400, 400)), {
      textureWidth: Math.round(window.innerWidth * DPR * mirrorRes),
      textureHeight: Math.round(window.innerHeight * DPR * mirrorRes),
      color: 0x9aa0c4,
    });
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.001;
    add(floor);
    const film = mesh(new THREE.PlaneGeometry(400, 400), track(new THREE.MeshStandardMaterial({ color: "#5d6690", transparent: true, opacity: 0.55, roughness: 0.25 })), false);
    film.rotation.x = -Math.PI / 2;
    film.position.y = 0.002;
    add(film);

    // room 0 · the arch and the key in its niche
    const r0 = new THREE.Group(); r0.position.z = ROOM_Z[0];
    const archHole = archPath(1.2, 4.2, 5.2);
    r0.add(mesh(wallWithHole(archHole), wallMat));
    // the niche: a block standing proud of the wall, with an arched window lit from inside
    const nicheBack = mesh(new THREE.PlaneGeometry(1.2, 2.6), warmMat, false);
    nicheBack.position.set(-3.4, 2.6, 0.42);
    r0.add(nicheBack);
    const nicheWall = mesh(wallWithHole(archPath(0, 1.1, 1.5, 1.6), 2.2, 4.4, 0.6), wallMat);
    nicheWall.position.set(-3.4, 0, 0.75);
    r0.add(nicheWall);
    const key = new THREE.Group();
    key.add(mesh(new THREE.TorusGeometry(0.2, 0.04, 16, 48), darkMat));
    const shaft = mesh(new THREE.CylinderGeometry(0.032, 0.032, 0.9, 16), darkMat); shaft.position.y = -0.62; key.add(shaft);
    const t1 = mesh(new THREE.BoxGeometry(0.16, 0.06, 0.04), darkMat); t1.position.set(0.09, -0.95, 0); key.add(t1);
    const t2 = mesh(new THREE.BoxGeometry(0.11, 0.05, 0.04), darkMat); t2.position.set(0.07, -0.82, 0); key.add(t2);
    key.position.set(-3.4, 3.1, 0.8);
    key.rotation.z = -0.35;
    r0.add(key);
    const nicheLight = new THREE.PointLight("#ffd9a6", 6, 5, 2);
    nicheLight.position.set(-3.4, 2.8, 1.5);
    r0.add(nicheLight);
    // a low wall leading into the arch
    const ledge = mesh(new THREE.BoxGeometry(6, 0.5, 0.6), wallMat); ledge.position.set(-5.2, 0.25, 3); r0.add(ledge);
    add(r0);

    // room 1 · the moon gate and the empty chair
    const r1 = new THREE.Group(); r1.position.z = ROOM_Z[1];
    r1.add(mesh(wallWithHole(circlePath(0, 3.2, 3.0)), wallMat));
    const chair = new THREE.Group();
    const leather = track(new THREE.MeshStandardMaterial({ color: "#9a4b30", roughness: 0.5, metalness: 0.05 }));
    const seat = mesh(new RoundedBoxGeometry(0.95, 0.1, 0.9, 4, 0.05), leather); seat.position.y = 0.92; chair.add(seat);
    const back = mesh(new RoundedBoxGeometry(0.95, 0.95, 0.08, 4, 0.04), leather); back.position.set(0, 1.4, -0.42); back.rotation.x = -0.18; chair.add(back);
    const legMat = track(new THREE.MeshStandardMaterial({ color: "#1d1d22", roughness: 0.4, metalness: 0.6 }));
    for (const [x, z] of [[-0.4, 0.38], [0.4, 0.38], [-0.4, -0.38], [0.4, -0.38]]) {
      const leg = mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.9, 8), legMat); leg.position.set(x, 0.45, z); chair.add(leg);
    }
    chair.position.set(1.4, 0, -3.2);
    chair.rotation.y = -0.55;
    r1.add(chair);
    const pillar = mesh(new THREE.BoxGeometry(1.6, 9, 1.6), wallMat); pillar.position.set(-6.5, 4.5, -5); r1.add(pillar);
    add(r1);

    // room 2 · a corridor of arches and a stair that keeps going up
    const r2 = new THREE.Group(); r2.position.z = ROOM_Z[2];
    for (let k = 0; k < 4; k++) {
      const w = mesh(wallWithHole(archPath(0, 3.2, 3.8)), wallMat);
      w.position.z = -k * 3.2;
      r2.add(w);
    }
    for (let s = 0; s < 12; s++) {
      const step = mesh(new THREE.BoxGeometry(2.2, 0.32, 0.6), wallMat);
      step.position.set(-4.6, 0.16 + s * 0.32, 4 - s * 0.6);
      step.scale.y = 1;
      const riser = mesh(new THREE.BoxGeometry(2.2, 0.16 + s * 0.32, 0.6), wallMat);
      riser.position.set(-4.6, (0.16 + s * 0.32) / 2, 4 - s * 0.6);
      r2.add(step, riser);
    }
    add(r2);

    // room 3 · the mirror (self-reflection) and a moon on a plinth
    const r3 = new THREE.Group(); r3.position.z = ROOM_Z[3];
    r3.add(mesh(wallWithHole(archPath(0, 5, 6)), wallMat));
    const mirrorFrame = mesh(new THREE.BoxGeometry(2.5, 4.3, 0.12), track(new THREE.MeshStandardMaterial({ color: "#3a2a22", roughness: 0.6 })));
    const glass = new Reflector(track(new THREE.PlaneGeometry(2.2, 4.0)), {
      textureWidth: Math.round(512 * (small ? 0.6 : 1)), textureHeight: Math.round(930 * (small ? 0.6 : 1)), color: 0xc4c8e2,
    });
    glass.position.z = 0.07;
    const mirror = new THREE.Group(); mirror.add(mirrorFrame, glass);
    mirror.position.set(2.8, 2.25, 5.0);
    mirror.rotation.y = -0.55;
    r3.add(mirror);
    const plinth = mesh(new THREE.BoxGeometry(1.1, 1.3, 1.1), track(new THREE.MeshStandardMaterial({ color: "#2b2c35", roughness: 0.5 })));
    plinth.position.set(-2.8, 0.65, 4.2);
    const moon = mesh(new THREE.SphereGeometry(0.55, 48, 32), track(new THREE.MeshStandardMaterial({ color: "#efe9df", roughness: 0.55, emissive: "#3a3550", emissiveIntensity: 0.4 })));
    moon.position.set(-2.8, 1.85, 4.2);
    r3.add(plinth, moon);
    add(r3);

    // room 4 · the keyhole door, warm light behind it
    const r4 = new THREE.Group(); r4.position.z = ROOM_Z[4];
    r4.add(mesh(wallWithHole(keyholePath()), wallMat));
    const behind = mesh(new THREE.PlaneGeometry(9, 8), warmMat, false); behind.position.set(0, 3, -6); r4.add(behind);
    const keyLight = new THREE.PointLight("#ffd29a", 14, 12, 2); keyLight.position.set(0, 2.5, -1.5); r4.add(keyLight);
    add(r4);

    // room 5 · an ensō: one open circle standing in the water
    const r5 = new THREE.Group(); r5.position.z = ROOM_Z[5];
    r5.add(mesh(wallWithHole(archPath(0, 6, 7)), wallMat));
    const enso = mesh(new THREE.TorusGeometry(2.1, 0.16, 24, 120, Math.PI * 1.86), track(new THREE.MeshStandardMaterial({ color: "#2a2b36", roughness: 0.4, metalness: 0.4 })));
    enso.position.set(0, 2.6, 2.5);
    enso.rotation.z = 0.9;
    r5.add(enso);
    add(r5);

    // room 6 · the last arch opens onto a sunrise
    const r6 = new THREE.Group(); r6.position.z = ROOM_Z[6];
    r6.add(mesh(wallWithHole(archPath(0, 5.5, 8)), wallMat));
    const sunDisc = new THREE.Mesh(track(new THREE.CircleGeometry(4, 96)), track(new THREE.MeshBasicMaterial({ color: "#f6dcaa", fog: false })));
    sunDisc.position.set(0, 4.2, -60);
    const halo = new THREE.Sprite(track(new THREE.SpriteMaterial({ map: track(glowTexture("rgba(255,214,160,0.85)")), fog: false, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending })));
    halo.scale.set(20, 20, 1);
    halo.material.opacity = 0.6;
    halo.position.copy(sunDisc.position).add(new THREE.Vector3(0, 0, 0.1));
    r6.add(sunDisc, halo);
    add(r6);

    // butterflies that follow the walk
    const wing = track(wingTexture());
    const wingMat = track(new THREE.MeshStandardMaterial({ map: wing, transparent: true, alphaTest: 0.4, side: THREE.DoubleSide, roughness: 0.7 }));
    const wingGeo = track(new THREE.PlaneGeometry(0.42, 0.42));
    wingGeo.translate(0.21, 0, 0);
    const flies = Array.from({ length: small ? 4 : 7 }, (_, i) => {
      const g = new THREE.Group();
      const right = new THREE.Mesh(wingGeo, wingMat);
      const left = new THREE.Mesh(wingGeo, wingMat);
      left.scale.x = -1;
      right.castShadow = left.castShadow = true;
      g.add(right, left);
      g.scale.setScalar(0.55 + Math.random() * 0.25);
      g.userData = { right, left, seed: i * 1.7 + Math.random(), r: 2 + Math.random() * 3, h: 1.4 + Math.random() * 2.4, speed: 0.18 + Math.random() * 0.18 };
      scene.add(g);
      return g;
    });

    // ---------- layout + scroll ----------
    const resize = () => {
      const w = window.innerWidth, h = window.innerHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.fov = w / h < 0.8 ? 58 : 42;
      camera.updateProjectionMatrix();
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
      for (let i = 0; i < c.length - 1; i++) if (y < c[i + 1]) return i + smooth(0.15, 0.85, (y - c[i]) / (c[i + 1] - c[i]));
      return c.length - 1;
    };
    const lerp3 = (a: number[], b: number[], t: number) => a.map((v, i) => v + (b[i] - v) * t) as [number, number, number];
    const stopAt = (p: number) => {
      const i = Math.min(STOPS.length - 2, Math.floor(p));
      const t = p - i;
      return { pos: lerp3(STOPS[i].pos, STOPS[i + 1].pos, t), look: lerp3(STOPS[i].look, STOPS[i + 1].look, t) };
    };

    const mouse = new THREE.Vector2();
    const onMove = (e: PointerEvent) => { if (e.pointerType === "mouse") mouse.set((e.clientX / window.innerWidth) * 2 - 1, (e.clientY / window.innerHeight) * 2 - 1); };
    window.addEventListener("pointermove", onMove, { passive: true });

    let p = progress(), raf = 0, time = 0, recollect = 0, breath = 0;
    const camPos = new THREE.Vector3(...stopAt(p).pos);
    const camLook = new THREE.Vector3(...stopAt(p).look);
    const sway = new THREE.Vector2();
    const clock = new THREE.Clock();

    const frame = () => {
      const dt = Math.min(clock.getDelta(), 0.05);
      time += dt * (reduce ? 0.2 : 1);
      if ((recollect += dt) > 2) { recollect = 0; collect(); }

      p += (progress() - p) * (reduce ? 1 : Math.min(1, dt * 2.4));
      const s = stopAt(Math.min(p, STOPS.length - 1 - 1e-4));
      sway.lerp(mouse, 0.04);
      camPos.set(s.pos[0] + sway.x * 0.35, s.pos[1] - sway.y * 0.15 + (reduce ? 0 : Math.sin(time * 0.4) * 0.04), s.pos[2]);
      camLook.set(...s.look);
      camera.position.copy(camPos);
      camera.lookAt(camLook);

      // the sun follows the walk so shadows stay crisp in every room
      sun.position.set(camPos.x - 10, 14, camPos.z + 4);
      sun.target.position.set(camPos.x, 0, camPos.z - 8);

      // breathing: the light opens on the in-breath and the haze thins
      const now = performance.now();
      const ambient = reduce ? 0 : 0.5 - 0.5 * Math.cos((now / 10000) * Math.PI * 2);
      const guided = breathBus.start !== null ? guidedBreath(now - breathBus.start).value : null;
      breath += ((guided ?? ambient * 0.5) - breath) * Math.min(1, dt * 5);
      renderer.toneMappingExposure = 0.88 + breath * 0.1;
      fog.density = 0.036 - breath * 0.008;

      // the warm glow behind the keyhole sits on the walking path: hide it once the camera reaches it
      behind.visible = camPos.z > ROOM_Z[4] - 5.5;

      key.rotation.y = time * 0.5;
      key.position.y = 2.9 + Math.sin(time * 0.9) * 0.05;
      moon.position.y = 1.85 + Math.sin(time * 0.6) * 0.04;

      for (const f of flies) {
        const u = f.userData;
        const a = time * u.speed + u.seed;
        f.position.set(camPos.x + Math.sin(a) * u.r, u.h + Math.sin(a * 1.7) * 0.4, camPos.z - 8 - Math.cos(a * 0.8) * 3);
        f.rotation.y = -a + Math.PI / 2;
        const flap = reduce ? 0.6 : Math.sin(time * 9 + u.seed * 3) * 0.9;
        u.right.rotation.y = -0.2 - flap * 0.6;
        u.left.rotation.y = 0.2 + flap * 0.6;
        f.rotation.x = -0.9;
      }

      renderer.render(scene, camera);
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      floor.dispose(); glass.dispose();
      disposables.forEach((d) => d.dispose());
      scene.environment?.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="fixed inset-0 z-0 w-full h-full pointer-events-none" />;
};

export default PsycheScene;
