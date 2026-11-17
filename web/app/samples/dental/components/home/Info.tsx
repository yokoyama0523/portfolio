import { Link } from "react-router";
import { clinic, hours } from "../../content/clinic";
import { home } from "../../content/home";
import { latestNewsCount, newsItems } from "../../content/news";
import { HoursTable } from "../HoursTable";

export function Info() {
  return (
    <div className="info">
      <section className="info-news" aria-labelledby="info-news">
        <div className="info-head">
          <h2 id="info-news">{home.news.title}</h2>
          <Link to={clinic.paths.news}>{home.news.more}</Link>
        </div>
        <ul>
          {newsItems.slice(0, latestNewsCount).map((item) => (
            <li key={item.id}>
              <Link to={`${clinic.paths.news}#${item.id}`}>
                <time dateTime={item.iso}>{item.date}</time>
                <span>{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <section className="info-hours" aria-labelledby="info-hours">
        <div className="info-head">
          <h2 id="info-hours">{hours.title}</h2>
        </div>
        <HoursTable />
        <ul className="notes">
          {hours.notes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
        <p className="info-tel">
          <small>{home.hours.telLabel}</small>
          <a href={clinic.telHref}>{clinic.tel}</a>
        </p>
      </section>
    </div>
  );
}
