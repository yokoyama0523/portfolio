import { pageList } from "../components/pageList";
import { adminPage } from "../content/admin";

const text = adminPage.list;

export function Pager({
  current,
  last,
  onPage,
}: {
  current: number;
  last: number;
  onPage: (page: number) => void;
}) {
  if (last <= 1) return null;
  return (
    <nav className="pager" aria-label={text.pager.label}>
      <button type="button" disabled={current === 1} onClick={() => onPage(current - 1)}>
        {text.pager.prev}
      </button>
      {pageList(current, last).map((n, i) =>
        n === "gap" ? (
          <span key={`gap-${i < 2 ? "a" : "b"}`} className="gap" aria-hidden="true">
            …
          </span>
        ) : (
          <button
            key={n}
            type="button"
            className="num"
            aria-label={text.pager.page(n)}
            aria-current={n === current ? "page" : undefined}
            onClick={() => onPage(n)}
          >
            {n}
          </button>
        ),
      )}
      <button type="button" disabled={current === last} onClick={() => onPage(current + 1)}>
        {text.pager.next}
      </button>
    </nav>
  );
}
