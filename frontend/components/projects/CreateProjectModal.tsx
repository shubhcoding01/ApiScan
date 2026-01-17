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

  // Form State
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [baseUrl, setBaseUrl] = useState('');
  const [repoUrl, setRepoUrl] = useState('');

  // UI State
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

    // 🛠️ HELPER: Fix URLs for Pydantic
    // 1. Convert empty string "" to null (Fixes 422 Error)
    // 2. Add https:// if missing (Fixes Validation Error)
    const formatUrl = (url: string) => {
      const trimmed = url.trim();
      if (!trimmed) return null; 
      if (!/^https?:\/\//i.test(trimmed)) {
        return `https://${trimmed}`;
      }
      return trimmed;
    };

    try {
      const payload = {
        name: name,
        description: description.trim() || null,
        base_url: formatUrl(baseUrl),         // Required by backend
        github_repo_url: formatUrl(repoUrl),  // Optional
      };

      console.log("Submitting:", payload); // Debug log

      await api.post('/projects/', payload);

      resetForm();
      onSuccess();
      onClose();

    } catch (err: any) {
      console.error('Create project failed:', err);
      
      // 🛡️ SAFE ERROR HANDLING (Prevents React Crash)
      const detail = err.response?.data?.detail;
      let msg = 'Failed to create project';

      if (Array.isArray(detail)) {
        // Handle FastAPI/Pydantic list of errors
        msg = detail.map((e: any) => {
          // e.loc is like ['body', 'base_url'], we want the last part
          const field = e.loc[e.loc.length - 1]; 
          return `${field}: ${e.msg}`;
        }).join(' | ');
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

          {/* Name */}
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

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm text-zinc-300">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description..."
              className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-2 text-white h-24 resize-none focus:ring-2 focus:ring-blue-600 outline-none"
            />
          </div>

          {/* URLs */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-zinc-300">
                Base URL <span className="text-red-500">*</span>
              </label>
              <input
                type="text" // 'text' allows pasting 'api.com' so our helper can fix it
                placeholder="api.example.com"
                value={baseUrl}
                onChange={(e) => setBaseUrl(e.target.value)}
                className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-600 outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-zinc-300">GitHub Repo URL</label>
              <input
                type="text"
                placeholder="github.com/org/repo"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-600 outline-none"
              />
            </div>
          </div>

          {/* Actions */}
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