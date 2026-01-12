'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Save, Trash2, Loader2, AlertTriangle } from 'lucide-react';

import api from '@/lib/api';
import { Project } from '@/types';
import PageHeader from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ProjectSettingsPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.projectId as string;

  // State
  const [formData, setFormData] = useState<Partial<Project>>({
    name: '',
    description: '',
    base_url: '',
    github_repo_url: ''
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // 1. Load Project Data
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const { data } = await api.get(`/projects/${projectId}`);
        setFormData({
          name: data.name,
          description: data.description || '',
          base_url: data.base_url || '',
          github_repo_url: data.github_repo_url || ''
        });
      } catch (err) {
        console.error("Failed to load project", err);
        // If 404, redirect to projects list
        router.push('/projects');
      } finally {
        setIsLoading(false);
      }
    };
    fetchProject();
  }, [projectId, router]);

  // 2. Handle Update
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await api.put(`/projects/${projectId}`, formData);
      // Optional: Show toast notification here
      alert("Project settings updated successfully.");
    } catch (err) {
      console.error("Failed to update project", err);
      alert("Failed to update settings.");
    } finally {
      setIsSaving(false);
    }
  };

  // 3. Handle Delete
  const handleDelete = async () => {
    const confirmName = prompt(`To confirm deletion, please type "${formData.name}" below:`);
    
    if (confirmName !== formData.name) {
      alert("Project name did not match. Deletion cancelled.");
      return;
    }

    setIsDeleting(true);
    try {
      await api.delete(`/projects/${projectId}`);
      router.push('/projects'); // Redirect to main list
    } catch (err) {
      console.error("Failed to delete project", err);
      alert("Failed to delete project. Please try again.");
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-zinc-500" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      
      <PageHeader 
        title="Project Settings" 
        description="Manage project configuration and danger zone."
      />

      {/* 1. General Settings Form */}
      <Card className="border-zinc-800 bg-zinc-900/30">
        <CardHeader>
          <CardTitle>General Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpdate} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">Project Name</label>
                <Input 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">Base URL</label>
                <Input 
                  value={formData.base_url}
                  onChange={(e) => setFormData({...formData, base_url: e.target.value})}
                  placeholder="https://api.example.com" 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">GitHub Repo URL</label>
              <Input 
                value={formData.github_repo_url}
                onChange={(e) => setFormData({...formData, github_repo_url: e.target.value})}
                placeholder="https://github.com/org/repo" 
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">Description</label>
              <Textarea 
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="h-24"
              />
            </div>

            <div className="pt-4 flex justify-end">
              <Button type="submit" disabled={isSaving}>
                {isSaving ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                Save Changes
              </Button>
            </div>

          </form>
        </CardContent>
      </Card>

      {/* 2. Danger Zone */}
      <Card className="border-red-500/30 bg-red-500/5">
        <CardHeader>
          <CardTitle className="text-red-500 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Danger Zone
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-zinc-400">
            Deleting this project will permanently remove all associated data, including:
            <ul className="list-disc list-inside mt-2 ml-2">
              <li>API Specifications & Versions</li>
              <li>Generated Test Blueprints</li>
              <li>Test Run History & Logs</li>
              <li>Stored Secrets</li>
            </ul>
          </p>
          
          <div className="flex justify-end pt-2">
            <Button 
              variant="destructive" 
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Trash2 className="w-4 h-4 mr-2" />
              )}
              Delete Project
            </Button>
          </div>
        </CardContent>
      </Card>

    </div>
  );
}