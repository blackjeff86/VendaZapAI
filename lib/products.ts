import { randomUUID } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { resolveDataFilePath } from "@/lib/storage-path";

export type ProductInput = {
  category: string;
  compatibility?: string;
  description: string;
  name: string;
  price: number;
  sku?: string;
  stockQuantity: number;
  userId: string;
};

export type ProductUpdateInput = {
  active?: boolean;
  price?: number;
  stockQuantity?: number;
  userId: string;
};

export type StoredProduct = {
  active: boolean;
  category: string;
  compatibility?: string;
  createdAt: string;
  description: string;
  id: string;
  name: string;
  price: number;
  sku?: string;
  stockQuantity: number;
  updatedAt: string;
  userId: string;
};

function resolveProductsFilePath() {
  return resolveDataFilePath(process.env.PRODUCTS_FILE_PATH, "products.json");
}

async function readProducts(): Promise<StoredProduct[]> {
  const filePath = resolveProductsFilePath();

  try {
    const fileContent = await readFile(filePath, "utf8");
    const parsed = JSON.parse(fileContent) as StoredProduct[];
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    const code =
      typeof error === "object" && error && "code" in error
        ? String((error as { code?: string }).code)
        : "";

    if (code === "ENOENT") {
      return [];
    }

    throw error;
  }
}

async function writeProducts(products: StoredProduct[]) {
  const filePath = resolveProductsFilePath();
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, JSON.stringify(products, null, 2), "utf8");
}

export function validateProductInput(input: ProductInput) {
  const normalized = {
    category: input.category.trim(),
    compatibility: input.compatibility?.trim() || "",
    description: input.description.trim(),
    name: input.name.trim(),
    price: Number(input.price),
    sku: input.sku?.trim() || "",
    stockQuantity: Number(input.stockQuantity),
    userId: input.userId.trim(),
  };

  if (!normalized.userId) {
    throw new Error("Usuário inválido.");
  }

  if (normalized.name.length < 2) {
    throw new Error("Informe o nome do produto.");
  }

  if (normalized.category.length < 2) {
    throw new Error("Informe a categoria do produto.");
  }

  if (!Number.isFinite(normalized.price) || normalized.price < 0) {
    throw new Error("Informe um preco valido.");
  }

  if (!Number.isFinite(normalized.stockQuantity) || normalized.stockQuantity < 0) {
    throw new Error("Informe um estoque valido.");
  }

  return normalized;
}

export function validateProductUpdateInput(input: ProductUpdateInput) {
  const normalized = {
    active: input.active,
    price:
      typeof input.price === "number" ? Number(input.price) : undefined,
    stockQuantity:
      typeof input.stockQuantity === "number"
        ? Number(input.stockQuantity)
        : undefined,
    userId: input.userId.trim(),
  };

  if (!normalized.userId) {
    throw new Error("Usuário inválido.");
  }

  if (
    normalized.price !== undefined &&
    (!Number.isFinite(normalized.price) || normalized.price < 0)
  ) {
    throw new Error("Informe um preco valido.");
  }

  if (
    normalized.stockQuantity !== undefined &&
    (!Number.isFinite(normalized.stockQuantity) || normalized.stockQuantity < 0)
  ) {
    throw new Error("Informe um estoque valido.");
  }

  return normalized;
}

export async function listProductsByUserId(userId: string) {
  const products = await readProducts();
  return products
    .filter((product) => product.userId === userId)
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export async function getProductById(productId: string, userId: string) {
  const products = await readProducts();
  return (
    products.find(
      (product) => product.id === productId && product.userId === userId,
    ) ?? null
  );
}

export async function createProduct(input: ProductInput) {
  const normalized = validateProductInput(input);
  const products = await readProducts();
  const timestamp = new Date().toISOString();

  const product: StoredProduct = {
    id: randomUUID(),
    userId: normalized.userId,
    name: normalized.name,
    category: normalized.category,
    description: normalized.description,
    price: normalized.price,
    stockQuantity: normalized.stockQuantity,
    sku: normalized.sku || undefined,
    compatibility: normalized.compatibility || undefined,
    active: true,
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  products.push(product);
  await writeProducts(products);

  return product;
}

export async function updateProduct(productId: string, input: ProductUpdateInput) {
  const normalized = validateProductUpdateInput(input);
  const products = await readProducts();
  const productIndex = products.findIndex(
    (product) => product.id === productId && product.userId === normalized.userId,
  );

  if (productIndex === -1) {
    throw new Error("Produto não encontrado.");
  }

  const currentProduct = products[productIndex];

  const updatedProduct: StoredProduct = {
    ...currentProduct,
    active:
      typeof normalized.active === "boolean"
        ? normalized.active
        : currentProduct.active,
    price:
      typeof normalized.price === "number"
        ? normalized.price
        : currentProduct.price,
    stockQuantity:
      typeof normalized.stockQuantity === "number"
        ? normalized.stockQuantity
        : currentProduct.stockQuantity,
    updatedAt: new Date().toISOString(),
  };

  products[productIndex] = updatedProduct;
  await writeProducts(products);

  return updatedProduct;
}

export async function reserveProductStock(productId: string, userId: string) {
  const products = await readProducts();
  const productIndex = products.findIndex(
    (product) => product.id === productId && product.userId === userId,
  );

  if (productIndex === -1) {
    throw new Error("Produto não encontrado.");
  }

  const currentProduct = products[productIndex];

  if (!currentProduct.active) {
    throw new Error("O produto está inativo e não pode ser reservado.");
  }

  if (currentProduct.stockQuantity <= 0) {
    throw new Error("Este produto está sem estoque.");
  }

  const updatedProduct: StoredProduct = {
    ...currentProduct,
    stockQuantity: currentProduct.stockQuantity - 1,
    updatedAt: new Date().toISOString(),
  };

  products[productIndex] = updatedProduct;
  await writeProducts(products);

  return updatedProduct;
}
