// 'use client';

// import { useState } from 'react';
// import { Trash2, Copy, Check, EyeOff, Key } from 'lucide-react';
// import { Secret } from '@/lib/types';

// interface SecretTableProps {
//   secrets: Secret[];
//   onDelete: (id: string) => void;
//   isDeleting?: boolean; // To show loading state during delete
// }

// export default function SecretTable({ secrets, onDelete, isDeleting = false }: SecretTableProps) {
  
//   // State to track which key was just copied (for the checkmark effect)
//   const [copiedId, setCopiedId] = useState<string | null>(null);

//   const handleCopy = (text: string, id: string) => {
//     navigator.clipboard.writeText(text);
//     setCopiedId(id);
//     setTimeout(() => setCopiedId(null), 2000); // Reset after 2s
//   };

//   // 1. Empty State
//   if (secrets.length === 0) {
//     return (
//       <div className="flex flex-col items-center justify-center py-16 px-4 border border-dashed border-zinc-800 rounded-xl bg-zinc-900/30 text-center">
//         <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center mb-4">
//           <Key className="w-6 h-6 text-zinc-500" />
//         </div>
//         <h3 className="text-lg font-medium text-white">No Secrets Added</h3>
//         <p className="text-zinc-500 text-sm max-w-sm mt-1">
//           Add API Keys (like OPENAI_KEY) so the AI agent can authenticate during tests.
//         </p>
//       </div>
//     );
//   }

//   // 2. Data Table
//   return (
//     <div className="border border-zinc-800 rounded-xl overflow-hidden">
//       <table className="w-full text-left text-sm">
        
//         {/* Table Header */}
//         <thead className="bg-zinc-900/50 border-b border-zinc-800 text-zinc-400 font-medium">
//           <tr>
//             <th className="px-6 py-4">Variable Key</th>
//             <th className="px-6 py-4">Value</th>
//             <th className="px-6 py-4">Created At</th>
//             <th className="px-6 py-4 text-right">Actions</th>
//           </tr>
//         </thead>

//         {/* Table Body */}
//         <tbody className="divide-y divide-zinc-800 bg-black/20">
//           {secrets.map((secret) => (
//             <tr key={secret.id} className="group hover:bg-zinc-900/40 transition-colors">
              
//               {/* Column 1: KEY (e.g. STRIPE_API_KEY) */}
//               <td className="px-6 py-4 font-mono text-blue-400">
//                 <div className="flex items-center gap-2">
//                   {secret.key}
//                   <button 
//                     onClick={() => handleCopy(secret.key, secret.id)}
//                     className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-zinc-800 rounded"
//                     title="Copy Key Name"
//                   >
//                     {copiedId === secret.id ? (
//                       <Check className="w-3.5 h-3.5 text-green-500" />
//                     ) : (
//                       <Copy className="w-3.5 h-3.5 text-zinc-500" />
//                     )}
//                   </button>
//                 </div>
//               </td>

//               {/* Column 2: MASKED VALUE */}
//               <td className="px-6 py-4 font-mono text-zinc-500 flex items-center gap-2">
//                 <EyeOff className="w-4 h-4" />
//                 <span>{secret.value_masked}</span>
//               </td>

//               {/* Column 3: DATE */}
//               <td className="px-6 py-4 text-zinc-400">
//                 {new Date(secret.created_at).toLocaleDateString()}
//               </td>

//               {/* Column 4: DELETE ACTION */}
//               <td className="px-6 py-4 text-right">
//                 <button
//                   onClick={() => {
//                     if (confirm('Are you sure you want to delete this secret? The AI will no longer be able to use it.')) {
//                       onDelete(secret.id);
//                     }
//                   }}
//                   disabled={isDeleting}
//                   className="p-2 text-zinc-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
//                   title="Delete Secret"
//                 >
//                   <Trash2 className="w-4 h-4" />
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

'use client';

import { useState } from 'react';
import {
  Trash2,
  Copy,
  Check,
  EyeOff,
  Key,
} from 'lucide-react';
import { Secret } from '@/lib/types';

interface SecretTableProps {
  secrets: Secret[];
  onDelete: (id: string) => void;
  isDeleting?: boolean;
}

export default function SecretTable({
  secrets,
  onDelete,
  isDeleting = false,
}: SecretTableProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      alert('Failed to copy to clipboard');
    }
  };

  /* ---------------- Empty State ---------------- */
  if (secrets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 border border-dashed border-zinc-800 rounded-xl bg-zinc-900/30 text-center">
        <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center mb-4">
          <Key className="w-6 h-6 text-zinc-500" />
        </div>
        <h3 className="text-lg font-medium text-white">
          No Secrets Added
        </h3>
        <p className="text-zinc-500 text-sm max-w-sm mt-1">
          Add API keys (for example <code className="text-blue-400">OPENAI_API_KEY</code>) so the AI runner can authenticate.
        </p>
      </div>
    );
  }

  /* ---------------- Table ---------------- */
  return (
    <div className="border border-zinc-800 rounded-xl overflow-hidden">
      <table className="w-full text-left text-sm">
        <thead className="bg-zinc-900/50 border-b border-zinc-800 text-zinc-400 font-medium">
          <tr>
            <th className="px-6 py-4">Variable Key</th>
            <th className="px-6 py-4">Value</th>
            <th className="px-6 py-4">Created</th>
            <th className="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-zinc-800 bg-black/20">
          {secrets.map((secret) => (
            <tr
              key={secret.id}
              className="group hover:bg-zinc-900/40 transition-colors"
            >
              {/* KEY */}
              <td className="px-6 py-4 font-mono text-blue-400">
                <div className="flex items-center gap-2">
                  {secret.key}
                  <button
                    aria-label="Copy key name"
                    onClick={() => handleCopy(secret.key, secret.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-zinc-800"
                  >
                    {copiedId === secret.id ? (
                      <Check className="w-3.5 h-3.5 text-green-500" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 text-zinc-500" />
                    )}
                  </button>
                </div>
              </td>

              {/* MASKED VALUE */}
              <td className="px-6 py-4 font-mono text-zinc-500">
                <div className="flex items-center gap-2">
                  <EyeOff className="w-4 h-4" />
                  {secret.value_masked}
                </div>
              </td>

              {/* DATE */}
              <td className="px-6 py-4 text-zinc-400">
                {new Date(secret.created_at).toLocaleDateString()}
              </td>

              {/* DELETE */}
              <td className="px-6 py-4 text-right">
                <button
                  aria-label="Delete secret"
                  disabled={isDeleting}
                  onClick={() => {
                    if (
                      confirm(
                        'Are you sure you want to delete this secret? It will no longer be available to test runs.'
                      )
                    ) {
                      onDelete(secret.id);
                    }
                  }}
                  className="p-2 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-400/10 transition-colors disabled:opacity-50"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
