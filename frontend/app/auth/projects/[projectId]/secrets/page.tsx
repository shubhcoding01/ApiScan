'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { Plus, Shield, Loader2, Save } from 'lucide-react';

import api from '@/lib/api';
import { Secret } from '@/types';
import PageHeader from '@/components/layout/PageHeader';
import SecretTable from '@/components/secrets/SecretTable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function SecretsPage() {
  const params = useParams();
  const projectId = params.projectId as string;

  // State
  const [secrets, setSecrets] = useState<Secret[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Form State
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // 1. Fetch Secrets
  const fetchSecrets = useCallback(async () => {
    try {
      const { data } = await api.get(`/secrets/${projectId}`);
      setSecrets(data);
    } catch (err) {
      console.error("Failed to load secrets", err);
    } finally {
      setIsLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    fetchSecrets();
  }, [fetchSecrets]);

  // 2. Add Secret
  const handleAddSecret = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKey || !newValue) return;

    setIsAdding(true);
    try {
      const { data } = await api.post('/secrets/', {
        project_id: projectId,
        key: newKey.toUpperCase(), // Standardize env vars to uppercase
        value: newValue
      });

      // Update UI (Append new secret)
      setSecrets((prev) => [...prev, data]);
      
      // Reset Form
      setNewKey('');
      setNewValue('');
    } catch (err) {
      console.error("Failed to add secret", err);
      alert("Failed to add secret. Please try again.");
    } finally {
      setIsAdding(false);
    }
  };

  // 3. Delete Secret
  const handleDeleteSecret = async (secretId: string) => {
    setIsDeleting(true);
    try {
      await api.delete(`/secrets/${secretId}`);
      // Remove from UI
      setSecrets((prev) => prev.filter(s => s.id !== secretId));
    } catch (err) {
      console.error("Failed to delete secret", err);
      alert("Could not delete secret.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      
      <PageHeader 
        title="Environment Variables" 
        description="Securely store API keys and tokens. These are encrypted and injected into the test runner at runtime."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: Add New Secret Form */}
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
                <div className="space-y-2">
                  <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
                    Key Name
                  </label>
                  <Input 
                    placeholder="e.g. STRIPE_API_KEY" 
                    value={newKey}
                    onChange={(e) => setNewKey(e.target.value)}
                    className="font-mono"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
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

          {/* Security Note */}
          <div className="mt-4 p-4 bg-blue-900/10 border border-blue-900/30 rounded-xl flex gap-3">
            <Shield className="w-5 h-5 text-blue-400 shrink-0" />
            <p className="text-xs text-blue-300 leading-relaxed">
              Values are encrypted with <strong>Fernet (AES-128)</strong> before storage. They are never returned in plain text via the API.
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: Secrets List */}
        <div className="lg:col-span-2">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
              <p className="text-sm text-zinc-500">Loading secrets...</p>
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