import { Fragment } from "react";
import { Link } from "react-router";
import { Img } from "~/samples/shared/Img";
import { builder } from "../../content/builder";
import { home } from "../../content/home";

const { open } = home;

export function Open() {
  return (
    <section className="sec open" id={open.id}>
      <div className="box">
        <div className="pic">
          <Img image={open.image} alt={open.alt} />
        </div>
        <div>
          <div className="date">
            {open.dates.map((item) => (
              <Fragment key={item.date}>
                {item.date}
                <small>{item.day}</small>
              </Fragment>
            ))}
          </div>
          <h3>{open.title}</h3>
          <p>{open.text}</p>
          <dl>
            {open.details.map((detail) => (
              <Fragment key={detail.term}>
                <dt>{detail.term}</dt>
                <dd>{detail.value}</dd>
              </Fragment>
            ))}
          </dl>
          <Link className="btn" to={builder.paths.openhouse}>
            {open.button}
          </Link>
        </div>
      </div>
    </section>
  );
}
