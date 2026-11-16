import { Link } from "react-router";
import { site } from "~/config";
import { sampleCopy } from "./copy";
import styles from "./SampleCredit.module.css";

export function SampleCredit() {
  return (
    <aside className={styles.credit}>
      {sampleCopy.credit.notice(site.name)}
      <Link to={site.worksPath} className={styles.link}>
        {sampleCopy.credit.back}
      </Link>
      <br />
      {sampleCopy.credit.analytics}
    </aside>
  );
}
