// 'use client';

// import { useState, useEffect, useCallback } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import Link from 'next/link';
// import {
//   Play,
//   ArrowRight,
//   Loader2,
//   Calendar,
// } from 'lucide-react';

// import api from '@/lib/api';
// import { getToken } from '@/lib/auth';
// import { TestBlueprint, TestRun } from '@/lib/types';
// import PageHeader from '@/components/layout/PageHeader';
// import TestRunStatus from '@/components/test-runs/TestRunStatus';
// import { Button } from '@/components/ui/button';
// import { Card } from '@/components/ui/card';

// export default function TestRunsListPage() {
//   const params = useParams();
//   const router = useRouter();
//   const projectId = params.projectId as string;

//   // --------------------------------------------------
//   // STATE
//   // --------------------------------------------------
//   const [runs, setRuns] = useState<TestRun[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [startingRunId, setStartingRunId] = useState<string | null>(null);

//   // --------------------------------------------------
//   // AUTH GUARD
//   // --------------------------------------------------
//   useEffect(() => {
//     const token = getToken();
//     if (!token) {
//       router.replace('/login');
//       return;
//     }

//     api.get('/auth/me').catch(() => {
//       router.replace('/login');
//     });
//   }, [router]);

//   // --------------------------------------------------
//   // FETCH RUNS (via blueprints → runs)
//   // --------------------------------------------------
//   const fetchRuns = useCallback(async () => {
//     try {
//       // 1. Fetch specs
//       const specsRes = await api.get(`/specs/${projectId}`);
//       const versions = specsRes.data;

//       if (!versions.length) {
//         setRuns([]);
//         return;
//       }

//       // 2. Fetch blueprints for each version
//       const blueprintRequests = versions.map((v: any) =>
//         api.get(`/test-blueprints/api-version/${v.id}`)
//       );

//       const blueprintResults = await Promise.allSettled(blueprintRequests);

//       const blueprints: TestBlueprint[] = blueprintResults
//         .filter((r): r is PromiseFulfilledResult<any> => r.status === 'fulfilled')
//         .flatMap((r) => r.value.data);

//       if (!blueprints.length) {
//         setRuns([]);
//         return;
//       }

//       // 3. Fetch runs for each blueprint
//       const runRequests = blueprints.map((bp) =>
//         api.get(`/test-runs/blueprint/${bp.id}`)
//       );

//       const runResults = await Promise.allSettled(runRequests);

//       const allRuns: TestRun[] = runResults
//         .filter((r): r is PromiseFulfilledResult<any> => r.status === 'fulfilled')
//         .flatMap((r) => r.value.data);

//       // Sort newest first
//       allRuns.sort(
//         (a, b) =>
//           new Date(b.created_at).getTime() -
//           new Date(a.created_at).getTime()
//       );

//       setRuns(allRuns);
//     } catch (err) {
//       console.error('Failed to load test runs', err);
//     } finally {
//       setIsLoading(false);
//     }
//   }, [projectId]);

//   useEffect(() => {
//     fetchRuns();
//   }, [fetchRuns]);

//   // --------------------------------------------------
//   // RUN AGAIN
//   // --------------------------------------------------
//   const handleRunAgain = async (blueprintId: string) => {
//     setStartingRunId(blueprintId);
//     try {
//       const { data } = await api.post('/test-runs/', {
//         blueprint_id: blueprintId,
//       });
//       router.push(`/projects/${projectId}/test-runs/${data.id}`);
//     } catch (err) {
//       console.error('Failed to start test run', err);
//       alert('Failed to start test run.');
//     } finally {
//       setStartingRunId(null);
//     }
//   };

//   // --------------------------------------------------
//   // RENDER
//   // --------------------------------------------------
//   return (
//     <div className="max-w-6xl mx-auto space-y-8">
//       <PageHeader
//         title="Test Runs History"
//         description="View results of automated test executions."
//       >
//         <Link href={`/projects/${projectId}/blueprints`}>
//           <Button variant="outline">
//             <Play className="w-4 h-4 mr-2" />
//             Start New Run
//           </Button>
//         </Link>
//       </PageHeader>

//       {isLoading ? (
//         <div className="flex justify-center py-12">
//           <Loader2 className="w-8 h-8 animate-spin text-zinc-500" />
//         </div>
//       ) : runs.length === 0 ? (
//         <Card className="border-dashed border-zinc-800 bg-zinc-900/30 p-12 text-center">
//           <h3 className="text-xl font-medium text-white">
//             No Test Runs Yet
//           </h3>
//           <p className="text-zinc-500 mt-2 mb-6">
//             Generate a blueprint and run your first automated test.
//           </p>
//           <Link href={`/projects/${projectId}/blueprints`}>
//             <Button>Go to Blueprints</Button>
//           </Link>
//         </Card>
//       ) : (
//         <div className="border border-zinc-800 rounded-xl overflow-hidden">
//           <table className="w-full text-sm">
//             <thead className="bg-zinc-900/50 border-b border-zinc-800 text-zinc-400">
//               <tr>
//                 <th className="px-6 py-4">Status</th>
//                 <th className="px-6 py-4">Run ID</th>
//                 <th className="px-6 py-4">Date</th>
//                 <th className="px-6 py-4">Duration</th>
//                 <th className="px-6 py-4 text-right">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-zinc-800 bg-black/20">
//               {runs.map((run) => (
//                 <tr key={run.id} className="hover:bg-zinc-900/40">
//                   <td className="px-6 py-4">
//                     <TestRunStatus status={run.status} />
//                   </td>

//                   <td className="px-6 py-4 font-mono">
//                     #{run.id.slice(0, 8)}
//                   </td>

//                   <td className="px-6 py-4 text-zinc-400">
//                     <div className="flex items-center gap-2">
//                       <Calendar className="w-4 h-4 text-zinc-600" />
//                       {new Date(run.created_at).toLocaleString()}
//                     </div>
//                   </td>

//                   <td className="px-6 py-4 font-mono text-zinc-400">
//                     {run.completed_at
//                       ? `${(
//                           (new Date(run.completed_at).getTime() -
//                             new Date(run.created_at).getTime()) /
//                           1000
//                         ).toFixed(2)}s`
//                       : '--'}
//                   </td>

//                   <td className="px-6 py-4 text-right">
//                     <div className="flex justify-end gap-2">
//                       <button
//                         onClick={() =>
//                           handleRunAgain(run.blueprint_id)
//                         }
//                         disabled={startingRunId === run.blueprint_id}
//                         className="p-2 text-zinc-500 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg"
//                       >
//                         {startingRunId === run.blueprint_id ? (
//                           <Loader2 className="w-4 h-4 animate-spin" />
//                         ) : (
//                           <Play className="w-4 h-4" />
//                         )}
//                       </button>

//                       <Link
//                         href={`/projects/${projectId}/test-runs/${run.id}`}
//                       >
//                         <Button variant="ghost" size="sm">
//                           Details
//                           <ArrowRight className="w-3 h-3 ml-2" />
//                         </Button>
//                       </Link>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }



'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Play,
  ArrowRight,
  Loader2,
  Calendar,
  Clock,
  Search,
  Filter,
  Bot,
  ChevronRight,
  Bell,
  LayoutList
} from 'lucide-react';

import api from '@/lib/api';
import { getToken } from '@/lib/auth';
import { TestBlueprint, TestRun } from '@/lib/types'; // Ensure TestRun has completed_at? in types.ts
import PageHeader from '@/components/layout/PageHeader';
import TestRunStatus from '@/components/test-runs/TestRunStatus';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function TestRunsListPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.projectId as string;

  // --- STATE ---
  const [runs, setRuns] = useState<any[]>([]); // Using any[] to safely handle backend field variations
  const [blueprintsMap, setBlueprintsMap] = useState<Record<string, string>>({}); // Map ID -> Name
  const [isLoading, setIsLoading] = useState(true);
  const [startingRunId, setStartingRunId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // --- AUTH GUARD ---
  useEffect(() => {
    const token = getToken();
    if (!token) router.replace('/login');
  }, [router]);

  // --- FETCH DATA ---
  const fetchRuns = useCallback(async () => {
    try {
      // 1. Get Project Specs -> Versions
      const specsRes = await api.get(`/specs/${projectId}`);
      const versions = specsRes.data;

      if (!versions.length) {
        setRuns([]);
        return;
      }

      // 2. Get Blueprints
      const blueprintRequests = versions.map((v: any) =>
        api.get(`/test-blueprints/api-version/${v.id}`)
      );
      const blueprintResults = await Promise.allSettled(blueprintRequests);
      
      const blueprints: TestBlueprint[] = blueprintResults
        .filter((r): r is PromiseFulfilledResult<any> => r.status === 'fulfilled')
        .flatMap((r) => r.value.data);

      // Create a map for easy name lookup
      const bpMap: Record<string, string> = {};
      blueprints.forEach(bp => {
        // Extract summary from nested JSON or fallback
        const summary = (bp.ai_strategy_json as any)?.summary || `Strategy #${bp.id.slice(0, 4)}`;
        bpMap[bp.id] = summary;
      });
      setBlueprintsMap(bpMap);

      if (!blueprints.length) {
        setRuns([]);
        return;
      }

      // 3. Get Runs
      const runRequests = blueprints.map((bp) =>
        api.get(`/test-runs/blueprint/${bp.id}`)
      );
      const runResults = await Promise.allSettled(runRequests);
      const allRuns = runResults
        .filter((r): r is PromiseFulfilledResult<any> => r.status === 'fulfilled')
        .flatMap((r) => r.value.data);

      // Sort: Newest first
      allRuns.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

      setRuns(allRuns);
    } catch (err) {
      console.error('Failed to load test runs', err);
    } finally {
      setIsLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    fetchRuns();
  }, [fetchRuns]);

  // --- ACTIONS ---
  const handleRunAgain = async (blueprintId: string) => {
    setStartingRunId(blueprintId);
    try {
      const { data } = await api.post(`/test-blueprints/${blueprintId}/run`);
      // Correctly handle the response ID (backend might send 'id' or 'test_run_id')
      const newRunId = data.id || data.test_run_id;
      if (newRunId) {
        router.push(`/projects/${projectId}/test-runs/${newRunId}`);
      }
    } catch (err) {
      console.error('Failed to start test run', err);
      alert('Failed to start test run.');
    } finally {
      setStartingRunId(null);
    }
  };

  // --- FILTERING ---
  const filteredRuns = runs.filter(run => 
    run.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (blueprintsMap[run.blueprint_id] || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-500/30">
      
      {/* --- 1. NAVBAR --- */}
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-black/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
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
              <span className="text-white font-medium">History</span>
            </div>

            <div className="flex items-center gap-4">
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
                  <DropdownMenuItem className="hover:bg-zinc-900 cursor-pointer text-red-400">Log out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </nav>

      {/* --- 2. MAIN CONTENT --- */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <PageHeader
            title="Execution History"
            description="View logs and results of all automated test executions."
            
          />
          <Link href={`/projects/${projectId}/blueprints`}>
            <Button className="bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20">
              <Play className="w-4 h-4 mr-2" />
              Run New Test
            </Button>
          </Link>
        </div>

        {/* --- 3. FILTERS --- */}
        <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
                <Input 
                    placeholder="Search by Run ID or Blueprint Name..." 
                    className="pl-9 bg-zinc-900/50 border-zinc-800 focus:bg-zinc-900 transition-colors"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <Button variant="outline" className="border-zinc-800 bg-zinc-900/50 text-zinc-400">
                <Filter className="w-4 h-4 mr-2" />
                Filter
            </Button>
        </div>

        {/* --- 4. DATA TABLE --- */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-zinc-500">
            <Loader2 className="w-10 h-10 animate-spin mb-4 text-blue-600" />
            <p>Loading run history...</p>
          </div>
        ) : filteredRuns.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 border border-dashed border-zinc-800 rounded-xl bg-zinc-900/20 text-center">
            <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mb-6 border border-zinc-800">
                <LayoutList className="w-8 h-8 text-zinc-600" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No Runs Found</h3>
            <p className="text-zinc-500 max-w-sm mb-6">
              {runs.length === 0 
                ? "You haven't executed any tests yet. Go to Blueprints to start." 
                : "No runs match your search query."}
            </p>
            {runs.length === 0 && (
                <Link href={`/projects/${projectId}/blueprints`}>
                    <Button variant="outline">Go to Blueprints</Button>
                </Link>
            )}
          </div>
        ) : (
          <Card className="border-zinc-800 bg-zinc-900/30 backdrop-blur-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-zinc-950/50 border-b border-zinc-800 text-zinc-500 font-medium uppercase tracking-wider text-xs">
                  <tr>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Blueprint Strategy</th>
                    <th className="px-6 py-4">Run ID</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Duration</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/50">
                  {filteredRuns.map((run) => {
                    // --- DURATION CALCULATION FIX ---
                    // Handles both 'completed_at' (new) and 'finished_at' (legacy)
                    const endTime = run.completed_at || run.finished_at;
                    let durationLabel = (
                        <span className="text-blue-500 flex items-center gap-1 animate-pulse">
                            <Loader2 className="w-3 h-3 animate-spin" /> Running...
                        </span>
                    );
                    
                    if (endTime) {
                        const start = new Date(run.created_at).getTime();
                        const end = new Date(endTime).getTime();
                        const durationSec = ((end - start) / 1000).toFixed(1);
                        durationLabel = (
                            <span className="flex items-center gap-1 font-mono">
                                <Clock className="w-3 h-3" /> {durationSec}s
                            </span>
                        );
                    }

                    return (
                        <tr key={run.id} className="group hover:bg-white/5 transition-colors">
                            <td className="px-6 py-4">
                                <TestRunStatus status={run.status} />
                            </td>

                            <td className="px-6 py-4">
                                <div className="font-medium text-zinc-200">
                                    {blueprintsMap[run.blueprint_id] || 'Unknown Strategy'}
                                </div>
                            </td>

                            <td className="px-6 py-4">
                                <Badge variant="outline" className="font-mono text-xs text-zinc-500 border-zinc-800 bg-zinc-950">
                                    #{run.id.slice(0, 8)}
                                </Badge>
                            </td>

                            <td className="px-6 py-4 text-zinc-400">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-3.5 h-3.5 text-zinc-600" />
                                    {new Date(run.created_at).toLocaleDateString()}
                                    <span className="text-zinc-600 px-1">•</span>
                                    {new Date(run.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                </div>
                            </td>

                            <td className="px-6 py-4 font-mono text-xs text-zinc-400">
                                {durationLabel}
                            </td>

                            <td className="px-6 py-4 text-right">
                                <div className="flex justify-end items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => handleRunAgain(run.blueprint_id)}
                                        disabled={startingRunId === run.blueprint_id}
                                        className="p-2 text-zinc-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-md transition-colors"
                                        title="Re-run Strategy"
                                    >
                                        {startingRunId === run.blueprint_id ? (
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                        ) : (
                                            <Play className="w-4 h-4" />
                                        )}
                                    </button>

                                    <div className="h-4 w-px bg-zinc-800 mx-1" />

                                    <Link href={`/projects/${projectId}/test-runs/${run.id}`}>
                                        <Button variant="ghost" size="sm" className="h-8 text-xs hover:bg-zinc-800 text-zinc-300">
                                            View Logs
                                            <ArrowRight className="w-3 h-3 ml-2" />
                                        </Button>
                                    </Link>
                                </div>
                            </td>
                        </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </main>
    </div>
  );
}