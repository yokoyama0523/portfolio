import { Fragment } from "react";
import { Img } from "~/samples/shared/Img";
import { home } from "../../content/home";
import { Head } from "./Head";

const { works } = home;

export function Works() {
  return (
    <section className="sec" id={works.id}>
      <Head title={works.title} text={works.text} />
      {works.items.map((item) => (
        <article key={item.no} className="work">
          <div className="pic">
            <Img
              image={item.image}
              alt={item.alt}
              style={item.focus ? { objectPosition: item.focus } : undefined}
            />
          </div>
          <div className="t">
            <h3 className="v">{item.title}</h3>
            <div>
              <div className="no">{item.no}</div>
              <dl>
                {item.specs.map((spec) => (
                  <Fragment key={spec.term}>
                    <dt>{spec.term}</dt>
                    <dd>{spec.value}</dd>
                  </Fragment>
                ))}
              </dl>
              <p>{item.text}</p>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}
