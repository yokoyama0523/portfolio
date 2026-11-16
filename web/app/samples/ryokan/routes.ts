import { index, layout, prefix, route } from "@react-router/dev/routes";

export default prefix("portfolio/ryokan", [
  layout("samples/ryokan/layout.tsx", [
    index("samples/ryokan/pages/home.tsx"),
    route("reserve", "samples/ryokan/pages/reserve.tsx"),
  ]),
]);
