import { Img } from "~/samples/shared/Img";
import { home } from "../../content/home";

const { concept } = home;

export function Concept() {
  return (
    <section className="sec concept" id={concept.id}>
      <div className="two">
        <h2>{concept.title}</h2>
        <div className="t">
          {concept.paragraphs.map((text) => (
            <p key={text}>{text}</p>
          ))}
        </div>
      </div>
      <div className="strip">
        {concept.strip.map((item) => (
          <figure key={item.caption}>
            <Img
              image={item.image}
              style={item.focus ? { objectPosition: item.focus } : undefined}
            />
            <figcaption>{item.caption}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
