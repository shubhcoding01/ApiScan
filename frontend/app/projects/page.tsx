// 'use client';

// import { useState } from 'react';
// import { Plus, Loader2, FolderSearch } from 'lucide-react';

// import { useProjects } from '@/hooks/useProjects';
// import PageHeader from '@/components/layout/PageHeader';
// import ProjectCard from '@/components/projects/ProjectCard';
// import CreateProjectModal from '@/components/projects/CreateProjectModal';
// import { Button } from '@/components/ui/button';

// export default function ProjectsPage() {
//   const { projects, isLoading, refetch } = useProjects();
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   return (
//     <div className="animate-in fade-in duration-500">
      
//       {/* 1. Header with "Create" Action */}
//       <PageHeader 
//         title="Projects" 
//         description="Manage your API services and configuration."
//       >
//         <Button onClick={() => setIsModalOpen(true)}>
//           <Plus className="w-4 h-4 mr-2" />
//           New Project
//         </Button>
//       </PageHeader>

//       {/* 2. Loading State */}
//       {isLoading ? (
//         <div className="flex flex-col items-center justify-center py-20 text-zinc-500">
//           <Loader2 className="w-8 h-8 animate-spin mb-4" />
//           <p>Loading projects...</p>
//         </div>
//       ) : (
//         <>
//           {/* 3. Empty State (No Projects) */}
//           {projects.length === 0 ? (
//             <div className="flex flex-col items-center justify-center py-20 border border-dashed border-zinc-800 rounded-xl bg-zinc-900/30 text-center">
//               <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mb-6">
//                 <FolderSearch className="w-8 h-8 text-zinc-500" />
//               </div>
//               <h3 className="text-xl font-bold text-white mb-2">No Projects Found</h3>
//               <p className="text-zinc-500 max-w-sm mb-8">
//                 Get started by creating your first project to scan and secure your APIs.
//               </p>
//               <Button onClick={() => setIsModalOpen(true)} size="lg">
//                 <Plus className="w-5 h-5 mr-2" />
//                 Create First Project
//               </Button>
//             </div>
//           ) : (
//             /* 4. Project Grid */
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {projects.map((project) => (
//                 <ProjectCard key={project.id} project={project} />
//               ))}
//             </div>
//           )}
//         </>
//       )}

//       {/* 5. Create Project Modal (Hidden by default) */}
//       <CreateProjectModal 
//         isOpen={isModalOpen} 
//         onClose={() => setIsModalOpen(false)}
//         onSuccess={() => {
//           refetch(); // Reload list after creation
//           setIsModalOpen(false);
//         }}
//       />

//     </div>
//   );
// }

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Plus, 
  Loader2, 
  FolderSearch, 
  LayoutGrid, 
  List, 
  Bell, 
  User, 
  Search,
  LogOut,
  Bot
} from 'lucide-react';

import { useProjects } from '@/hooks/useProjects';
import ProjectCard from '@/components/projects/ProjectCard';
import CreateProjectModal from '@/components/projects/CreateProjectModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function ProjectsPage() {
  const { projects, isLoading, refetch } = useProjects();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-500/30">
      
      {/* --- 1. TOP NAVIGATION BAR --- */}
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-black/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            
            {/* Left: Logo & Brand */}
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600 text-white shadow-lg shadow-blue-900/20">
                <Bot className="w-5 h-5" />
              </div>
              <span className="text-lg font-bold tracking-tight text-white hidden sm:block">
                ApiScan
              </span>
              <span className="mx-2 text-zinc-700 h-4 w-[1px]"></span>
              <span className="text-sm font-medium text-zinc-400">Projects</span>
            </div>

            {/* Right: Actions & Profile */}
            <div className="flex items-center gap-4">
              {/* Search Bar (Optional visual) */}
              <div className="relative hidden md:block w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
                <Input 
                  placeholder="Search projects..." 
                  className="pl-9 bg-zinc-900/50 border-zinc-800 text-sm focus:bg-zinc-900 transition-colors h-9" 
                />
              </div>

              {/* Notification Bell */}
              <button className="relative p-2 text-zinc-400 hover:text-white transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full border-2 border-black"></span>
              </button>

              {/* User Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8 border border-white/10">
                      <AvatarImage src="/placeholder-user.jpg" alt="@user" />
                      <AvatarFallback className="bg-zinc-800 text-zinc-400">JD</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-zinc-950 border-zinc-800 text-zinc-300" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none text-white">John Doe</p>
                      <p className="text-xs leading-none text-zinc-500">john@example.com</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-zinc-800" />
                  <DropdownMenuItem className="focus:bg-zinc-900 focus:text-white cursor-pointer">
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem className="focus:bg-zinc-900 focus:text-white cursor-pointer">
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-zinc-800" />
                  <DropdownMenuItem className="text-red-400 focus:bg-red-950/20 focus:text-red-300 cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </nav>

      {/* --- 2. MAIN CONTENT AREA --- */}
      {/* Use max-w-7xl and mx-auto to center content. Use py-10 to push it down from the top. */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Page Header Area */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">Dashboard</h1>
            <p className="text-zinc-400 mt-1">
              Manage your API services and monitor test blueprints.
            </p>
          </div>

          <div className="flex items-center gap-3">
             {/* View Toggle (Grid vs List) */}
            <div className="hidden sm:flex items-center p-1 bg-zinc-900 border border-zinc-800 rounded-lg">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-md transition-all ${viewMode === 'grid' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}
                >
                    <LayoutGrid className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-md transition-all ${viewMode === 'list' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}
                >
                    <List className="w-4 h-4" />
                </button>
            </div>

            <Button 
                onClick={() => setIsModalOpen(true)} 
                className="bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Project
            </Button>
          </div>
        </div>

        {/* --- 3. LOADING & EMPTY STATES --- */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-32 text-zinc-500">
              <Loader2 className="w-10 h-10 animate-spin mb-4 text-blue-500" />
              <p>Loading your projects...</p>
            </div>
          ) : (
            <>
              {projects.length === 0 ? (
                // EMPTY STATE
                <div className="flex flex-col items-center justify-center py-32 border border-dashed border-zinc-800 rounded-2xl bg-zinc-900/20 text-center">
                  <div className="w-20 h-20 bg-zinc-900 rounded-full flex items-center justify-center mb-6 border border-zinc-800 shadow-xl">
                    <FolderSearch className="w-10 h-10 text-zinc-600" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">No Projects Found</h3>
                  <p className="text-zinc-500 max-w-sm mb-8">
                    Get started by creating your first project to scan and secure your APIs.
                  </p>
                  <Button onClick={() => setIsModalOpen(true)} size="lg" className="bg-white text-black hover:bg-zinc-200">
                    <Plus className="w-5 h-5 mr-2" />
                    Create First Project
                  </Button>
                </div>
              ) : (
                // PROJECTS GRID
                <div className={`
                    grid gap-6 
                    ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}
                `}>
                  {projects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>

      </main>

      {/* --- 4. MODAL --- */}
      <CreateProjectModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {
          refetch(); 
          setIsModalOpen(false);
        }}
      />

    </div>
  );
}