"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type ReserveProductButtonProps = {
  conversationId: string;
  productId: string;
};

export function ReserveProductButton({
  conversationId,
  productId,
}: ReserveProductButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleClick() {
    setIsLoading(true);
    setMessage("");

    try {
      const response = await fetch(`/api/conversations/${conversationId}/reserve`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      });

      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(data.message || "Não foi possível reservar o produto.");
      }

      setMessage("Reserva criada.");
      router.refresh();
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Não foi possível reservar o produto.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="mt-4 flex flex-wrap items-center gap-3">
      <button
        type="button"
        onClick={handleClick}
        disabled={isLoading}
        className="rounded-full bg-[#2d8a4b] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#25713e] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isLoading ? "Reservando..." : "Reservar produto"}
      </button>

      {message ? (
        <p className={`text-sm ${message === "Reserva criada." ? "text-[#2d8a4b]" : "text-red-500"}`}>
          {message}
        </p>
      ) : null}
    </div>
  );
}
