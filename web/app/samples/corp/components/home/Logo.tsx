import { company } from "../../content/company";

export function Logo() {
  return (
    <>
      <span className="m" aria-hidden="true">
        {company.mark}
      </span>
      <span>
        <b>{company.name}</b>
        <small>{company.latin}</small>
      </span>
    </>
  );
}
