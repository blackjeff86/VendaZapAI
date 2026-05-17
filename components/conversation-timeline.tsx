 "use client";

import { useMemo, useState } from "react";
import type { StoredMessage } from "@/lib/conversations";

type ConversationTimelineProps = {
  messages: StoredMessage[];
};

const authorLabelMap = {
  cliente: "Cliente",
  humano: "Loja",
  ia: "IA",
  sistema: "Sistema",
} as const;

const bubbleClassMap = {
  cliente: "border-[#d9e6ff] bg-[#f4f8ff] text-[#1e355d]",
  humano: "border-[#cfe6d4] bg-[#eefaf0] text-[#173c25]",
  ia: "border-[#d7ead9] bg-[#f5fbf5] text-[#193626]",
  sistema: "border-[#ebe4d3] bg-[#fffaf0] text-[#6a5727]",
} as const;

export function ConversationTimeline({
  messages,
}: ConversationTimelineProps) {
  const [showAll, setShowAll] = useState(false);
  const visibleMessages = useMemo(() => {
    if (showAll || messages.length <= 4) {
      return messages;
    }

    return messages.slice(-4);
  }, [messages, showAll]);

  return (
    <div className="mt-5 rounded-[1.5rem] border border-[#deeadf] bg-[#fcfefc] p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6b7f6e]">
          Timeline da conversa
        </p>
        <p className="text-xs text-[#7a8d7d]">{messages.length} evento(s)</p>
      </div>

      {messages.length > 4 ? (
        <div className="mt-3 flex items-center justify-between gap-3 rounded-[1rem] border border-[#e4ece4] bg-white px-3 py-2 text-xs text-[#627766]">
          <span>
            {showAll
              ? "Mostrando a conversa completa."
              : "Mostrando os 4 eventos mais recentes."}
          </span>
          <button
            type="button"
            onClick={() => setShowAll((current) => !current)}
            className="font-semibold text-[#2d8a4b]"
          >
            {showAll ? "Ver menos" : "Ver tudo"}
          </button>
        </div>
      ) : null}

      <div className="mt-4 space-y-3">
        {visibleMessages.map((message, index) => (
          <div key={message.id} className="flex gap-3">
            <div className="flex w-5 flex-col items-center">
              <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#2d8a4b]" />
              {index < visibleMessages.length - 1 ? (
                <span className="mt-1 min-h-[2rem] w-px flex-1 bg-[#d6e6d8]" />
              ) : null}
            </div>

            <div
              className={`flex-1 rounded-[1.1rem] border p-3 sm:rounded-[1.2rem] sm:p-4 ${bubbleClassMap[message.author]}`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.16em]">
                    {authorLabelMap[message.author]}
                  </span>
                  {message.inputType === "audio" ? (
                    <span className="rounded-full bg-[#fff7e8] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#99751b]">
                      Áudio
                    </span>
                  ) : null}
                </div>
                <span className="text-xs opacity-80">
                  {new Date(message.timestamp).toLocaleString("pt-BR", {
                    day: "2-digit",
                    month: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              <p className="mt-2 text-sm leading-6 sm:mt-3 sm:leading-7">
                {message.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
