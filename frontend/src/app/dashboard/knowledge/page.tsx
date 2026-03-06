"use client";

import { UploadCloud, Link as LinkIcon, FileText } from "lucide-react";
import { useState } from "react";

export default function KnowledgeBase() {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl mx-auto">
      <header>
        <h1 className="text-3xl font-bold">Knowledge Base</h1>
        <p className="text-white/60 mt-1">Upload context documents to ground the AI Panelists.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* File Upload Area */}
        <div 
          className={`border-2 border-dashed rounded-3xl p-12 text-center transition-all ${
            dragActive ? "border-indigo-500 bg-indigo-500/10" : "border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={(e) => { e.preventDefault(); setDragActive(false); }}
        >
          <UploadCloud className={`w-12 h-12 mx-auto mb-4 ${dragActive ? "text-indigo-400" : "text-white/50"}`} />
          <h3 className="text-xl font-semibold mb-2">Drag & Drop Files</h3>
          <p className="text-white/50 text-sm mb-6">PDF, DOCX, TXT - Max 50MB</p>
          <button className="bg-white text-black px-6 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors">
            Browse Files
          </button>
        </div>

        {/* URL Input Area */}
        <div className="glass rounded-3xl p-8 border-white/5 flex flex-col justify-center gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <LinkIcon className="w-5 h-5 text-indigo-400" />
              <h3 className="text-xl font-semibold">Crawl URL</h3>
            </div>
            <p className="text-sm text-white/50">Provide an engineering wiki or company website URL.</p>
          </div>
          
          <div className="flex gap-2">
            <input 
              type="url" 
              placeholder="https://company.com/engineering-values" 
              className="flex-1 bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-indigo-500"
            />
            <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2.5 rounded-lg font-medium transition-colors">
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
