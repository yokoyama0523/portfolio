import { sampleMeta } from "~/samples/shared/meta";
import { Company } from "../components/home/Company";
import { Flow } from "../components/home/Flow";
import { Footer } from "../components/home/Footer";
import { Header } from "../components/home/Header";
import { Hero } from "../components/home/Hero";
import { Open } from "../components/home/Open";
import { Perf } from "../components/home/Perf";
import { Think } from "../components/home/Think";
import { Works } from "../components/home/Works";
import { home } from "../content/home";
import "../styles/home.css";

export const meta = () => sampleMeta("house", home.meta);

export default function HouseHome() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Works />
        <Think />
        <Flow />
        <Perf />
        <Open />
        <Company />
      </main>
      <Footer />
    </>
  );
}
