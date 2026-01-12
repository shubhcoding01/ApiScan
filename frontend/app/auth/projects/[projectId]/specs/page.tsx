'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { 
  FileJson, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Loader2, 
  Download 
} from 'lucide-react';

import api from '@/lib/api';
import { ApiVersion } from '@/lib/types';
import PageHeader from '@/components/layout/PageHeader';
import UploadSpecForm from '@/components/specs/UploadSpecForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function SpecsPage() {
  const params = useParams();
  const projectId = params.projectId as string;

  // State
  const [specs, setSpecs] = useState<ApiVersion[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 1. Fetch Specs
  const fetchSpecs = useCallback(async () => {
    try {
      const { data } = await api.get(`/specs/${projectId}`);
      setSpecs(data);
    } catch (err) {
      console.error("Failed to load specs", err);
    } finally {
      setIsLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    fetchSpecs();
  }, [fetchSpecs]);

  // Helper: Status Icon
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

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      
      <PageHeader 
        title="API Specifications" 
        description="Upload your OpenAPI/Swagger definition files. The AI uses these to understand your API structure."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: Upload Form */}
        <div className="lg:col-span-1">
          <UploadSpecForm 
            projectId={projectId} 
            onSuccess={fetchSpecs} // Refresh list after upload
          />
        </div>

        {/* RIGHT COLUMN: Version History */}
        <div className="lg:col-span-2">
          <Card className="border-zinc-800 bg-zinc-900/30">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <FileJson className="w-5 h-5 text-blue-500" />
                Version History
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin text-zinc-500" />
                </div>
              ) : specs.length === 0 ? (
                <div className="text-center py-12 text-zinc-500">
                  No specifications uploaded yet.
                </div>
              ) : (
                <div className="space-y-4">
                  {specs.map((spec) => (
                    <div 
                      key={spec.id} 
                      className="group flex items-center justify-between p-4 bg-black/40 border border-zinc-800 rounded-xl hover:border-zinc-700 transition-colors"
                    >
                      {/* Icon & Info */}
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-zinc-800 rounded-lg">
                          <FileJson className="w-6 h-6 text-zinc-400" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white text-lg">
                              {spec.version}
                            </span>
                            <span className={`text-xs px-2 py-0.5 rounded-full border ${
                              spec.status === 'READY' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                              spec.status === 'FAILED' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                              'bg-blue-500/10 text-blue-400 border-blue-500/20'
                            }`}>
                              {spec.status}
                            </span>
                          </div>
                          <p className="text-xs text-zinc-500 mt-1 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            Uploaded on {new Date(spec.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      {/* Right: Status Icon / Actions */}
                      <div className="flex items-center gap-4">
                        {/* Status Icon */}
                        <div title={`Status: ${spec.status}`}>
                          {getStatusIcon(spec.status)}
                        </div>

                        {/* Download JSON Button (Mock functionality) */}
                        <button 
                          className="p-2 text-zinc-600 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
                          title="Download Original JSON"
                          onClick={() => {
                            const blob = new Blob([JSON.stringify(spec.spec_json, null, 2)], { type: 'application/json' });
                            const url = URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = `spec-${spec.version}.json`;
                            a.click();
                          }}
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