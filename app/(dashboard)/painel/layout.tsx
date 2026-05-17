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
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#f7fff8_0%,rgba(247,255,248,0.98)_20%,rgba(240,247,241,0.98)_45%,#ecf2ed_100%)] text-[#163322]">
      <header className="sticky top-0 z-20 border-b border-[#d8e7d9] bg-[rgba(244,251,244,0.92)] backdrop-blur-xl">
        <div className="container-shell flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <BrandLogo size="sm" />
            <p className="mt-1 truncate text-sm text-[#4c6b57]">
              {session.storeName} • {session.name}
            </p>
          </div>

          <div className="flex items-center justify-between gap-3 sm:justify-end">
            <div className="rounded-full border border-[#d5e4d7] bg-white/80 px-3 py-2 text-xs font-medium text-[#5b7261] shadow-[0_10px_22px_rgba(26,74,43,0.04)]">
              Painel pensado para uso rápido no celular
            </div>
            <nav className="hidden items-center gap-2 text-sm text-[#53715d] sm:flex">
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

      <main className="container-shell py-5 sm:py-8">
        <div className="space-y-5 sm:space-y-6">
          <PainelNav />
          {children}
        </div>
      </main>
    </div>
  );
}
