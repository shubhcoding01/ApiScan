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

// 'use client';

// import { useState, useEffect, useCallback } from 'react';
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
//   Clock,
// } from 'lucide-react';

// import api from '@/lib/api';
// import { Project, TestRun, TestBlueprint } from '@/lib/types';
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

//   // --------------------------------------------------
//   // FETCH PROJECT + RECENT RUNS (backend-safe)
//   // --------------------------------------------------
//   const fetchData = useCallback(async () => {
//     try {
//       // 1. Fetch project
//       const projectRes = await api.get(`/projects/${projectId}`);
//       setProject(projectRes.data);

//       // 2. Fetch specs
//       const specsRes = await api.get(`/specs/${projectId}`);
//       const versions = specsRes.data;

//       if (!versions.length) {
//         setRecentRuns([]);
//         return;
//       }

//       // 3. Fetch blueprints for each version
//       const blueprintReqs = versions.map((v: any) =>
//         api.get(`/test-blueprints/api-version/${v.id}`)
//       );

//       const blueprintResults = await Promise.allSettled(blueprintReqs);

//       const blueprints: TestBlueprint[] = blueprintResults
//         .filter((r): r is PromiseFulfilledResult<any> => r.status === 'fulfilled')
//         .flatMap((r) => r.value.data);

//       if (!blueprints.length) {
//         setRecentRuns([]);
//         return;
//       }

//       // 4. Fetch runs for each blueprint
//       const runReqs = blueprints.map((bp) =>
//         api.get(`/test-runs/blueprint/${bp.id}`)
//       );

//       const runResults = await Promise.allSettled(runReqs);

//       const allRuns: TestRun[] = runResults
//         .filter((r): r is PromiseFulfilledResult<any> => r.status === 'fulfilled')
//         .flatMap((r) => r.value.data);

//       // 5. Sort newest → oldest, take last 5
//       allRuns.sort(
//         (a, b) =>
//           new Date(b.created_at).getTime() -
//           new Date(a.created_at).getTime()
//       );

//       setRecentRuns(allRuns.slice(0, 5));
//     } catch (err) {
//       console.error('Failed to load project overview', err);
//     } finally {
//       setLoading(false);
//     }
//   }, [projectId]);

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   // --------------------------------------------------
//   // STATES
//   // --------------------------------------------------
//   if (loading) {
//     return (
//       <div className="p-12 text-center text-zinc-500">
//         Loading project dashboard...
//       </div>
//     );
//   }

//   if (!project) {
//     return (
//       <div className="p-12 text-center text-red-500">
//         Project not found.
//       </div>
//     );
//   }

//   // --------------------------------------------------
//   // RENDER
//   // --------------------------------------------------
//   return (
//     <div className="space-y-8 animate-in fade-in duration-300">

//       {/* Header */}
//       <PageHeader
//         title={project.name}
//         description={
//           project.description ||
//           'Manage API specifications, secrets, and automated tests.'
//         }
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

//       {/* Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <StatCard
//           label="Recent Test Runs"
//           value={recentRuns.length.toString()}
//           icon={Activity}
//           color="blue"
//         />
//         <StatCard
//           label="Last Status"
//           value={recentRuns[0]?.status || 'N/A'}
//           icon={Shield}
//           color={
//             recentRuns[0]?.status === 'PASSED'
//               ? 'green'
//               : recentRuns[0]?.status === 'FAILED'
//               ? 'red'
//               : 'orange'
//           }
//           trend={
//             recentRuns[0]
//               ? new Date(recentRuns[0].created_at).toLocaleDateString()
//               : ''
//           }
//         />
//         <StatCard
//           label="API Versions"
//           value="Tracked"
//           icon={FileJson}
//           color="purple"
//         />
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

//         {/* Recent Runs */}
//         <div className="lg:col-span-2">
//           <Card className="border-zinc-800 bg-zinc-900/30">
//             <CardHeader className="flex flex-row items-center justify-between">
//               <CardTitle>Recent Test Runs</CardTitle>
//               <Link
//                 href={`/projects/${projectId}/test-runs`}
//                 className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1"
//               >
//                 View All <ArrowRight className="w-3 h-3" />
//               </Link>
//             </CardHeader>
//             <CardContent>
//               {recentRuns.length === 0 ? (
//                 <div className="text-center py-8 text-zinc-500 text-sm">
//                   No test runs yet.
//                 </div>
//               ) : (
//                 <div className="space-y-1">
//                   {recentRuns.map((run) => (
//                     <Link
//                       key={run.id}
//                       href={`/projects/${projectId}/test-runs/${run.id}`}
//                     >
//                       <div className="flex items-center justify-between p-3 rounded-lg hover:bg-zinc-800/50 transition-colors">
//                         <div className="flex items-center gap-4">
//                           <TestRunStatus status={run.status} />
//                           <div className="text-sm text-white">
//                             Run #{run.id.slice(0, 8)}
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

//         {/* Project Info */}
//         <div className="space-y-6">
//           <Card className="border-zinc-800 bg-zinc-900/30">
//             <CardHeader>
//               <CardTitle>Project Details</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div>
//                 <div className="text-xs text-zinc-500 uppercase mb-1">
//                   Base URL
//                 </div>
//                 <div className="flex items-center gap-2 text-sm text-zinc-300">
//                   <Globe className="w-4 h-4 text-zinc-600" />
//                   {project.base_url || (
//                     <span className="italic text-zinc-600">
//                       Not configured
//                     </span>
//                   )}
//                 </div>
//               </div>

//               <div>
//                 <div className="text-xs text-zinc-500 uppercase mb-1">
//                   Repository
//                 </div>
//                 <div className="flex items-center gap-2 text-sm text-zinc-300">
//                   <GitBranch className="w-4 h-4 text-zinc-600" />
//                   {project.github_repo_url || (
//                     <span className="italic text-zinc-600">
//                       Not connected
//                     </span>
//                   )}
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
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
  LayoutGrid,
  Bot,
  Search,
  Bell,
  LogOut,
  ChevronRight,
  Settings
} from 'lucide-react';

import api from '@/lib/api';
import { Project, TestRun, TestBlueprint } from '@/lib/types';
import PageHeader from '@/components/layout/PageHeader';
import StatCard from '@/components/dashboard/StatCard';
import TestRunStatus from '@/components/test-runs/TestRunStatus';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
export default function ProjectOverviewPage() {
  const params = useParams();
  const projectId = params.projectId as string;

  const [project, setProject] = useState<Project | null>(null);
  const [recentRuns, setRecentRuns] = useState<TestRun[]>([]);
  const [loading, setLoading] = useState(true);

  // --------------------------------------------------
  // FETCH PROJECT + RECENT RUNS
  // --------------------------------------------------
  const fetchData = useCallback(async () => {
    try {
      // 1. Fetch project
      const projectRes = await api.get(`/projects/${projectId}`);
      setProject(projectRes.data);

      // 2. Fetch specs -> versions
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
  // RENDER HELPERS
  // --------------------------------------------------
  
  if (loading) {
    return <ProjectSkeleton />;
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-red-500">
        Project not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-500/30">
      
      {/* --- 1. NAVIGATION BAR --- */}
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-black/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Left: Branding & Breadcrumbs */}
            <div className="flex items-center gap-2">
              <Link href="/projects" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600 text-white shadow-lg shadow-blue-900/20">
                  <Bot className="w-5 h-5" />
                </div>
                <span className="text-lg font-bold tracking-tight text-white hidden sm:block">
                  ApiScan
                </span>
              </Link>
              <ChevronRight className="w-4 h-4 text-zinc-600" />
              <span className="text-sm font-medium text-zinc-200">{project.name}</span>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-4">
               <div className="relative hidden md:block w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
                <Input 
                  placeholder="Search..." 
                  className="pl-9 bg-zinc-900/50 border-zinc-800 text-sm focus:bg-zinc-900 transition-colors h-9" 
                />
              </div>

              <button className="relative p-2 text-zinc-400 hover:text-white transition-colors">
                <Bell className="w-5 h-5" />
              </button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8 border border-white/10">
                      <AvatarImage src="/placeholder-user.jpg" alt="@user" />
                      <AvatarFallback className="bg-zinc-800 text-zinc-400">JD</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-zinc-950 border-zinc-800 text-zinc-300" align="end">
                  <DropdownMenuLabel className="font-normal text-white">John Doe</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-zinc-800" />
                  <DropdownMenuItem className="cursor-pointer hover:bg-zinc-900">Profile</DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer hover:bg-zinc-900 text-red-400">Log out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </nav>

      {/* --- 2. MAIN CONTENT --- */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-in fade-in duration-500">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="mb-0 border-none pb-0">
            <PageHeader
              title={project.name}
              description={project.description || 'Manage API specifications, secrets, and automated tests.'}
            />
          </div>
          
          <div className="flex gap-3">
            <Link href={`/projects/${projectId}/specs`}>
              <Button variant="outline" className="border-zinc-700 bg-zinc-900/50 hover:bg-zinc-800 hover:text-white transition-colors">
                <FileJson className="w-4 h-4 mr-2" />
                Upload Spec
              </Button>
            </Link>
            <Link href={`/projects/${projectId}/blueprints`}>
              <Button className="bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20 transition-all">
                <Play className="w-4 h-4 mr-2 fill-current" />
                Run Tests
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            label="Total Test Runs"
            value={recentRuns.length.toString()}
            icon={Activity}
            color="blue"
          />
          <StatCard
            label="Latest Status"
            value={recentRuns[0]?.status || 'No Runs'}
            icon={Shield}
            color={
              recentRuns[0]?.status === 'PASSED' ? 'green' : 
              recentRuns[0]?.status === 'FAILED' ? 'red' : 'orange'
            }
            trend={recentRuns[0] ? new Date(recentRuns[0].created_at).toLocaleDateString() : ''}
          />
          <StatCard
            label="API Health"
            value="98%" 
            icon={Activity}
            color="purple"
            trend="Reliability Score"
          />
        </div>

        {/* Content Split: Runs vs Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT: Recent Runs Table */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-zinc-800 bg-zinc-900/30 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between border-b border-zinc-800/50 pb-4">
                <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-zinc-500" />
                    Recent Activity
                </CardTitle>
                <Link
                  href={`/projects/${projectId}/test-runs`}
                  className="text-xs font-medium text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors"
                >
                  View All History <ArrowRight className="w-3 h-3" />
                </Link>
              </CardHeader>
              <CardContent className="pt-4">
                {recentRuns.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-zinc-500">
                     <LayoutGrid className="w-10 h-10 mb-3 opacity-20" />
                     <p>No test runs executed yet.</p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    {recentRuns.map((run) => (
                      <Link
                        key={run.id}
                        href={`/projects/${projectId}/test-runs/${run.id}`}
                        className="block group"
                      >
                        <div className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/5 transition-all">
                          <div className="flex items-center gap-4">
                            <TestRunStatus status={run.status} />
                            <div>
                                <div className="text-sm font-medium text-zinc-200 group-hover:text-blue-400 transition-colors">
                                    Run #{run.id.slice(0, 8)}
                                </div>
                                <div className="text-xs text-zinc-500">
                                    Manual Trigger • Main Branch
                                </div>
                            </div>
                          </div>
                          
                          <div className="text-right">
                             <div className="text-xs text-zinc-400 font-mono">
                                {new Date(run.created_at).toLocaleDateString()}
                             </div>
                             <div className="text-[10px] text-zinc-600 uppercase mt-0.5">
                                {new Date(run.created_at).toLocaleTimeString()}
                             </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* RIGHT: Project Metadata */}
          <div className="space-y-6">
            <Card className="border-zinc-800 bg-zinc-900/30 backdrop-blur-sm">
              <CardHeader className="border-b border-zinc-800/50 pb-4">
                <CardTitle className="flex items-center gap-2 text-base">
                    <Settings className="w-4 h-4 text-zinc-500" />
                    Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold mb-2">
                    Base URL
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded bg-black/40 border border-zinc-800/50 text-sm font-mono text-zinc-300 break-all">
                    <Globe className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                    {project.base_url || <span className="text-zinc-600 italic">Not configured</span>}
                  </div>
                </div>

                <div>
                  <div className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold mb-2">
                    Repository
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded bg-black/40 border border-zinc-800/50 text-sm text-zinc-300 break-all">
                    <GitBranch className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                    {project.github_repo_url || <span className="text-zinc-600 italic">Not connected</span>}
                  </div>
                </div>
                
                <div className="pt-2">
                    <Button variant="outline" className="w-full border-zinc-800 hover:bg-zinc-800 text-xs h-8">
                        Edit Settings
                    </Button>
                </div>
              </CardContent>
            </Card>
          </div>

        </div>
      </main>
    </div>
  );
}

// --- Loading Skeleton ---
function ProjectSkeleton() {
    return (
        <div className="min-h-screen bg-black text-white p-8">
            <div className="max-w-7xl mx-auto space-y-8 animate-pulse">
                <div className="flex justify-between">
                    <div className="space-y-2">
                        <div className="h-8 w-64 bg-zinc-800 rounded" />
                        <div className="h-4 w-96 bg-zinc-900 rounded" />
                    </div>
                    <div className="flex gap-2">
                        <div className="h-10 w-32 bg-zinc-800 rounded" />
                        <div className="h-10 w-32 bg-zinc-800 rounded" />
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-6">
                    <div className="h-32 bg-zinc-900 rounded-xl" />
                    <div className="h-32 bg-zinc-900 rounded-xl" />
                    <div className="h-32 bg-zinc-900 rounded-xl" />
                </div>
                <div className="grid grid-cols-3 gap-8">
                    <div className="col-span-2 h-96 bg-zinc-900 rounded-xl" />
                    <div className="h-96 bg-zinc-900 rounded-xl" />
                </div>
            </div>
        </div>
    );
}