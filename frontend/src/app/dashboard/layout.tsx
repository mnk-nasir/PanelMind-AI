import Link from "next/link";
import { LayoutDashboard, Users, BookOpen, CreditCard, Settings } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-black/95 text-white overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 flex flex-col glass m-4 rounded-2xl relative z-10">
        <div className="p-6">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent block truncate">
            PanelMind
          </Link>
          <div className="text-xs text-white/50 mt-1">HR Tech Lead</div>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-white/10 text-white transition-colors">
            <LayoutDashboard className="w-5 h-5 text-indigo-400" />
            <span className="font-medium">Dashboard</span>
          </Link>
          <Link href="/dashboard/knowledge" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/70 hover:bg-white/5 hover:text-white transition-colors">
            <BookOpen className="w-5 h-5 text-purple-400" />
            <span className="font-medium">Knowledge Base</span>
          </Link>
          <Link href="/dashboard/candidates" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/70 hover:bg-white/5 hover:text-white transition-colors">
            <Users className="w-5 h-5 text-blue-400" />
            <span className="font-medium">Candidates</span>
          </Link>
          <Link href="/dashboard/billing" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/70 hover:bg-white/5 hover:text-white transition-colors">
            <CreditCard className="w-5 h-5 text-emerald-400" />
            <span className="font-medium">Billing</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-white/10">
          <button className="flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-white/70 hover:bg-white/5 hover:text-white transition-colors">
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8 relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-6xl mx-auto relative z-10">
          {children}
        </div>
      </main>
    </div>
  );
}
