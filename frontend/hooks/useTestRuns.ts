'use client';

import { useState, useEffect, useCallback } from 'react';
import api from '@/lib/api';

export interface TestRun {
  id: string;
  blueprint_id: string;
  status: 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED' | 'PASSED';
  result_json?: any;
  created_at: string;
}

export function useTestRuns(blueprintId?: string) {
  const [runs, setRuns] = useState<TestRun[]>([]);
  const [isLoading, setIsLoading] = useState(false); // Default false if no ID provided
  const [error, setError] = useState<string | null>(null);

  const fetchRuns = useCallback(async () => {
    if (!blueprintId) return;

    try {
      setIsLoading(true);
      const { data } = await api.get(`/test-runs/blueprint/${blueprintId}`);
      setRuns(data);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to load test runs');
    } finally {
      setIsLoading(false);
    }
  }, [blueprintId]);

  useEffect(() => {
    fetchRuns();
  }, [fetchRuns]);

  // Optional: Polling (Refresh every 5 seconds if a run is active)
  useEffect(() => {
    if (!blueprintId) return;
    
    // Check if any run is currently running
    const hasActiveRun = runs.some(r => r.status === 'RUNNING' || r.status === 'PENDING');
    
    if (hasActiveRun) {
      const interval = setInterval(fetchRuns, 5000);
      return () => clearInterval(interval);
    }
  }, [runs, fetchRuns, blueprintId]);

  return { runs, isLoading, error, refetch: fetchRuns };
}