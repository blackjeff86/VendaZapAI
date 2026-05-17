import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  AUTH_COOKIE_NAME,
  decodeSession,
  encodeSession,
  updateStoreProfile,
} from "@/lib/auth";

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const session = decodeSession(cookieStore.get(AUTH_COOKIE_NAME)?.value);

  if (!session) {
    return NextResponse.json({ message: "Sessão inválida." }, { status: 401 });
  }

  try {
    const body = (await request.json()) as {
      niche?: string;
      phone?: string;
      storeName?: string;
      whatsappNumber?: string;
    };

    const user = await updateStoreProfile({
      userId: session.userId,
      niche: body.niche ?? "",
      phone: body.phone ?? "",
      storeName: body.storeName ?? "",
      whatsappNumber: body.whatsappNumber ?? "",
    });

    const response = NextResponse.json(
      { message: "Perfil da loja salvo com sucesso." },
      { status: 200 },
    );

    response.cookies.set({
      name: AUTH_COOKIE_NAME,
      value: encodeSession({
        email: session.email,
        name: session.name,
        storeName: user.storeName,
        userId: session.userId,
      }),
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Não foi possível salvar os dados da loja.",
      },
      { status: 400 },
    );
  }
}
