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

// 'use client';

// import { useRef, useState } from 'react';
// import {
//   UploadCloud,
//   FileJson,
//   AlertCircle,
//   CheckCircle2,
//   Loader2,
// } from 'lucide-react';
// import api from '@/lib/api';

// interface UploadSpecFormProps {
//   projectId: string;
//   onSuccess: () => void;
// }

// const MAX_FILE_SIZE_MB = 5;

// export default function UploadSpecForm({
//   projectId,
//   onSuccess,
// }: UploadSpecFormProps) {
//   const fileInputRef = useRef<HTMLInputElement | null>(null);

//   const [version, setVersion] = useState('v1.0');
//   const [file, setFile] = useState<File | null>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [successMsg, setSuccessMsg] = useState<string | null>(null);

//   /* ---------------- File Select ---------------- */
//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const selected = e.target.files?.[0];
//     if (!selected) return;

//     if (selected.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
//       setError(`File size must be under ${MAX_FILE_SIZE_MB}MB`);
//       setFile(null);
//       return;
//     }

//     setFile(selected);
//     setError(null);
//     setSuccessMsg(null);
//   };

//   /* ---------------- Submit ---------------- */
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!file || isLoading) return;

//     setIsLoading(true);
//     setError(null);
//     setSuccessMsg(null);

//     const reader = new FileReader();

//     reader.onload = async () => {
//       try {
//         if (typeof reader.result !== 'string') {
//           throw new Error('File read failed');
//         }

//         const parsedJson = JSON.parse(reader.result);

//         await api.post('/specs/upload', {
//           project_id: projectId,
//           version,
//           spec_json: parsedJson,
//         });

//         setSuccessMsg(
//           'Specification uploaded successfully. AI analysis has started.'
//         );

//         setFile(null);
//         setVersion('v1.0');
//         if (fileInputRef.current) {
//           fileInputRef.current.value = '';
//         }

//         onSuccess();
//       } catch (err: any) {
//         console.error('Spec upload failed:', err);
//         if (err instanceof SyntaxError) {
//           setError('Invalid JSON file. Please fix syntax errors.');
//         } else {
//           setError(
//             err.response?.data?.detail ||
//               'Failed to upload specification.'
//           );
//         }
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     reader.onerror = () => {
//       setError('Unable to read file.');
//       setIsLoading(false);
//     };

//     reader.readAsText(file);
//   };

//   /* ---------------- UI ---------------- */
//   return (
//     <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
//       <div className="mb-6">
//         <h3 className="text-lg font-bold text-white">
//           Upload API Specification
//         </h3>
//         <p className="text-sm text-zinc-400">
//           Upload an OpenAPI / Swagger JSON file. The AI will analyze and
//           generate test strategies.
//         </p>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         {/* Alerts */}
//         {error && (
//           <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg flex items-center gap-2">
//             <AlertCircle className="w-4 h-4" />
//             {error}
//           </div>
//         )}

//         {successMsg && (
//           <div className="p-3 bg-green-500/10 border border-green-500/20 text-green-400 text-sm rounded-lg flex items-center gap-2">
//             <CheckCircle2 className="w-4 h-4" />
//             {successMsg}
//           </div>
//         )}

//         {/* Version */}
//         <div>
//           <label className="block text-sm font-medium text-zinc-300 mb-1">
//             API Version Tag
//           </label>
//           <input
//             type="text"
//             required
//             value={version}
//             onChange={(e) => setVersion(e.target.value)}
//             placeholder="v1.2.0"
//             className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-600 focus:outline-none placeholder:text-zinc-600"
//           />
//         </div>

//         {/* File Input */}
//         <div className="relative border-2 border-dashed border-zinc-700 hover:border-blue-500 rounded-xl p-8 transition-colors text-center group">
//           <input
//             ref={fileInputRef}
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
//                 <p className="text-zinc-300 font-medium">
//                   Click or drop JSON file
//                 </p>
//                 <p className="text-zinc-500 text-xs mt-1">
//                   Max size: {MAX_FILE_SIZE_MB}MB
//                 </p>
//               </>
//             )}
//           </div>
//         </div>

//         {/* Submit */}
//         <button
//           type="submit"
//           disabled={isLoading || !file}
//           className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center"
//         >
//           {isLoading ? (
//             <>
//               <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//               Analyzing Spec…
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

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  UploadCloud, 
  FileJson, 
  X, 
  Loader2, 
  AlertCircle, 
  CheckCircle2 
} from 'lucide-react';

import api from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface UploadSpecFormProps {
  projectId: string;
  onSuccess: () => void;
}

export default function UploadSpecForm({ projectId, onSuccess }: UploadSpecFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const [version, setVersion] = useState('1.0.0');
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- DRAG & DROP HANDLERS ---
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    setError(null);

    const droppedFile = e.dataTransfer.files[0];
    validateAndSetFile(droppedFile);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (selectedFile: File) => {
    // Basic validation for JSON or YAML
    const validTypes = ['application/json', 'application/x-yaml', 'text/yaml', 'text/x-yaml'];
    const validExtensions = ['.json', '.yaml', '.yml'];
    
    const fileExtension = selectedFile.name.substring(selectedFile.name.lastIndexOf('.')).toLowerCase();

    if (validTypes.includes(selectedFile.type) || validExtensions.includes(fileExtension)) {
      setFile(selectedFile);
    } else {
      setError('Please upload a valid JSON or YAML file.');
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // --- UPLOAD HANDLER ---
  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('project_id', projectId);
    formData.append('version', version);

    try {
      // Adjust the endpoint if your backend route differs (e.g., /specs/upload)
      await api.post('/specs/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Reset on success
      setFile(null);
      setVersion('1.0.0');
      onSuccess();
    } catch (err: any) {
      console.error('Upload failed', err);
      setError(err.response?.data?.detail || 'Failed to upload specification.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-5">
      
      {/* Version Input */}
      <div className="space-y-2">
        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">
          Version Tag
        </label>
        <Input 
          value={version}
          onChange={(e) => setVersion(e.target.value)}
          placeholder="e.g. 1.0.0"
          className="h-10 bg-slate-950/50 border-slate-800 text-slate-200 focus:border-blue-500/50 transition-colors font-mono text-sm"
        />
      </div>

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-sm text-red-400 flex items-start gap-2 mb-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dropzone / File Display */}
      <div 
        className={`
          relative border-2 border-dashed rounded-xl transition-all duration-200
          ${isDragging 
            ? 'border-blue-500 bg-blue-500/5 shadow-[0_0_20px_rgba(59,130,246,0.1)]' 
            : file 
              ? 'border-emerald-500/30 bg-emerald-500/5' 
              : 'border-slate-800 hover:border-slate-700 bg-slate-950/30'
          }
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input 
          type="file" 
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".json,.yaml,.yml,application/json,application/x-yaml"
          className="hidden"
        />

        <AnimatePresence mode="wait">
          {!file ? (
            <motion.div 
              key="dropzone"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-10 px-4 text-center cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 transition-colors ${isDragging ? 'bg-blue-500/20 text-blue-400' : 'bg-slate-800 text-slate-400'}`}>
                <UploadCloud className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-semibold text-slate-200 mb-1">
                Click to upload <span className="font-normal text-slate-500">or drag and drop</span>
              </h4>
              <p className="text-xs text-slate-500 font-mono">
                OpenAPI/Swagger (JSON or YAML)
              </p>
            </motion.div>
          ) : (
            <motion.div 
              key="file-preview"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="p-5 flex items-center justify-between"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-200 truncate">
                    {file.name}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {(file.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              </div>
              <button 
                onClick={(e) => {
                  e.stopPropagation(); // Prevent clicking the parent dropzone
                  handleRemoveFile();
                }}
                className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Submit Button */}
      <Button 
        onClick={handleUpload}
        disabled={!file || isUploading}
        className="w-full h-10 bg-slate-100 hover:bg-white text-slate-900 font-semibold transition-all disabled:opacity-50 disabled:bg-slate-800 disabled:text-slate-500"
      >
        {isUploading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Uploading & Parsing...
          </>
        ) : (
          <>
            <UploadCloud className="w-4 h-4 mr-2" />
            Upload Specification
          </>
        )}
      </Button>

    </div>
  );
}