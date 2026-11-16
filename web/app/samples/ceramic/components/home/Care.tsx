import { Fragment } from "react";
import { Reveal } from "~/samples/shared/Reveal";
import { home } from "../../content/home";

const { care } = home;

export function Care() {
  return (
    <section className="sec care" id={care.id}>
      <div className="wrap">
        <Reveal>
          <h2 className="heading v">{care.title}</h2>
        </Reveal>
        <Reveal>
          <dl>
            {care.items.map((item) => (
              <Fragment key={item.term}>
                <dt>{item.term}</dt>
                <dd>{item.text}</dd>
              </Fragment>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
