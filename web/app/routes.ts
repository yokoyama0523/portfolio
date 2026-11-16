import { index, layout, type RouteConfig, route } from "@react-router/dev/routes";
import corp from "./samples/corp/routes";
import tax from "./samples/tax/routes";

export default [
  layout("site/layout.tsx", [
    index("site/routes/home.tsx"),
    route("portfolio", "site/routes/portfolio.tsx"),
    route("service", "site/routes/service.tsx"),
    route("about", "site/routes/about.tsx"),
    route("*", "site/routes/not-found.tsx"),
  ]),
  ...corp,
  ...tax,
] satisfies RouteConfig;
