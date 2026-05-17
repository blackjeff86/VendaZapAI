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
      <nav className="hidden -mx-4 overflow-x-auto px-4 pb-1 sm:mx-0 sm:block sm:px-0">
        <div className="flex min-w-full gap-3 sm:grid sm:grid-cols-2 xl:grid-cols-4">
          {items.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/painel" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`min-w-[15.5rem] rounded-[1.6rem] border p-4 transition sm:min-w-0 ${
                  isActive
                    ? "border-[#7bb98c] bg-[linear-gradient(135deg,#f6fff7_0%,#ddf5e4_100%)] shadow-[0_18px_30px_rgba(45,138,75,0.12)]"
                    : "dashboard-card hover:border-[#bdd8c2] hover:bg-white"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-2xl ${
                      isActive
                        ? "bg-[linear-gradient(180deg,#ffffff_0%,#ebf8ef_100%)] text-[#226f42] shadow-[0_10px_20px_rgba(37,112,63,0.10)]"
                        : "bg-[rgba(255,255,255,0.8)] text-[#6d8574]"
                    }`}
                  >
                    <NavIcon label={item.label} />
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                      isActive
                        ? "bg-[#dff4e3] text-[#226f42]"
                        : "bg-[#f2f7f3] text-[#708678]"
                    }`}
                  >
                    {isActive ? "Ativo" : "Abrir"}
                  </span>
                </div>
                <p className="display-font mt-3 text-base font-semibold text-[#173424]">
                  {item.label}
                </p>
                <p className="mt-2 text-sm leading-6 text-[#5d7564]">{item.copy}</p>
              </Link>
            );
          })}
        </div>
      </nav>

      <nav className="fixed inset-x-0 bottom-3 z-30 px-4 sm:hidden">
        <div className="mx-auto flex max-w-md items-center justify-between rounded-[1.7rem] border border-[#d5e5d7] bg-[rgba(255,255,255,0.92)] p-2 shadow-[0_18px_42px_rgba(19,52,36,0.16)] backdrop-blur-xl">
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
                    ? "bg-[linear-gradient(180deg,#effcf1_0%,#dcf6e4_100%)] text-[#226f42] shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]"
                    : "text-[#5c7363]"
                }`}
              >
                <span className={`flex h-8 w-8 items-center justify-center rounded-2xl ${isActive ? "bg-white/75" : "bg-[rgba(255,255,255,0.55)]"}`}>
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
