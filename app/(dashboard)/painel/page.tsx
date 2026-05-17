import Link from "next/link";
import { DashboardOverviewSection } from "@/components/dashboard-overview-section";
import { PerformanceChart } from "@/components/performance-chart";
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
  const weeklyLabels = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"];
  const weeklyValues = [
    "R$ 7,2 mil",
    "R$ 5,4 mil",
    "R$ 8,1 mil",
    "R$ 10,9 mil",
    "R$ 7,5 mil",
    "R$ 5,8 mil",
    "R$ 9,1 mil",
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="md:hidden">
        <DashboardOverviewSection
          activeProductsCount={activeProductsCount}
          conversationsCount={conversations.length}
          humanConversationsCount={humanConversationsCount}
          onboardingCompleted={onboardingCompleted}
          reservedConversationsCount={reservedConversationsCount}
          userName={session.name}
        />
      </div>

      <div className="hidden md:block">
        <section className="grid grid-cols-12 gap-6">
          <div className="col-span-12 grid grid-cols-1 gap-4 xl:col-span-8 xl:grid-cols-3">
            {[
              ["Vendas Totais", "R$ 12.480,00", "+14%", "payments", "text-[#006d2f]", "bg-[#25d366]/15"],
              ["Novos Leads", "342", "+8%", "group", "text-[#006b5f]", "bg-[#8cf1e1]/25"],
              ["Conversão de IA", "78,4%", "IA Ativa", "psychology", "text-[#006d2f]", "bg-[#25d366]"],
            ].map(([title, value, badge, icon, iconColor, iconBg], index) => (
              <div
                key={title}
                className={`rounded-2xl border border-[#bbcbb9]/30 p-6 ${
                  index === 2
                    ? "bg-white shadow-[0_10px_24px_rgba(37,211,102,0.12)]"
                    : "bg-white/80 backdrop-blur-sm shadow-sm"
                }`}
              >
                <div className="mb-4 flex items-start justify-between">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${iconBg} ${iconColor}`}>
                    <span className="text-xl">
                      {icon === "payments" ? "$" : icon === "group" ? "◉" : "✦"}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-[#006d2f]">{badge}</span>
                </div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#6c7b6b]">
                  {title}
                </p>
                <h3 className="mt-2 text-3xl font-bold tracking-[-0.03em] text-[#111c2d]">
                  {value}
                </h3>
              </div>
            ))}
          </div>

          <div className="col-span-12 rounded-2xl border border-[#bbcbb9]/30 bg-white/80 p-6 shadow-sm xl:col-span-4">
            <h4 className="text-xl font-semibold text-[#111c2d]">Avisos Importantes</h4>
            <div className="mt-5 flex flex-col gap-3">
              <div className="flex gap-4 rounded-xl border border-[#ba1a1a]/10 bg-[#ffdad6]/60 p-4">
                <span className="text-[#ba1a1a]">!</span>
                <div>
                  <p className="text-sm font-semibold text-[#93000a]">Estoque Baixo</p>
                  <p className="mt-1 text-xs leading-5 text-[#93000a]/80">
                    3 produtos estão abaixo do limite mínimo de segurança.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 rounded-xl border border-[#006b5f]/10 bg-[#8cf1e1]/25 p-4">
                <span className="text-[#006b5f]">✓</span>
                <div>
                  <p className="text-sm font-semibold text-[#006f64]">Treinamento Concluído</p>
                  <p className="mt-1 text-xs leading-5 text-[#006f64]/80">
                    A IA aprendeu novas respostas sobre os produtos mais buscados.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-12 rounded-2xl border border-[#bbcbb9]/30 bg-white/80 p-8 shadow-sm xl:col-span-9">
            <div className="mb-8 flex items-center justify-between gap-4">
              <div>
                <h4 className="text-xl font-semibold text-[#111c2d]">Desempenho Semanal</h4>
                <p className="mt-1 text-sm text-[#3c4a3d]">
                  Volume de vendas vs. eficiência da operação assistida.
                </p>
              </div>
              <div className="flex gap-2">
                <button className="rounded-lg bg-[#dee8ff] px-4 py-2 text-xs font-semibold text-[#111c2d]">7 Dias</button>
                <button className="rounded-lg px-4 py-2 text-xs font-semibold text-[#6c7b6b]">30 Dias</button>
              </div>
            </div>

            <div className="relative">
              <PerformanceChart
                bars={[66, 50, 74, 100, 68, 52, 84]}
                labels={weeklyLabels}
                values={weeklyValues}
              />
              <svg className="pointer-events-none absolute inset-x-0 top-[4.15rem] h-1/2 w-full stroke-[#006b5f]" preserveAspectRatio="none" viewBox="0 0 100 100">
                <path d="M0,80 Q25,20 50,50 T100,10" fill="none" strokeDasharray="4" strokeWidth="2" />
              </svg>
            </div>
          </div>

          <div className="col-span-12 flex flex-col gap-6 xl:col-span-3">
            <div className="rounded-2xl border border-[#bbcbb9]/30 bg-white/80 p-6 shadow-sm">
              <h4 className="text-xl font-semibold text-[#111c2d]">Insights da IA</h4>
              <div className="mt-5 flex flex-col gap-4">
                <div className="border-l-2 border-[#006d2f] pl-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#006d2f]">Oportunidade</p>
                  <p className="mt-1 text-sm leading-6 text-[#3c4a3d]">
                    A procura por itens de reposição rápida subiu no fim do dia. Vale destacar kits e produtos de giro.
                  </p>
                </div>
                <div className="border-l-2 border-[#006b5f] pl-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#006b5f]">Eficiência</p>
                  <p className="mt-1 text-sm leading-6 text-[#3c4a3d]">
                    A IA já resolve boa parte das dúvidas iniciais e deixa o time livre para fechar a venda.
                  </p>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-[#006d2f] via-[#25d366] to-[#3B82F6] p-6 text-white shadow-lg">
              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-white/80">
                Novo Relatório Mensal
              </p>
              <p className="mt-2 text-lg font-semibold">
                Resultados, conversas e oportunidades prontos para análise.
              </p>
            </div>
          </div>

          <div className="col-span-12 overflow-hidden rounded-2xl border border-[#bbcbb9]/30 bg-white/80 shadow-sm">
            <div className="flex items-center justify-between border-b border-[#bbcbb9]/20 bg-white/60 px-6 py-4">
              <h4 className="text-xl font-semibold text-[#111c2d]">Conversas Recentes</h4>
              <Link href="/painel/conversas" className="text-xs font-bold uppercase tracking-[0.08em] text-[#006d2f]">
                Ver todas
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-[#f0f3ff]/70">
                    <th className="px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#6c7b6b]">Cliente</th>
                    <th className="px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#6c7b6b]">Status</th>
                    <th className="px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#6c7b6b]">IA Ativa</th>
                    <th className="px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#6c7b6b]">Prioridade</th>
                    <th className="px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#6c7b6b] text-right">Ação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#bbcbb9]/20">
                  {conversations.slice(0, 3).map((conversation) => (
                    <tr key={conversation.id} className="hover:bg-[#f0f3ff]/30">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#8cf1e1] font-bold text-[#006b5f]">
                            {conversation.clientName.slice(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-[#111c2d]">{conversation.clientName}</p>
                            <p className="text-xs text-[#6c7b6b]">{conversation.clientPhone}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex rounded-full bg-[#25d366]/15 px-3 py-1 text-[11px] font-bold text-[#005523]">
                          {conversation.status.replaceAll("_", " ")}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-[#3c4a3d]">
                        {conversation.status === "em_atendimento_humano" ? "Pausada" : "Ativa"}
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-[#111c2d]">
                        {conversation.priorityLabel}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="rounded-lg p-2 text-[#6c7b6b] transition hover:bg-[#f0f3ff]">
                          ⋯
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>

      <section className="grid gap-4 md:hidden md:grid-cols-3">
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

      <section className="dashboard-card rounded-xl border border-[#bacbbc]/30 p-4 sm:p-5 md:hidden">
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
