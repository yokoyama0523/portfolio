import { index, layout, prefix, route } from "@react-router/dev/routes";

export default prefix("portfolio/coffee", [
  layout("samples/coffee/layout.tsx", [
    index("samples/coffee/pages/home.tsx"),
    route("checkout", "samples/coffee/pages/checkout.tsx"),
  ]),
]);
