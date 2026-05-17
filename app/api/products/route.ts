import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { AUTH_COOKIE_NAME, decodeSession } from "@/lib/auth";
import { createProduct, listProductsByUserId } from "@/lib/products";

export async function GET() {
  const cookieStore = await cookies();
  const session = decodeSession(cookieStore.get(AUTH_COOKIE_NAME)?.value);

  if (!session) {
    return NextResponse.json({ message: "Sessão inválida." }, { status: 401 });
  }

  const products = await listProductsByUserId(session.userId);
  return NextResponse.json({ products }, { status: 200 });
}

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const session = decodeSession(cookieStore.get(AUTH_COOKIE_NAME)?.value);

  if (!session) {
    return NextResponse.json({ message: "Sessão inválida." }, { status: 401 });
  }

  try {
    const body = (await request.json()) as {
      category?: string;
      compatibility?: string;
      description?: string;
      name?: string;
      price?: number;
      sku?: string;
      stockQuantity?: number;
    };

    const product = await createProduct({
      userId: session.userId,
      name: body.name ?? "",
      category: body.category ?? "",
      description: body.description ?? "",
      price: Number(body.price ?? 0),
      stockQuantity: Number(body.stockQuantity ?? 0),
      sku: body.sku ?? "",
      compatibility: body.compatibility ?? "",
    });

    return NextResponse.json(
      { message: "Produto salvo com sucesso.", product },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Não foi possível salvar o produto.",
      },
      { status: 400 },
    );
  }
}
