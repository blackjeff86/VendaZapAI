import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { AUTH_COOKIE_NAME, decodeSession } from "@/lib/auth";
import { updateConversationHandoff } from "@/lib/conversations";

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
    const body = (await request.json()) as { humanActive?: boolean };

    const conversation = await updateConversationHandoff(
      id,
      session.userId,
      Boolean(body.humanActive),
    );

    return NextResponse.json(
      { message: "Conversa atualizada com sucesso.", conversation },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Não foi possível atualizar a conversa.",
      },
      { status: 400 },
    );
  }
}
