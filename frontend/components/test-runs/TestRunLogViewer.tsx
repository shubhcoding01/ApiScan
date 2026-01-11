'use client';

import { useEffect, useRef } from 'react';
import { Terminal, Download, Copy, Check } from 'lucide-react';
import { useState } from 'react';

// Define the shape of a single log entry
export interface LogEntry {
  timestamp: string;
  level: 'INFO' | 'WARN' | 'ERROR' | 'PASS' | 'FAIL';
  message: string;
}

interface TestRunLogViewerProps {
  logs: LogEntry[];
  fileName?: string; // For downloading logs
}

export default function TestRunLogViewer({ logs, fileName = 'test-run-logs.txt' }: TestRunLogViewerProps) {
  
  const bottomRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  // Auto-scroll to bottom when new logs arrive
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  // Helper: Copy all logs to clipboard
  const handleCopy = () => {
    const text = logs.map(l => `[${l.timestamp}] [${l.level}] ${l.message}`).join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Helper: Download logs as file
  const handleDownload = () => {
    const text = logs.map(l => `[${l.timestamp}] [${l.level}] ${l.message}`).join('\n');
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Helper: Get color based on log level
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'ERROR': return 'text-red-500';
      case 'FAIL': return 'text-red-400 font-bold';
      case 'WARN': return 'text-yellow-500';
      case 'PASS': return 'text-green-400 font-bold';
      case 'INFO': default: return 'text-blue-400';
    }
  };

  return (
    <div className="flex flex-col border border-zinc-800 rounded-xl overflow-hidden bg-zinc-950 h-[500px]">
      
      {/* 1. Toolbar Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800 bg-zinc-900/50">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-zinc-400" />
          <span className="text-sm font-medium text-zinc-300">Execution Logs</span>
          <span className="text-xs text-zinc-500 ml-2">({logs.length} lines)</span>
        </div>
        
        <div className="flex items-center gap-1">
          <button 
            onClick={handleCopy}
            className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
            title="Copy Logs"
          >
            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
          </button>
          <button 
            onClick={handleDownload}
            className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
            title="Download Logs"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. Log Content Window */}
      <div className="flex-1 overflow-y-auto p-4 font-mono text-xs md:text-sm space-y-1 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
        
        {logs.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-zinc-600">
            <p>Waiting for logs...</p>
          </div>
        ) : (
          logs.map((log, index) => (
            <div key={index} className="flex items-start gap-3 hover:bg-white/5 p-0.5 rounded transition-colors">
              {/* Timestamp */}
              <span className="text-zinc-500 shrink-0 select-none w-20 md:w-32">
                {new Date(log.timestamp).toLocaleTimeString()}
              </span>
              
              {/* Level Badge */}
              <span className={`shrink-0 w-12 ${getLevelColor(log.level)}`}>
                {log.level}
              </span>

              {/* Message */}
              <span className="text-zinc-300 break-all whitespace-pre-wrap">
                {log.message}
              </span>
            </div>
          ))
        )}
        
        {/* Invisible element to auto-scroll to */}
        <div ref={bottomRef} />
      </div>

    </div>
  );
}