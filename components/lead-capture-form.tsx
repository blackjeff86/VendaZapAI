"use client";

import { FormEvent, useState } from "react";

const nicheOptions = [
  "Motopeças",
  "Autopeças",
  "Lojas de celular",
  "Material de construção",
  "Informática",
  "Outro",
] as const;

type SubmitState = "idle" | "submitting" | "success" | "error";

export function LeadCaptureForm() {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
      const payload = {
        name: String(formData.get("name") ?? "").trim(),
        storeName: String(formData.get("storeName") ?? "").trim(),
        email: String(formData.get("email") ?? "").trim(),
        niche: String(formData.get("niche") ?? "").trim(),
        phone: String(formData.get("phone") ?? "").trim(),
        website: String(formData.get("website") ?? "").trim(),
      };

    setSubmitState("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(data.message || "Nao foi possivel enviar seu cadastro.");
      }

      setSubmitState("success");
      setMessage("Cadastro recebido. Vamos te chamar para os primeiros acessos.");
      form.reset();
    } catch (error) {
      setSubmitState("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Nao foi possivel enviar seu cadastro agora.",
      );
    }
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-4 sm:max-w-6xl"
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <input
            name="name"
            type="text"
            placeholder="Seu nome"
            required
            className="rounded-full border border-white/10 bg-black/20 px-5 py-3 text-sm text-white outline-none placeholder:text-white/35"
          />
          <input
            name="storeName"
            type="text"
            placeholder="Nome da loja"
            required
            className="rounded-full border border-white/10 bg-black/20 px-5 py-3 text-sm text-white outline-none placeholder:text-white/35"
          />
          <input
            name="email"
            type="email"
            placeholder="Seu melhor e-mail"
            required
            className="rounded-full border border-white/10 bg-black/20 px-5 py-3 text-sm text-white outline-none placeholder:text-white/35"
          />
          <div className="relative rounded-full border border-white/10 bg-black/20 px-5 py-3 text-sm text-white">
            <select
              name="niche"
              required
              defaultValue=""
              className="w-full appearance-none bg-transparent pr-8 text-sm text-white outline-none"
            >
              <option value="" disabled className="bg-[#08100d] text-white/60">
                Nicho
              </option>
              {nicheOptions.map((option) => (
                <option key={option} value={option} className="bg-[#08100d] text-white">
                  {option}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-xs text-white/55">
              ▼
            </span>
          </div>
          <input
            name="phone"
            type="text"
            placeholder="WhatsApp da loja"
            className="rounded-full border border-white/10 bg-black/20 px-5 py-3 text-sm text-white outline-none placeholder:text-white/35"
          />
        </div>
        <input
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden="true"
        />

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={submitState === "submitting"}
            className="rounded-full bg-whatsapp px-6 py-3 text-sm font-semibold text-[#041108] transition hover:bg-mint disabled:cursor-not-allowed disabled:opacity-70"
          >
            {submitState === "submitting" ? "Enviando..." : "Quero meu acesso"}
          </button>
        </div>
      </form>

      <div className="mt-3 flex flex-col gap-2 text-sm text-white/62 sm:flex-row sm:items-center sm:justify-between">
        <p>Primeiros acessos para lojistas que vendem forte pelo WhatsApp.</p>
      </div>

      {message ? (
        <p
          className={`mt-4 text-sm ${
            submitState === "success" ? "text-mint" : "text-red-300"
          }`}
        >
          {message}
        </p>
      ) : null}
    </div>
  );
}
