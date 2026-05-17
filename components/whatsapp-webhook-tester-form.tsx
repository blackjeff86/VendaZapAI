"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

type WhatsappWebhookTesterFormProps = {
  businessPhoneId?: string;
  initialDisplayNumber?: string;
};

type SubmitState = "idle" | "submitting" | "error";

export function WhatsappWebhookTesterForm({
  businessPhoneId = "",
  initialDisplayNumber = "",
}: WhatsappWebhookTesterFormProps) {
  const router = useRouter();
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");

  const canSimulate = businessPhoneId.trim().length > 0;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!canSimulate) {
      setMessage("Preencha o Business Phone ID antes de testar o webhook.");
      setSubmitState("error");
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    const clientName = String(formData.get("clientName") ?? "").trim();
    const clientPhone = String(formData.get("clientPhone") ?? "").trim();
    const content = String(formData.get("content") ?? "").trim();

    const payload = {
      entry: [
        {
          changes: [
            {
              value: {
                contacts: [
                  {
                    profile: {
                      name: clientName || clientPhone,
                    },
                    wa_id: clientPhone,
                  },
                ],
                messages: [
                  {
                    from: clientPhone,
                    text: {
                      body: content,
                    },
                    type: "text",
                  },
                ],
                metadata: {
                  phone_number_id: businessPhoneId,
                },
              },
            },
          ],
        },
      ],
    };

    setSubmitState("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/whatsapp/webhook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(data.message || "Não foi possível simular o webhook.");
      }

      setMessage(data.message || "Webhook simulado com sucesso.");
      form.reset();
      router.refresh();
    } catch (error) {
      setSubmitState("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Não foi possível simular o webhook.",
      );
    } finally {
      setSubmitState((current) => (current === "error" ? current : "idle"));
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="dashboard-tint-emerald mt-5 space-y-4 rounded-[1.6rem] border border-[#dce8dd] p-4 sm:p-5"
    >
      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2d8a4b]">
          Simulador de webhook
        </p>
        <p className="text-sm leading-7 text-[#58705f]">
          Envie uma mensagem simulada para a rota do WhatsApp e veja a conversa
          nascer ou atualizar no painel usando a mesma entrada da operação real.
        </p>
      </div>

      <div className="dashboard-chip rounded-[1rem] px-4 py-3 text-sm text-[#58705f]">
        Número configurado:{" "}
        <span className="font-semibold text-[#173424]">
          {initialDisplayNumber || "Ainda não informado"}
        </span>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#66806f]">
            Cliente
          </span>
          <input
            name="clientName"
            type="text"
            placeholder="Nome do cliente"
            className="w-full rounded-[1rem] border border-[#d8e6d9] bg-[rgba(255,255,255,0.92)] px-4 py-3 text-sm text-[#173424] outline-none transition focus:border-[#8ac798] focus:bg-white placeholder:text-[#8aa08f]"
          />
        </label>
        <label className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#66806f]">
            WhatsApp
          </span>
          <input
            name="clientPhone"
            type="text"
            required
            placeholder="WhatsApp do cliente"
            className="w-full rounded-[1rem] border border-[#d8e6d9] bg-[rgba(255,255,255,0.92)] px-4 py-3 text-sm text-[#173424] outline-none transition focus:border-[#8ac798] focus:bg-white placeholder:text-[#8aa08f]"
          />
        </label>
      </div>

      <label className="space-y-2">
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#66806f]">
          Mensagem de teste
        </span>
        <textarea
          name="content"
          rows={3}
          required
          placeholder="Ex.: Boa tarde, vocês têm correia da XRE 300 2020?"
          className="w-full rounded-[1rem] border border-[#d8e6d9] bg-[rgba(255,255,255,0.92)] px-4 py-3 text-sm text-[#173424] outline-none transition focus:border-[#8ac798] focus:bg-white placeholder:text-[#8aa08f]"
        />
      </label>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={submitState === "submitting" || !canSimulate}
          className="rounded-full bg-[#173424] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#214932] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitState === "submitting" ? "Simulando..." : "Simular entrada do WhatsApp"}
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
      </div>

      {!canSimulate ? (
        <p className="text-sm text-[#8a6f20]">
          Preencha o <span className="font-semibold">Business Phone ID</span>{" "}
          acima para habilitar este teste.
        </p>
      ) : null}
    </form>
  );
}
