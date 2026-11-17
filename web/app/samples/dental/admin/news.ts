import { startOfToday, ymd } from "~/samples/shared/dates";
import { clinic } from "../content/clinic";
import { type NewsPost, seedNews } from "../content/posts";
import { useClinic } from "./store";

export type NewsState = "live" | "scheduled" | "draft";

export const newsState = (post: NewsPost, today: string): NewsState => {
  if (!post.published) return "draft";
  return post.date > today ? "scheduled" : "live";
};

export const byNewest = (a: NewsPost, b: NewsPost) => {
  if (a.date !== b.date) return a.date < b.date ? 1 : -1;
  return a.id < b.id ? 1 : -1;
};

export const dotDate = (date: string) => date.replace(/-/g, ".");

export const paragraphs = (body: string) =>
  body
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

export const keyedParagraphs = (body: string) => {
  const seen = new Map<string, number>();
  return paragraphs(body).map((line) => {
    const n = (seen.get(line) ?? 0) + 1;
    seen.set(line, n);
    return { key: `${n}-${line}`, line };
  });
};

export const newsPath = (id: string) => `${clinic.paths.news}${id}/`;

export const usePublicNews = () => {
  const data = useClinic();
  const today = ymd(startOfToday());
  const posts = (data?.news ?? seedNews)
    .filter((post) => newsState(post, today) === "live")
    .sort(byNewest);
  return { ready: data !== null, posts };
};
