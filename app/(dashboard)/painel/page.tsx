import { cookies } from "next/headers";
import { buildAssistantSuggestion } from "@/lib/ai-assistant";
import { AssistantSuggestionCard } from "@/components/assistant-suggestion-card";
import { ConversationHandoffButton } from "@/components/conversation-handoff-button";
import { ConversationMessageForm } from "@/components/conversation-message-form";
import { ProductForm } from "@/components/product-form";
import { ProductStockForm } from "@/components/product-stock-form";
import { StoreOnboardingForm } from "@/components/store-onboarding-form";
import { WhatsappConfigForm } from "@/components/whatsapp-config-form";
import { AUTH_COOKIE_NAME, decodeSession, getUserById } from "@/lib/auth";
import { listConversationsByUserId } from "@/lib/conversations";
import { listProductsByUserId } from "@/lib/products";

const conversationStatusLabelMap = {
  aguardando_dados: "Aguardando dados",
  aguardando_humano: "Aguardando humano",
  em_atendimento_humano: "Em atendimento humano",
  nova: "Nova",
  reservada: "Reservada",
  respondida_pela_ia: "Respondida pela IA",
} as const;

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const session = decodeSession(cookieStore.get(AUTH_COOKIE_NAME)?.value);
  const currentUser = session ? await getUserById(session.userId) : null;
  const onboardingCompleted = Boolean(currentUser?.onboardingCompleted);
  const products = session ? await listProductsByUserId(session.userId) : [];
  const conversations = session ? await listConversationsByUserId(session.userId) : [];
  const activeProductsCount = products.filter((product) => product.active).length;
  const reservedConversationsCount = conversations.filter(
    (conversation) => conversation.status === "reservada",
  ).length;
  const humanConversationsCount = conversations.filter(
    (conversation) => conversation.status === "em_atendimento_humano",
  ).length;
  const aiSuggestions = conversations.map((conversation) => ({
    conversationId: conversation.id,
    suggestion: buildAssistantSuggestion(conversation, products),
  }));

  return (
    <div className="space-y-6 sm:space-y-8">
      <section className="grid gap-4 lg:grid-cols-[1.08fr_0.92fr]">
        <div className="rounded-[2rem] border border-[#d9e8db] bg-[linear-gradient(135deg,#ffffff_0%,#f4fbf4_100%)] p-6 shadow-[0_24px_70px_rgba(26,74,43,0.08)] sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#2d8a4b]">
            Base da Sprint 1
          </p>
          <h1 className="display-font mt-4 text-3xl font-semibold tracking-tight text-[#183323] sm:text-4xl">
            Painel inicial da loja pronto para receber o resto do MVP.
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-[#54705d] sm:text-base">
            Esta área já representa a fundação da parte autenticada do
            VendaZap AI. A partir daqui, vamos encaixar onboarding, catálogo,
            estoque e conversas de atendimento.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              ["Mobile-first", "Fluxo pensado primeiro para celular"],
              ["Operação simples", "Ações curtas para acompanhar rápido"],
              ["Base do MVP", "Pronto para onboarding e catálogo"],
            ].map(([title, copy]) => (
              <div
                key={title}
                className="rounded-[1.25rem] border border-[#dbe8dc] bg-white/90 p-4"
              >
                <p className="display-font text-base font-semibold text-[#1c3928]">{title}</p>
                <p className="mt-2 text-sm leading-6 text-[#5c7563]">{copy}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          {[
            ["Autenticação", "Pronta para fluxo local de desenvolvimento"],
            ["Multi-tenant", "Baseada em loja por conta nesta etapa inicial"],
            [
              "Status da loja",
              onboardingCompleted ? "Onboarding inicial preenchido" : "Onboarding inicial pendente",
            ],
          ].map(([title, copy]) => (
            <div
              key={title}
              className="rounded-[1.6rem] border border-[#d9e6da] bg-white p-5 shadow-[0_16px_40px_rgba(26,74,43,0.05)]"
            >
              <p className="display-font text-lg font-semibold text-[#173424]">{title}</p>
              <p className="mt-3 text-sm leading-7 text-[#5f7766]">{copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[0.98fr_1.02fr]">
        <div className="rounded-[2rem] border border-[#d9e8db] bg-white p-6 shadow-[0_20px_48px_rgba(26,74,43,0.06)] sm:p-7">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#2d8a4b]">
            Onboarding da loja
          </p>
          <h2 className="display-font mt-4 text-2xl font-semibold tracking-tight text-[#173424] sm:text-3xl">
            Preencha a base da operação para seguir para catálogo e estoque.
          </h2>
          <p className="mt-4 text-sm leading-7 text-[#5d7564]">
            Esta etapa organiza os dados mínimos da loja e prepara o caminho
            para as próximas entregas do MVP.
          </p>

          <div className="mt-6">
            <StoreOnboardingForm
              initialStoreName={currentUser?.storeName ?? session?.storeName ?? ""}
              initialNiche={currentUser?.niche}
              initialPhone={currentUser?.phone}
              initialWhatsappNumber={currentUser?.whatsappNumber}
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {[
            [
              "Nome da loja",
              currentUser?.storeName || "Pendente",
              "Nome comercial usado no painel e nos próximos fluxos.",
            ],
            [
              "Nicho",
              currentUser?.niche || "Pendente",
              "Define o contexto inicial da operação e do atendimento.",
            ],
            [
              "Telefone",
              currentUser?.phone || "Opcional",
              "Contato básico interno da loja para operação inicial.",
            ],
            [
              "WhatsApp principal",
              currentUser?.whatsappNumber || "Opcional",
              "Número que vamos usar como base da operação do canal.",
            ],
          ].map(([title, value, copy]) => (
            <div
              key={title}
              className="rounded-[1.6rem] border border-[#d9e6da] bg-[#fbfefb] p-5 shadow-[0_14px_32px_rgba(26,74,43,0.04)]"
            >
              <p className="display-font text-lg font-semibold text-[#173424]">{title}</p>
              <p className="mt-3 text-base font-medium text-[#2d8a4b]">{value}</p>
              <p className="mt-3 text-sm leading-7 text-[#5f7766]">{copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          [
            onboardingCompleted ? "Onboarding concluído" : "Onboarding em andamento",
            onboardingCompleted
              ? "A loja já tem os dados básicos preenchidos para seguir para a próxima etapa."
              : "Definir nome, nicho e dados básicos da operação.",
          ],
          ["Cadastro de produtos", "Criar base do catálogo para alimentar a IA."],
          ["Painel operacional", "Preparar área de conversas, reservas e ações rápidas."],
        ].map(([title, copy]) => (
          <div
            key={title}
            className="rounded-[1.6rem] border border-[#d9e6da] bg-[#fbfefb] p-5 shadow-[0_14px_32px_rgba(26,74,43,0.04)]"
          >
            <p className="display-font text-lg font-semibold text-[#173424]">{title}</p>
            <p className="mt-3 text-sm leading-7 text-[#5f7766]">{copy}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-[0.96fr_1.04fr]">
        <div className="rounded-[2rem] border border-[#d9e8db] bg-white p-6 shadow-[0_20px_48px_rgba(26,74,43,0.06)] sm:p-7">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#2d8a4b]">
            Cadastro manual de produtos
          </p>
          <h2 className="display-font mt-4 text-2xl font-semibold tracking-tight text-[#173424] sm:text-3xl">
            Monte a base do catálogo que vai alimentar a IA.
          </h2>
          <p className="mt-4 text-sm leading-7 text-[#5d7564]">
            Aqui começamos a estruturar o estoque e os dados mínimos que o
            VendaZap AI vai usar nas respostas comerciais.
          </p>

          <div className="mt-6">
            <ProductForm />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
          {[
            ["Produtos cadastrados", String(products.length)],
            ["Produtos ativos", String(activeProductsCount)],
            [
              "Próxima camada",
              products.length > 0 ? "Estoque e conversa com IA" : "Comece pelo primeiro item",
            ],
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

      <section className="rounded-[2rem] border border-[#dce8dd] bg-white p-6 shadow-[0_18px_44px_rgba(26,74,43,0.05)] sm:p-7">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#2d8a4b]">
              Catálogo da loja
            </p>
            <h2 className="display-font mt-3 text-2xl font-semibold tracking-tight text-[#173424]">
              Produtos cadastrados nesta conta
            </h2>
          </div>
          <div className="rounded-[1.2rem] border border-[#d7e5d8] bg-[#f6fbf6] px-4 py-3 text-sm text-[#597260]">
            Campos essenciais para o MVP: nome, categoria, preço e estoque
          </div>
        </div>

        <div className="mt-6 grid gap-4">
          {products.length === 0 ? (
            <div className="rounded-[1.5rem] border border-dashed border-[#cfe0d1] bg-[#f8fcf8] p-6 text-sm leading-7 text-[#607766]">
              Ainda não há produtos cadastrados. Assim que você adicionar os
              primeiros itens, esta área passa a refletir a base do catálogo da loja.
            </div>
          ) : (
            products.map((product) => (
              <div
                key={product.id}
                className="rounded-[1.6rem] border border-[#dbe7dc] bg-[#fbfefb] p-5 shadow-[0_14px_32px_rgba(26,74,43,0.04)]"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="max-w-2xl">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="display-font text-xl font-semibold text-[#173424]">
                        {product.name}
                      </p>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          product.active
                            ? "bg-[#e4f6e8] text-[#2d8a4b]"
                            : "bg-[#f2f4f2] text-[#6f8373]"
                        }`}
                      >
                        {product.active ? "Ativo" : "Inativo"}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-[#5b7362]">
                      {product.category}
                      {product.sku ? ` • SKU: ${product.sku}` : ""}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-[#5f7766]">
                      {product.description || "Sem descrição cadastrada."}
                    </p>
                    {product.compatibility ? (
                      <p className="mt-3 text-sm leading-7 text-[#486756]">
                        Compatibilidade: {product.compatibility}
                      </p>
                    ) : null}
                  </div>

                  <div className="min-w-full rounded-[1.4rem] border border-[#dce7dd] bg-white p-4 lg:min-w-[20rem]">
                    <div className="mb-4 grid grid-cols-2 gap-3 text-sm">
                      <div className="rounded-xl border border-[#e1ebe2] bg-[#f7fbf7] p-3">
                        <p className="text-[#6a7d6d]">Preço</p>
                        <p className="mt-1 font-semibold text-[#173424]">
                          R$ {product.price.toFixed(2).replace(".", ",")}
                        </p>
                      </div>
                      <div className="rounded-xl border border-[#e1ebe2] bg-[#f7fbf7] p-3">
                        <p className="text-[#6a7d6d]">Estoque</p>
                        <p className="mt-1 font-semibold text-[#173424]">
                          {product.stockQuantity} unidade(s)
                        </p>
                      </div>
                    </div>

                    <ProductStockForm
                      productId={product.id}
                      initialActive={product.active}
                      initialPrice={product.price}
                      initialStockQuantity={product.stockQuantity}
                    />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.02fr_0.98fr]">
        <div className="rounded-[2rem] border border-[#d9e8db] bg-white p-6 shadow-[0_20px_48px_rgba(26,74,43,0.06)] sm:p-7">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#2d8a4b]">
                Painel de conversas
              </p>
              <h2 className="display-font mt-3 text-2xl font-semibold tracking-tight text-[#173424] sm:text-3xl">
                Atendimento organizado por prioridade e status.
              </h2>
              <p className="mt-4 text-sm leading-7 text-[#5d7564]">
                Esta base já prepara a operação do lojista para acompanhar
                conversas, reservas e assumir atendimento humano quando necessário.
              </p>
            </div>
            <div className="rounded-[1.2rem] border border-[#d7e5d8] bg-[#f6fbf6] px-4 py-3 text-sm text-[#597260]">
              Seed local de desenvolvimento
            </div>
          </div>

          <div className="mt-6 grid gap-4">
            {conversations.map((conversation) => {
              const lastMessage =
                conversation.messages[conversation.messages.length - 1];
              const conversationSuggestion = aiSuggestions.find(
                (item) => item.conversationId === conversation.id,
              )?.suggestion;

              return (
                <div
                  key={conversation.id}
                  className="rounded-[1.6rem] border border-[#dbe7dc] bg-[#fbfefb] p-5 shadow-[0_14px_32px_rgba(26,74,43,0.04)]"
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
                        <p className="mt-3 text-sm leading-7 text-[#486756]">
                          Reserva vinculada: {conversation.reservedProduct}
                        </p>
                      ) : null}
                    </div>

                    <div className="min-w-full rounded-[1.4rem] border border-[#dce7dd] bg-white p-4 lg:min-w-[20rem]">
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

                  <ConversationMessageForm conversationId={conversation.id} />
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid gap-4">
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

          <div className="rounded-[2rem] border border-[#d9e8db] bg-white p-6 shadow-[0_20px_48px_rgba(26,74,43,0.06)] sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#2d8a4b]">
              Preparação WhatsApp Cloud API
            </p>
            <h2 className="display-font mt-4 text-2xl font-semibold tracking-tight text-[#173424] sm:text-3xl">
              Deixe os dados da integração preparados para a próxima etapa.
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#5d7564]">
              Aqui já deixamos a base da configuração do canal pronta para
              evoluir para webhook, mensagens recebidas e operação real.
            </p>

            <div className="mt-6">
              <WhatsappConfigForm
                initialDisplayNumber={currentUser?.whatsappDisplayNumber}
                initialBusinessPhoneId={currentUser?.whatsappBusinessPhoneId}
                initialAccessTokenHint={currentUser?.whatsappAccessTokenHint}
                initialConnected={Boolean(currentUser?.whatsappConnected)}
                initialWebhookReady={Boolean(currentUser?.whatsappWebhookReady)}
              />
            </div>

            <div className="mt-5 rounded-[1.2rem] border border-[#dce8dd] bg-[#f8fcf8] p-4 text-sm leading-7 text-[#58705f]">
              Endpoint local preparado: <span className="font-semibold text-[#173424]">/api/whatsapp/webhook</span>.
              Quando formos conectar a Cloud API de verdade, essa rota já poderá receber a verificação do webhook e mensagens de entrada.
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-[#dce8dd] bg-[linear-gradient(135deg,#eff7f0_0%,#f9fcf9_100%)] p-6 sm:p-7">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#2d8a4b]">
              Direção da experiência
            </p>
            <h2 className="display-font mt-3 text-2xl font-semibold tracking-tight text-[#173424]">
              O painel precisa ser rápido no celular e claro no uso diário.
            </h2>
          </div>
          <div className="rounded-[1.3rem] border border-[#cde0d0] bg-white px-4 py-3 text-sm text-[#5a7361]">
            Próxima camada: webhook + mensagens reais + reserva automática
          </div>
        </div>
      </section>
    </div>
  );
}
