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

'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
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
  XCircle // Added XCircle icon
} from 'lucide-react';

import api from '@/lib/api';
import { TestBlueprint } from '@/lib/types';
import PageHeader from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function BlueprintDetailsPage() {
  const router = useRouter();
  const params = useParams();
  
  const projectId = params?.projectId as string;
  const blueprintId = params?.blueprintId as string;

  // --- STATE ---
  const [blueprint, setBlueprint] = useState<TestBlueprint | null>(null);
  const [loading, setLoading] = useState(true);
  const [pageError, setPageError] = useState(''); // Errors loading the page
  const [executionError, setExecutionError] = useState<string | null>(null); // Errors running the test
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
    setExecutionError(null); // Clear previous errors

    try {
      const { data } = await api.post(`/test-blueprints/${blueprintId}/run`);
      
      const runId = data.id;
      if (runId) {
        router.push(`/projects/${projectId}/test-runs/${runId}`);
      } else {
        throw new Error("Backend responded, but no Run ID was found.");
      }
      
    } catch (err: any) {
      console.error('Run failed', err);
      // Extract the specific error message from Backend
      const msg = err.response?.data?.detail || err.message || 'Failed to initiate test execution.';
      setExecutionError(msg); // Show the error in the UI, not an alert
      setIsRunning(false);
    }
  };

  // --- LOADING STATE ---
  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[50vh]">
      <Loader2 className="w-8 h-8 animate-spin text-zinc-500 mb-4" />
      <p className="text-zinc-400">Loading Strategy...</p>
    </div>
  );

  // --- PAGE LOAD ERROR ---
  if (pageError || !blueprint) return (
    <div className="flex flex-col items-center justify-center min-h-[50vh]">
      <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
      <h3 className="text-xl font-bold text-white mb-2">Error Loading Blueprint</h3>
      <p className="text-zinc-400 mb-6">{pageError || 'Blueprint not found'}</p>
      <Button variant="outline" onClick={() => router.back()}>
        <ArrowLeft className="w-4 h-4 mr-2" />
        Go Back
      </Button>
    </div>
  );

  const strategy = blueprint.ai_strategy_json || {};
  const scenarios = strategy.test_scenarios || [];
  const summary = strategy.summary || `Strategy #${blueprint.id.slice(0, 8)}`;

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20">
      
      {/* HEADER */}
      <div>
        <Button 
          variant="ghost" 
          className="mb-4 pl-0 hover:bg-transparent text-zinc-400 hover:text-white"
          onClick={() => router.back()}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blueprints
        </Button>
        
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="mb-0 border-b-0 pb-0">
                <PageHeader 
                    title={summary}
                    description={`Generated on ${new Date(blueprint.created_at).toLocaleString()}`}
                />
            </div>
            
            <Button 
                onClick={handleRunTests} 
                disabled={isRunning}
                className="bg-green-600 hover:bg-green-500 text-white shrink-0 shadow-lg shadow-green-900/20"
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

      {/* 🔴 NEW: EXECUTION ERROR REPORT */}
      {executionError && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex items-start gap-4 animate-in slide-in-from-top-2">
            <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <div className="space-y-1">
                <h4 className="font-bold text-red-500 text-sm">Execution Failed</h4>
                <p className="text-red-200/80 text-sm">
                    {executionError}
                </p>
            </div>
        </div>
      )}

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard 
          icon={<Search className="w-6 h-6" />} 
          label="Total Scenarios" 
          value={scenarios.length} 
          color="blue" 
        />
        <StatCard 
          icon={<Shield className="w-6 h-6" />} 
          label="Security Tests" 
          value={scenarios.filter((s: any) => s.category === 'SECURITY').length} 
          color="red" 
        />
        <StatCard 
          icon={<CheckCircle2 className="w-6 h-6" />} 
          label="Happy Paths" 
          value={scenarios.filter((s: any) => s.category === 'HAPPY_PATH').length} 
          color="green" 
        />
      </div>

      {/* SCENARIOS LIST */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <FileJson className="w-5 h-5 text-zinc-500" />
                Test Scenarios
            </h2>
            <span className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">
                Execution Plan
            </span>
        </div>
        
        {scenarios.length === 0 ? (
          <div className="p-12 text-center border border-dashed border-zinc-800 rounded-xl bg-zinc-900/30">
            <p className="text-zinc-500">No test scenarios found in this strategy.</p>
          </div>
        ) : (
          scenarios.map((scenario: any) => (
            <ScenarioItem 
              key={scenario.id} 
              scenario={scenario} 
              isExpanded={expandedScenario === scenario.id}
              onToggle={() => setExpandedScenario(expandedScenario === scenario.id ? null : scenario.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}

// --- SUB-COMPONENTS ---

function StatCard({ icon, label, value, color }: any) {
  const colors: any = {
    blue: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    red: "bg-red-500/10 text-red-500 border-red-500/20",
    green: "bg-green-500/10 text-green-500 border-green-500/20"
  };

  return (
    <Card className="bg-zinc-900/50 border-zinc-800">
        <CardContent className="pt-6 flex items-center gap-4">
            <div className={`p-3 rounded-xl border ${colors[color]}`}>
                {icon}
            </div>
            <div>
                <p className="text-sm text-zinc-400 font-medium">{label}</p>
                <p className="text-2xl font-bold text-white">{value}</p>
            </div>
        </CardContent>
    </Card>
  );
}

function ScenarioItem({ scenario, isExpanded, onToggle }: any) {
  const severityColor = {
      CRITICAL: 'text-red-400 border-red-900/50 bg-red-900/20',
      HIGH: 'text-orange-400 border-orange-900/50 bg-orange-900/20',
      MEDIUM: 'text-yellow-400 border-yellow-900/50 bg-yellow-900/20',
      LOW: 'text-blue-400 border-blue-900/50 bg-blue-900/20',
  }[scenario.severity as string] || 'text-zinc-400 border-zinc-800 bg-zinc-900';

  return (
    <div className={`border transition-all duration-200 rounded-lg overflow-hidden ${isExpanded ? 'border-zinc-700 bg-zinc-900' : 'border-zinc-800 bg-zinc-900/30'}`}>
        <div 
            className="p-4 flex items-center justify-between cursor-pointer hover:bg-zinc-800/50 transition-colors"
            onClick={onToggle}
        >
            <div className="flex items-center gap-4 overflow-hidden w-full">
                {isExpanded ? <ChevronDown className="w-5 h-5 text-zinc-500 shrink-0" /> : <ChevronRight className="w-5 h-5 text-zinc-500 shrink-0" />}
                
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 w-full min-w-0">
                    <div className="flex items-center gap-3 min-w-0">
                        <Badge variant="outline" className={`${severityColor} border px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider shrink-0`}>
                            {scenario.severity}
                        </Badge>
                        <span className="font-medium text-zinc-200 truncate">{scenario.title}</span>
                    </div>
                    
                    <div className="hidden md:flex items-center gap-2 text-xs text-zinc-500 font-mono ml-auto mr-4">
                        <span className={`px-1.5 py-0.5 rounded ${getMethodColor(scenario.method)} text-zinc-950 font-bold`}>
                            {scenario.method}
                        </span>
                        <span className="truncate max-w-[200px]">{scenario.endpoint}</span>
                    </div>
                </div>
            </div>
        </div>

        {isExpanded && (
            <div className="border-t border-zinc-800 bg-black/40 p-6 space-y-6 animate-in slide-in-from-top-2 duration-200">
                <div className="flex items-start gap-4">
                    <div className="p-2 bg-zinc-900 rounded border border-zinc-800">
                        <Search className="w-4 h-4 text-zinc-500" />
                    </div>
                    <div>
                        <h4 className="text-sm font-medium text-zinc-300 mb-1">Scenario Logic</h4>
                        <p className="text-zinc-400 text-sm leading-relaxed">{scenario.description}</p>
                    </div>
                </div>
                
                <div className="rounded-lg border border-zinc-800 overflow-hidden bg-zinc-900/50">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-zinc-900 text-zinc-400 font-medium border-b border-zinc-800">
                            <tr>
                                <th className="p-3 pl-4 w-1/3">Test Case</th>
                                <th className="p-3 w-32">Expected</th>
                                <th className="p-3">Payload / Params</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800">
                            {scenario.test_cases?.map((tc: any, idx: number) => (
                                <tr key={idx} className="hover:bg-zinc-800/30 transition-colors">
                                    <td className="p-3 pl-4">
                                        <div className="font-medium text-zinc-300">{tc.name}</div>
                                        {/* Fallback for mobile view of method/endpoint */}
                                        <div className="md:hidden text-xs text-zinc-500 mt-1 font-mono">
                                            {tc.endpoint || scenario.endpoint}
                                        </div>
                                    </td>
                                    <td className="p-3">
                                        <Badge variant="outline" className="font-mono text-xs border-green-900/50 text-green-400 bg-green-900/10">
                                            Status {tc.expected_status}
                                        </Badge>
                                    </td>
                                    <td className="p-3 font-mono text-xs text-zinc-500">
                                        {renderPayload(tc)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )}
    </div>
  );
}

function renderPayload(tc: any) {
    if (tc.body) return <span className="text-zinc-400">{JSON.stringify(tc.body)}</span>;
    if (tc.query_params) return <span className="text-zinc-400">?{new URLSearchParams(tc.query_params).toString()}</span>;
    return <span className="opacity-30 italic">No payload</span>;
}

function getMethodColor(method: string) {
    switch (method?.toUpperCase()) {
        case 'GET': return 'bg-blue-400';
        case 'POST': return 'bg-green-400';
        case 'PUT': return 'bg-orange-400';
        case 'DELETE': return 'bg-red-400';
        case 'PATCH': return 'bg-yellow-400';
        default: return 'bg-zinc-400';
    }
}