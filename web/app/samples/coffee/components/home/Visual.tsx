import { Img } from "~/samples/shared/Img";
import { home, type Scene } from "../../content/home";

export function Visual({ scene }: { scene: Scene }) {
  return (
    <aside className="left" aria-hidden="true">
      {home.photos.map((photo, i) => (
        <div key={photo.key} className={photo.key === scene.photo ? "ph on" : "ph"}>
          <Img image={photo.image} priority={i === 0} />
        </div>
      ))}
      <div className="gauge">
        <div className="bar">
          <i className="level" style={{ height: `${scene.level}%` }} />
        </div>
        <div className="lv">
          <b className="name">{scene.label}</b>
          {home.gaugeCaption}
        </div>
      </div>
    </aside>
  );
}
