import type { Ref } from "react";
import { home } from "../../content/home";

const { brew } = home;

export function Brew({ sectionRef }: { sectionRef: Ref<HTMLElement> }) {
  return (
    <section ref={sectionRef} id={brew.id} className="blk s brew">
      <div>
        <h3 className="t">{brew.title}</h3>
        <div className="jp2">{brew.lead}</div>
        <div className="recipe">
          {brew.recipe.map((item) => (
            <div key={item.label}>
              <b className="value">{item.value}</b>
              {item.label}
            </div>
          ))}
        </div>
        <ol>
          {brew.steps.map((step) => (
            <li key={step.title}>
              <div>
                <b>{step.title}</b>
                {step.text}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
