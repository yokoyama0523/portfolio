import { Img } from "~/samples/shared/Img";
import { home } from "../../content/home";

const { room } = home;

export function Room() {
  return (
    <section className="sec room" id={room.id}>
      <h2>{room.title}</h2>
      <p className="lead">{room.lead}</p>
      <div className="strip">
        {room.photos.map((photo) => (
          <figure key={photo.caption}>
            <div className="im">
              <Img image={photo.image} />
            </div>
            <figcaption>{photo.caption}</figcaption>
          </figure>
        ))}
      </div>
      <div className="eq">
        {room.equipment.map((item) => (
          <div key={item.title}>
            <b>{item.title}</b>
            <p>{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
