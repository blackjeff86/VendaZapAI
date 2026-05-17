"use client";

import { usePathname } from "next/navigation";

const contentByPath = {
  "/painel": {
    subtitle: "Bem-vindo de volta! Aqui está o resumo da sua loja hoje.",
    title: "Painel Inicial",
  },
  "/painel/catalogo": {
    subtitle: "Gerencie seu catálogo, estoque e produtos com visão comercial.",
    title: "Meu Catálogo",
  },
  "/painel/conversas": {
    subtitle: "Acompanhe as conversas, a IA e as oportunidades de venda em tempo real.",
    title: "Central de Conversas",
  },
  "/painel/whatsapp": {
    subtitle: "Configure o canal, teste o webhook e acompanhe a ativação da operação.",
    title: "Ajustes do WhatsApp",
  },
} as const;

export function DashboardTopbar() {
  const pathname = usePathname();
  const content =
    contentByPath[pathname as keyof typeof contentByPath] ?? contentByPath["/painel"];

  return (
    <header className="sticky top-0 z-40 border-b border-[#bbcbb9]/30 bg-[rgba(249,249,255,0.86)] backdrop-blur-md">
      <div className="container-shell flex items-center justify-between gap-6 py-3 md:py-3.5">
        <div>
          <h2 className="text-[1.72rem] font-bold tracking-[-0.03em] text-[#111c2d]">
            {content.title}
          </h2>
          <p className="mt-0.5 text-sm text-[#3c4a3d]">{content.subtitle}</p>
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <div className="flex items-center gap-2 rounded-full bg-[#dee8ff] px-4 py-2 text-xs font-semibold text-[#006d2f]">
            <span className="h-2.5 w-2.5 rounded-full bg-[#25d366]" />
            IA Operando em Tempo Real
          </div>
        </div>
      </div>
    </header>
  );
}
