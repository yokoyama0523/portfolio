import { Img } from "~/samples/shared/Img";
import { home } from "../../content/home";

const { stylists } = home;

export function Stylists() {
  return (
    <section className="sec stylists" id={stylists.id}>
      <h2>{stylists.title}</h2>
      <div className="list">
        {stylists.items.map((stylist) => (
          <figure key={stylist.name}>
            <div className="im">
              <Img
                image={stylist.image}
                style={stylist.focus ? { objectPosition: stylist.focus } : undefined}
              />
            </div>
            <figcaption>
              <div className="nm">
                {stylist.name}
                <small>{stylist.latin}</small>
              </div>
              <p>{stylist.text}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
