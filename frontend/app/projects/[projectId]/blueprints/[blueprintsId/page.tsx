// 'use client';

// import { useState, useEffect } from 'react';
// import { useParams } from 'next/navigation';
// import Link from 'next/link';
// import { 
//   ArrowLeft, 
//   CheckCircle2, 
//   XCircle, 
//   Clock, 
//   Shield, 
//   Zap, 
//   AlertTriangle,
//   Loader2,
//   Check,
//   X
// } from 'lucide-react';

// import api from '@/lib/api';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';

// // Types specific to this page
// interface TestCase {
//   id: string;
//   title: string;
//   description: string;
//   category: 'HAPPY_PATH' | 'EDGE_CASE' | 'SECURITY' | 'PERFORMANCE';
//   severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
//   endpoint: string;
//   method: string;
// }

// interface BlueprintDetail {
//   id: string;
//   name: string;
//   description: string;
//   status: 'PENDING_APPROVAL' | 'APPROVED' | 'REJECTED';
//   test_cases: TestCase[];
//   created_at: string;
// }

// export default function BlueprintDetailsPage() {
//   const params = useParams();
//   const blueprintId = params.blueprintId as string;
//   const projectId = params.projectId as string;

//   const [blueprint, setBlueprint] = useState<BlueprintDetail | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isProcessing, setIsProcessing] = useState(false);

//   // 1. Fetch Blueprint Details
//   useEffect(() => {
//     const fetchBlueprint = async () => {
//       try {
//         const { data } = await api.get(`/test-blueprints/${blueprintId}`);
//         setBlueprint(data);
//       } catch (err) {
//         console.error("Failed to fetch blueprint", err);
//         // You can add a toast error here if you have a library installed
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     if (blueprintId) fetchBlueprint();
//   }, [blueprintId]);

//   // 2. Handle Approve / Reject
//   const handleDecision = async (decision: 'APPROVED' | 'REJECTED') => {
//     setIsProcessing(true);
//     try {
//       await api.post(`/test-blueprints/${blueprintId}/approve`, {
//         status: decision
//       });
      
//       // Update local state to show the new status immediately
//       setBlueprint(prev => prev ? { ...prev, status: decision } : null);
      
//     } catch (err) {
//       console.error("Decision failed", err);
//       alert("Failed to update status. Check console.");
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   // Helper: Severity Colors
//   const getSeverityColor = (severity: string) => {
//     switch (severity) {
//       case 'CRITICAL': return 'bg-red-500/10 text-red-500 border-red-500/20';
//       case 'HIGH': return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
//       case 'MEDIUM': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
//       default: return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
//     }
//   };

//   // Helper: Category Icons
//   const getCategoryIcon = (category: string) => {
//     switch (category) {
//       case 'SECURITY': return <Shield className="w-4 h-4 text-red-400" />;
//       case 'HAPPY_PATH': return <CheckCircle2 className="w-4 h-4 text-green-400" />;
//       case 'EDGE_CASE': return <AlertTriangle className="w-4 h-4 text-orange-400" />;
//       default: return <Zap className="w-4 h-4 text-blue-400" />;
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="flex justify-center py-20">
//         <Loader2 className="w-8 h-8 animate-spin text-zinc-500" />
//       </div>
//     );
//   }

//   if (!blueprint) return <div className="text-center py-20 text-zinc-500">Blueprint not found</div>;

//   return (
//     <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
      
//       {/* HEADER & ACTIONS */}
//       <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
//         <div>
//           <Link 
//             href={`/projects/${projectId}/blueprints`}
//             className="inline-flex items-center text-sm text-zinc-500 hover:text-white transition-colors mb-4"
//           >
//             <ArrowLeft className="w-4 h-4 mr-2" />
//             Back to Blueprints
//           </Link>
//           <h1 className="text-3xl font-bold text-white">{blueprint.name}</h1>
//           <div className="flex items-center gap-3 mt-2">
//             <Badge variant="outline" className={`
//               ${blueprint.status === 'APPROVED' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 
//                 blueprint.status === 'REJECTED' ? 'bg-red-500/10 text-red-500 border-red-500/20' : 
//                 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'}
//             `}>
//               {blueprint.status.replace('_', ' ')}
//             </Badge>
//             <span className="text-zinc-500 text-sm flex items-center gap-1">
//               <Clock className="w-3.5 h-3.5" />
//               {new Date(blueprint.created_at).toLocaleString()}
//             </span>
//           </div>
//         </div>

//         {/* DECISION BUTTONS */}
//         {blueprint.status === 'PENDING_APPROVAL' && (
//           <div className="flex items-center gap-3">
//             <Button 
//               variant="destructive" 
//               className="bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/20"
//               onClick={() => handleDecision('REJECTED')}
//               disabled={isProcessing}
//             >
//               <X className="w-4 h-4 mr-2" />
//               Reject
//             </Button>
//             <Button 
//               className="bg-green-600 hover:bg-green-500 text-white"
//               onClick={() => handleDecision('APPROVED')}
//               disabled={isProcessing}
//             >
//               {isProcessing ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Check className="w-4 h-4 mr-2" />}
//               Approve Plan
//             </Button>
//           </div>
//         )}
//       </div>

//       {/* TEST CASES LIST */}
//       <div className="space-y-4">
//         <h2 className="text-xl font-semibold text-white">Generated Test Cases ({blueprint.test_cases.length})</h2>
        
//         <div className="grid gap-4">
//           {blueprint.test_cases.map((testCase) => (
//             <Card key={testCase.id} className="bg-zinc-900/40 border-zinc-800 hover:border-zinc-700 transition-colors">
//               <CardContent className="p-5">
//                 <div className="flex items-start justify-between gap-4">
                  
//                   {/* Left: Icon & Title */}
//                   <div className="flex items-start gap-4">
//                     <div className="mt-1 p-2 rounded-lg bg-zinc-800">
//                       {getCategoryIcon(testCase.category)}
//                     </div>
//                     <div>
//                       <h3 className="font-medium text-white text-base">
//                         {testCase.title}
//                       </h3>
//                       <p className="text-sm text-zinc-400 mt-1 max-w-2xl">
//                         {testCase.description}
//                       </p>
//                       <div className="flex items-center gap-3 mt-3 text-xs font-mono text-zinc-500">
//                         <span className="bg-zinc-800 px-2 py-0.5 rounded text-zinc-300">
//                           {testCase.method}
//                         </span>
//                         <span>{testCase.endpoint}</span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Right: Severity Badge */}
//                   <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${getSeverityColor(testCase.severity)}`}>
//                     {testCase.severity}
//                   </span>

//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </div>

//     </div>
//   );
// }

'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Bot,
  FileJson,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Clock,
  Loader2,
  Sparkles
} from 'lucide-react';
import { toast } from 'sonner'; // Ensure you have this or remove toast calls

import api from '@/lib/api';
import { getToken } from '@/lib/auth';
import { ApiVersion, TestBlueprint } from '@/lib/types';
import PageHeader from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function BlueprintsPage() {
  const router = useRouter();
  const params = useParams();
  const projectId = params?.projectId as string;

  // STATE
  const [versions, setVersions] = useState<ApiVersion[]>([]);
  const [selectedVersionId, setSelectedVersionId] = useState<string | null>(null);
  const [blueprints, setBlueprints] = useState<TestBlueprint[]>([]);
  const [loadingVersions, setLoadingVersions] = useState(true);
  const [loadingBlueprints, setLoadingBlueprints] = useState(false);
  
  // NEW: State for the generation loading spinner
  const [isGenerating, setIsGenerating] = useState(false);

  // AUTH GUARD
  useEffect(() => {
    const token = getToken();
    if (!token) { router.replace('/login'); return; }
    api.get('/auth/me').catch(() => router.replace('/login'));
  }, [router]);

  // FETCH VERSIONS
  useEffect(() => {
    if (!projectId) return;
    const fetchVersions = async () => {
      try {
        const { data } = await api.get(`/specs/${projectId}`);
        setVersions(data);
        if (data.length > 0) setSelectedVersionId(data[0].id);
      } catch (err) {
        console.error('Failed to load specs', err);
      } finally {
        setLoadingVersions(false);
      }
    };
    fetchVersions();
  }, [projectId]);

  // FETCH BLUEPRINTS
  const fetchBlueprints = async () => {
    if (!selectedVersionId) return;
    setLoadingBlueprints(true);
    try {
      const { data } = await api.get(`/test-blueprints/api-version/${selectedVersionId}`);
      setBlueprints(data);
    } catch (err) {
      console.error('Failed to load blueprints', err);
    } finally {
      setLoadingBlueprints(false);
    }
  };

  useEffect(() => {
    fetchBlueprints();
  }, [selectedVersionId]);

  // ----------------------------------------------------
  // NEW: HANDLE GENERATE CLICK
  // ----------------------------------------------------
  const handleGenerate = async () => {
    if (!selectedVersionId) return;
    
    setIsGenerating(true);
    try {
      // Calls the new backend endpoint
      await api.post(`/test-blueprints/generate/${selectedVersionId}`);
      
      // Refresh list to see the new blueprint
      await fetchBlueprints();
      alert("AI Plan Generated Successfully!"); 
    } catch (err) {
      console.error("Generation failed", err);
      alert("Failed to generate plan. Check Backend Console.");
    } finally {
      setIsGenerating(false);
    }
  };

  // HELPER: STATUS BADGE
  const StatusBadge = ({ status }: { status: string }) => {
    // ... (Use your existing badge code here, keeping it brief for readability)
    return <span className="text-xs border px-2 py-1 rounded-full">{status}</span>;
  };

  if (loadingVersions) return <div className="flex justify-center py-20"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader
        title="Test Blueprints"
        description="Review and approve AI-generated testing strategies."
      >
        {/* NEW: THE BUTTON IS BACK */}
        <Button 
          onClick={handleGenerate} 
          disabled={!selectedVersionId || isGenerating}
          className="bg-purple-600 hover:bg-purple-500 text-white"
        >
          {isGenerating ? (
            <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Generating...</>
          ) : (
            <><Bot className="w-4 h-4 mr-2" /> Generate New Plan</>
          )}
        </Button>
      </PageHeader>

      {/* TABS */}
      <div className="flex gap-2 mb-6 overflow-x-auto">
         {versions.map(v => (
           <button 
             key={v.id} 
             onClick={() => setSelectedVersionId(v.id)}
             className={`px-4 py-2 rounded-lg text-sm border ${selectedVersionId === v.id ? 'bg-zinc-800 text-white border-zinc-600' : 'text-zinc-500 border-transparent'}`}
           >
             {v.version}
           </button>
         ))}
      </div>

      {/* LIST */}
      {selectedVersionId && (
        <div className="space-y-4">
          {loadingBlueprints ? (
             <div className="flex justify-center py-10"><Loader2 className="animate-spin" /></div>
          ) : blueprints.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-zinc-800 rounded-xl">
               <p className="text-zinc-400 mb-4">No plans found.</p>
               {/* NEW: EMPTY STATE BUTTON */}
               <Button variant="outline" onClick={handleGenerate} disabled={isGenerating}>
                 Generate with AI
               </Button>
            </div>
          ) : (
            blueprints.map(bp => (
              <Card key={bp.id} className="p-6 flex justify-between items-center bg-zinc-900/40 border-zinc-800">
                <div>
                  <h3 className="font-semibold text-white">AI Strategy #{bp.id.slice(0,8)}</h3>
                  <div className="mt-1"><StatusBadge status={bp.status} /></div>
                </div>
                <Link href={`/projects/${projectId}/blueprints/${bp.id}`}>
                  <Button variant="secondary">View Details <ArrowRight className="w-4 h-4 ml-2"/></Button>
                </Link>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  );
}