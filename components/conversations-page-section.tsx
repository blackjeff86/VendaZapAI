import { ConversationsWorkspace } from "@/components/conversations-workspace";
import type { AssistantSuggestion } from "@/lib/ai-assistant";
import type { StoredConversation } from "@/lib/conversations";

function MetricIcon({ title }: { title: string }) {
  const common = "h-[1rem] w-[1rem]";

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
        <path d="M7.5 6h9" strokeLinecap="round" />
        <path d="M6 9.5h12" strokeLinecap="round" />
        <path d="M8.5 14h7" strokeLinecap="round" />
      </svg>
    );
  }

  if (title === "Atendimento humano") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.9">
        <circle cx="12" cy="8" r="3" />
        <path d="M6 18a6 6 0 0 1 12 0" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.9">
      <path d="m6 15 3-3 2 2 5-6 2 2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

type ConversationsPageSectionProps = {
  aiSuggestions: Array<{
    conversationId: string;
    suggestion: AssistantSuggestion;
  }>;
  conversations: StoredConversation[];
  humanConversationsCount: number;
  reservedConversationsCount: number;
};

export function ConversationsPageSection({
  aiSuggestions,
  conversations,
  humanConversationsCount,
  reservedConversationsCount,
}: ConversationsPageSectionProps) {
  const hotConversationsCount = conversations.filter(
    (conversation) => conversation.priorityLabel === "Quente",
  ).length;

  return (
    <div className="space-y-5">
      <section className="flex flex-col gap-1 md:hidden">
        <h1 className="text-[1.6rem] font-bold tracking-[-0.03em] text-[#191c1d]">
          Central de conversas
        </h1>
        <p className="text-sm text-[#3c4a3f]">
          Responda rápido, acompanhe a IA e assuma quando a venda pedir atenção humana.
        </p>
      </section>

      <section className="grid grid-cols-2 gap-3 md:hidden">
        {[
          ["Conversas", String(conversations.length)],
          ["Reservas", String(reservedConversationsCount)],
          ["Atendimento humano", String(humanConversationsCount)],
          ["Prioridade quente", String(hotConversationsCount)],
        ].map(([title, value]) => (
          <div
            key={title}
            className="dashboard-card rounded-xl border border-[#bacbbc]/30 p-4"
          >
            <div className="mb-3 flex items-start justify-between gap-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#3c4a3f]">
                {title}
              </p>
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#f2f4f5] text-[#006d3e]">
                <MetricIcon title={title} />
              </span>
            </div>
            <p className="text-lg font-bold text-[#191c1d]">{value}</p>
          </div>
        ))}
      </section>

      <section className="hidden space-y-6 md:block">
        <section className="grid grid-cols-12 gap-6">
          <div className="col-span-3 rounded-2xl border border-[#bbcbb9]/20 bg-white p-6 shadow-sm">
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#6c7b6b]">
              Conversas
            </p>
            <h3 className="mt-2 text-3xl font-bold tracking-[-0.03em] text-[#111c2d]">
              {conversations.length}
            </h3>
            <p className="mt-2 text-xs font-semibold text-[#006d2f]">Fila ativa da operação</p>
          </div>

          <div className="col-span-3 rounded-2xl border border-[#bbcbb9]/20 bg-white p-6 shadow-sm">
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#6c7b6b]">
              Reservas
            </p>
            <h3 className="mt-2 text-3xl font-bold tracking-[-0.03em] text-[#111c2d]">
              {reservedConversationsCount}
            </h3>
            <p className="mt-2 text-xs font-semibold text-[#006b5f]">Pedidos em fase final</p>
          </div>

          <div className="col-span-3 rounded-2xl border border-[#bbcbb9]/20 bg-white p-6 shadow-sm">
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#6c7b6b]">
              Atendimento humano
            </p>
            <h3 className="mt-2 text-3xl font-bold tracking-[-0.03em] text-[#111c2d]">
              {humanConversationsCount}
            </h3>
            <p className="mt-2 text-xs font-semibold text-[#93492e]">Casos com intervenção</p>
          </div>

          <div className="col-span-3 rounded-2xl bg-[#006d2f] p-6 text-white shadow-md">
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-white/80">
              Prioridade quente
            </p>
            <h3 className="mt-2 text-3xl font-bold tracking-[-0.03em]">
              {hotConversationsCount}
            </h3>
            <p className="mt-2 text-sm text-white/80">
              Conversas com maior chance de virar venda agora.
            </p>
          </div>

          <div className="col-span-8 rounded-2xl border border-[#bbcbb9]/20 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold text-[#111c2d]">Central operacional</h3>
                <p className="mt-1 text-sm text-[#3c4a3d]">
                  Filtros, fila e acompanhamento da IA para a equipe decidir rápido.
                </p>
              </div>
              <span className="rounded-full bg-[#dee8ff] px-4 py-2 text-xs font-semibold text-[#006d2f]">
                IA + humano em conjunto
              </span>
            </div>
            <div className="mt-6">
              <ConversationsWorkspace
                aiSuggestions={aiSuggestions}
                conversations={conversations}
              />
            </div>
          </div>

          <div className="col-span-4 flex flex-col gap-6">
            <div className="rounded-2xl border border-[#bbcbb9]/20 bg-white p-6 shadow-sm">
              <h4 className="text-xl font-semibold text-[#111c2d]">Leitura da IA</h4>
              <div className="mt-5 space-y-4">
                <div className="border-l-2 border-[#006d2f] pl-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#006d2f]">Resposta rápida</p>
                  <p className="mt-1 text-sm leading-6 text-[#3c4a3d]">
                    A IA já cobre boa parte das perguntas iniciais e deixa o time focado em conversão.
                  </p>
                </div>
                <div className="border-l-2 border-[#006b5f] pl-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#006b5f]">Fila quente</p>
                  <p className="mt-1 text-sm leading-6 text-[#3c4a3d]">
                    Dê prioridade para clientes prontos para reservar ou fechar a compra.
                  </p>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-[#006b5f] via-[#25d366] to-[#3B82F6] p-6 text-white shadow-lg">
              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-white/80">
                VendaZap Insight
              </p>
              <p className="mt-2 text-lg font-semibold">
                Respostas mais rápidas e reservas organizadas aumentam a chance de fechamento.
              </p>
            </div>
          </div>
        </section>
      </section>

      <div className="md:hidden">
        <ConversationsWorkspace
          aiSuggestions={aiSuggestions}
          conversations={conversations}
        />
      </div>
    </div>
  );
}
