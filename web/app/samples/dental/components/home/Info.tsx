import { Link } from "react-router";
import { dotDate, newsPath, usePublicNews } from "../../admin/news";
import { clinic, hours } from "../../content/clinic";
import { home } from "../../content/home";
import { latestNewsCount } from "../../content/news";
import { HoursNotes, HoursTable } from "../HoursTable";
import { NewsTag } from "../NewsTag";

export function Info() {
  const { posts } = usePublicNews();
  return (
    <div className="info">
      <section className="info-news" aria-labelledby="info-news">
        <div className="info-head">
          <h2 id="info-news">{home.news.title}</h2>
          <Link to={clinic.paths.news}>{home.news.more}</Link>
        </div>
        <ul>
          {posts.slice(0, latestNewsCount).map((post) => (
            <li key={post.id}>
              <Link to={newsPath(post.id)}>
                <time dateTime={post.date}>{dotDate(post.date)}</time>
                <NewsTag category={post.category} />
                <span className="news-title">{post.title}</span>
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
        <HoursNotes />
        <p className="info-tel">
          <small>{home.hours.telLabel}</small>
          <a href={clinic.telHref}>{clinic.tel}</a>
        </p>
      </section>
    </div>
  );
}
