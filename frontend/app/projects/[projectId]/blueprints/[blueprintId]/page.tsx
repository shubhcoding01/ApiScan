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
  FileText
} from 'lucide-react';

import api from '@/lib/api';
import { TestBlueprint } from '@/lib/types';
import PageHeader from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function BlueprintDetailsPage() {
  const router = useRouter();
  const params = useParams();
  
  // Safe Access to Params
  const projectId = params?.projectId as string;
  const blueprintId = params?.blueprintId as string;

  const [blueprint, setBlueprint] = useState<TestBlueprint | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedScenario, setExpandedScenario] = useState<string | null>(null);

  useEffect(() => {
    if (!blueprintId) return;

    const fetchBlueprint = async () => {
      try {
        const { data } = await api.get(`/test-blueprints/${blueprintId}`);
        setBlueprint(data);
        
        // Auto-expand first scenario
        if (data.ai_strategy_json?.test_scenarios?.length > 0) {
          setExpandedScenario(data.ai_strategy_json.test_scenarios[0].id);
        }
      } catch (err) {
        console.error('Failed to load blueprint', err);
        setError('Could not load the blueprint details.');
      } finally {
        setLoading(false);
      }
    };

    fetchBlueprint();
  }, [blueprintId]);

  // --- LOADING STATE ---
  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[50vh]">
      <Loader2 className="w-8 h-8 animate-spin text-zinc-500 mb-4" />
      <p className="text-zinc-400">Loading Strategy...</p>
    </div>
  );

  // --- ERROR STATE ---
  if (error || !blueprint) return (
    <div className="flex flex-col items-center justify-center min-h-[50vh]">
      <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
      <h3 className="text-xl font-bold text-white mb-2">Error Loading Blueprint</h3>
      <p className="text-zinc-400 mb-6">{error || 'Blueprint not found'}</p>
      <Button variant="outline" onClick={() => router.back()}>
        <ArrowLeft className="w-4 h-4 mr-2" />
        Go Back
      </Button>
    </div>
  );

  const strategy = blueprint.ai_strategy_json || {};
  const scenarios = strategy.test_scenarios || [];
  const summary = strategy.summary || blueprint.summary || `Strategy #${blueprint.id.slice(0, 8)}`;

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
            <PageHeader 
                title={summary.length > 60 ? summary.slice(0, 60) + '...' : summary}
                description={`Generated on ${new Date(blueprint.created_at).toLocaleString()}`}
                
            />
            <Button className="bg-green-600 hover:bg-green-500 text-white shrink-0">
                <Play className="w-4 h-4 mr-2" />
                Approve & Run Tests
            </Button>
        </div>
      </div>

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
        <h2 className="text-xl font-bold text-white">Test Scenarios</h2>
        
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
    blue: "bg-blue-500/10 text-blue-500",
    red: "bg-red-500/10 text-red-500",
    green: "bg-green-500/10 text-green-500"
  };

  return (
    <Card className="bg-zinc-900/50 border-zinc-800">
        <CardContent className="pt-6 flex items-center gap-4">
            <div className={`p-3 rounded-full ${colors[color]}`}>
                {icon}
            </div>
            <div>
                <p className="text-sm text-zinc-400">{label}</p>
                <p className="text-2xl font-bold text-white">{value}</p>
            </div>
        </CardContent>
    </Card>
  );
}

function ScenarioItem({ scenario, isExpanded, onToggle }: any) {
  const severityColor = {
      CRITICAL: 'text-red-500 border-red-500/20 bg-red-500/10',
      HIGH: 'text-orange-500 border-orange-500/20 bg-orange-500/10',
      MEDIUM: 'text-yellow-500 border-yellow-500/20 bg-yellow-500/10',
      LOW: 'text-blue-500 border-blue-500/20 bg-blue-500/10',
  }[scenario.severity as string] || 'text-zinc-500';

  return (
    <div className="border border-zinc-800 rounded-lg bg-zinc-900/30 overflow-hidden">
        <div 
            className="p-4 flex items-center justify-between cursor-pointer hover:bg-zinc-800/50 transition-colors"
            onClick={onToggle}
        >
            <div className="flex items-center gap-4 overflow-hidden">
                {isExpanded ? <ChevronDown className="w-5 h-5 text-zinc-500 shrink-0" /> : <ChevronRight className="w-5 h-5 text-zinc-500 shrink-0" />}
                
                <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-3">
                        <span className={`text-xs px-2 py-0.5 rounded border ${severityColor} font-bold shrink-0`}>
                            {scenario.severity}
                        </span>
                        <span className="font-medium text-white truncate">{scenario.title}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-zinc-500 font-mono">
                        <span className="bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-300">{scenario.method}</span>
                        <span className="truncate">{scenario.endpoint}</span>
                    </div>
                </div>
            </div>
        </div>

        {isExpanded && (
            <div className="border-t border-zinc-800 bg-black/20 p-6 space-y-6 animate-in slide-in-from-top-2 duration-200">
                <p className="text-zinc-400 text-sm">{scenario.description}</p>
                
                <div className="rounded-lg border border-zinc-800 overflow-hidden">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-zinc-900 text-zinc-400 font-medium">
                            <tr>
                                <th className="p-3 pl-4 w-1/3">Test Case Name</th>
                                <th className="p-3 w-24">Status</th>
                                <th className="p-3">Data</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800 bg-zinc-900/20">
                            {scenario.test_cases?.map((tc: any, idx: number) => (
                                <tr key={idx} className="hover:bg-zinc-800/30">
                                    <td className="p-3 pl-4 font-medium text-zinc-300">{tc.name}</td>
                                    <td className="p-3 font-mono text-blue-400">{tc.expected_status}</td>
                                    <td className="p-3 font-mono text-xs text-zinc-500 max-w-xs truncate">
                                        {tc.body ? JSON.stringify(tc.body) : (tc.query_params ? JSON.stringify(tc.query_params) : '-')}
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