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

// 'use client';

// import { useEffect, useState } from 'react';
// import Link from 'next/link';
// import {
//   Plus,
//   FolderGit2,
//   PlayCircle,
//   ShieldAlert,
//   Activity,
//   ArrowRight,
//   MoreHorizontal,
//   Loader2
// } from 'lucide-react';

// import api from '@/lib/api';
// import StatCard from '@/components/dashboard/StatCard';
// import PageHeader from '@/components/layout/PageHeader';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

// // Define the shape of the data we expect from the backend
// interface Project {
//   id: string;
//   name: string;
//   created_at: string;
//   base_url?: string;
// }

// export default function DashboardPage() {
//   const [projects, setProjects] = useState<Project[]>([]);
//   const [isLoading, setIsLoading] = useState(true);

//   // 1. Fetch Real Data from Backend
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // This calls your Django/FastAPI backend
//         const res = await api.get('/projects/');
//         console.log("Dashboard fetched projects:", res.data); // Debug log
//         setProjects(res.data);
//       } catch (err) {
//         console.error("Failed to load dashboard data", err);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // 2. Calculate Real Stats
//   const activeProjects = projects.length; // Will be 3 based on your message
//   const totalRuns = 0; // Placeholder until we build Test Runs
  
//   if (isLoading) {
//     return (
//       <div className="flex h-[50vh] items-center justify-center text-zinc-500">
//         <Loader2 className="w-8 h-8 animate-spin mr-2" />
//         Loading Dashboard...
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-8 animate-in fade-in duration-500">

//       {/* Header */}
//       <PageHeader
//         title="Dashboard"
//         description={
//           <>
//             Welcome back. You have <span className="text-white font-medium">{activeProjects} active projects</span>.
//           </>
//         }
//       >
//         <Link href="/projects">
//           <Button className="bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20 transition-all hover:scale-105">
//             <Plus className="w-4 h-4 mr-2" />
//             New Project
//           </Button>
//         </Link>
//       </PageHeader>

//       {/* Stats Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         <StatCard
//           label="Active Projects"
//           value={activeProjects.toString()} 
//           icon={FolderGit2}
//           color="blue"
//         />
//         <StatCard
//           label="Total Test Runs"
//           value={totalRuns.toString()}
//           icon={PlayCircle}
//           color="purple"
//         />
//         <StatCard
//           label="Critical Bugs"
//           value="0"
//           icon={ShieldAlert}
//           color="red"
//         />
//         <StatCard
//           label="Avg. Coverage"
//           value="0%"
//           icon={Activity}
//           color="green"
//         />
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
//         {/* Left Column: Recent Projects List */}
//         <div className="lg:col-span-2 space-y-6">
//           <Card className="border-zinc-800 bg-zinc-900/30 backdrop-blur-sm">
//             <CardHeader className="flex flex-row items-center justify-between">
//               <div>
//                 <CardTitle>Recent Projects</CardTitle>
//                 <CardDescription>Your latest API integrations.</CardDescription>
//               </div>
//               <Link href="/projects">
//                 <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white">
//                   View All <ArrowRight className="w-4 h-4 ml-1" />
//                 </Button>
//               </Link>
//             </CardHeader>
//             <CardContent className="p-0">
//               <div className="divide-y divide-zinc-800/50">
//                 {projects.length === 0 ? (
//                   <div className="p-8 text-center text-zinc-500">
//                     No projects found.
//                   </div>
//                 ) : (
//                   // Map through the REAL projects
//                   projects.slice(0, 5).map((project) => (
//                     <Link key={project.id} href={`/projects/${project.id}`}>
//                       <div className="flex items-center justify-between p-4 hover:bg-zinc-800/30 transition-colors group cursor-pointer">
//                         <div className="flex items-center gap-4">
//                           <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-blue-400 group-hover:bg-blue-500/10 transition-colors">
//                             <FolderGit2 className="w-5 h-5" />
//                           </div>
//                           <div>
//                             <div className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors">
//                               {project.name}
//                             </div>
//                             <div className="flex items-center gap-2 text-xs text-zinc-500 mt-0.5">
//                               {project.base_url || 'No Base URL'}
//                             </div>
//                           </div>
//                         </div>
//                         <div className="flex items-center gap-4">
//                           <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-500 border border-green-500/20">
//                             Active
//                           </span>
//                           <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-500 hover:text-white">
//                             <MoreHorizontal className="w-4 h-4" />
//                           </Button>
//                         </div>
//                       </div>
//                     </Link>
//                   ))
//                 )}
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Right Column: Live Activity Placeholder */}
//         <div className="space-y-6">
//           <Card className="border-zinc-800 bg-zinc-900/30 backdrop-blur-sm h-full">
//             <CardHeader>
//               <CardTitle>Live Activity</CardTitle>
//               <CardDescription>Real-time execution logs.</CardDescription>
//             </CardHeader>
//             <CardContent>
//                <div className="text-sm text-zinc-500 text-center py-10">
//                  No active scans running.
//                </div>
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
import { motion } from 'framer-motion';
import {
  Plus,
  FolderGit2,
  PlayCircle,
  ShieldAlert,
  Activity,
  ArrowRight,
  MoreHorizontal,
  Loader2,
  Clock,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Zap,
  Globe,
  Calendar
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
  const activeProjects = projects.length;
  const totalRuns = 0; // Placeholder until we build Test Runs
  
  // Format relative time
  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    return date.toLocaleDateString();
  };

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-3 text-slate-400"
        >
          <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
          <span className="text-sm font-medium">Loading Dashboard...</span>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <PageHeader
          title="Dashboard"
          description={
            <>
              Welcome back. You have <span className="text-white font-semibold">{activeProjects} active {activeProjects === 1 ? 'project' : 'projects'}</span>.
            </>
          }
        >
          <Link href="/projects">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/30 transition-all">
                <Plus className="w-4 h-4 mr-2" />
                New Project
              </Button>
            </motion.div>
          </Link>
        </PageHeader>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            label: "Active Projects",
            value: activeProjects.toString(),
            icon: FolderGit2,
            color: "blue",
            trend: "+12%",
            delay: 0
          },
          {
            label: "Total Test Runs",
            value: totalRuns.toString(),
            icon: PlayCircle,
            color: "purple",
            trend: "0%",
            delay: 0.1
          },
          {
            label: "Critical Bugs",
            value: "0",
            icon: ShieldAlert,
            color: "red",
            trend: "-100%",
            delay: 0.2
          },
          {
            label: "Avg. Coverage",
            value: "0%",
            icon: Activity,
            color: "green",
            trend: "+0%",
            delay: 0.3
          }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: stat.delay }}
          >
            <StatCard
              label={stat.label}
              value={stat.value}
              icon={stat.icon}
              color={stat.color as any}
            />
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Recent Projects List */}
        <motion.div 
          className="lg:col-span-2 space-y-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-sm shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <div>
                <CardTitle className="text-lg font-bold text-white">Recent Projects</CardTitle>
                <CardDescription className="text-slate-500 mt-1">Your latest API integrations</CardDescription>
              </div>
              <Link href="/projects">
                <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all">
                  View All <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="p-0">
              {projects.length === 0 ? (
                <div className="p-12 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-800/50 flex items-center justify-center">
                    <FolderGit2 className="w-8 h-8 text-slate-600" />
                  </div>
                  <p className="text-slate-500 mb-4">No projects found</p>
                  <Link href="/projects">
                    <Button className="bg-blue-600 hover:bg-blue-500 text-white">
                      <Plus className="w-4 h-4 mr-2" />
                      Create Your First Project
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="divide-y divide-slate-800/50">
                  {projects.slice(0, 5).map((project, index) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
                    >
                      <Link href={`/projects/${project.id}`}>
                        <div className="flex items-center justify-between p-4 hover:bg-slate-800/30 transition-all group cursor-pointer">
                          <div className="flex items-center gap-4 flex-1 min-w-0">
                            <motion.div 
                              className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:border-blue-500/40 transition-all flex-shrink-0"
                              whileHover={{ scale: 1.05, rotate: 5 }}
                            >
                              <FolderGit2 className="w-5 h-5" />
                            </motion.div>
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors truncate">
                                {project.name}
                              </div>
                              <div className="flex items-center gap-3 mt-1">
                                {project.base_url && (
                                  <div className="flex items-center gap-1 text-xs text-slate-500">
                                    <Globe className="w-3 h-3" />
                                    <span className="truncate max-w-[200px]">{project.base_url}</span>
                                  </div>
                                )}
                                <div className="flex items-center gap-1 text-xs text-slate-500">
                                  <Calendar className="w-3 h-3" />
                                  <span>{formatRelativeTime(project.created_at)}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 flex-shrink-0">
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-500/10 text-green-400 border border-green-500/20">
                              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                              Active
                            </span>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 text-slate-500 hover:text-white hover:bg-slate-800"
                              onClick={(e) => {
                                e.preventDefault();
                                // Handle menu action
                              }}
                            >
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Right Column: Activity & Quick Stats */}
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {/* Live Activity Card */}
          <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-sm shadow-xl">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
                <div className="relative">
                  <Activity className="w-5 h-5 text-blue-400" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full animate-ping" />
                </div>
                Live Activity
              </CardTitle>
              <CardDescription className="text-slate-500">Real-time execution logs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Empty State */}
                <div className="text-center py-8">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-slate-800/50 flex items-center justify-center">
                    <Zap className="w-7 h-7 text-slate-600" />
                  </div>
                  <p className="text-sm text-slate-500 mb-2">No active scans running</p>
                  <p className="text-xs text-slate-600">Start a scan to see live activity</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats Card */}
          <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-sm shadow-xl">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-white">Quick Stats</CardTitle>
              <CardDescription className="text-slate-500">Last 30 days</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  label: "Tests Passed",
                  value: "0",
                  total: "0",
                  icon: CheckCircle2,
                  color: "text-green-400",
                  bgColor: "bg-green-500/10",
                  borderColor: "border-green-500/20"
                },
                {
                  label: "Tests Failed",
                  value: "0",
                  total: "0",
                  icon: AlertTriangle,
                  color: "text-red-400",
                  bgColor: "bg-red-500/10",
                  borderColor: "border-red-500/20"
                },
                {
                  label: "Avg. Duration",
                  value: "0s",
                  total: "",
                  icon: Clock,
                  color: "text-blue-400",
                  bgColor: "bg-blue-500/10",
                  borderColor: "border-blue-500/20"
                }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                  className={`flex items-center justify-between p-3 rounded-lg ${stat.bgColor} border ${stat.borderColor}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg ${stat.bgColor} border ${stat.borderColor} flex items-center justify-center`}>
                      <stat.icon className={`w-4 h-4 ${stat.color}`} />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">{stat.label}</p>
                      <p className={`text-sm font-bold ${stat.color}`}>
                        {stat.value} {stat.total && <span className="text-slate-600">/ {stat.total}</span>}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

      </div>

      {/* Bottom Section: Recent Activity Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-sm shadow-xl">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-white">Recent Activity</CardTitle>
            <CardDescription className="text-slate-500">Latest actions across all projects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-800/50 flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-slate-600" />
              </div>
              <p className="text-sm text-slate-500 mb-2">No recent activity</p>
              <p className="text-xs text-slate-600">Activity will appear here as you use ApiScan</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

    </div>
  );
}