import { Img } from "~/samples/shared/Img";
import { Reveal } from "~/samples/shared/Reveal";
import { home } from "../../content/home";

const { makers } = home;

export function Makers() {
  return (
    <section className="sec makers" id={makers.id}>
      <Reveal className="head">
        <h2>{makers.title}</h2>
        <p>{makers.text}</p>
      </Reveal>
      <div className="list">
        {makers.items.map((maker) => (
          <Reveal key={maker.name}>
            <figure>
              <div className="im">
                <Img image={maker.image} />
              </div>
              <figcaption>
                <h3>
                  {maker.name}
                  <small className="place">{maker.place}</small>
                </h3>
                <p>{maker.text}</p>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
