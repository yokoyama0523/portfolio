import { home } from "../../content/home";

const { flow } = home;

export function Flow() {
  return (
    <section className="sec flow" id={flow.id}>
      <h2>{flow.title}</h2>
      <div className="steps">
        {flow.steps.map((step) => (
          <div key={step.title} className="step">
            <h3>{step.title}</h3>
            <p>{step.text}</p>
            <span className="when">{step.when}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
