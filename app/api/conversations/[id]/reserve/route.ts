import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { AUTH_COOKIE_NAME, decodeSession } from "@/lib/auth";
import { reserveConversationProduct } from "@/lib/conversations";
import { getProductById, reserveProductStock } from "@/lib/products";

export async function POST(
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
      pickupName?: string;
      pickupWindow?: string;
      productId?: string;
    };
    const productId = body.productId?.trim() ?? "";

    if (!productId) {
      throw new Error("Selecione um produto para reservar.");
    }

    const product = await getProductById(productId, session.userId);

    if (!product) {
      throw new Error("Produto não encontrado.");
    }

    const updatedProduct = await reserveProductStock(productId, session.userId);
    const conversation = await reserveConversationProduct(
      id,
      {
        pickupName: body.pickupName ?? "",
        pickupWindow: body.pickupWindow ?? "",
        productName: product.name,
        userId: session.userId,
      },
    );

    return NextResponse.json(
      {
        conversation,
        message: "Reserva criada com sucesso.",
        product: updatedProduct,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Não foi possível criar a reserva.",
      },
      { status: 400 },
    );
  }
}
