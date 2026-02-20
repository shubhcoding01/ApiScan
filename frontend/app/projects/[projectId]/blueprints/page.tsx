// 'use client';

// import { useState, useEffect } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { 
//   Bot, 
//   FileJson, 
//   ArrowRight, 
//   CheckCircle2, 
//   XCircle, 
//   Clock, 
//   Loader2,
//   Sparkles // Added for AI flair
// } from 'lucide-react';

// import api from '@/lib/api';
// import { getToken } from '@/lib/auth';
// import { ApiVersion, TestBlueprint } from '@/lib/types';
// import PageHeader from '@/components/layout/PageHeader';
// import { Button } from '@/components/ui/button';
// import { Card } from '@/components/ui/card';

// export default function BlueprintsPage() {
//   const router = useRouter();
//   const params = useParams();
//   const projectId = params?.projectId as string;

//   // ----------------------------------------------------
//   // STATE
//   // ----------------------------------------------------
//   const [versions, setVersions] = useState<ApiVersion[]>([]);
//   const [selectedVersionId, setSelectedVersionId] = useState<string | null>(null);
//   const [blueprints, setBlueprints] = useState<TestBlueprint[]>([]);

//   const [loadingVersions, setLoadingVersions] = useState(true);
//   const [loadingBlueprints, setLoadingBlueprints] = useState(false);
//   const [isGenerating, setIsGenerating] = useState(false); // <--- NEW STATE

//   // ----------------------------------------------------
//   // 1. AUTH GUARD
//   // ----------------------------------------------------
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

//   // ----------------------------------------------------
//   // 2. FETCH API VERSIONS (SPECS)
//   // ----------------------------------------------------
//   useEffect(() => {
//     if (!projectId) return;

//     const fetchVersions = async () => {
//       try {
//         const { data } = await api.get(`/specs/${projectId}`);
//         setVersions(data);
        
//         if (data.length > 0) {
//           setSelectedVersionId(data[0].id);
//         }
//       } catch (err) {
//         console.error('Failed to load specs', err);
//       } finally {
//         setLoadingVersions(false);
//       }
//     };

//     fetchVersions();
//   }, [projectId]);

//   // ----------------------------------------------------
//   // 3. FETCH BLUEPRINTS FOR SELECTED VERSION
//   // ----------------------------------------------------
//   const fetchBlueprints = async () => {
//     if (!selectedVersionId) return;
    
//     setLoadingBlueprints(true);
//     try {
//       const { data } = await api.get(
//         `/test-blueprints/api-version/${selectedVersionId}`
//       );
//       setBlueprints(data);
//     } catch (err) {
//       console.error('Failed to load blueprints', err);
//     } finally {
//       setLoadingBlueprints(false);
//     }
//   };

//   useEffect(() => {
//     fetchBlueprints();
//   }, [selectedVersionId]);

//   // ----------------------------------------------------
//   // 4. HANDLE AI GENERATION (NEW)
//   // ----------------------------------------------------
//   const handleGenerate = async () => {
//     if (!selectedVersionId) return;

//     setIsGenerating(true);
//     try {
//       // Calls our new backend endpoint: POST /test-blueprints/generate/{id}
//       await api.post(`/test-blueprints/generate/${selectedVersionId}`);
      
//       // Refresh the list to show the new plan
//       await fetchBlueprints();
      
//     } catch (err) {
//       console.error('AI Generation failed', err);
//       alert('Failed to generate blueprint. Please check if your API Spec is valid.');
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   // ----------------------------------------------------
//   // STATUS BADGE
//   // ----------------------------------------------------
//   const StatusBadge = ({ status }: { status: string }) => {
//     const styles = {
//       PENDING_APPROVAL: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
//       APPROVED: 'bg-green-500/10 text-green-500 border-green-500/20',
//       REJECTED: 'bg-red-500/10 text-red-500 border-red-500/20',
//     };
    
//     const icons = {
//       PENDING_APPROVAL: Clock,
//       APPROVED: CheckCircle2,
//       REJECTED: XCircle,
//     };

//     const Icon = icons[status as keyof typeof icons] || Clock;

//     return (
//       <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${styles[status as keyof typeof styles]}`}>
//         <Icon className="w-3.5 h-3.5" />
//         {status.replace('_', ' ')}
//       </span>
//     );
//   };

//   // ----------------------------------------------------
//   // RENDER
//   // ----------------------------------------------------
//   if (loadingVersions) {
//     return (
//       <div className="flex justify-center py-20">
//         <Loader2 className="w-8 h-8 animate-spin text-zinc-500" />
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-5xl mx-auto">
//       <PageHeader 
//         title="Test Blueprints" 
//         description="Review and approve AI-generated testing strategies."
//       >
//         {/* TOP BUTTON: CONNECTED TO AI */}
//         <Button 
//           disabled={!selectedVersionId || isGenerating} 
//           onClick={handleGenerate}
//           className="bg-blue-600 hover:bg-blue-500 text-white"
//         >
//           {isGenerating ? (
//             <>
//               <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//               Generating Plan...
//             </>
//           ) : (
//             <>
//               <Sparkles className="w-4 h-4 mr-2" />
//               Generate New Plan
//             </>
//           )}
//         </Button>
//       </PageHeader>

//       {/* API VERSION TABS */}
//       {versions.length === 0 ? (
//         <div className="text-center py-12 border border-dashed border-zinc-800 rounded-xl">
//           <FileJson className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
//           <h3 className="text-lg font-medium text-white">No API Specs Found</h3>
//           <p className="text-zinc-500 text-sm mt-1">Upload a Swagger/OpenAPI file first.</p>
//           <Link href={`/projects/${projectId}/specs`} className="mt-4 inline-block text-blue-500 hover:underline">
//             Go to Specs Upload →
//           </Link>
//         </div>
//       ) : (
//         <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
//           {versions.map((v) => (
//             <button
//               key={v.id}
//               onClick={() => setSelectedVersionId(v.id)}
//               className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
//                 selectedVersionId === v.id 
//                   ? 'bg-blue-600 text-white' 
//                   : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white'
//               }`}
//             >
//               {v.version}
//               <span className="ml-2 text-xs opacity-60">
//                 {new Date(v.created_at).toLocaleDateString()}
//               </span>
//             </button>
//           ))}
//         </div>
//       )}

//       {/* BLUEPRINT LIST */}
//       {selectedVersionId && (
//         <div className="space-y-4">
//           {loadingBlueprints ? (
//             <div className="flex justify-center py-12">
//               <Loader2 className="w-6 h-6 animate-spin text-zinc-500" />
//             </div>
//           ) : blueprints.length === 0 ? (
//             <div className="text-center py-12 bg-zinc-900/30 rounded-xl border border-dashed border-zinc-800">
//               <p className="text-zinc-400">No blueprints generated for this version yet.</p>
              
//               {/* EMPTY STATE BUTTON: CONNECTED TO AI */}
//               <Button 
//                 variant="outline" 
//                 className="mt-4 border-zinc-700 hover:bg-zinc-800"
//                 onClick={handleGenerate}
//                 disabled={isGenerating}
//               >
//                 {isGenerating ? (
//                   <>
//                     <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//                     Analyzing API...
//                   </>
//                 ) : (
//                   <>
//                     <Sparkles className="w-4 h-4 mr-2 text-blue-400" />
//                     Generate with AI
//                   </>
//                 )}
//               </Button>
//             </div>
//           ) : (
//             blueprints.map((bp) => (
//               <Card key={bp.id} className="p-6 hover:border-zinc-600 transition-colors bg-zinc-900/50 border-zinc-800">
//                 <div className="flex items-start justify-between">
//                   <div className="space-y-2">
//                     <div className="flex items-center gap-3">
//                       <h3 className="text-lg font-semibold text-white">
//                         {bp.summary ? bp.summary.slice(0, 50) + (bp.summary.length > 50 ? '...' : '') : `AI Strategy #${bp.id.slice(0, 8)}`}
//                       </h3>
//                       <StatusBadge status={bp.status} />
//                     </div>
                    
//                     <p className="text-zinc-400 text-sm max-w-2xl line-clamp-2">
//                        {/* If summary exists, show full, else fallback */}
//                        {bp.summary || "AI-generated automated test strategy based on your API spec."}
//                     </p>

//                     <span className="flex items-center gap-1 text-xs text-zinc-500">
//                       <Clock className="w-3.5 h-3.5" />
//                       {new Date(bp.created_at).toLocaleString()}
//                     </span>
//                   </div>

//                   <Link href={`/projects/${projectId}/blueprints/${bp.id}`}>
//                     <Button variant="secondary" className="hover:bg-zinc-800">
//                       View Details
//                       <ArrowRight className="w-4 h-4 ml-2" />
//                     </Button>
//                   </Link>
//                 </div>
//               </Card>
//             ))
//           )}
//         </div>
//       )}
//     </div>
//   );
// }


// 'use client';

// import { useState, useEffect } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { 
//   FileJson, 
//   ArrowRight, 
//   CheckCircle2, 
//   XCircle, 
//   Clock, 
//   Loader2,
//   Sparkles,
//   Search
// } from 'lucide-react';

// import api from '@/lib/api';
// import { getToken } from '@/lib/auth';
// import { ApiVersion, TestBlueprint } from '@/lib/types';
// import PageHeader from '@/components/layout/PageHeader';
// import { Button } from '@/components/ui/button';
// import { Card } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';

// export default function BlueprintsPage() {
//   const router = useRouter();
//   const params = useParams();
//   const projectId = params?.projectId as string;

//   // ----------------------------------------------------
//   // STATE
//   // ----------------------------------------------------
//   const [versions, setVersions] = useState<ApiVersion[]>([]);
//   const [selectedVersionId, setSelectedVersionId] = useState<string | null>(null);
//   const [blueprints, setBlueprints] = useState<TestBlueprint[]>([]);

//   const [loadingVersions, setLoadingVersions] = useState(true);
//   const [loadingBlueprints, setLoadingBlueprints] = useState(false);
//   const [isGenerating, setIsGenerating] = useState(false);

//   // ----------------------------------------------------
//   // 1. AUTH GUARD
//   // ----------------------------------------------------
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

//   // ----------------------------------------------------
//   // 2. FETCH API VERSIONS (SPECS)
//   // ----------------------------------------------------
//   useEffect(() => {
//     if (!projectId) return;

//     const fetchVersions = async () => {
//       try {
//         const { data } = await api.get(`/specs/${projectId}`);
//         setVersions(data);
        
//         if (data.length > 0) {
//           // Default to the newest version (first in list)
//           setSelectedVersionId(data[0].id);
//         }
//       } catch (err) {
//         console.error('Failed to load specs', err);
//       } finally {
//         setLoadingVersions(false);
//       }
//     };

//     fetchVersions();
//   }, [projectId]);

//   // ----------------------------------------------------
//   // 3. FETCH BLUEPRINTS FOR SELECTED VERSION
//   // ----------------------------------------------------
//   const fetchBlueprints = async () => {
//     if (!selectedVersionId) return;
    
//     setLoadingBlueprints(true);
//     try {
//       const { data } = await api.get(
//         `/test-blueprints/api-version/${selectedVersionId}`
//       );
//       setBlueprints(data);
//     } catch (err) {
//       console.error('Failed to load blueprints', err);
//     } finally {
//       setLoadingBlueprints(false);
//     }
//   };

//   useEffect(() => {
//     fetchBlueprints();
//   }, [selectedVersionId]);

//   // ----------------------------------------------------
//   // 4. HANDLE AI GENERATION
//   // ----------------------------------------------------
//   const handleGenerate = async () => {
//     if (!selectedVersionId) return;

//     setIsGenerating(true);
//     try {
//       // Calls backend: POST /test-blueprints/generate/{id}
//       await api.post(`/test-blueprints/generate/${selectedVersionId}`);
      
//       // Refresh the list to show the new plan
//       await fetchBlueprints();
      
//     } catch (err) {
//       console.error('AI Generation failed', err);
//       alert('Failed to generate blueprint. Please check if your API Spec is valid.');
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   // ----------------------------------------------------
//   // HELPER: STATUS BADGE
//   // ----------------------------------------------------
//   const StatusBadge = ({ status }: { status: string }) => {
//     const styles: any = {
//       PENDING_APPROVAL: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
//       APPROVED: 'bg-green-500/10 text-green-500 border-green-500/20',
//       REJECTED: 'bg-red-500/10 text-red-500 border-red-500/20',
//     };
    
//     const icons: any = {
//       PENDING_APPROVAL: Clock,
//       APPROVED: CheckCircle2,
//       REJECTED: XCircle,
//     };

//     const Icon = icons[status] || Clock;
//     const style = styles[status] || 'bg-zinc-500/10 text-zinc-500 border-zinc-500/20';

//     return (
//       <Badge variant="outline" className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${style}`}>
//         <Icon className="w-3.5 h-3.5" />
//         {status.replace('_', ' ')}
//       </Badge>
//     );
//   };

//   // ----------------------------------------------------
//   // RENDER
//   // ----------------------------------------------------
//   if (loadingVersions) {
//     return (
//       <div className="flex justify-center py-20">
//         <Loader2 className="w-8 h-8 animate-spin text-zinc-500" />
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-5xl mx-auto space-y-8 pb-20">
//       <PageHeader 
//         title="Test Blueprints" 
//         description="Review and approve AI-generated testing strategies."
//       >
//         {/* TOP BUTTON: GENERATE */}
//         <Button 
//           disabled={!selectedVersionId || isGenerating} 
//           onClick={handleGenerate}
//           className="bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20"
//         >
//           {isGenerating ? (
//             <>
//               <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//               Generating Plan...
//             </>
//           ) : (
//             <>
//               <Sparkles className="w-4 h-4 mr-2" />
//               Generate New Plan
//             </>
//           )}
//         </Button>
//       </PageHeader>

//       {/* API VERSION TABS */}
//       {versions.length === 0 ? (
//         <div className="text-center py-12 border border-dashed border-zinc-800 rounded-xl bg-zinc-900/30">
//           <FileJson className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
//           <h3 className="text-lg font-medium text-white">No API Specs Found</h3>
//           <p className="text-zinc-500 text-sm mt-1">Upload a Swagger/OpenAPI file first to generate tests.</p>
//           <Link href={`/projects/${projectId}/specs`} className="mt-4 inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors">
//             Go to Specs Upload <ArrowRight className="w-4 h-4 ml-1" />
//           </Link>
//         </div>
//       ) : (
//         <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
//           {versions.map((v) => (
//             <button
//               key={v.id}
//               onClick={() => setSelectedVersionId(v.id)}
//               className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap border ${
//                 selectedVersionId === v.id 
//                   ? 'bg-zinc-800 text-white border-zinc-700 shadow-sm' 
//                   : 'bg-transparent text-zinc-500 border-transparent hover:text-zinc-300 hover:bg-zinc-900'
//               }`}
//             >
//               <div className="flex items-center gap-2">
//                 <FileJson className="w-4 h-4" />
//                 {v.version || 'v1.0.0'}
//                 <span className="text-xs opacity-50 ml-1 font-normal">
//                     • {new Date(v.created_at).toLocaleDateString()}
//                 </span>
//               </div>
//             </button>
//           ))}
//         </div>
//       )}

//       {/* BLUEPRINT LIST */}
//       {selectedVersionId && (
//         <div className="space-y-4">
//           {loadingBlueprints ? (
//             <div className="flex flex-col items-center justify-center py-12 text-zinc-500">
//               <Loader2 className="w-6 h-6 animate-spin mb-2" />
//               <p>Loading blueprints...</p>
//             </div>
//           ) : blueprints.length === 0 ? (
//             <div className="text-center py-16 bg-zinc-900/20 rounded-xl border border-dashed border-zinc-800">
//               <Sparkles className="w-10 h-10 text-zinc-700 mx-auto mb-3" />
//               <h3 className="text-lg font-medium text-white">No blueprints yet</h3>
//               <p className="text-zinc-500 mb-6">Generate your first AI testing strategy for this version.</p>
              
//               <Button 
//                 variant="outline" 
//                 className="border-zinc-700 hover:bg-zinc-800 text-zinc-300"
//                 onClick={handleGenerate}
//                 disabled={isGenerating}
//               >
//                 Generate Now
//               </Button>
//             </div>
//           ) : (
//             blueprints.map((bp) => {
//                 // 👇 FIX: CORRECTLY EXTRACT SUMMARY FROM NESTED JSON
//                 const strategy = bp.ai_strategy_json as any || {};
//                 const summary = strategy.summary || `Strategy #${bp.id.slice(0, 8)}`;
//                 const scenarioCount = strategy.test_scenarios?.length || 0;

//                 return (
//                   <Card key={bp.id} className="group p-0 hover:border-zinc-600 transition-all duration-200 bg-zinc-900/40 border-zinc-800 overflow-hidden">
//                     <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
//                       <div className="space-y-3 flex-1 min-w-0">
//                         <div className="flex items-center gap-3 flex-wrap">
//                           <StatusBadge status={bp.status} />
//                           <span className="flex items-center gap-1.5 text-xs text-zinc-500 bg-zinc-900 px-2 py-1 rounded border border-zinc-800">
//                              <Clock className="w-3 h-3" />
//                              {new Date(bp.created_at).toLocaleString()}
//                           </span>
//                         </div>
                        
//                         <div>
//                             <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors truncate">
//                                 {summary}
//                             </h3>
//                             <p className="text-zinc-400 text-sm mt-1 line-clamp-2">
//                                 Generated {scenarioCount} test scenarios covering happy paths, edge cases, and security checks.
//                             </p>
//                         </div>
//                       </div>

//                       <div className="flex items-center gap-4 shrink-0">
//                          <div className="hidden md:block text-right">
//                             <div className="text-2xl font-bold text-white">{scenarioCount}</div>
//                             <div className="text-xs text-zinc-500 uppercase tracking-wider">Scenarios</div>
//                          </div>
                         
//                          <div className="h-10 w-px bg-zinc-800 hidden md:block" />

//                          <Link href={`/projects/${projectId}/blueprints/${bp.id}`}>
//                             <Button className="bg-white text-black hover:bg-zinc-200">
//                               View Strategy
//                               <ArrowRight className="w-4 h-4 ml-2" />
//                             </Button>
//                          </Link>
//                       </div>
//                     </div>
//                   </Card>
//                 );
//             })
//           )}
//         </div>
//       )}
//     </div>
//   );
// }


'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  FileJson, 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Loader2,
  Sparkles,
  Search,
  Bot,
  ChevronRight,
  Bell,
  Settings,
  LogOut,
  User,
  Calendar
} from 'lucide-react';

import api from '@/lib/api';
import { getToken } from '@/lib/auth';
import { ApiVersion, TestBlueprint } from '@/lib/types';
import PageHeader from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function BlueprintsPage() {
  const router = useRouter();
  const params = useParams();
  const projectId = params?.projectId as string;

  // --- STATE ---
  const [versions, setVersions] = useState<ApiVersion[]>([]);
  const [selectedVersionId, setSelectedVersionId] = useState<string | null>(null);
  const [blueprints, setBlueprints] = useState<TestBlueprint[]>([]);

  const [loadingVersions, setLoadingVersions] = useState(true);
  const [loadingBlueprints, setLoadingBlueprints] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // --- AUTH GUARD ---
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

  // --- FETCH API VERSIONS (SPECS) ---
  useEffect(() => {
    if (!projectId) return;

    const fetchVersions = async () => {
      try {
        const { data } = await api.get(`/specs/${projectId}`);
        setVersions(data);
        
        if (data.length > 0) {
          // Default to the newest version (first in list)
          setSelectedVersionId(data[0].id);
        }
      } catch (err) {
        console.error('Failed to load specs', err);
      } finally {
        setLoadingVersions(false);
      }
    };

    fetchVersions();
  }, [projectId]);

  // --- FETCH BLUEPRINTS FOR SELECTED VERSION ---
  const fetchBlueprints = async () => {
    if (!selectedVersionId) return;
    
    setLoadingBlueprints(true);
    try {
      const { data } = await api.get(
        `/test-blueprints/api-version/${selectedVersionId}`
      );
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

  // --- HANDLE AI GENERATION ---
  const handleGenerate = async () => {
    if (!selectedVersionId) return;

    setIsGenerating(true);
    try {
      // Calls backend: POST /test-blueprints/generate/{id}
      await api.post(`/test-blueprints/generate/${selectedVersionId}`);
      
      // Refresh the list to show the new plan
      await fetchBlueprints();
      
    } catch (err) {
      console.error('AI Generation failed', err);
      alert('Failed to generate blueprint. Please check if your API Spec is valid.');
    } finally {
      setIsGenerating(false);
    }
  };

  // --- HELPER: STATUS BADGE ---
  const StatusBadge = ({ status }: { status: string }) => {
    const styles: any = {
      PENDING_APPROVAL: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
      APPROVED: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      REJECTED: 'bg-red-500/10 text-red-400 border-red-500/30',
    };
    
    const icons: any = {
      PENDING_APPROVAL: Clock,
      APPROVED: CheckCircle2,
      REJECTED: XCircle,
    };

    const Icon = icons[status] || Clock;
    const style = styles[status] || 'bg-slate-500/10 text-slate-400 border-slate-500/30';

    return (
      <Badge variant="outline" className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${style}`}>
        <Icon className="w-3.5 h-3.5" />
        {status.replace('_', ' ')}
      </Badge>
    );
  };

  // --- RENDER ---
  if (loadingVersions) {
    return (
      <div className="min-h-screen bg-[#020617] flex justify-center items-center">
        <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-sans selection:bg-blue-500/30">
      
      {/* --- NAVBAR --- */}
      <nav className="sticky top-0 z-50 border-b border-white/5 bg-[#020617]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          
          {/* Left: Brand & Breadcrumbs */}
          <div className="flex items-center gap-2 text-sm">
            <Link href="/projects" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/20">
                <Bot className="h-5 w-5 text-white" />
                <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-white/20" />
              </div>
              <span className="font-bold text-white hidden sm:block">ApiScan</span>
            </Link>
            <ChevronRight className="w-4 h-4 text-slate-600" />
            <Link href={`/projects/${projectId}`} className="text-slate-400 hover:text-white transition-colors">
              Project
            </Link>
            <ChevronRight className="w-4 h-4 text-slate-600" />
            <span className="font-medium text-white">Blueprints</span>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex relative w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
                <input 
                    type="text" 
                    placeholder="Search..." 
                    className="h-9 w-full bg-slate-900/50 border border-slate-800 rounded-full pl-9 pr-4 text-sm text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 placeholder:text-slate-600 transition-all"
                />
            </div>

            <button className="p-2 text-slate-400 hover:text-white transition-colors relative">
                <Bell className="w-5 h-5" />
            </button>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full ring-2 ring-slate-800 hover:ring-slate-700 transition-all p-0">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback className="bg-slate-800 text-slate-400">JD</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-[#0B1120] border-slate-800 text-slate-300" align="end">
                  <DropdownMenuLabel className="text-white">John Doe</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-slate-800" />
                  <DropdownMenuItem className="focus:bg-slate-800 focus:text-white cursor-pointer">
                    <User className="mr-2 h-4 w-4" /> Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem className="focus:bg-slate-800 focus:text-white cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" /> Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-slate-800" />
                  <DropdownMenuItem className="text-red-400 focus:bg-red-950/20 focus:text-red-300 cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" /> Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
          </div>
        </div>
      </nav>

      {/* --- MAIN CONTENT --- */}
      <main className="max-w-6xl mx-auto px-6 py-10 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="flex-1">
            <div className="mb-0 pb-0">
              <PageHeader 
                title="Test Blueprints" 
                description="Review and approve AI-generated testing strategies based on your API specs."
              />
            </div>
          </div>
          
          <Button 
            disabled={!selectedVersionId || isGenerating} 
            onClick={handleGenerate}
            className="bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20 transition-all font-medium h-10"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating Plan...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Generate New Plan
              </>
            )}
          </Button>
        </div>

        {/* API VERSION TABS */}
        {versions.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-slate-800 rounded-2xl bg-slate-900/30">
            <FileJson className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white">No API Specs Found</h3>
            <p className="text-slate-400 text-sm mt-1 max-w-sm mx-auto">Upload a Swagger/OpenAPI file first to generate testing strategies.</p>
            <Link href={`/projects/${projectId}/specs`}>
              <Button variant="outline" className="mt-6 border-slate-700 text-slate-300 hover:text-white">
                Go to Specs Upload <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide border-b border-slate-800/50">
            {versions.map((v) => (
              <button
                key={v.id}
                onClick={() => setSelectedVersionId(v.id)}
                className={`px-4 py-2.5 rounded-t-lg text-sm font-medium transition-all whitespace-nowrap border-b-2 ${
                  selectedVersionId === v.id 
                    ? 'border-blue-500 text-blue-400 bg-blue-500/5' 
                    : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <FileJson className="w-4 h-4" />
                  {v.version || 'v1.0.0'}
                  <span className="text-[10px] opacity-60 ml-1 font-mono uppercase">
                      {new Date(v.created_at).toLocaleDateString()}
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* BLUEPRINT LIST */}
        {selectedVersionId && (
          <div className="space-y-4 pt-4">
            {loadingBlueprints ? (
              <div className="flex flex-col items-center justify-center py-20 text-slate-500">
                <Loader2 className="w-8 h-8 animate-spin mb-3 text-blue-500" />
                <p>Loading blueprints...</p>
              </div>
            ) : blueprints.length === 0 ? (
              <div className="text-center py-20 bg-slate-900/20 rounded-2xl border border-dashed border-slate-800">
                <Sparkles className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">No blueprints yet</h3>
                <p className="text-slate-500 max-w-sm mx-auto mb-8">Generate your first AI testing strategy for this API version.</p>
                
                <Button 
                  className="bg-white text-black hover:bg-slate-200"
                  onClick={handleGenerate}
                  disabled={isGenerating}
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate Strategy Now
                </Button>
              </div>
            ) : (
              <div className="grid gap-4">
                {blueprints.map((bp, index) => {
                  const strategy = bp.ai_strategy_json as any || {};
                  const summary = strategy.summary || `Strategy #${bp.id.slice(0, 8)}`;
                  const scenarioCount = strategy.test_scenarios?.length || 0;

                  return (
                    <motion.div
                      key={bp.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Card className="group p-0 hover:border-slate-700 transition-all duration-300 bg-slate-900/40 border-slate-800 overflow-hidden shadow-lg hover:shadow-xl">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-transparent to-blue-600/0 opacity-0 group-hover:opacity-5 transition-opacity" />
                        
                        <div className="relative p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                          
                          {/* Info Section */}
                          <div className="space-y-3 flex-1 min-w-0">
                            <div className="flex items-center gap-3 flex-wrap">
                              <StatusBadge status={bp.status} />
                              <span className="flex items-center gap-1.5 text-xs text-slate-400 font-mono bg-slate-950 px-2 py-1 rounded border border-slate-800">
                                 <Calendar className="w-3 h-3 text-slate-500" />
                                 {new Date(bp.created_at).toLocaleString()}
                              </span>
                            </div>
                            
                            <div>
                                <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors truncate">
                                    {summary}
                                </h3>
                                <p className="text-slate-400 text-sm mt-1 line-clamp-2 leading-relaxed max-w-3xl">
                                    Generated {scenarioCount} intelligent test scenarios covering happy paths, edge cases, and security vulnerabilities.
                                </p>
                            </div>
                          </div>

                          {/* Action Section */}
                          <div className="flex items-center gap-6 shrink-0">
                             <div className="hidden md:block text-right">
                                <div className="text-3xl font-bold text-slate-200">{scenarioCount}</div>
                                <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mt-0.5">Scenarios</div>
                             </div>
                             
                             <div className="h-12 w-px bg-slate-800 hidden md:block" />

                             <Link href={`/projects/${projectId}/blueprints/${bp.id}`}>
                                <Button className="bg-white text-black hover:bg-slate-200 shadow-md transition-transform hover:scale-105">
                                  View Strategy
                                  <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                             </Link>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}