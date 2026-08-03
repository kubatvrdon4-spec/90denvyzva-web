# Keller — weby pro trenéry

Prodejní web 90denvyzva.cz pro fitness trenéry. Hlavní nabídka začíná bezplatným konkrétním návrhem systému a pokračuje tvorbou webu na míru.

## Spuštění

```bash
npm install
npm run dev
```

Produkční sestavení:

```bash
npm run build
```

## Nasazení na Vercel

Projekt je připravený pro běžný postup GitHub → Vercel. Vercel automaticky rozpozná Vite a použije:

- Build command: `npm run build`
- Output directory: `dist`

## Hlavní cesta zájemce

1. Trenér vyplní čtyři krátké odpovědi.
2. Otevře se WhatsApp s připravenou zprávou na číslo `+420 795 514 816`.
3. Lukáš připraví konkrétní návrh nabídky, cesty klienta a struktury webu.
4. Tlačítko pro domluvení hovoru otevírá SMS na číslo `+420 601 507 018`.

Tento formulář nepotřebuje žádné další nastavení ve Vercelu.

## AI recepční

Na hlavní stránce je vlastní AI asistent, který odpovídá na otázky o nabídce,
ceně a průběhu spolupráce. API klíč je používán pouze serverovou funkcí
`/api/chat` a neposílá se do prohlížeče.

Ve Vercelu nastavte:

- `OPENAI_API_KEY` — tajný API klíč z OpenAI Platform
- `OPENAI_MODEL` — volitelné, výchozí hodnota je `gpt-5.6-luna`

Po přidání hodnot spusťte nové nasazení. Bez API klíče se web normálně načte,
ale chat nabídne přímý kontakt přes WhatsApp.

## Volitelná landing page pro obsah

Po nasazení je lead magnet dostupný na:

`https://www.90denvyzva.cz/obsah-pro-trenery`

PDF je součástí projektu a stahuje se z:

`https://www.90denvyzva.cz/30-dni-obsahu-pro-fitness-trenery.pdf`

### Doručení PDF a nové kontakty

Ve Vercelu je potřeba jednou nastavit tři Environment Variables podle souboru
`.env.example`:

- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `LEADS_TO_EMAIL`

Po odeslání formuláře dostane trenér e-mail s PDF a Lukáš dostane samostatné
upozornění s kontaktem, instagramovým profilem, marketingovým souhlasem a UTM
kampaní.

### Měření reklamy

Pro měření návštěv a získaných kontaktů přidejte ve Vercelu:

- `VITE_META_PIXEL_ID`

Landing page po načtení odešle událost `PageView` a po úspěšném odeslání formuláře
událost `Lead`. Pixel se bez vyplněného ID vůbec nenačítá.

## Důležité kontakty a odkazy

WhatsApp pro bezplatný návrh: `+420 795 514 816`

SMS pro domluvení hovoru: `+420 601 507 018`

Ukázky prací:

- https://www.fk-okula-nyrsko.cz/
- https://tj-nova-ves.cz/
- https://nwm.vercel.app/
- https://www.kuba-marek.cz/
