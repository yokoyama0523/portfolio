import { useState } from "react";
import { startOfToday, ymd } from "~/samples/shared/dates";
import { adminPage } from "../content/admin";
import { type NewsCategory, type NewsPost, newsCategories } from "../content/posts";
import { dotDate, newsPath, newsState } from "./news";
import { Sheet } from "./Sheet";
import { clinicActions } from "./store";

const text = adminPage.news.editor;

type Props = { id: string; news: NewsPost[]; onClose: () => void };

export function NewsEditor({ id, news, onClose }: Props) {
  const today = ymd(startOfToday());
  const saved = news.find((post) => post.id === id) ?? null;
  const [draft, setDraft] = useState<NewsPost>(
    () =>
      saved ?? {
        id,
        date: today,
        category: "お知らせ",
        title: "",
        body: "",
        published: false,
      },
  );
  const [tried, setTried] = useState(false);
  const [message, setMessage] = useState("");

  const errors = [
    !draft.title.trim() && text.errors.title,
    !draft.date && text.errors.date,
    !draft.body.trim() && text.errors.body,
  ].filter((error): error is string => Boolean(error));

  const set = (patch: Partial<NewsPost>) => {
    setDraft((current) => ({ ...current, ...patch }));
    setMessage("");
  };

  const save = (published: boolean) => {
    setTried(true);
    if (errors.length > 0) return;
    const next = { ...draft, title: draft.title.trim(), body: draft.body.trim(), published };
    clinicActions.saveNews(next);
    setDraft(next);
    if (!published) setMessage(text.drafted);
    else if (next.date > today) setMessage(text.scheduled(dotDate(next.date)));
    else setMessage(saved?.published ? text.updated : text.published);
  };

  const remove = () => {
    if (!window.confirm(text.removeConfirm)) return;
    clinicActions.removeNews(id);
    onClose();
  };

  const live = saved !== null && newsState(saved, today) === "live";

  return (
    <Sheet title={saved ? text.editTitle : text.newTitle} onClose={onClose}>
      <div className="when-fields two">
        <label className="wide">
          <span>{text.title}</span>
          <input
            value={draft.title}
            aria-invalid={tried && !draft.title.trim()}
            onChange={(e) => set({ title: e.target.value })}
          />
        </label>
        <label>
          <span>{text.category}</span>
          <select
            value={draft.category}
            onChange={(e) => set({ category: e.target.value as NewsCategory })}
          >
            {newsCategories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>
        <label>
          <span>{text.date}</span>
          <input
            type="date"
            value={draft.date}
            aria-invalid={tried && !draft.date}
            onChange={(e) => set({ date: e.target.value })}
          />
        </label>
        <label className="wide">
          <span>{text.body}</span>
          <textarea
            className="news-text"
            value={draft.body}
            aria-invalid={tried && !draft.body.trim()}
            aria-describedby="news-body-hint"
            onChange={(e) => set({ body: e.target.value })}
          />
        </label>
        <p id="news-body-hint" className="hint wide">
          {text.bodyHint}
        </p>
      </div>
      {tried && errors.length > 0 && (
        <ul className="warn" role="alert">
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
      <div className="actions">
        <button type="button" className="btn" onClick={() => save(true)}>
          {saved?.published ? text.update : text.publish}
        </button>
        <button type="button" className="btn line" onClick={() => save(false)}>
          {saved?.published ? text.unpublish : text.saveDraft}
        </button>
      </div>
      <p className="ok saved-note" role="status">
        {message}
        {message && live && (
          <a href={newsPath(id)} target="_blank" rel="noopener">
            {text.view}
          </a>
        )}
      </p>
      {saved && (
        <div className="block">
          <button type="button" className="ghost danger" onClick={remove}>
            {text.remove}
          </button>
        </div>
      )}
    </Sheet>
  );
}
