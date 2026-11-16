import { sampleMeta } from "~/samples/shared/meta";
import { Cta } from "../components/home/Cta";
import { Flow } from "../components/home/Flow";
import { Footer } from "../components/home/Footer";
import { Header } from "../components/home/Header";
import { Hero } from "../components/home/Hero";
import { OfficeInfo } from "../components/home/OfficeInfo";
import { People } from "../components/home/People";
import { Price } from "../components/home/Price";
import { Services } from "../components/home/Services";
import { Why } from "../components/home/Why";
import { home } from "../content/home";
import "../styles/home.css";

export const meta = () => sampleMeta("tax", home.meta);

export default function TaxHome() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Why />
        <Services />
        <Price />
        <Flow />
        <People />
        <OfficeInfo />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
