import { useRef } from "react";
import { Link, useSearchParams } from "react-router";
import { sampleMeta } from "~/samples/shared/meta";
import { useHydrated } from "~/samples/shared/useHydrated";
import { dotDate, newsPath, usePublicNews } from "../admin/news";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { MobileBar } from "../components/MobileBar";
import { NewsTag } from "../components/NewsTag";
import { PageHead } from "../components/PageHead";
import { pageList } from "../components/pageList";
import { ReserveTab } from "../components/ReserveTab";
import { clinic } from "../content/clinic";
import { newsPage as page } from "../content/news";
import { type NewsCategory, newsCategories, newsCategorySlugs } from "../content/posts";
import "../styles/sub.css";

export const meta = () => sampleMeta("dental", page.meta);

const search = (category: NewsCategory | null, n: number) => {
  const query = new URLSearchParams();
  if (category) query.set("c", newsCategorySlugs[category]);
  if (n > 1) query.set("page", String(n));
  const value = query.toString();
  return { pathname: clinic.paths.news, search: value ? `?${value}` : "" };
};

export default function DentalNews() {
  const { posts } = usePublicNews();
  const hydrated = useHydrated();
  const [params] = useSearchParams();
  const listRef = useRef<HTMLDivElement>(null);

  const slug = hydrated ? params.get("c") : null;
  const category = newsCategories.find((c) => newsCategorySlugs[c] === slug) ?? null;
  const filtered = category ? posts.filter((post) => post.category === category) : posts;
  const last = Math.max(1, Math.ceil(filtered.length / page.pageSize));
  const asked = hydrated ? Number(params.get("page") ?? "1") : 1;
  const current = Number.isInteger(asked) && asked >= 1 && asked <= last ? asked : 1;
  const shown = filtered.slice((current - 1) * page.pageSize, current * page.pageSize);

  const move = () => {
    listRef.current?.scrollIntoView({ block: "start" });
  };

  const tabs: { label: string; value: NewsCategory | null }[] = [
    { label: page.all, value: null },
    ...newsCategories.map((c) => ({ label: c, value: c })),
  ];

  return (
    <>
      <Header onHome={false} />
      <main className="sub">
        <PageHead title={page.title} lead={page.lead} image={page.image} alt={page.alt} />
        <div className="news-index" ref={listRef}>
          <nav className="news-filter" aria-label={page.filterLabel}>
            {tabs.map((tab) => (
              <Link
                key={tab.label}
                to={search(tab.value, 1)}
                preventScrollReset
                onClick={move}
                aria-current={tab.value === category ? "page" : undefined}
              >
                {tab.label}
              </Link>
            ))}
          </nav>
          {shown.length === 0 ? (
            <p className="news-empty">{page.empty}</p>
          ) : (
            <ul className="news-rows">
              {shown.map((post) => (
                <li key={post.id}>
                  <Link to={newsPath(post.id)}>
                    <time dateTime={post.date}>{dotDate(post.date)}</time>
                    <NewsTag category={post.category} />
                    <span className="news-title">{post.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
          {last > 1 && (
            <nav className="news-pager" aria-label={page.pager.label}>
              {current > 1 ? (
                <Link to={search(category, current - 1)} preventScrollReset onClick={move}>
                  {page.pager.prev}
                </Link>
              ) : (
                <span aria-disabled="true">{page.pager.prev}</span>
              )}
              {pageList(current, last).map((n, i) =>
                n === "gap" ? (
                  <span key={`gap-${i < 2 ? "a" : "b"}`} className="gap" aria-hidden="true">
                    …
                  </span>
                ) : (
                  <Link
                    key={n}
                    to={search(category, n)}
                    preventScrollReset
                    onClick={move}
                    className="num"
                    aria-label={page.pager.page(n)}
                    aria-current={n === current ? "page" : undefined}
                  >
                    {n}
                  </Link>
                ),
              )}
              {current < last ? (
                <Link to={search(category, current + 1)} preventScrollReset onClick={move}>
                  {page.pager.next}
                </Link>
              ) : (
                <span aria-disabled="true">{page.pager.next}</span>
              )}
            </nav>
          )}
        </div>
      </main>
      <Footer onHome={false} />
      <ReserveTab />
      <MobileBar onHome={false} />
    </>
  );
}
