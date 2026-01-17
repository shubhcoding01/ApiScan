// 'use client';

// import { useState, useEffect, useCallback } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { 
//   ArrowLeft, 
//   Clock, 
//   CheckCircle2, 
//   XCircle, 
//   PlayCircle, 
//   RefreshCw 
// } from 'lucide-react';

// import api from '@/lib/api';
// import { TestRun } from '@/lib/types';
// import PageHeader from '@/components/layout/PageHeader';
// import TestRunStatus from '@/components/test-runs/TestRunStatus';
// import TestRunLogViewer, { LogEntry } from '@/components/test-runs/TestRunLogViewer';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// export default function TestRunDetailsPage() {
//   const params = useParams();
//   const router = useRouter();
//   const projectId = params.projectId as string;
//   const runId = params.runId as string; // Note: Ensure folder is named [runId] not [runsId]

//   // State
//   const [run, setRun] = useState<TestRun | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [isPolling, setIsPolling] = useState(false);

//   // 1. Fetch Run Data
//   const fetchRun = useCallback(async () => {
//     try {
//       const { data } = await api.get(`/test-runs/${runId}`);
//       setRun(data);
      
//       // Determine if we should keep polling
//       const activeStates = ['PENDING', 'RUNNING'];
//       setIsPolling(activeStates.includes(data.status));

//     } catch (err) {
//       console.error("Failed to load test run", err);
//     } finally {
//       setLoading(false);
//     }
//   }, [runId]);

//   // Initial Load
//   useEffect(() => {
//     fetchRun();
//   }, [fetchRun]);

//   // 2. Polling Logic (Auto-refresh while running)
//   useEffect(() => {
//     let interval: NodeJS.Timeout;
//     if (isPolling) {
//       interval = setInterval(fetchRun, 3000); // Poll every 3 seconds
//     }
//     return () => clearInterval(interval);
//   }, [isPolling, fetchRun]);

//   // Mock Logs Generator (If backend doesn't send logs yet)
//   // In production, 'run.logs' would come from the API
//   const getLogs = (): LogEntry[] => {
//     if (run?.logs && run.logs.length > 0) return run.logs;
    
//     // Fallback: If no real logs yet, show status message
//     if (!run) return [];
//     return [
//       { timestamp: run.created_at, level: 'INFO', message: 'Test run initialized.' },
//       { timestamp: new Date().toISOString(), level: 'INFO', message: `Current Status: ${run.status}` },
//       ...(run.result_json ? [{ timestamp: run.completed_at || new Date().toISOString(), level: 'INFO' as const, message: 'Results generated.' }] : [])
//     ];
//   };

//   if (loading) {
//     return <div className="p-12 text-center text-zinc-500">Loading execution details...</div>;
//   }

//   if (!run) {
//     return <div className="p-12 text-center text-red-500">Test Run not found.</div>;
//   }

//   return (
//     <div className="max-w-6xl mx-auto space-y-6">
      
//       {/* 1. Breadcrumb / Back Navigation */}
//       <div className="flex items-center gap-2 text-sm text-zinc-500 mb-2">
//         <Link href={`/projects/${projectId}/test-runs`} className="hover:text-white flex items-center gap-1 transition-colors">
//           <ArrowLeft className="w-4 h-4" />
//           Back to History
//         </Link>
//         <span>/</span>
//         <span className="text-white">Run #{run.id.slice(0, 8)}</span>
//       </div>

//       {/* 2. Header & Status */}
//       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
//         <div>
//           <h1 className="text-2xl font-bold text-white flex items-center gap-3">
//             Execution Details
//             <TestRunStatus status={run.status} />
//           </h1>
//           <div className="flex items-center gap-4 text-sm text-zinc-400 mt-2">
//             <span className="flex items-center gap-1">
//               <Clock className="w-4 h-4" />
//               Started: {new Date(run.created_at).toLocaleString()}
//             </span>
//             {run.completed_at && (
//               <span className="flex items-center gap-1">
//                 <CheckCircle2 className="w-4 h-4" />
//                 Finished: {new Date(run.completed_at).toLocaleString()}
//               </span>
//             )}
//           </div>
//         </div>

//         <Button 
//           variant="outline" 
//           onClick={fetchRun}
//           disabled={isPolling}
//         >
//           <RefreshCw className={`w-4 h-4 mr-2 ${isPolling ? 'animate-spin' : ''}`} />
//           {isPolling ? 'Live Monitoring...' : 'Refresh Status'}
//         </Button>
//       </div>

//       {/* 3. Main Grid */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
//         {/* LEFT COLUMN: Results Summary */}
//         <div className="space-y-6">
//           <Card className="border-zinc-800 bg-zinc-900/30">
//             <CardHeader>
//               <CardTitle>Results Summary</CardTitle>
//             </CardHeader>
//             <CardContent>
//               {!run.result_json ? (
//                 <div className="text-center py-8 text-zinc-500 italic">
//                   Results pending...
//                 </div>
//               ) : (
//                 <div className="space-y-4">
//                   {/* Score Card */}
//                   <div className="grid grid-cols-2 gap-4">
//                     <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-center">
//                       <div className="text-2xl font-bold text-green-400">
//                         {run.result_json.passed_count || 0}
//                       </div>
//                       <div className="text-xs text-green-500 uppercase font-bold tracking-wider">Passed</div>
//                     </div>
//                     <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-center">
//                       <div className="text-2xl font-bold text-red-400">
//                         {run.result_json.failed_count || 0}
//                       </div>
//                       <div className="text-xs text-red-500 uppercase font-bold tracking-wider">Failed</div>
//                     </div>
//                   </div>

//                   {/* Raw JSON Toggle (Optional) */}
//                   <div className="mt-4 pt-4 border-t border-zinc-800">
//                     <div className="text-xs text-zinc-500 mb-2">Result Metadata</div>
//                     <pre className="text-xs font-mono text-zinc-400 bg-black p-3 rounded-lg overflow-x-auto max-h-40">
//                       {JSON.stringify(run.result_json, null, 2)}
//                     </pre>
//                   </div>
//                 </div>
//               )}
//             </CardContent>
//           </Card>
//         </div>

//         {/* RIGHT COLUMN: Terminal Logs */}
//         <div className="lg:col-span-2">
//           <TestRunLogViewer 
//             logs={getLogs()} 
//             fileName={`run-${run.id}-logs.txt`}
//           />
//         </div>

//       </div>
//     </div>
//   );
// }

'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Clock,
  CheckCircle2,
  RefreshCw,
} from 'lucide-react';

import api from '@/lib/api';
import { getToken } from '@/lib/auth';
import { TestRun } from '@/lib/types';
import PageHeader from '@/components/layout/PageHeader';
import TestRunStatus from '@/components/test-runs/TestRunStatus';
import TestRunLogViewer, { LogEntry } from '@/components/test-runs/TestRunLogViewer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function TestRunDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const projectId = params.projectId as string;
  const runId = params.runId as string;

  // --------------------------------------------------
  // STATE
  // --------------------------------------------------
  const [run, setRun] = useState<TestRun | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPolling, setIsPolling] = useState(false);

  // --------------------------------------------------
  // AUTH GUARD
  // --------------------------------------------------
  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.replace('/auth/login');
      return;
    }

    api.get('/auth/me').catch(() => {
      router.replace('/auth/login');
    });
  }, [router]);

  // --------------------------------------------------
  // FETCH TEST RUN
  // --------------------------------------------------
  const fetchRun = useCallback(async () => {
    try {
      const { data } = await api.get(`/test-runs/${runId}`);
      setRun(data);

      const activeStates = ['PENDING', 'RUNNING'];
      setIsPolling(activeStates.includes(data.status));
    } catch (err: any) {
      console.error('Failed to load test run', err);

      if (err.response?.status === 404) {
        router.replace(`/projects/${projectId}/test-runs`);
      }
    } finally {
      setLoading(false);
    }
  }, [runId, projectId, router]);

  // Initial load
  useEffect(() => {
    fetchRun();
  }, [fetchRun]);

  // --------------------------------------------------
  // POLLING (AUTO REFRESH)
  // --------------------------------------------------
  useEffect(() => {
    if (!isPolling) return;

    const interval = setInterval(fetchRun, 3000);
    return () => clearInterval(interval);
  }, [isPolling, fetchRun]);

  // --------------------------------------------------
  // LOGS (fallback-safe)
  // --------------------------------------------------
  const getLogs = (): LogEntry[] => {
    if (run?.logs?.length) return run.logs;

    if (!run) return [];

    return [
      {
        timestamp: run.created_at,
        level: 'INFO',
        message: 'Test run initialized.',
      },
      {
        timestamp: new Date().toISOString(),
        level: 'INFO',
        message: `Current status: ${run.status}`,
      },
      ...(run.result_json
        ? [
            {
              timestamp: run.completed_at || new Date().toISOString(),
              level: 'INFO',
              message: 'Execution completed.',
            },
          ]
        : []),
    ];
  };

  // --------------------------------------------------
  // RENDER STATES
  // --------------------------------------------------
  if (loading) {
    return (
      <div className="py-20 text-center text-zinc-500">
        Loading execution details...
      </div>
    );
  }

  if (!run) {
    return (
      <div className="py-20 text-center text-red-500">
        Test run not found.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* BACK NAV */}
      <div className="flex items-center gap-2 text-sm text-zinc-500">
        <Link
          href={`/projects/${projectId}/test-runs`}
          className="flex items-center gap-1 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to History
        </Link>
        <span>/</span>
        <span className="text-white">
          Run #{run.id.slice(0, 8)}
        </span>
      </div>

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            Execution Details
            <TestRunStatus status={run.status} />
          </h1>

          <div className="flex items-center gap-4 text-sm text-zinc-400 mt-2">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              Started: {new Date(run.created_at).toLocaleString()}
            </span>

            {run.completed_at && (
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                Finished: {new Date(run.completed_at).toLocaleString()}
              </span>
            )}
          </div>
        </div>

        <Button variant="outline" onClick={fetchRun} disabled={isPolling}>
          <RefreshCw
            className={`w-4 h-4 mr-2 ${
              isPolling ? 'animate-spin' : ''
            }`}
          />
          {isPolling ? 'Live Monitoring…' : 'Refresh'}
        </Button>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* SUMMARY */}
        <Card className="border-zinc-800 bg-zinc-900/30">
          <CardHeader>
            <CardTitle>Results Summary</CardTitle>
          </CardHeader>

          <CardContent>
            {!run.result_json ? (
              <div className="text-center py-8 text-zinc-500 italic">
                Results pending…
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-center">
                    <div className="text-2xl font-bold text-green-400">
                      {run.result_json.passed_count ?? 0}
                    </div>
                    <div className="text-xs text-green-500 uppercase font-bold">
                      Passed
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-center">
                    <div className="text-2xl font-bold text-red-400">
                      {run.result_json.failed_count ?? 0}
                    </div>
                    <div className="text-xs text-red-500 uppercase font-bold">
                      Failed
                    </div>
                  </div>
                </div>

                <pre className="text-xs font-mono text-zinc-400 bg-black p-3 rounded-lg overflow-x-auto max-h-40">
                  {JSON.stringify(run.result_json, null, 2)}
                </pre>
              </div>
            )}
          </CardContent>
        </Card>

        {/* LOGS */}
        <div className="lg:col-span-2">
          <TestRunLogViewer
            logs={getLogs()}
            fileName={`run-${run.id}-logs.txt`}
          />
        </div>
      </div>
    </div>
  );
}
