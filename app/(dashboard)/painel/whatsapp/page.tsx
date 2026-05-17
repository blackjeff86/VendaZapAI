import { WhatsappPageSection } from "@/components/whatsapp-page-section";
import { getDashboardData } from "@/lib/dashboard";

export default async function WhatsappPage() {
  const { currentUser } = await getDashboardData();

  return <WhatsappPageSection currentUser={currentUser} />;
}
