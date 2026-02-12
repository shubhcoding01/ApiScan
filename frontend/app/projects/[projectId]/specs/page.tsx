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
//   Sparkles, // ✨ Added for AI
// } from 'lucide-react';

// import api from '@/lib/api';
// import { getToken } from '@/lib/auth';
// import { ApiVersion } from '@/lib/types';
// import PageHeader from '@/components/layout/PageHeader';
// import UploadSpecForm from '@/components/specs/UploadSpecForm';
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Textarea } from '@/components/ui/textarea'; // Ensure you have this component

// export default function SpecsPage() {
//   const params = useParams();
//   const router = useRouter();
//   const projectId = params.projectId as string;

//   // --------------------------------------------------
//   // STATE
//   // --------------------------------------------------
//   const [specs, setSpecs] = useState<ApiVersion[]>([]);
//   const [isLoading, setIsLoading] = useState(true);

//   // AI State
//   const [aiPrompt, setAiPrompt] = useState("");
//   const [isGenerating, setIsGenerating] = useState(false);

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
//   // AI GENERATE HANDLER
//   // --------------------------------------------------
//   const handleAiGenerate = async () => {
//     if (!aiPrompt.trim()) return;
//     setIsGenerating(true);
    
//     try {
//       // Calls the backend endpoint we created earlier
//       await api.post(`/specs/${projectId}/generate`, { 
//         description: aiPrompt 
//       });
      
//       // Clear input and refresh list
//       setAiPrompt("");
//       await fetchSpecs();
//       alert("✅ Swagger file generated successfully!");
      
//     } catch (err: any) {
//       console.error("AI Generation Failed", err);
//       alert("Failed to generate spec. Please try again.");
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   // --------------------------------------------------
//   // STATUS ICON HELPER
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
//     <div className="max-w-6xl mx-auto space-y-8 pb-20">
//       <PageHeader
//         title="API Specifications"
//         description="Manage your API definitions. Upload a file or let AI write the Swagger for you."
//       />

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
//         {/* LEFT COLUMN: ACTIONS (AI + UPLOAD) */}
//         <div className="lg:col-span-1 space-y-6">
          
//           {/* 1. AI GENERATOR CARD */}
//           <Card className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-blue-500/30">
//             <CardHeader className="pb-3">
//               <CardTitle className="flex items-center gap-2 text-blue-400 text-lg">
//                 <Sparkles className="w-5 h-5" />
//                 Generate with AI
//               </CardTitle>
//               <CardDescription className="text-zinc-400">
//                 Describe your API, and we'll write the Swagger spec for you.
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <Textarea 
//                 placeholder="Ex: A Library API with Books (CRUD), Authors, and Member authentication..."
//                 className="bg-black/40 border-zinc-700 min-h-[100px] text-sm focus:border-blue-500/50"
//                 value={aiPrompt}
//                 onChange={(e) => setAiPrompt(e.target.value)}
//               />
//               <Button 
//                 onClick={handleAiGenerate} 
//                 disabled={isGenerating || !aiPrompt.trim()}
//                 className="w-full bg-blue-600 hover:bg-blue-500 text-white"
//               >
//                 {isGenerating ? (
//                   <>
//                     <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//                     Writing Spec...
//                   </>
//                 ) : (
//                   <>
//                     <Sparkles className="w-4 h-4 mr-2" />
//                     Generate Spec
//                   </>
//                 )}
//               </Button>
//             </CardContent>
//           </Card>

//           {/* 2. UPLOAD FORM (Existing) */}
//           <UploadSpecForm projectId={projectId} onSuccess={fetchSpecs} />
//         </div>

//         {/* RIGHT COLUMN: VERSION HISTORY */}
//         <div className="lg:col-span-2">
//           <Card className="border-zinc-800 bg-zinc-900/30">
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2 text-lg">
//                 <FileJson className="w-5 h-5 text-zinc-500" />
//                 Version History
//               </CardTitle>
//             </CardHeader>

//             <CardContent>
//               {isLoading ? (
//                 <div className="flex justify-center py-8">
//                   <Loader2 className="w-6 h-6 animate-spin text-zinc-500" />
//                 </div>
//               ) : specs.length === 0 ? (
//                 <div className="text-center py-12 text-zinc-500 border border-dashed border-zinc-800 rounded-xl">
//                   <p>No specifications found.</p>
//                   <p className="text-sm mt-1">Upload a file or ask AI to generate one.</p>
//                 </div>
//               ) : (
//                 <div className="space-y-4">
//                   {specs.map((spec) => (
//                     <div
//                       key={spec.id}
//                       className="flex items-center justify-between p-4 bg-black/40 border border-zinc-800 rounded-xl hover:border-zinc-700 transition-colors"
//                     >
//                       {/* LEFT INFO */}
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
                            
//                             {/* NEW: Show if AI Generated */}
//                             {/* Assuming you added a 'source' field to your model, you could check it here */}
//                             {/* {spec.source === 'AI_GENERATED' && (
//                                 <span className="text-xs bg-purple-500/10 text-purple-400 border border-purple-500/20 px-2 py-0.5 rounded-full flex items-center gap-1">
//                                     <Sparkles className="w-3 h-3" /> AI
//                                 </span>
//                             )} */}
//                           </div>

//                           <p className="text-xs text-zinc-500 mt-1 flex items-center gap-1">
//                             <Clock className="w-3 h-3" />
//                             {new Date(spec.created_at).toLocaleString()}
//                           </p>
//                         </div>
//                       </div>

//                       {/* RIGHT ACTIONS */}
//                       <div className="flex items-center gap-4">
//                         {getStatusIcon(spec.status)}

//                         <button
//                           disabled={!spec.spec_json}
//                           title={spec.spec_json ? 'Download parsed JSON' : 'Spec not parsed yet'}
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
//                           className="p-2 rounded-lg text-zinc-600 hover:text-white hover:bg-zinc-800 disabled:opacity-40 transition-colors"
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

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  FileJson,
  CheckCircle2,
  AlertCircle,
  Clock,
  Loader2,
  Download,
  Sparkles,
  Bot,
  ChevronRight,
  Search,
  Bell,
  UploadCloud,
  Code2,
  Trash2,
  Eye,
  Filter,
  Calendar,
  Zap
} from 'lucide-react';

import api from '@/lib/api';
import { getToken } from '@/lib/auth';
import { ApiVersion } from '@/lib/types';
import PageHeader from '@/components/layout/PageHeader';
import UploadSpecForm from '@/components/specs/UploadSpecForm';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Status configuration
const STATUS_CONFIG = {
  READY: {
    icon: CheckCircle2,
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-900/10',
    borderColor: 'border-emerald-900/50',
    label: 'Ready'
  },
  FAILED: {
    icon: AlertCircle,
    color: 'text-red-400',
    bgColor: 'bg-red-900/10',
    borderColor: 'border-red-900/50',
    label: 'Failed'
  },
  PARSING: {
    icon: Loader2,
    color: 'text-blue-400',
    bgColor: 'bg-blue-900/10',
    borderColor: 'border-blue-900/50',
    label: 'Parsing',
    spin: true
  },
  PENDING: {
    icon: Clock,
    color: 'text-amber-400',
    bgColor: 'bg-amber-900/10',
    borderColor: 'border-amber-900/50',
    label: 'Pending'
  }
} as const;

type StatusType = keyof typeof STATUS_CONFIG;

export default function SpecsPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.projectId as string;

  // --- STATE ---
  const [specs, setSpecs] = useState<ApiVersion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'all' | 'ai' | 'manual'>('all');

  // AI State
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // --- AUTH GUARD ---
  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.replace('/login');
      return;
    }
    api.get('/auth/me').catch(() => router.replace('/login'));
  }, [router]);

  // --- FETCH SPECS ---
  const fetchSpecs = useCallback(async () => {
    try {
      setIsLoading(true);
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

  // --- AI GENERATE HANDLER ---
  const handleAiGenerate = async () => {
    if (!aiPrompt.trim()) return;
    setIsGenerating(true);
    
    try {
      await api.post(`/specs/${projectId}/generate`, { 
        description: aiPrompt 
      });
      
      setAiPrompt('');
      await fetchSpecs();
      // TODO: Replace with toast notification
      alert('✅ Swagger file generated successfully!');
      
    } catch (err: any) {
      console.error('AI Generation Failed', err);
      alert('Failed to generate spec. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  // --- DOWNLOAD HANDLER ---
  const handleDownloadSpec = useCallback((spec: ApiVersion) => {
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
  }, []);

  // --- FILTERED SPECS ---
  const filteredSpecs = useMemo(() => {
    return specs.filter(spec => {
      const matchesSearch = spec.version.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || spec.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [specs, searchQuery, statusFilter]);

  // --- STATS ---
  const stats = useMemo(() => {
    const total = specs.length;
    const ready = specs.filter(s => s.status === 'READY').length;
    const failed = specs.filter(s => s.status === 'FAILED').length;
    const parsing = specs.filter(s => s.status === 'PARSING').length;
    
    return { total, ready, failed, parsing };
  }, [specs]);

  // --- RENDER STATUS ICON ---
  const renderStatusIcon = (status: string) => {
    const config = STATUS_CONFIG[status as StatusType] || STATUS_CONFIG.PENDING;
    const Icon = config.icon;
    return <Icon className={`w-5 h-5 ${config.color} ${config.spin ? 'animate-spin' : ''}`} />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white selection:bg-blue-500/30">
      
      {/* --- NAVBAR --- */}
      <nav className="sticky top-0 z-50 border-b border-white/5 bg-slate-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Left - Breadcrumbs */}
            <div className="flex items-center gap-2 text-sm">
              <Link 
                href="/projects" 
                className="flex items-center gap-2 hover:opacity-80 transition-opacity group"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-blue-900/30 group-hover:shadow-blue-900/50 transition-shadow">
                  <Bot className="w-5 h-5" />
                </div>
                <span className="font-semibold hidden sm:block bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                  ApiScan
                </span>
              </Link>
              <ChevronRight className="w-4 h-4 text-slate-600" />
              <Link 
                href={`/projects/${projectId}`} 
                className="hover:text-white text-slate-400 transition-colors font-medium"
              >
                Project
              </Link>
              <ChevronRight className="w-4 h-4 text-slate-600" />
              <span className="text-white font-semibold">Specifications</span>
            </div>

            {/* Right - Actions */}
            <div className="flex items-center gap-3">
              <div className="relative hidden md:block w-64">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                <Input 
                  placeholder="Search specs..." 
                  className="pl-10 bg-slate-900/50 border-slate-800 h-9 focus:border-blue-500/50 transition-colors" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Button 
                variant="ghost" 
                size="icon"
                className="text-slate-400 hover:text-white hover:bg-slate-800/50"
              >
                <Bell className="w-5 h-5" />
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 rounded-full p-0">
                    <Avatar className="h-8 w-8 border border-white/10 ring-2 ring-slate-900">
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback className="bg-gradient-to-br from-blue-600 to-blue-700 text-white text-xs font-semibold">
                        JD
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-slate-950 border-slate-800 text-slate-300" align="end">
                  <DropdownMenuLabel className="text-white font-semibold">John Doe</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-slate-800" />
                  <DropdownMenuItem className="hover:bg-slate-900 cursor-pointer focus:bg-slate-900">
                    Profile Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-slate-900 cursor-pointer focus:bg-slate-900">
                    Preferences
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-slate-800" />
                  <DropdownMenuItem className="hover:bg-red-900/20 cursor-pointer text-red-400 focus:bg-red-900/20 focus:text-red-400">
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </nav>

      {/* --- MAIN CONTENT --- */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        
        {/* Header with Stats */}
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <PageHeader
            title="API Specifications"
            description="Manage your API definitions. Upload a file or let AI write the Swagger for you."
            className="mb-0 border-none pb-0"
          />

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-br from-slate-900/50 to-slate-900/30 border-slate-800/50 backdrop-blur-sm hover:border-slate-700/50 transition-colors">
              <CardContent className="pt-6 pb-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Total Specs</p>
                    <p className="text-3xl font-bold mt-2 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                      {stats.total}
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                    <FileJson className="w-6 h-6 text-blue-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-emerald-900/20 to-slate-900/30 border-emerald-800/30 backdrop-blur-sm hover:border-emerald-700/50 transition-colors">
              <CardContent className="pt-6 pb-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-emerald-400/80 uppercase tracking-wider">Ready</p>
                    <p className="text-3xl font-bold mt-2 text-emerald-400">
                      {stats.ready}
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-900/20 to-slate-900/30 border-blue-800/30 backdrop-blur-sm hover:border-blue-700/50 transition-colors">
              <CardContent className="pt-6 pb-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-blue-400/80 uppercase tracking-wider">Processing</p>
                    <p className="text-3xl font-bold mt-2 text-blue-400">
                      {stats.parsing}
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                    <Loader2 className="w-6 h-6 text-blue-400 animate-spin" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-red-900/20 to-slate-900/30 border-red-800/30 backdrop-blur-sm hover:border-red-700/50 transition-colors">
              <CardContent className="pt-6 pb-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-red-400/80 uppercase tracking-wider">Failed</p>
                    <p className="text-3xl font-bold mt-2 text-red-400">
                      {stats.failed}
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center">
                    <AlertCircle className="w-6 h-6 text-red-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
          
          {/* LEFT COLUMN: ACTIONS */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* AI Generator Card */}
            <Card className="bg-gradient-to-br from-blue-900/30 via-purple-900/20 to-slate-900/40 border-blue-500/40 shadow-xl shadow-blue-900/20 overflow-hidden relative group">
              {/* Animated background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <CardHeader className="pb-3 relative">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-blue-300 text-lg font-semibold">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                      <Sparkles className="w-4 h-4 fill-current text-blue-400" />
                    </div>
                    AI Generator
                  </CardTitle>
                  <Badge variant="outline" className="border-blue-500/50 text-blue-300 text-[10px] font-bold uppercase tracking-wider">
                    <Zap className="w-3 h-3 mr-1" />
                    Powered by AI
                  </Badge>
                </div>
                <CardDescription className="text-slate-400 text-xs mt-2">
                  Describe your API features, and our AI will generate a complete OpenAPI 3.0 specification for you.
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4 relative">
                <Textarea 
                  placeholder="Example: A Todo List API with CRUD operations, user authentication, and search filtering..."
                  className="bg-slate-950/50 border-slate-700/50 min-h-[140px] text-sm focus:border-blue-500/60 placeholder:text-slate-600 resize-none transition-colors"
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                />
                
                <Button 
                  onClick={handleAiGenerate} 
                  disabled={isGenerating || !aiPrompt.trim()}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white shadow-lg shadow-blue-900/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Generating Specification...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate Specification
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Manual Upload Section */}
            <Card className="bg-slate-900/30 border-slate-800/50 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center">
                    <UploadCloud className="w-4 h-4 text-slate-400" />
                  </div>
                  Manual Upload
                </CardTitle>
                <CardDescription className="text-xs text-slate-500">
                  Upload your own Swagger/OpenAPI file
                </CardDescription>
              </CardHeader>
              <CardContent>
                <UploadSpecForm projectId={projectId} onSuccess={fetchSpecs} />
              </CardContent>
            </Card>
          </div>

          {/* RIGHT COLUMN: SPECS LIST */}
          <div className="lg:col-span-2">
            <Card className="border-slate-800/50 bg-slate-900/30 backdrop-blur-sm min-h-[600px] overflow-hidden">
              <CardHeader className="border-b border-slate-800/50 pb-4 bg-slate-950/30">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                    <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center">
                      <FileJson className="w-5 h-5 text-slate-400" />
                    </div>
                    Version History
                  </CardTitle>
                  
                  {/* Filter Controls */}
                  <div className="flex items-center gap-2">
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-[140px] h-9 bg-slate-950/50 border-slate-800 text-sm">
                        <Filter className="w-4 h-4 mr-2 text-slate-500" />
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-950 border-slate-800">
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="READY">Ready</SelectItem>
                        <SelectItem value="PARSING">Parsing</SelectItem>
                        <SelectItem value="FAILED">Failed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-6 px-6">
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center py-24 text-slate-500">
                    <Loader2 className="w-10 h-10 animate-spin mb-4 text-blue-500" />
                    <p className="text-sm font-medium">Loading specifications...</p>
                  </div>
                ) : filteredSpecs.length === 0 ? (
                  <div className="text-center py-20 border border-dashed border-slate-800 rounded-2xl bg-slate-950/20">
                    <div className="w-16 h-16 rounded-2xl bg-slate-800/50 flex items-center justify-center mx-auto mb-4">
                      <Code2 className="w-8 h-8 text-slate-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {searchQuery || statusFilter !== 'all' ? 'No Matching Specs' : 'No Specs Found'}
                    </h3>
                    <p className="text-slate-500 text-sm max-w-xs mx-auto mb-6">
                      {searchQuery || statusFilter !== 'all' 
                        ? 'Try adjusting your search or filter criteria'
                        : 'Upload a Swagger/OpenAPI file or use the AI generator to create one'}
                    </p>
                    {(searchQuery || statusFilter !== 'all') && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setSearchQuery('');
                          setStatusFilter('all');
                        }}
                        className="border-slate-700 hover:bg-slate-800"
                      >
                        Clear Filters
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {filteredSpecs.map((spec, index) => {
                      const statusConfig = STATUS_CONFIG[spec.status as StatusType] || STATUS_CONFIG.PENDING;
                      const StatusIcon = statusConfig.icon;
                      
                      return (
                        <div
                          key={spec.id}
                          className="group flex items-center justify-between p-4 bg-slate-950/50 border border-slate-800/50 rounded-xl hover:border-slate-700 hover:bg-slate-900/60 transition-all duration-300 hover:shadow-lg hover:shadow-slate-900/50 animate-in fade-in slide-in-from-bottom-2"
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          {/* Left Info */}
                          <div className="flex items-center gap-4 flex-1 min-w-0">
                            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 group-hover:border-slate-600 transition-colors shrink-0">
                              <FileJson className="w-5 h-5 text-slate-400 group-hover:text-blue-400 transition-colors" />
                            </div>

                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-bold text-white tracking-wide truncate">
                                  {spec.version}
                                </span>
                                <Badge 
                                  variant="outline" 
                                  className={`
                                    border px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider shrink-0
                                    ${statusConfig.color} ${statusConfig.borderColor} ${statusConfig.bgColor}
                                  `}
                                >
                                  <StatusIcon className={`w-3 h-3 mr-1 ${statusConfig.spin ? 'animate-spin' : ''}`} />
                                  {statusConfig.label}
                                </Badge>
                              </div>

                              <p className="text-xs text-slate-500 flex items-center gap-1.5">
                                <Calendar className="w-3 h-3 shrink-0" />
                                <span className="truncate">
                                  Uploaded {new Date(spec.created_at).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric'
                                  })}
                                </span>
                              </p>
                            </div>
                          </div>

                          {/* Right Actions */}
                          <div className="flex items-center gap-2 ml-4 shrink-0">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-slate-400 hover:text-white hover:bg-slate-800 h-8 px-3"
                              title="View spec details"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>

                            <Button
                              variant="ghost"
                              size="sm"
                              disabled={!spec.spec_json}
                              title={spec.spec_json ? 'Download JSON' : 'Spec not parsed yet'}
                              className="text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed h-8 px-3"
                              onClick={() => handleDownloadSpec(spec)}
                            >
                              <Download className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}