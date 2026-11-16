import type { ImgHTMLAttributes } from "react";
import type { ImageAsset } from "./images";

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "width" | "height" | "alt"> & {
  image: ImageAsset;
  alt?: string;
  priority?: boolean;
};

export function Img({ image, alt = "", priority = false, ...rest }: Props) {
  return (
    <img
      src={image.src}
      width={image.width}
      height={image.height}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding={priority ? "auto" : "async"}
      fetchPriority={priority ? "high" : "auto"}
      {...rest}
    />
  );
}
