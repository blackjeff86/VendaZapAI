import { NextResponse } from "next/server";
import {
  AUTH_COOKIE_NAME,
  encodeSession,
  getTemporaryAccessSession,
} from "@/lib/auth";

export async function POST(request: Request) {
  try {
    await request.json().catch(() => null);
    const session = await getTemporaryAccessSession();

    const response = NextResponse.json(
      { message: "Acesso liberado com sucesso." },
      { status: 200 },
    );

    response.cookies.set({
      name: AUTH_COOKIE_NAME,
      value: encodeSession(session),
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
          error instanceof Error ? error.message : "Não foi possível liberar o acesso.",
      },
      { status: 400 },
    );
  }
}
