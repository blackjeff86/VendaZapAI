import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { buildAssistantSuggestion } from "@/lib/ai-assistant";
import { AUTH_COOKIE_NAME, decodeSession, getUserById } from "@/lib/auth";
import { listConversationsByUserId } from "@/lib/conversations";
import { listProductsByUserId } from "@/lib/products";

export const conversationStatusLabelMap = {
  aguardando_dados: "Aguardando dados",
  aguardando_humano: "Aguardando humano",
  em_atendimento_humano: "Em atendimento humano",
  nova: "Nova",
  reservada: "Reservada",
  respondida_pela_ia: "Respondida pela IA",
} as const;

export async function getDashboardData() {
  const cookieStore = await cookies();
  const session = decodeSession(cookieStore.get(AUTH_COOKIE_NAME)?.value);

  if (!session) {
    redirect("/entrar");
  }

  const currentUser = await getUserById(session.userId);
  const products = await listProductsByUserId(session.userId);
  const conversations = await listConversationsByUserId(session.userId);
  const onboardingCompleted = Boolean(currentUser?.onboardingCompleted);
  const activeProductsCount = products.filter((product) => product.active).length;
  const reservedConversationsCount = conversations.filter(
    (conversation) => conversation.status === "reservada",
  ).length;
  const humanConversationsCount = conversations.filter(
    (conversation) => conversation.status === "em_atendimento_humano",
  ).length;
  const aiSuggestions = conversations.map((conversation) => ({
    conversationId: conversation.id,
    suggestion: buildAssistantSuggestion(conversation, products),
  }));

  return {
    activeProductsCount,
    aiSuggestions,
    conversations,
    currentUser,
    humanConversationsCount,
    onboardingCompleted,
    products,
    reservedConversationsCount,
    session,
  };
}
