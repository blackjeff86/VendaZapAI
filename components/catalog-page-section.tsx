import { ProductForm } from "@/components/product-form";
import { ProductStockForm } from "@/components/product-stock-form";
import { StoreOnboardingForm } from "@/components/store-onboarding-form";
import type { StoredProduct } from "@/lib/products";

type CatalogPageSectionProps = {
  activeProductsCount: number;
  currentUser: {
    niche?: string;
    phone?: string;
    storeName: string;
    whatsappNumber?: string;
  } | null;
  onboardingCompleted: boolean;
  products: StoredProduct[];
  sessionStoreName: string;
};

export function CatalogPageSection({
  activeProductsCount,
  currentUser,
  onboardingCompleted,
  products,
  sessionStoreName,
}: CatalogPageSectionProps) {
  return (
    <div className="space-y-6">
      <section className="grid gap-4 lg:grid-cols-[0.98fr_1.02fr]">
        <div className="rounded-[2rem] border border-[#d9e8db] bg-white p-6 shadow-[0_20px_48px_rgba(26,74,43,0.06)] sm:p-7">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#2d8a4b]">
            Base da loja
          </p>
          <h1 className="display-font mt-4 text-2xl font-semibold tracking-tight text-[#173424] sm:text-3xl">
            Ajuste o onboarding e o catálogo que alimentam a IA.
          </h1>
          <p className="mt-4 text-sm leading-7 text-[#5d7564]">
            Esta área reúne as informações básicas da loja e os produtos que o
            VendaZap AI vai usar nas respostas comerciais.
          </p>

          <div className="mt-6">
            <StoreOnboardingForm
              initialStoreName={currentUser?.storeName ?? sessionStoreName}
              initialNiche={currentUser?.niche}
              initialPhone={currentUser?.phone}
              initialWhatsappNumber={currentUser?.whatsappNumber}
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
          {[
            [
              "Onboarding",
              onboardingCompleted ? "Concluído" : "Pendente",
              onboardingCompleted
                ? "Os dados mínimos da loja já foram preenchidos."
                : "Preencha nome, nicho e canal principal da loja.",
            ],
            [
              "Produtos ativos",
              String(activeProductsCount),
              "Itens disponíveis para a IA considerar nas respostas.",
            ],
            [
              "Produtos cadastrados",
              String(products.length),
              "Catálogo total da conta nesta etapa do MVP.",
            ],
          ].map(([title, value, copy]) => (
            <div
              key={title}
              className="rounded-[1.6rem] border border-[#d9e6da] bg-[#fbfefb] p-5 shadow-[0_14px_32px_rgba(26,74,43,0.04)]"
            >
              <p className="display-font text-lg font-semibold text-[#173424]">{title}</p>
              <p className="mt-3 text-2xl font-semibold text-[#2d8a4b]">{value}</p>
              <p className="mt-3 text-sm leading-7 text-[#5f7766]">{copy}</p>
            </div>
          ))}
        </div>
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
            Comece com os itens mais procurados da loja. Isso já dá contexto
            suficiente para testar busca, resposta comercial e reserva.
          </p>

          <div className="mt-6">
            <ProductForm />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
          {[
            ["Estoque", "Ajuste preço e saldo por produto"],
            ["Compatibilidade", "Use para motopeças e itens técnicos"],
            ["Próximo passo", "Deixe o catálogo pronto para testar conversas"],
          ].map(([title, copy]) => (
            <div
              key={title}
              className="rounded-[1.6rem] border border-[#d9e6da] bg-[#fbfefb] p-5 shadow-[0_14px_32px_rgba(26,74,43,0.04)]"
            >
              <p className="display-font text-lg font-semibold text-[#173424]">{title}</p>
              <p className="mt-3 text-sm leading-7 text-[#5f7766]">{copy}</p>
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
    </div>
  );
}
