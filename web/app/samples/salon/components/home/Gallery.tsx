import { Img } from "~/samples/shared/Img";
import { home } from "../../content/home";

const { gallery } = home;

export function Gallery() {
  return (
    <section className="sec gallery" id={gallery.id} aria-label={gallery.label}>
      <div className="grid">
        {gallery.items.map((item) => (
          <figure key={item.area} className={item.area}>
            <Img
              image={item.image}
              style={item.focus ? { objectPosition: item.focus } : undefined}
            />
          </figure>
        ))}
      </div>
    </section>
  );
}
