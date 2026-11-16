import { Fragment } from "react";
import { Img } from "~/samples/shared/Img";
import { home } from "../../content/home";
import { SectionHead } from "./SectionHead";

const { works } = home;
const specKeys = ["material", "tolerance", "quantity"] as const;

export function Works() {
  return (
    <section className="sec works" id={works.id}>
      <SectionHead label={works.label} title={works.title} text={works.text} />
      <div className="wrap">
        <div className="list">
          {works.items.map((item) => (
            <article key={item.drawing}>
              <div className="im" data-dwg={item.drawing}>
                <Img
                  image={item.image}
                  style={item.focus ? { objectPosition: item.focus } : undefined}
                />
              </div>
              <div className="t">
                <span className="dwg">
                  {works.drawingPrefix} {item.drawing}
                </span>
                <h3>{item.name}</h3>
                <dl>
                  {specKeys.map((key) => (
                    <Fragment key={key}>
                      <dt>{works.terms[key]}</dt>
                      <dd>{item[key]}</dd>
                    </Fragment>
                  ))}
                </dl>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
