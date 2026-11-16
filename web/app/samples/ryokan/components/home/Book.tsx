import { Fragment, type Ref } from "react";
import { Form } from "react-router";
import { Reveal } from "~/samples/shared/Reveal";
import { home } from "../../content/home";
import { inn } from "../../content/inn";

const { book } = home;

export function Book({ sectionRef }: { sectionRef: Ref<HTMLElement> }) {
  return (
    <section ref={sectionRef} className="book" id={book.id}>
      <Reveal>
        <h2>{book.title}</h2>
        <Form action={inn.paths.reserve} method="get">
          <div>
            <label>
              {book.fields.date}
              <input type="date" name="date" />
            </label>
          </div>
          <div>
            <label>
              {book.fields.nights.label}
              <select name="nights">
                {book.fields.nights.options.map((n) => (
                  <option key={n} value={n}>
                    {n}
                    {book.fields.nights.suffix}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="full">
            <label>
              {book.fields.adults.label}
              <select name="adults">
                {book.fields.adults.options.map((n) => (
                  <option key={n}>{n}</option>
                ))}
              </select>
            </label>
          </div>
          <button type="submit">{book.submit}</button>
        </Form>
        <div className="tel">
          {inn.telHours}
          <b className="number">{inn.tel}</b>
        </div>
      </Reveal>
      <Reveal>
        <h2>{book.accessTitle}</h2>
        <dl>
          {book.access.map((row) => (
            <Fragment key={row.term}>
              <dt>{row.term}</dt>
              <dd>{row.value}</dd>
            </Fragment>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}
