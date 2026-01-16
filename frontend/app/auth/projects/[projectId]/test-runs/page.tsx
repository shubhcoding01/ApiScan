// 'use client';

// import { useState, useEffect, useCallback } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { 
//   Play, 
//   Clock, 
//   ArrowRight, 
//   Loader2, 
//   Calendar 
// } from 'lucide-react';

// import api from '@/lib/api';
// import { TestBlueprint, TestRun } from '@/lib/types';
// import PageHeader from '@/components/layout/PageHeader';
// import TestRunStatus from '@/components/test-runs/TestRunStatus';
// import { Button } from '@/components/ui/button';
// import { Card } from '@/components/ui/card';

// export default function TestRunsListPage() {
//   const params = useParams();
//   const router = useRouter();
//   const projectId = params.projectId as string;

//   // State
//   const [runs, setRuns] = useState<TestRun[]>([]);
//   const [blueprints, setBlueprints] = useState<TestBlueprint[]>([]);
  
//   const [isLoading, setIsLoading] = useState(true);
//   const [isStarting, setIsStarting] = useState(false);

//   // 1. Fetch Data (Runs & Blueprints)
//   const fetchData = useCallback(async () => {
//     try {
//       // Fetch Runs (Assuming endpoint exists to get all runs for a project)
//       // Note: If your backend only supports getting runs by blueprint, we might need to adjust this.
//       // For now, let's assume we fetch blueprints first, then fetch runs for them, or a project-wide endpoint.
      
//       // A. Fetch Blueprints for this project (via the latest version usually, or all)
//       // For simplicity, let's fetch the latest runs directly if the endpoint exists, 
//       // or we just show a "Select Blueprint to Run" section if no runs exist.
      
//       // Let's assume we have an endpoint: GET /test-runs/project/{projectId}
//       // If not, we might need to iterate through blueprints.
//       // Let's stick to the patterns we used: GET /test-runs/blueprint/{id}
      
//       // STRATEGY: 
//       // 1. Get Spec Versions -> Get Blueprints -> Get Runs (Complex)
//       // 2. OR: Backend provides GET /test-runs/project/{id} (Best Practice)
      
//       // *Using the Backend Endpoint provided in earlier context or standard REST:*
//       const runsRes = await api.get(`/test-runs/project/${projectId}`); 
//       setRuns(runsRes.data);

//       // Also fetch blueprints so we can start a new run
//       // This might require fetching versions first. For this UI, let's simplify:
//       // We will just list the runs. To start a NEW run, users usually go to "Blueprints" page.
      
//     } catch (err) {
//       console.error("Failed to load test runs", err);
//       // If the specific project-wide endpoint doesn't exist yet, fails gracefully
//     } finally {
//       setIsLoading(false);
//     }
//   }, [projectId]);

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);


//   // 2. Handle "Run Again" (Re-trigger an existing blueprint)
//   const handleRunAgain = async (blueprintId: string) => {
//     setIsStarting(true);
//     try {
//       const { data } = await api.post('/test-runs/', {
//         blueprint_id: blueprintId
//       });
//       // Redirect to the new run
//       router.push(`/projects/${projectId}/test-runs/${data.id}`);
//     } catch (err) {
//       console.error("Failed to start run", err);
//       alert("Failed to start test run.");
//       setIsStarting(false);
//     }
//   };

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

//       <div className="space-y-4">
//         {isLoading ? (
//           <div className="flex justify-center py-12">
//             <Loader2 className="w-8 h-8 animate-spin text-zinc-500" />
//           </div>
//         ) : runs.length === 0 ? (
//           <Card className="border-dashed border-zinc-800 bg-zinc-900/30 p-12 text-center">
//             <div className="flex flex-col items-center justify-center">
//               <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mb-4">
//                 <Play className="w-8 h-8 text-zinc-500 ml-1" />
//               </div>
//               <h3 className="text-xl font-medium text-white">No Test Runs Yet</h3>
//               <p className="text-zinc-500 max-w-sm mt-2 mb-6">
//                 You haven't executed any tests for this project. Go to Blueprints to generate and run a test plan.
//               </p>
//               <Link href={`/projects/${projectId}/blueprints`}>
//                 <Button>Go to Blueprints</Button>
//               </Link>
//             </div>
//           </Card>
//         ) : (
//           <div className="border border-zinc-800 rounded-xl overflow-hidden">
//             <table className="w-full text-left text-sm">
//               <thead className="bg-zinc-900/50 border-b border-zinc-800 text-zinc-400 font-medium">
//                 <tr>
//                   <th className="px-6 py-4">Status</th>
//                   <th className="px-6 py-4">Run ID</th>
//                   <th className="px-6 py-4">Date</th>
//                   <th className="px-6 py-4">Duration</th>
//                   <th className="px-6 py-4 text-right">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-zinc-800 bg-black/20">
//                 {runs.map((run) => (
//                   <tr key={run.id} className="group hover:bg-zinc-900/40 transition-colors">
                    
//                     {/* Status */}
//                     <td className="px-6 py-4">
//                       <TestRunStatus status={run.status} />
//                     </td>

//                     {/* ID */}
//                     <td className="px-6 py-4 font-mono text-zinc-300">
//                       #{run.id.slice(0, 8)}
//                     </td>

//                     {/* Date */}
//                     <td className="px-6 py-4 text-zinc-400">
//                       <div className="flex items-center gap-2">
//                         <Calendar className="w-4 h-4 text-zinc-600" />
//                         {new Date(run.created_at).toLocaleDateString()} 
//                         <span className="text-zinc-600 text-xs">
//                           {new Date(run.created_at).toLocaleTimeString()}
//                         </span>
//                       </div>
//                     </td>

//                     {/* Duration (Mock calculation if not in DB) */}
//                     <td className="px-6 py-4 text-zinc-400 font-mono">
//                        {run.completed_at ? (
//                          // Simple diff if completed
//                          ((new Date(run.completed_at).getTime() - new Date(run.created_at).getTime()) / 1000).toFixed(2) + 's'
//                        ) : (
//                          '--'
//                        )}
//                     </td>

//                     {/* Actions */}
//                     <td className="px-6 py-4 text-right">
//                       <div className="flex items-center justify-end gap-2">
//                         {/* Re-Run Button */}
//                         <button
//                           onClick={() => handleRunAgain(run.blueprint_id)}
//                           disabled={isStarting}
//                           className="p-2 text-zinc-500 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors"
//                           title="Run Again"
//                         >
//                           <Play className="w-4 h-4" />
//                         </button>

//                         {/* View Details Button */}
//                         <Link href={`/projects/${projectId}/test-runs/${run.id}`}>
//                           <Button variant="ghost" size="sm" className="h-8">
//                             Details
//                             <ArrowRight className="w-3 h-3 ml-2" />
//                           </Button>
//                         </Link>
//                       </div>
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

'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Play,
  ArrowRight,
  Loader2,
  Calendar,
} from 'lucide-react';

import api from '@/lib/api';
import { getToken } from '@/lib/auth';
import { TestBlueprint, TestRun } from '@/lib/types';
import PageHeader from '@/components/layout/PageHeader';
import TestRunStatus from '@/components/test-runs/TestRunStatus';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function TestRunsListPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.projectId as string;

  // --------------------------------------------------
  // STATE
  // --------------------------------------------------
  const [runs, setRuns] = useState<TestRun[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [startingRunId, setStartingRunId] = useState<string | null>(null);

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
  // FETCH RUNS (via blueprints → runs)
  // --------------------------------------------------
  const fetchRuns = useCallback(async () => {
    try {
      // 1. Fetch specs
      const specsRes = await api.get(`/specs/${projectId}`);
      const versions = specsRes.data;

      if (!versions.length) {
        setRuns([]);
        return;
      }

      // 2. Fetch blueprints for each version
      const blueprintRequests = versions.map((v: any) =>
        api.get(`/test-blueprints/api-version/${v.id}`)
      );

      const blueprintResults = await Promise.allSettled(blueprintRequests);

      const blueprints: TestBlueprint[] = blueprintResults
        .filter((r): r is PromiseFulfilledResult<any> => r.status === 'fulfilled')
        .flatMap((r) => r.value.data);

      if (!blueprints.length) {
        setRuns([]);
        return;
      }

      // 3. Fetch runs for each blueprint
      const runRequests = blueprints.map((bp) =>
        api.get(`/test-runs/blueprint/${bp.id}`)
      );

      const runResults = await Promise.allSettled(runRequests);

      const allRuns: TestRun[] = runResults
        .filter((r): r is PromiseFulfilledResult<any> => r.status === 'fulfilled')
        .flatMap((r) => r.value.data);

      // Sort newest first
      allRuns.sort(
        (a, b) =>
          new Date(b.created_at).getTime() -
          new Date(a.created_at).getTime()
      );

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

  // --------------------------------------------------
  // RUN AGAIN
  // --------------------------------------------------
  const handleRunAgain = async (blueprintId: string) => {
    setStartingRunId(blueprintId);
    try {
      const { data } = await api.post('/test-runs/', {
        blueprint_id: blueprintId,
      });
      router.push(`/projects/${projectId}/test-runs/${data.id}`);
    } catch (err) {
      console.error('Failed to start test run', err);
      alert('Failed to start test run.');
    } finally {
      setStartingRunId(null);
    }
  };

  // --------------------------------------------------
  // RENDER
  // --------------------------------------------------
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <PageHeader
        title="Test Runs History"
        description="View results of automated test executions."
      >
        <Link href={`/projects/${projectId}/blueprints`}>
          <Button variant="outline">
            <Play className="w-4 h-4 mr-2" />
            Start New Run
          </Button>
        </Link>
      </PageHeader>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-zinc-500" />
        </div>
      ) : runs.length === 0 ? (
        <Card className="border-dashed border-zinc-800 bg-zinc-900/30 p-12 text-center">
          <h3 className="text-xl font-medium text-white">
            No Test Runs Yet
          </h3>
          <p className="text-zinc-500 mt-2 mb-6">
            Generate a blueprint and run your first automated test.
          </p>
          <Link href={`/projects/${projectId}/blueprints`}>
            <Button>Go to Blueprints</Button>
          </Link>
        </Card>
      ) : (
        <div className="border border-zinc-800 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-zinc-900/50 border-b border-zinc-800 text-zinc-400">
              <tr>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Run ID</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Duration</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800 bg-black/20">
              {runs.map((run) => (
                <tr key={run.id} className="hover:bg-zinc-900/40">
                  <td className="px-6 py-4">
                    <TestRunStatus status={run.status} />
                  </td>

                  <td className="px-6 py-4 font-mono">
                    #{run.id.slice(0, 8)}
                  </td>

                  <td className="px-6 py-4 text-zinc-400">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-zinc-600" />
                      {new Date(run.created_at).toLocaleString()}
                    </div>
                  </td>

                  <td className="px-6 py-4 font-mono text-zinc-400">
                    {run.completed_at
                      ? `${(
                          (new Date(run.completed_at).getTime() -
                            new Date(run.created_at).getTime()) /
                          1000
                        ).toFixed(2)}s`
                      : '--'}
                  </td>

                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() =>
                          handleRunAgain(run.blueprint_id)
                        }
                        disabled={startingRunId === run.blueprint_id}
                        className="p-2 text-zinc-500 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg"
                      >
                        {startingRunId === run.blueprint_id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Play className="w-4 h-4" />
                        )}
                      </button>

                      <Link
                        href={`/projects/${projectId}/test-runs/${run.id}`}
                      >
                        <Button variant="ghost" size="sm">
                          Details
                          <ArrowRight className="w-3 h-3 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
