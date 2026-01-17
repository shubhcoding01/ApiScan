// 'use client';

// import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import {
//   Plus,
//   FolderGit2,
//   PlayCircle,
//   ShieldAlert,
//   Activity,
//   ArrowRight,
//   Clock,
//   MoreHorizontal
// } from 'lucide-react';

// import api from '@/lib/api';
// import { getToken } from '@/lib/auth';
// import StatCard from '@/components/dashboard/StatCard';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

// export default function DashboardPage() {
//   const router = useRouter();

//   // Auth Guard
//   useEffect(() => {
//     const token = getToken();
//     if (!token) {
//       router.replace('/login');
//       return;
//     }
//     api.get('/auth/me').catch(() => router.replace('/login'));
//   }, [router]);

//   return (
//     <div className="space-y-8 animate-in fade-in duration-500">

//       {/* 1. Page Header */}
//       <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-zinc-800">
//         <div>
//           <h1 className="text-3xl font-bold text-white tracking-tight">Dashboard</h1>
//           <p className="text-zinc-400 mt-2 text-sm max-w-lg">
//             Welcome back. You have <span className="text-white font-medium">12 active projects</span> and your API security score is <span className="text-green-400 font-medium">Healthy</span>.
//           </p>
//         </div>
        
//         <Link href="/projects">
//           <Button className="bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20 transition-all hover:scale-105">
//             <Plus className="w-4 h-4 mr-2" />
//             New Project
//           </Button>
//         </Link>
//       </div>

//       {/* 2. Key Metrics Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         <StatCard
//           label="Active Projects"
//           value="12"
//           icon={FolderGit2}
//           trend="+2 this week"
//           trendDirection="up"
//           color="blue"
//         />
//         <StatCard
//           label="Total Test Runs"
//           value="1,240"
//           icon={PlayCircle}
//           trend="+15% vs last month"
//           trendDirection="up"
//           color="purple"
//         />
//         <StatCard
//           label="Critical Bugs"
//           value="3"
//           icon={ShieldAlert}
//           trend="Requires Attention"
//           trendDirection="down"
//           color="red"
//         />
//         <StatCard
//           label="Avg. Coverage"
//           value="84%"
//           icon={Activity}
//           trend="+5% improvement"
//           trendDirection="up"
//           color="green"
//         />
//       </div>

//       {/* 3. Main Content Split */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

//         {/* Left Column: Recent Projects (Span 2) */}
//         <div className="lg:col-span-2 space-y-6">
//           <Card className="border-zinc-800 bg-zinc-900/30 backdrop-blur-sm">
//             <CardHeader className="flex flex-row items-center justify-between">
//               <div>
//                 <CardTitle>Recent Projects</CardTitle>
//                 <CardDescription>Your latest API integrations and scans.</CardDescription>
//               </div>
//               <Link href="/projects">
//                 <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white">
//                   View All <ArrowRight className="w-4 h-4 ml-1" />
//                 </Button>
//               </Link>
//             </CardHeader>
//             <CardContent className="p-0">
//               <div className="divide-y divide-zinc-800/50">
//                 {[1, 2, 3, 4].map((i) => (
//                   <div 
//                     key={i} 
//                     className="flex items-center justify-between p-4 hover:bg-zinc-800/30 transition-colors group cursor-pointer"
//                   >
//                     <div className="flex items-center gap-4">
//                       {/* Icon Box */}
//                       <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-blue-400 group-hover:bg-blue-500/10 transition-colors">
//                         <FolderGit2 className="w-5 h-5" />
//                       </div>
                      
//                       {/* Text Info */}
//                       <div>
//                         <div className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors">
//                           Payment Gateway API v{i}
//                         </div>
//                         <div className="flex items-center gap-2 text-xs text-zinc-500 mt-0.5">
//                           <span>Updated 2 hours ago</span>
//                           <span>•</span>
//                           <span>git-repo/payment-service</span>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Status Badge */}
//                     <div className="flex items-center gap-4">
//                       <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-500 border border-green-500/20">
//                         Active
//                       </span>
//                       <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-500 hover:text-white">
//                         <MoreHorizontal className="w-4 h-4" />
//                       </Button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Right Column: Recent Activity / Test Runs (Span 1) */}
//         <div className="space-y-6">
//           <Card className="border-zinc-800 bg-zinc-900/30 backdrop-blur-sm h-full">
//             <CardHeader>
//               <CardTitle>Live Activity</CardTitle>
//               <CardDescription>Real-time execution logs.</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="relative border-l border-zinc-800 ml-2 space-y-6">
                
//                 {[1, 2, 3, 4, 5].map((i) => (
//                   <div key={i} className="ml-6 relative">
//                     {/* Timeline Dot */}
//                     <div className={`absolute -left-[29px] top-1 w-3 h-3 rounded-full border-2 border-zinc-950 ${
//                       i === 1 ? 'bg-blue-500 animate-pulse' : 
//                       i === 2 ? 'bg-red-500' : 
//                       'bg-zinc-700'
//                     }`} />
                    
//                     <div className="flex flex-col gap-1">
//                       <span className="text-sm font-medium text-zinc-200">
//                         {i === 1 ? 'Running Security Scan...' : 
//                          i === 2 ? 'SQL Injection Detected' : 
//                          'Scan Completed Successfully'}
//                       </span>
//                       <span className="text-xs text-zinc-500 flex items-center gap-1">
//                         <Clock className="w-3 h-3" />
//                         {i * 10}m ago • Project Alpha
//                       </span>
//                     </div>
//                   </div>
//                 ))}

//               </div>
              
//               <div className="mt-8 pt-4 border-t border-zinc-800">
//                 <Link href="/projects">
//                   <Button variant="outline" className="w-full text-zinc-400 hover:text-white border-zinc-700 hover:bg-zinc-800">
//                     View Full Logs
//                   </Button>
//                 </Link>
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//       </div>
//     </div>
//   );
// }

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Plus,
  FolderGit2,
  PlayCircle,
  ShieldAlert,
  Activity,
  ArrowRight,
  MoreHorizontal,
  Loader2
} from 'lucide-react';

import api from '@/lib/api';
import StatCard from '@/components/dashboard/StatCard';
import PageHeader from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

// Define the shape of the data we expect from the backend
interface Project {
  id: string;
  name: string;
  created_at: string;
  base_url?: string;
}

export default function DashboardPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 1. Fetch Real Data from Backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        // This calls your Django/FastAPI backend
        const res = await api.get('/projects/');
        console.log("Dashboard fetched projects:", res.data); // Debug log
        setProjects(res.data);
      } catch (err) {
        console.error("Failed to load dashboard data", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // 2. Calculate Real Stats
  const activeProjects = projects.length; // Will be 3 based on your message
  const totalRuns = 0; // Placeholder until we build Test Runs
  
  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center text-zinc-500">
        <Loader2 className="w-8 h-8 animate-spin mr-2" />
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">

      {/* Header */}
      <PageHeader
        title="Dashboard"
        description={
          <>
            Welcome back. You have <span className="text-white font-medium">{activeProjects} active projects</span>.
          </>
        }
      >
        <Link href="/projects">
          <Button className="bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20 transition-all hover:scale-105">
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </Button>
        </Link>
      </PageHeader>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          label="Active Projects"
          value={activeProjects.toString()} 
          icon={FolderGit2}
          color="blue"
        />
        <StatCard
          label="Total Test Runs"
          value={totalRuns.toString()}
          icon={PlayCircle}
          color="purple"
        />
        <StatCard
          label="Critical Bugs"
          value="0"
          icon={ShieldAlert}
          color="red"
        />
        <StatCard
          label="Avg. Coverage"
          value="0%"
          icon={Activity}
          color="green"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Recent Projects List */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-zinc-800 bg-zinc-900/30 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Projects</CardTitle>
                <CardDescription>Your latest API integrations.</CardDescription>
              </div>
              <Link href="/projects">
                <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white">
                  View All <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-zinc-800/50">
                {projects.length === 0 ? (
                  <div className="p-8 text-center text-zinc-500">
                    No projects found.
                  </div>
                ) : (
                  // Map through the REAL projects
                  projects.slice(0, 5).map((project) => (
                    <Link key={project.id} href={`/projects/${project.id}`}>
                      <div className="flex items-center justify-between p-4 hover:bg-zinc-800/30 transition-colors group cursor-pointer">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-blue-400 group-hover:bg-blue-500/10 transition-colors">
                            <FolderGit2 className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors">
                              {project.name}
                            </div>
                            <div className="flex items-center gap-2 text-xs text-zinc-500 mt-0.5">
                              {project.base_url || 'No Base URL'}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-500 border border-green-500/20">
                            Active
                          </span>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-500 hover:text-white">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Live Activity Placeholder */}
        <div className="space-y-6">
          <Card className="border-zinc-800 bg-zinc-900/30 backdrop-blur-sm h-full">
            <CardHeader>
              <CardTitle>Live Activity</CardTitle>
              <CardDescription>Real-time execution logs.</CardDescription>
            </CardHeader>
            <CardContent>
               <div className="text-sm text-zinc-500 text-center py-10">
                 No active scans running.
               </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}