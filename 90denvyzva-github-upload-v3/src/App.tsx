import { useState } from "react";

const SMS_LINK =
  "sms:+420601507018?body=Dobr%C3%BD%20den%2C%20m%C3%A1m%20z%C3%A1jem%20o%20web%20pro%20tren%C3%A9ra.%20Pros%C3%ADm%20o%20v%C3%ADce%20informac%C3%AD.";
const ASSET_BASE = import.meta.env.BASE_URL;

const websiteSections = [
  {
    number: "01",
    label: "Úvod",
    title: "Během pár vteřin klient pozná, že je tu správně.",
    text: "Silný úvod pojmenuje jeho cíl, ukáže váš přístup a nabídne jasný další krok. Bez hledání v příspěvcích a dlouhého vysvětlování.",
    preview: "intro",
  },
  {
    number: "02",
    label: "Služby",
    title: "Každá služba má své místo a srozumitelný přínos.",
    text: "Osobní trénink, online coaching, jídelníček nebo příprava na závod. Klient ihned chápe, co nabízíte, pro koho to je a co má zvolit.",
    preview: "services",
  },
  {
    number: "03",
    label: "Proměny",
    title: "Skutečné příběhy mění pochybnost v důvěru.",
    text: "Když zájemce uvidí klienta se stejným problémem a výsledkem, po kterém touží, začne si na jeho místě představovat sám sebe.",
    preview: "results",
  },
  {
    number: "04",
    label: "O trenérovi",
    title: "Lidé si nevybírají jen plán. Vybírají si člověka.",
    text: "Váš přístup, zkušenosti, prostředí i hodnoty pomohou klientovi poznat, jestli si budete rozumět — ještě před první zprávou.",
    preview: "about",
  },
  {
    number: "05",
    label: "Rezervace",
    title: "Volný termín si může vybrat bez zdlouhavého domlouvání.",
    text: "Rezervační systém, kalendář nebo jednoduchá žádost o termín. Řešení přizpůsobíme tomu, jak už dnes pracujete.",
    preview: "booking",
  },
  {
    number: "06",
    label: "Balíčky",
    title: "Cena dává větší smysl, když je vidět celý obsah spolupráce.",
    text: "Přehledné balíčky ukážou rozdíl mezi jednorázovým tréninkem, dlouhodobým vedením a online spoluprací.",
    preview: "packages",
  },
  {
    number: "07",
    label: "Kontakt",
    title: "Poptávka musí být jednodušší než zavřít stránku.",
    text: "SMS, formulář, místo tréninků i sociální sítě jsou na jednom místě. Klient přesně ví, co se stane po odeslání.",
    preview: "contact",
  },
] as const;

const projects = [
  {
    index: "01",
    type: "Osobní trenér",
    name: "Jakub Marek",
    url: "https://www.kuba-marek.cz/",
    domain: "kuba-marek.cz",
    description:
      "Osobní značka trenéra, nabídka služeb, výsledky klientů a přímá cesta ke konzultaci.",
    visual: "image",
    image: `${ASSET_BASE}jakub-marek-preview-v3.png`,
    imageAlt: "Úvodní část webu osobního trenéra Jakuba Marka",
  },
  {
    index: "02",
    type: "Fotbalový klub",
    name: "FK Okula Nýrsko",
    url: "https://www.fk-okula-nyrsko.cz/",
    domain: "fk-okula-nyrsko.cz",
    description:
      "Rozsáhlý klubový web s aktualitami, týmy, výsledky, fotogalerií a informacemi pro fanoušky.",
    visual: "image",
    image: `${ASSET_BASE}fk-okula-nyrsko.png`,
    imageAlt: "Web FK Okula Nýrsko",
  },
  {
    index: "03",
    type: "Sportovní klub",
    name: "TJ Nová Ves",
    url: "https://tj-nova-ves.cz/",
    domain: "tj-nova-ves.cz",
    description:
      "Čistá klubová prezentace, která zpřístupňuje důležité informace členům i veřejnosti.",
    visual: "image",
    image: `${ASSET_BASE}tj-nova-ves-cover-v2.png`,
    imageAlt: "Tým TJ Nová Ves při mistrovských oslavách",
  },
  {
    index: "04",
    type: "Fotbalový klub",
    name: "FC Jiskra Modrá",
    url: "https://nwm.vercel.app/",
    domain: "nwm.vercel.app",
    description:
      "Klubový web s výraznou identitou, přehledem zápasů, týmy a informacemi o sportovním areálu.",
    visual: "image",
    image: `${ASSET_BASE}jiskra-modra-cover-v2.png`,
    imageAlt: "Logo FC Jiskra Modrá na klubovém pozadí",
  },
] as const;

const deliverables = [
  ["Strategie a struktura", "Ujasníme si, koho chcete oslovit, čím ho přesvědčit a kam ho má web dovést."],
  ["Texty a prezentace nabídky", "Vaši službu převedu do stručných textů, kterým klient rozumí a které budují důvěru."],
  ["Originální design", "Vizuální styl vychází z vaší osobnosti a klientů. Nezískáte přebarvenou šablonu."],
  ["Mobilní verze", "Web bude stejně přehledný a přesvědčivý na telefonu, odkud přijde většina návštěv."],
  ["Rezervace a kontakt", "Napojíme vhodný kalendář, formulář nebo přímou cestu ke zprávě podle vašeho způsobu práce."],
  ["Spuštění a další péče", "Pomohu s doménou, zveřejněním i úpravami, které budete potřebovat po spuštění."],
];

const faqs = [
  {
    question: "Nemám připravené texty. Je to problém?",
    answer:
      "Není. Stačí krátce popsat, s kým pracujete, jak probíhají tréninky a čeho chcete webem dosáhnout. Z toho připravím strukturu i první verzi textů, kterou společně doladíme.",
  },
  {
    question: "Mám jen Instagram. Má pro mě web smysl?",
    answer:
      "Právě tehdy často dává největší smysl. Instagram přivádí pozornost, ale web z ní udělá důvěru: soustředí nabídku, výsledky, informace o vás a kontakt na jedno místo bez rušivého obsahu.",
  },
  {
    question: "Může být na webu rezervační systém?",
    answer:
      "Ano. Web lze propojit s rezervačním nástrojem, kalendářem nebo jednoduchou žádostí o termín. Vybereme variantu, která zapadne do toho, jak už dnes přijímáte klienty.",
  },
  {
    question: "Co když zatím nemám profesionální fotky ani proměny?",
    answer:
      "Web lze postavit i s kvalitními autentickými fotkami z telefonu a postupně doplňovat. Navrhnu konkrétní záběry i způsob, jak později přidávat proměny a reference se souhlasem klientů.",
  },
  {
    question: "Budu si moct web později upravovat?",
    answer:
      "Ano. Způsob správy nastavíme podle toho, jak často chcete obsah měnit. Drobné změny mohu průběžně zajišťovat já, nebo připravím části webu tak, aby se daly snadno aktualizovat.",
  },
  {
    question: "Kdy uvidím první návrh a kdy platím?",
    answer:
      "První návrh připravím do 10 dnů od dodání podkladů. Platba probíhá až po dokončení webu, takže předem vidíte výsledek, který dostáváte.",
  },
  {
    question: "Kolik web stojí?",
    answer:
      "Kompletní prezentační web pro trenéra nyní nabízím za 11 999 Kč místo 17 999 Kč. Pokud byste potřebovali výrazně větší rozsah nebo speciální funkce, domluvíme vše předem.",
  },
];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function TrainerPreview({ type }: { type: (typeof websiteSections)[number]["preview"] }) {
  if (type === "services") {
    return (
      <div className="demo-page demo-services">
        <div className="demo-header">
          <b>AN / COACHING</b>
          <span>Služby</span>
        </div>
        <p className="demo-kicker">Vyberte si spolupráci</p>
        <h3>Vedení podle cíle. Ne podle šablony.</h3>
        <div className="demo-service-list">
          <div><span>01</span><b>Osobní trénink</b><small>Praha · 60 minut</small></div>
          <div><span>02</span><b>Online coaching</b><small>Plán · kontrola · podpora</small></div>
          <div><span>03</span><b>Tréninkový plán</b><small>Na míru · konzultace · úpravy</small></div>
        </div>
      </div>
    );
  }

  if (type === "results") {
    return (
      <div className="demo-page demo-results">
        <div className="demo-header">
          <b>AN / COACHING</b>
          <span>Proměny</span>
        </div>
        <p className="demo-kicker">Ukázka příběhu klienta</p>
        <h3>Výsledek má příběh.</h3>
        <div className="demo-result-grid">
          <div className="result-portrait result-one"><span>Začátek</span></div>
          <div className="result-portrait result-two"><span>Po spolupráci</span></div>
        </div>
        <div className="demo-case-note">
          <small>Cíl klienta</small>
          <p>Lepší kondice, pravidelný režim a jistota při samostatném tréninku.</p>
        </div>
      </div>
    );
  }

  if (type === "about") {
    return (
      <div className="demo-page demo-about">
        <div className="demo-header">
          <b>AN / COACHING</b>
          <span>O mně</span>
        </div>
        <div className="demo-about-grid">
          <div className="demo-coach-mark"><span>AN</span></div>
          <div>
            <p className="demo-kicker">Adam Novák · ukázkový profil</p>
            <h3>Trénink má fungovat i mimo posilovnu.</h3>
            <p>Silový a kondiční trenér. Individuální přístup, srozumitelný plán a dlouhodobě udržitelný systém.</p>
          </div>
        </div>
      </div>
    );
  }

  if (type === "booking") {
    return (
      <div className="demo-page demo-booking">
        <div className="demo-header">
          <b>AN / COACHING</b>
          <span>Rezervace</span>
        </div>
        <div className="booking-heading">
          <div>
            <p className="demo-kicker">Vyberte termín</p>
            <h3>Úvodní konzultace</h3>
          </div>
          <span>30 min · online</span>
        </div>
        <div className="booking-layout">
          <div className="booking-calendar">
            <div className="booking-month"><b>SRPEN</b><span>← &nbsp; →</span></div>
            <div className="booking-days"><span>PO</span><span>ÚT</span><span>ST</span><span>ČT</span><span>PÁ</span></div>
            <div className="booking-dates"><i>10</i><i>11</i><i className="selected">12</i><i>13</i><i>14</i></div>
          </div>
          <div className="booking-times">
            <button type="button" tabIndex={-1}>09:00</button>
            <button type="button" tabIndex={-1}>16:30</button>
            <button type="button" tabIndex={-1}>18:00</button>
          </div>
        </div>
      </div>
    );
  }

  if (type === "packages") {
    return (
      <div className="demo-page demo-packages">
        <div className="demo-header">
          <b>AN / COACHING</b>
          <span>Spolupráce</span>
        </div>
        <p className="demo-kicker">Možnosti vedení</p>
        <h3>Vyberte si tempo.</h3>
        <div className="package-list">
          <div><small>01</small><b>Jednorázový trénink</b><span>Technika a jasný další krok</span></div>
          <div className="featured"><small>02</small><b>Měsíční vedení</b><span>Plán, tréninky a průběžné úpravy</span></div>
          <div><small>03</small><b>Online coaching</b><span>Vedení odkudkoliv</span></div>
        </div>
      </div>
    );
  }

  if (type === "contact") {
    return (
      <div className="demo-page demo-contact">
        <div className="demo-header">
          <b>AN / COACHING</b>
          <span>Kontakt</span>
        </div>
        <p className="demo-kicker">První krok</p>
        <h3>Začněme krátkou zprávou.</h3>
        <p>Napište, čeho chcete dosáhnout. Ozvu se a společně vybereme vhodný způsob spolupráce.</p>
        <div className="demo-contact-row">
          <div><small>Zpráva</small><b>Napsat trenérovi</b></div>
          <div><small>Místo</small><b>Praha 2</b></div>
        </div>
        <button type="button" tabIndex={-1}>Napsat zprávu</button>
      </div>
    );
  }

  return (
    <div className="demo-page demo-intro">
      <div className="demo-header">
        <b>AN / COACHING</b>
        <span>Osobní trenér · Praha</span>
      </div>
      <div className="demo-intro-copy">
        <p className="demo-kicker">Osobní trenér</p>
        <h3><span>Adam</span> Novák</h3>
        <p>Silnější tělo, lepší kondice a plán, který zapadne do běžného života.</p>
        <ul><li>Individuální přístup</li><li>Tréninky na Praze 2</li></ul>
        <button type="button" tabIndex={-1}>Domluvit konzultaci</button>
      </div>
      <div className="demo-stat-line">
        <span>Osobní tréninky</span>
        <span>Online vedení</span>
        <span>Praha 2</span>
      </div>
    </div>
  );
}

function App() {
  const [activeSection, setActiveSection] = useState(0);

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Keller — Weby pro trenéry">
          <span className="brand-mark">K</span>
          <span className="brand-copy">
            <b>Keller</b>
            <small>weby pro trenéry</small>
          </span>
        </a>
        <nav aria-label="Hlavní navigace">
          <a href="#proc-web">Proč web</a>
          <a href="#moznosti">Co může obsahovat</a>
          <a href="#realizace">Realizace</a>
          <a href="#spoluprace">Spolupráce</a>
        </nav>
        <a className="header-cta" href={SMS_LINK}>Probrat váš web</a>
      </header>

      <main id="top">
        <section className="hero section-dark">
          <div className="hero-copy">
            <p className="eyebrow"><span>01</span> Web není vizitka. Je to obchodník.</p>
            <h1>Web, který z trenéra udělá <em>jasnou volbu.</em></h1>
            <p className="hero-lead">
              Instagram přivede pozornost. Web z ní udělá důvěru a poptávku. Ukáže vaši práci,
              skutečné výsledky i důvod, proč má klient začít právě s vámi.
            </p>
            <div className="hero-actions">
              <a className="button button-accent" href={SMS_LINK}>Napsat SMS o webu <span>→</span></a>
              <a className="text-link" href="#realizace">Prohlédnout realizace <Arrow /></a>
            </div>
            <p className="hero-assurance"><b>První návrh do 10 dnů.</b> Platíte až po dokončení webu.</p>
            <ul className="hero-facts" aria-label="Hlavní výhody">
              <li>Design na míru</li>
              <li>Texty a struktura</li>
              <li>Rezervace i kontakt</li>
            </ul>
          </div>

          <a
            className="hero-work"
            href="https://www.kuba-marek.cz/"
            target="_blank"
            rel="noreferrer"
            aria-label="Otevřít realizaci webu Jakuba Marka"
          >
            <div className="hero-work-design">
              <img
                src={`${ASSET_BASE}jakub-marek-preview-v3.png`}
                alt="Úvodní část realizovaného webu osobního trenéra Jakuba Marka"
              />
            </div>
            <div className="hero-work-caption">
              <div><small>Skutečná realizace</small><b>Web pro Jakuba Marka</b></div>
              <span>Otevřít web ↗</span>
            </div>
          </a>
        </section>

        <section className="proof-strip" aria-label="Způsob práce">
          <span>První návrh do 10 dnů</span>
          <span>Platba až po dokončení</span>
          <span>Vlastní design, žádná šablona</span>
          <span>Web připravený pro mobil</span>
        </section>

        <section className="problem-section section-light" id="proc-web">
          <div className="section-index">02</div>
          <div className="problem-heading">
            <p className="eyebrow dark-eyebrow">Proč samotný Instagram nestačí</p>
            <h2>Profil ukáže, že cvičíte. Web vysvětlí, <em>proč právě s vámi.</em></h2>
          </div>
          <div className="problem-content">
            <p className="large-copy">
              Zájemce nechce skládat vaši nabídku z příspěvků, výběrů a zpráv. Potřebuje na
              jednom místě pochopit, pro koho jste, jak pracujete a co má udělat dál.
            </p>
            <div className="comparison">
              <div>
                <span>Na sociální síti</span>
                <ul>
                  <li>pozornost se rychle ztrácí</li>
                  <li>nabídka je rozptýlená</li>
                  <li>algoritmus rozhoduje, co uvidí</li>
                </ul>
              </div>
              <div className="comparison-positive">
                <span>Na vlastním webu</span>
                <ul>
                  <li>vedete pozornost vy</li>
                  <li>všechno důležité je pohromadě</li>
                  <li>návštěvník má jasný další krok</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="trust-section section-dark">
          <div className="trust-heading">
            <p className="eyebrow"><span>03</span> Důvěra a osobní značka</p>
            <h2>Klient si nekupuje trénink. Kupuje důvěru, že to dokáže <em>právě s vámi.</em></h2>
          </div>
          <div className="trust-story">
            <p>
              Když na webu uvidí člověka se stejným problémem a výsledkem, po kterém touží,
              přestane si představovat cizí příběh. Začne si představovat vlastní.
            </p>
            <div className="trust-path" aria-label="Jak web buduje důvěru">
              <article><span>01</span><b>Vidím svůj problém</b><small>Příběh klienta pojmenuje situaci, kterou právě řeším.</small></article>
              <article><span>02</span><b>Vidím reálnou cestu</b><small>Postup spolupráce ukáže, že trenér má systém.</small></article>
              <article><span>03</span><b>Udělám první krok</b><small>Reference, přístup a jasný kontakt sníží obavu napsat.</small></article>
            </div>
          </div>
        </section>

        <section className="website-anatomy section-paper" id="moznosti">
          <div className="section-topline">
            <span>04 / Co může být na vašem webu</span>
            <p>Interaktivní ukázka bez skutečné osoby. Klikněte a projděte si jednotlivé části.</p>
          </div>

          <div className="anatomy-grid">
            <div className="anatomy-nav" role="tablist" aria-label="Části webu trenéra">
              {websiteSections.map((item, index) => (
                <button
                  key={item.number}
                  type="button"
                  role="tab"
                  aria-selected={activeSection === index}
                  className={activeSection === index ? "active" : ""}
                  onClick={() => setActiveSection(index)}
                >
                  <span>{item.number}</span>
                  <b>{item.label}</b>
                  <i aria-hidden="true">→</i>
                </button>
              ))}
            </div>

            <div className="anatomy-stage">
              <div className="anatomy-copy" aria-live="polite">
                <span>{websiteSections[activeSection].number} / {websiteSections[activeSection].label}</span>
                <h2>{websiteSections[activeSection].title}</h2>
                <p>{websiteSections[activeSection].text}</p>
              </div>

              <div className="anatomy-preview" role="tabpanel">
                <div className="browser-bar">
                  <span></span><span></span><span></span>
                  <small>vasweb.cz</small>
                </div>
                <TrainerPreview type={websiteSections[activeSection].preview} />
              </div>
            </div>
          </div>
          <div className="capability-list" aria-label="Další možnosti webu">
            <span>Rezervační systém</span>
            <span>Proměny klientů</span>
            <span>Reference</span>
            <span>Ceník a balíčky</span>
            <span>Online coaching</span>
            <span>Mapa a místo</span>
            <span>Formulář</span>
            <span>Časté otázky</span>
          </div>
        </section>

        <section className="outcomes section-dark">
          <div className="section-topline light-line">
            <span>05 / Co vám dobrý web přinese</span>
            <p>Ne sliby o zázraku. Lepší podmínky pro to, aby se zájemce rozhodl.</p>
          </div>
          <div className="outcome-grid">
            <article>
              <span>01</span>
              <h3>Víc důvěry před prvním kontaktem</h3>
              <p>Profesionální prezentace ukáže, že svoji práci berete vážně a máte jasný systém.</p>
            </article>
            <article>
              <span>02</span>
              <h3>Méně opakovaného vysvětlování</h3>
              <p>Nabídka, průběh spolupráce i odpovědi na časté otázky jsou dostupné kdykoliv.</p>
            </article>
            <article>
              <span>03</span>
              <h3>Přímou cestu k poptávce</h3>
              <p>Každá stránka návštěvníka vede ke konkrétnímu kroku — zprávě, rezervaci nebo formuláři.</p>
            </article>
          </div>
        </section>

        <section className="projects section-light" id="realizace">
          <div className="projects-heading">
            <div>
              <p className="eyebrow dark-eyebrow"><span>06</span> Vybrané realizace</p>
              <h2>Skutečné weby.<br />Různé značky.<br /><em>Žádná jedna šablona.</em></h2>
            </div>
            <p>
              Každý projekt má jinou cílovou skupinu, obsah i charakter. Společné mají
              rychlou orientaci, čistý design a jasný účel.
            </p>
          </div>

          <div className="project-list">
            {projects.map((project) => (
              <a
                className="project-row"
                href={project.url}
                target="_blank"
                rel="noreferrer"
                key={project.url}
              >
                <span className="project-index">{project.index}</span>
                <div className={`project-visual ${"tone" in project ? project.tone : ""}`}>
                  {project.visual === "image" && "image" in project ? (
                    <img src={project.image} alt={project.imageAlt} />
                  ) : (
                    <div className="graphic-project">
                      <small>{project.type}</small>
                      <strong>{project.name}</strong>
                      <i></i>
                    </div>
                  )}
                </div>
                <div className="project-copy">
                  <small>{project.type}</small>
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                  <b>{project.domain} <Arrow /></b>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="deliverables section-paper">
          <div className="deliverables-heading">
            <span>07 / Co ode mě dostanete</span>
            <h2>Nejen hezkou stránku. <em>Promyšlený celek.</em></h2>
          </div>
          <div className="deliverable-list">
            {deliverables.map(([title, text], index) => (
              <article key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="process section-light" id="spoluprace">
          <div className="section-topline">
            <span>08 / Jak probíhá spolupráce</span>
            <p>Bez složitého zadání. Výsledek vidíte dřív, než zaplatíte.</p>
          </div>
          <div className="process-grid">
            <article>
              <span>01</span>
              <div><small>Krátký rozhovor</small><h3>Pochopím vaši službu a cíl.</h3></div>
            </article>
            <article>
              <span>02</span>
              <div><small>Do 10 dnů</small><h3>Uvidíte první návrh struktury a designu.</h3></div>
            </article>
            <article>
              <span>03</span>
              <div><small>Tvorba webu</small><h3>Postavím web a společně doladíme detaily.</h3></div>
            </article>
            <article>
              <span>04</span>
              <div><small>Dokončení a platba</small><h3>Hotový web spustím. Platíte až potom.</h3></div>
            </article>
          </div>
          <div className="process-note">
            <p>Po krátké úvodní SMS si vyjasníme cíl a podklady. První návrh pak připravím do 10 dnů.</p>
            <a className="button button-dark" href={SMS_LINK}>Napsat SMS <span>→</span></a>
          </div>
        </section>

        <section className="pricing section-dark" id="cena">
          <div className="pricing-intro">
            <span>09 / Investice do webu</span>
            <p>Kompletní prezentační web pro fitness trenéra</p>
          </div>
          <div className="pricing-main">
            <div className="price">
              <del>17 999 Kč</del>
              <strong>11 999 Kč</strong>
            </div>
            <p>
              Design na míru, struktura, texty, mobilní verze, prezentace služeb a výsledků,
              kontakt nebo napojení rezervace, zveřejnění webu.
            </p>
          </div>
          <div className="pricing-action">
            <div><b>První návrh do 10 dnů</b><span>Platba až po dokončení webu</span></div>
            <a className="button button-accent" href={SMS_LINK}>Mám zájem o web <span>→</span></a>
          </div>
        </section>

        <section className="faq section-paper">
          <div className="faq-heading">
            <span>10 / Časté otázky</span>
            <h2>Co je dobré vědět před začátkem.</h2>
          </div>
          <div className="faq-list">
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

        <section className="final-cta section-accent">
          <div>
            <span>11 / Další krok</span>
            <h2>Váš web nemusí být větší. Musí být <em>přesvědčivější.</em></h2>
          </div>
          <div className="final-cta-copy">
            <p>Napište mi krátkou SMS. Podíváme se, co by váš web měl ukázat, aby lidé rychleji pochopili vaši hodnotu a chtěli začít právě s vámi.</p>
            <a className="button button-dark" href={SMS_LINK}>Napsat SMS o webu <span>→</span></a>
            <small>Nezávazně · odpovídá Lukáš Keller</small>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-brand">
          <span className="brand-mark">K</span>
          <div><b>Lukáš Keller</b><small>Weby pro trenéry a sportovní projekty</small></div>
        </div>
        <div className="footer-contact">
          <small>Napsat SMS</small>
          <a href={SMS_LINK}>+420 601 507 018</a>
        </div>
        <div className="footer-links">
          <a href="#top">Zpět nahoru ↑</a>
          <span>© 2026</span>
        </div>
      </footer>

      <a className="mobile-cta" href={SMS_LINK}>Napsat SMS o webu <span>→</span></a>
    </div>
  );
}

export default App;
