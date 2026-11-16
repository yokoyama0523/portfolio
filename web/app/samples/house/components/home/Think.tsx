import { Img } from "~/samples/shared/Img";
import { home } from "../../content/home";
import { Head } from "./Head";

const { think } = home;

export function Think() {
  return (
    <section className="sec think" id={think.id}>
      <Head title={think.title} />
      <div className="list">
        {think.items.map((item) => (
          <div key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </div>
        ))}
      </div>
      <div className="pics">
        {think.photos.map((photo) => (
          <figure key={photo.caption}>
            <div className="im">
              <Img image={photo.image} />
            </div>
            <figcaption>{photo.caption}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
