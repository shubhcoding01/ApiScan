// 'use client';

// import { useState } from 'react';
// import { UploadCloud, FileJson, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
// import api from '@/lib/api';

// interface UploadSpecFormProps {
//   projectId: string;
//   onSuccess: () => void; // Trigger parent refresh
// }

// export default function UploadSpecForm({ projectId, onSuccess }: UploadSpecFormProps) {
  
//   const [version, setVersion] = useState('v1.0');
//   const [file, setFile] = useState<File | null>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [successMsg, setSuccessMsg] = useState<string | null>(null);

//   // 1. Handle File Selection
//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       setFile(e.target.files[0]);
//       setError(null);
//       setSuccessMsg(null);
//     }
//   };

//   // 2. Handle Submission
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!file) {
//       setError("Please select a Swagger/OpenAPI JSON file.");
//       return;
//     }

//     setIsLoading(true);
//     setError(null);
//     setSuccessMsg(null);

//     const reader = new FileReader();
    
//     // Read file as text
//     reader.onload = async (event) => {
//       try {
//         const jsonContent = event.target?.result;
//         if (typeof jsonContent !== 'string') throw new Error("Failed to read file");

//         // Validate JSON locally before sending
//         const parsedJson = JSON.parse(jsonContent);

//         // Send to Backend
//         await api.post('/specs/upload', {
//           project_id: projectId,
//           version: version,
//           spec_json: parsedJson
//         });

//         setSuccessMsg("Spec uploaded successfully! AI analysis starting...");
//         setFile(null); // Reset form
//         onSuccess();   // Refresh parent data

//       } catch (err: any) {
//         console.error("Upload error:", err);
//         if (err instanceof SyntaxError) {
//           setError("Invalid JSON file. Please check syntax.");
//         } else {
//           setError(err.response?.data?.detail || "Failed to upload spec.");
//         }
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     reader.readAsText(file);
//   };

//   return (
//     <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
//       <div className="mb-6">
//         <h3 className="text-lg font-bold text-white">Upload API Specification</h3>
//         <p className="text-sm text-zinc-400">
//           Upload your `swagger.json` or `openapi.json` file. The AI will parse this to generate test cases.
//         </p>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-4">
        
//         {/* Alerts */}
//         {error && (
//           <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg flex items-center gap-2">
//             <AlertCircle className="w-4 h-4" /> {error}
//           </div>
//         )}
//         {successMsg && (
//           <div className="p-3 bg-green-500/10 border border-green-500/20 text-green-400 text-sm rounded-lg flex items-center gap-2">
//             <CheckCircle2 className="w-4 h-4" /> {successMsg}
//           </div>
//         )}

//         {/* Version Input */}
//         <div>
//           <label className="block text-sm font-medium text-zinc-300 mb-1">
//             API Version Tag
//           </label>
//           <input
//             type="text"
//             required
//             value={version}
//             onChange={(e) => setVersion(e.target.value)}
//             placeholder="e.g. v1.2.0"
//             className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-600 focus:outline-none placeholder:text-zinc-600"
//           />
//         </div>

//         {/* File Dropzone / Input */}
//         <div className="relative border-2 border-dashed border-zinc-700 hover:border-blue-500 rounded-xl p-8 transition-colors text-center group">
//           <input
//             type="file"
//             accept=".json"
//             onChange={handleFileChange}
//             className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//           />
          
//           <div className="flex flex-col items-center pointer-events-none">
//             {file ? (
//               <>
//                 <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center mb-3">
//                   <FileJson className="w-6 h-6 text-blue-500" />
//                 </div>
//                 <p className="text-white font-medium">{file.name}</p>
//                 <p className="text-zinc-500 text-xs mt-1">
//                   {(file.size / 1024).toFixed(2)} KB
//                 </p>
//               </>
//             ) : (
//               <>
//                 <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center mb-3 group-hover:bg-zinc-700 transition-colors">
//                   <UploadCloud className="w-6 h-6 text-zinc-400" />
//                 </div>
//                 <p className="text-zinc-300 font-medium">Click to upload JSON</p>
//                 <p className="text-zinc-500 text-xs mt-1">or drag and drop file here</p>
//               </>
//             )}
//           </div>
//         </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           disabled={isLoading || !file}
//           className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center"
//         >
//           {isLoading ? (
//             <>
//               <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//               Processing Spec...
//             </>
//           ) : (
//             'Upload & Analyze'
//           )}
//         </button>
//       </form>
//     </div>
//   );
// }

'use client';

import { useRef, useState } from 'react';
import {
  UploadCloud,
  FileJson,
  AlertCircle,
  CheckCircle2,
  Loader2,
} from 'lucide-react';
import api from '@/lib/api';

interface UploadSpecFormProps {
  projectId: string;
  onSuccess: () => void;
}

const MAX_FILE_SIZE_MB = 5;

export default function UploadSpecForm({
  projectId,
  onSuccess,
}: UploadSpecFormProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [version, setVersion] = useState('v1.0');
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  /* ---------------- File Select ---------------- */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    if (selected.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setError(`File size must be under ${MAX_FILE_SIZE_MB}MB`);
      setFile(null);
      return;
    }

    setFile(selected);
    setError(null);
    setSuccessMsg(null);
  };

  /* ---------------- Submit ---------------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || isLoading) return;

    setIsLoading(true);
    setError(null);
    setSuccessMsg(null);

    const reader = new FileReader();

    reader.onload = async () => {
      try {
        if (typeof reader.result !== 'string') {
          throw new Error('File read failed');
        }

        const parsedJson = JSON.parse(reader.result);

        await api.post('/specs/upload', {
          project_id: projectId,
          version,
          spec_json: parsedJson,
        });

        setSuccessMsg(
          'Specification uploaded successfully. AI analysis has started.'
        );

        setFile(null);
        setVersion('v1.0');
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }

        onSuccess();
      } catch (err: any) {
        console.error('Spec upload failed:', err);
        if (err instanceof SyntaxError) {
          setError('Invalid JSON file. Please fix syntax errors.');
        } else {
          setError(
            err.response?.data?.detail ||
              'Failed to upload specification.'
          );
        }
      } finally {
        setIsLoading(false);
      }
    };

    reader.onerror = () => {
      setError('Unable to read file.');
      setIsLoading(false);
    };

    reader.readAsText(file);
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-white">
          Upload API Specification
        </h3>
        <p className="text-sm text-zinc-400">
          Upload an OpenAPI / Swagger JSON file. The AI will analyze and
          generate test strategies.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Alerts */}
        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            {error}
          </div>
        )}

        {successMsg && (
          <div className="p-3 bg-green-500/10 border border-green-500/20 text-green-400 text-sm rounded-lg flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            {successMsg}
          </div>
        )}

        {/* Version */}
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-1">
            API Version Tag
          </label>
          <input
            type="text"
            required
            value={version}
            onChange={(e) => setVersion(e.target.value)}
            placeholder="v1.2.0"
            className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-600 focus:outline-none placeholder:text-zinc-600"
          />
        </div>

        {/* File Input */}
        <div className="relative border-2 border-dashed border-zinc-700 hover:border-blue-500 rounded-xl p-8 transition-colors text-center group">
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />

          <div className="flex flex-col items-center pointer-events-none">
            {file ? (
              <>
                <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center mb-3">
                  <FileJson className="w-6 h-6 text-blue-500" />
                </div>
                <p className="text-white font-medium">{file.name}</p>
                <p className="text-zinc-500 text-xs mt-1">
                  {(file.size / 1024).toFixed(2)} KB
                </p>
              </>
            ) : (
              <>
                <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center mb-3 group-hover:bg-zinc-700 transition-colors">
                  <UploadCloud className="w-6 h-6 text-zinc-400" />
                </div>
                <p className="text-zinc-300 font-medium">
                  Click or drop JSON file
                </p>
                <p className="text-zinc-500 text-xs mt-1">
                  Max size: {MAX_FILE_SIZE_MB}MB
                </p>
              </>
            )}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading || !file}
          className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Analyzing Spec…
            </>
          ) : (
            'Upload & Analyze'
          )}
        </button>
      </form>
    </div>
  );
}
