const PDF_URL =
  "https://www.90denvyzva.cz/30-dni-obsahu-pro-fitness-trenery.pdf";

const escapeHtml = (value = "") =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const sendEmail = async ({ apiKey, from, to, subject, html, replyTo }) => {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject,
      html,
      ...(replyTo ? { reply_to: replyTo } : {}),
    }),
  });

  if (!response.ok) {
    throw new Error(`Email provider returned ${response.status}`);
  }
};

export default async function handler(request, response) {
  response.setHeader("Cache-Control", "no-store");

  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ ok: false });
  }

  const body =
    typeof request.body === "string" ? JSON.parse(request.body) : request.body;

  const name = String(body?.name ?? "").trim();
  const email = String(body?.email ?? "").trim().toLowerCase();
  const instagram = String(body?.instagram ?? "").trim();
  const honeypot = String(body?.website ?? "").trim();
  const privacyAcknowledged = body?.privacyAcknowledged === true;
  const marketingConsent = body?.marketingConsent === true;
  const source = body?.source ?? {};

  if (honeypot) {
    return response.status(200).json({ ok: true });
  }

  if (
    name.length < 2 ||
    name.length > 80 ||
    email.length > 160 ||
    instagram.length > 100 ||
    !privacyAcknowledged ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    return response.status(400).json({ ok: false, error: "invalid_input" });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const leadsTo = process.env.LEADS_TO_EMAIL;

  if (!apiKey || !from || !leadsTo) {
    return response.status(503).json({ ok: false, error: "not_configured" });
  }

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeInstagram = escapeHtml(instagram || "neuveden");
  const safeUtmSource = escapeHtml(source.utmSource || "neuvedeno");
  const safeUtmMedium = escapeHtml(source.utmMedium || "neuvedeno");
  const safeCampaign = escapeHtml(source.utmCampaign || "bez UTM kampaně");
  const safeContent = escapeHtml(source.utmContent || "neuvedeno");
  const safePage = escapeHtml(source.page || "neuvedeno");
  const safeReferrer = escapeHtml(source.referrer || "neuveden");
  const receivedAt = escapeHtml(new Date().toISOString());

  try {
    await Promise.all([
      sendEmail({
        apiKey,
        from,
        to: email,
        replyTo: leadsTo,
        subject: "30 dní obsahu pro fitness trenéry — vaše PDF",
        html: `
          <div style="font-family:Arial,sans-serif;max-width:620px;margin:0 auto;color:#111210">
            <p style="color:#d94218;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.08em">PDF zdarma</p>
            <h1 style="font-size:34px;line-height:1.05;margin:18px 0">Dobrý den, ${safeName}, váš plán je připravený.</h1>
            <p style="font-size:16px;line-height:1.65;color:#55564f">Uvnitř najdete 30 konkrétních témat, hooky, CTA, kontrolu profilu a jednoduchou cestu od Instagramu k poptávce.</p>
            <p style="margin:30px 0">
              <a href="${PDF_URL}" style="display:inline-block;padding:16px 20px;background:#ff6338;color:#111210;font-weight:700;text-decoration:none">Stáhnout PDF</a>
            </p>
            <p style="font-size:14px;line-height:1.6;color:#696961">Pokud by odkaz nefungoval, otevřete:<br><a href="${PDF_URL}">${PDF_URL}</a></p>
            <hr style="border:0;border-top:1px solid #d1cec5;margin:34px 0">
            <p style="font-size:13px;color:#77776f">Lukáš Keller · weby a obsahové systémy pro trenéry<br><a href="https://www.90denvyzva.cz/">90denvyzva.cz</a></p>
          </div>
        `,
      }),
      sendEmail({
        apiKey,
        from,
        to: leadsTo,
        replyTo: email,
        subject: `Nový lead z PDF [${source.utmContent || "bez varianty"}]: ${name}`,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:620px;color:#111210">
            <h1>Nový kontakt z lead magnetu</h1>
            <p><b>Jméno:</b> ${safeName}</p>
            <p><b>E-mail:</b> ${safeEmail}</p>
            <p><b>Instagram:</b> ${safeInstagram}</p>
            <p><b>Marketingový souhlas:</b> ${marketingConsent ? "ANO" : "NE"}</p>
            <p><b>UTM zdroj:</b> ${safeUtmSource}</p>
            <p><b>UTM médium:</b> ${safeUtmMedium}</p>
            <p><b>UTM kampaň:</b> ${safeCampaign}</p>
            <p><b>UTM obsah:</b> ${safeContent}</p>
            <p><b>Stránka:</b> ${safePage}</p>
            <p><b>Referrer:</b> ${safeReferrer}</p>
            <p><b>Přijato:</b> ${receivedAt}</p>
          </div>
        `,
      }),
    ]);

    return response.status(200).json({ ok: true });
  } catch {
    return response.status(502).json({ ok: false, error: "delivery_failed" });
  }
}
