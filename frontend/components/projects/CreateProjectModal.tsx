'use client';

import { useEffect, useState } from 'react';
import { Loader2, X } from 'lucide-react';
import api from '@/lib/api';

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function CreateProjectModal({
  isOpen,
  onClose,
  onSuccess,
}: CreateProjectModalProps) {

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [baseUrl, setBaseUrl] = useState('');
  const [repoUrl, setRepoUrl] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /* Prevent background scroll + ESC close */
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = 'hidden';
    const onEsc = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onEsc);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const resetForm = () => {
    setName('');
    setDescription('');
    setBaseUrl('');
    setRepoUrl('');
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Helper to fix URLs (Pydantic requires http:// or https://)
    const formatUrl = (url: string) => {
      const trimmed = url.trim();
      if (!trimmed) return null; // If empty, return null
      if (!/^https?:\/\//i.test(trimmed)) {
        return `https://${trimmed}`; // Auto-add https:// if missing
      }
      return trimmed;
    };

    try {
      // 1. Prepare Payload
      const payload = {
        name: name,
        description: description.trim() || null,
        // Ensure base_url is formatted correctly (Required field)
        base_url: formatUrl(baseUrl) || undefined, 
        // Ensure repo_url is formatted correctly (Optional field)
        github_repo_url: formatUrl(repoUrl)
      };

      // 2. Send to Backend
      await api.post('/projects/', payload);

      // 3. Cleanup
      resetForm();
      onSuccess();
      onClose();

    } catch (err: any) {
      console.error('Create project failed:', err);
      
      // Safely extract validation error
      const detail = err.response?.data?.detail;
      let msg = 'Failed to create project';

      if (Array.isArray(detail)) {
        // Handle Pydantic's list of errors
        msg = detail.map((e: any) => {
          const field = e.loc[1];
          // user-friendly messages
          if (field === 'base_url') return "Base URL must be a valid URL (e.g. https://...)";
          if (field === 'github_repo_url') return "Repo URL must be a valid URL";
          return `${field}: ${e.msg}`;
        }).join(', ');
      } else if (typeof detail === 'string') {
        msg = detail;
      }
      
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">

      <div className="w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl animate-in fade-in zoom-in duration-200">

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-zinc-800">
          <h2 className="text-xl font-bold text-white">Create New Project</h2>
          <button onClick={onClose} className="text-zinc-500 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">

          {/* Error Message Box */}
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-sm font-mono break-words">
              ⚠️ {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm text-zinc-300">
              Project Name <span className="text-red-500">*</span>
            </label>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Payment Service API"
              className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-600 outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-zinc-300">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-2 text-white h-24 resize-none focus:ring-2 focus:ring-blue-600 outline-none"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-zinc-300">Base URL</label>
              <input
                type="url"
                placeholder="https://api.example.com"
                value={baseUrl}
                onChange={(e) => setBaseUrl(e.target.value)}
                className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-600 outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-zinc-300">GitHub Repo URL</label>
              <input
                type="url"
                placeholder="https://github.com/org/repo"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-600 outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-zinc-800">
            <button type="button" onClick={onClose} className="text-zinc-400 hover:text-white px-4 py-2">
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded-lg text-white flex items-center disabled:opacity-50 transition-colors"
            >
              {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Create Project
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}