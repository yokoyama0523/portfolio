import type { Ref } from "react";
import { home } from "../../content/home";

const { hero } = home;

export function Hero({ sectionRef }: { sectionRef: Ref<HTMLElement> }) {
  return (
    <section ref={sectionRef} className="blk hero">
      <div className="en">{hero.en}</div>
      <h1>
        {hero.title.map((line) => (
          <span key={line} className="l">
            {line}
          </span>
        ))}
      </h1>
      <p className="lead">{hero.lead}</p>
      <div className="facts">
        {hero.facts.map((fact) => (
          <div key={fact.label}>
            <b className="value">{fact.value}</b>
            {fact.label}
          </div>
        ))}
      </div>
      <a className="go" href={`#${home.beansId}`}>
        {hero.more}
      </a>
    </section>
  );
}
