import { logChatEntry } from "../lib/chatLog.js";

export default async function handler(request, response) {
  response.setHeader("Cache-Control", "no-store");

  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: "method_not_allowed" });
  }

  let body;
  try {
    body = typeof request.body === "string" ? JSON.parse(request.body) : request.body;
  } catch {
    return response.status(400).json({ error: "invalid_json" });
  }

  const allowedActions = new Set(["Navrh zdarma", "WhatsApp"]);
  const action = String(body?.action ?? "");

  if (!allowedActions.has(action)) {
    return response.status(400).json({ error: "invalid_action" });
  }

  await logChatEntry({
    sessionId: body?.sessionId,
    type: "Kliknuti",
    action,
  });

  return response.status(204).end();
}
