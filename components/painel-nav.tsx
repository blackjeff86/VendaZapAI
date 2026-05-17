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
    <nav className="-mx-4 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
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
  );
}
