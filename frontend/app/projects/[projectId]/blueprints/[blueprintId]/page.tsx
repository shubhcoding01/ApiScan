// 'use client';

// import { useState, useEffect } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import { 
//   ArrowLeft, 
//   CheckCircle2, 
//   Shield, 
//   Search,
//   ChevronDown,
//   ChevronRight,
//   Play,
//   Loader2,
//   AlertTriangle,
//   FileJson
// } from 'lucide-react';

// import api from '@/lib/api';
// import { TestBlueprint } from '@/lib/types';
// import PageHeader from '@/components/layout/PageHeader';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';

// export default function BlueprintDetailsPage() {
//   const router = useRouter();
//   const params = useParams();
  
//   // Safe Access to Params
//   const projectId = params?.projectId as string;
//   const blueprintId = params?.blueprintId as string;

//   // --- STATE ---
//   const [blueprint, setBlueprint] = useState<TestBlueprint | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [expandedScenario, setExpandedScenario] = useState<string | null>(null);
  
//   // NEW: State for the Run Button
//   const [isRunning, setIsRunning] = useState(false);

//   // --- FETCH DATA ---
//   useEffect(() => {
//     if (!blueprintId) return;

//     const fetchBlueprint = async () => {
//       try {
//         const { data } = await api.get(`/test-blueprints/${blueprintId}`);
//         setBlueprint(data);
        
//         // Auto-expand first scenario
//         if (data.ai_strategy_json?.test_scenarios?.length > 0) {
//           setExpandedScenario(data.ai_strategy_json.test_scenarios[0].id);
//         }
//       } catch (err) {
//         console.error('Failed to load blueprint', err);
//         setError('Could not load the blueprint details.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBlueprint();
//   }, [blueprintId]);

//   // --- UPDATED: RUN TESTS LOGIC (REDIRECTION) ---
//   const handleRunTests = async () => {
//     if (!blueprintId) return;
    
//     setIsRunning(true);
//     try {
//       // 1. Call the backend execution endpoint
//       const { data } = await api.post(`/test-blueprints/${blueprintId}/run`);
      
//       // 2. Redirect to Results Page immediately
//       const runId = data.id;
//       if (runId) {
//         router.push(`/projects/${projectId}/test-runs/${runId}`);
//       } else {
//         throw new Error("No Run ID returned from backend");
//       }
      
//     } catch (err: any) {
//       console.error('Run failed', err);
//       const msg = err.response?.data?.detail || 'Failed to execute tests.';
//       alert(`❌ Error: ${msg}`);
//       setIsRunning(false); // Only stop loading on error (on success we navigate away)
//     }
//   };

//   // --- LOADING STATE ---
//   if (loading) return (
//     <div className="flex flex-col items-center justify-center min-h-[50vh]">
//       <Loader2 className="w-8 h-8 animate-spin text-zinc-500 mb-4" />
//       <p className="text-zinc-400">Loading Strategy...</p>
//     </div>
//   );

//   // --- ERROR STATE ---
//   if (error || !blueprint) return (
//     <div className="flex flex-col items-center justify-center min-h-[50vh]">
//       <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
//       <h3 className="text-xl font-bold text-white mb-2">Error Loading Blueprint</h3>
//       <p className="text-zinc-400 mb-6">{error || 'Blueprint not found'}</p>
//       <Button variant="outline" onClick={() => router.back()}>
//         <ArrowLeft className="w-4 h-4 mr-2" />
//         Go Back
//       </Button>
//     </div>
//   );

//   const strategy = blueprint.ai_strategy_json || {};
//   const scenarios = strategy.test_scenarios || [];
//   const summary = strategy.summary || `Strategy #${blueprint.id.slice(0, 8)}`;

//   return (
//     <div className="max-w-5xl mx-auto space-y-8 pb-20">
      
//       {/* HEADER */}
//       <div>
//         <Button 
//           variant="ghost" 
//           className="mb-4 pl-0 hover:bg-transparent text-zinc-400 hover:text-white"
//           onClick={() => router.back()}
//         >
//           <ArrowLeft className="w-4 h-4 mr-2" />
//           Back to Blueprints
//         </Button>
        
//         <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
//             <div className="mb-0 border-b-0 pb-0">
//                 <PageHeader 
//                     title={summary.length > 60 ? summary.slice(0, 60) + '...' : summary}
//                     description={`Generated on ${new Date(blueprint.created_at).toLocaleString()}`}
//                 />
//             </div>
            
//             {/* UPDATED RUN BUTTON */}
//             <Button 
//                 onClick={handleRunTests} 
//                 disabled={isRunning}
//                 className="bg-green-600 hover:bg-green-500 text-white shrink-0 shadow-lg shadow-green-900/20"
//             >
//                 {isRunning ? (
//                     <>
//                         <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//                         Starting Run...
//                     </>
//                 ) : (
//                     <>
//                         <Play className="w-4 h-4 mr-2 fill-current" />
//                         Approve & Run Tests
//                     </>
//                 )}
//             </Button>
//         </div>
//       </div>

//       {/* STATS */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         <StatCard 
//           icon={<Search className="w-6 h-6" />} 
//           label="Total Scenarios" 
//           value={scenarios.length} 
//           color="blue" 
//         />
//         <StatCard 
//           icon={<Shield className="w-6 h-6" />} 
//           label="Security Tests" 
//           value={scenarios.filter((s: any) => s.category === 'SECURITY').length} 
//           color="red" 
//         />
//         <StatCard 
//           icon={<CheckCircle2 className="w-6 h-6" />} 
//           label="Happy Paths" 
//           value={scenarios.filter((s: any) => s.category === 'HAPPY_PATH').length} 
//           color="green" 
//         />
//       </div>

//       {/* SCENARIOS LIST */}
//       <div className="space-y-4">
//         <div className="flex items-center justify-between">
//             <h2 className="text-xl font-bold text-white flex items-center gap-2">
//                 <FileJson className="w-5 h-5 text-zinc-500" />
//                 Test Scenarios
//             </h2>
//             <span className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">
//                 Execution Plan
//             </span>
//         </div>
        
//         {scenarios.length === 0 ? (
//           <div className="p-12 text-center border border-dashed border-zinc-800 rounded-xl bg-zinc-900/30">
//             <p className="text-zinc-500">No test scenarios found in this strategy.</p>
//           </div>
//         ) : (
//           scenarios.map((scenario: any) => (
//             <ScenarioItem 
//               key={scenario.id} 
//               scenario={scenario} 
//               isExpanded={expandedScenario === scenario.id}
//               onToggle={() => setExpandedScenario(expandedScenario === scenario.id ? null : scenario.id)}
//             />
//           ))
//         )}
//       </div>
//     </div>
//   );
// }

// // --- SUB-COMPONENTS ---

// function StatCard({ icon, label, value, color }: any) {
//   const colors: any = {
//     blue: "bg-blue-500/10 text-blue-500 border-blue-500/20",
//     red: "bg-red-500/10 text-red-500 border-red-500/20",
//     green: "bg-green-500/10 text-green-500 border-green-500/20"
//   };

//   return (
//     <Card className="bg-zinc-900/50 border-zinc-800">
//         <CardContent className="pt-6 flex items-center gap-4">
//             <div className={`p-3 rounded-xl border ${colors[color]}`}>
//                 {icon}
//             </div>
//             <div>
//                 <p className="text-sm text-zinc-400 font-medium">{label}</p>
//                 <p className="text-2xl font-bold text-white">{value}</p>
//             </div>
//         </CardContent>
//     </Card>
//   );
// }

// function ScenarioItem({ scenario, isExpanded, onToggle }: any) {
//   const severityColor = {
//       CRITICAL: 'text-red-400 border-red-900/50 bg-red-900/20',
//       HIGH: 'text-orange-400 border-orange-900/50 bg-orange-900/20',
//       MEDIUM: 'text-yellow-400 border-yellow-900/50 bg-yellow-900/20',
//       LOW: 'text-blue-400 border-blue-900/50 bg-blue-900/20',
//   }[scenario.severity as string] || 'text-zinc-400 border-zinc-800 bg-zinc-900';

//   return (
//     <div className={`border transition-all duration-200 rounded-lg overflow-hidden ${isExpanded ? 'border-zinc-700 bg-zinc-900' : 'border-zinc-800 bg-zinc-900/30'}`}>
//         <div 
//             className="p-4 flex items-center justify-between cursor-pointer hover:bg-zinc-800/50 transition-colors"
//             onClick={onToggle}
//         >
//             <div className="flex items-center gap-4 overflow-hidden w-full">
//                 {isExpanded ? <ChevronDown className="w-5 h-5 text-zinc-500 shrink-0" /> : <ChevronRight className="w-5 h-5 text-zinc-500 shrink-0" />}
                
//                 <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 w-full min-w-0">
//                     <div className="flex items-center gap-3 min-w-0">
//                         <Badge variant="outline" className={`${severityColor} border px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider shrink-0`}>
//                             {scenario.severity}
//                         </Badge>
//                         <span className="font-medium text-zinc-200 truncate">{scenario.title}</span>
//                     </div>
                    
//                     <div className="hidden md:flex items-center gap-2 text-xs text-zinc-500 font-mono ml-auto mr-4">
//                         <span className={`px-1.5 py-0.5 rounded ${getMethodColor(scenario.method)} text-zinc-950 font-bold`}>
//                             {scenario.method}
//                         </span>
//                         <span className="truncate max-w-[200px]">{scenario.endpoint}</span>
//                     </div>
//                 </div>
//             </div>
//         </div>

//         {isExpanded && (
//             <div className="border-t border-zinc-800 bg-black/40 p-6 space-y-6 animate-in slide-in-from-top-2 duration-200">
//                 <div className="flex items-start gap-4">
//                     <div className="p-2 bg-zinc-900 rounded border border-zinc-800">
//                         <Search className="w-4 h-4 text-zinc-500" />
//                     </div>
//                     <div>
//                         <h4 className="text-sm font-medium text-zinc-300 mb-1">Scenario Logic</h4>
//                         <p className="text-zinc-400 text-sm leading-relaxed">{scenario.description}</p>
//                     </div>
//                 </div>
                
//                 <div className="rounded-lg border border-zinc-800 overflow-hidden bg-zinc-900/50">
//                     <table className="w-full text-sm text-left">
//                         <thead className="bg-zinc-900 text-zinc-400 font-medium border-b border-zinc-800">
//                             <tr>
//                                 <th className="p-3 pl-4 w-1/3">Test Case</th>
//                                 <th className="p-3 w-32">Expected</th>
//                                 <th className="p-3">Payload / Params</th>
//                             </tr>
//                         </thead>
//                         <tbody className="divide-y divide-zinc-800">
//                             {scenario.test_cases?.map((tc: any, idx: number) => (
//                                 <tr key={idx} className="hover:bg-zinc-800/30 transition-colors">
//                                     <td className="p-3 pl-4">
//                                         <div className="font-medium text-zinc-300">{tc.name}</div>
//                                         {/* Fallback for mobile view of method/endpoint */}
//                                         <div className="md:hidden text-xs text-zinc-500 mt-1 font-mono">
//                                             {tc.endpoint || scenario.endpoint}
//                                         </div>
//                                     </td>
//                                     <td className="p-3">
//                                         <Badge variant="outline" className="font-mono text-xs border-green-900/50 text-green-400 bg-green-900/10">
//                                             Status {tc.expected_status}
//                                         </Badge>
//                                     </td>
//                                     <td className="p-3 font-mono text-xs text-zinc-500">
//                                         {renderPayload(tc)}
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         )}
//     </div>
//   );
// }

// function renderPayload(tc: any) {
//     if (tc.body) return <span className="text-zinc-400">{JSON.stringify(tc.body)}</span>;
//     if (tc.query_params) return <span className="text-zinc-400">?{new URLSearchParams(tc.query_params).toString()}</span>;
//     return <span className="opacity-30 italic">No payload</span>;
// }

// function getMethodColor(method: string) {
//     switch (method?.toUpperCase()) {
//         case 'GET': return 'bg-blue-400';
//         case 'POST': return 'bg-green-400';
//         case 'PUT': return 'bg-orange-400';
//         case 'DELETE': return 'bg-red-400';
//         case 'PATCH': return 'bg-yellow-400';
//         default: return 'bg-zinc-400';
//     }
// }



// 'use client';

// import { useState, useEffect } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import { 
//   ArrowLeft, 
//   CheckCircle2, 
//   Shield, 
//   Search,
//   ChevronDown,
//   ChevronRight,
//   Play,
//   Loader2,
//   AlertTriangle,
//   FileJson,
//   XCircle // Added XCircle icon
// } from 'lucide-react';

// import api from '@/lib/api';
// import { TestBlueprint } from '@/lib/types';
// import PageHeader from '@/components/layout/PageHeader';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';

// export default function BlueprintDetailsPage() {
//   const router = useRouter();
//   const params = useParams();
  
//   const projectId = params?.projectId as string;
//   const blueprintId = params?.blueprintId as string;

//   // --- STATE ---
//   const [blueprint, setBlueprint] = useState<TestBlueprint | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [pageError, setPageError] = useState(''); // Errors loading the page
//   const [executionError, setExecutionError] = useState<string | null>(null); // Errors running the test
//   const [expandedScenario, setExpandedScenario] = useState<string | null>(null);
  
//   const [isRunning, setIsRunning] = useState(false);

//   // --- FETCH DATA ---
//   useEffect(() => {
//     if (!blueprintId) return;

//     const fetchBlueprint = async () => {
//       try {
//         const { data } = await api.get(`/test-blueprints/${blueprintId}`);
//         setBlueprint(data);
        
//         if (data.ai_strategy_json?.test_scenarios?.length > 0) {
//           setExpandedScenario(data.ai_strategy_json.test_scenarios[0].id);
//         }
//       } catch (err) {
//         console.error('Failed to load blueprint', err);
//         setPageError('Could not load the blueprint details.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBlueprint();
//   }, [blueprintId]);

//   // --- RUN TESTS LOGIC ---
//   const handleRunTests = async () => {
//     if (!blueprintId) return;
    
//     setIsRunning(true);
//     setExecutionError(null); // Clear previous errors

//     try {
//       const { data } = await api.post(`/test-blueprints/${blueprintId}/run`);
      
//       const runId = data.id;
//       if (runId) {
//         router.push(`/projects/${projectId}/test-runs/${runId}`);
//       } else {
//         throw new Error("Backend responded, but no Run ID was found.");
//       }
      
//     } catch (err: any) {
//       console.error('Run failed', err);
//       // Extract the specific error message from Backend
//       const msg = err.response?.data?.detail || err.message || 'Failed to initiate test execution.';
//       setExecutionError(msg); // Show the error in the UI, not an alert
//       setIsRunning(false);
//     }
//   };

//   // --- LOADING STATE ---
//   if (loading) return (
//     <div className="flex flex-col items-center justify-center min-h-[50vh]">
//       <Loader2 className="w-8 h-8 animate-spin text-zinc-500 mb-4" />
//       <p className="text-zinc-400">Loading Strategy...</p>
//     </div>
//   );

//   // --- PAGE LOAD ERROR ---
//   if (pageError || !blueprint) return (
//     <div className="flex flex-col items-center justify-center min-h-[50vh]">
//       <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
//       <h3 className="text-xl font-bold text-white mb-2">Error Loading Blueprint</h3>
//       <p className="text-zinc-400 mb-6">{pageError || 'Blueprint not found'}</p>
//       <Button variant="outline" onClick={() => router.back()}>
//         <ArrowLeft className="w-4 h-4 mr-2" />
//         Go Back
//       </Button>
//     </div>
//   );

//   const strategy = blueprint.ai_strategy_json || {};
//   const scenarios = strategy.test_scenarios || [];
//   const summary = strategy.summary || `Strategy #${blueprint.id.slice(0, 8)}`;

//   return (
//     <div className="max-w-5xl mx-auto space-y-8 pb-20">
      
//       {/* HEADER */}
//       <div>
//         <Button 
//           variant="ghost" 
//           className="mb-4 pl-0 hover:bg-transparent text-zinc-400 hover:text-white"
//           onClick={() => router.back()}
//         >
//           <ArrowLeft className="w-4 h-4 mr-2" />
//           Back to Blueprints
//         </Button>
        
//         <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
//             <div className="mb-0 border-b-0 pb-0">
//                 <PageHeader 
//                     title={summary}
//                     description={`Generated on ${new Date(blueprint.created_at).toLocaleString()}`}
//                 />
//             </div>
            
//             <Button 
//                 onClick={handleRunTests} 
//                 disabled={isRunning}
//                 className="bg-green-600 hover:bg-green-500 text-white shrink-0 shadow-lg shadow-green-900/20"
//             >
//                 {isRunning ? (
//                     <>
//                         <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//                         Starting Run...
//                     </>
//                 ) : (
//                     <>
//                         <Play className="w-4 h-4 mr-2 fill-current" />
//                         Approve & Run Tests
//                     </>
//                 )}
//             </Button>
//         </div>
//       </div>

//       {/* 🔴 NEW: EXECUTION ERROR REPORT */}
//       {executionError && (
//         <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex items-start gap-4 animate-in slide-in-from-top-2">
//             <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
//             <div className="space-y-1">
//                 <h4 className="font-bold text-red-500 text-sm">Execution Failed</h4>
//                 <p className="text-red-200/80 text-sm">
//                     {executionError}
//                 </p>
//             </div>
//         </div>
//       )}

//       {/* STATS */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         <StatCard 
//           icon={<Search className="w-6 h-6" />} 
//           label="Total Scenarios" 
//           value={scenarios.length} 
//           color="blue" 
//         />
//         <StatCard 
//           icon={<Shield className="w-6 h-6" />} 
//           label="Security Tests" 
//           value={scenarios.filter((s: any) => s.category === 'SECURITY').length} 
//           color="red" 
//         />
//         <StatCard 
//           icon={<CheckCircle2 className="w-6 h-6" />} 
//           label="Happy Paths" 
//           value={scenarios.filter((s: any) => s.category === 'HAPPY_PATH').length} 
//           color="green" 
//         />
//       </div>

//       {/* SCENARIOS LIST */}
//       <div className="space-y-4">
//         <div className="flex items-center justify-between">
//             <h2 className="text-xl font-bold text-white flex items-center gap-2">
//                 <FileJson className="w-5 h-5 text-zinc-500" />
//                 Test Scenarios
//             </h2>
//             <span className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">
//                 Execution Plan
//             </span>
//         </div>
        
//         {scenarios.length === 0 ? (
//           <div className="p-12 text-center border border-dashed border-zinc-800 rounded-xl bg-zinc-900/30">
//             <p className="text-zinc-500">No test scenarios found in this strategy.</p>
//           </div>
//         ) : (
//           scenarios.map((scenario: any) => (
//             <ScenarioItem 
//               key={scenario.id} 
//               scenario={scenario} 
//               isExpanded={expandedScenario === scenario.id}
//               onToggle={() => setExpandedScenario(expandedScenario === scenario.id ? null : scenario.id)}
//             />
//           ))
//         )}
//       </div>
//     </div>
//   );
// }

// // --- SUB-COMPONENTS ---

// function StatCard({ icon, label, value, color }: any) {
//   const colors: any = {
//     blue: "bg-blue-500/10 text-blue-500 border-blue-500/20",
//     red: "bg-red-500/10 text-red-500 border-red-500/20",
//     green: "bg-green-500/10 text-green-500 border-green-500/20"
//   };

//   return (
//     <Card className="bg-zinc-900/50 border-zinc-800">
//         <CardContent className="pt-6 flex items-center gap-4">
//             <div className={`p-3 rounded-xl border ${colors[color]}`}>
//                 {icon}
//             </div>
//             <div>
//                 <p className="text-sm text-zinc-400 font-medium">{label}</p>
//                 <p className="text-2xl font-bold text-white">{value}</p>
//             </div>
//         </CardContent>
//     </Card>
//   );
// }

// function ScenarioItem({ scenario, isExpanded, onToggle }: any) {
//   const severityColor = {
//       CRITICAL: 'text-red-400 border-red-900/50 bg-red-900/20',
//       HIGH: 'text-orange-400 border-orange-900/50 bg-orange-900/20',
//       MEDIUM: 'text-yellow-400 border-yellow-900/50 bg-yellow-900/20',
//       LOW: 'text-blue-400 border-blue-900/50 bg-blue-900/20',
//   }[scenario.severity as string] || 'text-zinc-400 border-zinc-800 bg-zinc-900';

//   return (
//     <div className={`border transition-all duration-200 rounded-lg overflow-hidden ${isExpanded ? 'border-zinc-700 bg-zinc-900' : 'border-zinc-800 bg-zinc-900/30'}`}>
//         <div 
//             className="p-4 flex items-center justify-between cursor-pointer hover:bg-zinc-800/50 transition-colors"
//             onClick={onToggle}
//         >
//             <div className="flex items-center gap-4 overflow-hidden w-full">
//                 {isExpanded ? <ChevronDown className="w-5 h-5 text-zinc-500 shrink-0" /> : <ChevronRight className="w-5 h-5 text-zinc-500 shrink-0" />}
                
//                 <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 w-full min-w-0">
//                     <div className="flex items-center gap-3 min-w-0">
//                         <Badge variant="outline" className={`${severityColor} border px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider shrink-0`}>
//                             {scenario.severity}
//                         </Badge>
//                         <span className="font-medium text-zinc-200 truncate">{scenario.title}</span>
//                     </div>
                    
//                     <div className="hidden md:flex items-center gap-2 text-xs text-zinc-500 font-mono ml-auto mr-4">
//                         <span className={`px-1.5 py-0.5 rounded ${getMethodColor(scenario.method)} text-zinc-950 font-bold`}>
//                             {scenario.method}
//                         </span>
//                         <span className="truncate max-w-[200px]">{scenario.endpoint}</span>
//                     </div>
//                 </div>
//             </div>
//         </div>

//         {isExpanded && (
//             <div className="border-t border-zinc-800 bg-black/40 p-6 space-y-6 animate-in slide-in-from-top-2 duration-200">
//                 <div className="flex items-start gap-4">
//                     <div className="p-2 bg-zinc-900 rounded border border-zinc-800">
//                         <Search className="w-4 h-4 text-zinc-500" />
//                     </div>
//                     <div>
//                         <h4 className="text-sm font-medium text-zinc-300 mb-1">Scenario Logic</h4>
//                         <p className="text-zinc-400 text-sm leading-relaxed">{scenario.description}</p>
//                     </div>
//                 </div>
                
//                 <div className="rounded-lg border border-zinc-800 overflow-hidden bg-zinc-900/50">
//                     <table className="w-full text-sm text-left">
//                         <thead className="bg-zinc-900 text-zinc-400 font-medium border-b border-zinc-800">
//                             <tr>
//                                 <th className="p-3 pl-4 w-1/3">Test Case</th>
//                                 <th className="p-3 w-32">Expected</th>
//                                 <th className="p-3">Payload / Params</th>
//                             </tr>
//                         </thead>
//                         <tbody className="divide-y divide-zinc-800">
//                             {scenario.test_cases?.map((tc: any, idx: number) => (
//                                 <tr key={idx} className="hover:bg-zinc-800/30 transition-colors">
//                                     <td className="p-3 pl-4">
//                                         <div className="font-medium text-zinc-300">{tc.name}</div>
//                                         {/* Fallback for mobile view of method/endpoint */}
//                                         <div className="md:hidden text-xs text-zinc-500 mt-1 font-mono">
//                                             {tc.endpoint || scenario.endpoint}
//                                         </div>
//                                     </td>
//                                     <td className="p-3">
//                                         <Badge variant="outline" className="font-mono text-xs border-green-900/50 text-green-400 bg-green-900/10">
//                                             Status {tc.expected_status}
//                                         </Badge>
//                                     </td>
//                                     <td className="p-3 font-mono text-xs text-zinc-500">
//                                         {renderPayload(tc)}
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         )}
//     </div>
//   );
// }

// function renderPayload(tc: any) {
//     if (tc.body) return <span className="text-zinc-400">{JSON.stringify(tc.body)}</span>;
//     if (tc.query_params) return <span className="text-zinc-400">?{new URLSearchParams(tc.query_params).toString()}</span>;
//     return <span className="opacity-30 italic">No payload</span>;
// }

// function getMethodColor(method: string) {
//     switch (method?.toUpperCase()) {
//         case 'GET': return 'bg-blue-400';
//         case 'POST': return 'bg-green-400';
//         case 'PUT': return 'bg-orange-400';
//         case 'DELETE': return 'bg-red-400';
//         case 'PATCH': return 'bg-yellow-400';
//         default: return 'bg-zinc-400';
//     }
// }



// 'use client';

// import { useState, useEffect } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { 
//   ArrowLeft, 
//   CheckCircle2, 
//   Shield, 
//   Search,
//   ChevronDown,
//   ChevronRight,
//   Play,
//   Loader2,
//   AlertTriangle,
//   FileJson,
//   XCircle,
//   Bot,
//   Bell,
//   Settings,
//   LogOut,
//   User,
//   LayoutList
// } from 'lucide-react';

// import api from '@/lib/api';
// import { TestBlueprint } from '@/lib/types';
// import PageHeader from '@/components/layout/PageHeader';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { Input } from '@/components/ui/input';
// import { 
//   DropdownMenu, 
//   DropdownMenuContent, 
//   DropdownMenuItem, 
//   DropdownMenuLabel, 
//   DropdownMenuSeparator, 
//   DropdownMenuTrigger 
// } from '@/components/ui/dropdown-menu';
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// export default function BlueprintDetailsPage() {
//   const router = useRouter();
//   const params = useParams();
  
//   const projectId = params?.projectId as string;
//   const blueprintId = params?.blueprintId as string;

//   // --- STATE ---
//   const [blueprint, setBlueprint] = useState<TestBlueprint | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [pageError, setPageError] = useState('');
//   const [executionError, setExecutionError] = useState<string | null>(null);
//   const [expandedScenario, setExpandedScenario] = useState<string | null>(null);
  
//   const [isRunning, setIsRunning] = useState(false);

//   // --- FETCH DATA ---
//   useEffect(() => {
//     if (!blueprintId) return;

//     const fetchBlueprint = async () => {
//       try {
//         const { data } = await api.get(`/test-blueprints/${blueprintId}`);
//         setBlueprint(data);
        
//         if (data.ai_strategy_json?.test_scenarios?.length > 0) {
//           setExpandedScenario(data.ai_strategy_json.test_scenarios[0].id);
//         }
//       } catch (err) {
//         console.error('Failed to load blueprint', err);
//         setPageError('Could not load the blueprint details.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBlueprint();
//   }, [blueprintId]);

//   // --- RUN TESTS LOGIC ---
//   const handleRunTests = async () => {
//     if (!blueprintId) return;
    
//     setIsRunning(true);
//     setExecutionError(null);

//     try {
//       const { data } = await api.post(`/test-blueprints/${blueprintId}/run`);
      
//       // Handle response variation (id vs test_run_id)
//       const runId = data.id || data.test_run_id;
      
//       if (runId) {
//         router.push(`/projects/${projectId}/test-runs/${runId}`);
//       } else {
//         throw new Error("Backend responded, but no Run ID was found.");
//       }
      
//     } catch (err: any) {
//       console.error('Run failed', err);
//       const msg = err.response?.data?.detail || err.message || 'Failed to initiate test execution.';
//       setExecutionError(msg);
//       setIsRunning(false);
//     }
//   };

//   // --- LOADING STATE ---
//   if (loading) return (
//     <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center text-slate-500">
//       <Loader2 className="w-8 h-8 animate-spin text-blue-500 mb-4" />
//       <p className="text-sm font-medium">Loading Strategy...</p>
//     </div>
//   );

//   // --- PAGE LOAD ERROR ---
//   if (pageError || !blueprint) return (
//     <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center p-8">
//       <div className="p-4 rounded-full bg-red-500/10 mb-4">
//         <AlertTriangle className="w-8 h-8 text-red-500" />
//       </div>
//       <h3 className="text-xl font-bold text-white mb-2">Error Loading Blueprint</h3>
//       <p className="text-slate-400 mb-6">{pageError || 'Blueprint not found'}</p>
//       <Button variant="outline" onClick={() => router.back()} className="border-slate-800 text-slate-300 hover:text-white">
//         <ArrowLeft className="w-4 h-4 mr-2" />
//         Go Back
//       </Button>
//     </div>
//   );

//   const strategy = blueprint.ai_strategy_json || {};
//   const scenarios = strategy.test_scenarios || [];
//   const summary = strategy.summary || `Strategy #${blueprint.id.slice(0, 8)}`;

//   return (
//     <div className="min-h-screen bg-[#020617] text-slate-100 font-sans selection:bg-blue-500/30">
      
//       {/* --- NAVBAR --- */}
//       <nav className="sticky top-0 z-50 border-b border-white/5 bg-[#020617]/80 backdrop-blur-xl">
//         <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
//           <div className="flex items-center gap-2 text-sm">
//             <Link href="/projects" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
//               <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/20">
//                 <Bot className="h-5 w-5 text-white" />
//                 <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-white/20" />
//               </div>
//               <span className="font-bold text-white hidden sm:block">ApiScan</span>
//             </Link>
//             <ChevronRight className="w-4 h-4 text-slate-600" />
//             <Link href={`/projects/${projectId}/blueprints`} className="text-slate-400 hover:text-white transition-colors">
//               Blueprints
//             </Link>
//             <ChevronRight className="w-4 h-4 text-slate-600" />
//             <span className="font-medium text-white truncate max-w-[150px]">Details</span>
//           </div>

//           <div className="flex items-center gap-4">
//             <div className="hidden md:flex relative w-64">
//                 <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
//                 <input 
//                     type="text" 
//                     placeholder="Search scenarios..." 
//                     className="h-9 w-full bg-slate-900/50 border border-slate-800 rounded-full pl-9 pr-4 text-sm text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 placeholder:text-slate-600 transition-all"
//                 />
//             </div>
            
//             <button className="p-2 text-slate-400 hover:text-white transition-colors relative">
//                 <Bell className="w-5 h-5" />
//             </button>

//             <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                   <Button variant="ghost" className="relative h-8 w-8 rounded-full ring-2 ring-slate-800 hover:ring-slate-700 transition-all">
//                     <Avatar className="h-8 w-8">
//                       <AvatarImage src="/placeholder-user.jpg" />
//                       <AvatarFallback className="bg-slate-800 text-slate-400">JD</AvatarFallback>
//                     </Avatar>
//                   </Button>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent className="w-56 bg-[#0B1120] border-slate-800 text-slate-300" align="end">
//                   <DropdownMenuLabel className="text-white">John Doe</DropdownMenuLabel>
//                   <DropdownMenuSeparator className="bg-slate-800" />
//                   <DropdownMenuItem className="focus:bg-slate-800 focus:text-white cursor-pointer">
//                     <User className="mr-2 h-4 w-4" /> Profile
//                   </DropdownMenuItem>
//                   <DropdownMenuItem className="focus:bg-slate-800 focus:text-white cursor-pointer">
//                     <Settings className="mr-2 h-4 w-4" /> Settings
//                   </DropdownMenuItem>
//                   <DropdownMenuSeparator className="bg-slate-800" />
//                   <DropdownMenuItem className="text-red-400 focus:bg-red-950/20 focus:text-red-300 cursor-pointer">
//                     <LogOut className="mr-2 h-4 w-4" /> Log out
//                   </DropdownMenuItem>
//                 </DropdownMenuContent>
//               </DropdownMenu>
//           </div>
//         </div>
//       </nav>

//       {/* --- MAIN CONTENT --- */}
//       <main className="max-w-5xl mx-auto px-6 py-10 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
//         {/* HEADER AREA */}
//         <div>
//           <Button 
//             variant="ghost" 
//             className="pl-0 text-slate-400 hover:text-white hover:bg-transparent mb-4 group"
//             onClick={() => router.back()}
//           >
//             <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
//             Back to Blueprints
//           </Button>
          
//           <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
//               <div className="flex-1">
//                   <PageHeader 
//                       title={summary}
//                       description={`Strategy created on ${new Date(blueprint.created_at).toLocaleString()}`}
//                       className="mb-0 border-none pb-0"
//                   />
//               </div>
              
//               <Button 
//                   onClick={handleRunTests} 
//                   disabled={isRunning}
//                   className="bg-emerald-600 hover:bg-emerald-500 text-white shrink-0 shadow-lg shadow-emerald-900/20 transition-all font-medium h-10 px-6"
//               >
//                   {isRunning ? (
//                       <>
//                           <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//                           Starting Run...
//                       </>
//                   ) : (
//                       <>
//                           <Play className="w-4 h-4 mr-2 fill-current" />
//                           Approve & Run Tests
//                       </>
//                   )}
//               </Button>
//           </div>
//         </div>

//         {/* EXECUTION ERROR REPORT */}
//         {executionError && (
//           <div className="bg-red-950/30 border border-red-500/20 rounded-xl p-4 flex items-start gap-4 animate-in slide-in-from-top-2">
//               <div className="p-2 bg-red-900/20 rounded-lg">
//                 <XCircle className="w-5 h-5 text-red-400 shrink-0" />
//               </div>
//               <div className="space-y-1">
//                   <h4 className="font-semibold text-red-400 text-sm">Execution Failed</h4>
//                   <p className="text-red-200/70 text-sm leading-relaxed">
//                       {executionError}
//                   </p>
//               </div>
//           </div>
//         )}

//         {/* STATS */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <StatCard 
//             icon={<LayoutList className="w-6 h-6" />} 
//             label="Total Scenarios" 
//             value={scenarios.length} 
//             color="blue" 
//           />
//           <StatCard 
//             icon={<Shield className="w-6 h-6" />} 
//             label="Security Tests" 
//             value={scenarios.filter((s: any) => s.category === 'SECURITY').length} 
//             color="red" 
//           />
//           <StatCard 
//             icon={<CheckCircle2 className="w-6 h-6" />} 
//             label="Happy Paths" 
//             value={scenarios.filter((s: any) => s.category === 'HAPPY_PATH').length} 
//             color="green" 
//           />
//         </div>

//         {/* SCENARIOS LIST */}
//         <div className="space-y-4">
//           <div className="flex items-center justify-between">
//               <h2 className="text-xl font-bold text-white flex items-center gap-2">
//                   <FileJson className="w-5 h-5 text-slate-500" />
//                   Test Scenarios
//               </h2>
//               <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold bg-slate-900 border border-slate-800 px-2 py-1 rounded">
//                   Execution Plan
//               </span>
//           </div>
          
//           {scenarios.length === 0 ? (
//             <div className="py-20 text-center border border-dashed border-slate-800 rounded-2xl bg-slate-900/20">
//               <FileJson className="w-12 h-12 text-slate-600 mx-auto mb-3" />
//               <p className="text-slate-500 font-medium">No test scenarios found.</p>
//             </div>
//           ) : (
//             <div className="space-y-3">
//               {scenarios.map((scenario: any) => (
//                 <ScenarioItem 
//                   key={scenario.id} 
//                   scenario={scenario} 
//                   isExpanded={expandedScenario === scenario.id}
//                   onToggle={() => setExpandedScenario(expandedScenario === scenario.id ? null : scenario.id)}
//                 />
//               ))}
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// }

// // --- SUB-COMPONENTS ---

// function StatCard({ icon, label, value, color }: any) {
//   const colors: any = {
//     blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
//     red: "bg-red-500/10 text-red-400 border-red-500/20",
//     green: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
//   };

//   return (
//     <Card className="bg-slate-900/30 border-slate-800 backdrop-blur-sm shadow-lg">
//         <CardContent className="pt-6 flex items-center gap-4">
//             <div className={`p-3 rounded-xl border ${colors[color]}`}>
//                 {icon}
//             </div>
//             <div>
//                 <p className="text-sm text-slate-400 font-medium">{label}</p>
//                 <p className="text-2xl font-bold text-white">{value}</p>
//             </div>
//         </CardContent>
//     </Card>
//   );
// }

// function ScenarioItem({ scenario, isExpanded, onToggle }: any) {
//   const severityColor = {
//       CRITICAL: 'text-red-400 border-red-900/50 bg-red-900/20',
//       HIGH: 'text-orange-400 border-orange-900/50 bg-orange-900/20',
//       MEDIUM: 'text-amber-400 border-amber-900/50 bg-amber-900/20',
//       LOW: 'text-blue-400 border-blue-900/50 bg-blue-900/20',
//   }[scenario.severity as string] || 'text-slate-400 border-slate-800 bg-slate-900';

//   return (
//     <div className={`border transition-all duration-200 rounded-xl overflow-hidden ${isExpanded ? 'border-slate-700 bg-slate-900 shadow-xl' : 'border-slate-800 bg-slate-900/40 hover:border-slate-700'}`}>
//         <div 
//             className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-800/30 transition-colors"
//             onClick={onToggle}
//         >
//             <div className="flex items-center gap-4 overflow-hidden w-full">
//                 <div className={`p-1 rounded-md transition-colors ${isExpanded ? 'bg-slate-800 text-white' : 'text-slate-500'}`}>
//                     {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
//                 </div>
                
//                 <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 w-full min-w-0">
//                     <div className="flex items-center gap-3 min-w-0">
//                         <Badge variant="outline" className={`${severityColor} border px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider shrink-0`}>
//                             {scenario.severity}
//                         </Badge>
//                         <span className="font-medium text-slate-200 truncate">{scenario.title}</span>
//                     </div>
                    
//                     <div className="hidden md:flex items-center gap-2 text-xs text-slate-500 font-mono ml-auto mr-4">
//                         <span className={`px-1.5 py-0.5 rounded font-bold text-[#020617] ${getMethodColor(scenario.method)}`}>
//                             {scenario.method}
//                         </span>
//                         <span className="truncate max-w-[250px] bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
//                             {scenario.endpoint}
//                         </span>
//                     </div>
//                 </div>
//             </div>
//         </div>

//         {isExpanded && (
//             <div className="border-t border-slate-800 bg-black/20 p-6 space-y-6 animate-in slide-in-from-top-1 duration-200">
//                 <div className="flex items-start gap-4">
//                     <div className="p-2 bg-slate-950 rounded-lg border border-slate-800 shrink-0">
//                         <Search className="w-4 h-4 text-slate-500" />
//                     </div>
//                     <div>
//                         <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Scenario Logic</h4>
//                         <p className="text-slate-300 text-sm leading-relaxed max-w-3xl">{scenario.description}</p>
//                     </div>
//                 </div>
                
//                 <div className="rounded-xl border border-slate-800 overflow-hidden bg-slate-950/50 shadow-inner">
//                     <table className="w-full text-sm text-left">
//                         <thead className="bg-slate-900/80 text-slate-400 font-medium border-b border-slate-800 text-xs uppercase tracking-wider">
//                             <tr>
//                                 <th className="p-3 pl-4 w-1/3">Test Case</th>
//                                 <th className="p-3 w-32">Expected</th>
//                                 <th className="p-3">Payload / Params</th>
//                             </tr>
//                         </thead>
//                         <tbody className="divide-y divide-slate-800">
//                             {scenario.test_cases?.map((tc: any, idx: number) => (
//                                 <tr key={idx} className="hover:bg-slate-900/50 transition-colors">
//                                     <td className="p-3 pl-4">
//                                         <div className="font-medium text-slate-300">{tc.name}</div>
//                                         <div className="md:hidden text-xs text-slate-500 mt-1 font-mono">
//                                             {tc.endpoint || scenario.endpoint}
//                                         </div>
//                                     </td>
//                                     <td className="p-3">
//                                         <Badge variant="outline" className="font-mono text-[10px] border-emerald-900/50 text-emerald-400 bg-emerald-950/30">
//                                             {tc.expected_status} OK
//                                         </Badge>
//                                     </td>
//                                     <td className="p-3 font-mono text-xs text-slate-500 break-all">
//                                         {renderPayload(tc)}
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         )}
//     </div>
//   );
// }

// function renderPayload(tc: any) {
//     if (tc.body) return <span className="text-slate-400">{JSON.stringify(tc.body)}</span>;
//     if (tc.query_params) return <span className="text-slate-400">?{new URLSearchParams(tc.query_params).toString()}</span>;
//     return <span className="opacity-30 italic">No payload</span>;
// }

// function getMethodColor(method: string) {
//     switch (method?.toUpperCase()) {
//         case 'GET': return 'bg-blue-400';
//         case 'POST': return 'bg-emerald-400';
//         case 'PUT': return 'bg-orange-400';
//         case 'DELETE': return 'bg-red-400';
//         case 'PATCH': return 'bg-yellow-400';
//         default: return 'bg-slate-400';
//     }
// }

'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Shield, 
  Search,
  ChevronDown,
  ChevronRight,
  Play,
  Loader2,
  AlertTriangle,
  FileJson,
  XCircle,
  Bot,
  Bell,
  User,
  Settings,
  LogOut,
  Target
} from 'lucide-react';

import api from '@/lib/api';
import { TestBlueprint } from '@/lib/types';
import PageHeader from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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

export default function BlueprintDetailsPage() {
  const router = useRouter();
  const params = useParams();
  
  const projectId = params?.projectId as string;
  const blueprintId = params?.blueprintId as string;

  // --- STATE ---
  const [blueprint, setBlueprint] = useState<TestBlueprint | null>(null);
  const [loading, setLoading] = useState(true);
  const [pageError, setPageError] = useState('');
  const [executionError, setExecutionError] = useState<string | null>(null);
  const [expandedScenario, setExpandedScenario] = useState<string | null>(null);
  
  const [isRunning, setIsRunning] = useState(false);

  // --- FETCH DATA ---
  useEffect(() => {
    if (!blueprintId) return;

    const fetchBlueprint = async () => {
      try {
        const { data } = await api.get(`/test-blueprints/${blueprintId}`);
        setBlueprint(data);
        
        if (data.ai_strategy_json?.test_scenarios?.length > 0) {
          setExpandedScenario(data.ai_strategy_json.test_scenarios[0].id);
        }
      } catch (err) {
        console.error('Failed to load blueprint', err);
        setPageError('Could not load the blueprint details.');
      } finally {
        setLoading(false);
      }
    };

    fetchBlueprint();
  }, [blueprintId]);

  // --- RUN TESTS LOGIC ---
  const handleRunTests = async () => {
    if (!blueprintId) return;
    
    setIsRunning(true);
    setExecutionError(null);

    try {
      const { data } = await api.post(`/test-blueprints/${blueprintId}/run`);
      
      const runId = data.id || data.test_run_id;
      if (runId) {
        router.push(`/projects/${projectId}/test-runs/${runId}`);
      } else {
        throw new Error("Backend responded, but no Run ID was found.");
      }
      
    } catch (err: any) {
      console.error('Run failed', err);
      const msg = err.response?.data?.detail || err.message || 'Failed to initiate test execution.';
      setExecutionError(msg);
      setIsRunning(false);
    }
  };

  // --- LOADING STATE ---
  if (loading) return (
    <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center">
      <Loader2 className="w-10 h-10 animate-spin text-blue-500 mb-4" />
      <p className="text-slate-400 font-medium">Loading Strategy Blueprint...</p>
    </div>
  );

  // --- PAGE LOAD ERROR ---
  if (pageError || !blueprint) return (
    <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center">
      <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
      <h3 className="text-xl font-bold text-white mb-2">Error Loading Blueprint</h3>
      <p className="text-slate-400 mb-6">{pageError || 'Blueprint not found'}</p>
      <Button variant="outline" onClick={() => router.back()} className="border-slate-800 text-slate-300 hover:bg-slate-800">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Go Back
      </Button>
    </div>
  );

  const strategy = blueprint.ai_strategy_json || {};
  const scenarios = strategy.test_scenarios || [];
  const summary = strategy.summary || `Strategy #${blueprint.id.slice(0, 8)}`;

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-sans selection:bg-blue-500/30">
      
      {/* --- 1. NAVBAR --- */}
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
            <Link href={`/projects/${projectId}/blueprints`} className="text-slate-400 hover:text-white transition-colors">
              Blueprints
            </Link>

            <ChevronRight className="w-4 h-4 text-slate-600" />
            <span className="font-medium text-white truncate max-w-[150px]">{summary}</span>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex relative w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
                <input 
                    type="text" 
                    placeholder="Search..." 
                    className="h-9 w-full bg-slate-900/50 border border-slate-800 rounded-full pl-9 pr-4 text-sm text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
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
                  <DropdownMenuItem className="focus:bg-slate-800 focus:text-white cursor-pointer">Profile</DropdownMenuItem>
                  <DropdownMenuItem className="focus:bg-slate-800 focus:text-white cursor-pointer">Settings</DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-slate-800" />
                  <DropdownMenuItem className="text-red-400 focus:bg-red-950/20 focus:text-red-300 cursor-pointer">Log out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
          </div>
        </div>
      </nav>

      {/* --- 2. MAIN CONTENT --- */}
      <main className="max-w-5xl mx-auto px-6 py-10 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {/* HEADER */}
        <div>
          <Button 
            variant="ghost" 
            className="mb-4 pl-0 hover:bg-transparent text-slate-400 hover:text-white group"
            onClick={() => router.back()}
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Blueprints
          </Button>
          
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              <div className="mb-0 border-b-0 pb-0 flex-1">
                  <PageHeader 
                      title={summary}
                      description={`Generated on ${new Date(blueprint.created_at).toLocaleString()}`}
                  />
              </div>
              
              <Button 
                  onClick={handleRunTests} 
                  disabled={isRunning}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white shrink-0 shadow-lg shadow-emerald-900/20 transition-all font-medium h-11 px-6"
              >
                  {isRunning ? (
                      <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Starting Run...
                      </>
                  ) : (
                      <>
                          <Play className="w-4 h-4 mr-2 fill-current" />
                          Approve & Run Tests
                      </>
                  )}
              </Button>
          </div>
        </div>

        {/* 🔴 EXECUTION ERROR REPORT */}
        <AnimatePresence>
          {executionError && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-red-950/30 border border-red-500/30 rounded-xl p-4 flex items-start gap-4"
            >
                <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                    <h4 className="font-bold text-red-400 text-sm">Execution Failed</h4>
                    <p className="text-red-200/80 text-sm leading-relaxed">
                        {executionError}
                    </p>
                </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* STATS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatBox 
            label="Total Scenarios" 
            value={scenarios.length} 
            icon={Search} 
            color="text-blue-400" 
            bg="bg-slate-900/50" 
            border="border-slate-800" 
          />
          <StatBox 
            label="Security Tests" 
            value={scenarios.filter((s: any) => s.category === 'SECURITY').length} 
            icon={Shield} 
            color="text-red-400" 
            bg="bg-red-950/10" 
            border="border-red-500/20" 
          />
          <StatBox 
            label="Happy Paths" 
            value={scenarios.filter((s: any) => s.category === 'HAPPY_PATH').length} 
            icon={CheckCircle2} 
            color="text-emerald-400" 
            bg="bg-emerald-950/10" 
            border="border-emerald-500/20" 
          />
        </div>

        {/* SCENARIOS LIST */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <FileJson className="w-5 h-5 text-slate-400" />
                  Test Scenarios
              </h2>
              <Badge variant="outline" className="text-xs text-slate-400 border-slate-700 uppercase tracking-wider font-semibold">
                  Execution Plan
              </Badge>
          </div>
          
          {scenarios.length === 0 ? (
            <div className="p-12 text-center border border-dashed border-slate-800 rounded-2xl bg-slate-900/30">
              <Target className="w-10 h-10 text-slate-600 mx-auto mb-3" />
              <p className="text-slate-400">No test scenarios found in this strategy.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {scenarios.map((scenario: any) => (
                <ScenarioItem 
                  key={scenario.id} 
                  scenario={scenario} 
                  isExpanded={expandedScenario === scenario.id}
                  onToggle={() => setExpandedScenario(expandedScenario === scenario.id ? null : scenario.id)}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

// --- SUB-COMPONENTS ---

function StatBox({ label, value, icon: Icon, color, bg, border }: any) {
  return (
      <Card className={`${bg} ${border} backdrop-blur-sm shadow-lg`}>
          <CardContent className="p-5 flex items-center justify-between">
              <div>
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">{label}</p>
                  <p className={`text-2xl font-bold ${color}`}>{value}</p>
              </div>
              <div className={`p-3 rounded-xl bg-slate-950/50 border border-slate-800/50 ${color}`}>
                  <Icon className="w-5 h-5" />
              </div>
          </CardContent>
      </Card>
  );
}

function ScenarioItem({ scenario, isExpanded, onToggle }: any) {
  const severityStyles: Record<string, string> = {
      CRITICAL: 'text-red-400 border-red-500/30 bg-red-500/10',
      HIGH: 'text-orange-400 border-orange-500/30 bg-orange-500/10',
      MEDIUM: 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10',
      LOW: 'text-blue-400 border-blue-500/30 bg-blue-500/10',
  };

  const currentSeverityStyle = severityStyles[scenario.severity as string] || 'text-slate-400 border-slate-700 bg-slate-800';

  return (
    <div className={`border transition-all duration-300 rounded-xl overflow-hidden ${isExpanded ? 'border-slate-700 bg-slate-900/80 shadow-lg' : 'border-slate-800 bg-slate-900/30 hover:border-slate-700 hover:bg-slate-900/50'}`}>
        <div 
            className="p-4 flex items-center justify-between cursor-pointer select-none"
            onClick={onToggle}
        >
            <div className="flex items-center gap-4 overflow-hidden w-full">
                <motion.div
                   animate={{ rotate: isExpanded ? 180 : 0 }}
                   transition={{ duration: 0.2 }}
                >
                   <ChevronDown className="w-5 h-5 text-slate-500 shrink-0" />
                </motion.div>
                
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 w-full min-w-0">
                    <div className="flex items-center gap-3 min-w-0">
                        <Badge variant="outline" className={`${currentSeverityStyle} px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider shrink-0`}>
                            {scenario.severity}
                        </Badge>
                        <span className="font-medium text-slate-200 truncate">{scenario.title}</span>
                    </div>
                    
                    <div className="hidden md:flex items-center gap-2 text-xs font-mono ml-auto mr-4 shrink-0">
                        <span className={`px-2 py-1 rounded text-[10px] font-bold tracking-widest ${getMethodStyle(scenario.method)}`}>
                            {scenario.method}
                        </span>
                        <span className="text-slate-400 truncate max-w-[200px]">{scenario.endpoint}</span>
                    </div>
                </div>
            </div>
        </div>

        <AnimatePresence>
          {isExpanded && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="border-t border-slate-800 bg-[#020617]/50"
              >
                <div className="p-6 space-y-6">
                  {/* Scenario Description */}
                  <div className="flex items-start gap-4">
                      <div className="p-2 bg-slate-800/50 rounded-lg border border-slate-700">
                          <Search className="w-4 h-4 text-slate-400" />
                      </div>
                      <div>
                          <h4 className="text-sm font-semibold text-slate-200 mb-1">Scenario Logic</h4>
                          <p className="text-slate-400 text-sm leading-relaxed max-w-3xl">{scenario.description}</p>
                      </div>
                  </div>
                  
                  {/* Test Cases Table */}
                  <div className="rounded-xl border border-slate-800 overflow-hidden bg-slate-900/50 shadow-inner">
                      <table className="w-full text-sm text-left">
                          <thead className="bg-slate-950 text-slate-400 font-medium border-b border-slate-800 text-xs uppercase tracking-wider">
                              <tr>
                                  <th className="p-4 w-1/3">Test Case</th>
                                  <th className="p-4 w-32">Expected</th>
                                  <th className="p-4">Payload / Params</th>
                              </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-800/50">
                              {scenario.test_cases?.map((tc: any, idx: number) => (
                                  <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                                      <td className="p-4">
                                          <div className="font-medium text-slate-300">{tc.name}</div>
                                          <div className="md:hidden flex items-center gap-2 mt-2">
                                              <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${getMethodStyle(scenario.method)}`}>
                                                  {scenario.method}
                                              </span>
                                              <span className="text-xs text-slate-500 font-mono truncate">
                                                {tc.endpoint || scenario.endpoint}
                                              </span>
                                          </div>
                                      </td>
                                      <td className="p-4">
                                          <Badge variant="outline" className="font-mono text-xs border-emerald-500/30 text-emerald-400 bg-emerald-500/10 shadow-sm">
                                              {tc.expected_status}
                                          </Badge>
                                      </td>
                                      <td className="p-4 font-mono text-xs text-slate-400 break-all">
                                          {renderPayload(tc)}
                                      </td>
                                  </tr>
                              ))}
                          </tbody>
                      </table>
                  </div>
                </div>
              </motion.div>
          )}
        </AnimatePresence>
    </div>
  );
}

function renderPayload(tc: any) {
    if (tc.body && Object.keys(tc.body).length > 0) return <span className="text-slate-300">{JSON.stringify(tc.body)}</span>;
    if (tc.query_params && Object.keys(tc.query_params).length > 0) return <span className="text-slate-300">?{new URLSearchParams(tc.query_params).toString()}</span>;
    return <span className="opacity-40 italic">No payload</span>;
}

function getMethodStyle(method: string) {
    switch (method?.toUpperCase()) {
        case 'GET': return 'bg-blue-500/10 text-blue-400 border border-blue-500/20';
        case 'POST': return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20';
        case 'PUT': return 'bg-amber-500/10 text-amber-400 border border-amber-500/20';
        case 'DELETE': return 'bg-red-500/10 text-red-400 border border-red-500/20';
        case 'PATCH': return 'bg-purple-500/10 text-purple-400 border border-purple-500/20';
        default: return 'bg-slate-500/10 text-slate-400 border border-slate-500/20';
    }
}