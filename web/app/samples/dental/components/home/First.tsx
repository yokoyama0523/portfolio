import { Img } from "~/samples/shared/Img";
import { Lines } from "~/samples/shared/Lines";
import { home } from "../../content/home";
import { Sentences } from "../Sentences";

const text = home.first;

export function First() {
  return (
    <section className="first" id={text.id} aria-labelledby="first-title">
      <div className="sec-head">
        <h2 id="first-title" className="h2">
          {text.title}
        </h2>
        <p className="prose">
          <Lines lines={text.lead} />
        </p>
      </div>
      <ol className="steps-list">
        {text.steps.map((step, i) => (
          <li key={step.title}>
            <span className="num" aria-hidden="true">
              {i + 1}
            </span>
            <h3>{step.title}</h3>
            <p>
              <Sentences text={step.text} />
            </p>
          </li>
        ))}
      </ol>
      <div className="bring">
        <figure>
          <Img image={text.image} alt={text.alt} />
        </figure>
        <div>
          <h3>{text.bringTitle}</h3>
          <ul>
            {text.bring.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
