import { sampleMeta } from "~/samples/shared/meta";
import { CartDrawer } from "../components/CartDrawer";
import { Care } from "../components/home/Care";
import { Gift } from "../components/home/Gift";
import { Guide } from "../components/home/Guide";
import { Header } from "../components/home/Header";
import { Hero } from "../components/home/Hero";
import { Makers } from "../components/home/Makers";
import { Pieces } from "../components/home/Pieces";
import { home } from "../content/home";
import { store } from "../content/store";
import "../styles/home.css";

export const meta = () => sampleMeta("ceramic", home.meta);

export default function CeramicHome() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Pieces />
        <Makers />
        <Care />
        <Gift />
        <Guide />
      </main>
      <footer className="ft">
        <div className="logo">{store.name}</div>
        <nav aria-label={home.footer.navLabel}>
          {home.nav.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <div>{home.footer.copy}</div>
      </footer>
      <CartDrawer />
    </>
  );
}
