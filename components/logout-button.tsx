"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function LogoutButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogout() {
    setIsLoading(true);

    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });

      router.push("/entrar");
      router.refresh();
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={isLoading}
      className="rounded-full border border-[#b9d3bd] bg-white px-4 py-2 text-sm font-semibold text-[#1f3a28] transition hover:border-[#8abf93] hover:bg-[#f3fbf4] disabled:cursor-not-allowed disabled:opacity-70"
    >
      {isLoading ? "Saindo..." : "Sair"}
    </button>
  );
}
