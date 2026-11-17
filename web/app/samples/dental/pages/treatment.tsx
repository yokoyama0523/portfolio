import { sampleMeta } from "~/samples/shared/meta";
import { Cta } from "../components/Cta";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { MobileBar } from "../components/MobileBar";
import { PageHead } from "../components/PageHead";
import { ReserveTab } from "../components/ReserveTab";
import { treatmentPage as page, type Treatment, treatments } from "../content/treatments";
import "../styles/sub.css";
import { Sentences } from "../components/Sentences";

export const meta = () => sampleMeta("dental", page.meta);

function TreatmentSection({ treatment }: { treatment: Treatment }) {
  return (
    <section className="tr" id={treatment.id} aria-labelledby={`${treatment.id}-title`}>
      <h2 id={`${treatment.id}-title`} className="h2">
        {treatment.title}
      </h2>
      <p className="tr-summary">
        <Sentences text={treatment.summary} />
      </p>
      <p className="prose">
        <Sentences text={treatment.text.join("")} />
      </p>
      <h3 className="h3">{page.flowTitle}</h3>
      <ol className="tr-steps">
        {treatment.steps.map((step) => (
          <li key={step.title}>
            <b>{step.title}</b>
            <span>
              <Sentences text={step.text} />
            </span>
          </li>
        ))}
      </ol>
      <h3 className="h3">{page.feeTitle}</h3>
      <table className="fees">
        <tbody>
          {treatment.fees.map((fee) => (
            <tr key={fee.item}>
              <th scope="row">{fee.item}</th>
              <td>{fee.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {treatment.risks && (
        <>
          <h3 className="h3">{page.riskTitle}</h3>
          <ul className="risks">
            {treatment.risks.map((risk) => (
              <li key={risk}>
                <Sentences text={risk} />
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}

export default function DentalTreatment() {
  return (
    <>
      <Header onHome={false} />
      <main className="sub">
        <PageHead title={page.title} lead={page.lead} image={page.image} alt={page.alt} />
        <div className="tr-layout">
          <nav className="tr-index" aria-label={page.indexLabel}>
            <ul>
              {treatments.map((treatment) => (
                <li key={treatment.id}>
                  <a href={`#${treatment.id}`}>{treatment.title}</a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="tr-list">
            {treatments.map((treatment) => (
              <TreatmentSection key={treatment.id} treatment={treatment} />
            ))}
          </div>
        </div>
        <Cta title={page.cta.title} text={page.cta.text} />
      </main>
      <Footer onHome={false} />
      <ReserveTab />
      <MobileBar onHome={false} />
    </>
  );
}
