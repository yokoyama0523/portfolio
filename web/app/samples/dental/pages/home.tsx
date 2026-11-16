import { sampleMeta } from "~/samples/shared/meta";
import { Footer } from "../components/Footer";
import { Access } from "../components/home/Access";
import { Cta } from "../components/home/Cta";
import { Doctor } from "../components/home/Doctor";
import { Features } from "../components/home/Features";
import { First } from "../components/home/First";
import { Header } from "../components/home/Header";
import { Hero } from "../components/home/Hero";
import { Hours } from "../components/home/Hours";
import { Menu } from "../components/home/Menu";
import { News } from "../components/home/News";
import { Room } from "../components/home/Room";
import { MobileBar } from "../components/MobileBar";
import { home } from "../content/home";
import "../styles/home.css";

export const meta = () => sampleMeta("dental", home.meta);

export default function DentalHome() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <News />
        <Features />
        <Hours />
        <Menu />
        <First />
        <Doctor />
        <Room />
        <Access />
        <Cta />
      </main>
      <Footer variant="home" />
      <MobileBar onHome />
    </>
  );
}
