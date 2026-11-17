import type { NewsCategory } from "../content/posts";

export function NewsTag({ category }: { category: NewsCategory }) {
  return <span className={category === "休診" ? "news-tag closed" : "news-tag"}>{category}</span>;
}
