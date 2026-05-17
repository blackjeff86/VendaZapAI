import { AssistantSuggestionCard } from "@/components/assistant-suggestion-card";
import { ConversationHandoffButton } from "@/components/conversation-handoff-button";
import { ConversationMessageForm } from "@/components/conversation-message-form";
import { ConversationReplyForm } from "@/components/conversation-reply-form";
import { ConversationTimeline } from "@/components/conversation-timeline";
import type { AssistantSuggestion } from "@/lib/ai-assistant";
import type { StoredConversation } from "@/lib/conversations";
import { conversationStatusLabelMap } from "@/lib/dashboard";

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
  return (
    <div className="space-y-6">
      <section className="grid gap-4 lg:grid-cols-[1.02fr_0.98fr]">
        <div className="rounded-[2rem] border border-[#d9e8db] bg-white p-6 shadow-[0_20px_48px_rgba(26,74,43,0.06)] sm:p-7">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#2d8a4b]">
                Central de conversas
              </p>
              <h1 className="display-font mt-3 text-2xl font-semibold tracking-tight text-[#173424] sm:text-3xl">
                Atendimento organizado por prioridade, contexto e próxima ação.
              </h1>
              <p className="mt-4 text-sm leading-7 text-[#5d7564]">
                Aqui a loja acompanha o que a IA respondeu, assume conversas
                quando precisa e fecha reservas sem sair do fluxo.
              </p>
            </div>
            <div className="rounded-[1.2rem] border border-[#d7e5d8] bg-[#f6fbf6] px-4 py-3 text-sm text-[#597260]">
              Operação mobile-first
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
          {[
            ["Conversas", String(conversations.length)],
            ["Reservas", String(reservedConversationsCount)],
            ["Atendimento humano", String(humanConversationsCount)],
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

      <section className="grid gap-4">
        {conversations.map((conversation) => {
          const lastMessage = conversation.messages[conversation.messages.length - 1];
          const conversationSuggestion = aiSuggestions.find(
            (item) => item.conversationId === conversation.id,
          )?.suggestion;

          return (
            <div
              key={conversation.id}
              className="rounded-[1.6rem] border border-[#dbe7dc] bg-white p-5 shadow-[0_14px_32px_rgba(26,74,43,0.04)]"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="display-font text-xl font-semibold text-[#173424]">
                      {conversation.clientName}
                    </p>
                    <span className="rounded-full bg-[#e4f6e8] px-3 py-1 text-xs font-semibold text-[#2d8a4b]">
                      {conversation.priorityLabel}
                    </span>
                    <span className="rounded-full bg-[#eff4ef] px-3 py-1 text-xs font-semibold text-[#637867]">
                      {conversationStatusLabelMap[conversation.status]}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-[#5b7362]">{conversation.clientPhone}</p>
                  <p className="mt-4 text-sm leading-7 text-[#5f7766]">
                    Última mensagem: {lastMessage?.content ?? "Sem mensagens ainda."}
                  </p>
                  {conversation.reservedProduct ? (
                    <div className="mt-3 rounded-[1rem] border border-[#d7ead9] bg-[#f5fbf5] p-3 text-sm leading-7 text-[#486756]">
                      <p>
                        <span className="font-semibold text-[#173424]">
                          Reserva vinculada:
                        </span>{" "}
                        {conversation.reservedProduct}
                      </p>
                      {conversation.reservedPickupName ? (
                        <p>
                          <span className="font-semibold text-[#173424]">
                            Nome da retirada:
                          </span>{" "}
                          {conversation.reservedPickupName}
                        </p>
                      ) : null}
                      {conversation.reservedPickupWindow ? (
                        <p>
                          <span className="font-semibold text-[#173424]">
                            Retirada prevista:
                          </span>{" "}
                          {conversation.reservedPickupWindow}
                        </p>
                      ) : null}
                    </div>
                  ) : null}
                </div>

                <div className="min-w-full rounded-[1.4rem] border border-[#dce7dd] bg-[#fbfefb] p-4 lg:min-w-[20rem]">
                  <div className="mb-4 space-y-2 text-sm text-[#5f7766]">
                    <p>
                      <span className="font-semibold text-[#173424]">Atualizada:</span>{" "}
                      {new Date(conversation.updatedAt).toLocaleString("pt-BR")}
                    </p>
                    <p>
                      <span className="font-semibold text-[#173424]">Mensagens:</span>{" "}
                      {conversation.messages.length}
                    </p>
                  </div>

                  <ConversationHandoffButton
                    conversationId={conversation.id}
                    humanActive={conversation.status === "em_atendimento_humano"}
                  />
                </div>
              </div>

              {conversationSuggestion ? (
                <AssistantSuggestionCard
                  conversationId={conversation.id}
                  suggestion={conversationSuggestion}
                />
              ) : null}

              <ConversationTimeline messages={conversation.messages} />

              <div className="mt-4 grid gap-4 lg:grid-cols-2">
                <ConversationReplyForm conversationId={conversation.id} />
                <ConversationMessageForm conversationId={conversation.id} />
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
