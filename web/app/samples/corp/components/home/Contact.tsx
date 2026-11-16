import { Link } from "react-router";
import { Lines } from "~/samples/shared/Lines";
import { company } from "../../content/company";
import { home } from "../../content/home";

const { contact } = home;

export function Contact() {
  return (
    <section className="sec contact" id={contact.id}>
      <div className="wrap">
        <div className="box">
          <div>
            <h2>
              <Lines lines={contact.title} />
            </h2>
            <p>{contact.text}</p>
            <div className="fmt">
              <b>{contact.formatsLabel}</b>
              {contact.formats}
            </div>
          </div>
          <div className="btns">
            <Link className="btn p" to={company.paths.quote}>
              {contact.quote}
            </Link>
            <Link className="btn" to={`${company.paths.quote}?mode=visit`}>
              {contact.visit}
            </Link>
            <div className="tel">
              {contact.telLabel}
              <b className="number">{company.tel}</b>
              {company.hours}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
