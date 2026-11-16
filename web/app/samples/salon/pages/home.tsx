import { sampleMeta } from "~/samples/shared/meta";
import { Concept } from "../components/home/Concept";
import { Gallery } from "../components/home/Gallery";
import { Header } from "../components/home/Header";
import { Hero } from "../components/home/Hero";
import { Menu } from "../components/home/Menu";
import { Shop } from "../components/home/Shop";
import { Stylists } from "../components/home/Stylists";
import { home } from "../content/home";
import { salon } from "../content/salon";
import "../styles/home.css";

export const meta = () => sampleMeta("salon", home.meta);

export default function SalonHome() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Concept />
        <Menu />
        <Stylists />
        <Gallery />
        <Shop />
      </main>
      <footer className="ft">
        <div className="logo">{salon.name}</div>
        <div>{home.footer}</div>
      </footer>
    </>
  );
}
