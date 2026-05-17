"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  {
    copy: "Resumo e próximos passos",
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
    <nav className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => {
        const isActive =
          pathname === item.href ||
          (item.href !== "/painel" && pathname.startsWith(item.href));

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`rounded-[1.4rem] border p-4 transition ${
              isActive
                ? "border-[#8fc09a] bg-[#ecf8ee] shadow-[0_16px_30px_rgba(45,138,75,0.08)]"
                : "border-[#d7e5d8] bg-white hover:border-[#bdd8c2] hover:bg-[#f9fcf9]"
            }`}
          >
            <p className="display-font text-base font-semibold text-[#173424]">
              {item.label}
            </p>
            <p className="mt-2 text-sm leading-6 text-[#5d7564]">{item.copy}</p>
          </Link>
        );
      })}
    </nav>
  );
}
