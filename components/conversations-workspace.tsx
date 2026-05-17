"use client";

import { useMemo, useState } from "react";
import { AssistantSuggestionCard } from "@/components/assistant-suggestion-card";
import { ConversationHandoffButton } from "@/components/conversation-handoff-button";
import { ConversationMessageForm } from "@/components/conversation-message-form";
import { ConversationReplyForm } from "@/components/conversation-reply-form";
import { ConversationTimeline } from "@/components/conversation-timeline";
import type { AssistantSuggestion } from "@/lib/ai-assistant";
import type { StoredConversation } from "@/lib/conversations";
import { conversationStatusLabelMap } from "@/lib/dashboard-constants";

type ConversationsWorkspaceProps = {
  aiSuggestions: Array<{
    conversationId: string;
    suggestion: AssistantSuggestion;
  }>;
  conversations: StoredConversation[];
};

type StatusFilter = "todas" | StoredConversation["status"];
type SegmentFilter = "todas" | "reservas" | "humano" | "quentes";

function normalizeText(value: string) {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();
}

export function ConversationsWorkspace({
  aiSuggestions,
  conversations,
}: ConversationsWorkspaceProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("todas");
  const [segmentFilter, setSegmentFilter] = useState<SegmentFilter>("todas");

  const filteredConversations = useMemo(() => {
    const normalizedSearch = normalizeText(search.trim());

    return conversations.filter((conversation) => {
      if (statusFilter !== "todas" && conversation.status !== statusFilter) {
        return false;
      }

      if (segmentFilter === "reservas" && conversation.status !== "reservada") {
        return false;
      }

      if (
        segmentFilter === "humano" &&
        conversation.status !== "em_atendimento_humano"
      ) {
        return false;
      }

      if (segmentFilter === "quentes" && conversation.priorityLabel !== "Quente") {
        return false;
      }

      if (!normalizedSearch) {
        return true;
      }

      const lastMessage =
        conversation.messages[conversation.messages.length - 1]?.content ?? "";
      const haystack = normalizeText(
        [
          conversation.clientName,
          conversation.clientPhone,
          conversation.reservedProduct ?? "",
          lastMessage,
        ].join(" "),
      );

      return haystack.includes(normalizedSearch);
    });
  }, [conversations, search, segmentFilter, statusFilter]);

  return (
    <section className="space-y-4">
      <div className="rounded-[1.6rem] border border-[#d9e6da] bg-white p-4 shadow-[0_14px_32px_rgba(26,74,43,0.04)]">
        <div className="grid gap-3 lg:grid-cols-[1.1fr_0.9fr_0.9fr]">
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Buscar por cliente, telefone, produto ou última mensagem"
            className="w-full rounded-2xl border border-[#d8e6d9] bg-[#fbfefb] px-4 py-3 text-sm text-[#173424] outline-none placeholder:text-[#8aa08f]"
          />

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value as StatusFilter)}
            className="w-full rounded-2xl border border-[#d8e6d9] bg-[#fbfefb] px-4 py-3 text-sm text-[#173424] outline-none"
          >
            <option value="todas">Todos os status</option>
            <option value="nova">Novas</option>
            <option value="aguardando_dados">Aguardando dados</option>
            <option value="respondida_pela_ia">Respondidas pela IA</option>
            <option value="em_atendimento_humano">Em atendimento humano</option>
            <option value="reservada">Reservadas</option>
          </select>

          <select
            value={segmentFilter}
            onChange={(event) => setSegmentFilter(event.target.value as SegmentFilter)}
            className="w-full rounded-2xl border border-[#d8e6d9] bg-[#fbfefb] px-4 py-3 text-sm text-[#173424] outline-none"
          >
            <option value="todas">Todas as filas</option>
            <option value="reservas">Só reservas</option>
            <option value="humano">Só atendimento humano</option>
            <option value="quentes">Só prioridades quentes</option>
          </select>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-[#5f7766]">
          <span>{filteredConversations.length} conversa(s) exibida(s)</span>
          {(search || statusFilter !== "todas" || segmentFilter !== "todas") && (
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setStatusFilter("todas");
                setSegmentFilter("todas");
              }}
              className="rounded-full border border-[#cfe0d0] bg-white px-3 py-1.5 font-medium text-[#1d3a29] transition hover:border-[#8abf93] hover:bg-[#f4fbf4]"
            >
              Limpar filtros
            </button>
          )}
        </div>
      </div>

      <div className="grid gap-4">
        {filteredConversations.length === 0 ? (
          <div className="rounded-[1.6rem] border border-dashed border-[#cfe0d1] bg-[#f8fcf8] p-6 text-sm leading-7 text-[#607766]">
            Nenhuma conversa encontrada com os filtros atuais.
          </div>
        ) : (
          filteredConversations.map((conversation) => {
            const lastMessage =
              conversation.messages[conversation.messages.length - 1];
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
                    <p className="mt-2 text-sm text-[#5b7362]">
                      {conversation.clientPhone}
                    </p>
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
          })
        )}
      </div>
    </section>
  );
}
