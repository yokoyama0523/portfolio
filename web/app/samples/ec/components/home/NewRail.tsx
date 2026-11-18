import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import type { Product } from "../../content/catalog";
import { home } from "../../content/home";
import { paths } from "../../content/paths";
import { ProductCard } from "../ProductCard";
import { SectionHead } from "./SectionHead";

const EDGE_PX = 2;

export function NewRail({ products }: { products: Product[] }) {
  const rail = useRef<HTMLDivElement>(null);
  const [view, setView] = useState({ start: true, end: false, size: 1, pos: 0 });

  const measure = useCallback(() => {
    const el = rail.current;
    if (!el) return;
    setView({
      start: el.scrollLeft <= EDGE_PX,
      end: el.scrollLeft + el.clientWidth >= el.scrollWidth - EDGE_PX,
      size: el.clientWidth / el.scrollWidth,
      pos: el.scrollLeft / el.scrollWidth,
    });
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  const go = (dir: 1 | -1) => {
    const el = rail.current;
    const card = el?.firstElementChild;
    if (!el || !card) return;
    const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({
      left: dir * card.getBoundingClientRect().width,
      behavior: smooth ? "smooth" : "auto",
    });
  };

  return (
    <section className="sec nr" id="new" aria-labelledby="new-title">
      <div className="wrap">
        <SectionHead id="new-title" {...home.newTitle}>
          <button
            type="button"
            className="arrow"
            aria-label={home.railPrev}
            disabled={view.start}
            onClick={() => go(-1)}
          >
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="M10 3 5 8l5 5" fill="none" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          </button>
          <button
            type="button"
            className="arrow"
            aria-label={home.railNext}
            disabled={view.end}
            onClick={() => go(1)}
          >
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="m6 3 5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          </button>
          <Link className="more" to={paths.list("new=1")}>
            {home.seeAll}
          </Link>
        </SectionHead>
      </div>
      <div className="rail" ref={rail} onScroll={measure}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="wrap">
        <div className="rail-bar" aria-hidden="true">
          <i style={{ width: `${view.size * 100}%`, left: `${view.pos * 100}%` }} />
        </div>
      </div>
    </section>
  );
}
