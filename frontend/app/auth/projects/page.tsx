'use client';

import { useState } from 'react';
import { Plus, Loader2, FolderSearch } from 'lucide-react';

import { useProjects } from '@/hooks/useProjects';
import PageHeader from '@/components/layout/PageHeader';
import ProjectCard from '@/components/projects/ProjectCard';
import CreateProjectModal from '@/components/projects/CreateProjectModal';
import { Button } from '@/components/ui/button';

export default function ProjectsPage() {
  const { projects, isLoading, refetch } = useProjects();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="animate-in fade-in duration-500">
      
      {/* 1. Header with "Create" Action */}
      <PageHeader 
        title="Projects" 
        description="Manage your API services and configuration."
      >
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          New Project
        </Button>
      </PageHeader>

      {/* 2. Loading State */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 text-zinc-500">
          <Loader2 className="w-8 h-8 animate-spin mb-4" />
          <p>Loading projects...</p>
        </div>
      ) : (
        <>
          {/* 3. Empty State (No Projects) */}
          {projects.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 border border-dashed border-zinc-800 rounded-xl bg-zinc-900/30 text-center">
              <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mb-6">
                <FolderSearch className="w-8 h-8 text-zinc-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No Projects Found</h3>
              <p className="text-zinc-500 max-w-sm mb-8">
                Get started by creating your first project to scan and secure your APIs.
              </p>
              <Button onClick={() => setIsModalOpen(true)} size="lg">
                <Plus className="w-5 h-5 mr-2" />
                Create First Project
              </Button>
            </div>
          ) : (
            /* 4. Project Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </>
      )}

      {/* 5. Create Project Modal (Hidden by default) */}
      <CreateProjectModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {
          refetch(); // Reload list after creation
          setIsModalOpen(false);
        }}
      />

    </div>
  );
}