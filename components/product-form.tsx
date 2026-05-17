"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

type SubmitState = "idle" | "submitting" | "success" | "error";

export function ProductForm() {
  const router = useRouter();
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      category: String(formData.get("category") ?? "").trim(),
      compatibility: String(formData.get("compatibility") ?? "").trim(),
      description: String(formData.get("description") ?? "").trim(),
      name: String(formData.get("name") ?? "").trim(),
      price: Number(formData.get("price") ?? 0),
      sku: String(formData.get("sku") ?? "").trim(),
      stockQuantity: Number(formData.get("stockQuantity") ?? 0),
    };

    setSubmitState("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(data.message || "Não foi possível salvar o produto.");
      }

      setSubmitState("success");
      setMessage("Produto salvo com sucesso.");
      form.reset();
      router.refresh();
    } catch (error) {
      setSubmitState("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Não foi possível salvar o produto.",
      );
    } finally {
      setSubmitState((current) => (current === "error" ? current : "idle"));
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <input
          name="name"
          type="text"
          placeholder="Nome do produto"
          required
          className="w-full rounded-2xl border border-[#d8e6d9] bg-white px-4 py-3 text-sm text-[#173424] outline-none placeholder:text-[#8aa08f]"
        />
        <input
          name="category"
          type="text"
          placeholder="Categoria"
          required
          className="w-full rounded-2xl border border-[#d8e6d9] bg-white px-4 py-3 text-sm text-[#173424] outline-none placeholder:text-[#8aa08f]"
        />
        <input
          name="price"
          type="number"
          min="0"
          step="0.01"
          placeholder="Preço"
          required
          className="w-full rounded-2xl border border-[#d8e6d9] bg-white px-4 py-3 text-sm text-[#173424] outline-none placeholder:text-[#8aa08f]"
        />
        <input
          name="stockQuantity"
          type="number"
          min="0"
          step="1"
          placeholder="Estoque atual"
          required
          className="w-full rounded-2xl border border-[#d8e6d9] bg-white px-4 py-3 text-sm text-[#173424] outline-none placeholder:text-[#8aa08f]"
        />
        <input
          name="sku"
          type="text"
          placeholder="SKU ou código interno"
          className="w-full rounded-2xl border border-[#d8e6d9] bg-white px-4 py-3 text-sm text-[#173424] outline-none placeholder:text-[#8aa08f]"
        />
        <input
          name="compatibility"
          type="text"
          placeholder="Compatibilidade (opcional)"
          className="w-full rounded-2xl border border-[#d8e6d9] bg-white px-4 py-3 text-sm text-[#173424] outline-none placeholder:text-[#8aa08f]"
        />
      </div>

      <textarea
        name="description"
        placeholder="Descrição curta do produto"
        rows={4}
        className="w-full rounded-[1.4rem] border border-[#d8e6d9] bg-white px-4 py-3 text-sm text-[#173424] outline-none placeholder:text-[#8aa08f]"
      />

      <button
        type="submit"
        disabled={submitState === "submitting"}
        className="w-full rounded-2xl bg-[#2d8a4b] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#25713e] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        {submitState === "submitting" ? "Salvando..." : "Cadastrar produto"}
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
