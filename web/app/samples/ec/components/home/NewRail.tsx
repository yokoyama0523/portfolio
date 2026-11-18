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
    if (!el) return;
    const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * el.clientWidth, behavior: smooth ? "smooth" : "auto" });
  };

  return (
    <section className="sec wrap" id="new">
      <div className="h">
        <h2>{home.newTitle}</h2>
        <div className="h-tools">
          <button
            type="button"
            className="arrow"
            aria-label={home.railPrev}
            disabled={edge.start}
            onClick={() => go(-1)}
          >
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="M10 3 5 8l5 5" fill="none" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          </button>
          <button
            type="button"
            className="arrow"
            aria-label={home.railNext}
            disabled={edge.end}
            onClick={() => go(1)}
          >
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="m6 3 5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          </button>
          <Link to={paths.list("new=1")}>{home.seeAll}</Link>
        </div>
      </div>
      <div className="rail" ref={rail} onScroll={measure}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
