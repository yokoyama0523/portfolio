import { type ImageAsset, imagePicker } from "~/samples/shared/images";

export const image = imagePicker(
  import.meta.glob<ImageAsset>("./assets/*.{jpg,jpeg,png,webp}", {
    eager: true,
    import: "default",
    query: "?w=1600&withoutEnlargement&quality=72&progressive&as=metadata",
  }),
);
