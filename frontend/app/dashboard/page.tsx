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
  Calendar,
  Bot,
  Search,
  Bell,
  Settings,
  LogOut,
  User,
  LayoutGrid
} from 'lucide-react';

import api from '@/lib/api';
import StatCard from '@/components/dashboard/StatCard';
import PageHeader from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

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
        const res = await api.get('/projects/');
        console.log("Dashboard fetched projects:", res.data);
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
      <div className="min-h-screen bg-[#020617] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center gap-4 text-slate-400"
        >
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
          <span className="text-sm font-medium">Loading Dashboard...</span>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-sans selection:bg-blue-500/30">
      
      {/* --- NAVBAR --- */}
      <nav className="sticky top-0 z-50 border-b border-white/5 bg-[#020617]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2 group hover:opacity-80 transition-opacity">
              <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
                <Bot className="h-5 w-5 text-white" />
                <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-white/20" />
              </div>
              <span className="text-lg font-bold tracking-tight text-white hidden sm:block">
                ApiScan
              </span>
            </Link>
            <div className="h-6 w-px bg-slate-800 mx-2 hidden sm:block" />
            <span className="text-sm font-medium text-slate-400 hidden sm:block">Dashboard</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex relative w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
                <input 
                    type="text" 
                    placeholder="Search projects..." 
                    className="h-9 w-full bg-slate-900/50 border border-slate-800 rounded-full pl-9 pr-4 text-sm text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 placeholder:text-slate-600 transition-all"
                />
            </div>
            
            <button className="p-2 text-slate-400 hover:text-white transition-colors relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full border-2 border-[#020617]" />
            </button>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full ring-2 ring-slate-800 hover:ring-slate-700 transition-all">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder-user.jpg" alt="@user" />
                      <AvatarFallback className="bg-slate-800 text-slate-400">JD</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-[#0B1120] border-slate-800 text-slate-300" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none text-white">John Doe</p>
                      <p className="text-xs leading-none text-slate-500">john@example.com</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-slate-800" />
                  <DropdownMenuItem className="focus:bg-slate-800 focus:text-white cursor-pointer">
                    <User className="mr-2 h-4 w-4" /> Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem className="focus:bg-slate-800 focus:text-white cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" /> Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-slate-800" />
                  <DropdownMenuItem className="text-red-400 focus:bg-red-950/20 focus:text-red-300 cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" /> Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
          </div>
        </div>
      </nav>

      {/* --- MAIN CONTENT --- */}
      <main className="max-w-7xl mx-auto px-6 py-10 space-y-8">

        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-6"
        >
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Overview</h1>
            <p className="text-slate-400 mt-1">
              Welcome back. You have <span className="text-white font-medium">{activeProjects} active {activeProjects === 1 ? 'project' : 'projects'}</span>.
            </p>
          </div>
          <Link href="/projects">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button className="bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20 transition-all h-10 px-6 rounded-lg">
                <Plus className="w-4 h-4 mr-2" />
                New Project
              </Button>
            </motion.div>
          </Link>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              label: "Active Projects",
              value: activeProjects.toString(),
              icon: FolderGit2,
              color: "text-blue-400",
              bgColor: "bg-blue-500/10",
              borderColor: "border-blue-500/20",
              trend: "+12%",
              delay: 0
            },
            {
              label: "Total Test Runs",
              value: totalRuns.toString(),
              icon: PlayCircle,
              color: "text-purple-400",
              bgColor: "bg-purple-500/10",
              borderColor: "border-purple-500/20",
              trend: "0%",
              delay: 0.1
            },
            {
              label: "Critical Bugs",
              value: "0",
              icon: ShieldAlert,
              color: "text-red-400",
              bgColor: "bg-red-500/10",
              borderColor: "border-red-500/20",
              trend: "-100%",
              delay: 0.2
            },
            {
              label: "Avg. Coverage",
              value: "0%",
              icon: Activity,
              color: "text-emerald-400",
              bgColor: "bg-emerald-500/10",
              borderColor: "border-emerald-500/20",
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
              <Card className={`border ${stat.borderColor} bg-slate-900/30 backdrop-blur-sm`}>
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div className={`p-3 rounded-xl ${stat.bgColor} ${stat.borderColor} border`}>
                            <stat.icon className={`w-5 h-5 ${stat.color}`} />
                        </div>
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                            stat.trend.startsWith('+') 
                            ? 'bg-emerald-500/10 text-emerald-400' 
                            : stat.trend.startsWith('-') 
                            ? 'bg-red-500/10 text-red-400' 
                            : 'bg-slate-800 text-slate-400'
                        }`}>
                            {stat.trend}
                        </span>
                    </div>
                    <div className="mt-4">
                        <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
                        <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
                    </div>
                </CardContent>
              </Card>
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
            <Card className="border-slate-800 bg-slate-900/30 backdrop-blur-sm shadow-xl">
              <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-slate-800/50">
                <div className="flex items-center gap-2">
                  <LayoutGrid className="w-5 h-5 text-slate-500" />
                  <CardTitle className="text-lg font-bold text-white">Recent Projects</CardTitle>
                </div>
                <Link href="/projects">
                  <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white hover:bg-slate-800 transition-colors h-8">
                    View All <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                </Link>
              </CardHeader>
              <CardContent className="p-0">
                {projects.length === 0 ? (
                  <div className="p-12 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-800/50 border border-slate-800 flex items-center justify-center">
                      <FolderGit2 className="w-8 h-8 text-slate-600" />
                    </div>
                    <h3 className="text-white font-medium mb-1">No projects found</h3>
                    <p className="text-slate-500 text-sm mb-6 max-w-xs mx-auto">Get started by creating your first project to scan and secure your APIs.</p>
                    <Link href="/projects">
                      <Button className="bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20">
                        <Plus className="w-4 h-4 mr-2" />
                        Create Project
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
                        <Link href={`/projects/${project.id}`} className="block group">
                          <div className="flex items-center justify-between p-4 hover:bg-slate-800/30 transition-all cursor-pointer">
                            <div className="flex items-center gap-4 flex-1 min-w-0">
                              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 flex items-center justify-center text-blue-400 group-hover:border-blue-500/30 group-hover:text-blue-300 transition-all">
                                <FolderGit2 className="w-5 h-5" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors truncate">
                                  {project.name}
                                </div>
                                <div className="flex items-center gap-3 mt-1">
                                  {project.base_url && (
                                    <div className="flex items-center gap-1 text-xs text-slate-500 font-mono">
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
                            <div className="flex items-center gap-4">
                                <div className="hidden sm:flex items-center gap-2 px-2 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                    <span className="text-xs font-medium text-emerald-400">Active</span>
                                </div>
                                <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-slate-400 transition-colors" />
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
            <Card className="border-slate-800 bg-slate-900/30 backdrop-blur-sm shadow-xl">
              <CardHeader className="border-b border-slate-800/50 pb-4">
                <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
                  <Activity className="w-5 h-5 text-blue-400" />
                  Live Activity
                </CardTitle>
                <CardDescription className="text-slate-500">Real-time execution logs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-slate-800/50 flex items-center justify-center">
                    <Zap className="w-6 h-6 text-slate-600" />
                  </div>
                  <p className="text-sm text-slate-400 font-medium">No active scans</p>
                  <p className="text-xs text-slate-600 mt-1">Start a scan to monitor activity</p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats Card */}
            <Card className="border-slate-800 bg-slate-900/30 backdrop-blur-sm shadow-xl">
              <CardHeader className="border-b border-slate-800/50 pb-4">
                <CardTitle className="text-lg font-bold text-white">Monthly Stats</CardTitle>
                <CardDescription className="text-slate-500">Performance overview</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                {[
                  { label: "Tests Passed", value: "0", total: "0", icon: CheckCircle2, color: "text-emerald-400", bg: "bg-emerald-500/10" },
                  { label: "Tests Failed", value: "0", total: "0", icon: AlertTriangle, color: "text-red-400", bg: "bg-red-500/10" },
                  { label: "Avg. Duration", value: "0s", total: null, icon: Clock, color: "text-blue-400", bg: "bg-blue-500/10" }
                ].map((stat, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-slate-950/50 border border-slate-800 hover:border-slate-700 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg ${stat.bg} flex items-center justify-center`}>
                        <stat.icon className={`w-4 h-4 ${stat.color}`} />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 font-medium">{stat.label}</p>
                        <p className="text-sm font-bold text-slate-200">
                          {stat.value} {stat.total && <span className="text-slate-600">/ {stat.total}</span>}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

        </div>
      </main>
    </div>
  );
}

// --- Icons used locally ---
function ChevronRight(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m9 18 6-6-6-6" />
        </svg>
    )
}