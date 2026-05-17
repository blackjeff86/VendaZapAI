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
    <div className="dashboard-shell dashboard-grid min-h-screen text-[#163322]">
      <div className="pointer-events-none fixed inset-x-0 top-0 z-0 h-[18rem] bg-[radial-gradient(circle_at_top,rgba(37,201,91,0.18),transparent_58%)]" />
      <div className="pointer-events-none fixed right-[-8rem] top-24 z-0 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(37,201,91,0.14),transparent_68%)] blur-3xl" />
      <div className="pointer-events-none fixed left-[-6rem] bottom-20 z-0 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(25,170,150,0.12),transparent_68%)] blur-3xl" />

      <header className="sticky top-0 z-20 border-b border-[#d8e7d9] bg-[rgba(248,252,248,0.78)] backdrop-blur-xl">
        <div className="container-shell flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <BrandLogo size="sm" />
            <p className="mt-1 truncate text-sm text-[#4c6b57]">
              {session.storeName} • {session.name}
            </p>
          </div>

          <div className="flex items-center justify-between gap-3 sm:justify-end">
            <div className="hidden dashboard-chip rounded-full px-3 py-2 text-xs font-medium text-[#5b7261] shadow-[0_10px_22px_rgba(26,74,43,0.04)] md:block">
              Painel pensado para uso rápido no celular
            </div>
            <nav className="hidden items-center gap-2 text-sm text-[#53715d] sm:flex">
              <Link
                href="/painel"
                className="dashboard-chip rounded-full px-4 py-2 font-medium transition hover:border-[#8abf93] hover:bg-white"
              >
                Painel
              </Link>
            </nav>
            <LogoutButton />
          </div>
        </div>
      </header>

      <main className="container-shell relative z-10 py-5 pb-28 sm:py-8 sm:pb-8">
        <div className="space-y-5 sm:space-y-6">
          <PainelNav />
          {children}
        </div>
      </main>
    </div>
  );
}
