"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

type ReserveProductFormProps = {
  conversationId: string;
  productId: string;
  productName: string;
};

type SubmitState = "idle" | "submitting" | "error";

export function ReserveProductForm({
  conversationId,
  productId,
  productName,
}: ReserveProductFormProps) {
  const router = useRouter();
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      pickupName: String(formData.get("pickupName") ?? "").trim(),
      pickupWindow: String(formData.get("pickupWindow") ?? "").trim(),
      productId,
    };

    setSubmitState("submitting");
    setMessage("");

    try {
      const response = await fetch(`/api/conversations/${conversationId}/reserve`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(data.message || "Não foi possível criar a reserva.");
      }

      setMessage("Reserva criada com sucesso.");
      form.reset();
      router.refresh();
    } catch (error) {
      setSubmitState("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Não foi possível criar a reserva.",
      );
    } finally {
      setSubmitState((current) => (current === "error" ? current : "idle"));
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-4 space-y-3 rounded-[1.2rem] border border-[#d8eadb] bg-[#f7fbf7] p-4"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2d8a4b]">
        Criar reserva de {productName}
      </p>

      <div className="grid gap-3 sm:grid-cols-2">
        <input
          name="pickupName"
          type="text"
          required
          placeholder="Nome para retirada"
          className="w-full rounded-[1rem] border border-[#d8e6d9] bg-white px-4 py-3 text-sm text-[#173424] outline-none placeholder:text-[#8aa08f]"
        />
        <input
          name="pickupWindow"
          type="text"
          required
          placeholder="Horário ou período de retirada"
          className="w-full rounded-[1rem] border border-[#d8e6d9] bg-white px-4 py-3 text-sm text-[#173424] outline-none placeholder:text-[#8aa08f]"
        />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={submitState === "submitting"}
          className="rounded-full bg-[#2d8a4b] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#25713e] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {submitState === "submitting" ? "Reservando..." : "Confirmar reserva"}
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
