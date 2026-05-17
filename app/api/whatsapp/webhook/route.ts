import { NextResponse } from "next/server";
import { getUserByWhatsappBusinessPhoneId } from "@/lib/auth";
import { buildAssistantSuggestion } from "@/lib/ai-assistant";
import {
  appendConversationMessage,
  createIncomingConversation,
  findConversationByClientPhone,
  getConversationById,
  markConversationAsHumanByClientPhone,
} from "@/lib/conversations";
import { listProductsByUserId } from "@/lib/products";

type MetaWebhookPayload = {
  entry?: Array<{
    changes?: Array<{
      value?: {
        contacts?: Array<{
          profile?: {
            name?: string;
          };
          wa_id?: string;
        }>;
        messages?: Array<{
          from?: string;
          audio?: {
            id?: string;
          };
          text?: {
            body?: string;
          };
          type?: string;
        }>;
        metadata?: {
          phone_number_id?: string;
        };
        smb_message_echoes?: Array<{
          text?: {
            body?: string;
          };
          to?: string;
          type?: string;
        }>;
      };
    }>;
  }>;
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");
  const expectedToken = process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN;

  if (mode === "subscribe" && token && expectedToken && token === expectedToken) {
    return new Response(challenge ?? "ok", { status: 200 });
  }

  return NextResponse.json(
    { message: "Falha na verificação do webhook." },
    { status: 403 },
  );
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as MetaWebhookPayload;
    const change = payload.entry?.[0]?.changes?.[0];
    const value = change?.value;
    const phoneNumberId = value?.metadata?.phone_number_id?.trim() ?? "";
    const outboundEcho = value?.smb_message_echoes?.[0];
    const incomingMessage = value?.messages?.[0];

    if (phoneNumberId && outboundEcho?.to) {
      const user = await getUserByWhatsappBusinessPhoneId(phoneNumberId);

      if (user) {
        await markConversationAsHumanByClientPhone(
          outboundEcho.to,
          user.id,
          outboundEcho.text?.body,
        );
      }

      return NextResponse.json(
        { message: "Eco de mensagem da loja processado." },
        { status: 200 },
      );
    }

    if (!phoneNumberId || !incomingMessage?.from) {
      return NextResponse.json(
        { message: "Evento recebido, mas sem mensagem processável." },
        { status: 200 },
      );
    }

    const user = await getUserByWhatsappBusinessPhoneId(phoneNumberId);

    if (!user) {
      return NextResponse.json(
        { message: "Nenhuma loja vinculada a este Phone Number ID." },
        { status: 202 },
      );
    }

    const clientPhone = incomingMessage.from.trim();
    const clientName = value?.contacts?.[0]?.profile?.name?.trim() || clientPhone;
    const isAudioMessage = incomingMessage.type === "audio";
    const content = isAudioMessage
      ? "[Áudio recebido - aguardando transcrição]"
      : incomingMessage.text?.body?.trim() ?? "";

    if (!content) {
      return NextResponse.json(
        { message: "Evento recebido, mas sem conteúdo processável." },
        { status: 200 },
      );
    }

    let conversation = await findConversationByClientPhone(clientPhone, user.id);

    if (!conversation) {
      conversation = await createIncomingConversation({
        clientName,
        clientPhone,
        content,
        inputType: isAudioMessage ? "audio" : "texto",
        userId: user.id,
      });
    } else {
      conversation = await appendConversationMessage(conversation.id, {
        author: "cliente",
        content,
        inputType: isAudioMessage ? "audio" : "texto",
        userId: user.id,
      });
    }

    const products = await listProductsByUserId(user.id);
    const suggestion = buildAssistantSuggestion(conversation, products);
    const humanHandoffActive =
      conversation.status === "em_atendimento_humano" ||
      conversation.status === "aguardando_humano";
    const shouldAutoReply =
      !humanHandoffActive && !suggestion.shouldEscalateToHuman;

    if (shouldAutoReply) {
      await appendConversationMessage(conversation.id, {
        author: "ia",
        content: suggestion.suggestedReply,
        userId: user.id,
      });
    }

    const updatedConversation = await getConversationById(conversation.id, user.id);

    return NextResponse.json(
      {
        autoReplyPrepared: shouldAutoReply,
        conversation: updatedConversation,
        message: shouldAutoReply
          ? "Mensagem recebida e resposta local preparada."
          : humanHandoffActive
            ? "Mensagem recebida com IA pausada para atendimento humano."
            : "Mensagem recebida e marcada para atendimento humano.",
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
            : "Não foi possível processar o webhook.",
      },
      { status: 400 },
    );
  }
}
