import type { ResponsiveImage } from "~/samples/catalog";
import { ResponsiveImg } from "./ResponsiveImg";

type Props = { image: ResponsiveImage; sizes: string; alt?: string };

export function LaptopMock({ image, sizes, alt = "" }: Props) {
  return (
    <span className="block w-full">
      <span className="block rounded-t-laptop border-6 border-b-0 border-device bg-device p-0">
        <span className="block aspect-screen overflow-hidden rounded-t-sm bg-white">
          <ResponsiveImg
            image={image}
            sizes={sizes}
            alt={alt}
            className="size-full object-cover object-top"
          />
        </span>
      </span>
      <span className="-mx-hinge block h-2.5 rounded-b-laptop bg-gradient-to-b from-hinge-light to-hinge-dark" />
    </span>
  );
}

export function PhoneMock({ image, sizes, alt = "" }: Props) {
  return (
    <span className="block w-full rounded-phone border-6 border-device bg-device shadow-phone">
      <span className="block aspect-phone overflow-hidden rounded-2xl bg-white">
        <ResponsiveImg
          image={image}
          sizes={sizes}
          alt={alt}
          className="size-full object-cover object-top"
        />
      </span>
    </span>
  );
}
