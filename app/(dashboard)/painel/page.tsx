import Link from "next/link";
import { DashboardOverviewSection } from "@/components/dashboard-overview-section";
import { getDashboardData } from "@/lib/dashboard";

function ModuleIcon({ title }: { title: string }) {
  const common = "h-[1.1rem] w-[1.1rem]";

  if (title === "Conversas") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.9">
        <path d="M6 8h12" strokeLinecap="round" />
        <path d="M6 12.25h8.5" strokeLinecap="round" />
        <path d="M6 16.5h5.5" strokeLinecap="round" />
        <path d="M5.25 4.75h13.5A1.75 1.75 0 0 1 20.5 6.5v8a1.75 1.75 0 0 1-1.75 1.75h-7l-4.25 3.5v-3.5h-2.25A1.75 1.75 0 0 1 3.5 14.5v-8a1.75 1.75 0 0 1 1.75-1.75Z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (title === "Catálogo") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.9">
        <path d="M6 5.5h12" strokeLinecap="round" />
        <path d="M6 10.5h12" strokeLinecap="round" />
        <path d="M6 15.5h7" strokeLinecap="round" />
        <path d="M5.5 4h13a1.5 1.5 0 0 1 1.5 1.5v13A1.5 1.5 0 0 1 18.5 20h-13A1.5 1.5 0 0 1 4 18.5v-13A1.5 1.5 0 0 1 5.5 4Z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.9">
      <path d="M6 18V9.75A2.75 2.75 0 0 1 8.75 7h6.5A2.75 2.75 0 0 1 18 9.75V18" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 18v-4h4v4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 4.5v2.5" strokeLinecap="round" />
      <path d="M9.75 4.5h4.5" strokeLinecap="round" />
    </svg>
  );
}

export default async function DashboardPage() {
  const {
    activeProductsCount,
    conversations,
    humanConversationsCount,
    onboardingCompleted,
    reservedConversationsCount,
    session,
  } = await getDashboardData();

  return (
    <div className="space-y-6 sm:space-y-8">
      <DashboardOverviewSection
        activeProductsCount={activeProductsCount}
        conversationsCount={conversations.length}
        humanConversationsCount={humanConversationsCount}
        onboardingCompleted={onboardingCompleted}
        reservedConversationsCount={reservedConversationsCount}
        userName={session.name}
      />

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
        ].map(([title, copy, href, cta], index) => (
          <div
            key={title}
            className={`dashboard-card rounded-xl border border-[#bacbbc]/30 p-4 ${
              index === 0
                ? "bg-[#ffffff]"
                : index === 2
                  ? "bg-[#ffffff]"
                  : "bg-[#ffffff]"
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <span
                className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                  index === 0
                    ? "bg-[#eafbf3] text-[#006d3e]"
                    : index === 2
                      ? "bg-[#edf9ff] text-[#00668a]"
                      : "bg-[#f2f4f5] text-[#3c4a3f]"
                }`}
              >
                <ModuleIcon title={title} />
              </span>
              <span className="rounded-full bg-[#f2f4f5] px-3 py-1 text-[11px] font-semibold text-[#3c4a3f]">
                Abrir módulo
              </span>
            </div>
            <p className="mt-4 text-base font-bold text-[#191c1d]">{title}</p>
            <p className="mt-2 text-sm leading-6 text-[#3c4a3f]">{copy}</p>
            <Link
              href={href}
              className="mt-4 inline-flex rounded-xl border border-[#bacbbc]/30 bg-[#ffffff] px-4 py-2.5 text-sm font-semibold text-[#006d3e] transition hover:bg-[#f8fafb]"
            >
              {cta}
            </Link>
          </div>
        ))}
      </section>

      <section className="dashboard-card rounded-xl border border-[#bacbbc]/30 p-4 sm:p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#006d3e]">
              Direção da experiência
            </p>
            <h2 className="mt-2 text-lg font-bold tracking-[-0.02em] text-[#191c1d]">
              O painel agora segue uma lógica mais mobile, clara e operacional.
            </h2>
          </div>
          <div className="rounded-xl border border-[#bacbbc]/30 bg-[#f2f4f5] px-4 py-3 text-sm text-[#3c4a3f]">
            Próxima camada: métricas mais fortes, automações e conexão real
          </div>
        </div>
      </section>
    </div>
  );
}
