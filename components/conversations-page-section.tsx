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
      <section className="flex flex-col gap-1">
        <h1 className="text-[1.6rem] font-bold tracking-[-0.03em] text-[#191c1d]">
          Central de conversas
        </h1>
        <p className="text-sm text-[#3c4a3f]">
          Responda rápido, acompanhe a IA e assuma quando a venda pedir atenção humana.
        </p>
      </section>

      <section className="grid grid-cols-2 gap-3">
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

      <ConversationsWorkspace
        aiSuggestions={aiSuggestions}
        conversations={conversations}
      />
    </div>
  );
}
