// 'use client';

// import { useState } from 'react';
// import { Loader2, X } from 'lucide-react';
// import api from '@/lib/api';

// interface CreateProjectModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSuccess: () => void; // Trigger to refresh the parent list
// }

// export default function CreateProjectModal({ 
//   isOpen, 
//   onClose, 
//   onSuccess 
// }: CreateProjectModalProps) {
  
//   // Form State
//   const [name, setName] = useState('');
//   const [description, setDescription] = useState('');
//   const [baseUrl, setBaseUrl] = useState('');
//   const [repoUrl, setRepoUrl] = useState('');
  
//   // UI State
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   // If modal is closed, don't render anything
//   if (!isOpen) return null;

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError(null);

//     try {
//       // 1. Send Data to Backend
//       // We convert empty strings to null to match your Pydantic schema
//       await api.post('/projects/', {
//         name,
//         description,
//         base_url: baseUrl || null,
//         github_repo_url: repoUrl || null
//       });

//       // 2. Success Actions
//       setName('');
//       setDescription('');
//       setBaseUrl('');
//       setRepoUrl('');
      
//       onSuccess(); // Refresh the list in the background
//       onClose();   // Close the modal

//     } catch (err: any) {
//       console.error("Failed to create project:", err);
//       // Grab the specific error message from FastAPI if available
//       const msg = err.response?.data?.detail || "Something went wrong. Please try again.";
//       setError(msg);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     // 1. Backdrop (Dark Overlay)
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      
//       {/* 2. Modal Content Box */}
//       <div className="w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl animate-in fade-in zoom-in duration-200">
        
//         {/* Header */}
//         <div className="flex items-center justify-between p-6 border-b border-zinc-800">
//           <h2 className="text-xl font-bold text-white">Create New Project</h2>
//           <button 
//             onClick={onClose}
//             className="text-zinc-500 hover:text-white transition-colors"
//           >
//             <X className="w-5 h-5" />
//           </button>
//         </div>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
//           {/* Error Message Display */}
//           {error && (
//             <div className="p-3 bg-red-500/10 text-red-400 text-sm rounded-lg border border-red-500/20 flex items-center gap-2">
//               <span>⚠️</span> {error}
//             </div>
//           )}

//           {/* Field: Project Name */}
//           <div className="space-y-2">
//             <label className="text-sm font-medium text-zinc-300">
//               Project Name <span className="text-red-500">*</span>
//             </label>
//             <input 
//               type="text" 
//               required
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               placeholder="e.g. Payment Service API"
//               className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-600 focus:outline-none placeholder:text-zinc-600 transition-all"
//             />
//           </div>

//           {/* Field: Description */}
//           <div className="space-y-2">
//             <label className="text-sm font-medium text-zinc-300">Description</label>
//             <textarea 
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               placeholder="Short description of this service..."
//               className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-600 focus:outline-none placeholder:text-zinc-600 transition-all h-24 resize-none"
//             />
//           </div>

//           {/* Fields: URLs (Grid Layout) */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="space-y-2">
//               <label className="text-sm font-medium text-zinc-300">Base URL</label>
//               <input 
//                 type="url" 
//                 value={baseUrl}
//                 onChange={(e) => setBaseUrl(e.target.value)}
//                 placeholder="https://api.example.com"
//                 className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-600 focus:outline-none placeholder:text-zinc-600"
//               />
//             </div>
//             <div className="space-y-2">
//               <label className="text-sm font-medium text-zinc-300">GitHub Repo URL</label>
//               <input 
//                 type="url" 
//                 value={repoUrl}
//                 onChange={(e) => setRepoUrl(e.target.value)}
//                 placeholder="https://github.com/..."
//                 className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-600 focus:outline-none placeholder:text-zinc-600"
//               />
//             </div>
//           </div>

//           {/* Action Buttons */}
//           <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-zinc-800">
//             <button 
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors"
//             >
//               Cancel
//             </button>
//             <button 
//               type="submit"
//               disabled={isLoading}
//               className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg text-sm font-medium flex items-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {isLoading ? (
//                 <>
//                   <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//                   Creating...
//                 </>
//               ) : (
//                 'Create Project'
//               )}
//             </button>
//           </div>

//         </form>
//       </div>
//     </div>
//   );
// }

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

    try {
      await api.post('/projects/', {
        name,
        description: description || null,
        base_url: baseUrl || null,
        github_repo_url: repoUrl || null,
      });

      resetForm();
      onSuccess();
      onClose();

    } catch (err: any) {
      console.error('Create project failed:', err);
      setError(err.response?.data?.detail || 'Failed to create project');
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

          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-sm">
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
              className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-zinc-300">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-2 text-white h-24 resize-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="url"
              placeholder="https://api.example.com"
              value={baseUrl}
              onChange={(e) => setBaseUrl(e.target.value)}
              className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-600"
            />
            <input
              type="url"
              placeholder="https://github.com/org/repo"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-zinc-800">
            <button type="button" onClick={onClose} className="text-zinc-400 hover:text-white">
              Cancel
            </button>
            <button
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded-lg text-white flex items-center disabled:opacity-50"
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
