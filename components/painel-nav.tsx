"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  {
    copy: "Resumo e ritmo da operação",
    href: "/painel",
    kicker: "00",
    label: "Visão geral",
  },
  {
    copy: "Atendimento e reservas",
    href: "/painel/conversas",
    kicker: "01",
    label: "Conversas",
  },
  {
    copy: "Produtos e estoque",
    href: "/painel/catalogo",
    kicker: "02",
    label: "Catálogo",
  },
  {
    copy: "Canal e testes do webhook",
    href: "/painel/whatsapp",
    kicker: "03",
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
                    ? "border-[#7bb98c] bg-[linear-gradient(135deg,#f4fff5_0%,#e8f7eb_100%)] shadow-[0_18px_30px_rgba(45,138,75,0.12)]"
                    : "border-[#d7e5d8] bg-[rgba(255,255,255,0.78)] hover:border-[#bdd8c2] hover:bg-white"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#78a086]">
                    {item.kicker}
                  </p>
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
                  isActive ? "bg-[#ecf8ee] text-[#226f42]" : "text-[#5c7363]"
                }`}
              >
                <span className="text-[10px] font-semibold uppercase tracking-[0.16em]">
                  {item.kicker}
                </span>
                <span className="mt-1 text-xs font-semibold leading-4">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
