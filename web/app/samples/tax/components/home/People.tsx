import { Img } from "~/samples/shared/Img";
import { home } from "../../content/home";

const { people } = home;

export function People() {
  return (
    <section className="sec people" id={people.id}>
      <h2>{people.title}</h2>
      <div className="list">
        {people.items.map((person) => (
          <figure key={person.name}>
            <div className="im">
              <Img image={person.image} />
            </div>
            <figcaption>
              <h3>
                {person.name}
                <small className="role">{person.role}</small>
              </h3>
              <blockquote>{person.quote}</blockquote>
              <p>{person.text}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
