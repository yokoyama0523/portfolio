import { Img } from "~/samples/shared/Img";
import { Lines } from "~/samples/shared/Lines";
import { home } from "../../content/home";
import { Sentences } from "../Sentences";

const text = home.room;

export function Room() {
  return (
    <section className="room" id={text.id} aria-labelledby="room-title">
      <div className="sec-head">
        <h2 id="room-title" className="h2">
          {text.title}
        </h2>
        <p className="prose">
          <Lines lines={text.lead} />
        </p>
      </div>
      <ul className="room-list">
        {text.photos.map((photo) => (
          <li key={photo.caption}>
            <figure>
              <Img image={photo.image} alt={photo.caption} />
              <figcaption>
                <b>{photo.caption}</b>
                <Sentences text={photo.text} />
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}
