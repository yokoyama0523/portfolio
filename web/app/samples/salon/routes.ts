import { index, layout, prefix, route } from "@react-router/dev/routes";

export default prefix("portfolio/salon", [
  layout("samples/salon/layout.tsx", [
    index("samples/salon/pages/home.tsx"),
    route("reserve", "samples/salon/pages/reserve.tsx"),
  ]),
]);
