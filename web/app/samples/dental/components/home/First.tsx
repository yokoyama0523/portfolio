import { home } from "../../content/home";

const { first } = home;

export function First() {
  return (
    <section className="sec first" id={first.id}>
      <h2>{first.title}</h2>
      <p className="lead">{first.lead}</p>
      <div className="flow">
        {first.steps.map((step) => (
          <div key={step.title} className="st">
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </div>
        ))}
      </div>
      <div className="bring">
        <b>{first.bringTitle}</b>
        <ul>
          {first.bring.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
