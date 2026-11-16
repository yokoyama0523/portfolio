import { Img } from "~/samples/shared/Img";
import { home } from "../../content/home";

const { doctor, staff } = home;

export function Doctor() {
  return (
    <section className="sec doc" id={doctor.id}>
      <div className="box">
        <div className="ph">
          <Img image={doctor.image} alt={doctor.alt} />
        </div>
        <div>
          <h2>{doctor.title}</h2>
          <div className="msg">
            {doctor.message.map((text) => (
              <p key={text}>{text}</p>
            ))}
          </div>
          <div className="nm">
            {doctor.name}
            <small className="role">{doctor.role}</small>
          </div>
          <p className="cv">{doctor.career}</p>
        </div>
      </div>
      <div className="staff">
        <h2>{staff.title}</h2>
        <div className="grid">
          {staff.items.map((member) => (
            <div key={member.name}>
              <div className="ph">
                <Img image={member.image} style={{ objectPosition: member.focus }} />
              </div>
              <h3>
                {member.name}
                <small>{member.role}</small>
              </h3>
              <p>{member.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
