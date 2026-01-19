// 'use client';

// import { useState, useEffect, useCallback } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import {
//   FileJson,
//   CheckCircle2,
//   AlertCircle,
//   Clock,
//   Loader2,
//   Download,
// } from 'lucide-react';

// import api from '@/lib/api';
// import { getToken } from '@/lib/auth';
// import { ApiVersion } from '@/lib/types';
// import PageHeader from '@/components/layout/PageHeader';
// import UploadSpecForm from '@/components/specs/UploadSpecForm';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// export default function SpecsPage() {
//   const params = useParams();
//   const router = useRouter();
//   const projectId = params.projectId as string;

//   // --------------------------------------------------
//   // STATE
//   // --------------------------------------------------
//   const [specs, setSpecs] = useState<ApiVersion[]>([]);
//   const [isLoading, setIsLoading] = useState(true);

//   // --------------------------------------------------
//   // AUTH GUARD
//   // --------------------------------------------------
//   useEffect(() => {
//     const token = getToken();
//     if (!token) {
//       router.replace('/login');
//       return;
//     }

//     api.get('/auth/me').catch(() => {
//       router.replace('/login');
//     });
//   }, [router]);

//   // --------------------------------------------------
//   // FETCH SPECS
//   // --------------------------------------------------
//   const fetchSpecs = useCallback(async () => {
//     try {
//       const { data } = await api.get(`/specs/${projectId}`);
//       setSpecs(data);
//     } catch (err) {
//       console.error('Failed to load specs', err);
//     } finally {
//       setIsLoading(false);
//     }
//   }, [projectId]);

//   useEffect(() => {
//     fetchSpecs();
//   }, [fetchSpecs]);

//   // --------------------------------------------------
//   // STATUS ICON
//   // --------------------------------------------------
//   const getStatusIcon = (status: string) => {
//     switch (status) {
//       case 'READY':
//         return <CheckCircle2 className="w-5 h-5 text-green-500" />;
//       case 'FAILED':
//         return <AlertCircle className="w-5 h-5 text-red-500" />;
//       case 'PARSING':
//         return <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />;
//       default:
//         return <Clock className="w-5 h-5 text-zinc-500" />;
//     }
//   };

//   // --------------------------------------------------
//   // RENDER
//   // --------------------------------------------------
//   return (
//     <div className="max-w-6xl mx-auto space-y-8">
//       <PageHeader
//         title="API Specifications"
//         description="Upload your OpenAPI/Swagger files. These are used by the AI to generate test strategies."
//       />

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         {/* LEFT: UPLOAD */}
//         <div className="lg:col-span-1">
//           <UploadSpecForm projectId={projectId} onSuccess={fetchSpecs} />
//         </div>

//         {/* RIGHT: VERSION HISTORY */}
//         <div className="lg:col-span-2">
//           <Card className="border-zinc-800 bg-zinc-900/30">
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2 text-lg">
//                 <FileJson className="w-5 h-5 text-blue-500" />
//                 Version History
//               </CardTitle>
//             </CardHeader>

//             <CardContent>
//               {isLoading ? (
//                 <div className="flex justify-center py-8">
//                   <Loader2 className="w-6 h-6 animate-spin text-zinc-500" />
//                 </div>
//               ) : specs.length === 0 ? (
//                 <div className="text-center py-12 text-zinc-500">
//                   No specifications uploaded yet.
//                 </div>
//               ) : (
//                 <div className="space-y-4">
//                   {specs.map((spec) => (
//                     <div
//                       key={spec.id}
//                       className="flex items-center justify-between p-4 bg-black/40 border border-zinc-800 rounded-xl hover:border-zinc-700 transition-colors"
//                     >
//                       {/* LEFT */}
//                       <div className="flex items-center gap-4">
//                         <div className="p-2 bg-zinc-800 rounded-lg">
//                           <FileJson className="w-6 h-6 text-zinc-400" />
//                         </div>

//                         <div>
//                           <div className="flex items-center gap-2">
//                             <span className="font-semibold text-white">
//                               {spec.version}
//                             </span>
//                             <span
//                               className={`text-xs px-2 py-0.5 rounded-full border ${
//                                 spec.status === 'READY'
//                                   ? 'bg-green-500/10 text-green-400 border-green-500/20'
//                                   : spec.status === 'FAILED'
//                                   ? 'bg-red-500/10 text-red-400 border-red-500/20'
//                                   : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
//                               }`}
//                             >
//                               {spec.status}
//                             </span>
//                           </div>

//                           <p className="text-xs text-zinc-500 mt-1 flex items-center gap-1">
//                             <Clock className="w-3 h-3" />
//                             {new Date(spec.created_at).toLocaleString()}
//                           </p>
//                         </div>
//                       </div>

//                       {/* RIGHT */}
//                       <div className="flex items-center gap-4">
//                         {getStatusIcon(spec.status)}

//                         <button
//                           disabled={!spec.spec_json}
//                           title={
//                             spec.spec_json
//                               ? 'Download parsed JSON'
//                               : 'Spec not parsed yet'
//                           }
//                           onClick={() => {
//                             if (!spec.spec_json) return;

//                             const blob = new Blob(
//                               [JSON.stringify(spec.spec_json, null, 2)],
//                               { type: 'application/json' }
//                             );
//                             const url = URL.createObjectURL(blob);
//                             const a = document.createElement('a');
//                             a.href = url;
//                             a.download = `spec-${spec.version}.json`;
//                             a.click();
//                             URL.revokeObjectURL(url);
//                           }}
//                           className="p-2 rounded-lg text-zinc-600 hover:text-white hover:bg-zinc-800 disabled:opacity-40"
//                         >
//                           <Download className="w-4 h-4" />
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// }


'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  FileJson,
  CheckCircle2,
  AlertCircle,
  Clock,
  Loader2,
  Download,
  Sparkles, // ✨ Added for AI
} from 'lucide-react';

import api from '@/lib/api';
import { getToken } from '@/lib/auth';
import { ApiVersion } from '@/lib/types';
import PageHeader from '@/components/layout/PageHeader';
import UploadSpecForm from '@/components/specs/UploadSpecForm';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea'; // Ensure you have this component

export default function SpecsPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.projectId as string;

  // --------------------------------------------------
  // STATE
  // --------------------------------------------------
  const [specs, setSpecs] = useState<ApiVersion[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // AI State
  const [aiPrompt, setAiPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  // --------------------------------------------------
  // AUTH GUARD
  // --------------------------------------------------
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

  // --------------------------------------------------
  // FETCH SPECS
  // --------------------------------------------------
  const fetchSpecs = useCallback(async () => {
    try {
      const { data } = await api.get(`/specs/${projectId}`);
      setSpecs(data);
    } catch (err) {
      console.error('Failed to load specs', err);
    } finally {
      setIsLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    fetchSpecs();
  }, [fetchSpecs]);

  // --------------------------------------------------
  // AI GENERATE HANDLER
  // --------------------------------------------------
  const handleAiGenerate = async () => {
    if (!aiPrompt.trim()) return;
    setIsGenerating(true);
    
    try {
      // Calls the backend endpoint we created earlier
      await api.post(`/specs/${projectId}/generate`, { 
        description: aiPrompt 
      });
      
      // Clear input and refresh list
      setAiPrompt("");
      await fetchSpecs();
      alert("✅ Swagger file generated successfully!");
      
    } catch (err: any) {
      console.error("AI Generation Failed", err);
      alert("Failed to generate spec. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  // --------------------------------------------------
  // STATUS ICON HELPER
  // --------------------------------------------------
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'READY':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'FAILED':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'PARSING':
        return <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />;
      default:
        return <Clock className="w-5 h-5 text-zinc-500" />;
    }
  };

  // --------------------------------------------------
  // RENDER
  // --------------------------------------------------
  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      <PageHeader
        title="API Specifications"
        description="Manage your API definitions. Upload a file or let AI write the Swagger for you."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: ACTIONS (AI + UPLOAD) */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* 1. AI GENERATOR CARD */}
          <Card className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-blue-500/30">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-blue-400 text-lg">
                <Sparkles className="w-5 h-5" />
                Generate with AI
              </CardTitle>
              <CardDescription className="text-zinc-400">
                Describe your API, and we'll write the Swagger spec for you.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea 
                placeholder="Ex: A Library API with Books (CRUD), Authors, and Member authentication..."
                className="bg-black/40 border-zinc-700 min-h-[100px] text-sm focus:border-blue-500/50"
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
              />
              <Button 
                onClick={handleAiGenerate} 
                disabled={isGenerating || !aiPrompt.trim()}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Writing Spec...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate Spec
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* 2. UPLOAD FORM (Existing) */}
          <UploadSpecForm projectId={projectId} onSuccess={fetchSpecs} />
        </div>

        {/* RIGHT COLUMN: VERSION HISTORY */}
        <div className="lg:col-span-2">
          <Card className="border-zinc-800 bg-zinc-900/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <FileJson className="w-5 h-5 text-zinc-500" />
                Version History
              </CardTitle>
            </CardHeader>

            <CardContent>
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin text-zinc-500" />
                </div>
              ) : specs.length === 0 ? (
                <div className="text-center py-12 text-zinc-500 border border-dashed border-zinc-800 rounded-xl">
                  <p>No specifications found.</p>
                  <p className="text-sm mt-1">Upload a file or ask AI to generate one.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {specs.map((spec) => (
                    <div
                      key={spec.id}
                      className="flex items-center justify-between p-4 bg-black/40 border border-zinc-800 rounded-xl hover:border-zinc-700 transition-colors"
                    >
                      {/* LEFT INFO */}
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-zinc-800 rounded-lg">
                          <FileJson className="w-6 h-6 text-zinc-400" />
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-white">
                              {spec.version}
                            </span>
                            <span
                              className={`text-xs px-2 py-0.5 rounded-full border ${
                                spec.status === 'READY'
                                  ? 'bg-green-500/10 text-green-400 border-green-500/20'
                                  : spec.status === 'FAILED'
                                  ? 'bg-red-500/10 text-red-400 border-red-500/20'
                                  : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                              }`}
                            >
                              {spec.status}
                            </span>
                            
                            {/* NEW: Show if AI Generated */}
                            {/* Assuming you added a 'source' field to your model, you could check it here */}
                            {/* {spec.source === 'AI_GENERATED' && (
                                <span className="text-xs bg-purple-500/10 text-purple-400 border border-purple-500/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                                    <Sparkles className="w-3 h-3" /> AI
                                </span>
                            )} */}
                          </div>

                          <p className="text-xs text-zinc-500 mt-1 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {new Date(spec.created_at).toLocaleString()}
                          </p>
                        </div>
                      </div>

                      {/* RIGHT ACTIONS */}
                      <div className="flex items-center gap-4">
                        {getStatusIcon(spec.status)}

                        <button
                          disabled={!spec.spec_json}
                          title={spec.spec_json ? 'Download parsed JSON' : 'Spec not parsed yet'}
                          onClick={() => {
                            if (!spec.spec_json) return;
                            const blob = new Blob(
                              [JSON.stringify(spec.spec_json, null, 2)],
                              { type: 'application/json' }
                            );
                            const url = URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = `spec-${spec.version}.json`;
                            a.click();
                            URL.revokeObjectURL(url);
                          }}
                          className="p-2 rounded-lg text-zinc-600 hover:text-white hover:bg-zinc-800 disabled:opacity-40 transition-colors"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}