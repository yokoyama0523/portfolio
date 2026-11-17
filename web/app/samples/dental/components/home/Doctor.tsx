import { Img } from "~/samples/shared/Img";
import { Lines } from "~/samples/shared/Lines";
import { home } from "../../content/home";
import { Sentences } from "../Sentences";

const { doctor, staff } = home;

export function Doctor() {
  return (
    <section className="doctor" id={doctor.id} aria-labelledby="doctor-title">
      <div className="doctor-main">
        <figure className="doctor-photo">
          <Img image={doctor.image} alt={doctor.alt} />
        </figure>
        <div className="doctor-body">
          <h2 id="doctor-title" className="h2">
            {doctor.title}
          </h2>
          <p className="prose">
            <Lines lines={doctor.message} />
          </p>
          <p className="sign">
            <small>{doctor.role}</small>
            {doctor.name}
          </p>
          <ul className="career">
            {doctor.career.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="staff">
        <h3 className="h3">{staff.title}</h3>
        <div className="staff-grid">
          <figure className="staff-photo">
            <Img image={staff.image} alt={staff.alt} />
          </figure>
          <ul>
            {staff.items.map((item) => (
              <li key={item.name}>
                <p className="who">
                  <small>{item.role}</small>
                  {item.name}
                </p>
                <p>
                  <Sentences text={item.text} />
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
