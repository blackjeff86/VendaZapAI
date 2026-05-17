import Link from "next/link";
import { DashboardOverviewSection } from "@/components/dashboard-overview-section";
import { getDashboardData } from "@/lib/dashboard";

export default async function DashboardPage() {
  const { onboardingCompleted } = await getDashboardData();

  return (
    <div className="space-y-6 sm:space-y-8">
      <DashboardOverviewSection onboardingCompleted={onboardingCompleted} />

      <section className="grid gap-4 md:grid-cols-3">
        {[
          [
            "Conversas",
            "Acompanhe fila, prioridades e reservas em um fluxo mais rápido.",
            "/painel/conversas",
            "Abrir central",
          ],
          [
            "Catálogo",
            "Cadastre produtos e ajuste estoque sem travar a rotina da loja.",
            "/painel/catalogo",
            "Abrir catálogo",
          ],
          [
            "WhatsApp",
            "Prepare o canal e valide a entrada de mensagens antes da operação real.",
            "/painel/whatsapp",
            "Abrir canal",
          ],
        ].map(([title, copy, href, cta]) => (
          <div
            key={title}
            className="rounded-[1.8rem] border border-[#d9e6da] bg-[linear-gradient(180deg,#ffffff_0%,#fbfefb_100%)] p-5 shadow-[0_16px_34px_rgba(26,74,43,0.05)]"
          >
            <p className="display-font text-xl font-semibold text-[#173424]">{title}</p>
            <p className="mt-3 text-sm leading-7 text-[#5f7766]">{copy}</p>
            <Link
              href={href}
              className="mt-5 inline-flex rounded-full border border-[#cfe0d0] bg-[#f8fcf8] px-4 py-2 text-sm font-semibold text-[#1d3a29] transition hover:border-[#8abf93] hover:bg-white"
            >
              {cta}
            </Link>
          </div>
        ))}
      </section>

      <section className="rounded-[2rem] border border-[#dce8dd] bg-[linear-gradient(135deg,#eff7f0_0%,#f9fcf9_100%)] p-6 sm:p-7">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#2d8a4b]">
              Direção da experiência
            </p>
            <h2 className="display-font mt-3 text-2xl font-semibold tracking-tight text-[#173424]">
              O painel foi refinado para priorizar ação rápida em telas menores.
            </h2>
          </div>
          <div className="rounded-[1.3rem] border border-[#cde0d0] bg-white px-4 py-3 text-sm text-[#5a7361]">
            Próxima camada: métricas mais fortes, automações e conexão real
          </div>
        </div>
      </section>
    </div>
  );
}
