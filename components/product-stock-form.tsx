"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

type ProductStockFormProps = {
  initialActive: boolean;
  initialPrice: number;
  initialStockQuantity: number;
  productId: string;
};

type SubmitState = "idle" | "submitting" | "error";

export function ProductStockForm({
  initialActive,
  initialPrice,
  initialStockQuantity,
  productId,
}: ProductStockFormProps) {
  const router = useRouter();
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");
  const [price, setPrice] = useState(initialPrice.toFixed(2));
  const [stockQuantity, setStockQuantity] = useState(String(initialStockQuantity));
  const [active, setActive] = useState(initialActive);

  function adjustStock(delta: number) {
    const currentValue = Number(stockQuantity || 0);
    const nextValue = Math.max(0, currentValue + delta);
    setStockQuantity(String(nextValue));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const payload = {
      active,
      price: Number(price),
      stockQuantity: Number(stockQuantity),
    };

    setSubmitState("submitting");
    setMessage("");

    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(data.message || "Não foi possível atualizar o produto.");
      }

      setMessage("Atualizado.");
      router.refresh();
    } catch (error) {
      setSubmitState("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Não foi possível atualizar o produto.",
      );
    } finally {
      setSubmitState((current) => (current === "error" ? current : "idle"));
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="space-y-2">
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6c8573]">
            Preço
          </span>
          <input
            name="price"
            type="number"
            min="0"
            step="0.01"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            className="w-full rounded-xl border border-[#d8e6d9] bg-white px-3 py-2.5 text-sm text-[#173424] outline-none transition focus:border-[#8ac798]"
          />
        </label>
        <label className="space-y-2">
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6c8573]">
            Estoque
          </span>
          <input
            name="stockQuantity"
            type="number"
            min="0"
            step="1"
            value={stockQuantity}
            onChange={(event) => setStockQuantity(event.target.value)}
            className="w-full rounded-xl border border-[#d8e6d9] bg-white px-3 py-2.5 text-sm text-[#173424] outline-none transition focus:border-[#8ac798]"
          />
        </label>
      </div>

      <div className="flex flex-wrap gap-2">
        {[
          ["-1", -1],
          ["+1", 1],
          ["+5", 5],
        ].map(([label, delta]) => (
          <button
            key={label}
            type="button"
            onClick={() => adjustStock(Number(delta))}
            className="dashboard-chip rounded-full px-3 py-1.5 text-xs font-semibold text-[#30563d] transition hover:border-[#8abf93] hover:bg-white"
          >
            {label} estoque
          </button>
        ))}
      </div>

      <label className="flex items-center gap-3 text-sm text-[#486756]">
        <input
          name="active"
          type="checkbox"
          checked={active}
          onChange={(event) => setActive(event.target.checked)}
          className="h-4 w-4 rounded border-[#b8ceb9] text-[#2d8a4b]"
        />
        Produto ativo no catálogo
      </label>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={submitState === "submitting"}
          className="rounded-full bg-[#173424] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#214932] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {submitState === "submitting" ? "Salvando..." : "Salvar ajustes"}
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
