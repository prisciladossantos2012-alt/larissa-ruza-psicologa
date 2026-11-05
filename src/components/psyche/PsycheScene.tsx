import { useEffect, useRef } from "react";
import * as THREE from "three";
import { Reflector } from "three/examples/jsm/objects/Reflector.js";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { breathBus, guidedBreath } from "@/components/mind/breath";

/**
 * "Tarde em Sevilha": a sunlit Andalusian building the visitor walks through while scrolling.
 * Each [data-room="n"] section moves the camera to room n:
 * 0 the key in the niche · 1 the moon gate and the wooden chair · 2 the stairs and the arcade
 * 3 the mirror · 4 the keyhole door · 5 the embroidered heart · 6 the golden sun.
 * The whole frame is redrawn as stippling (ink dots on cream paper), like the engraved moth
 * in her posts: light and shadow become dot density, and only terracotta and mustard
 * survive as coloured dots.
 * Decorative only: aria-hidden, pointer-events none, never touches forms.
 */

const HAZE = new THREE.Color("#e4d3c0");
const CREAM = new THREE.Color("#e3d3bb");
const TERRACOTTA = new THREE.Color("#c24e30");
const OCHRE = new THREE.Color("#e9a23b");
const MIDNIGHT = new THREE.Color("#1f2340");
const GOLD = new THREE.Color("#f6d9a8");

const ROOM_Z = [-6, -22, -38, -54, -70, -86, -102];
type Stop = { pos: [number, number, number]; look: [number, number, number] };
// the walk curves left and right so columns and arches slide past each other in depth
const STOPS: Stop[] = [
  { pos: [-0.8, 1.7, 5.5], look: [1.0, 2.7, -6] },
  { pos: [0.9, 1.6, -13], look: [-0.3, 2.4, -26] },
  { pos: [-0.9, 1.9, -29.5], look: [-2.2, 2.8, -44] },
  { pos: [0.8, 1.6, -46], look: [1.6, 2.2, -57] },
  { pos: [-0.5, 1.6, -61.5], look: [0, 2.5, -74] },
  { pos: [0.7, 1.8, -78], look: [-1.5, 2.6, -88] },
  { pos: [0, 1.6, -93], look: [0, 3.4, -118] },
];

// ---------- procedural textures ----------
function canvasTex(w: number, h: number, draw: (g: CanvasRenderingContext2D) => void, srgb = true) {
  const c = document.createElement("canvas");
  c.width = w; c.height = h;
  draw(c.getContext("2d")!);
  const t = new THREE.CanvasTexture(c);
  if (srgb) t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

const plasterTexture = () => {
  const t = canvasTex(256, 256, (g) => {
    const img = g.createImageData(256, 256);
    for (let i = 0; i < img.data.length; i += 4) {
      const v = 118 + Math.random() * 20;
      img.data[i] = img.data[i + 1] = img.data[i + 2] = v; img.data[i + 3] = 255;
    }
    g.putImageData(img, 0, 0);
  }, false);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(6, 6);
  return t;
};

// Sevillian azulejo band in her colours: midnight, ochre, terracotta on cream
const azulejoTexture = () => {
  const t = canvasTex(256, 64, (g) => {
    for (let k = 0; k < 4; k++) {
      const x = k * 64;
      g.fillStyle = "#f3ead8"; g.fillRect(x, 0, 64, 64);
      g.strokeStyle = "#d9cdb6"; g.lineWidth = 2; g.strokeRect(x + 1, 1, 62, 62);
      g.fillStyle = "#2b3a7a";
      g.beginPath(); g.moveTo(x + 32, 6); g.lineTo(x + 58, 32); g.lineTo(x + 32, 58); g.lineTo(x + 6, 32); g.closePath(); g.fill();
      g.fillStyle = "#f3ead8";
      g.beginPath(); g.moveTo(x + 32, 16); g.lineTo(x + 48, 32); g.lineTo(x + 32, 48); g.lineTo(x + 16, 32); g.closePath(); g.fill();
      g.fillStyle = "#e9a23b"; g.beginPath(); g.arc(x + 32, 32, 7, 0, Math.PI * 2); g.fill();
      g.fillStyle = "#c24e30";
      for (const [cx, cy] of [[0, 0], [64, 0], [0, 64], [64, 64]]) { g.beginPath(); g.arc(x + cx, cy, 9, 0, Math.PI * 2); g.fill(); }
    }
  });
  t.wrapS = THREE.RepeatWrapping;
  return t;
};

const stripeTexture = () => {
  const t = canvasTex(128, 16, (g) => {
    for (let k = 0; k < 8; k++) { g.fillStyle = k % 2 ? "#f6ead2" : "#e9a23b"; g.fillRect(k * 16, 0, 16, 16); }
  });
  t.wrapS = THREE.RepeatWrapping;
  return t;
};

// the engraved moth from her posts
const wingTexture = () => canvasTex(256, 256, (g) => {
  g.beginPath();
  g.moveTo(4, 128);
  g.bezierCurveTo(60, 10, 230, -10, 240, 70);
  g.bezierCurveTo(250, 120, 170, 130, 130, 132);
  g.bezierCurveTo(200, 150, 220, 230, 150, 246);
  g.bezierCurveTo(90, 256, 40, 190, 4, 128);
  g.closePath();
  const grad = g.createLinearGradient(0, 0, 256, 256);
  grad.addColorStop(0, "#e2dccd"); grad.addColorStop(1, "#a59d8c");
  g.fillStyle = grad; g.fill();
  g.save(); g.clip();
  g.strokeStyle = "rgba(40,36,30,.42)"; g.lineWidth = 1.2;
  for (let k = 0; k < 14; k++) { const a = -1.2 + k * 0.18; g.beginPath(); g.moveTo(4, 128); g.quadraticCurveTo(90, 128 + Math.sin(a) * 60, 4 + Math.cos(a) * 250, 128 + Math.sin(a) * 140); g.stroke(); }
  for (let k = 0; k < 900; k++) { g.fillStyle = `rgba(30,28,24,${Math.random() * 0.3})`; g.fillRect(Math.random() * 256, Math.random() * 256, 1.4, 1.4); }
  g.restore();
  g.lineWidth = 3; g.strokeStyle = "rgba(30,28,24,.65)"; g.stroke();
  const spot = (x: number, y: number, r: number) => {
    g.beginPath(); g.arc(x, y, r, 0, Math.PI * 2); g.fillStyle = "#2c2a26"; g.fill();
    g.beginPath(); g.arc(x, y, r * 0.62, 0, Math.PI * 2); g.fillStyle = "#e2dccd"; g.fill();
    g.beginPath(); g.arc(x, y, r * 0.3, 0, Math.PI * 2); g.fillStyle = "#2c2a26"; g.fill();
  };
  spot(150, 70, 17); spot(150, 196, 13);
});

const glowTexture = (inner: string) => canvasTex(256, 256, (g) => {
  const r = g.createRadialGradient(128, 128, 0, 128, 128, 128);
  r.addColorStop(0, inner); r.addColorStop(1, "rgba(0,0,0,0)");
  g.fillStyle = r; g.fillRect(0, 0, 256, 256);
});

// a soft vertical beam for light shafts
const beamTexture = () => canvasTex(64, 256, (g) => {
  const v = g.createLinearGradient(0, 0, 0, 256);
  v.addColorStop(0, "rgba(255,236,200,0)"); v.addColorStop(0.35, "rgba(255,236,200,0.9)"); v.addColorStop(1, "rgba(255,236,200,0)");
  g.fillStyle = v; g.fillRect(0, 0, 64, 256);
  const h = g.createLinearGradient(0, 0, 64, 0);
  h.addColorStop(0, "rgba(0,0,0,1)"); h.addColorStop(0.5, "rgba(0,0,0,0)"); h.addColorStop(1, "rgba(0,0,0,1)");
  g.globalCompositeOperation = "destination-out"; g.fillStyle = h; g.fillRect(0, 0, 64, 256);
});

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
function archShape(cx: number, w: number, h: number) {
  const s = new THREE.Shape();
  s.moveTo(cx - w / 2, 0); s.lineTo(cx - w / 2, h);
  s.absarc(cx, h, w / 2, Math.PI, 0, true);
  s.lineTo(cx + w / 2, 0); s.lineTo(cx - w / 2, 0);
  return s;
}
// a terracotta frieze that frames an arch
function archFrame(cx: number, w: number, h: number, band = 0.32) {
  const s = archShape(cx, w + band * 2, h);
  s.holes.push(archPath(cx, w, h));
  return new THREE.ExtrudeGeometry(s, { depth: 0.14, bevelEnabled: false, curveSegments: 48 });
}
function circlePath(cx: number, cy: number, r: number) {
  const p = new THREE.Path(); p.absarc(cx, cy, r, 0, Math.PI * 2, false); return p;
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
    renderer.toneMappingExposure = 1.0;
    renderer.shadowMap.enabled = !small;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // ---------- stippling pass: the 3D frame is redrawn as ink dots on paper ----------
    const rt = new THREE.WebGLRenderTarget(1, 1, { samples: small ? 0 : 4 });
    const post = new THREE.ShaderMaterial({
      depthTest: false, depthWrite: false,
      uniforms: {
        tScene: { value: rt.texture },
        uRes: { value: new THREE.Vector2(1, 1) },
        uCell: { value: 5 },
        uExposure: { value: 1 },
        uPaper: { value: new THREE.Color("#f6efe3") },
        uInk: { value: new THREE.Color("#1f2340") },
      },
      vertexShader: "varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }",
      fragmentShader: `
        uniform sampler2D tScene; uniform vec2 uRes; uniform float uCell, uExposure; uniform vec3 uPaper, uInk;
        varying vec2 vUv;
        float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
        vec3 aces(vec3 x){ return clamp((x * (2.51 * x + 0.03)) / (x * (2.43 * x + 0.59) + 0.14), 0.0, 1.0); }
        vec3 sceneAt(vec2 uv){ return pow(aces(texture2D(tScene, uv).rgb * uExposure), vec3(1.0 / 2.2)); }
        // ink by default; saturated areas (terracotta, mustard, the heart) keep their colour
        vec3 inkify(vec3 c){
          float sat = max(c.r, max(c.g, c.b)) - min(c.r, min(c.g, c.b));
          return mix(uInk, c * 0.78, smoothstep(0.12, 0.3, sat));
        }
        float lumAt(vec2 uv){ return dot(sceneAt(uv), vec3(0.299, 0.587, 0.114)); }
        // one jittered dot per cell; its size follows the tone of the scene under it.
        // highlights stay clean paper, shadows fill in, and outlines get a line of dots, like an engraving
        float layer(vec2 px, float cell, float rot, float minDark, out vec3 dotCol){
          float cs = cos(rot), sn = sin(rot);
          vec2 q = vec2(cs * px.x - sn * px.y, sn * px.x + cs * px.y) / cell;
          vec2 id = floor(q);
          vec2 center = id + 0.5 + 0.3 * (vec2(hash(id), hash(id + 19.19)) - 0.5);
          vec2 c = center * cell;
          vec2 uv = vec2(cs * c.x + sn * c.y, -sn * c.x + cs * c.y) / uRes;
          vec3 sc = sceneAt(uv);
          float l = dot(sc, vec3(0.299, 0.587, 0.114));
          vec2 o = vec2(2.5) / uRes;
          float edge = abs(l - lumAt(uv + vec2(o.x, 0.0))) + abs(l - lumAt(uv - vec2(o.x, 0.0)))
                     + abs(l - lumAt(uv + vec2(0.0, o.y))) + abs(l - lumAt(uv - vec2(0.0, o.y)));
          float dark = smoothstep(0.14, 0.8, 1.0 - l);
          dark = max(dark, clamp(edge * 3.5, 0.0, 1.0) * 0.8);
          dark *= smoothstep(minDark, minDark + 0.15, dark);
          float r = sqrt(dark) * 0.56 * (0.8 + 0.4 * hash(id + 3.1));
          dotCol = inkify(sc);
          return 1.0 - smoothstep(r - 0.1, r + 0.1, length(q - center));
        }
        void main(){
          vec2 px = vUv * uRes;
          vec3 c1; float a1 = layer(px, uCell, 0.0, 0.0, c1);
          vec3 c2; float a2 = layer(px + 7.3, uCell * 1.3, 0.6, 0.45, c2);
          vec3 col = uPaper * (0.988 + 0.024 * hash(floor(px)));
          col = mix(col, c2, a2 * 0.6);
          col = mix(col, c1, a1);
          gl_FragColor = vec4(col, 1.0);
        }`,
    });
    const postScene = new THREE.Scene();
    const postCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), post);
    quad.frustumCulled = false;
    postScene.add(quad);

    const scene = new THREE.Scene();
    const fog = new THREE.FogExp2(HAZE, 0.013);
    scene.fog = fog;
    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    pmrem.dispose();

    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 400);

    const disposables: { dispose: () => void }[] = [];
    const track = <T extends { dispose: () => void }>(x: T) => { disposables.push(x); return x; };

    // sky: lilac overhead, golden at the horizon
    const sky = new THREE.Mesh(
      track(new THREE.SphereGeometry(300, 32, 16)),
      track(new THREE.ShaderMaterial({
        side: THREE.BackSide, depthWrite: false, fog: false,
        uniforms: { top: { value: new THREE.Color("#c9cfe6") }, mid: { value: new THREE.Color("#ead9d2") }, horizon: { value: new THREE.Color("#f3d3a4") } },
        vertexShader: "varying vec3 vP; void main(){ vP = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",
        fragmentShader: "uniform vec3 top, mid, horizon; varying vec3 vP; void main(){ float h = clamp(vP.y, -0.2, 1.0); vec3 c = mix(horizon, mid, smoothstep(0.0, 0.18, h)); c = mix(c, top, smoothstep(0.18, 0.7, h)); gl_FragColor = vec4(c, 1.0); }",
      })),
    );
    scene.add(sky);

    // light: soft sky + a low golden sun from the side, for long column shadows
    scene.add(new THREE.HemisphereLight("#d9def2", "#c9b090", 0.95));
    const sun = new THREE.DirectionalLight("#ffd9a3", 3.4);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    sun.shadow.bias = -0.0004;
    sun.shadow.normalBias = 0.03;
    const sc = sun.shadow.camera as THREE.OrthographicCamera;
    sc.left = -20; sc.right = 20; sc.top = 20; sc.bottom = -20; sc.near = 1; sc.far = 70;
    scene.add(sun, sun.target);

    const plaster = track(plasterTexture());
    const wallMat = track(new THREE.MeshStandardMaterial({ color: CREAM, roughness: 0.95, bumpMap: plaster, bumpScale: 0.5 }));
    const terraMat = track(new THREE.MeshStandardMaterial({ color: "#c27a5d", roughness: 0.85, bumpMap: plaster, bumpScale: 0.8 }));
    const ochreMat = track(new THREE.MeshStandardMaterial({ color: OCHRE, roughness: 0.8 }));
    const inkMat = track(new THREE.MeshStandardMaterial({ color: MIDNIGHT, roughness: 0.35, metalness: 0.7 }));
    const goldMat = track(new THREE.MeshBasicMaterial({ color: GOLD, fog: false }));
    const azulejo = track(azulejoTexture());
    const beamTex = track(beamTexture());
    const beamMat = track(new THREE.MeshBasicMaterial({ map: beamTex, transparent: true, opacity: 0.22, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide, fog: false }));

    const add = (m: THREE.Object3D) => { scene.add(m); return m; };
    const mesh = (g: THREE.BufferGeometry, m: THREE.Material, shadow = true) => {
      track(g);
      const x = new THREE.Mesh(g, m);
      x.castShadow = shadow; x.receiveShadow = true;
      return x;
    };

    // reusable pieces ---------------------------------------------------
    const azulejoBand = (width: number, x: number, z: number) => {
      const tex = azulejo.clone(); track(tex);
      tex.repeat.set(width / 2.4, 1); tex.needsUpdate = true;
      const band = mesh(new THREE.PlaneGeometry(width, 0.6), track(new THREE.MeshStandardMaterial({ map: tex, roughness: 0.3, metalness: 0.05 })), false);
      band.position.set(x, 0.35, z);
      return band;
    };
    const column = () => {
      const c = new THREE.Group();
      const base = mesh(new THREE.BoxGeometry(0.72, 0.28, 0.72), wallMat); base.position.y = 0.14;
      const shaft = mesh(new THREE.CylinderGeometry(0.2, 0.24, 3.7, 20), wallMat); shaft.position.y = 2.13;
      const cap = mesh(new THREE.BoxGeometry(0.72, 0.26, 0.72), terraMat); cap.position.y = 4.11;
      c.add(base, shaft, cap);
      return c;
    };
    const colonnade = (zFrom: number, zTo: number, x: number) => {
      const g = new THREE.Group();
      const n = Math.max(2, Math.round(Math.abs(zTo - zFrom) / 2.6) + 1);
      for (let i = 0; i < n; i++) { const c = column(); c.position.set(x, 0, zFrom + ((zTo - zFrom) * i) / (n - 1)); g.add(c); }
      const beam = mesh(new THREE.BoxGeometry(0.6, 0.45, Math.abs(zTo - zFrom) + 0.8), wallMat);
      beam.position.set(x, 4.46, (zFrom + zTo) / 2);
      const trim = mesh(new THREE.BoxGeometry(0.64, 0.1, Math.abs(zTo - zFrom) + 0.84), terraMat);
      trim.position.set(x, 4.72, (zFrom + zTo) / 2);
      g.add(beam, trim);
      return g;
    };
    const beam = (x: number, z: number, h = 9, w = 1.6) => {
      const b = new THREE.Mesh(track(new THREE.PlaneGeometry(w, h)), beamMat);
      b.position.set(x, h / 2 - 0.4, z); b.rotation.set(0, 0.5, -0.55);
      return b;
    };

    // water floor: a mirror with an aqua film that also catches the shadows
    const mirrorRes = small ? 0.35 : 0.5;
    const floor = new Reflector(track(new THREE.PlaneGeometry(500, 500)), {
      textureWidth: Math.round(window.innerWidth * DPR * mirrorRes),
      textureHeight: Math.round(window.innerHeight * DPR * mirrorRes),
      color: 0xd6e8e3,
    });
    floor.rotation.x = -Math.PI / 2; floor.position.y = -0.001;
    add(floor);
    const film = mesh(new THREE.PlaneGeometry(500, 500), track(new THREE.MeshStandardMaterial({ color: "#8db9b3", transparent: true, opacity: 0.55, roughness: 0.15 })), false);
    film.rotation.x = -Math.PI / 2; film.position.y = 0.002;
    add(film);

    // room 0 · the great arch and the key in its niche ---------------------
    const r0 = new THREE.Group(); r0.position.z = ROOM_Z[0];
    r0.add(mesh(wallWithHole(archPath(1.2, 4.2, 5.2)), wallMat));
    const f0 = mesh(archFrame(1.2, 4.2, 5.2), terraMat); f0.position.z = 0.4; r0.add(f0);
    // the niche glows warm and catches the key's shadow, like the reference
    const nicheMat = track(new THREE.MeshStandardMaterial({ color: "#f5deb6", emissive: "#e9c48a", emissiveIntensity: 0.45, roughness: 0.9 }));
    const nicheBack = mesh(new THREE.PlaneGeometry(1.2, 2.6), nicheMat, false); nicheBack.position.set(-3.4, 2.6, 0.42); r0.add(nicheBack);
    const nicheWall = mesh(wallWithHole(archPath(0, 1.1, 1.5, 1.6), 2.2, 4.4, 0.6), wallMat); nicheWall.position.set(-3.4, 0, 0.75); r0.add(nicheWall);
    const nicheFrame = mesh(archFrame(0, 1.1, 1.5, 0.12), terraMat); nicheFrame.position.set(-3.4, 1.6, 1.05); r0.add(nicheFrame);
    // an old bronze key: ornate bow, collared shaft, stepped bit
    const bronze = track(new THREE.MeshStandardMaterial({ color: "#5a3d26", roughness: 0.42, metalness: 0.85 }));
    const key = new THREE.Group();
    key.add(mesh(new THREE.TorusGeometry(0.17, 0.032, 16, 48), bronze));
    for (let k = 0; k < 3; k++) {
      const lobe = mesh(new THREE.TorusGeometry(0.055, 0.016, 12, 32), bronze);
      const a = k * ((Math.PI * 2) / 3) + Math.PI / 2;
      lobe.position.set(Math.cos(a) * 0.075, Math.sin(a) * 0.075, 0);
      key.add(lobe);
    }
    for (const y of [-0.21, -0.25]) { const collar = mesh(new THREE.TorusGeometry(0.036, 0.012, 10, 24), bronze); collar.rotation.x = Math.PI / 2; collar.position.y = y; key.add(collar); }
    const shaft = mesh(new THREE.CylinderGeometry(0.026, 0.03, 0.82, 16), bronze); shaft.position.y = -0.62; key.add(shaft);
    for (const [w, h, y] of [[0.17, 0.05, -0.98], [0.12, 0.045, -0.91], [0.15, 0.04, -0.85]]) {
      const bit = mesh(new THREE.BoxGeometry(w, h, 0.03), bronze); bit.position.set(w / 2 + 0.01, y, 0); key.add(bit);
    }
    key.position.set(-3.4, 2.9, 0.8); key.rotation.z = -0.35;
    r0.add(key);
    const nicheLight = new THREE.SpotLight("#ffd9a6", 28, 6, 0.55, 0.8, 2);
    nicheLight.position.set(-3.1, 3.9, 2.2);
    nicheLight.target.position.set(-3.4, 2.6, 0.4);
    nicheLight.castShadow = !small;
    nicheLight.shadow.mapSize.set(1024, 1024);
    nicheLight.shadow.bias = -0.0005;
    r0.add(nicheLight, nicheLight.target);
    r0.add(beam(1.4, -2.5), beam(2.6, -3.5, 10, 1.1));
    add(r0);

    // colonnades that line the walk between rooms ------------------------
    for (const [a, b] of [[ROOM_Z[0] - 3, ROOM_Z[1] + 3], [ROOM_Z[2] - 12, ROOM_Z[3] + 3], [ROOM_Z[4] - 3, ROOM_Z[5] + 3]]) {
      add(colonnade(a, b, -4.4));
      add(colonnade(a, b, 4.4));
    }

    // room 1 · the moon gate and the wooden chair ------------------------
    const r1 = new THREE.Group(); r1.position.z = ROOM_Z[1];
    r1.add(mesh(wallWithHole(circlePath(0, 3.2, 3.0)), wallMat));
    const ring = mesh(new THREE.TorusGeometry(3.15, 0.16, 16, 96), terraMat); ring.position.set(0, 3.2, 0.42); r1.add(ring);
    const chair = new THREE.Group();
    const wood = track(new THREE.MeshStandardMaterial({ color: "#7a4a2a", roughness: 0.6 }));
    const seat = mesh(new RoundedBoxGeometry(0.9, 0.07, 0.8, 3, 0.03), wood); seat.position.y = 0.9; chair.add(seat);
    for (const [x, z] of [[-0.4, 0.35], [0.4, 0.35]]) { const leg = mesh(new THREE.CylinderGeometry(0.03, 0.025, 0.9, 10), wood); leg.position.set(x, 0.45, z); chair.add(leg); }
    for (const x of [-0.4, 0.4]) { const post = mesh(new THREE.CylinderGeometry(0.032, 0.025, 1.9, 10), wood); post.position.set(x, 0.95, -0.36); chair.add(post); }
    const rail = mesh(new RoundedBoxGeometry(0.92, 0.14, 0.05, 3, 0.02), wood); rail.position.set(0, 1.82, -0.36); chair.add(rail);
    for (const y of [1.25, 1.5]) { const bar = mesh(new THREE.CylinderGeometry(0.016, 0.016, 0.8, 8), wood); bar.rotation.z = Math.PI / 2; bar.position.set(0, y, -0.36); chair.add(bar); }
    chair.position.set(1.4, 0, -3.2); chair.rotation.y = -0.55;
    r1.add(chair);
    r1.add(beam(-0.6, -2.5, 9, 1.4));
    add(r1);

    // room 2 · a grand stair with a balustrade, and an arcade ahead ------
    const r2 = new THREE.Group(); r2.position.z = ROOM_Z[2];
    for (let k = 0; k < 4; k++) {
      const w = mesh(wallWithHole(archPath(0, 3.2, 3.8)), wallMat); w.position.z = -k * 3.2; r2.add(w);
      const fr = mesh(archFrame(0, 3.2, 3.8, 0.22), terraMat); fr.position.z = -k * 3.2 + 0.4; r2.add(fr);
    }
    const steps = 14;
    for (let s = 0; s < steps; s++) {
      const h = 0.18 + s * 0.26;
      const step = mesh(new THREE.BoxGeometry(2.6, h, 0.55), wallMat);
      step.position.set(-5.2, h / 2, 6 - s * 0.55);
      r2.add(step);
      const riser = mesh(new THREE.PlaneGeometry(2.6, 0.24), track(new THREE.MeshStandardMaterial({ map: azulejo, roughness: 0.3 })), false);
      riser.position.set(-5.2, h - 0.12, 6 - s * 0.55 + 0.276);
      r2.add(riser);
    }
    // balustrade along the stair, like the bridges of the Plaza de España
    const balMat = wallMat;
    for (let s = 0; s < steps; s += 1) {
      const h = 0.18 + s * 0.26;
      const b = mesh(new THREE.CylinderGeometry(0.05, 0.08, 0.7, 10), balMat); b.position.set(-3.95, h + 0.35, 6 - s * 0.55); r2.add(b);
    }
    const handrail = mesh(new THREE.BoxGeometry(0.16, 0.12, steps * 0.55 * 1.2), terraMat);
    handrail.position.set(-3.95, 0.18 + (steps * 0.26) / 2 + 0.72, 6 - (steps * 0.55) / 2);
    handrail.rotation.x = Math.atan2(0.26, 0.55);
    r2.add(handrail);
    add(r2);

    // room 3 · the mirror (self-reflection) and a moon on a plinth -------
    const r3 = new THREE.Group(); r3.position.z = ROOM_Z[3];
    r3.add(mesh(wallWithHole(archPath(0, 5, 6)), wallMat));
    const f3 = mesh(archFrame(0, 5, 6), terraMat); f3.position.z = 0.4; r3.add(f3);
    const mirrorFrame = mesh(new THREE.BoxGeometry(2.5, 4.3, 0.12), track(new THREE.MeshStandardMaterial({ color: "#8a5a36", roughness: 0.6 })));
    const glass = new Reflector(track(new THREE.PlaneGeometry(2.2, 4.0)), {
      textureWidth: Math.round(512 * (small ? 0.6 : 1)), textureHeight: Math.round(930 * (small ? 0.6 : 1)), color: 0xe9e4da,
    });
    glass.position.z = 0.07;
    const mirror = new THREE.Group(); mirror.add(mirrorFrame, glass);
    mirror.position.set(2.8, 2.25, 5.0); mirror.rotation.y = -0.55;
    r3.add(mirror);
    const plinth = mesh(new THREE.BoxGeometry(1.1, 1.3, 1.1), terraMat); plinth.position.set(-2.8, 0.65, 4.2);
    const moon = mesh(new THREE.SphereGeometry(0.55, 48, 32), track(new THREE.MeshStandardMaterial({ color: "#fbf4e6", roughness: 0.5 })));
    moon.position.set(-2.8, 1.85, 4.2);
    r3.add(plinth, moon);
    r3.add(beam(-1.5, 2.5, 9, 1.2));
    add(r3);

    // room 4 · the keyhole door, golden light behind it -----------------
    const r4 = new THREE.Group(); r4.position.z = ROOM_Z[4];
    r4.add(mesh(wallWithHole(keyholePath()), wallMat));
    const behind = mesh(new THREE.PlaneGeometry(9, 8), goldMat, false); behind.position.set(0, 3, -6); r4.add(behind);
    const keyLight = new THREE.PointLight("#ffd29a", 10, 12, 2); keyLight.position.set(0, 2.5, -1.5); r4.add(keyLight);
    add(r4);

    // room 5 · the embroidered heart ("sou capaz de fazer coisas difíceis")
    const r5 = new THREE.Group(); r5.position.z = ROOM_Z[5];
    r5.add(mesh(wallWithHole(archPath(0, 6, 7)), wallMat));
    const f5 = mesh(archFrame(0, 6, 7), terraMat); f5.position.z = 0.4; r5.add(f5);
    const heartShape = (k: number) => {
      const h = new THREE.Shape();
      h.moveTo(0, -1.6 * k);
      h.bezierCurveTo(-0.4 * k, -1.1 * k, -2.0 * k, -0.4 * k, -1.9 * k, 0.6 * k);
      h.bezierCurveTo(-1.8 * k, 1.5 * k, -0.6 * k, 1.8 * k, 0, 0.9 * k);
      h.bezierCurveTo(0.6 * k, 1.8 * k, 1.8 * k, 1.5 * k, 1.9 * k, 0.6 * k);
      h.bezierCurveTo(2.0 * k, -0.4 * k, 0.4 * k, -1.1 * k, 0, -1.6 * k);
      return h;
    };
    const heart = new THREE.Group();
    const rim = mesh(new THREE.ExtrudeGeometry(heartShape(1), { depth: 0.28, bevelEnabled: true, bevelSize: 0.08, bevelThickness: 0.08, bevelSegments: 4, curveSegments: 48 }), track(new THREE.MeshStandardMaterial({ color: "#a3283a", roughness: 0.85, bumpMap: plaster, bumpScale: 2 })));
    const inner = mesh(new THREE.ExtrudeGeometry(heartShape(0.78), { depth: 0.1, bevelEnabled: false, curveSegments: 48 }), track(new THREE.MeshStandardMaterial({ color: "#f6ecd6", roughness: 0.9, bumpMap: plaster, bumpScale: 1.5 })));
    inner.position.z = 0.3;
    heart.add(rim, inner);
    heart.scale.setScalar(0.6);
    heart.position.set(-4.8, 2.5, 2.4);
    heart.rotation.y = 0.45;
    r5.add(heart);
    add(r5);

    // room 6 · the last arch opens onto a golden sun ---------------------
    const r6 = new THREE.Group(); r6.position.z = ROOM_Z[6];
    r6.add(mesh(wallWithHole(archPath(0, 5.5, 8)), wallMat));
    const f6 = mesh(archFrame(0, 5.5, 8), terraMat); f6.position.z = 0.4; r6.add(f6);
    const sunDisc = new THREE.Mesh(track(new THREE.CircleGeometry(4, 96)), track(new THREE.MeshBasicMaterial({ color: "#ffe2a8", fog: false })));
    sunDisc.position.set(0, 4.2, -60);
    const halo = new THREE.Sprite(track(new THREE.SpriteMaterial({ map: track(glowTexture("rgba(255,200,120,0.75)")), fog: false, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending })));
    halo.scale.set(22, 22, 1);
    halo.position.copy(sunDisc.position).add(new THREE.Vector3(0, 0, 0.1));
    r6.add(sunDisc, halo);
    add(r6);

    // moths that follow the walk
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
      rt.setSize(Math.round(w * DPR), Math.round(h * DPR));
      post.uniforms.uRes.value.set(Math.round(w * DPR), Math.round(h * DPR));
      post.uniforms.uCell.value = (small ? 4 : 4.6) * DPR;
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
      sky.position.copy(camPos);

      // a low golden sun from the left keeps long shadows in every room
      sun.position.set(camPos.x - 14, 11, camPos.z + 2);
      sun.target.position.set(camPos.x, 0, camPos.z - 8);

      // the warm glow behind the keyhole sits on the walking path: hide it once the camera reaches it
      behind.visible = camPos.z > ROOM_Z[4] - 5.5;

      // breathing: the light opens on the in-breath and the haze thins
      const now = performance.now();
      const ambient = reduce ? 0 : 0.5 - 0.5 * Math.cos((now / 10000) * Math.PI * 2);
      const guided = breathBus.start !== null ? guidedBreath(now - breathBus.start).value : null;
      breath += ((guided ?? ambient * 0.5) - breath) * Math.min(1, dt * 5);
      post.uniforms.uExposure.value = 0.95 + breath * 0.1;
      fog.density = 0.013 - breath * 0.004;
      beamMat.opacity = 0.18 + breath * 0.12;

      key.rotation.y = time * 0.5;
      key.position.y = 2.9 + Math.sin(time * 0.9) * 0.05;
      moon.position.y = 1.85 + Math.sin(time * 0.6) * 0.04;
      heart.rotation.y = 0.45 + Math.sin(time * 0.35) * 0.12;
      heart.scale.setScalar(0.6 * (1 + breath * 0.05));

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

      renderer.setRenderTarget(rt);
      renderer.render(scene, camera);
      renderer.setRenderTarget(null);
      renderer.render(postScene, postCam);
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
      rt.dispose(); post.dispose(); quad.geometry.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="fixed inset-0 z-0 w-full h-full pointer-events-none" />;
};

export default PsycheScene;
