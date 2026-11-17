import type { Config } from "@react-router/dev/config";
import { itemPrerenderPaths } from "./app/samples/ceramic/content/items";
import { dentalPrerenderPaths } from "./app/samples/dental/routing";
import { ecPrerenderPaths } from "./app/samples/ec/routing";

export default {
  ssr: false,
  prerender: ({ getStaticPaths }) => [
    ...getStaticPaths(),
    ...itemPrerenderPaths,
    ...dentalPrerenderPaths,
    ...ecPrerenderPaths,
  ],
} satisfies Config;
