import { type DragEvent, useState } from "react";
import { quote } from "../content/quote";
import type { QuoteForm } from "./useQuoteForm";

const text = quote.parts;

function Drawings({ form }: { form: QuoteForm }) {
  const [over, setOver] = useState(false);
  const hold = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setOver(true);
  };
  const release = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setOver(false);
  };
  return (
    <fieldset>
      <legend>{quote.drawings.legend}</legend>
      <p className="hint">{quote.drawings.hint}</p>
      <label
        className={over ? "drop over" : "drop"}
        onDragEnter={hold}
        onDragOver={hold}
        onDragLeave={release}
        onDrop={(event) => {
          release(event);
          form.addDrawings(event.dataTransfer.files);
        }}
      >
        <input
          type="file"
          multiple
          accept={quote.drawings.accept}
          onChange={(event) => {
            form.addDrawings(event.target.files);
            event.target.value = "";
          }}
        />
        <b>{quote.drawings.drop}</b>
        <small>{quote.drawings.multiple}</small>
      </label>
      <ul className="files">
        {form.drawings.map((drawing) => (
          <li key={drawing.id}>
            <span>
              {drawing.name}
              <small>{(drawing.size / 1024).toFixed(0)} KB</small>
            </span>
            <button type="button" onClick={() => form.removeDrawing(drawing.id)}>
              {quote.drawings.remove}
            </button>
          </li>
        ))}
      </ul>
    </fieldset>
  );
}

function Parts({ form }: { form: QuoteForm }) {
  return (
    <fieldset>
      <legend>{text.legend}</legend>
      <p className="hint">{text.hint}</p>
      <div className="parts">
        <table>
          <thead>
            <tr>
              <th>{text.columns.name}</th>
              <th>{text.columns.material}</th>
              <th>{text.columns.quantity}</th>
              <th className="hide">{text.columns.finish}</th>
              <th>
                <span className="sr">{text.removeLabel}</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {form.parts.map((part) => (
              <tr key={part.id}>
                <td>
                  <input
                    type="text"
                    aria-label={text.columns.name}
                    placeholder={text.namePlaceholder}
                    value={part.name}
                    onChange={(event) => form.updatePart(part.id, "name", event.target.value)}
                  />
                </td>
                <td>
                  <select
                    aria-label={text.columns.material}
                    value={part.material}
                    onChange={(event) => form.updatePart(part.id, "material", event.target.value)}
                  >
                    {text.materials.map((material) => (
                      <option key={material}>{material}</option>
                    ))}
                  </select>
                </td>
                <td className="qty">
                  <input
                    type="text"
                    inputMode="numeric"
                    aria-label={text.columns.quantity}
                    placeholder={text.quantityPlaceholder}
                    value={part.quantity}
                    onChange={(event) => form.updatePart(part.id, "quantity", event.target.value)}
                  />
                </td>
                <td className="hide">
                  <select
                    aria-label={text.columns.finish}
                    value={part.finish}
                    onChange={(event) => form.updatePart(part.id, "finish", event.target.value)}
                  >
                    {text.finishes.map((finish) => (
                      <option key={finish}>{finish}</option>
                    ))}
                  </select>
                </td>
                <td className="del">
                  <button
                    type="button"
                    aria-label={text.removeLabel}
                    onClick={() => form.removePart(part.id)}
                  >
                    {text.remove}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="button" className="add" onClick={form.addPart}>
          {text.add}
        </button>
      </div>
    </fieldset>
  );
}

export function QuoteFields({ form }: { form: QuoteForm }) {
  return (
    <div className="mode">
      <Drawings form={form} />
      <Parts form={form} />
      <fieldset>
        <legend>{quote.due.legend}</legend>
        <div className="opts">
          {quote.due.options.map((option) => (
            <label key={option} className="opt">
              <input
                type="radio"
                name="due"
                value={option}
                checked={form.due === option}
                onChange={() => form.setDue(option)}
              />
              {option}
            </label>
          ))}
        </div>
      </fieldset>
      <fieldset>
        <legend>{quote.note.legend}</legend>
        <textarea
          aria-label={quote.note.legend}
          placeholder={quote.note.placeholder}
          value={form.note}
          onChange={(event) => form.setNote(event.target.value)}
        />
      </fieldset>
    </div>
  );
}
