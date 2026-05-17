import { ReserveProductForm } from "@/components/reserve-product-form";
import type { AssistantSuggestion } from "@/lib/ai-assistant";

type AssistantSuggestionCardProps = {
  conversationId: string;
  suggestion: AssistantSuggestion;
};

const stockStatusMap: Record<AssistantSuggestion["stockStatus"], string> = {
  baixo_estoque: "Baixo estoque",
  em_estoque: "Em estoque",
  sem_correspondencia: "Sem correspondência",
  sem_estoque: "Sem estoque",
};

const intentMap: Record<AssistantSuggestion["intent"], string> = {
  atendimento_humano: "Atendimento humano",
  busca_produto: "Busca de produto",
  duvida_geral: "Dúvida geral",
  negociacao: "Negociação",
  reserva: "Reserva",
};

export function AssistantSuggestionCard({
  conversationId,
  suggestion,
}: AssistantSuggestionCardProps) {
  const topProduct = suggestion.matchedProducts[0];

  return (
    <div className="mt-5 rounded-[1.4rem] border border-[#d8e8da] bg-white p-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-[#e8f5ea] px-3 py-1 text-xs font-semibold text-[#2d8a4b]">
          Sugestão da IA
        </span>
        <span className="rounded-full bg-[#f1f5f1] px-3 py-1 text-xs font-semibold text-[#617664]">
          {intentMap[suggestion.intent]}
        </span>
        <span className="rounded-full bg-[#f1f5f1] px-3 py-1 text-xs font-semibold text-[#617664]">
          Confiança {suggestion.confidenceLabel}
        </span>
        <span className="rounded-full bg-[#f6faf6] px-3 py-1 text-xs font-semibold text-[#6b7f6f]">
          {stockStatusMap[suggestion.stockStatus]}
        </span>
      </div>

      <p className="mt-4 text-sm leading-7 text-[#57705e]">{suggestion.summary}</p>

      <div className="mt-4 rounded-[1.2rem] border border-[#deeadf] bg-[#f8fcf8] p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2d8a4b]">
          Resposta sugerida
        </p>
        <p className="mt-3 text-sm leading-7 text-[#173424]">
          {suggestion.suggestedReply}
        </p>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-[1.2rem] border border-[#e3ece3] bg-[#fbfefb] p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6a7f6d]">
            Próximo passo
          </p>
          <p className="mt-2 text-sm font-medium text-[#173424]">
            {suggestion.nextStepLabel}
          </p>
        </div>

        <div className="rounded-[1.2rem] border border-[#e3ece3] bg-[#fbfefb] p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6a7f6d]">
            Ação operacional
          </p>
          <p className="mt-2 text-sm font-medium text-[#173424]">
            {suggestion.shouldEscalateToHuman
              ? "Levar para atendimento humano"
              : suggestion.shouldOfferReservation
                ? "Oferecer reserva da peça"
                : "Seguir no fluxo assistido"}
          </p>
        </div>
      </div>

      {suggestion.missingData.length > 0 ? (
        <div className="mt-4 rounded-[1.2rem] border border-[#efe4c5] bg-[#fffaf0] p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9f7a17]">
            Dados faltantes
          </p>
          <p className="mt-2 text-sm text-[#6f5b26]">
            {suggestion.missingData.join(", ")}
          </p>
        </div>
      ) : null}

      {suggestion.matchedProducts.length > 0 ? (
        <div className="mt-4 space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6a7f6d]">
            Produtos encontrados
          </p>
          {suggestion.matchedProducts.map((product) => (
            <div
              key={product.id}
              className="rounded-[1.2rem] border border-[#e3ece3] bg-[#fbfefb] p-4"
            >
              <p className="text-sm font-semibold text-[#173424]">{product.name}</p>
              <p className="mt-2 text-sm text-[#5f7766]">
                R$ {product.price.toFixed(2).replace(".", ",")} • Estoque:{" "}
                {product.stockQuantity}
              </p>
            </div>
          ))}
        </div>
      ) : null}

      {suggestion.shouldOfferReservation && topProduct ? (
        <ReserveProductForm
          conversationId={conversationId}
          productId={topProduct.id}
          productName={topProduct.name}
        />
      ) : null}
    </div>
  );
}
