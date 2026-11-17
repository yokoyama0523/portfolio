import { type ImageAsset, imagePicker } from "~/samples/shared/images";

export const image = imagePicker(
  import.meta.glob<ImageAsset>("./assets/*.jpg", {
    eager: true,
    import: "default",
    query: "?w=1600&withoutEnlargement&quality=78&progressive&as=metadata",
  }),
);

const heroSrc = import.meta.glob<ImageAsset>("./assets/hero-window.jpg", {
  eager: true,
  import: "default",
  query: "?w=2000&quality=74&progressive&as=metadata",
});

const heroSet = import.meta.glob<string>("./assets/hero-window.jpg", {
  eager: true,
  import: "default",
  query: "?w=900;1400;2000;2800&quality=74&progressive&as=srcset",
});

export const hero = {
  ...heroSrc["./assets/hero-window.jpg"],
  srcSet: heroSet["./assets/hero-window.jpg"],
};
