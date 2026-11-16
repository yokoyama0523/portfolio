import {
  IcosahedronGeometry,
  Mesh,
  PerspectiveCamera,
  Scene,
  ShaderMaterial,
  Vector2,
  WebGLRenderer,
} from "three";
import { fragmentShader, vertexShader } from "./shaders";

const settings = {
  breakpoint: 900,
  maxPixelRatio: 2,
  detail: { desktop: 96, mobile: 48 },
  radius: 1.35,
  fov: 35,
  cameraZ: 6,
  amplitude: 0.28,
  amplitudeSwing: 0.12,
  frequency: 1.4,
  mouseEase: 0.06,
  mixEase: 0.05,
  mixScrollSpan: 3,
  place: {
    desktop: { x: 0.9, y: 0, scale: 1 },
    mobile: { x: 0.15, y: -1.25, scale: 0.62 },
  },
  scroll: { rotateY: 0.9, rotateX: 0.3, sinkY: 0.35, driftX: 0.55, driftMax: 2 },
  spin: { y: 0.12, wobble: 0.2, wobbleAmount: 0.15 },
};

export function createBlob(canvas: HTMLCanvasElement, reducedMotion: boolean) {
  let renderer: WebGLRenderer;
  try {
    renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true });
  } catch {
    canvas.hidden = true;
    return () => undefined;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, settings.maxPixelRatio));
  const scene = new Scene();
  const camera = new PerspectiveCamera(settings.fov, 1, 0.1, 100);
  camera.position.set(0, 0, settings.cameraZ);
  const isMobile = () => window.innerWidth <= settings.breakpoint;
  const geometry = new IcosahedronGeometry(
    settings.radius,
    isMobile() ? settings.detail.mobile : settings.detail.desktop,
  );
  const uniforms = {
    uT: { value: 0 },
    uAmp: { value: settings.amplitude },
    uFreq: { value: settings.frequency },
    uMouse: { value: new Vector2(0, 0) },
    uMix: { value: 0 },
  };
  const material = new ShaderMaterial({ uniforms, vertexShader, fragmentShader });
  const mesh = new Mesh(geometry, material);
  scene.add(mesh);

  const place = () => (isMobile() ? settings.place.mobile : settings.place.desktop);
  const resize = () => {
    const { innerWidth: w, innerHeight: h } = window;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    mesh.position.set(place().x, place().y, 0);
    mesh.scale.setScalar(place().scale);
  };
  resize();

  const target = new Vector2();
  const onPointer = (event: PointerEvent) =>
    target.set(
      (event.clientX / window.innerWidth) * 2 - 1,
      -(event.clientY / window.innerHeight) * 2 + 1,
    );
  let scrolled = 0;
  const onScroll = () => {
    scrolled = window.scrollY / window.innerHeight;
  };
  window.addEventListener("resize", resize);
  window.addEventListener("pointermove", onPointer);
  window.addEventListener("scroll", onScroll, { passive: true });

  const start = performance.now();
  let frame = 0;
  const tick = () => {
    const t = (performance.now() - start) / 1000;
    uniforms.uT.value = reducedMotion ? 0 : t;
    uniforms.uMouse.value.lerp(target, settings.mouseEase);
    mesh.rotation.y = t * settings.spin.y + scrolled * settings.scroll.rotateY;
    mesh.rotation.x =
      Math.sin(t * settings.spin.wobble) * settings.spin.wobbleAmount +
      scrolled * settings.scroll.rotateX;
    const progress = Math.min(scrolled / settings.mixScrollSpan, 1);
    uniforms.uMix.value += (progress - uniforms.uMix.value) * settings.mixEase;
    uniforms.uAmp.value = settings.amplitude + Math.sin(scrolled * 1.5) * settings.amplitudeSwing;
    mesh.position.y = place().y - scrolled * settings.scroll.sinkY;
    mesh.position.x =
      place().x + Math.min(scrolled, settings.scroll.driftMax) * settings.scroll.driftX;
    renderer.render(scene, camera);
    if (!reducedMotion) frame = requestAnimationFrame(tick);
  };
  tick();

  return () => {
    cancelAnimationFrame(frame);
    window.removeEventListener("resize", resize);
    window.removeEventListener("pointermove", onPointer);
    window.removeEventListener("scroll", onScroll);
    geometry.dispose();
    material.dispose();
    renderer.dispose();
  };
}
