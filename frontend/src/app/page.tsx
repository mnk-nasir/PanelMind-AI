export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 relative overflow-hidden">
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-500/20 rounded-full blur-[120px]" />
      
      <div className="glass p-12 rounded-3xl z-10 text-center max-w-2xl w-full flex flex-col items-center gap-6">
        <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-br from-white to-white/60 bg-clip-text text-transparent">
          PanelMind AI
        </h1>
        <p className="text-xl text-white/70">
          Knowledge-Driven Interview Intelligence
        </p>
        
        <div className="grid grid-cols-2 gap-4 w-full mt-8">
          <a href="/dashboard" className="glass p-6 rounded-xl hover:bg-white/10 transition-colors cursor-pointer group flex flex-col items-center justify-center gap-2">
            <span className="text-2xl font-semibold group-hover:text-indigo-400 transition-colors">Dashboard</span>
            <span className="text-sm text-white/50">Manage interviews & knowledge</span>
          </a>
          <a href="/interview/demo" className="glass p-6 rounded-xl border-indigo-500/30 hover:bg-indigo-500/20 transition-colors cursor-pointer group flex flex-col items-center justify-center gap-2">
            <span className="text-2xl font-semibold group-hover:text-indigo-300 transition-colors">Join Room</span>
            <span className="text-sm text-white/50">Start demo interview</span>
          </a>
        </div>
      </div>
    </main>
  );
}
