import { home } from "../../content/home";

const { why } = home;

export function Why() {
  return (
    <section className="sec why g2" id={why.id}>
      <h2>{why.title}</h2>
      <ul>
        {why.items.map((item) => (
          <li key={item.title}>
            <b>{item.title}</b>
            <p>{item.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
