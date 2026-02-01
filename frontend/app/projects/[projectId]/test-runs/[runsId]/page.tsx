// 'use client';

// import { useState, useEffect } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import { 
//   ArrowLeft, 
//   CheckCircle2, 
//   XCircle, 
//   Clock, 
//   Server, 
//   FileJson,
//   AlertTriangle,
//   Loader2
// } from 'lucide-react';

// import api from '@/lib/api';
// import PageHeader from '@/components/layout/PageHeader';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';

// // Types (You can move these to types.ts later)
// interface TestResult {
//   id: string;
//   name: string;
//   method: string;
//   endpoint: string;
//   status_code: number;
//   result: 'PASS' | 'FAIL' | 'ERROR';
//   response_body: string;
//   error_message?: string;
// }

// interface TestRun {
//   id: string;
//   status: string;
//   started_at: string;
//   completed_at?: string;
//   passed_tests: number;
//   failed_tests: number;
//   total_tests: number;
//   results: TestResult[];
// }

// export default function RunDetailsPage() {
//   const router = useRouter();
//   const params = useParams();
//   const runId = params?.runId as string;

//   const [run, setRun] = useState<TestRun | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!runId) return;

//     const fetchRun = async () => {
//       try {
//         const { data } = await api.get(`/test-runs/${runId}`);
//         setRun(data);
//       } catch (err) {
//         console.error('Failed to load run', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRun();
//   }, [runId]);

//   if (loading) return (
//     <div className="flex justify-center py-20">
//       <Loader2 className="w-8 h-8 animate-spin text-zinc-500" />
//     </div>
//   );

//   if (!run) return (
//     <div className="flex flex-col items-center justify-center min-h-[50vh]">
//       <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
//       <h3 className="text-xl font-bold text-white">Run Not Found</h3>
//       <Button variant="outline" className="mt-4" onClick={() => router.back()}>
//         Go Back
//       </Button>
//     </div>
//   );

//   return (
//     <div className="max-w-6xl mx-auto space-y-8 pb-20">
//       {/* HEADER */}
//       <div>
//         <Button 
//           variant="ghost" 
//           className="mb-4 pl-0 text-zinc-400 hover:text-white"
//           onClick={() => router.back()}
//         >
//           <ArrowLeft className="w-4 h-4 mr-2" />
//           Back to Blueprint
//         </Button>
        
//         <div className="flex items-start justify-between">
//           <PageHeader 
//             title={`Run #${run.id.slice(0, 8)}`} 
//             description={`Executed on ${new Date(run.started_at).toLocaleString()}`} 
//           />
//           <StatusBadge status={run.status} />
//         </div>
//       </div>

//       {/* STATS OVERVIEW */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//         <Card className="bg-zinc-900/50 border-zinc-800">
//           <CardHeader className="pb-2">
//             <CardTitle className="text-sm font-medium text-zinc-400">Total Tests</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold text-white">{run.total_tests}</div>
//           </CardContent>
//         </Card>
        
//         <Card className="bg-green-900/10 border-green-900/20">
//           <CardHeader className="pb-2">
//             <CardTitle className="text-sm font-medium text-green-500">Passed</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold text-green-500">{run.passed_tests}</div>
//           </CardContent>
//         </Card>

//         <Card className="bg-red-900/10 border-red-900/20">
//           <CardHeader className="pb-2">
//             <CardTitle className="text-sm font-medium text-red-500">Failed</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold text-red-500">{run.failed_tests}</div>
//           </CardContent>
//         </Card>

//         <Card className="bg-zinc-900/50 border-zinc-800">
//           <CardHeader className="pb-2">
//             <CardTitle className="text-sm font-medium text-zinc-400">Duration</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold text-white">
//                {run.completed_at 
//                  ? `${(new Date(run.completed_at).getTime() - new Date(run.started_at).getTime()) / 1000}s` 
//                  : 'Ongoing'}
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* RESULTS LIST */}
//       <div className="space-y-4">
//         <h2 className="text-xl font-bold text-white">Execution Logs</h2>
        
//         {run.results?.length === 0 ? (
//           <div className="text-center py-12 border border-dashed border-zinc-800 rounded-xl bg-zinc-900/30">
//             <p className="text-zinc-500">No results logs found.</p>
//           </div>
//         ) : (
//           <div className="rounded-lg border border-zinc-800 overflow-hidden">
//             <table className="w-full text-sm text-left">
//               <thead className="bg-zinc-900 text-zinc-400 font-medium">
//                 <tr>
//                   <th className="p-4">Status</th>
//                   <th className="p-4">Method</th>
//                   <th className="p-4">Endpoint</th>
//                   <th className="p-4">Code</th>
//                   <th className="p-4">Response Preview</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-zinc-800 bg-zinc-900/20">
//                 {run.results.map((result) => (
//                   <tr key={result.id} className="hover:bg-zinc-800/30 transition-colors">
//                     <td className="p-4">
//                       {result.result === 'PASS' ? (
//                         <span className="flex items-center text-green-500 font-bold text-xs gap-1.5">
//                           <CheckCircle2 className="w-4 h-4" /> PASS
//                         </span>
//                       ) : (
//                         <span className="flex items-center text-red-500 font-bold text-xs gap-1.5">
//                           <XCircle className="w-4 h-4" /> FAIL
//                         </span>
//                       )}
//                     </td>
//                     <td className="p-4 font-mono text-zinc-300">{result.method}</td>
//                     <td className="p-4 font-mono text-zinc-300">{result.endpoint}</td>
//                     <td className="p-4">
//                       <Badge variant="outline" className={
//                         result.status_code >= 200 && result.status_code < 300 
//                           ? 'border-green-500/30 text-green-500' 
//                           : 'border-red-500/30 text-red-500'
//                       }>
//                         {result.status_code}
//                       </Badge>
//                     </td>
//                     <td className="p-4 font-mono text-xs text-zinc-500 max-w-xs truncate">
//                        {result.response_body || result.error_message || '-'}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// function StatusBadge({ status }: { status: string }) {
//   const styles = {
//     RUNNING: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
//     COMPLETED: 'bg-green-500/10 text-green-500 border-green-500/20',
//     FAILED: 'bg-red-500/10 text-red-500 border-red-500/20',
//   };
  
//   return (
//     <span className={`px-3 py-1 rounded-full text-xs font-medium border ${styles[status as keyof typeof styles] || styles.RUNNING}`}>
//       {status}
//     </span>
//   );
// }

'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Clock, 
  Loader2,
  Terminal
} from 'lucide-react';
import api from '@/lib/api';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function TestRunDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const runId = params?.runId as string;

  const [run, setRun] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!runId) return;

    const fetchRun = async () => {
      try {
        const { data } = await api.get(`/test-runs/${runId}`);
        setRun(data);
        
        // If still running, poll every 2 seconds
        if (data.status === 'RUNNING' || data.status === 'PENDING') {
          setTimeout(fetchRun, 2000);
        } else {
          setLoading(false);
        }
      } catch (err) {
        console.error("Error fetching run:", err);
        setLoading(false);
      }
    };

    fetchRun();
  }, [runId]);

  if (loading && !run) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] text-zinc-500">
        <Loader2 className="w-8 h-8 animate-spin mb-2" />
        <p>Loading Test Results...</p>
      </div>
    );
  }

  if (!run) return <div>Run not found</div>;

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-20">
      {/* HEADER */}
      <div>
        <Button variant="ghost" onClick={() => router.back()} className="pl-0 text-zinc-400 hover:text-white mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                    Test Run Results
                    <Badge variant="outline" className={`
                        ${run.status === 'PASSED' ? 'text-green-400 border-green-900 bg-green-900/20' : ''}
                        ${run.status === 'FAILED' ? 'text-red-400 border-red-900 bg-red-900/20' : ''}
                        ${run.status === 'RUNNING' ? 'text-blue-400 border-blue-900 bg-blue-900/20 animate-pulse' : ''}
                    `}>
                        {run.status}
                    </Badge>
                </h1>
                <p className="text-zinc-500 mt-1">ID: {run.id}</p>
            </div>
            {run.status === 'RUNNING' && (
                <div className="flex items-center text-blue-400 text-sm">
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Test Execution in Progress...
                </div>
            )}
        </div>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-zinc-900/50 border-zinc-800">
            <CardContent className="pt-6">
                <div className="text-zinc-400 text-sm font-medium">Reliability Score</div>
                <div className={`text-3xl font-bold mt-2 ${run.reliability_score > 80 ? 'text-green-500' : 'text-orange-500'}`}>
                    {run.reliability_score || 0}%
                </div>
            </CardContent>
        </Card>
        <Card className="bg-zinc-900/50 border-zinc-800">
            <CardContent className="pt-6">
                <div className="text-zinc-400 text-sm font-medium">Total Tests</div>
                <div className="text-3xl font-bold text-white mt-2">{run.total_tests || 0}</div>
            </CardContent>
        </Card>
        <Card className="bg-zinc-900/50 border-zinc-800">
            <CardContent className="pt-6">
                <div className="text-green-500/80 text-sm font-medium">Passed</div>
                <div className="text-3xl font-bold text-green-500 mt-2">{run.passed_tests || 0}</div>
            </CardContent>
        </Card>
        <Card className="bg-zinc-900/50 border-zinc-800">
            <CardContent className="pt-6">
                <div className="text-red-500/80 text-sm font-medium">Failed</div>
                <div className="text-3xl font-bold text-red-500 mt-2">{run.failed_tests || 0}</div>
            </CardContent>
        </Card>
      </div>

      {/* LOGS TABLE */}
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader className="border-b border-zinc-800">
            <CardTitle className="text-lg flex items-center gap-2">
                <Terminal className="w-5 h-5 text-zinc-500" />
                Execution Logs
            </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="bg-black/20 text-zinc-400 font-medium">
                        <tr>
                            <th className="p-4">Status</th>
                            <th className="p-4">Method</th>
                            <th className="p-4">Endpoint</th>
                            <th className="p-4">Response</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800">
                        {run.results?.map((log: any, i: number) => (
                            <tr key={i} className="hover:bg-zinc-800/30">
                                <td className="p-4 align-top">
                                    {log.result === 'PASS' ? (
                                        <Badge className="bg-green-900/20 text-green-400 border-green-900 hover:bg-green-900/20">PASS {log.status_code}</Badge>
                                    ) : (
                                        <Badge className="bg-red-900/20 text-red-400 border-red-900 hover:bg-red-900/20">FAIL {log.status_code}</Badge>
                                    )}
                                </td>
                                <td className="p-4 align-top font-mono text-zinc-300 font-bold">{log.method}</td>
                                <td className="p-4 align-top font-mono text-zinc-400 break-all">{log.endpoint}</td>
                                <td className="p-4 align-top font-mono text-xs text-zinc-500 max-w-md truncate">
                                    {log.response_body || log.error_message || '-'}
                                </td>
                            </tr>
                        ))}
                        {(!run.results || run.results.length === 0) && (
                            <tr>
                                <td colSpan={4} className="p-8 text-center text-zinc-500">
                                    No logs available. (Did you update the Backend Schema?)
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}