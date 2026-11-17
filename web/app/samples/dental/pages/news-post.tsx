import { Link } from "react-router";
import { sampleMeta } from "~/samples/shared/meta";
import { dotDate, keyedParagraphs, newsPath, paragraphs, usePublicNews } from "../admin/news";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { MobileBar } from "../components/MobileBar";
import { NewsTag } from "../components/NewsTag";
import { ReserveTab } from "../components/ReserveTab";
import { crumbs } from "../content/chrome";
import { clinic } from "../content/clinic";
import { newsPage, newsPostPage as text } from "../content/news";
import { seedNews } from "../content/posts";
import "../styles/sub.css";
import type { Route } from "./+types/news-post";

export const meta = ({ params }: Route.MetaArgs) => {
  const post = seedNews.find((p) => p.id === params.id && p.published);
  if (!post) return sampleMeta("dental", { title: newsPage.meta.title, noindex: true });
  return sampleMeta("dental", {
    ...text.meta(post.title),
    slug: `news/${post.id}/`,
    description: paragraphs(post.body)[0],
  });
};

function Crumbs({ title }: { title: string }) {
  return (
    <nav className="crumbs" aria-label={crumbs.label}>
      <ol>
        <li>
          <Link to={clinic.paths.home}>{crumbs.home}</Link>
        </li>
        <li>
          <Link to={clinic.paths.news}>{newsPage.title}</Link>
        </li>
        <li aria-current="page">{title}</li>
      </ol>
    </nav>
  );
}

export default function DentalNewsPost({ params }: Route.ComponentProps) {
  const { ready, posts } = usePublicNews();
  const index = posts.findIndex((p) => p.id === params.id);
  const post = posts[index];
  const newer = index > 0 ? posts[index - 1] : null;
  const older = index >= 0 && index < posts.length - 1 ? posts[index + 1] : null;

  return (
    <>
      <Header onHome={false} />
      <main className="sub">
        {post ? (
          <article className="news-post" aria-labelledby="news-post-title">
            <Crumbs title={post.title} />
            <header className="news-post-head">
              <p className="news-meta">
                <time dateTime={post.date}>{dotDate(post.date)}</time>
                <NewsTag category={post.category} />
              </p>
              <h1 id="news-post-title" className="h1">
                {post.title}
              </h1>
            </header>
            <div className="news-body prose">
              {keyedParagraphs(post.body).map(({ key, line }) => (
                <p key={key}>{line}</p>
              ))}
            </div>
            <nav className="news-around" aria-label={newsPage.title}>
              {newer ? (
                <Link className="newer" to={newsPath(newer.id)}>
                  <small>{text.newer}</small>
                  <span>{newer.title}</span>
                </Link>
              ) : (
                <span className="newer" />
              )}
              <Link className="back" to={clinic.paths.news}>
                {text.back}
              </Link>
              {older ? (
                <Link className="older" to={newsPath(older.id)}>
                  <small>{text.older}</small>
                  <span>{older.title}</span>
                </Link>
              ) : (
                <span className="older" />
              )}
            </nav>
          </article>
        ) : (
          <div className="news-post">
            <Crumbs title={text.notFound.crumb} />
            {ready && (
              <div className="news-missing">
                <h1 className="h1">{text.notFound.text}</h1>
                <p className="prose">{text.notFound.lead}</p>
                <Link className="btn line" to={clinic.paths.news}>
                  {text.back}
                </Link>
              </div>
            )}
          </div>
        )}
      </main>
      <Footer onHome={false} />
      <ReserveTab />
      <MobileBar onHome={false} />
    </>
  );
}
