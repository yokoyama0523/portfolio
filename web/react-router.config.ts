import type { Config } from "@react-router/dev/config";
import { itemPrerenderPaths } from "./app/samples/ceramic/content/items";
import { ecPrerenderPaths } from "./app/samples/ec/routing";

export default {
  ssr: false,
  prerender: ({ getStaticPaths }) => [
    ...getStaticPaths(),
    ...itemPrerenderPaths,
    ...ecPrerenderPaths,
  ],
} satisfies Config;
