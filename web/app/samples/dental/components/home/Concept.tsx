import { Img } from "~/samples/shared/Img";
import { Lines } from "~/samples/shared/Lines";
import { home } from "../../content/home";
import { Sentences } from "../Sentences";

const { concept, family } = home;

export function Concept() {
  return (
    <>
      <section className="concept" id={concept.id} aria-labelledby="concept-title">
        <h2 id="concept-title" className="tate">
          <Lines lines={concept.title} />
        </h2>
        <div className="concept-body">
          <p className="prose">
            <Lines lines={concept.text} />
          </p>
          <dl className="points">
            {concept.points.map((point) => (
              <div key={point.title}>
                <dt>{point.title}</dt>
                <dd>
                  <Sentences text={point.text} />
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <figure className="concept-photo">
          <Img image={concept.image} alt={concept.alt} />
        </figure>
      </section>
      <section className="family" id={family.id} aria-labelledby="family-title">
        <figure className="family-photo">
          <Img image={family.image} alt={family.alt} />
        </figure>
        <div className="family-body">
          <h2 id="family-title" className="h2">
            <Lines lines={family.title} />
          </h2>
          <p className="prose">
            <Lines lines={family.text} />
          </p>
        </div>
      </section>
    </>
  );
}
