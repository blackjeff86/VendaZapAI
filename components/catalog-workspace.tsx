"use client";

import { useMemo, useState } from "react";
import { ProductStockForm } from "@/components/product-stock-form";
import type { StoredProduct } from "@/lib/products";

type CatalogWorkspaceProps = {
  products: StoredProduct[];
};

type StockFilter = "todos" | "ativos" | "baixo_estoque" | "sem_estoque";

function normalizeText(value: string) {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();
}

export function CatalogWorkspace({ products }: CatalogWorkspaceProps) {
  const [search, setSearch] = useState("");
  const [stockFilter, setStockFilter] = useState<StockFilter>("todos");

  const filteredProducts = useMemo(() => {
    const normalizedSearch = normalizeText(search.trim());

    return products.filter((product) => {
      if (stockFilter === "ativos" && !product.active) {
        return false;
      }

      if (stockFilter === "baixo_estoque" && product.stockQuantity > 3) {
        return false;
      }

      if (stockFilter === "sem_estoque" && product.stockQuantity > 0) {
        return false;
      }

      if (!normalizedSearch) {
        return true;
      }

      const haystack = normalizeText(
        [
          product.name,
          product.category,
          product.compatibility ?? "",
          product.sku ?? "",
          product.description,
        ].join(" "),
      );

      return haystack.includes(normalizedSearch);
    });
  }, [products, search, stockFilter]);

  const quickFilters: Array<{
    count: number;
    label: string;
    value: StockFilter;
  }> = [
    { count: products.length, label: "Todos", value: "todos" },
    {
      count: products.filter((product) => product.active).length,
      label: "Ativos",
      value: "ativos",
    },
    {
      count: products.filter((product) => product.stockQuantity <= 3).length,
      label: "Baixo estoque",
      value: "baixo_estoque",
    },
    {
      count: products.filter((product) => product.stockQuantity === 0).length,
      label: "Sem estoque",
      value: "sem_estoque",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="dashboard-card rounded-xl border border-[#bacbbc]/30 p-4">
        <div className="mb-3 flex items-center justify-between gap-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#6d8373]">
            Filtrar catálogo
          </p>
          <span className="text-xs text-[#6d8373]">{filteredProducts.length} itens</span>
        </div>
        <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-3">
          {quickFilters.map((filter) => {
            const isActive = stockFilter === filter.value;

            return (
              <button
                key={filter.value}
                type="button"
                onClick={() => setStockFilter(filter.value)}
                className={`min-w-fit rounded-full border px-4 py-2 text-sm font-semibold transition ${
                  isActive
                    ? "border-[#006d3e] bg-[#006d3e] text-white"
                    : "border-[#e1e3e4] bg-[#e6e8e9] text-[#3c4a3f]"
                }`}
              >
                {filter.label} ({filter.count})
              </button>
            );
          })}
        </div>

        <div className="grid gap-3 lg:grid-cols-[1.15fr_0.85fr]">
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Buscar por produto, SKU, categoria ou compatibilidade"
            className="w-full rounded-xl border border-[#bacbbc]/30 bg-white px-4 py-3 text-sm text-[#191c1d] outline-none placeholder:text-[#6b7b6e]"
          />

          <select
            value={stockFilter}
            onChange={(event) => setStockFilter(event.target.value as StockFilter)}
            className="w-full rounded-xl border border-[#bacbbc]/30 bg-white px-4 py-3 text-sm text-[#191c1d] outline-none"
          >
            <option value="todos">Todos os produtos</option>
            <option value="ativos">Somente ativos</option>
            <option value="baixo_estoque">Baixo estoque</option>
            <option value="sem_estoque">Sem estoque</option>
          </select>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-[#5f7766]">
          <span>{filteredProducts.length} produto(s) exibido(s)</span>
          {(search || stockFilter !== "todos") && (
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setStockFilter("todos");
              }}
              className="rounded-full border border-[#bacbbc]/30 bg-white px-3 py-1.5 font-medium text-[#006d3e] transition hover:bg-[#f8fafb]"
            >
              Limpar filtros
            </button>
          )}
        </div>
      </div>

      <div className="grid gap-4">
        {filteredProducts.length === 0 ? (
          <div className="rounded-[1.5rem] border border-dashed border-[#cfe0d1] bg-[#f8fcf8] p-6 text-sm leading-7 text-[#607766]">
            Nenhum produto encontrado com os filtros atuais.
          </div>
        ) : (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="dashboard-card dashboard-soft-enter rounded-xl border border-[#bacbbc]/30 p-3 sm:p-4"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-base font-bold text-[#191c1d]">
                      {product.name}
                    </p>
                    <span
                      className={`rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] ${
                        product.active
                          ? "bg-[#00d981]/12 text-[#005931]"
                          : "bg-[#e6e8e9] text-[#3c4a3f]"
                      }`}
                    >
                      {product.active ? "Ativo" : "Inativo"}
                    </span>
                    {product.stockQuantity <= 3 ? (
                      <span className="rounded-md bg-[#fff3e0] px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] text-[#e65100]">
                        {product.stockQuantity === 0 ? "Sem estoque" : "Baixo estoque"}
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-1 text-sm text-[#3c4a3f]">
                    {product.category}
                    {product.sku ? ` • SKU: ${product.sku}` : ""}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="rounded-full bg-[#e6e8e9] px-3 py-1 text-[11px] font-semibold text-[#3c4a3f]">
                      {product.compatibility ? "Compatível" : "Sem compatibilidade"}
                    </span>
                    <span className="rounded-full bg-[#e6e8e9] px-3 py-1 text-[11px] font-semibold text-[#3c4a3f]">
                      Atualização rápida
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-[#3c4a3f]">
                    {product.description || "Sem descrição cadastrada."}
                  </p>
                  {product.compatibility ? (
                    <p className="mt-3 text-sm leading-6 text-[#3c4a3f]">
                      Compatibilidade: {product.compatibility}
                    </p>
                  ) : null}
                </div>

                <div className="min-w-full rounded-xl border border-[#bacbbc]/30 bg-[#f8fafb] p-4 lg:min-w-[21rem]">
                  <div className="mb-4 grid grid-cols-2 gap-3 text-sm">
                    <div className="rounded-xl bg-white p-3 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                      <p className="text-[#6b7b6e]">Preço</p>
                      <p className="mt-1 font-semibold text-[#191c1d]">
                        R$ {product.price.toFixed(2).replace(".", ",")}
                      </p>
                    </div>
                    <div className="rounded-xl bg-white p-3 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                      <p className="text-[#6b7b6e]">Estoque</p>
                      <p className="mt-1 font-semibold text-[#191c1d]">
                        {product.stockQuantity} unidade(s)
                      </p>
                    </div>
                  </div>

                  <div className="mb-4 rounded-xl bg-[#edf9ff] p-3 text-sm leading-6 text-[#004c69]">
                    Ajuste rápido pensado para o celular: corrija preço, estoque e status sem abrir outra tela.
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
    </div>
  );
}
