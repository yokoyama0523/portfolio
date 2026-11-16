import { products } from "./content/catalog";

export const ecBase = "portfolio/ec";

export const ecPrerenderPaths = products.map((product) => `/${ecBase}/item/${product.id}`);
