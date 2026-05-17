import { ConversationsWorkspace } from "@/components/conversations-workspace";
import type { AssistantSuggestion } from "@/lib/ai-assistant";
import type { StoredConversation } from "@/lib/conversations";

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
    <div className="space-y-6">
      <section className="grid gap-4 lg:grid-cols-[1.02fr_0.98fr]">
        <div className="rounded-[2rem] border border-[#d9e8db] bg-[linear-gradient(135deg,#ffffff_0%,#f7fcf8_60%,#eef8f0_100%)] p-6 shadow-[0_20px_48px_rgba(26,74,43,0.06)] sm:p-7">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#2d8a4b]">
                Central de conversas
              </p>
              <h1 className="display-font mt-3 text-2xl font-semibold tracking-tight text-[#173424] sm:text-3xl">
                Atendimento organizado para decidir rápido no celular.
              </h1>
              <p className="mt-4 text-sm leading-7 text-[#5d7564]">
                Aqui a loja acompanha o que a IA respondeu, assume conversas
                quando precisa e fecha reservas sem se perder no meio da fila.
              </p>
            </div>
            <div className="rounded-[1.2rem] border border-[#d7e5d8] bg-[#f6fbf6] px-4 py-3 text-sm text-[#597260]">
              Foco: fila, urgência e próxima ação
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
          {[
            ["Conversas", String(conversations.length)],
            ["Reservas", String(reservedConversationsCount)],
            ["Atendimento humano", String(humanConversationsCount)],
            ["Prioridade quente", String(hotConversationsCount)],
          ].map(([title, value]) => (
            <div
              key={title}
              className="rounded-[1.6rem] border border-[#d9e6da] bg-[#fbfefb] p-5 shadow-[0_14px_32px_rgba(26,74,43,0.04)]"
            >
              <p className="display-font text-lg font-semibold text-[#173424]">{title}</p>
              <p className="mt-3 text-2xl font-semibold text-[#2d8a4b]">{value}</p>
            </div>
          ))}
        </div>
      </section>

      <ConversationsWorkspace
        aiSuggestions={aiSuggestions}
        conversations={conversations}
      />
    </div>
  );
}
