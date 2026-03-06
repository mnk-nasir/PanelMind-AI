import { Plus, Play, FileText, Upload } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-white/60 mt-1">Welcome back, Sarah! Here's your overview.</p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-lg shadow-indigo-500/25">
          <Plus className="w-5 h-5" />
          New Interview
        </button>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass p-6 rounded-2xl border-white/5 transition-transform hover:-translate-y-1 duration-300">
          <div className="flex justify-between items-start">
            <p className="text-white/60 font-medium">Total Interviews</p>
            <div className="p-2 bg-indigo-500/20 rounded-lg"><Users className="w-4 h-4 text-indigo-400" /></div>
          </div>
          <h3 className="text-4xl font-bold mt-4">30</h3>
          <p className="text-sm text-emerald-400 mt-2 flex items-center gap-1">+5 this week</p>
        </div>
        
        <div className="glass p-6 rounded-2xl border-white/5 transition-transform hover:-translate-y-1 duration-300">
          <div className="flex justify-between items-start">
            <p className="text-white/60 font-medium">Knowledge Docs</p>
            <div className="p-2 bg-purple-500/20 rounded-lg"><BookOpen className="w-4 h-4 text-purple-400" /></div>
          </div>
          <h3 className="text-4xl font-bold mt-4">12</h3>
          <p className="text-sm text-emerald-400 mt-2 flex items-center gap-1">2 processing</p>
        </div>

        <div className="glass p-6 rounded-2xl border-white/5 transition-transform hover:-translate-y-1 duration-300">
          <div className="flex justify-between items-start">
            <p className="text-white/60 font-medium">Avg Candidate Score</p>
            <div className="p-2 bg-pink-500/20 rounded-lg"><FileText className="w-4 h-4 text-pink-400" /></div>
          </div>
          <h3 className="text-4xl font-bold mt-4">82<span className="text-xl text-white/40">/100</span></h3>
        </div>
      </div>

      {/* Main Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Interviews */}
        <div className="lg:col-span-2 glass rounded-2xl p-6 border-white/5">
          <h2 className="text-xl font-semibold mb-4">Recent Interviews</h2>
          <div className="space-y-4">
            {[
              { name: "John Doe", role: "SDE 2", score: 85, status: "Completed" },
              { name: "Jane Smith", role: "Product Manager", score: null, status: "Pending" },
              { name: "Alex Chen", role: "Backend Eng", score: 92, status: "Completed" }
            ].map((interview, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/10">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-sm">
                    {interview.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <h4 className="font-medium">{interview.name}</h4>
                    <p className="text-sm text-white/50">{interview.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  {interview.status === "Completed" ? (
                    <div className="text-right">
                      <div className="font-bold text-lg">{interview.score}<span className="text-sm text-white/40">/100</span></div>
                      <button className="text-xs text-indigo-400 hover:text-indigo-300">View Report</button>
                    </div>
                  ) : (
                    <button className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 rounded-lg text-sm font-medium transition-colors">
                      <Play className="w-3.5 h-3.5" /> Join Live
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Processing Feed */}
        <div className="glass rounded-2xl p-6 border-white/5">
          <h2 className="text-xl font-semibold mb-4 flex items-center justify-between">
            Knowledge Sync
            <button className="p-1.5 hover:bg-white/10 rounded-md transition-colors"><Upload className="w-4 h-4 text-white/60" /></button>
          </h2>
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 relative overflow-hidden">
              <div className="absolute left-0 bottom-0 top-0 w-1/2 bg-indigo-500/10" />
              <div className="relative z-10">
                <h4 className="font-medium text-sm flex items-center gap-2">
                  <FileText className="w-4 h-4 text-indigo-400" />
                  Engineering_Guidelines.pdf
                </h4>
                <div className="flex justify-between items-end mt-3">
                  <p className="text-xs text-white/50">Extracting and embedding...</p>
                  <p className="text-xs font-semibold text-indigo-400">45%</p>
                </div>
                <div className="w-full bg-black/40 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div className="bg-indigo-500 h-full w-[45%] rounded-full relative">
                    <div className="absolute inset-0 bg-white/20 animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
