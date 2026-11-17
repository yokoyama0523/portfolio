import { Link } from "react-router";
import { Img } from "~/samples/shared/Img";
import type { ImageAsset } from "~/samples/shared/images";
import { Lines } from "~/samples/shared/Lines";
import { crumbs } from "../content/chrome";
import { clinic } from "../content/clinic";

type Props = { title: string; lead: readonly string[]; image: ImageAsset; alt: string };

export function PageHead({ title, lead, image, alt }: Props) {
  return (
    <div className="phead">
      <nav className="crumbs" aria-label={crumbs.label}>
        <ol>
          <li>
            <Link to={clinic.paths.home}>{crumbs.home}</Link>
          </li>
          <li aria-current="page">{title}</li>
        </ol>
      </nav>
      <div className="phead-grid">
        <div>
          <h1 className="h1">{title}</h1>
          <p className="prose">
            <Lines lines={lead} />
          </p>
        </div>
        <figure className="phead-photo">
          <Img image={image} alt={alt} priority />
        </figure>
      </div>
    </div>
  );
}
