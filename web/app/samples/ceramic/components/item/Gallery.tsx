import { useState } from "react";
import { Img } from "~/samples/shared/Img";
import type { ImageAsset } from "~/samples/shared/images";
import { itemPage } from "../../content/item";

export function Gallery({ images, alt }: { images: ImageAsset[]; alt: string }) {
  const [current, setCurrent] = useState(0);
  return (
    <div className="gal">
      <div className="main">
        <Img image={images[current]} alt={alt} priority />
      </div>
      <div className="thumbs">
        {images.map((image, i) => (
          <button
            key={image.src}
            type="button"
            className={i === current ? "on" : undefined}
            aria-label={itemPage.thumbLabel(i + 1)}
            aria-pressed={i === current}
            onClick={() => setCurrent(i)}
          >
            <Img image={image} />
          </button>
        ))}
      </div>
    </div>
  );
}
