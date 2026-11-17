import { sampleMeta } from "~/samples/shared/meta";
import { Cta } from "../components/Cta";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Access } from "../components/home/Access";
import { Concept } from "../components/home/Concept";
import { Doctor } from "../components/home/Doctor";
import { First } from "../components/home/First";
import { Hero } from "../components/home/Hero";
import { Info } from "../components/home/Info";
import { Menu } from "../components/home/Menu";
import { Room } from "../components/home/Room";
import { MobileBar } from "../components/MobileBar";
import { ReserveTab } from "../components/ReserveTab";
import { home } from "../content/home";
import "../styles/home.css";

export const meta = () => sampleMeta("dental", home.meta);

export default function DentalHome() {
  return (
    <>
      <Header onHome />
      <main>
        <Hero />
        <Info />
        <Concept />
        <Menu />
        <First />
        <Doctor />
        <Room />
        <Access />
        <Cta title={home.cta.title} text={home.cta.text} />
      </main>
      <Footer onHome />
      <ReserveTab />
      <MobileBar onHome />
    </>
  );
}
