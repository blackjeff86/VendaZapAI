import { CatalogWorkspace } from "@/components/catalog-workspace";
import { ProductForm } from "@/components/product-form";
import { StoreOnboardingForm } from "@/components/store-onboarding-form";
import type { StoredProduct } from "@/lib/products";

function CatalogIcon({ title }: { title: string }) {
  const common = "h-[1rem] w-[1rem]";

  if (title === "Onboarding") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.9">
        <circle cx="12" cy="8" r="3" />
        <path d="M6.5 18a5.5 5.5 0 0 1 11 0" strokeLinecap="round" />
      </svg>
    );
  }

  if (title === "Produtos ativos" || title === "Produtos cadastrados") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.9">
        <path d="M6 6.5h12" strokeLinecap="round" />
        <path d="M6 11.5h12" strokeLinecap="round" />
        <path d="M6 16.5h8" strokeLinecap="round" />
      </svg>
    );
  }

  if (title === "Estoque") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.9">
        <path d="M5.5 8h13" strokeLinecap="round" />
        <path d="M8 12h8" strokeLinecap="round" />
        <path d="M9.5 16h5" strokeLinecap="round" />
        <path d="M6 5h12a1.5 1.5 0 0 1 1.5 1.5v11A1.5 1.5 0 0 1 18 19H6a1.5 1.5 0 0 1-1.5-1.5v-11A1.5 1.5 0 0 1 6 5Z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (title === "Compatibilidade") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.9">
        <path d="m7 12 3 3 7-7" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="12" r="8" />
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
        <div className="dashboard-card-strong rounded-[2rem] p-6 sm:p-7">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#2d8a4b]">
            Base da loja
          </p>
          <h1 className="display-font mt-4 text-2xl font-semibold tracking-tight text-[#173424] sm:text-3xl">
            Organize a base da loja para a IA responder com segurança.
          </h1>
          <p className="mt-4 text-sm leading-7 text-[#5d7564]">
            Esta área reúne as informações básicas da loja e os produtos que o
            VendaZap AI vai usar nas respostas comerciais e nas reservas.
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
              className={`rounded-[1.7rem] border p-5 shadow-[0_14px_32px_rgba(26,74,43,0.07)] ${
                title === "Produtos ativos"
                  ? "dashboard-tint-green border-[#bfe5c7]"
                  : title === "Produtos cadastrados"
                    ? "dashboard-tint-cyan border-[#cae2df]"
                    : "dashboard-card border-[#d9e6da]"
              }`}
            >
              <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-[1rem] bg-[rgba(255,255,255,0.72)] text-[#2d8a4b]">
                <CatalogIcon title={title} />
              </span>
              <p className="display-font text-lg font-semibold text-[#173424]">{title}</p>
              <p className="mt-3 text-2xl font-semibold text-[#2d8a4b]">{value}</p>
              <p className="mt-3 text-sm leading-7 text-[#5f7766]">{copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[0.96fr_1.04fr]">
        <div className="dashboard-card rounded-[2rem] p-6 sm:p-7">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#2d8a4b]">
            Cadastro manual de produtos
          </p>
          <h2 className="display-font mt-4 text-2xl font-semibold tracking-tight text-[#173424] sm:text-3xl">
            Monte a base do catálogo que vai alimentar a IA.
          </h2>
          <p className="mt-4 text-sm leading-7 text-[#5d7564]">
            Comece pelos itens que mais geram pergunta no WhatsApp. Isso já
            dá contexto suficiente para testar busca, resposta comercial e reserva.
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
              className={`rounded-[1.7rem] border p-5 shadow-[0_14px_32px_rgba(26,74,43,0.07)] ${
                title === "Próximo passo"
                  ? "dashboard-tint-warm border-[#f0d9a6]"
                  : "dashboard-card border-[#d9e6da]"
              }`}
            >
              <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-[1rem] bg-[rgba(255,255,255,0.72)] text-[#2d8a4b]">
                <CatalogIcon title={title} />
              </span>
              <p className="display-font text-lg font-semibold text-[#173424]">{title}</p>
              <p className="mt-3 text-sm leading-7 text-[#5f7766]">{copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="dashboard-card rounded-[2rem] p-6 sm:p-7">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#2d8a4b]">
              Catálogo da loja
            </p>
            <h2 className="display-font mt-3 text-2xl font-semibold tracking-tight text-[#173424]">
              Produtos cadastrados nesta conta
            </h2>
          </div>
          <div className="dashboard-chip rounded-[1.2rem] px-4 py-3 text-sm text-[#597260]">
            Campos essenciais para o MVP: nome, categoria, preço e estoque
          </div>
        </div>

        <div className="mt-6">
          <CatalogWorkspace products={products} />
        </div>
      </section>
    </div>
  );
}
