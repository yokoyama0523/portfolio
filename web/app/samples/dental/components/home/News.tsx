import { Link } from "react-router";
import { clinic } from "../../content/clinic";
import { home } from "../../content/home";
import { latestNewsCount, newsItems } from "../../content/news";

export function News() {
  return (
    <section className="news" id={home.news.id}>
      <h2>{home.news.title}</h2>
      <div>
        <ul>
          {newsItems.slice(0, latestNewsCount).map((item) => (
            <li key={item.id}>
              <time dateTime={item.iso}>{item.date}</time>
              <Link to={`${clinic.paths.news}#${item.id}`}>{item.summary}</Link>
            </li>
          ))}
        </ul>
        <Link className="more" to={clinic.paths.news}>
          {home.news.more}
        </Link>
      </div>
    </section>
  );
}
