"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

type ConversationMessageFormProps = {
  conversationId: string;
};

type SubmitState = "idle" | "submitting" | "error";

export function ConversationMessageForm({
  conversationId,
}: ConversationMessageFormProps) {
  const router = useRouter();
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      autoReply: formData.get("autoReply") === "on",
      content: String(formData.get("content") ?? "").trim(),
    };

    setSubmitState("submitting");
    setMessage("");

    try {
      const response = await fetch(`/api/conversations/${conversationId}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(data.message || "Não foi possível simular a mensagem.");
      }

      setMessage("Mensagem simulada com sucesso.");
      form.reset();
      router.refresh();
    } catch (error) {
      setSubmitState("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Não foi possível simular a mensagem.",
      );
    } finally {
      setSubmitState((current) => (current === "error" ? current : "idle"));
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-3 rounded-[1.2rem] border border-[#dfeadf] bg-[#f9fcf9] p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6a7f6d]">
        Simular mensagem do cliente
      </p>

      <textarea
        name="content"
        rows={3}
        placeholder="Ex.: Tem essa peça para XRE 300 2020?"
        className="w-full rounded-[1rem] border border-[#d8e6d9] bg-white px-4 py-3 text-sm text-[#173424] outline-none placeholder:text-[#8aa08f]"
      />

      <label className="flex items-center gap-3 text-sm text-[#486756]">
        <input
          name="autoReply"
          type="checkbox"
          defaultChecked
          className="h-4 w-4 rounded border-[#b8ceb9] text-[#2d8a4b]"
        />
        Gerar resposta automática da IA após a mensagem
      </label>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={submitState === "submitting"}
          className="rounded-full border border-[#cfe0d0] bg-white px-4 py-2 text-sm font-semibold text-[#1d3a29] transition hover:border-[#8abf93] hover:bg-[#f4fbf4] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {submitState === "submitting" ? "Enviando..." : "Simular mensagem"}
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
    </form>
  );
}
