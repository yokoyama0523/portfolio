import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";
import { Link } from "react-router";
import { Img } from "~/samples/shared/Img";
import { image } from "../../assets";
import { categories, products } from "../../content/catalog";
import { home } from "../../content/home";
import { paths } from "../../content/paths";
import { SectionHead } from "./SectionHead";

gsap.registerPlugin(useGSAP);

const FOLLOW = { duration: 0.7, ease: "power3" };
const counts = Object.fromEntries(
  categories.map((c) => [c.id, products.filter((p) => p.category === c.id).length]),
);

export function CategoryIndex() {
  const root = useRef<HTMLElement>(null);
  const preview = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<string | null>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add("(hover: hover) and (pointer: fine)", () => {
        const el = preview.current;
        if (!el) return;
        const xTo = gsap.quickTo(el, "x", FOLLOW);
        const yTo = gsap.quickTo(el, "y", FOLLOW);
        const move = (event: PointerEvent) => {
          xTo(event.clientX);
          yTo(event.clientY);
        };
        window.addEventListener("pointermove", move);
        return () => window.removeEventListener("pointermove", move);
      });
    },
    { scope: root },
  );

  return (
    <section className="sec ci" ref={root} aria-labelledby="cats-title">
      <div className="wrap">
        <SectionHead id="cats-title" {...home.categoriesTitle} />
        <ul className="ci-list" onPointerLeave={() => setHover(null)}>
          {categories.map((category) => (
            <li key={category.id}>
              <Link
                to={paths.list(`cat=${category.id}`)}
                className={hover === category.id ? "on" : undefined}
                onPointerEnter={() => setHover(category.id)}
              >
                <span className="ci-en">{home.categoryEn[category.id]}</span>
                <span className="ci-jp">{category.name}</span>
                <span className="ci-n">{home.itemCount(counts[category.id])}</span>
                <span className="ci-thumb">
                  <Img image={image(home.categoryImages[category.id])} />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className={hover ? "ci-preview on" : "ci-preview"} ref={preview} aria-hidden="true">
        <div className="ci-frame">
          {categories.map((category) => (
            <Img
              key={category.id}
              image={image(home.categoryImages[category.id])}
              className={hover === category.id ? "on" : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
