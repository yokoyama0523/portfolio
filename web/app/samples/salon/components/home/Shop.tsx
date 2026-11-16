import { Fragment } from "react";
import { Img } from "~/samples/shared/Img";
import { home } from "../../content/home";

const { shop } = home;

export function Shop() {
  return (
    <section className="sec shop" id={shop.id}>
      <div className="wrap">
        <div>
          <div className="hours">
            {shop.hours}
            <small>{shop.days}</small>
          </div>
          <dl>
            {shop.rows.map((row) => (
              <Fragment key={row.term}>
                <dt>{row.term}</dt>
                <dd>{row.value}</dd>
              </Fragment>
            ))}
          </dl>
        </div>
        <div className="pic">
          <Img image={shop.image} alt={shop.alt} />
        </div>
      </div>
    </section>
  );
}
