import { Fragment } from "react";
import { clinic } from "../content/clinic";

export function Address({ withZip = false }: { withZip?: boolean }) {
  return (
    <>
      {withZip && (
        <>
          {clinic.zip}
          <br />
        </>
      )}
      {clinic.addressParts.map((part, i) => (
        <Fragment key={part}>
          {i > 0 && <wbr />}
          <span className="nw">{part}</span>
        </Fragment>
      ))}
    </>
  );
}
