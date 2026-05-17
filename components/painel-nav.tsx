"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function NavIcon({ label }: { label: string }) {
  const common = "h-[1.05rem] w-[1.05rem]";

  if (label === "Visão geral") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 13.5L12 5l8 8.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6.5 11.5V20h11V11.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (label === "Conversas") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M6 7.5h12" strokeLinecap="round" />
        <path d="M6 12h8" strokeLinecap="round" />
        <path d="M6 16.5h5" strokeLinecap="round" />
        <path d="M5.5 4h13A1.5 1.5 0 0 1 20 5.5v9A1.5 1.5 0 0 1 18.5 16H11l-4.5 4v-4H5.5A1.5 1.5 0 0 1 4 14.5v-9A1.5 1.5 0 0 1 5.5 4Z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (label === "Catálogo") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M5 6.5h14" strokeLinecap="round" />
        <path d="M5 12h14" strokeLinecap="round" />
        <path d="M5 17.5h14" strokeLinecap="round" />
        <path d="M7 4v16" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M6 18V9.5A2.5 2.5 0 0 1 8.5 7h7A2.5 2.5 0 0 1 18 9.5V18" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9.5 18v-4h5v4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10.5 4.5h3" strokeLinecap="round" />
      <path d="M12 4.5v2" strokeLinecap="round" />
    </svg>
  );
}

const items = [
  {
    copy: "Resumo e ritmo da operação",
    href: "/painel",
    label: "Visão geral",
  },
  {
    copy: "Atendimento e reservas",
    href: "/painel/conversas",
    label: "Conversas",
  },
  {
    copy: "Produtos e estoque",
    href: "/painel/catalogo",
    label: "Catálogo",
  },
  {
    copy: "Canal e testes do webhook",
    href: "/painel/whatsapp",
    label: "WhatsApp",
  },
] as const;

export function PainelNav() {
  const pathname = usePathname();

  return (
    <>
      <nav className="hidden -mx-4 overflow-x-auto px-4 pb-1 md:block md:px-0">
        <div className="flex min-w-full gap-3">
          {items.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/painel" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`min-w-[12rem] rounded-full border px-4 py-3 transition ${
                  isActive
                    ? "border-[#006d3e] bg-[#006d3e] text-white shadow-[0_8px_20px_rgba(0,0,0,0.08)]"
                    : "bg-white text-[#3c4a3f] shadow-[0_4px_12px_rgba(0,0,0,0.04)] hover:border-[#c8d6cc]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`flex h-9 w-9 items-center justify-center rounded-full ${isActive ? "bg-white/15 text-white" : "bg-[#f2f4f5] text-[#006d3e]"}`}>
                    <NavIcon label={item.label} />
                  </span>
                  <div className="min-w-0">
                    <p className={`text-sm font-bold ${isActive ? "text-white" : "text-[#191c1d]"}`}>
                      {item.label}
                    </p>
                    <p className={`truncate text-xs ${isActive ? "text-white/70" : "text-[#6b7b6e]"}`}>
                      {item.copy}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </nav>

      <nav className="fixed inset-x-0 bottom-3 z-30 px-4 sm:hidden">
        <div className="mx-auto flex max-w-md items-center justify-between rounded-t-[1.25rem] rounded-b-[1rem] border border-[#e1e3e4] bg-[rgba(248,250,251,0.92)] p-2 shadow-[0_-4px_20px_rgba(0,0,0,0.04)] backdrop-blur-xl">
          {items.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/painel" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex min-w-0 flex-1 flex-col items-center rounded-[1.2rem] px-2 py-2 text-center transition ${
                  isActive
                    ? "bg-[#00d981]/18 text-[#005931]"
                    : "text-[#6b7b6e]"
                }`}
              >
                <span className={`flex h-8 w-8 items-center justify-center rounded-2xl ${isActive ? "bg-white text-[#006d3e]" : "bg-transparent"}`}>
                  <NavIcon label={item.label} />
                </span>
                <span className="mt-1 text-[11px] font-semibold leading-4">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
