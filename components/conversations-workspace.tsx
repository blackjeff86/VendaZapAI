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
  const [expandedConversationIds, setExpandedConversationIds] = useState<string[]>(
    () => conversations.slice(0, 1).map((conversation) => conversation.id),
  );

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

  const quickSegments: Array<{
    count: number;
    label: string;
    value: SegmentFilter;
  }> = [
    { count: conversations.length, label: "Todas", value: "todas" },
    {
      count: conversations.filter((conversation) => conversation.status === "reservada")
        .length,
      label: "Reservas",
      value: "reservas",
    },
    {
      count: conversations.filter(
        (conversation) => conversation.status === "em_atendimento_humano",
      ).length,
      label: "Humano",
      value: "humano",
    },
    {
      count: conversations.filter(
        (conversation) => conversation.priorityLabel === "Quente",
      ).length,
      label: "Quentes",
      value: "quentes",
    },
  ];

  function toggleConversation(conversationId: string) {
    setExpandedConversationIds((current) =>
      current.includes(conversationId)
        ? current.filter((id) => id !== conversationId)
        : [...current, conversationId],
    );
  }

  return (
    <section className="space-y-4">
      <div className="sticky top-[4.6rem] z-10 rounded-xl border border-[#bacbbc]/30 bg-[rgba(248,250,251,0.95)] p-4 shadow-[0_8px_20px_rgba(0,0,0,0.04)] backdrop-blur-xl lg:static lg:bg-transparent lg:p-0 lg:shadow-none">
        <div className="mb-3 flex items-center justify-between gap-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#6d8373]">
            Filtrar atendimento
          </p>
          <span className="text-xs text-[#6d8373]">{filteredConversations.length} ativas</span>
        </div>
        <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-3">
          {quickSegments.map((segment) => {
            const isActive = segmentFilter === segment.value;

            return (
              <button
                key={segment.value}
                type="button"
                onClick={() => setSegmentFilter(segment.value)}
                className={`min-w-fit rounded-full border px-4 py-2 text-sm font-semibold transition ${
                  isActive
                    ? "border-[#006d3e] bg-[#006d3e] text-white"
                    : "border-[#e1e3e4] bg-[#e6e8e9] text-[#3c4a3f]"
                }`}
              >
                {segment.label} ({segment.count})
              </button>
            );
          })}
        </div>

        <div className="grid gap-3 lg:grid-cols-[1.1fr_0.9fr_0.9fr]">
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Buscar por cliente, telefone, produto ou última mensagem"
            className="w-full rounded-xl border border-[#bacbbc]/30 bg-white px-4 py-3 text-sm text-[#191c1d] outline-none placeholder:text-[#6b7b6e]"
          />

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value as StatusFilter)}
            className="w-full rounded-xl border border-[#bacbbc]/30 bg-white px-4 py-3 text-sm text-[#191c1d] outline-none"
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
            className="w-full rounded-xl border border-[#bacbbc]/30 bg-white px-4 py-3 text-sm text-[#191c1d] outline-none"
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
              className="rounded-full border border-[#bacbbc]/30 bg-white px-3 py-1.5 font-medium text-[#006d3e] transition hover:bg-[#f8fafb]"
            >
              Limpar filtros
            </button>
          )}
        </div>
      </div>

      <div className="grid gap-3 sm:gap-4">
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
            const isExpanded = expandedConversationIds.includes(conversation.id);

            return (
              <div
                key={conversation.id}
                className="dashboard-card rounded-xl border border-[#bacbbc]/30 p-3.5 sm:p-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex min-w-0 gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#a5ede0] text-sm font-bold text-[#1c695f]">
                      {conversation.clientName.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                    <p className="text-[0.95rem] font-bold text-[#191c1d] sm:text-[1rem]">
                        {conversation.clientName}
                    </p>
                    <p className="mt-1 text-sm text-[#3c4a3f]">
                      {conversation.clientPhone}
                    </p>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <span className="rounded-md bg-[#f3e5f5] px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] text-[#7b1fa2]">
                        {conversation.priorityLabel}
                      </span>
                      <span className="rounded-md bg-[#e6e8e9] px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] text-[#3c4a3f]">
                        {conversationStatusLabelMap[conversation.status]}
                      </span>
                    </div>
                    </div>
                  </div>

                  <div className="flex shrink-0 flex-col items-end gap-2">
                    <span className="text-[10px] font-semibold text-[#6b7b6e]">
                      {new Date(conversation.updatedAt).toLocaleTimeString("pt-BR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                    <button
                      type="button"
                      onClick={() => toggleConversation(conversation.id)}
                      className="rounded-full border border-[#bacbbc]/30 bg-white px-3 py-1.5 text-xs font-semibold text-[#006d3e] transition hover:bg-[#f8fafb]"
                    >
                      {isExpanded ? "Recolher" : "Expandir"}
                    </button>
                  </div>
                </div>

                {isExpanded ? (
                  <>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="rounded-full bg-[#eff5ef] px-3 py-1 text-xs font-medium text-[#5f7766]">
                        {conversation.messages.length} mensagem(ns)
                      </span>
                    </div>
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
                    <div className="mt-4">
                      <ConversationHandoffButton
                        conversationId={conversation.id}
                        humanActive={conversation.status === "em_atendimento_humano"}
                      />
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
                  </>
                ) : lastMessage ? (
                  <p className="mt-3 line-clamp-2 text-sm leading-6 text-[#6a8170]">
                    {lastMessage.content}
                  </p>
                ) : null}
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
