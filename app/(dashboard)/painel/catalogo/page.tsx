import { CatalogPageSection } from "@/components/catalog-page-section";
import { getDashboardData } from "@/lib/dashboard";

export default async function CatalogPage() {
  const {
    activeProductsCount,
    currentUser,
    onboardingCompleted,
    products,
    session,
  } = await getDashboardData();

  return (
    <CatalogPageSection
      activeProductsCount={activeProductsCount}
      currentUser={currentUser}
      onboardingCompleted={onboardingCompleted}
      products={products}
      sessionStoreName={session.storeName}
    />
  );
}
