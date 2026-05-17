import Link from "next/link";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { BrandLogo } from "@/components/brand-logo";
import { LogoutButton } from "@/components/logout-button";
import { PainelNav } from "@/components/painel-nav";
import { AUTH_COOKIE_NAME, decodeSession } from "@/lib/auth";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const session = decodeSession(cookieStore.get(AUTH_COOKIE_NAME)?.value);

  if (!session) {
    redirect("/entrar");
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f4fbf4_0%,#eef6ef_42%,#edf3ee_100%)] text-[#163322]">
      <header className="sticky top-0 z-20 border-b border-[#d8e7d9] bg-[rgba(244,251,244,0.92)] backdrop-blur-xl">
        <div className="container-shell flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <BrandLogo size="sm" />
            <p className="mt-1 text-sm text-[#4c6b57]">
              {session.storeName} • {session.name}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <nav className="flex items-center gap-2 text-sm text-[#53715d]">
              <Link
                href="/painel"
                className="rounded-full border border-[#cfe1d1] bg-[#f8fcf8] px-4 py-2 font-medium transition hover:border-[#8abf93] hover:bg-white"
              >
                Painel
              </Link>
            </nav>
            <LogoutButton />
          </div>
        </div>
      </header>

      <main className="container-shell py-6 sm:py-8">
        <div className="space-y-6">
          <PainelNav />
          {children}
        </div>
      </main>
    </div>
  );
}
