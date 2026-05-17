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
  return (
    <div className="mt-5 rounded-[1.5rem] border border-[#deeadf] bg-[#fcfefc] p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6b7f6e]">
          Timeline da conversa
        </p>
        <p className="text-xs text-[#7a8d7d]">{messages.length} evento(s)</p>
      </div>

      <div className="mt-4 space-y-4">
        {messages.map((message, index) => (
          <div key={message.id} className="flex gap-3">
            <div className="flex w-5 flex-col items-center">
              <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#2d8a4b]" />
              {index < messages.length - 1 ? (
                <span className="mt-1 min-h-[2.5rem] w-px flex-1 bg-[#d6e6d8]" />
              ) : null}
            </div>

            <div
              className={`flex-1 rounded-[1.2rem] border p-4 ${bubbleClassMap[message.author]}`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-semibold uppercase tracking-[0.16em]">
                  {authorLabelMap[message.author]}
                </span>
                <span className="text-xs opacity-80">
                  {new Date(message.timestamp).toLocaleString("pt-BR")}
                </span>
              </div>
              <p className="mt-3 text-sm leading-7">{message.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
