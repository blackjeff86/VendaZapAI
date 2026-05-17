"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

type WhatsappConfigFormProps = {
  initialAccessTokenHint?: string;
  initialBusinessPhoneId?: string;
  initialConnected: boolean;
  initialDisplayNumber?: string;
  initialWebhookReady: boolean;
};

type SubmitState = "idle" | "submitting" | "success" | "error";

export function WhatsappConfigForm({
  initialAccessTokenHint = "",
  initialBusinessPhoneId = "",
  initialConnected,
  initialDisplayNumber = "",
  initialWebhookReady,
}: WhatsappConfigFormProps) {
  const router = useRouter();
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const payload = {
      accessTokenHint: String(formData.get("accessTokenHint") ?? "").trim(),
      businessPhoneId: String(formData.get("businessPhoneId") ?? "").trim(),
      connected: formData.get("connected") === "on",
      displayNumber: String(formData.get("displayNumber") ?? "").trim(),
      webhookReady: formData.get("webhookReady") === "on",
    };

    setSubmitState("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/store/whatsapp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(data.message || "Não foi possível salvar a configuração.");
      }

      setSubmitState("success");
      setMessage("Configuração do WhatsApp salva.");
      router.refresh();
    } catch (error) {
      setSubmitState("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Não foi possível salvar a configuração.",
      );
    } finally {
      setSubmitState((current) => (current === "error" ? current : "idle"));
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <input
          name="displayNumber"
          type="text"
          defaultValue={initialDisplayNumber}
          placeholder="Número exibido no WhatsApp"
          className="w-full rounded-2xl border border-[#d8e6d9] bg-white px-4 py-3 text-sm text-[#173424] outline-none placeholder:text-[#8aa08f]"
        />
        <input
          name="businessPhoneId"
          type="text"
          defaultValue={initialBusinessPhoneId}
          placeholder="Business Phone ID"
          className="w-full rounded-2xl border border-[#d8e6d9] bg-white px-4 py-3 text-sm text-[#173424] outline-none placeholder:text-[#8aa08f]"
        />
        <input
          name="accessTokenHint"
          type="text"
          defaultValue={initialAccessTokenHint}
          placeholder="Referência do token ou observação"
          className="w-full rounded-2xl border border-[#d8e6d9] bg-white px-4 py-3 text-sm text-[#173424] outline-none placeholder:text-[#8aa08f] sm:col-span-2"
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="flex items-center gap-3 rounded-2xl border border-[#dbe8dc] bg-[#f8fcf8] px-4 py-3 text-sm text-[#486756]">
          <input
            name="connected"
            type="checkbox"
            defaultChecked={initialConnected}
            className="h-4 w-4 rounded border-[#b8ceb9] text-[#2d8a4b]"
          />
          Número conectado
        </label>
        <label className="flex items-center gap-3 rounded-2xl border border-[#dbe8dc] bg-[#f8fcf8] px-4 py-3 text-sm text-[#486756]">
          <input
            name="webhookReady"
            type="checkbox"
            defaultChecked={initialWebhookReady}
            className="h-4 w-4 rounded border-[#b8ceb9] text-[#2d8a4b]"
          />
          Webhook preparado
        </label>
      </div>

      <button
        type="submit"
        disabled={submitState === "submitting"}
        className="w-full rounded-2xl bg-[#2d8a4b] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#25713e] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        {submitState === "submitting" ? "Salvando..." : "Salvar configuração"}
      </button>

      {message ? (
        <p
          className={`text-sm ${
            submitState === "error" ? "text-red-500" : "text-[#2d8a4b]"
          }`}
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
