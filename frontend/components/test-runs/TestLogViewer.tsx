// 'use client';

// import { useState } from 'react';
// import { 
//   CheckCircle2, 
//   XCircle, 
//   ChevronRight, 
//   ChevronDown, 
//   Globe, 
//   Clock, 
//   Terminal,
//   AlertCircle
// } from 'lucide-react';

// export default function TestLogViewer({ results }: { results: any[] }) {
//   if (!results || results.length === 0) {
//     return (
//       <div className="p-12 text-center border border-dashed border-zinc-800 rounded-xl bg-zinc-900/30">
//         <Terminal className="w-10 h-10 text-zinc-700 mx-auto mb-3" />
//         <p className="text-zinc-500">No execution logs found.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-3 font-sans">
//       {results.map((log, index) => (
//         <LogItem key={log.id || index} log={log} />
//       ))}
//     </div>
//   );
// }

// function LogItem({ log }: { log: any }) {
//   const [isOpen, setIsOpen] = useState(false);
//   const isPass = log.result === 'PASS';

//   return (
//     <div className={`
//       group border rounded-lg transition-all duration-200 overflow-hidden
//       ${isPass 
//         ? 'bg-green-950/5 border-green-900/30 hover:border-green-800/50' 
//         : 'bg-red-950/5 border-red-900/30 hover:border-red-800/50'
//       }
//     `}>
//       {/* HEADER ROW - Click to Expand */}
//       <div 
//         onClick={() => setIsOpen(!isOpen)}
//         className="p-4 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors"
//       >
//         <div className="flex items-center gap-4 overflow-hidden">
//           {/* Status Icon */}
//           <div className={`shrink-0 p-1.5 rounded-full ${isPass ? 'bg-green-500/10 text-green-400 shadow-[0_0_10px_rgba(74,222,128,0.1)]' : 'bg-red-500/10 text-red-400 shadow-[0_0_10px_rgba(248,113,113,0.1)]'}`}>
//             {isPass ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
//           </div>

//           <div className="min-w-0 flex-1">
//             <div className="flex items-center gap-3">
//               <MethodBadge method={log.method} />
//               <span className="font-mono text-sm text-zinc-300 font-medium truncate" title={log.endpoint}>
//                 {log.endpoint}
//               </span>
//             </div>
//             {log.name && (
//                 <p className="text-xs text-zinc-500 mt-1 truncate">{log.name}</p>
//             )}
//           </div>
//         </div>

//         <div className="flex items-center gap-4 shrink-0">
//           <div className="text-right hidden sm:block">
//             <div className={`text-sm font-bold font-mono ${isPass ? 'text-green-400' : 'text-red-400'}`}>
//               {log.status_code}
//             </div>
//             <div className="text-[10px] text-zinc-600 flex items-center justify-end gap-1">
//               <Clock className="w-3 h-3" /> {log.duration_ms || '<100'}ms
//             </div>
//           </div>

//           {isOpen ? <ChevronDown className="w-5 h-5 text-zinc-500" /> : <ChevronRight className="w-5 h-5 text-zinc-500" />}
//         </div>
//       </div>

//       {/* EXPANDABLE DETAILS PANEL */}
//       {isOpen && (
//         <div className="bg-black/40 border-t border-white/5 p-6 animate-in slide-in-from-top-1">
//           <div className="grid grid-cols-1 gap-6">
            
//             {/* Error Message (If Any) */}
//             {log.error_message && (
//                 <div className="p-3 bg-red-950/20 border border-red-900/50 rounded text-red-300 text-xs font-mono">
//                     <div className="flex items-center gap-2 mb-1 text-red-400 font-bold uppercase tracking-wider">
//                         <AlertCircle className="w-3 h-3" /> Error
//                     </div>
//                     {log.error_message}
//                 </div>
//             )}

//             {/* Response Body */}
//             <div className="space-y-2">
//               <h4 className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold flex items-center gap-2">
//                 <Terminal className="w-3 h-3" /> Response Body
//               </h4>
//               <div className="p-4 bg-zinc-950 rounded-lg border border-zinc-800 font-mono text-xs text-zinc-400 overflow-x-auto max-h-[300px] scrollbar-thin scrollbar-thumb-zinc-800">
//                 <pre>{formatJson(log.response_body)}</pre>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// // --- Helpers ---

// function MethodBadge({ method }: { method: string }) {
//   const colors: any = {
//     GET: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
//     POST: 'text-green-400 bg-green-400/10 border-green-400/20',
//     PUT: 'text-orange-400 bg-orange-400/10 border-orange-400/20',
//     DELETE: 'text-red-400 bg-red-400/10 border-red-400/20',
//     PATCH: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
//   };
//   const style = colors[method?.toUpperCase()] || 'text-zinc-400 bg-zinc-400/10 border-zinc-400/20';
  
//   return (
//     <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${style} font-mono`}>
//       {method || 'REQ'}
//     </span>
//   );
// }

// function formatJson(jsonString: string) {
//   try {
//     if (!jsonString) return "No content";
//     const obj = JSON.parse(jsonString);
//     return JSON.stringify(obj, null, 2);
//   } catch (e) {
//     return jsonString;
//   }
// }


'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Terminal, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Clock, 
  Filter,
  Copy,
  Check
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface TestResult {
  id?: string;
  test_case_name?: string;
  endpoint?: string;
  method?: string;
  status?: 'PASSED' | 'FAILED' | 'ERROR' | 'PENDING';
  expected_status?: number;
  actual_status?: number;
  error_message?: string;
  response_time_ms?: number;
  timestamp?: string;
}

interface TestLogViewerProps {
  results?: TestResult[];
}

export default function TestLogViewer({ results = [] }: TestLogViewerProps) {
  const [filter, setFilter] = useState<'ALL' | 'PASSED' | 'FAILED'>('ALL');
  const [copied, setCopied] = useState(false);
  const logsEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new logs arrive (useful if running in real-time)
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [results]);

  const filteredResults = results.filter((res) => {
    if (filter === 'ALL') return true;
    if (filter === 'PASSED') return res.status === 'PASSED';
    if (filter === 'FAILED') return res.status === 'FAILED' || res.status === 'ERROR';
    return true;
  });

  const handleCopyLogs = () => {
    const logText = filteredResults.map(r => 
      `[${new Date(r.timestamp || Date.now()).toLocaleTimeString()}] ${r.method} ${r.endpoint} -> ${r.status} (${r.actual_status || 'N/A'})`
    ).join('\n');
    
    navigator.clipboard.writeText(logText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Utility to colorize HTTP methods
  const getMethodColor = (method?: string) => {
    switch (method?.toUpperCase()) {
      case 'GET': return 'text-blue-400';
      case 'POST': return 'text-emerald-400';
      case 'PUT': return 'text-orange-400';
      case 'DELETE': return 'text-red-400';
      case 'PATCH': return 'text-yellow-400';
      default: return 'text-slate-400';
    }
  };

  // If no results yet
  if (!results || results.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 bg-[#0B1120] text-slate-500 font-mono text-sm rounded-b-xl">
        <Terminal className="w-10 h-10 mb-4 opacity-20" />
        <p>Waiting for execution logs...</p>
        <div className="flex gap-2 mt-4 opacity-50">
          <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" />
          <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce delay-100" />
          <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce delay-200" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col rounded-b-xl overflow-hidden bg-[#0B1120]">
      
      {/* Terminal Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between px-4 py-2 border-b border-slate-800 bg-slate-900/50">
        <div className="flex items-center gap-2 mb-2 sm:mb-0">
          <Filter className="w-3.5 h-3.5 text-slate-500" />
          <div className="flex bg-slate-950 rounded-lg p-0.5 border border-slate-800">
            {['ALL', 'PASSED', 'FAILED'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f as any)}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                  filter === f 
                    ? 'bg-slate-800 text-white shadow-sm' 
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleCopyLogs}
          className="h-7 text-xs text-slate-400 hover:text-white hover:bg-slate-800"
        >
          {copied ? <Check className="w-3 h-3 mr-1.5 text-emerald-400" /> : <Copy className="w-3 h-3 mr-1.5" />}
          {copied ? 'Copied' : 'Copy Logs'}
        </Button>
      </div>

      {/* Terminal Output */}
      <div className="p-4 max-h-[600px] overflow-y-auto font-mono text-xs md:text-sm custom-scrollbar bg-[#020617]">
        <div className="space-y-1">
          <AnimatePresence>
            {filteredResults.map((res, idx) => (
              <motion.div 
                key={res.id || idx}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                className="group flex flex-col py-1.5 border-b border-slate-800/30 last:border-0 hover:bg-slate-900/40 px-2 -mx-2 rounded transition-colors"
              >
                <div className="flex items-start gap-3">
                  {/* Timestamp */}
                  <span className="text-slate-600 shrink-0 mt-0.5">
                    [{new Date(res.timestamp || Date.now()).toLocaleTimeString([], { hour12: false })}]
                  </span>
                  
                  {/* Status Icon */}
                  <span className="shrink-0 mt-0.5">
                    {res.status === 'PASSED' ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    ) : res.status === 'FAILED' || res.status === 'ERROR' ? (
                      <XCircle className="w-4 h-4 text-red-500" />
                    ) : (
                      <Clock className="w-4 h-4 text-amber-500" />
                    )}
                  </span>

                  {/* Main Log Content */}
                  <div className="flex-1 min-w-0 flex flex-wrap items-center gap-2">
                    <span className={`font-bold ${getMethodColor(res.method)}`}>
                      {res.method || 'TEST'}
                    </span>
                    <span className="text-slate-300 truncate">
                      {res.endpoint || res.test_case_name || 'Unknown execution'}
                    </span>
                    
                    <span className="text-slate-500 mx-1">→</span>
                    
                    {/* Status Code Badge */}
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                      res.status === 'PASSED' 
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                        : 'bg-red-500/10 text-red-400 border border-red-500/20'
                    }`}>
                      {res.actual_status || res.status}
                    </span>

                    {/* Response Time */}
                    {res.response_time_ms && (
                      <span className="text-slate-600 text-[10px] ml-2">
                        {res.response_time_ms}ms
                      </span>
                    )}
                  </div>
                </div>

                {/* Error Details (Only visible if failed) */}
                {(res.status === 'FAILED' || res.status === 'ERROR') && res.error_message && (
                  <div className="mt-2 ml-16 mr-4 p-3 bg-red-950/20 border border-red-900/30 rounded text-red-300/80 text-xs whitespace-pre-wrap break-all">
                    <div className="flex items-center gap-1.5 mb-1 text-red-400 font-semibold">
                      <AlertCircle className="w-3.5 h-3.5" /> Error Details:
                    </div>
                    {res.error_message}
                    {res.expected_status && (
                      <div className="mt-2 text-slate-400">
                        Expected status <span className="text-emerald-400">{res.expected_status}</span> but got <span className="text-red-400">{res.actual_status}</span>.
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={logsEndRef} />
        </div>
      </div>

    </div>
  );
}