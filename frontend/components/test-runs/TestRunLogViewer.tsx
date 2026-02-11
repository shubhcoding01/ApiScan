// 'use client';

// import { useEffect, useRef } from 'react';
// import { Terminal, Download, Copy, Check } from 'lucide-react';
// import { useState } from 'react';

// // Define the shape of a single log entry
// export interface LogEntry {
//   timestamp: string;
//   level: 'INFO' | 'WARN' | 'ERROR' | 'PASS' | 'FAIL';
//   message: string;
// }

// interface TestRunLogViewerProps {
//   logs: LogEntry[];
//   fileName?: string; // For downloading logs
// }

// export default function TestRunLogViewer({ logs, fileName = 'test-run-logs.txt' }: TestRunLogViewerProps) {
  
//   const bottomRef = useRef<HTMLDivElement>(null);
//   const [copied, setCopied] = useState(false);

//   // Auto-scroll to bottom when new logs arrive
//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [logs]);

//   // Helper: Copy all logs to clipboard
//   const handleCopy = () => {
//     const text = logs.map(l => `[${l.timestamp}] [${l.level}] ${l.message}`).join('\n');
//     navigator.clipboard.writeText(text);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   // Helper: Download logs as file
//   const handleDownload = () => {
//     const text = logs.map(l => `[${l.timestamp}] [${l.level}] ${l.message}`).join('\n');
//     const blob = new Blob([text], { type: 'text/plain' });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = fileName;
//     a.click();
//     URL.revokeObjectURL(url);
//   };

//   // Helper: Get color based on log level
//   const getLevelColor = (level: string) => {
//     switch (level) {
//       case 'ERROR': return 'text-red-500';
//       case 'FAIL': return 'text-red-400 font-bold';
//       case 'WARN': return 'text-yellow-500';
//       case 'PASS': return 'text-green-400 font-bold';
//       case 'INFO': default: return 'text-blue-400';
//     }
//   };

//   return (
//     <div className="flex flex-col border border-zinc-800 rounded-xl overflow-hidden bg-zinc-950 h-[500px]">
      
//       {/* 1. Toolbar Header */}
//       <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800 bg-zinc-900/50">
//         <div className="flex items-center gap-2">
//           <Terminal className="w-4 h-4 text-zinc-400" />
//           <span className="text-sm font-medium text-zinc-300">Execution Logs</span>
//           <span className="text-xs text-zinc-500 ml-2">({logs.length} lines)</span>
//         </div>
        
//         <div className="flex items-center gap-1">
//           <button 
//             onClick={handleCopy}
//             className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
//             title="Copy Logs"
//           >
//             {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
//           </button>
//           <button 
//             onClick={handleDownload}
//             className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
//             title="Download Logs"
//           >
//             <Download className="w-4 h-4" />
//           </button>
//         </div>
//       </div>

//       {/* 2. Log Content Window */}
//       <div className="flex-1 overflow-y-auto p-4 font-mono text-xs md:text-sm space-y-1 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
        
//         {logs.length === 0 ? (
//           <div className="h-full flex flex-col items-center justify-center text-zinc-600">
//             <p>Waiting for logs...</p>
//           </div>
//         ) : (
//           logs.map((log, index) => (
//             <div key={index} className="flex items-start gap-3 hover:bg-white/5 p-0.5 rounded transition-colors">
//               {/* Timestamp */}
//               <span className="text-zinc-500 shrink-0 select-none w-20 md:w-32">
//                 {new Date(log.timestamp).toLocaleTimeString()}
//               </span>
              
//               {/* Level Badge */}
//               <span className={`shrink-0 w-12 ${getLevelColor(log.level)}`}>
//                 {log.level}
//               </span>

//               {/* Message */}
//               <span className="text-zinc-300 break-all whitespace-pre-wrap">
//                 {log.message}
//               </span>
//             </div>
//           ))
//         )}
        
//         {/* Invisible element to auto-scroll to */}
//         <div ref={bottomRef} />
//       </div>

//     </div>
//   );
// }

// 'use client';

// import { useEffect, useMemo, useRef, useState } from 'react';
// import { Terminal, Download, Copy, Check } from 'lucide-react';

// /* ---------- Types ---------- */
// export interface LogEntry {
//   timestamp: string;
//   level: 'INFO' | 'WARN' | 'ERROR' | 'PASS' | 'FAIL';
//   message: string;
// }

// interface TestRunLogViewerProps {
//   logs: LogEntry[];
//   fileName?: string;
// }

// /* ---------- Component ---------- */
// export default function TestRunLogViewer({
//   logs,
//   fileName = 'test-run-logs.txt',
// }: TestRunLogViewerProps) {
//   const bottomRef = useRef<HTMLDivElement>(null);
//   const containerRef = useRef<HTMLDivElement>(null);

//   const [copied, setCopied] = useState(false);
//   const [autoScroll, setAutoScroll] = useState(true);

//   /* ---------- Auto Scroll Logic ---------- */
//   useEffect(() => {
//     if (autoScroll) {
//       bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
//     }
//   }, [logs, autoScroll]);

//   const handleScroll = () => {
//     const el = containerRef.current;
//     if (!el) return;

//     const isAtBottom =
//       el.scrollHeight - el.scrollTop - el.clientHeight < 50;

//     setAutoScroll(isAtBottom);
//   };

//   /* ---------- Memoized Log Text ---------- */
//   const logText = useMemo(
//     () =>
//       logs
//         .map(
//           (l) => `[${l.timestamp}] [${l.level}] ${l.message}`
//         )
//         .join('\n'),
//     [logs]
//   );

//   /* ---------- Actions ---------- */
//   const handleCopy = async () => {
//     try {
//       await navigator.clipboard.writeText(logText);
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//     } catch {
//       alert('Clipboard permission denied.');
//     }
//   };

//   const handleDownload = () => {
//     const blob = new Blob([logText], { type: 'text/plain' });
//     const url = URL.createObjectURL(blob);

//     const a = document.createElement('a');
//     a.href = url;
//     a.download = fileName;
//     a.click();

//     URL.revokeObjectURL(url);
//   };

//   /* ---------- Helpers ---------- */
//   const getLevelColor = (level: LogEntry['level']) => {
//     switch (level) {
//       case 'ERROR':
//         return 'text-red-500';
//       case 'FAIL':
//         return 'text-red-400 font-bold';
//       case 'WARN':
//         return 'text-yellow-500';
//       case 'PASS':
//         return 'text-green-400 font-bold';
//       default:
//         return 'text-blue-400';
//     }
//   };

//   /* ---------- Render ---------- */
//   return (
//     <div className="flex flex-col border border-zinc-800 rounded-xl overflow-hidden bg-zinc-950 h-[500px]">
//       {/* Header */}
//       <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800 bg-zinc-900/50">
//         <div className="flex items-center gap-2">
//           <Terminal className="w-4 h-4 text-zinc-400" />
//           <span className="text-sm font-medium text-zinc-300">
//             Execution Logs
//           </span>
//           <span className="text-xs text-zinc-500">
//             ({logs.length} lines)
//           </span>
//         </div>

//         <div className="flex items-center gap-1">
//           <button
//             onClick={handleCopy}
//             className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
//             title="Copy logs"
//           >
//             {copied ? (
//               <Check className="w-4 h-4 text-green-500" />
//             ) : (
//               <Copy className="w-4 h-4" />
//             )}
//           </button>

//           <button
//             onClick={handleDownload}
//             className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
//             title="Download logs"
//           >
//             <Download className="w-4 h-4" />
//           </button>
//         </div>
//       </div>

//       {/* Log Body */}
//       <div
//         ref={containerRef}
//         onScroll={handleScroll}
//         className="flex-1 overflow-y-auto p-4 font-mono text-xs md:text-sm space-y-1 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent"
//       >
//         {logs.length === 0 ? (
//           <div className="h-full flex items-center justify-center text-zinc-600">
//             Waiting for logs…
//           </div>
//         ) : (
//           logs.map((log, index) => (
//             <div
//               key={`${log.timestamp}-${index}`}
//               className="flex items-start gap-3 hover:bg-white/5 p-0.5 rounded transition-colors"
//             >
//               {/* Timestamp */}
//               <span className="text-zinc-500 shrink-0 select-none w-20 md:w-32">
//                 {new Date(log.timestamp).toLocaleTimeString()}
//               </span>

//               {/* Level */}
//               <span
//                 className={`shrink-0 w-12 ${getLevelColor(
//                   log.level
//                 )}`}
//               >
//                 {log.level}
//               </span>

//               {/* Message */}
//               <span className="text-zinc-300 break-all whitespace-pre-wrap">
//                 {log.message}
//               </span>
//             </div>
//           ))
//         )}

//         <div ref={bottomRef} />
//       </div>
//     </div>
//   );
// }


'use client';

import { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  ChevronRight, 
  ChevronDown, 
  Globe, 
  Clock, 
  Terminal,
  AlertCircle
} from 'lucide-react';

export default function TestLogViewer({ results }: { results: any[] }) {
  if (!results || results.length === 0) {
    return (
      <div className="p-12 text-center border border-dashed border-zinc-800 rounded-xl bg-zinc-900/30">
        <Terminal className="w-10 h-10 text-zinc-700 mx-auto mb-3" />
        <p className="text-zinc-500">No execution logs found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3 font-sans">
      {results.map((log, index) => (
        <LogItem key={log.id || index} log={log} />
      ))}
    </div>
  );
}

function LogItem({ log }: { log: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const isPass = log.result === 'PASS';

  return (
    <div className={`
      group border rounded-lg transition-all duration-200 overflow-hidden
      ${isPass 
        ? 'bg-green-950/5 border-green-900/30 hover:border-green-800/50' 
        : 'bg-red-950/5 border-red-900/30 hover:border-red-800/50'
      }
    `}>
      {/* HEADER ROW - Click to Expand */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="p-4 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-4 overflow-hidden">
          {/* Status Icon */}
          <div className={`shrink-0 p-1.5 rounded-full ${isPass ? 'bg-green-500/10 text-green-400 shadow-[0_0_10px_rgba(74,222,128,0.1)]' : 'bg-red-500/10 text-red-400 shadow-[0_0_10px_rgba(248,113,113,0.1)]'}`}>
            {isPass ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-3">
              <MethodBadge method={log.method} />
              <span className="font-mono text-sm text-zinc-300 font-medium truncate" title={log.endpoint}>
                {log.endpoint}
              </span>
            </div>
            {log.name && (
                <p className="text-xs text-zinc-500 mt-1 truncate">{log.name}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <div className="text-right hidden sm:block">
            <div className={`text-sm font-bold font-mono ${isPass ? 'text-green-400' : 'text-red-400'}`}>
              {log.status_code}
            </div>
            <div className="text-[10px] text-zinc-600 flex items-center justify-end gap-1">
              <Clock className="w-3 h-3" /> {log.duration_ms || '<100'}ms
            </div>
          </div>

          {isOpen ? <ChevronDown className="w-5 h-5 text-zinc-500" /> : <ChevronRight className="w-5 h-5 text-zinc-500" />}
        </div>
      </div>

      {/* EXPANDABLE DETAILS PANEL */}
      {isOpen && (
        <div className="bg-black/40 border-t border-white/5 p-6 animate-in slide-in-from-top-1">
          <div className="grid grid-cols-1 gap-6">
            
            {/* Error Message (If Any) */}
            {log.error_message && (
                <div className="p-3 bg-red-950/20 border border-red-900/50 rounded text-red-300 text-xs font-mono">
                    <div className="flex items-center gap-2 mb-1 text-red-400 font-bold uppercase tracking-wider">
                        <AlertCircle className="w-3 h-3" /> Error
                    </div>
                    {log.error_message}
                </div>
            )}

            {/* Response Body */}
            <div className="space-y-2">
              <h4 className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold flex items-center gap-2">
                <Terminal className="w-3 h-3" /> Response Body
              </h4>
              <div className="p-4 bg-zinc-950 rounded-lg border border-zinc-800 font-mono text-xs text-zinc-400 overflow-x-auto max-h-[300px] scrollbar-thin scrollbar-thumb-zinc-800">
                <pre>{formatJson(log.response_body)}</pre>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// --- Helpers ---

function MethodBadge({ method }: { method: string }) {
  const colors: any = {
    GET: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
    POST: 'text-green-400 bg-green-400/10 border-green-400/20',
    PUT: 'text-orange-400 bg-orange-400/10 border-orange-400/20',
    DELETE: 'text-red-400 bg-red-400/10 border-red-400/20',
    PATCH: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
  };
  const style = colors[method?.toUpperCase()] || 'text-zinc-400 bg-zinc-400/10 border-zinc-400/20';
  
  return (
    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${style} font-mono`}>
      {method || 'REQ'}
    </span>
  );
}

function formatJson(jsonString: string) {
  try {
    if (!jsonString) return "No content";
    const obj = JSON.parse(jsonString);
    return JSON.stringify(obj, null, 2);
  } catch (e) {
    return jsonString;
  }
}