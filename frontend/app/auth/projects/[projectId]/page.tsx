// 'use client';

// import { useState, useEffect } from 'react';
// import { useParams } from 'next/navigation';
// import Link from 'next/link';
// import { 
//   Activity, 
//   FileJson, 
//   Shield, 
//   Play, 
//   GitBranch, 
//   Globe, 
//   ArrowRight,
//   Clock
// } from 'lucide-react';

// import api from '@/lib/api';
// import { Project, TestRun } from '@/lib/types';
// import PageHeader from '@/components/layout/PageHeader';
// import StatCard from '@/components/dashboard/StatCard';
// import TestRunStatus from '@/components/test-runs/TestRunStatus';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// export default function ProjectOverviewPage() {
//   const params = useParams();
//   const projectId = params.projectId as string;

//   const [project, setProject] = useState<Project | null>(null);
//   const [recentRuns, setRecentRuns] = useState<TestRun[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Parallel Fetch: Project Details + Recent Runs
//         const [projRes, runsRes] = await Promise.all([
//           api.get(`/projects/${projectId}`),
//           api.get(`/test-runs/project/${projectId}`) // Assuming this endpoint exists, or mock it
//         ]);

//         setProject(projRes.data);
//         // Take only the last 5 runs
//         setRecentRuns(runsRes.data.slice(0, 5));
//       } catch (err) {
//         console.error("Failed to load project data", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [projectId]);

//   if (loading) {
//     return <div className="p-12 text-center text-zinc-500">Loading project dashboard...</div>;
//   }

//   if (!project) {
//     return <div className="p-12 text-center text-red-500">Project not found.</div>;
//   }

//   return (
//     <div className="space-y-8 animate-in fade-in duration-300">
      
//       {/* 1. Header with Quick Actions */}
//       <PageHeader 
//         title={project.name} 
//         description={project.description || "Manage API specifications, secrets, and automated tests."}
//       >
//         <div className="flex gap-2">
//           <Link href={`/projects/${projectId}/specs`}>
//             <Button variant="outline">
//               <FileJson className="w-4 h-4 mr-2" />
//               Upload Spec
//             </Button>
//           </Link>
//           <Link href={`/projects/${projectId}/blueprints`}>
//             <Button>
//               <Play className="w-4 h-4 mr-2" />
//               Run Tests
//             </Button>
//           </Link>
//         </div>
//       </PageHeader>

//       {/* 2. Stats Overview */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <StatCard 
//           label="Total Test Runs"
//           value={recentRuns.length.toString()}
//           icon={Activity}
//           color="blue"
//         />
//         <StatCard 
//           label="Last Status"
//           value={recentRuns[0]?.status || "N/A"}
//           icon={Shield}
//           color={recentRuns[0]?.status === 'PASSED' ? 'green' : recentRuns[0]?.status === 'FAILED' ? 'red' : 'orange'}
//           trend={recentRuns[0] ? new Date(recentRuns[0].created_at).toLocaleDateString() : ""}
//         />
//         <StatCard 
//           label="API Version"
//           value="v1.0" // You could fetch this dynamically from specs
//           icon={FileJson}
//           color="purple"
//         />
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
//         {/* 3. Left Column: Details & Configuration */}
//         <div className="space-y-6 lg:col-span-2">
          
//           {/* Recent Activity Card */}
//           <Card className="border-zinc-800 bg-zinc-900/30">
//             <CardHeader className="flex flex-row items-center justify-between">
//               <CardTitle>Recent Test Runs</CardTitle>
//               <Link href={`/projects/${projectId}/test-runs`} className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1">
//                 View All <ArrowRight className="w-3 h-3" />
//               </Link>
//             </CardHeader>
//             <CardContent>
//               {recentRuns.length === 0 ? (
//                 <div className="text-center py-8 text-zinc-500 text-sm">
//                   No tests executed yet. 
//                   <br />
//                   <Link href={`/projects/${projectId}/blueprints`} className="text-blue-500 hover:underline">
//                     Create a blueprint
//                   </Link> to start.
//                 </div>
//               ) : (
//                 <div className="space-y-1">
//                   {recentRuns.map((run) => (
//                     <Link key={run.id} href={`/projects/${projectId}/test-runs/${run.id}`}>
//                       <div className="flex items-center justify-between p-3 rounded-lg hover:bg-zinc-800/50 transition-colors group">
//                         <div className="flex items-center gap-4">
//                           <TestRunStatus status={run.status} />
//                           <div>
//                             <div className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors">
//                               Run #{run.id.slice(0, 8)}
//                             </div>
//                           </div>
//                         </div>
//                         <div className="flex items-center gap-2 text-xs text-zinc-500">
//                           <Clock className="w-3 h-3" />
//                           {new Date(run.created_at).toLocaleDateString()}
//                         </div>
//                       </div>
//                     </Link>
//                   ))}
//                 </div>
//               )}
//             </CardContent>
//           </Card>

//         </div>

//         {/* 4. Right Column: Project Info */}
//         <div className="space-y-6">
//           <Card className="border-zinc-800 bg-zinc-900/30">
//             <CardHeader>
//               <CardTitle>Project Details</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
              
//               {/* URL */}
//               <div>
//                 <div className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Base URL</div>
//                 <div className="flex items-center gap-2 text-sm text-zinc-300">
//                   <Globe className="w-4 h-4 text-zinc-600" />
//                   {project.base_url ? (
//                     <a href={project.base_url} target="_blank" rel="noreferrer" className="hover:text-blue-400 hover:underline truncate">
//                       {project.base_url}
//                     </a>
//                   ) : (
//                     <span className="text-zinc-600 italic">Not configured</span>
//                   )}
//                 </div>
//               </div>

//               {/* Repo */}
//               <div>
//                 <div className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Repository</div>
//                 <div className="flex items-center gap-2 text-sm text-zinc-300">
//                   <GitBranch className="w-4 h-4 text-zinc-600" />
//                   {project.github_repo_url ? (
//                     <a href={project.github_repo_url} target="_blank" rel="noreferrer" className="hover:text-blue-400 hover:underline truncate">
//                       {project.github_repo_url}
//                     </a>
//                   ) : (
//                     <span className="text-zinc-600 italic">Not connected</span>
//                   )}
//                 </div>
//               </div>

//               {/* ID */}
//               <div className="pt-4 border-t border-zinc-800/50">
//                 <div className="text-xs text-zinc-600">Project ID</div>
//                 <div className="text-xs font-mono text-zinc-500">{project.id}</div>
//               </div>

//             </CardContent>
//           </Card>

//           {/* Quick Links */}
//           <div className="grid grid-cols-2 gap-3">
//             <Link href={`/projects/${projectId}/secrets`}>
//               <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-zinc-600 transition-colors text-center cursor-pointer">
//                 <Shield className="w-6 h-6 text-purple-500 mx-auto mb-2" />
//                 <div className="text-sm font-medium text-zinc-300">Secrets</div>
//               </div>
//             </Link>
//             <Link href={`/projects/${projectId}/settings`}>
//               <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-zinc-600 transition-colors text-center cursor-pointer">
//                 <Activity className="w-6 h-6 text-orange-500 mx-auto mb-2" />
//                 <div className="text-sm font-medium text-zinc-300">Settings</div>
//               </div>
//             </Link>
//           </div>

//         </div>

//       </div>
//     </div>
//   );
// }

'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  Activity,
  FileJson,
  Shield,
  Play,
  GitBranch,
  Globe,
  ArrowRight,
  Clock,
} from 'lucide-react';

import api from '@/lib/api';
import { Project, TestRun, TestBlueprint } from '@/lib/types';
import PageHeader from '@/components/layout/PageHeader';
import StatCard from '@/components/dashboard/StatCard';
import TestRunStatus from '@/components/test-runs/TestRunStatus';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ProjectOverviewPage() {
  const params = useParams();
  const projectId = params.projectId as string;

  const [project, setProject] = useState<Project | null>(null);
  const [recentRuns, setRecentRuns] = useState<TestRun[]>([]);
  const [loading, setLoading] = useState(true);

  // --------------------------------------------------
  // FETCH PROJECT + RECENT RUNS (backend-safe)
  // --------------------------------------------------
  const fetchData = useCallback(async () => {
    try {
      // 1. Fetch project
      const projectRes = await api.get(`/projects/${projectId}`);
      setProject(projectRes.data);

      // 2. Fetch specs
      const specsRes = await api.get(`/specs/${projectId}`);
      const versions = specsRes.data;

      if (!versions.length) {
        setRecentRuns([]);
        return;
      }

      // 3. Fetch blueprints for each version
      const blueprintReqs = versions.map((v: any) =>
        api.get(`/test-blueprints/api-version/${v.id}`)
      );

      const blueprintResults = await Promise.allSettled(blueprintReqs);

      const blueprints: TestBlueprint[] = blueprintResults
        .filter((r): r is PromiseFulfilledResult<any> => r.status === 'fulfilled')
        .flatMap((r) => r.value.data);

      if (!blueprints.length) {
        setRecentRuns([]);
        return;
      }

      // 4. Fetch runs for each blueprint
      const runReqs = blueprints.map((bp) =>
        api.get(`/test-runs/blueprint/${bp.id}`)
      );

      const runResults = await Promise.allSettled(runReqs);

      const allRuns: TestRun[] = runResults
        .filter((r): r is PromiseFulfilledResult<any> => r.status === 'fulfilled')
        .flatMap((r) => r.value.data);

      // 5. Sort newest → oldest, take last 5
      allRuns.sort(
        (a, b) =>
          new Date(b.created_at).getTime() -
          new Date(a.created_at).getTime()
      );

      setRecentRuns(allRuns.slice(0, 5));
    } catch (err) {
      console.error('Failed to load project overview', err);
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // --------------------------------------------------
  // STATES
  // --------------------------------------------------
  if (loading) {
    return (
      <div className="p-12 text-center text-zinc-500">
        Loading project dashboard...
      </div>
    );
  }

  if (!project) {
    return (
      <div className="p-12 text-center text-red-500">
        Project not found.
      </div>
    );
  }

  // --------------------------------------------------
  // RENDER
  // --------------------------------------------------
  return (
    <div className="space-y-8 animate-in fade-in duration-300">

      {/* Header */}
      <PageHeader
        title={project.name}
        description={
          project.description ||
          'Manage API specifications, secrets, and automated tests.'
        }
      >
        <div className="flex gap-2">
          <Link href={`/projects/${projectId}/specs`}>
            <Button variant="outline">
              <FileJson className="w-4 h-4 mr-2" />
              Upload Spec
            </Button>
          </Link>
          <Link href={`/projects/${projectId}/blueprints`}>
            <Button>
              <Play className="w-4 h-4 mr-2" />
              Run Tests
            </Button>
          </Link>
        </div>
      </PageHeader>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          label="Recent Test Runs"
          value={recentRuns.length.toString()}
          icon={Activity}
          color="blue"
        />
        <StatCard
          label="Last Status"
          value={recentRuns[0]?.status || 'N/A'}
          icon={Shield}
          color={
            recentRuns[0]?.status === 'PASSED'
              ? 'green'
              : recentRuns[0]?.status === 'FAILED'
              ? 'red'
              : 'orange'
          }
          trend={
            recentRuns[0]
              ? new Date(recentRuns[0].created_at).toLocaleDateString()
              : ''
          }
        />
        <StatCard
          label="API Versions"
          value="Tracked"
          icon={FileJson}
          color="purple"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Recent Runs */}
        <div className="lg:col-span-2">
          <Card className="border-zinc-800 bg-zinc-900/30">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Test Runs</CardTitle>
              <Link
                href={`/projects/${projectId}/test-runs`}
                className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1"
              >
                View All <ArrowRight className="w-3 h-3" />
              </Link>
            </CardHeader>
            <CardContent>
              {recentRuns.length === 0 ? (
                <div className="text-center py-8 text-zinc-500 text-sm">
                  No test runs yet.
                </div>
              ) : (
                <div className="space-y-1">
                  {recentRuns.map((run) => (
                    <Link
                      key={run.id}
                      href={`/projects/${projectId}/test-runs/${run.id}`}
                    >
                      <div className="flex items-center justify-between p-3 rounded-lg hover:bg-zinc-800/50 transition-colors">
                        <div className="flex items-center gap-4">
                          <TestRunStatus status={run.status} />
                          <div className="text-sm text-white">
                            Run #{run.id.slice(0, 8)}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-zinc-500">
                          <Clock className="w-3 h-3" />
                          {new Date(run.created_at).toLocaleDateString()}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Project Info */}
        <div className="space-y-6">
          <Card className="border-zinc-800 bg-zinc-900/30">
            <CardHeader>
              <CardTitle>Project Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-xs text-zinc-500 uppercase mb-1">
                  Base URL
                </div>
                <div className="flex items-center gap-2 text-sm text-zinc-300">
                  <Globe className="w-4 h-4 text-zinc-600" />
                  {project.base_url || (
                    <span className="italic text-zinc-600">
                      Not configured
                    </span>
                  )}
                </div>
              </div>

              <div>
                <div className="text-xs text-zinc-500 uppercase mb-1">
                  Repository
                </div>
                <div className="flex items-center gap-2 text-sm text-zinc-300">
                  <GitBranch className="w-4 h-4 text-zinc-600" />
                  {project.github_repo_url || (
                    <span className="italic text-zinc-600">
                      Not connected
                    </span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}
