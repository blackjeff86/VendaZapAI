import Link from "next/link";

type DashboardOverviewSectionProps = {
  activeProductsCount: number;
  conversationsCount: number;
  humanConversationsCount: number;
  onboardingCompleted: boolean;
  reservedConversationsCount: number;
  userName: string;
};

const chartBars = [40, 65, 52, 86, 100, 74, 58];

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
          ["Conversas", String(conversationsCount), "#00668a", "forum"],
          ["Reservas", String(reservedConversationsCount), "#1c695f", "inventory_2"],
          ["Produtos ativos", String(activeProductsCount), "#006d3e", "inventory"],
          [
            "Status",
            onboardingCompleted ? "OK" : "Pendente",
            onboardingCompleted ? "#006d3e" : "#ba1a1a",
            "trending_up",
          ],
        ].map(([title, value, color, icon]) => (
          <div
            key={title}
            className="dashboard-card rounded-xl border border-[#bacbbc]/30 p-4"
          >
            <div className="flex items-start justify-between">
              <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#3c4a3f]">
                {title}
              </p>
              <span className="text-sm font-semibold" style={{ color }}>
                {icon === "forum" ? "◔" : icon === "inventory_2" ? "▣" : icon === "inventory" ? "◫" : "↗"}
              </span>
            </div>
            <p className="mt-3 text-lg font-bold text-[#191c1d]">{value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
        <section className="dashboard-card rounded-xl border border-[#bacbbc]/30 p-4">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h3 className="text-base font-bold text-[#191c1d]">Desempenho semanal</h3>
            <span className="rounded-full bg-[#00d981]/12 px-3 py-1 text-[11px] font-semibold text-[#005931]">
              +12% vs ontem
            </span>
          </div>
          <div className="flex h-40 items-end gap-2 px-2">
            {chartBars.map((height, index) => (
              <div
                key={`${height}-${index}`}
                className={`flex-1 rounded-t-lg ${index === 4 ? "bg-[#006d3e]" : "bg-[#e6e8e9]"}`}
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
          <div className="mt-2 flex justify-between px-2 text-[11px] font-semibold text-[#6b7b6e]">
            <span>S</span>
            <span>T</span>
            <span>Q</span>
            <span>Q</span>
            <span className="text-[#006d3e]">S</span>
            <span>S</span>
            <span>D</span>
          </div>
        </section>

        <section className="dashboard-card rounded-xl border border-[#bacbbc]/30 p-4">
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
              className="inline-flex w-full items-center justify-center rounded-xl border border-[#006d3e]/20 bg-[#006d3e] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#005931]"
            >
              Ver todas as conversas
            </Link>
          </div>
        </section>
      </div>
    </section>
  );
}
