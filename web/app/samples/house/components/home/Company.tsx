import { Fragment } from "react";
import { home } from "../../content/home";
import { Head } from "./Head";

const { company } = home;

export function Company() {
  return (
    <section className="sec co" id={company.id}>
      <Head title={company.title} />
      <div className="wrap">
        <div className="story">
          <b>{company.storyTitle}</b>
          <p>{company.story}</p>
        </div>
        <dl>
          {company.rows.map((row) => (
            <Fragment key={row.term}>
              <dt>{row.term}</dt>
              <dd>{row.value}</dd>
            </Fragment>
          ))}
        </dl>
      </div>
    </section>
  );
}
