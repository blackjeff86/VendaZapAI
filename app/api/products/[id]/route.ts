import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { AUTH_COOKIE_NAME, decodeSession } from "@/lib/auth";
import { updateProduct } from "@/lib/products";

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const cookieStore = await cookies();
  const session = decodeSession(cookieStore.get(AUTH_COOKIE_NAME)?.value);

  if (!session) {
    return NextResponse.json({ message: "Sessão inválida." }, { status: 401 });
  }

  try {
    const { id } = await context.params;
    const body = (await request.json()) as {
      active?: boolean;
      price?: number;
      stockQuantity?: number;
    };

    const product = await updateProduct(id, {
      userId: session.userId,
      active: body.active,
      price:
        typeof body.price === "number" ? Number(body.price) : undefined,
      stockQuantity:
        typeof body.stockQuantity === "number"
          ? Number(body.stockQuantity)
          : undefined,
    });

    return NextResponse.json(
      { message: "Produto atualizado com sucesso.", product },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Não foi possível atualizar o produto.",
      },
      { status: 400 },
    );
  }
}
