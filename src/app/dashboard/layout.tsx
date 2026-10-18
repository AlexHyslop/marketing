import { logout } from "@/app/actions";
import { NavLinks } from "@/components/nav-links";
import { approvals } from "@/lib/demo-data";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen lg:flex">
      <aside className="border-b border-line bg-white px-4 py-4 lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-60 lg:shrink-0 lg:flex-col lg:border-b-0 lg:border-r lg:py-6">
        <div className="mb-3 flex items-center justify-between lg:mb-8 lg:block">
          <p className="font-display text-xl font-semibold tracking-tight">Lead desk</p>
          <form action={logout} className="lg:hidden">
            <button type="submit" className="text-sm text-slate underline-offset-2 hover:underline">
              Sign out
            </button>
          </form>
        </div>
        <nav aria-label="Main">
          <NavLinks approvalsWaiting={approvals.length} />
        </nav>
        <form action={logout} className="mt-auto hidden lg:block">
          <button type="submit" className="px-3 text-sm text-slate underline-offset-2 hover:underline">
            Sign out
          </button>
        </form>
      </aside>
      <main className="min-w-0 flex-1 px-4 py-8 sm:px-8 lg:px-12 lg:py-10">{children}</main>
    </div>
  );
}
