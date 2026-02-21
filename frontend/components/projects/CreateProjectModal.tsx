// 'use client';

// import { useEffect, useState } from 'react';
// import { Loader2, X } from 'lucide-react';
// import api from '@/lib/api';

// interface CreateProjectModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSuccess: () => void;
// }

// export default function CreateProjectModal({
//   isOpen,
//   onClose,
//   onSuccess,
// }: CreateProjectModalProps) {

//   // Form State
//   const [name, setName] = useState('');
//   const [description, setDescription] = useState('');
//   const [baseUrl, setBaseUrl] = useState('');
//   const [repoUrl, setRepoUrl] = useState('');

//   // UI State
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   /* Prevent background scroll + ESC close */
//   useEffect(() => {
//     if (!isOpen) return;
//     document.body.style.overflow = 'hidden';
//     const onEsc = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
//     window.addEventListener('keydown', onEsc);
//     return () => {
//       document.body.style.overflow = '';
//       window.removeEventListener('keydown', onEsc);
//     };
//   }, [isOpen, onClose]);

//   if (!isOpen) return null;

//   const resetForm = () => {
//     setName('');
//     setDescription('');
//     setBaseUrl('');
//     setRepoUrl('');
//     setError(null);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError(null);

//     // 🛠️ HELPER: Fix URLs for Pydantic
//     // 1. Convert empty string "" to null (Fixes 422 Error)
//     // 2. Add https:// if missing (Fixes Validation Error)
//     const formatUrl = (url: string) => {
//       const trimmed = url.trim();
//       if (!trimmed) return null; 
//       if (!/^https?:\/\//i.test(trimmed)) {
//         return `https://${trimmed}`;
//       }
//       return trimmed;
//     };

//     try {
//       const payload = {
//         name: name,
//         description: description.trim() || null,
//         base_url: formatUrl(baseUrl),         // Required by backend
//         github_repo_url: formatUrl(repoUrl),  // Optional
//       };

//       console.log("Submitting:", payload); // Debug log

//       await api.post('/projects/', payload);

//       resetForm();
//       onSuccess();
//       onClose();

//     } catch (err: any) {
//       console.error('Create project failed:', err);
      
//       // 🛡️ SAFE ERROR HANDLING (Prevents React Crash)
//       const detail = err.response?.data?.detail;
//       let msg = 'Failed to create project';

//       if (Array.isArray(detail)) {
//         // Handle FastAPI/Pydantic list of errors
//         msg = detail.map((e: any) => {
//           // e.loc is like ['body', 'base_url'], we want the last part
//           const field = e.loc[e.loc.length - 1]; 
//           return `${field}: ${e.msg}`;
//         }).join(' | ');
//       } else if (typeof detail === 'string') {
//         msg = detail;
//       }
      
//       setError(msg);
      
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">

//       <div className="w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl animate-in fade-in zoom-in duration-200">

//         {/* Header */}
//         <div className="flex items-center justify-between p-6 border-b border-zinc-800">
//           <h2 className="text-xl font-bold text-white">Create New Project</h2>
//           <button onClick={onClose} className="text-zinc-500 hover:text-white">
//             <X className="w-5 h-5" />
//           </button>
//         </div>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="p-6 space-y-4">

//           {/* Error Message Box */}
//           {error && (
//             <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-sm font-mono break-words">
//               ⚠️ {error}
//             </div>
//           )}

//           {/* Name */}
//           <div className="space-y-2">
//             <label className="text-sm text-zinc-300">
//               Project Name <span className="text-red-500">*</span>
//             </label>
//             <input
//               required
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               placeholder="Payment Service API"
//               className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-600 outline-none"
//             />
//           </div>

//           {/* Description */}
//           <div className="space-y-2">
//             <label className="text-sm text-zinc-300">Description</label>
//             <textarea
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               placeholder="Brief description..."
//               className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-2 text-white h-24 resize-none focus:ring-2 focus:ring-blue-600 outline-none"
//             />
//           </div>

//           {/* URLs */}
//           <div className="grid md:grid-cols-2 gap-4">
//             <div className="space-y-2">
//               <label className="text-sm text-zinc-300">
//                 Base URL <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text" // 'text' allows pasting 'api.com' so our helper can fix it
//                 placeholder="api.example.com"
//                 value={baseUrl}
//                 onChange={(e) => setBaseUrl(e.target.value)}
//                 className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-600 outline-none"
//               />
//             </div>
//             <div className="space-y-2">
//               <label className="text-sm text-zinc-300">GitHub Repo URL</label>
//               <input
//                 type="text"
//                 placeholder="github.com/org/repo"
//                 value={repoUrl}
//                 onChange={(e) => setRepoUrl(e.target.value)}
//                 className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-600 outline-none"
//               />
//             </div>
//           </div>

//           {/* Actions */}
//           <div className="flex justify-end gap-3 pt-4 border-t border-zinc-800">
//             <button type="button" onClick={onClose} className="text-zinc-400 hover:text-white px-4 py-2">
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={isLoading}
//               className="bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded-lg text-white flex items-center disabled:opacity-50 transition-colors"
//             >
//               {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
//               Create Project
//             </button>
//           </div>

//         </form>
//       </div>
//     </div>
//   );
// }


'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  FolderPlus, 
  Globe, 
  Github, 
  AlignLeft, 
  Loader2, 
  FolderGit2
} from 'lucide-react';

import api from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function CreateProjectModal({ isOpen, onClose, onSuccess }: CreateProjectModalProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [baseUrl, setBaseUrl] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setName('');
      setDescription('');
      setBaseUrl('');
      setGithubUrl('');
      setError('');
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSubmitting(true);
    setError('');

    try {
      await api.post('/projects/', {
        name,
        description,
        base_url: baseUrl,
        github_repo_url: githubUrl,
      });
      onSuccess();
    } catch (err: any) {
      console.error('Failed to create project', err);
      setError(err.response?.data?.detail || 'Failed to create project. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#020617]/80 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg bg-[#0B1120] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                  <FolderPlus className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Create New Project</h2>
                  <p className="text-xs text-slate-400">Set up a new workspace for your API.</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 overflow-y-auto max-h-[70vh]">
              <form id="create-project-form" onSubmit={handleSubmit} className="space-y-5">
                
                {error && (
                  <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-sm text-red-400">
                    {error}
                  </div>
                )}

                {/* Project Name */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">
                    Project Name <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <FolderGit2 className="absolute left-3 top-2.5 h-5 w-5 text-slate-500" />
                    <Input
                      autoFocus
                      required
                      placeholder="e.g. Production Billing API"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-10 h-11 bg-slate-950/50 border-slate-800 text-slate-200 focus:border-blue-500/50 transition-colors"
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">
                    Description
                  </label>
                  <div className="relative">
                    <AlignLeft className="absolute left-3 top-3 h-5 w-5 text-slate-500" />
                    <Textarea
                      placeholder="Briefly describe what this API does..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="pl-10 min-h-[80px] bg-slate-950/50 border-slate-800 text-slate-200 focus:border-blue-500/50 transition-colors resize-none py-3"
                    />
                  </div>
                </div>

                {/* Base URL */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">
                    Base URL (Target)
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-2.5 h-5 w-5 text-slate-500" />
                    <Input
                      placeholder="https://api.example.com/v1"
                      value={baseUrl}
                      onChange={(e) => setBaseUrl(e.target.value)}
                      className="pl-10 h-11 font-mono text-sm bg-slate-950/50 border-slate-800 text-slate-200 focus:border-blue-500/50 transition-colors"
                    />
                  </div>
                  <p className="text-[10px] text-slate-500 ml-1">The live or staging URL where tests will be executed.</p>
                </div>

                {/* GitHub URL */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">
                    GitHub Repository
                  </label>
                  <div className="relative">
                    <Github className="absolute left-3 top-2.5 h-5 w-5 text-slate-500" />
                    <Input
                      placeholder="https://github.com/org/repo"
                      value={githubUrl}
                      onChange={(e) => setGithubUrl(e.target.value)}
                      className="pl-10 h-11 font-mono text-sm bg-slate-950/50 border-slate-800 text-slate-200 focus:border-blue-500/50 transition-colors"
                    />
                  </div>
                </div>

              </form>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-800 bg-slate-900/30 flex justify-end gap-3">
              <Button 
                type="button" 
                variant="ghost" 
                onClick={onClose}
                disabled={isSubmitting}
                className="text-slate-400 hover:text-white hover:bg-slate-800"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                form="create-project-form"
                disabled={!name.trim() || isSubmitting}
                className="bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20 px-6 transition-all"
              >
                {isSubmitting ? (
                  <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Creating...</>
                ) : (
                  'Create Project'
                )}
              </Button>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}