import { home } from "../../content/home";

const { features } = home;

export function Features() {
  return (
    <section className="sec feat two" id={features.id}>
      <h2>{features.title}</h2>
      <ul>
        {features.items.map((item) => (
          <li key={item.title}>
            <b>{item.title}</b>
            <p>{item.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
