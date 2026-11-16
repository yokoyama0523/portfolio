import { type ImageAsset, imagePicker } from "~/samples/shared/images";

export const pickImage = imagePicker(
  import.meta.glob<ImageAsset>("./assets/*.{jpg,jpeg,png,webp}", {
    eager: true,
    import: "default",
    query: "?w=1200&withoutEnlargement&quality=72&progressive&as=metadata",
  }),
);

export const image = (name: string) => pickImage(`${name}.jpg`);
