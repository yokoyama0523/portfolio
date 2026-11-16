import { home } from "../../content/home";

const { hero, sheet } = home;

export function Hero() {
  return (
    <section className="hero" aria-label={hero.label}>
      <div>
        <h1>
          {hero.title.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </h1>
        <div className="lead">
          <p>{hero.lead}</p>
          <div className="facts">
            {hero.facts.map((fact) => (
              <div key={fact.label} className="fact">
                <b className="num value">
                  {fact.value}
                  <small className="unit">{fact.unit}</small>
                </b>
                {fact.label}
              </div>
            ))}
          </div>
        </div>
      </div>
      <figure className="sheet" aria-label={sheet.label}>
        <div className="t">
          <b className="title">{sheet.title}</b>
          <span>{sheet.client}</span>
        </div>
        <dl>
          {sheet.rows.map((row) => (
            <div key={row.term}>
              <dt>{row.term}</dt>
              <dd className="num">
                {row.value}
                <small className={row.trend}>{row.note}</small>
              </dd>
            </div>
          ))}
        </dl>
        <p className="say">{sheet.say}</p>
        <div className="foot">
          {sheet.foot.map((text) => (
            <span key={text}>{text}</span>
          ))}
        </div>
      </figure>
    </section>
  );
}
