import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { DashboardTopbar } from "@/components/dashboard-topbar";
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
      <DashboardSidebar />

      <div className="md:ml-64">
        <div className="border-b border-[#e1e3e4] bg-[rgba(248,250,251,0.92)] md:hidden">
          <div className="container-shell flex items-center justify-between py-3">
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#006d3e] shadow-[0_4px_10px_rgba(0,0,0,0.04)]">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.9">
                  <path d="M4 7h16" strokeLinecap="round" />
                  <path d="M4 12h16" strokeLinecap="round" />
                  <path d="M4 17h10" strokeLinecap="round" />
                </svg>
              </span>
              <div className="min-w-0">
                <p className="truncate text-lg font-bold tracking-[-0.02em] text-[#006d3e]">
                  VendaZap AI
                </p>
                <p className="truncate text-xs text-[#6b7b6e]">
                  {session.storeName} • {session.name}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 rounded-full border border-[#00d981]/20 bg-[#00d981]/10 px-3 py-1.5 text-[11px] font-semibold text-[#005931]">
                <span className="h-2 w-2 rounded-full bg-[#006d3e]" />
                Conectado
              </div>
              <LogoutButton />
            </div>
          </div>
        </div>

        <div className="hidden md:block">
          <DashboardTopbar />
        </div>

        <main className="container-shell relative z-10 py-5 pb-28 sm:py-6 sm:pb-8 md:max-w-none md:px-10 md:py-8">
          <div className="space-y-5 sm:space-y-6">
            <PainelNav />
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
