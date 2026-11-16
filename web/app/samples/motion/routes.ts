import { index, layout, prefix } from "@react-router/dev/routes";

export default prefix("portfolio/motion", [
  layout("samples/motion/layout.tsx", [index("samples/motion/pages/home.tsx")]),
]);
