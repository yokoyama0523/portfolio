import Lenis from "lenis";
import { useCallback, useEffect, useState } from "react";
import { sampleMeta } from "~/samples/shared/meta";
import { gsap, ScrollTrigger, useMediaFlags } from "../animation";
import { Caps } from "../components/Caps";
import { Contact } from "../components/Contact";
import { Cursor } from "../components/Cursor";
import { GlCanvas } from "../components/GlCanvas";
import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { Loader } from "../components/Loader";
import { Manifesto } from "../components/Manifesto";
import { Numbers } from "../components/Numbers";
import { Works } from "../components/Works";
import { studio } from "../content/studio";
import "../styles/home.css";

export const meta = () => sampleMeta("motion", studio.meta);

function useSmoothScroll(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, [enabled]);
}

export default function MotionHome() {
  const flags = useMediaFlags();
  const animate = flags.ready && !flags.reducedMotion;
  const [intro, setIntro] = useState(false);
  const startIntro = useCallback(() => setIntro(true), []);

  useSmoothScroll(animate);
  useEffect(() => {
    if (flags.ready && flags.reducedMotion) setIntro(true);
  }, [flags]);

  return (
    <>
      {!(flags.ready && flags.reducedMotion) && <Loader onIntro={startIntro} />}
      {flags.ready && <GlCanvas reducedMotion={flags.reducedMotion} />}
      {animate && flags.finePointer && <Cursor />}
      <Header />
      <div className="page">
        <Hero start={intro && animate} />
        <Manifesto animate={animate} />
        <Numbers animate={animate} />
        <Works animate={animate} />
        <Caps animate={animate} />
        <Contact magnetic={animate && flags.finePointer} />
        <footer className="ft">
          <span>{studio.footer.copy}</span>
          <span>{studio.footer.stack}</span>
        </footer>
      </div>
    </>
  );
}
