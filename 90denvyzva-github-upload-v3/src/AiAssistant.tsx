import { FormEvent, useEffect, useRef, useState } from "react";

type ChatMessage = {
  role: "assistant" | "user";
  content: string;
};

const START_MESSAGE: ChatMessage = {
  role: "assistant",
  content:
    "Dobrý den, jsem AI asistent Lukáše Kellera. Můžu vám vysvětlit, co může obsahovat váš web, jak probíhá spolupráce nebo jaký další krok pro vás dává smysl.",
};

const QUICK_QUESTIONS = [
  "Co může web obsahovat?",
  "Kolik web stojí?",
  "Jak probíhá spolupráce?",
] as const;

const WHATSAPP_LINK = `https://wa.me/420795514816?text=${encodeURIComponent(
  "Dobrý den, mám zájem o bezplatný návrh systému pro moje trenérské služby.",
)}`;

export default function AiAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([START_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      window.setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const sendMessage = async (rawMessage: string) => {
    const content = rawMessage.trim();

    if (!content || isLoading) {
      return;
    }

    const nextMessages: ChatMessage[] = [...messages, { role: "user", content }];
    setMessages(nextMessages);
    setInput("");
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages.slice(-8) }),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok || typeof data?.message !== "string") {
        throw new Error(data?.error || "assistant_unavailable");
      }

      setMessages((current) => [
        ...current,
        { role: "assistant", content: data.message },
      ]);
    } catch (requestError) {
      const reason = requestError instanceof Error ? requestError.message : "";
      setError(
        reason === "not_configured"
          ? "AI asistent čeká na aktivaci API klíče ve Vercelu. Zatím mi můžete napsat přímo na WhatsApp."
          : "Asistent je právě nedostupný. Zkuste to prosím znovu nebo mi napište na WhatsApp.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void sendMessage(input);
  };

  return (
    <div className={`ai-assistant ${isOpen ? "is-open" : ""}`}>
      {isOpen && (
        <section className="ai-panel" role="dialog" aria-label="AI asistent Lukáše Kellera">
          <header className="ai-panel-header">
            <div>
              <span>AI RECEPČNÍ</span>
              <b>Poradím s vaším webem</b>
            </div>
            <button type="button" onClick={() => setIsOpen(false)} aria-label="Zavřít asistenta">
              ×
            </button>
          </header>

          <div className="ai-status">
            <span aria-hidden="true"></span>
            Odpovídám podle nabídky Lukáše Kellera
          </div>

          <div className="ai-messages" aria-live="polite">
            {messages.map((message, index) => (
              <div className={`ai-message ai-message-${message.role}`} key={`${message.role}-${index}`}>
                {message.content}
              </div>
            ))}
            {messages.length === 1 && (
              <div className="ai-quick-questions" aria-label="Časté otázky">
                {QUICK_QUESTIONS.map((question) => (
                  <button type="button" onClick={() => void sendMessage(question)} key={question}>
                    {question}<span>→</span>
                  </button>
                ))}
              </div>
            )}
            {isLoading && <div className="ai-thinking">Připravuji odpověď<span>...</span></div>}
            {error && <div className="ai-error">{error}</div>}
            <div ref={messagesEndRef}></div>
          </div>

          <div className="ai-panel-actions">
            <a href="#formular" onClick={() => setIsOpen(false)}>Návrh zdarma</a>
            <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer">WhatsApp ↗</a>
          </div>

          <form className="ai-input" onSubmit={handleSubmit}>
            <label className="sr-only" htmlFor="ai-question">Napište svůj dotaz</label>
            <input
              id="ai-question"
              ref={inputRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              maxLength={500}
              placeholder="Napište svůj dotaz…"
              autoComplete="off"
            />
            <button type="submit" disabled={isLoading || !input.trim()} aria-label="Odeslat dotaz">
              →
            </button>
          </form>
          <small className="ai-disclaimer">AI může udělat chybu. Důležité informace si potvrďte s Lukášem.</small>
        </section>
      )}

      <button
        className="ai-launcher"
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        aria-expanded={isOpen}
        aria-label={isOpen ? "Zavřít AI asistenta" : "Otevřít AI asistenta"}
      >
        <span className="ai-launcher-mark">AI</span>
        <span><b>Zeptat se asistenta</b><small>Odpovídá ihned</small></span>
      </button>
    </div>
  );
}
