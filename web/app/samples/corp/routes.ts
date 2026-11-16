import { index, layout, prefix, route } from "@react-router/dev/routes";

export default prefix("portfolio/corp", [
  layout("samples/corp/layout.tsx", [
    index("samples/corp/pages/home.tsx"),
    route("quote", "samples/corp/pages/quote.tsx"),
  ]),
]);
