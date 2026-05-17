import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  AUTH_COOKIE_NAME,
  decodeSession,
} from "@/lib/auth";
import { buildAssistantSuggestion } from "@/lib/ai-assistant";
import { getConversationById } from "@/lib/conversations";
import { listProductsByUserId } from "@/lib/products";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const cookieStore = await cookies();
  const session = decodeSession(cookieStore.get(AUTH_COOKIE_NAME)?.value);

  if (!session) {
    return NextResponse.json({ message: "Não autenticado." }, { status: 401 });
  }

  const { id } = await context.params;
  const [conversation, products] = await Promise.all([
    getConversationById(id, session.userId),
    listProductsByUserId(session.userId),
  ]);

  if (!conversation) {
    return NextResponse.json({ message: "Conversa não encontrada." }, { status: 404 });
  }

  const suggestion = buildAssistantSuggestion(conversation, products);

  return NextResponse.json({ suggestion });
}
