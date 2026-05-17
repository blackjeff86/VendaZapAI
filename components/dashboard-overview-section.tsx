import Link from "next/link";
import { PerformanceChart } from "@/components/performance-chart";

type DashboardOverviewSectionProps = {
  activeProductsCount: number;
  conversationsCount: number;
  humanConversationsCount: number;
  onboardingCompleted: boolean;
  reservedConversationsCount: number;
  userName: string;
};

const chartBars = [40, 65, 52, 86, 100, 74, 58];
const chartLabels = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"];
const chartValues = ["R$ 420", "R$ 680", "R$ 510", "R$ 890", "R$ 1.020", "R$ 760", "R$ 590"];

function OverviewIcon({ title }: { title: string }) {
  const common = "h-4 w-4";

  if (title === "Conversas") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.9">
        <path d="M6 8h12" strokeLinecap="round" />
        <path d="M6 12h8" strokeLinecap="round" />
        <path d="M6 16h5" strokeLinecap="round" />
      </svg>
    );
  }

  if (title === "Reservas") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.9">
        <path d="M7.5 7h9" strokeLinecap="round" />
        <path d="M6.5 11h11" strokeLinecap="round" />
        <path d="M8.5 15h7" strokeLinecap="round" />
      </svg>
    );
  }

  if (title === "Produtos ativos") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.9">
        <rect x="5.5" y="7" width="13" height="10" rx="2.5" />
        <path d="M9 11h6" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.9">
      <path d="m6 15 3-3 2 2 5-6 2 2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function DashboardOverviewSection({
  activeProductsCount,
  conversationsCount,
  humanConversationsCount,
  onboardingCompleted,
  reservedConversationsCount,
  userName,
}: DashboardOverviewSectionProps) {
  return (
    <section className="space-y-4">
      <div className="flex flex-col gap-1">
        <h2 className="text-[1.75rem] font-bold tracking-[-0.03em] text-[#191c1d]">
          Olá, {userName}! 👋
        </h2>
        <p className="text-sm text-[#3c4a3f]">
          Sua loja está ativa e pronta para vender mais pelo WhatsApp.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {[
          ["Conversas", String(conversationsCount), "#00668a"],
          ["Reservas", String(reservedConversationsCount), "#1c695f"],
          ["Produtos ativos", String(activeProductsCount), "#006d3e"],
          [
            "Status",
            onboardingCompleted ? "OK" : "Pendente",
            onboardingCompleted ? "#006d3e" : "#ba1a1a",
          ],
        ].map(([title, value, color]) => (
          <div
            key={title}
            className="dashboard-card rounded-xl border border-[#bacbbc]/30 p-4 transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_28px_rgba(0,0,0,0.06)]"
          >
            <div className="flex items-start justify-between">
              <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#3c4a3f]">
                {title}
              </p>
              <span
                className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#f2f4f5]"
                style={{ color }}
              >
                <OverviewIcon title={title} />
              </span>
            </div>
            <p className="mt-3 text-lg font-bold text-[#191c1d]">{value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
        <section className="dashboard-card rounded-xl border border-[#bacbbc]/30 p-4 transition duration-200 hover:shadow-[0_16px_30px_rgba(0,0,0,0.05)]">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h3 className="text-base font-bold text-[#191c1d]">Desempenho semanal</h3>
            <span className="rounded-full bg-[#00d981]/12 px-3 py-1 text-[11px] font-semibold text-[#005931]">
              +12% vs ontem
            </span>
          </div>
          <PerformanceChart
            bars={chartBars}
            compact
            labels={chartLabels}
            values={chartValues}
          />
        </section>

        <section className="dashboard-card rounded-xl border border-[#bacbbc]/30 p-4 transition duration-200 hover:shadow-[0_16px_30px_rgba(0,0,0,0.05)]">
          <h3 className="mb-4 text-base font-bold text-[#191c1d]">Atenção necessária</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3 rounded-xl border border-[#bacbbc]/20 p-3">
              <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#006d3e]" />
              <div className="min-w-0">
                <p className="text-sm font-semibold text-[#191c1d]">Conversas com IA ativa</p>
                <p className="text-xs leading-5 text-[#3c4a3f]">
                  A operação já tem {conversationsCount} conversa(s) fluindo no painel.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-xl border border-[#bacbbc]/20 p-3">
              <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#ff9800]" />
              <div className="min-w-0">
                <p className="text-sm font-semibold text-[#191c1d]">Atendimento humano</p>
                <p className="text-xs leading-5 text-[#3c4a3f]">
                  {humanConversationsCount} conversa(s) exigem atenção manual da loja.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-xl border border-[#bacbbc]/20 p-3">
              <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#00d981]" />
              <div className="min-w-0">
                <p className="text-sm font-semibold text-[#191c1d]">Próxima ação</p>
                <p className="text-xs leading-5 text-[#3c4a3f]">
                  Deixe o catálogo completo e avance na ativação do canal WhatsApp.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <Link
              href="/painel/conversas"
              className="inline-flex w-full items-center justify-center rounded-xl border border-[#006d3e]/20 bg-[#006d3e] px-4 py-3 text-sm font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-[#005931] hover:shadow-[0_14px_24px_rgba(0,109,62,0.22)]"
            >
              Ver todas as conversas
            </Link>
          </div>
        </section>
      </div>
    </section>
  );
}
