import { Link } from "react-router";

export function Breadcrumb({ items }: { items: [string, string][] }) {
  return (
    <nav aria-label="パンくずリスト" className="text-[12px] tracking-[0.06em] text-mute">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map(([label, href], i) => (
          <li key={href} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden="true">/</span>}
            {i < items.length - 1 ? (
              <Link to={href} className="transition-colors hover:text-ink">
                {label}
              </Link>
            ) : (
              <span aria-current="page" className="text-ink">
                {label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
