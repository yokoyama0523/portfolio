import { quote } from "../content/quote";
import { type QuoteForm, STEP } from "./useQuoteForm";

const { labels } = quote.confirm;
const or = (value: string) => value || quote.empty;

const partsSummary = (form: QuoteForm) => {
  const text = quote.parts;
  const lines = form.parts
    .filter((part) => part.name)
    .map((part) =>
      [
        part.name,
        part.material,
        `${part.quantity || text.unknownQuantity}${text.pieces}`,
        part.finish !== text.noFinish ? part.finish : "",
      ]
        .join("　")
        .trim(),
    );
  return lines.join("\n") || text.asDrawn;
};

export const summaryRows = (form: QuoteForm) => {
  const { contact } = form;
  const content =
    form.mode === "quote"
      ? [
          {
            label: labels.drawings,
            value: form.drawings.length
              ? form.drawings.map((drawing) => drawing.name).join("\n")
              : quote.confirm.none,
          },
          { label: labels.parts, value: partsSummary(form) },
          { label: labels.due, value: form.due },
          { label: labels.note, value: or(form.note) },
        ]
      : [
          { label: labels.slot, value: or(form.slot) },
          { label: labels.interests, value: or(form.interests.join(quote.confirm.listSeparator)) },
          { label: labels.people, value: or(form.people) },
        ];
  return [
    ...content.map((row) => ({ ...row, step: STEP.content })),
    { label: labels.company, value: `${or(contact.company)}　${contact.dept}`, step: STEP.contact },
    { label: labels.name, value: or(contact.name), step: STEP.contact },
    {
      label: labels.contact,
      value: `${or(contact.tel)}　${or(contact.email)}`,
      step: STEP.contact,
    },
    { label: labels.industry, value: or(contact.industry), step: STEP.contact },
  ];
};
