"use client";

import { useEffect, useState } from "react";
import { MicOff, VideoOff, PhoneOff, Mic, Video } from "lucide-react";
import { 
  LiveKitRoom, 
  VideoConference,
  RoomAudioRenderer,
  ControlBar
} from "@livekit/components-react";
import "@livekit/components-styles";

export default function InterviewRoom({ params }: { params: { id: string } }) {
  const [roomToken, setRoomToken] = useState("");
  const serverUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL || "wss://panelmind.livekit.cloud";

  useEffect(() => {
    // In a real flow, we'd call POST /api/v1/interview/{params.id}/prepare to get a real token.
    // We are mocking this for the UI demonstration until deployment.
    setRoomToken("mock_token_active");
  }, [params.id]);

  if (!roomToken) {
    return <div className="h-screen flex items-center justify-center bg-black text-white">Connecting to PanelMind Server...</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col p-4 relative overflow-hidden">
      {/* Background glow behind elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[150px] pointer-events-none" />
      
      {/* Header Info */}
      <header className="flex items-center justify-between px-6 py-4 glass rounded-2xl mb-4 z-10 sticky top-0 border-white/5">
        <div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">PanelMind Interview</h1>
          <p className="text-sm text-white/50">Role: Senior Backend Engineer</p>
        </div>
        <div className="flex items-center gap-6">
          <div className="font-mono text-lg text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]">00:15:30</div>
          <button className="text-sm text-white/70 hover:text-white transition-colors">Need Help?</button>
        </div>
      </header>

      {/* Main Stage Grid */}
      <div className="flex-1 flex gap-4 z-10">
        
        {/* Left: Video Area */}
        <div className="flex-1 flex flex-col gap-4 relative">
          
          {/* LiveKit Integrated Room Wrapper - Muted for UI view */}
          {roomToken !== "mock_token_active" ? (
             <LiveKitRoom
                video={true}
                audio={true}
                token={roomToken}
                serverUrl={serverUrl}
                data-lk-theme="default"
                className="h-full w-full rounded-3xl overflow-hidden glass"
              >
                <VideoConference />
                <RoomAudioRenderer />
              </LiveKitRoom>
          ) : (
            <div className="flex-1 flex flex-col gap-4">
              {/* AI Avatar / Main Presenter UI */}
              <div className="flex-1 glass rounded-[2rem] border-white/5 relative overflow-hidden flex flex-col items-center justify-center bg-black/40 group">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
                
                <div className="w-48 h-48 bg-indigo-500/20 rounded-full flex items-center justify-center relative shadow-[0_0_60px_rgba(99,102,241,0.2)]">
                  <div className="absolute inset-0 rounded-full border border-indigo-500/30 animate-[spin_4s_linear_infinite]" />
                  <h2 className="text-4xl text-indigo-400 font-bold tracking-widest">AI</h2>
                </div>

                <div className="absolute bottom-8 left-0 right-0 z-20 px-12 text-center transition-transform duration-500">
                  <p className="text-xl font-medium drop-shadow-lg max-w-3xl mx-auto leading-relaxed text-white/90 bg-black/40 backdrop-blur-md px-6 py-3 rounded-2xl inline-block border border-white/10">
                    "Could you explain the difference between optimistic and pessimistic locking?"
                  </p>
                </div>
                
                <div className="absolute top-6 left-6 z-20 px-3 py-1 bg-black/60 backdrop-blur border border-white/10 rounded-lg text-sm text-white/70 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  AI Technical Interviewer (WebRTC Demo)
                </div>
              </div>

              {/* Controls & Mini View */}
              <div className="h-32 flex gap-4">
                {/* Candidate Mini View (Self) */}
                <div className="w-56 glass rounded-2xl border-white/5 bg-black/40 relative overflow-hidden flex items-center justify-center border-indigo-500/30 shadow-[0_0_20px_rgba(99,102,241,0.1)]">
                  <span className="text-white/30 text-sm">Camera Ready</span>
                  <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/60 rounded text-xs text-white/70 font-medium">You</div>
                </div>

                {/* Action Buttons */}
                <div className="flex-1 glass rounded-2xl border-white/5 flex items-center justify-center gap-6">
                  <button className="p-4 rounded-full bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-400 transition-colors border border-indigo-500/40">
                    <Mic className="w-6 h-6" />
                  </button>
                  <button className="p-4 rounded-full bg-white/5 hover:bg-white/10 transition-colors border border-white/10">
                    <VideoOff className="w-6 h-6" />
                  </button>
                  <button className="px-8 py-3.5 rounded-full bg-rose-500 hover:bg-rose-600 text-white transition-colors ml-4 flex items-center gap-2 font-medium shadow-[0_0_20px_rgba(244,63,94,0.3)]">
                    <PhoneOff className="w-5 h-5" /> End Interview
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right: Live Transcript & Details */}
        <div className="w-96 glass rounded-3xl border-white/5 flex flex-col p-6 relative overflow-hidden bg-black/40">
           <h3 className="font-semibold text-lg flex items-center gap-2 mb-6">
             Orchestrator Feed
             <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse ml-auto" />
           </h3>
           <div className="flex-1 space-y-6 overflow-y-auto pr-2 custom-scrollbar">
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-indigo-400">System (WSS)</span>
                <p className="text-sm text-white/80 bg-white/5 p-3 rounded-r-xl rounded-bl-xl border border-indigo-500/30">
                  Connected to PanelMind Intelligence Engine.
                </p>
              </div>
              <div className="flex flex-col gap-1.5 items-end">
                <span className="text-xs font-semibold text-white/50">STT Transcript</span>
                <p className="text-sm text-white/80 bg-indigo-500/20 p-3 rounded-l-xl rounded-br-xl border border-indigo-500/20 text-right">
                  Sure, I've worked extensively with PostgreSQL...
                </p>
              </div>
               <div className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-indigo-400">LLM Stream</span>
                <p className="text-sm text-white/80 bg-white/5 p-3 rounded-r-xl rounded-bl-xl border border-white/5 border-l-indigo-500/50">
                  Could you explain the difference between optimistic and pessimistic locking?
                </p>
              </div>
           </div>
           
           <div className="h-16 mt-4 border-t border-white/10 flex items-center pt-4">
              <div className="w-full flex justify-between px-2 text-xs text-indigo-400/80 font-medium">
                <span>Latency Loop: 1.2s</span>
                <span>Active Model: Flash</span>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}
