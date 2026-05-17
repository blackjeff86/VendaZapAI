import { NextResponse } from "next/server";
import { AUTH_COOKIE_NAME, encodeSession, registerUser } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      email?: string;
      name?: string;
      password?: string;
      storeName?: string;
    };

    const session = await registerUser({
      name: body.name ?? "",
      storeName: body.storeName ?? "",
      email: body.email ?? "",
      password: body.password ?? "",
    });

    const response = NextResponse.json(
      { message: "Conta criada com sucesso." },
      { status: 201 },
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
          error instanceof Error ? error.message : "Nao foi possivel criar a conta.",
      },
      { status: 400 },
    );
  }
}
