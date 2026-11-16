import { Link } from "react-router";
import { Img } from "~/samples/shared/Img";
import { Lines } from "~/samples/shared/Lines";
import { Reveal } from "~/samples/shared/Reveal";
import { home } from "../../content/home";
import { store } from "../../content/store";

const { gift } = home;

export function Gift() {
  return (
    <section className="sec gift" id={gift.id}>
      <div className="wrap">
        <Reveal className="pic">
          <Img image={gift.image} />
        </Reveal>
        <Reveal>
          <h2>
            <Lines lines={gift.title} />
          </h2>
          <p>{gift.text}</p>
          <Link className="btn" to={store.paths.checkout}>
            {gift.button}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
