'use client';

import Link from 'next/link';
import { 
  FolderGit2, 
  Github, 
  Globe, 
  MoreVertical, 
  Clock 
} from 'lucide-react';
import { Project } from '@/lib/types'; // Matches your shared interface

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  
  // Format Date (e.g., "Jan 12, 2026")
  const formattedDate = new Date(project.created_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="group relative bg-zinc-900 border border-zinc-800 rounded-xl hover:border-zinc-700 hover:shadow-xl transition-all duration-200 overflow-hidden flex flex-col h-full">
      
      {/* 1. Header Section */}
      <div className="p-6 pb-4 flex items-start justify-between">
        <div className="flex items-center gap-4">
          {/* Icon Box */}
          <div className="w-12 h-12 bg-zinc-800 rounded-lg flex items-center justify-center text-zinc-400 group-hover:bg-blue-600/10 group-hover:text-blue-500 transition-colors">
            <FolderGit2 className="w-6 h-6" />
          </div>
          
          {/* Title & Status */}
          <div>
            <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
              <Link href={`/projects/${project.id}`} className="focus:outline-none">
                {/* Clicking title opens details */}
                <span className="absolute inset-0" aria-hidden="true" />
                {project.name}
              </Link>
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs text-zinc-500 font-medium">Active</span>
            </div>
          </div>
        </div>

        {/* Options Menu (Visual only for now) */}
        <button className="z-10 p-2 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>

      {/* 2. Description (Truncated) */}
      <div className="px-6 flex-1">
        <p className="text-sm text-zinc-400 line-clamp-2">
          {project.description || "No description provided for this project."}
        </p>
      </div>

      {/* 3. Footer Stats / Links */}
      <div className="mt-6 px-6 py-4 border-t border-zinc-800/50 bg-zinc-900/50 flex items-center justify-between">
        
        {/* Quick Links (Z-Index ensures they are clickable above the card link) */}
        <div className="flex items-center gap-3 z-10">
          {project.github_repo_url && (
            <a 
              href={project.github_repo_url}
              target="_blank"
              rel="noopener noreferrer" 
              className="text-zinc-500 hover:text-white transition-colors"
              title="View on GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
          )}
          {project.base_url && (
            <a 
              href={project.base_url} 
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-500 hover:text-white transition-colors"
              title="View API"
            >
              <Globe className="w-4 h-4" />
            </a>
          )}
        </div>

        {/* Timestamp */}
        <div className="flex items-center gap-1.5 text-xs text-zinc-600">
          <Clock className="w-3.5 h-3.5" />
          <span>{formattedDate}</span>
        </div>
      </div>

    </div>
  );
}