import { NextResponse } from "next/server";
import { AUTH_COOKIE_NAME, encodeSession, loginUser } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      email?: string;
      password?: string;
    };

    const session = await loginUser({
      email: body.email ?? "",
      password: body.password ?? "",
    });

    const response = NextResponse.json(
      { message: "Login realizado com sucesso." },
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
          error instanceof Error ? error.message : "Nao foi possivel fazer login.",
      },
      { status: 400 },
    );
  }
}
