import { index, layout, prefix, route } from "@react-router/dev/routes";

export default prefix("portfolio/house", [
  layout("samples/house/layout.tsx", [
    index("samples/house/pages/home.tsx"),
    route("openhouse", "samples/house/pages/openhouse.tsx"),
  ]),
]);
