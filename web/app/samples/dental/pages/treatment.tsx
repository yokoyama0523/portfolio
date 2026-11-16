import { Img } from "~/samples/shared/Img";
import { sampleMeta } from "~/samples/shared/meta";
import { Reveal } from "~/samples/shared/Reveal";
import { Footer } from "../components/Footer";
import { MobileBar } from "../components/MobileBar";
import { CtaBand } from "../components/sub/CtaBand";
import { Header } from "../components/sub/Header";
import { PageHead } from "../components/sub/PageHead";
import { treatmentPage, treatments } from "../content/treatments";
import "../styles/sub.css";

export const meta = () => sampleMeta("dental", treatmentPage.meta);

export default function DentalTreatment() {
  return (
    <>
      <Header />
      <main>
        <PageHead en={treatmentPage.en} title={treatmentPage.title} />
        {treatments.map((treatment) => (
          <section key={treatment.id} className="tr" id={treatment.id}>
            <div className="inner">
              <Reveal className="im">
                <Img image={treatment.image} />
              </Reveal>
              <Reveal>
                <h2>
                  <small>{treatment.en}</small>
                  {treatment.title}
                </h2>
                <p>{treatment.text}</p>
                <h3>{treatmentPage.flowTitle}</h3>
                <ol>
                  {treatment.steps.map((step) => (
                    <li key={step.title}>
                      <b>{step.title}</b>　{step.text}
                    </li>
                  ))}
                </ol>
                <h3>{treatmentPage.feeTitle}</h3>
                <table>
                  <tbody>
                    {treatment.fees.map((fee) => (
                      <tr key={fee.item}>
                        <th scope="row">{fee.item}</th>
                        <td>{fee.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="note fee-note">{treatment.feeNote}</p>
              </Reveal>
            </div>
          </section>
        ))}
        <CtaBand {...treatmentPage.cta} />
      </main>
      <Footer variant="sub" />
      <MobileBar onHome={false} />
    </>
  );
}
