"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

type ConversationReplyFormProps = {
  conversationId: string;
};

type SubmitState = "idle" | "submitting" | "error";

export function ConversationReplyForm({
  conversationId,
}: ConversationReplyFormProps) {
  const router = useRouter();
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      author: "humano",
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
        throw new Error(data.message || "Não foi possível enviar a resposta.");
      }

      setMessage("Resposta enviada no painel.");
      form.reset();
      router.refresh();
    } catch (error) {
      setSubmitState("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Não foi possível enviar a resposta.",
      );
    } finally {
      setSubmitState((current) => (current === "error" ? current : "idle"));
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-3 rounded-[1.2rem] border border-[#dfeadf] bg-white p-4"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6a7f6d]">
        Responder manualmente
      </p>

      <textarea
        name="content"
        rows={3}
        required
        placeholder="Ex.: Consigo separar para você ainda hoje. Quer retirar em qual horário?"
        className="w-full rounded-[1rem] border border-[#d8e6d9] bg-[#fbfefb] px-4 py-3 text-sm text-[#173424] outline-none placeholder:text-[#8aa08f]"
      />

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={submitState === "submitting"}
          className="rounded-full bg-[#173424] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#214932] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {submitState === "submitting" ? "Enviando..." : "Enviar resposta"}
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
