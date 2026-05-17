import { ConversationsPageSection } from "@/components/conversations-page-section";
import { getDashboardData } from "@/lib/dashboard";

export default async function ConversationsPage() {
  const {
    aiSuggestions,
    conversations,
    humanConversationsCount,
    reservedConversationsCount,
  } = await getDashboardData();

  return (
    <ConversationsPageSection
      aiSuggestions={aiSuggestions}
      conversations={conversations}
      humanConversationsCount={humanConversationsCount}
      reservedConversationsCount={reservedConversationsCount}
    />
  );
}
