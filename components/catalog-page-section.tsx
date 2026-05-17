import { CatalogWorkspace } from "@/components/catalog-workspace";
import { ProductForm } from "@/components/product-form";
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
  const categories = Array.from(
    new Set(products.map((product) => product.category).filter(Boolean)),
  ).slice(0, 6);

  return (
    <div className="space-y-5">
      <section className="flex flex-col gap-3">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-[1.6rem] font-bold tracking-[-0.03em] text-[#191c1d]">
              Gestão de catálogo
            </h1>
            <p className="text-sm text-[#3c4a3f]">
              Cadastre, organize e ajuste os produtos que a IA vai usar nas respostas.
            </p>
          </div>
          <div className="rounded-xl bg-[#006d3e] px-4 py-3 text-center text-sm font-semibold text-white shadow-[0_8px_20px_rgba(0,0,0,0.08)]">
            {activeProductsCount} produto(s) ativo(s)
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1">
          <span className="whitespace-nowrap rounded-full bg-[#006d3e] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.05em] text-white">
            Todos
          </span>
          {categories.length > 0 ? (
            categories.map((category) => (
              <span
                key={category}
                className="whitespace-nowrap rounded-full bg-[#e6e8e9] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.05em] text-[#3c4a3f]"
              >
                {category}
              </span>
            ))
          ) : (
            <span className="whitespace-nowrap rounded-full bg-[#e6e8e9] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.05em] text-[#3c4a3f]">
              Catálogo em montagem
            </span>
          )}
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="dashboard-card rounded-xl border border-[#bacbbc]/30 p-4">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#006d3e]">
                Onboarding da loja
              </p>
              <h2 className="mt-1 text-lg font-bold text-[#191c1d]">
                Base da operação
              </h2>
            </div>
            <span className={`rounded-full px-3 py-1 text-[11px] font-semibold ${onboardingCompleted ? "bg-[#00d981]/12 text-[#005931]" : "bg-[#fff3e0] text-[#e65100]"}`}>
              {onboardingCompleted ? "Concluído" : "Pendente"}
            </span>
          </div>
          <StoreOnboardingForm
            initialStoreName={currentUser?.storeName ?? sessionStoreName}
            initialNiche={currentUser?.niche}
            initialPhone={currentUser?.phone}
            initialWhatsappNumber={currentUser?.whatsappNumber}
          />
        </div>

        <div className="dashboard-card rounded-xl border border-[#bacbbc]/30 p-4">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#006d3e]">
                Novo produto
              </p>
              <h2 className="mt-1 text-lg font-bold text-[#191c1d]">
                Cadastro rápido
              </h2>
            </div>
            <span className="rounded-full bg-[#edf9ff] px-3 py-1 text-[11px] font-semibold text-[#00668a]">
              Manual
            </span>
          </div>
          <ProductForm />
        </div>
      </section>

      <section className="dashboard-card rounded-xl border border-[#bacbbc]/30 p-4">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-[#191c1d]">Produtos cadastrados</h2>
            <p className="text-sm text-[#3c4a3f]">
              Edite preço, estoque e status sem sair da tela.
            </p>
          </div>
          <span className="rounded-full bg-[#f2f4f5] px-3 py-1 text-[11px] font-semibold text-[#3c4a3f]">
            {products.length} item(ns)
          </span>
        </div>

        <CatalogWorkspace products={products} />
      </section>
    </div>
  );
}
