import { useRef } from "react";
import { sampleMeta } from "~/samples/shared/meta";
import { useScrolledPast } from "~/samples/shared/useScrolledPast";
import { About } from "../components/home/About";
import { Biz } from "../components/home/Biz";
import { Contact } from "../components/home/Contact";
import { Equip } from "../components/home/Equip";
import { Footer } from "../components/home/Footer";
import { Header } from "../components/home/Header";
import { Hero } from "../components/home/Hero";
import { Tech } from "../components/home/Tech";
import { Works } from "../components/home/Works";
import { home } from "../content/home";
import "../styles/home.css";

export const meta = () => sampleMeta("corp", home.meta);

const HEADER_HEIGHT = 70;

export default function CorpHome() {
  const hero = useRef<HTMLElement>(null);
  const solid = useScrolledPast(hero, HEADER_HEIGHT);
  return (
    <>
      <Header solid={solid} />
      <main>
        <Hero ref={hero} />
        <Biz />
        <Tech />
        <Equip />
        <Works />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
