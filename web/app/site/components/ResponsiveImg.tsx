import type { ImgHTMLAttributes } from "react";
import type { ResponsiveImage } from "~/samples/catalog";

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "srcSet" | "width" | "height"> & {
  image: ResponsiveImage;
};

export function ResponsiveImg({
  image,
  alt = "",
  loading = "lazy",
  decoding = "async",
  ...rest
}: Props) {
  return (
    <img
      src={image.src}
      srcSet={image.srcSet}
      width={image.width}
      height={image.height}
      alt={alt}
      loading={loading}
      decoding={decoding}
      {...rest}
    />
  );
}
