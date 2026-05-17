import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { AUTH_COOKIE_NAME, decodeSession } from "@/lib/auth";
import { buildAssistantSuggestion } from "@/lib/ai-assistant";
import { appendConversationMessage, getConversationById } from "@/lib/conversations";
import { listProductsByUserId } from "@/lib/products";
import type { MessageAuthor } from "@/lib/conversations";

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
      author?: MessageAuthor;
      autoReply?: boolean;
      content?: string;
    };
    const author = body.author ?? "cliente";

    const conversation = await appendConversationMessage(id, {
      author,
      content: body.content ?? "",
      userId: session.userId,
    });

    let suggestion = null;
    let autoReplyApplied = false;

    if (body.autoReply && author === "cliente") {
      const products = await listProductsByUserId(session.userId);
      suggestion = buildAssistantSuggestion(conversation, products);

      await appendConversationMessage(id, {
        author: "ia",
        content: suggestion.suggestedReply,
        userId: session.userId,
      });

      autoReplyApplied = true;
    }

    const updatedConversation = await getConversationById(id, session.userId);

    return NextResponse.json(
      {
        autoReplyApplied,
        conversation: updatedConversation,
        message: autoReplyApplied
          ? "Mensagem simulada e resposta da IA aplicada."
          : author === "humano"
            ? "Resposta manual enviada com sucesso."
            : "Mensagem simulada com sucesso.",
        suggestion,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Não foi possível registrar a mensagem.",
      },
      { status: 400 },
    );
  }
}
