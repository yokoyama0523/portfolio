import { home } from "../../content/home";

const { services } = home;

export function Services() {
  return (
    <section className="sec svc g2" id={services.id}>
      <h2>{services.title}</h2>
      <div>
        {services.items.map((item) => (
          <div key={item.title} className="row">
            <h3>{item.title}</h3>
            <p>{item.text}</p>
            <div className="pr num">
              {item.price}
              <small>{item.note}</small>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
