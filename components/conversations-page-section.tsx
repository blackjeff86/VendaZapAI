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
        <path d="M6.5 4.5h11A1.5 1.5 0 0 1 19 6v12a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 5 18V6a1.5 1.5 0 0 1 1.5-1.5Z" strokeLinecap="round" strokeLinejoin="round" />
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
      <path d="M18 10V6h-4" strokeLinecap="round" strokeLinejoin="round" />
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
    <div className="space-y-6">
      <section className="grid gap-4 lg:grid-cols-[1.02fr_0.98fr]">
        <div className="dashboard-card-strong rounded-[2rem] p-6 sm:p-7">
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
            <div className="dashboard-chip rounded-[1.2rem] px-4 py-3 text-sm text-[#597260]">
              Foco: fila, urgência e próxima ação
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
          {[
            [
              "Conversas",
              String(conversations.length),
              "border-[#d9e6da] bg-[#fbfefb]",
            ],
            [
              "Reservas",
              String(reservedConversationsCount),
              "border-[#bfe5c7] bg-[linear-gradient(135deg,#effcf1_0%,#e3f8e8_100%)]",
            ],
            [
              "Atendimento humano",
              String(humanConversationsCount),
              "border-[#cae2df] bg-[linear-gradient(135deg,#f0fbfb_0%,#e8f5f4_100%)]",
            ],
            [
              "Prioridade quente",
              String(hotConversationsCount),
              "border-[#f0d9a6] bg-[linear-gradient(135deg,#fff9ec_0%,#fff3d8_100%)]",
            ],
          ].map(([title, value, tone]) => (
            <div
              key={title}
              className={`rounded-[1.6rem] border p-5 shadow-[0_14px_32px_rgba(26,74,43,0.04)] ${tone}`}
            >
              <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-[1rem] bg-[rgba(255,255,255,0.7)] text-[#2d8a4b]">
                <MetricIcon title={title} />
              </span>
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
