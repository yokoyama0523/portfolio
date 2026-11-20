import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import type { Product } from "../../content/catalog";
import { home } from "../../content/home";
import { paths } from "../../content/paths";
import { ProductCard } from "../ProductCard";

const EDGE_PX = 2;

export function NewRail({ products }: { products: Product[] }) {
  const rail = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  const measure = useCallback(() => {
    const el = rail.current;
    if (!el) return;
    setEdge({
      start: el.scrollLeft <= EDGE_PX,
      end: el.scrollLeft + el.clientWidth >= el.scrollWidth - EDGE_PX,
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
    <section className="sec row" id="new" aria-labelledby="new-title">
      <h2 id="new-title" className="sec-title">
        {home.newTitle}
      </h2>
      <div className="row-wrap">
        <button
          type="button"
          className="arrow prev"
          aria-label={home.railPrev}
          disabled={edge.start}
          onClick={() => go(-1)}
        >
          <svg viewBox="0 0 16 16" aria-hidden="true">
            <path d="M10 3 5 8l5 5" fill="none" stroke="currentColor" strokeWidth="1.2" />
          </svg>
        </button>
        <div className="rail" ref={rail} onScroll={measure}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <button
          type="button"
          className="arrow next"
          aria-label={home.railNext}
          disabled={edge.end}
          onClick={() => go(1)}
        >
          <svg viewBox="0 0 16 16" aria-hidden="true">
            <path d="m6 3 5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.2" />
          </svg>
        </button>
      </div>
      <p className="sec-more">
        <Link className="ul" to={paths.list("new=1")}>
          {home.seeAll}
        </Link>
      </p>
    </section>
  );
}
