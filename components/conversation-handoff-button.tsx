"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type ConversationHandoffButtonProps = {
  conversationId: string;
  humanActive: boolean;
};

export function ConversationHandoffButton({
  conversationId,
  humanActive,
}: ConversationHandoffButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function handleClick() {
    setIsLoading(true);

    try {
      await fetch(`/api/conversations/${conversationId}/handoff`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ humanActive: !humanActive }),
      });

      router.refresh();
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isLoading}
      className="rounded-full border border-[#cfe0d0] bg-white px-4 py-2 text-sm font-semibold text-[#1d3a29] transition hover:border-[#8abf93] hover:bg-[#f4fbf4] disabled:cursor-not-allowed disabled:opacity-70"
    >
      {isLoading
        ? "Salvando..."
        : humanActive
          ? "Voltar para a IA"
          : "Assumir atendimento"}
    </button>
  );
}
