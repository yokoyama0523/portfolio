import { useRef, useState } from "react";
import { startOfToday, ymd } from "~/samples/shared/dates";
import { NewsTag } from "../components/NewsTag";
import { adminPage } from "../content/admin";
import { type NewsCategory, type NewsPost, newsCategories } from "../content/posts";
import { byNewest, dotDate, type NewsState, newsPath, newsState } from "./news";
import { Pager } from "./Pager";

const text = adminPage.news;
const STATES = Object.keys(text.states) as NewsState[];

type Props = { news: NewsPost[]; onOpen: (id: string) => void; onNew: () => void };

export function NewsView({ news, onOpen, onNew }: Props) {
  const [state, setState] = useState<NewsState | "all">("all");
  const [category, setCategory] = useState<NewsCategory | "all">("all");
  const [page, setPage] = useState(1);
  const top = useRef<HTMLDivElement>(null);
  const today = ymd(startOfToday());

  const rows = news
    .filter((post) => state === "all" || newsState(post, today) === state)
    .filter((post) => category === "all" || post.category === category)
    .sort(byNewest);
  const last = Math.max(1, Math.ceil(rows.length / text.pageSize));
  const current = Math.min(page, last);
  const start = (current - 1) * text.pageSize;
  const shown = rows.slice(start, start + text.pageSize);

  const goTo = (next: number) => {
    setPage(next);
    top.current?.scrollIntoView({ block: "start" });
  };

  return (
    <>
      <div className="pnl filters" ref={top}>
        <fieldset className="seg">
          <legend className="sr">{text.state}</legend>
          {(["all", ...STATES] as const).map((id) => (
            <button
              key={id}
              type="button"
              aria-pressed={state === id}
              onClick={() => {
                setState(id);
                setPage(1);
              }}
            >
              {id === "all" ? text.all : text.states[id]}
            </button>
          ))}
        </fieldset>
        <label className="sel">
          <span>{text.category}</span>
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value as NewsCategory | "all");
              setPage(1);
            }}
          >
            <option value="all">{text.all}</option>
            {newsCategories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>
        <span className="count">
          {rows.length > 0
            ? text.range(start + 1, start + shown.length, rows.length)
            : text.count(0)}
        </span>
        <button type="button" className="btn" onClick={onNew}>
          {text.add}
        </button>
      </div>
      <div className="pnl table-wrap">
        {rows.length === 0 ? (
          <p className="empty">{text.empty}</p>
        ) : (
          <table className="nlist">
            <thead>
              <tr>
                <th scope="col">{text.columns.date}</th>
                <th scope="col">{text.columns.category}</th>
                <th scope="col">{text.columns.title}</th>
                <th scope="col">{text.columns.state}</th>
                <th scope="col">{text.columns.page}</th>
              </tr>
            </thead>
            <tbody>
              {shown.map((post) => {
                const value = newsState(post, today);
                return (
                  <tr key={post.id}>
                    <td className="date">{dotDate(post.date)}</td>
                    <td>
                      <NewsTag category={post.category} />
                    </td>
                    <td className="title">
                      <button type="button" onClick={() => onOpen(post.id)}>
                        {post.title}
                      </button>
                    </td>
                    <td>
                      <span className={`state ${value}`}>{text.states[value]}</span>
                    </td>
                    <td className="view">
                      {value === "live" && (
                        <a href={newsPath(post.id)} target="_blank" rel="noopener">
                          {text.view}
                        </a>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
      <Pager current={current} last={last} onPage={goTo} />
    </>
  );
}
