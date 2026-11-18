import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { Link } from "react-router";
import { sampleMeta } from "~/samples/shared/meta";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { CategoryIndex } from "../components/home/CategoryIndex";
import { Hero } from "../components/home/Hero";
import { Lookbook } from "../components/home/Lookbook";
import { NewRail } from "../components/home/NewRail";
import { Promises } from "../components/home/Promises";
import { SectionHead } from "../components/home/SectionHead";
import { Statement } from "../components/home/Statement";
import { ProductCard } from "../components/ProductCard";
import { news, products } from "../content/catalog";
import { home } from "../content/home";
import { paths } from "../content/paths";
import "../styles/home.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export const meta = () => sampleMeta("ec", home.meta);

const newest = products.filter((product) => product.isNew).slice(0, home.newCount);
const ranking = [...products].sort((a, b) => a.rank - b.rank).slice(0, home.rankingCount);
const SMOOTH = { duration: 1.15 };
const MS = 1000;

function useSmoothScroll() {
  useGSAP(() => {
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const touch = window.matchMedia("(pointer: coarse)").matches;
    if (calm || touch) return;
    const lenis = new Lenis(SMOOTH);
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * MS);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  });
}

export default function EcHome() {
  useSmoothScroll();
  return (
    <>
      <Promises />
      <Header over />
      <main className="home">
        <Hero />
        <Statement />
        <NewRail products={newest} />
        <Lookbook />
        <CategoryIndex />
        <section className="sec rk" aria-labelledby="rank-title">
          <div className="wrap">
            <SectionHead id="rank-title" {...home.rankingTitle}>
              <Link className="more" to={paths.list("sort=rank")}>
                {home.seeAll}
              </Link>
            </SectionHead>
            <div className="rank">
              {ranking.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
        <section className="sec wrap">
          <div className="member">
            <h2>{home.member.title}</h2>
            <p>
              {home.member.before}
              <code>{home.member.code}</code>
              {home.member.after}
            </p>
            <Link className="btn" to={paths.account("register")}>
              {home.member.button}
            </Link>
          </div>
        </section>
        <section className="sec wrap nw" aria-labelledby="news-title">
          <SectionHead id="news-title" {...home.newsTitle} />
          <ul className="news">
            {news.map((item) => (
              <li key={item.iso}>
                <time dateTime={item.iso}>{item.date}</time>
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
