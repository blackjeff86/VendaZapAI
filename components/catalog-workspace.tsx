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
      <div className="rounded-[1.6rem] border border-[#d9e6da] bg-white p-4 shadow-[0_14px_32px_rgba(26,74,43,0.04)]">
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
                    ? "border-[#7bb98c] bg-[#ecf8ee] text-[#226f42]"
                    : "border-[#d8e6d9] bg-[#fbfefb] text-[#56715d]"
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
            className="w-full rounded-2xl border border-[#d8e6d9] bg-[#fbfefb] px-4 py-3 text-sm text-[#173424] outline-none placeholder:text-[#8aa08f]"
          />

          <select
            value={stockFilter}
            onChange={(event) => setStockFilter(event.target.value as StockFilter)}
            className="w-full rounded-2xl border border-[#d8e6d9] bg-[#fbfefb] px-4 py-3 text-sm text-[#173424] outline-none"
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
              className="rounded-full border border-[#cfe0d0] bg-white px-3 py-1.5 font-medium text-[#1d3a29] transition hover:border-[#8abf93] hover:bg-[#f4fbf4]"
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
              className="rounded-[1.6rem] border border-[#dbe7dc] bg-[linear-gradient(180deg,#ffffff_0%,#fbfefb_100%)] p-4 shadow-[0_14px_32px_rgba(26,74,43,0.04)] sm:p-5"
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
                    {product.stockQuantity <= 3 ? (
                      <span className="rounded-full bg-[#fff4dd] px-3 py-1 text-xs font-semibold text-[#9b6a10]">
                        {product.stockQuantity === 0 ? "Sem estoque" : "Baixo estoque"}
                      </span>
                    ) : null}
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

                <div className="min-w-full rounded-[1.4rem] border border-[#dce7dd] bg-white p-4 lg:min-w-[21rem]">
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

                  <div className="mb-4 rounded-[1rem] border border-[#dce8dd] bg-[#f8fcf8] p-3 text-sm leading-6 text-[#58705f]">
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
