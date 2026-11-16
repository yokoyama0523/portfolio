import { Fragment } from "react";
import { Img } from "~/samples/shared/Img";
import { home } from "../../content/home";

const { officeInfo } = home;

export function OfficeInfo() {
  return (
    <section className="sec office">
      <div className="wrap">
        <figure>
          <div className="im">
            <Img image={officeInfo.image} alt={officeInfo.alt} />
          </div>
          <figcaption>{officeInfo.caption}</figcaption>
        </figure>
        <dl>
          {officeInfo.rows.map((row) => (
            <Fragment key={row.term}>
              <dt>{row.term}</dt>
              <dd className={row.numeric ? "num" : undefined}>{row.value}</dd>
            </Fragment>
          ))}
        </dl>
      </div>
    </section>
  );
}
