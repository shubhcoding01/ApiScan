'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Plus, Shield, Loader2, Save } from 'lucide-react';

import api from '@/lib/api';
import { getToken } from '@/lib/auth';
import { Secret } from '@/lib/types';
import PageHeader from '@/components/layout/PageHeader';
import SecretTable from '@/components/secrets/SecretTable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function SecretsPage() {
  const router = useRouter();
  const params = useParams();
  const projectId = params.projectId as string;

  // ----------------------------------------------------
  // STATE
  // ----------------------------------------------------
  const [secrets, setSecrets] = useState<Secret[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // ----------------------------------------------------
  // AUTH GUARD
  // ----------------------------------------------------
  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.replace('/login');
      return;
    }

    api.get('/auth/me').catch(() => {
      router.replace('/login');
    });
  }, [router]);

  // ----------------------------------------------------
  // FETCH SECRETS
  // ----------------------------------------------------
  const fetchSecrets = useCallback(async () => {
    try {
      const { data } = await api.get(`/secrets/${projectId}`);
      setSecrets(data);
    } catch (err) {
      console.error('Failed to load secrets', err);
    } finally {
      setIsLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    fetchSecrets();
  }, [fetchSecrets]);

  // ----------------------------------------------------
  // ADD SECRET
  // ----------------------------------------------------
  const handleAddSecret = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKey || !newValue) return;

    setIsAdding(true);
    try {
      const { data } = await api.post('/secrets/', {
        project_id: projectId,
        key_name: newKey.toUpperCase(),
        value: newValue,
        environment: 'default', // backend expects this
        scope: 'runtime',       // backend expects this
      });

      setSecrets((prev) => [...prev, data]);
      setNewKey('');
      setNewValue('');
    } catch (err) {
      console.error('Failed to add secret', err);
      alert('Failed to add secret');
    } finally {
      setIsAdding(false);
    }
  };

  // ----------------------------------------------------
  // DELETE SECRET
  // ----------------------------------------------------
  const handleDeleteSecret = async (secretId: string) => {
    setIsDeleting(true);
    try {
      await api.delete(`/secrets/${secretId}`);
      setSecrets((prev) => prev.filter((s) => s.id !== secretId));
    } catch (err) {
      console.error('Failed to delete secret', err);
      alert('Could not delete secret');
    } finally {
      setIsDeleting(false);
    }
  };

  // ----------------------------------------------------
  // RENDER
  // ----------------------------------------------------
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <PageHeader
        title="Environment Variables"
        description="Securely store API keys and tokens. These are encrypted and injected into the test runner at runtime."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ADD SECRET */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24 border-zinc-800 bg-zinc-900/50">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Plus className="w-5 h-5 text-blue-500" />
                Add Variable
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddSecret} className="space-y-4">
                <div>
                  <label className="text-xs text-zinc-400 uppercase">
                    Key Name
                  </label>
                  <Input
                    placeholder="STRIPE_API_KEY"
                    value={newKey}
                    onChange={(e) => setNewKey(e.target.value)}
                    className="font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs text-zinc-400 uppercase">
                    Value
                  </label>
                  <Input
                    type="password"
                    placeholder="sk_live_..."
                    value={newValue}
                    onChange={(e) => setNewValue(e.target.value)}
                    className="font-mono"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isAdding || !newKey || !newValue}
                >
                  {isAdding ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save Secret
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* SECURITY NOTE */}
          <div className="mt-4 p-4 bg-blue-900/10 border border-blue-900/30 rounded-xl flex gap-3">
            <Shield className="w-5 h-5 text-blue-400" />
            <p className="text-xs text-blue-300">
              Secrets are encrypted at rest and never returned in plain text.
            </p>
          </div>
        </div>

        {/* LIST */}
        <div className="lg:col-span-2">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            </div>
          ) : (
            <SecretTable
              secrets={secrets}
              onDelete={handleDeleteSecret}
              isDeleting={isDeleting}
            />
          )}
        </div>
      </div>
    </div>
  );
}