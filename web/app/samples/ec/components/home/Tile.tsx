import { Link } from "react-router";
import { Img } from "~/samples/shared/Img";
import { image } from "../../assets";

type Props = { to: string; label: string; photo: string; tone: string; className?: string };

export function Tile({ to, label, photo, tone, className = "" }: Props) {
  return (
    <Link className={`tile ${className}`} to={to}>
      <figure className={`ph tone-${tone}`}>
        <Img image={image(photo)} alt="" />
      </figure>
      <span className="tile-cap">
        <span className="ul">{label}</span>
      </span>
    </Link>
  );
}
