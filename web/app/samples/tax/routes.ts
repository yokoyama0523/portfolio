import { index, layout, prefix, route } from "@react-router/dev/routes";

export default prefix("portfolio/tax", [
  layout("samples/tax/layout.tsx", [
    index("samples/tax/pages/home.tsx"),
    route("consult", "samples/tax/pages/consult.tsx"),
  ]),
]);
