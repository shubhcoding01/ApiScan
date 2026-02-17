// 'use client';

// import Link from 'next/link';
// import { 
//   FolderGit2, 
//   Github, 
//   Globe, 
//   MoreVertical, 
//   Clock 
// } from 'lucide-react';
// import { Project } from '@/lib/types'; // Matches your shared interface

// interface ProjectCardProps {
//   project: Project;
// }

// export default function ProjectCard({ project }: ProjectCardProps) {
  
//   // Format Date (e.g., "Jan 12, 2026")
//   const formattedDate = new Date(project.created_at).toLocaleDateString('en-US', {
//     month: 'short',
//     day: 'numeric',
//     year: 'numeric'
//   });

//   return (
//     <div className="group relative bg-zinc-900 border border-zinc-800 rounded-xl hover:border-zinc-700 hover:shadow-xl transition-all duration-200 overflow-hidden flex flex-col h-full">
      
//       {/* 1. Header Section */}
//       <div className="p-6 pb-4 flex items-start justify-between">
//         <div className="flex items-center gap-4">
//           {/* Icon Box */}
//           <div className="w-12 h-12 bg-zinc-800 rounded-lg flex items-center justify-center text-zinc-400 group-hover:bg-blue-600/10 group-hover:text-blue-500 transition-colors">
//             <FolderGit2 className="w-6 h-6" />
//           </div>
          
//           {/* Title & Status */}
//           <div>
//             <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
//               <Link href={`/projects/${project.id}`} className="focus:outline-none">
//                 {/* Clicking title opens details */}
//                 <span className="absolute inset-0" aria-hidden="true" />
//                 {project.name}
//               </Link>
//             </h3>
//             <div className="flex items-center gap-2 mt-1">
//               <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
//               <span className="text-xs text-zinc-500 font-medium">Active</span>
//             </div>
//           </div>
//         </div>

//         {/* Options Menu (Visual only for now) */}
//         <button className="z-10 p-2 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors">
//           <MoreVertical className="w-5 h-5" />
//         </button>
//       </div>

//       {/* 2. Description (Truncated) */}
//       <div className="px-6 flex-1">
//         <p className="text-sm text-zinc-400 line-clamp-2">
//           {project.description || "No description provided for this project."}
//         </p>
//       </div>

//       {/* 3. Footer Stats / Links */}
//       <div className="mt-6 px-6 py-4 border-t border-zinc-800/50 bg-zinc-900/50 flex items-center justify-between">
        
//         {/* Quick Links (Z-Index ensures they are clickable above the card link) */}
//         <div className="flex items-center gap-3 z-10">
//           {project.github_repo_url && (
//             <a 
//               href={project.github_repo_url}
//               target="_blank"
//               rel="noopener noreferrer" 
//               className="text-zinc-500 hover:text-white transition-colors"
//               title="View on GitHub"
//             >
//               <Github className="w-4 h-4" />
//             </a>
//           )}
//           {project.base_url && (
//             <a 
//               href={project.base_url} 
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-zinc-500 hover:text-white transition-colors"
//               title="View API"
//             >
//               <Globe className="w-4 h-4" />
//             </a>
//           )}
//         </div>

//         {/* Timestamp */}
//         <div className="flex items-center gap-1.5 text-xs text-zinc-600">
//           <Clock className="w-3.5 h-3.5" />
//           <span>{formattedDate}</span>
//         </div>
//       </div>

//     </div>
//   );
// }

// 'use client';

// import Link from 'next/link';
// import {
//   FolderGit2,
//   Github,
//   Globe,
//   MoreVertical,
//   Clock,
// } from 'lucide-react';
// import { Project } from '@/lib/types';

// interface ProjectCardProps {
//   project: Project;
// }

// export default function ProjectCard({ project }: ProjectCardProps) {
//   const formattedDate = new Date(project.created_at).toLocaleDateString(
//     'en-US',
//     {
//       month: 'short',
//       day: 'numeric',
//       year: 'numeric',
//     }
//   );

//   return (
//     <div className="group relative flex flex-col h-full rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:shadow-xl transition-all">

//       {/* Clickable overlay for entire card */}
//       <Link
//         href={`/projects/${project.id}`}
//         aria-label={`Open project ${project.name}`}
//         className="absolute inset-0 z-0"
//       />

//       {/* Header */}
//       <div className="relative z-10 p-6 pb-4 flex items-start justify-between">
//         <div className="flex items-center gap-4">
//           <div className="w-12 h-12 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-400 group-hover:bg-blue-600/10 group-hover:text-blue-500 transition-colors">
//             <FolderGit2 className="w-6 h-6" />
//           </div>

//           <div>
//             <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
//               {project.name}
//             </h3>

//             {/* Status (future-ready) */}
//             <div className="flex items-center gap-2 mt-1">
//               <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
//               <span className="text-xs text-zinc-500 font-medium">
//                 Active
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Options menu (UI only for now) */}
//         <button
//           aria-label="Project options"
//           className="p-2 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
//         >
//           <MoreVertical className="w-5 h-5" />
//         </button>
//       </div>

//       {/* Description */}
//       <div className="relative z-10 px-6 flex-1">
//         <p className="text-sm text-zinc-400 line-clamp-2">
//           {project.description || 'No description provided for this project.'}
//         </p>
//       </div>

//       {/* Footer */}
//       <div className="relative z-10 mt-6 px-6 py-4 border-t border-zinc-800/50 bg-zinc-900/50 flex items-center justify-between">

//         {/* External Links */}
//         <div className="flex items-center gap-3">
//           {project.github_repo_url && (
//             <a
//               href={project.github_repo_url}
//               target="_blank"
//               rel="noopener noreferrer"
//               onClick={(e) => e.stopPropagation()}
//               title="View on GitHub"
//               className="text-zinc-500 hover:text-white transition-colors"
//             >
//               <Github className="w-4 h-4" />
//             </a>
//           )}

//           {project.base_url && (
//             <a
//               href={project.base_url}
//               target="_blank"
//               rel="noopener noreferrer"
//               onClick={(e) => e.stopPropagation()}
//               title="Open API"
//               className="text-zinc-500 hover:text-white transition-colors"
//             >
//               <Globe className="w-4 h-4" />
//             </a>
//           )}
//         </div>

//         {/* Created At */}
//         <div className="flex items-center gap-1.5 text-xs text-zinc-600">
//           <Clock className="w-3.5 h-3.5" />
//           {formattedDate}
//         </div>
//       </div>
//     </div>
//   );
// }


'use client';

import { 
  FolderGit2, 
  MoreHorizontal, 
  Globe, 
  Clock, 
  Activity, 
  ArrowRight, 
  ShieldCheck 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

interface ProjectCardProps {
  project: {
    id: string;
    name: string;
    description?: string;
    base_url?: string;
    created_at: string;
  };
}

export default function ProjectCard({ project }: ProjectCardProps) {
  
  // Format date helper
  const formattedDate = new Date(project.created_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="group relative flex flex-col h-full rounded-2xl border border-slate-800 bg-[#0B1120] p-5 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-900/10 transition-all duration-300">
      
      {/* Hover Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />

      {/* --- TOP ROW: Icon + Title + Menu --- */}
      <div className="relative z-10 flex items-start justify-between mb-4">
        <div className="flex items-center gap-3 overflow-hidden">
          {/* Project Icon */}
          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 flex items-center justify-center text-blue-400 group-hover:text-blue-300 group-hover:border-blue-500/30 transition-colors">
            <FolderGit2 className="w-5 h-5" />
          </div>
          
          {/* Title & Status */}
          <div className="min-w-0">
            <h3 className="font-semibold text-slate-100 truncate group-hover:text-white transition-colors">
              {project.name}
            </h3>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                </span>
                Active
              </span>
            </div>
          </div>
        </div>

        {/* Menu (Stop propagation to prevent card click when clicking menu) */}
        <div onClick={(e) => e.preventDefault()}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0 text-slate-500 hover:text-white hover:bg-slate-800">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40 bg-[#0F172A] border-slate-800 text-slate-300">
              <DropdownMenuItem className="cursor-pointer hover:bg-slate-800 focus:bg-slate-800">Edit Project</DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer hover:bg-slate-800 focus:bg-slate-800">Scan Settings</DropdownMenuItem>
              <DropdownMenuItem className="text-red-400 cursor-pointer hover:bg-red-950/30 focus:bg-red-950/30 focus:text-red-300">
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* --- MIDDLE: Stats Grid (Mini Dashboard) --- */}
      <div className="relative z-10 grid grid-cols-2 gap-2 mb-4">
        <div className="p-2.5 rounded-lg bg-slate-900/50 border border-slate-800/50">
            <div className="text-xs text-slate-500 flex items-center gap-1.5 mb-1">
                <ShieldCheck className="w-3 h-3 text-blue-400" /> Health
            </div>
            <div className="text-sm font-bold text-slate-200">98%</div>
        </div>
        <div className="p-2.5 rounded-lg bg-slate-900/50 border border-slate-800/50">
            <div className="text-xs text-slate-500 flex items-center gap-1.5 mb-1">
                <Activity className="w-3 h-3 text-purple-400" /> Scans
            </div>
            <div className="text-sm font-bold text-slate-200">24</div>
        </div>
      </div>

      {/* --- BOTTOM: Metadata --- */}
      <div className="relative z-10 mt-auto pt-4 border-t border-slate-800/50 flex flex-col gap-2">
        
        {/* Base URL */}
        <div className="flex items-center gap-2 text-xs text-slate-400 font-mono bg-black/20 p-1.5 rounded border border-white/5 truncate">
          <Globe className="w-3 h-3 text-slate-600 flex-shrink-0" />
          <span className="truncate">{project.base_url || 'https://api.example.com'}</span>
        </div>

        {/* Footer Meta */}
        <div className="flex items-center justify-between mt-1">
          <div className="flex items-center gap-1 text-xs text-slate-500">
            <Clock className="w-3 h-3" />
            <span>Updated {formattedDate}</span>
          </div>
          
          <div className="text-xs font-medium text-blue-400 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0 duration-300">
            Open Project <ArrowRight className="w-3 h-3" />
          </div>
        </div>
      </div>

    </div>
  );
}