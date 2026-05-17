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

  return (
    <div className="space-y-4">
      <div className="rounded-[1.6rem] border border-[#d9e6da] bg-white p-4 shadow-[0_14px_32px_rgba(26,74,43,0.04)]">
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
