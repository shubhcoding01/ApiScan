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