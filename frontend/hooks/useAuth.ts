'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';

export function useAuth(requireAuth = true) {
  const router = useRouter();
  const [user, setUser] = useState<{ id: string; email: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');

      // 1. No token found
      if (!token) {
        if (requireAuth) {
          router.push('/login');
        }
        setIsLoading(false);
        return;
      }

      // 2. Validate token with backend (Optional but recommended)
      try {
        const { data } = await api.get('/auth/me');
        setUser(data);
      } catch (err) {
        // If 401 Unauthorized, clear token and redirect
        console.error("Auth check failed", err);
        localStorage.removeItem('token');
        if (requireAuth) router.push('/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router, requireAuth]);

  return { user, isLoading, isAuthenticated: !!user };
}