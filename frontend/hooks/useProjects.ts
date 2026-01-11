'use client';

import { useState, useEffect, useCallback } from 'react';
import api from '@/lib/api';
import { Project } from '@/types';

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Define fetch as a stable function we can call manually
  const fetchProjects = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data } = await api.get('/projects/');
      setProjects(data);
      setError(null);
    } catch (err: any) {
      console.error("Failed to fetch projects", err);
      setError(err.response?.data?.detail || 'Failed to load projects');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Run automatically on mount
  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return { 
    projects, 
    isLoading, 
    error, 
    refetch: fetchProjects 
  };
}