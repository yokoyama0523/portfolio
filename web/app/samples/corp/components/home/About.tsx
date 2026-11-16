import { Fragment } from "react";
import { company } from "../../content/company";
import { home } from "../../content/home";
import { SectionHead } from "./SectionHead";

const { about } = home;

export function About() {
  return (
    <section className="sec co" id={about.id}>
      <SectionHead label={about.label} title={company.legalName} />
      <div className="wrap">
        <div className="two">
          <div>
            <dl>
              {about.rows.map((row) => (
                <Fragment key={row.term}>
                  <dt>{row.term}</dt>
                  <dd>{row.value}</dd>
                </Fragment>
              ))}
            </dl>
          </div>
          <div className="news">
            <h3>{about.newsTitle}</h3>
            <ul>
              {about.news.map((item) => (
                <li key={item.iso}>
                  <time dateTime={item.iso}>{item.date}</time>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
