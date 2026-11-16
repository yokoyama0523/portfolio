import { Fragment } from "react";

export type SummaryRow = { label: string; value: string; step: number };

type Props = { rows: SummaryRow[]; editLabel: string; onEdit: (step: number) => void };

export function Summary({ rows, editLabel, onEdit }: Props) {
  return (
    <div className="sum">
      <dl>
        {rows.map((row) => (
          <Fragment key={row.label}>
            <dt>{row.label}</dt>
            <dd>
              {row.value}
              <button type="button" className="edit" onClick={() => onEdit(row.step)}>
                {editLabel}
              </button>
            </dd>
          </Fragment>
        ))}
      </dl>
    </div>
  );
}
