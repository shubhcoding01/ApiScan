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

// 'use client';

// import { useState, useEffect } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import { 
//   ArrowLeft, 
//   CheckCircle2, 
//   XCircle, 
//   AlertTriangle, 
//   Clock, 
//   Loader2,
//   Terminal
// } from 'lucide-react';
// import api from '@/lib/api';
// import { Badge } from '@/components/ui/badge';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// export default function TestRunDetailsPage() {
//   const params = useParams();
//   const router = useRouter();
//   const runId = params?.runId as string;

//   const [run, setRun] = useState<any>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!runId) return;

//     const fetchRun = async () => {
//       try {
//         const { data } = await api.get(`/test-runs/${runId}`);
//         setRun(data);
        
//         // If still running, poll every 2 seconds
//         if (data.status === 'RUNNING' || data.status === 'PENDING') {
//           setTimeout(fetchRun, 2000);
//         } else {
//           setLoading(false);
//         }
//       } catch (err) {
//         console.error("Error fetching run:", err);
//         setLoading(false);
//       }
//     };

//     fetchRun();
//   }, [runId]);

//   if (loading && !run) {
//     return (
//       <div className="flex flex-col items-center justify-center h-[50vh] text-zinc-500">
//         <Loader2 className="w-8 h-8 animate-spin mb-2" />
//         <p>Loading Test Results...</p>
//       </div>
//     );
//   }

//   if (!run) return <div>Run not found</div>;

//   return (
//     <div className="max-w-6xl mx-auto space-y-6 pb-20">
//       {/* HEADER */}
//       <div>
//         <Button variant="ghost" onClick={() => router.back()} className="pl-0 text-zinc-400 hover:text-white mb-4">
//           <ArrowLeft className="w-4 h-4 mr-2" /> Back
//         </Button>
//         <div className="flex items-center justify-between">
//             <div>
//                 <h1 className="text-2xl font-bold text-white flex items-center gap-3">
//                     Test Run Results
//                     <Badge variant="outline" className={`
//                         ${run.status === 'PASSED' ? 'text-green-400 border-green-900 bg-green-900/20' : ''}
//                         ${run.status === 'FAILED' ? 'text-red-400 border-red-900 bg-red-900/20' : ''}
//                         ${run.status === 'RUNNING' ? 'text-blue-400 border-blue-900 bg-blue-900/20 animate-pulse' : ''}
//                     `}>
//                         {run.status}
//                     </Badge>
//                 </h1>
//                 <p className="text-zinc-500 mt-1">ID: {run.id}</p>
//             </div>
//             {run.status === 'RUNNING' && (
//                 <div className="flex items-center text-blue-400 text-sm">
//                     <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Test Execution in Progress...
//                 </div>
//             )}
//         </div>
//       </div>

//       {/* STATS GRID */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         <Card className="bg-zinc-900/50 border-zinc-800">
//             <CardContent className="pt-6">
//                 <div className="text-zinc-400 text-sm font-medium">Reliability Score</div>
//                 <div className={`text-3xl font-bold mt-2 ${run.reliability_score > 80 ? 'text-green-500' : 'text-orange-500'}`}>
//                     {run.reliability_score || 0}%
//                 </div>
//             </CardContent>
//         </Card>
//         <Card className="bg-zinc-900/50 border-zinc-800">
//             <CardContent className="pt-6">
//                 <div className="text-zinc-400 text-sm font-medium">Total Tests</div>
//                 <div className="text-3xl font-bold text-white mt-2">{run.total_tests || 0}</div>
//             </CardContent>
//         </Card>
//         <Card className="bg-zinc-900/50 border-zinc-800">
//             <CardContent className="pt-6">
//                 <div className="text-green-500/80 text-sm font-medium">Passed</div>
//                 <div className="text-3xl font-bold text-green-500 mt-2">{run.passed_tests || 0}</div>
//             </CardContent>
//         </Card>
//         <Card className="bg-zinc-900/50 border-zinc-800">
//             <CardContent className="pt-6">
//                 <div className="text-red-500/80 text-sm font-medium">Failed</div>
//                 <div className="text-3xl font-bold text-red-500 mt-2">{run.failed_tests || 0}</div>
//             </CardContent>
//         </Card>
//       </div>

//       {/* LOGS TABLE */}
//       <Card className="bg-zinc-900 border-zinc-800">
//         <CardHeader className="border-b border-zinc-800">
//             <CardTitle className="text-lg flex items-center gap-2">
//                 <Terminal className="w-5 h-5 text-zinc-500" />
//                 Execution Logs
//             </CardTitle>
//         </CardHeader>
//         <CardContent className="p-0">
//             <div className="overflow-x-auto">
//                 <table className="w-full text-left text-sm">
//                     <thead className="bg-black/20 text-zinc-400 font-medium">
//                         <tr>
//                             <th className="p-4">Status</th>
//                             <th className="p-4">Method</th>
//                             <th className="p-4">Endpoint</th>
//                             <th className="p-4">Response</th>
//                         </tr>
//                     </thead>
//                     <tbody className="divide-y divide-zinc-800">
//                         {run.results?.map((log: any, i: number) => (
//                             <tr key={i} className="hover:bg-zinc-800/30">
//                                 <td className="p-4 align-top">
//                                     {log.result === 'PASS' ? (
//                                         <Badge className="bg-green-900/20 text-green-400 border-green-900 hover:bg-green-900/20">PASS {log.status_code}</Badge>
//                                     ) : (
//                                         <Badge className="bg-red-900/20 text-red-400 border-red-900 hover:bg-red-900/20">FAIL {log.status_code}</Badge>
//                                     )}
//                                 </td>
//                                 <td className="p-4 align-top font-mono text-zinc-300 font-bold">{log.method}</td>
//                                 <td className="p-4 align-top font-mono text-zinc-400 break-all">{log.endpoint}</td>
//                                 <td className="p-4 align-top font-mono text-xs text-zinc-500 max-w-md truncate">
//                                     {log.response_body || log.error_message || '-'}
//                                 </td>
//                             </tr>
//                         ))}
//                         {(!run.results || run.results.length === 0) && (
//                             <tr>
//                                 <td colSpan={4} className="p-8 text-center text-zinc-500">
//                                     No logs available. (Did you update the Backend Schema?)
//                                 </td>
//                             </tr>
//                         )}
//                     </tbody>
//                 </table>
//             </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }


'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Loader2,
  Bot,
  Search,
  Bell,
  ChevronRight,
  LayoutList,
  Target,
  CheckCircle2,
  XCircle,
  Clock
} from 'lucide-react';

import api from '@/lib/api';
import TestLogViewer from '@/components/test-runs/TestLogViewer'; // 👈 Import the component we just made
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

export default function TestRunDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params?.projectId as string;
  const runId = params?.runId as string;

  const [run, setRun] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Poll for updates
  useEffect(() => {
    if (!runId) return;

    const fetchRun = async () => {
      try {
        const { data } = await api.get(`/test-runs/${runId}`);
        setRun(data);
        
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
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-zinc-500">
        <Loader2 className="w-10 h-10 animate-spin mb-4 text-blue-600" />
        <p>Initializing Test Run...</p>
      </div>
    );
  }

  if (!run) return <div className="min-h-screen bg-black text-white p-10">Run not found</div>;

  const isRunning = run.status === 'RUNNING' || run.status === 'PENDING';

  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-500/30">
      
      {/* --- 1. NAVBAR (Consistent with Dashboard) --- */}
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-black/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm">
              <Link href="/projects" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-blue-900/20">
                  <Bot className="w-5 h-5" />
                </div>
                <span className="font-bold hidden sm:block">ApiScan</span>
              </Link>
              <ChevronRight className="w-4 h-4 text-zinc-600" />
              <Link href={`/projects/${projectId}`} className="hover:text-white text-zinc-400 transition-colors">
                Project
              </Link>
              <ChevronRight className="w-4 h-4 text-zinc-600" />
              <span className="text-white font-medium">Run Details</span>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
               <div className="relative hidden md:block w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
                <Input placeholder="Search logs..." className="pl-9 bg-zinc-900/50 border-zinc-800 h-9" />
              </div>
              <button className="p-2 text-zinc-400 hover:text-white"><Bell className="w-5 h-5" /></button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 rounded-full p-0">
                    <Avatar className="h-8 w-8 border border-white/10">
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback className="bg-zinc-800 text-zinc-400">JD</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-zinc-950 border-zinc-800 text-zinc-300" align="end">
                  <DropdownMenuLabel className="text-white">John Doe</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-zinc-800" />
                  <DropdownMenuItem className="hover:bg-zinc-900 cursor-pointer">Log out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </nav>

      {/* --- 2. MAIN CONTENT --- */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {/* HEADER AREA */}
        <div>
            <Button variant="ghost" onClick={() => router.back()} className="pl-0 text-zinc-400 hover:text-white hover:bg-transparent mb-2">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Project
            </Button>
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                        Test Run #{run.id.slice(0, 8)}
                        {/* Status Badge */}
                        <Badge variant="outline" className={`
                            px-3 py-1 text-sm border
                            ${run.status === 'PASSED' ? 'text-green-400 border-green-500/30 bg-green-500/10 shadow-[0_0_10px_rgba(74,222,128,0.2)]' : ''}
                            ${run.status === 'FAILED' ? 'text-red-400 border-red-500/30 bg-red-500/10 shadow-[0_0_10px_rgba(248,113,113,0.2)]' : ''}
                            ${isRunning ? 'text-blue-400 border-blue-500/30 bg-blue-500/10 animate-pulse' : ''}
                        `}>
                            {isRunning && <Loader2 className="w-3 h-3 mr-2 animate-spin" />}
                            {run.status}
                        </Badge>
                    </h1>
                    <p className="text-zinc-400 mt-2 flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Started on {new Date(run.created_at).toLocaleString()}
                    </p>
                </div>

                {/* Reliability Score Ring */}
                {!isRunning && (
                    <div className="flex items-center gap-4 bg-zinc-900/50 border border-zinc-800 p-3 rounded-xl backdrop-blur-sm">
                        <div className="text-right">
                            <div className="text-sm text-zinc-400">Reliability Score</div>
                            <div className={`text-2xl font-bold ${run.reliability_score > 80 ? 'text-green-500' : 'text-orange-500'}`}>
                                {run.reliability_score || 0}%
                            </div>
                        </div>
                        {/* Simple CSS Ring */}
                        <div className="relative w-12 h-12 flex items-center justify-center">
                            <svg className="w-full h-full transform -rotate-90">
                                <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-zinc-800" />
                                <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" fill="transparent" 
                                    strokeDasharray={126} 
                                    strokeDashoffset={126 - (126 * (run.reliability_score || 0)) / 100} 
                                    className={run.reliability_score > 80 ? 'text-green-500' : 'text-orange-500'} 
                                />
                            </svg>
                        </div>
                    </div>
                )}
            </div>
        </div>

        {/* STATS CARDS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatBox label="Total Tests" value={run.total_tests || 0} icon={LayoutList} color="text-white" />
            <StatBox label="Passed" value={run.passed_tests || 0} icon={CheckCircle2} color="text-green-400" bg="bg-green-500/5" border="border-green-500/20" />
            <StatBox label="Failed" value={run.failed_tests || 0} icon={XCircle} color="text-red-400" bg="bg-red-500/5" border="border-red-500/20" />
            <StatBox label="Coverage" value="100%" icon={Target} color="text-blue-400" />
        </div>

        {/* LOGS VIEWER */}
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    Execution Logs
                </h2>
                <div className="text-xs text-zinc-500 font-mono">
                    ID: {run.id}
                </div>
            </div>
            
            {/* The Pro Component */}
            <TestLogViewer results={run.results} />
        </div>

      </main>
    </div>
  );
}

// --- Helper Components ---

function StatBox({ label, value, icon: Icon, color, bg = "bg-zinc-900/50", border = "border-zinc-800" }: any) {
    return (
        <Card className={`${bg} ${border} backdrop-blur-sm`}>
            <CardContent className="p-6 flex items-center justify-between">
                <div>
                    <p className="text-zinc-500 text-xs font-medium uppercase tracking-wider">{label}</p>
                    <p className={`text-2xl font-bold mt-1 ${color}`}>{value}</p>
                </div>
                <div className={`p-3 rounded-full bg-zinc-950 border border-zinc-800 ${color}`}>
                    <Icon className="w-5 h-5" />
                </div>
            </CardContent>
        </Card>
    );
}