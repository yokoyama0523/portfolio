import { seedNews } from "./content/posts";

export const dentalBase = "portfolio/dental";

export const dentalPrerenderPaths = seedNews.map((post) => `/${dentalBase}/news/${post.id}`);
