import type { Config } from "@react-router/dev/config";
import { itemPrerenderPaths } from "./app/samples/ceramic/content/items";

export default {
  ssr: false,
  prerender: ({ getStaticPaths }) => [...getStaticPaths(), ...itemPrerenderPaths],
} satisfies Config;
