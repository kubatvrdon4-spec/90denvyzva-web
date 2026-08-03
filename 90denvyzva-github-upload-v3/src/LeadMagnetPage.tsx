import { FormEvent, useEffect, useState } from "react";
import { initMetaPixel, trackMetaContact, trackMetaLead } from "./metaPixel";

const PDF_URL = "/30-dni-obsahu-pro-fitness-trenery.pdf";
const DOWNLOAD_NAME = "30-dni-obsahu-pro-fitness-trenery.pdf";
const OFFER_URL =
  "/?utm_source=leadmagnet&utm_medium=onsite&utm_campaign=leadmagnet_30dni&utm_content=success_offer#cena";
const OFFER_SMS_URL =
  "sms:+420601507018?body=Dobr%C3%BD%20den%2C%20st%C3%A1hl%2Fa%20jsem%20si%20pl%C3%A1n%2030%20dn%C3%AD%20obsahu%20a%20zaj%C3%ADm%C3%A1%20m%C4%9B%20web%20nebo%20varianta%20web%20%2B%20Instagram.%20Pros%C3%ADm%20o%20v%C3%ADce%20informac%C3%AD.";

type FormStatus = "idle" | "submitting" | "success" | "error";

const productBenefits = [
  {
    number: "01",
    title: "30 hotových témat",
    text: "Každý den má konkrétní námět, úvodní větu, doporučený obsah a jasnou výzvu k akci.",
  },
  {
    number: "02",
    title: "20 použitelných hooků",
    text: "Začátky videí, které stačí doplnit vlastní zkušeností a specializací.",
  },
  {
    number: "03",
    title: "3 scénáře Reels",
    text: "Jednoduchá struktura pro praktický návod, vyvrácení mýtu a příběh klienta.",
  },
  {
    number: "04",
    title: "Kontrola profilu",
    text: "Checklist bio, připnutých příspěvků, výběrů a odkazu, který vede k nabídce.",
  },
  {
    number: "05",
    title: "CTA banka",
    text: "Výzvy k uložení, komentáři, zprávě, stažení materiálu i přechodu na web.",
  },
  {
    number: "06",
    title: "Cesta k poptávce",
    text: "Jak propojit obsah, profil a web, aby pozornost neskončila pouze u zhlédnutí.",
  },
];

const faqs = [
  {
    question: "Je plán opravdu zdarma?",
    answer:
      "Ano. Po odeslání formuláře získáte celý 15stránkový pracovní plán bez platby.",
  },
  {
    question: "Je určený jen pro zkušené tvůrce?",
    answer:
      "Ne. Témata jsou připravená tak, aby podle nich dokázal začít i trenér, který obsah zatím tvoří nepravidelně.",
  },
  {
    question: "Musím mít profesionální kameru?",
    answer:
      "Nemusíte. Pro začátek stačí telefon, dobré světlo, srozumitelný zvuk a jedna jasná myšlenka v každém videu.",
  },
  {
    question: "Budu po stažení dostávat nabídky?",
    answer:
      "Pouze pokud samostatně zaškrtnete, že chcete dostávat další tipy a nabídky. Samotné doručení PDF tím podmíněné není.",
  },
];

function LeadForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [error, setError] = useState("");

  const submitLead = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    setError("");

    const form = event.currentTarget;
    const data = new FormData(form);
    const params = new URLSearchParams(window.location.search);
    const payload = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      instagram: String(data.get("instagram") ?? "").trim(),
      website: String(data.get("website") ?? "").trim(),
      privacyAcknowledged: data.get("privacy") === "on",
      marketingConsent: data.get("marketingConsent") === "on",
      source: {
        page: window.location.href,
        referrer: document.referrer,
        utmSource: params.get("utm_source") ?? "",
        utmMedium: params.get("utm_medium") ?? "",
        utmCampaign: params.get("utm_campaign") ?? "",
        utmContent: params.get("utm_content") ?? "",
      },
    };

    try {
      const isDemo =
        import.meta.env.DEV || new URLSearchParams(window.location.search).get("demo") === "1";

      if (!isDemo) {
        const response = await fetch("/api/lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error("Lead endpoint failed");
        }
      }

      setStatus("success");
      trackMetaLead();
      form.reset();
    } catch {
      setError(
        "Odeslání se nyní nepodařilo. Zkuste to prosím znovu za chvíli.",
      );
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="lead-success" role="status" aria-live="polite">
        <span>PDF je připravené</span>
        <h2>Máte před sebou celý měsíc konkrétního obsahu.</h2>
        <p>
          Odkaz jsme poslali také na zadaný e-mail. Soubor si můžete stáhnout
          rovnou teď.
        </p>
        <a className="lead-button lead-button-accent" href={PDF_URL} download={DOWNLOAD_NAME}>
          Stáhnout PDF
          <span aria-hidden="true">↓</span>
        </a>

        <div className="lead-success-offer">
          <small>Další krok</small>
          <h3>Z obsahu mohou vznikat poptávky, ne jen zhlédnutí.</h3>
          <p>
            Web přehledně představí vaše služby, výsledky a místa působení.
            Varianta web + Instagram navíc propojí obsahovou strategii,
            scénáře a správu profilu s jednou konkrétní nabídkou.
          </p>
          <ul>
            <li><b>Web na míru</b><span>11 999 Kč · platba až po dokončení</span></li>
            <li><b>Web + Instagram</b><span>rozsah a cena podle spolupráce</span></li>
          </ul>
        </div>

        <a
          className="lead-button lead-button-dark"
          href={OFFER_SMS_URL}
          onClick={trackMetaContact}
        >
          Probrat možnosti zprávou
          <span aria-hidden="true">→</span>
        </a>
        <a className="lead-text-link" href={OFFER_URL}>
          Nejdříve si prohlédnout nabídku a ukázky
          <span aria-hidden="true">→</span>
        </a>
      </div>
    );
  }

  return (
    <form className="lead-form" onSubmit={submitLead}>
      <div className="lead-form-heading">
        <span>PDF zdarma</span>
        <h2>Kam vám máme plán poslat?</h2>
        <p>Stažení získáte ihned po odeslání formuláře.</p>
      </div>

      <label>
        <span>Jméno</span>
        <input
          type="text"
          name="name"
          autoComplete="given-name"
          minLength={2}
          maxLength={80}
          placeholder="Např. Martin"
          required
        />
      </label>

      <label>
        <span>E-mail</span>
        <input
          type="email"
          name="email"
          autoComplete="email"
          maxLength={160}
          placeholder="vas@email.cz"
          required
        />
      </label>

      <label>
        <span>Instagram <small>nepovinné</small></span>
        <input
          type="text"
          name="instagram"
          autoComplete="off"
          maxLength={100}
          placeholder="@vasprofil"
        />
      </label>

      <label className="lead-honeypot" aria-hidden="true">
        <span>Web</span>
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </label>

      <label className="lead-check">
        <input type="checkbox" name="privacy" required />
        <span>
          Beru na vědomí zpracování údajů za účelem zaslání vyžádaného PDF.
          <a href="#ochrana-udaju"> Podrobnosti</a>
        </span>
      </label>

      <label className="lead-check">
        <input type="checkbox" name="marketingConsent" />
        <span>
          Chci dostávat také další praktické tipy a nabídky pro trenéry.
          Souhlas lze kdykoliv odvolat.
        </span>
      </label>

      <button
        className="lead-button lead-button-accent"
        type="submit"
        disabled={status === "submitting"}
      >
        {status === "submitting" ? "Odesílám…" : "Získat plán zdarma"}
        <span aria-hidden="true">→</span>
      </button>

      {status === "error" && (
        <p className="lead-form-error" role="alert">
          {error}
        </p>
      )}

      <small className="lead-form-note">
        Žádná platební karta. Žádné povinné marketingové zprávy.
      </small>
    </form>
  );
}

function LeadMagnetPage() {
  useEffect(() => {
    initMetaPixel();
    document.title = "30 dní obsahu pro fitness trenéry zdarma";
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (description) {
      description.content =
        "Stáhněte si zdarma 30denní obsahový plán pro fitness trenéry: konkrétní témata, hooky, CTA a cesta od Instagramu k poptávce.";
    }
  }, []);

  return (
    <div className="lead-page">
      <header className="lead-header">
        <a href="/" className="lead-brand" aria-label="Keller — weby pro trenéry">
          <b>Keller</b>
          <span>weby a obsah pro trenéry</span>
        </a>
        <a href="#stahnout" className="lead-header-action">
          PDF zdarma <span aria-hidden="true">↓</span>
        </a>
      </header>

      <main>
        <section className="lead-hero" id="stahnout">
          <div className="lead-hero-copy">
            <span className="lead-eyebrow">Pracovní plán pro osobní trenéry</span>
            <h1>
              30 dní obsahu.
              <em>Bez přemýšlení, co zase natočit.</em>
            </h1>
            <p>
              Konkrétní témata, hooky a výzvy k akci, které vedou od sledování
              profilu k poptávce. Otevřete plán, vyberte den a natočte.
            </p>
            <ul className="lead-proof-list">
              <li><b>30</b><span>hotových námětů</span></li>
              <li><b>20</b><span>použitelných hooků</span></li>
              <li><b>3</b><span>scénáře Reels</span></li>
            </ul>
          </div>

          <div className="lead-product">
            <div className="lead-product-stack" aria-hidden="true"></div>
            <img
              src="/obsah-pro-trenery-cover.png"
              width="794"
              height="1123"
              alt="Titulní strana PDF 30 dní obsahu pro fitness trenéry"
            />
            <div className="lead-product-label">
              <span>15 stran</span>
              <b>Praktický plán, ne obecný ebook.</b>
            </div>
          </div>

          <LeadForm />
        </section>

        <section className="lead-strip" aria-label="Hlavní výhody">
          <span>Bez motivačních citátů</span>
          <span>Bez složité techniky</span>
          <span>Bez obecných pouček</span>
          <span>Okamžitě použitelné</span>
        </section>

        <section className="lead-benefits">
          <div className="lead-section-heading">
            <span>01 / Co získáte</span>
            <h2>Obsah na měsíc a systém, který mu dává obchodní směr.</h2>
            <p>
              Nestačí publikovat často. Každý příspěvek musí mít důvod a jeden
              jasný další krok.
            </p>
          </div>
          <div className="lead-benefit-grid">
            {productBenefits.map((benefit) => (
              <article key={benefit.number}>
                <span>{benefit.number}</span>
                <h3>{benefit.title}</h3>
                <p>{benefit.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="lead-preview">
          <div className="lead-section-heading lead-section-heading-dark">
            <span>02 / Uvnitř PDF</span>
            <h2>Žádná výplň. Každá stránka má konkrétní úkol.</h2>
            <p>
              Témata jsou rozdělená na odbornost, důvěru, výsledky a nabídku,
              aby profil nebyl pouze galerií cviků.
            </p>
          </div>
          <div className="lead-preview-grid">
            <figure>
              <img
                src="/obsah-pro-trenery-plan.png"
                width="794"
                height="1123"
                loading="lazy"
                alt="Ukázka pěti konkrétních témat z obsahového plánu"
              />
              <figcaption><span>01</span> Témata, hooky a CTA pro každý den.</figcaption>
            </figure>
            <figure>
              <img
                src="/obsah-pro-trenery-system.png"
                width="794"
                height="1123"
                loading="lazy"
                alt="Ukázka systému Instagram, profil, web a poptávka"
              />
              <figcaption><span>02</span> Cesta od příspěvku ke skutečné poptávce.</figcaption>
            </figure>
          </div>
        </section>

        <section className="lead-system">
          <div className="lead-section-heading">
            <span>03 / Jak to funguje</span>
            <h2>Instagram získá pozornost. Nabídka ji musí převést dál.</h2>
          </div>
          <div className="lead-system-grid">
            <article>
              <span>01</span>
              <div><small>Příspěvek</small><h3>Zaujme správný problém.</h3></div>
            </article>
            <article>
              <span>02</span>
              <div><small>Profil</small><h3>Potvrdí specializaci a přístup.</h3></div>
            </article>
            <article>
              <span>03</span>
              <div><small>Web</small><h3>Ukáže služby, výsledky a důvěru.</h3></div>
            </article>
            <article>
              <span>04</span>
              <div><small>Poptávka</small><h3>Nabídne jeden jednoduchý krok.</h3></div>
            </article>
          </div>
        </section>

        <section className="lead-offer">
          <div>
            <span>Pro trenéry, kteří chtějí celý systém</span>
            <h2>
              Obsah přivede lidi.
              <em>Web je přesvědčí, aby napsali.</em>
            </h2>
          </div>
          <div className="lead-offer-copy">
            <p>
              Vytvářím profesionální weby pro fitness trenéry — od služeb,
              referencí a proměn až po WhatsApp, formulář nebo rezervaci.
            </p>
            <ul>
              <li>První návrh do 10 dnů</li>
              <li>Platba až po dokončení webu</li>
              <li>Možnost webu se strategií nebo správou Instagramu</li>
            </ul>
            <a className="lead-button lead-button-dark" href="/">
              Prohlédnout možnosti a ukázky
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </section>

        <section className="lead-faq">
          <div className="lead-section-heading">
            <span>04 / Časté otázky</span>
            <h2>Než si plán stáhnete.</h2>
          </div>
          <div className="lead-faq-list">
            {faqs.map((faq, index) => (
              <details key={faq.question}>
                <summary>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <b>{faq.question}</b>
                  <i aria-hidden="true">+</i>
                </summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="lead-final">
          <span>Začněte prvním týdnem, ne dokonalým měsícem.</span>
          <h2>Otevřete plán. Vyberte den. Natočte.</h2>
          <a className="lead-button lead-button-accent" href="#stahnout">
            Získat PDF zdarma
            <span aria-hidden="true">↑</span>
          </a>
        </section>
      </main>

      <footer className="lead-footer" id="ochrana-udaju">
        <div>
          <b>Lukáš Keller</b>
          <small>Weby a obsahové systémy pro trenéry</small>
        </div>
        <details>
          <summary>Informace o zpracování údajů</summary>
          <p>
            Jméno a e-mail používáme k doručení vyžádaného PDF. Instagram je
            nepovinný. Další tipy a nabídky zasíláme pouze při samostatném
            souhlasu, který lze kdykoliv odvolat. Kontaktní údaje správce jsou
            uvedené na hlavním webu 90denvyzva.cz.
          </p>
        </details>
        <div className="lead-footer-links">
          <a href="/">90denvyzva.cz</a>
          <a href={PDF_URL}>Přímý odkaz na PDF</a>
        </div>
      </footer>
    </div>
  );
}

export default LeadMagnetPage;
