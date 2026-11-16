export type ImageAsset = { src: string; width: number; height: number };

export const imagePicker = (files: Record<string, ImageAsset>) => (name: string) => {
  const image = files[`./assets/${name}`];
  if (!image) throw new Error(`Missing sample image: ${name}`);
  return image;
};
