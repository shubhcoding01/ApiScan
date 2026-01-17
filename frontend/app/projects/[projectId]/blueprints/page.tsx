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
  Loader2
} from 'lucide-react';

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

  // ----------------------------------------------------
  // STATE
  // ----------------------------------------------------
  const [versions, setVersions] = useState<ApiVersion[]>([]);
  const [selectedVersionId, setSelectedVersionId] = useState<string | null>(null);
  const [blueprints, setBlueprints] = useState<TestBlueprint[]>([]);

  const [loadingVersions, setLoadingVersions] = useState(true);
  const [loadingBlueprints, setLoadingBlueprints] = useState(false);

  // ----------------------------------------------------
  // 1. AUTH GUARD
  // ----------------------------------------------------
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

  // ----------------------------------------------------
  // 2. FETCH API VERSIONS (SPECS)
  // ----------------------------------------------------
  useEffect(() => {
    if (!projectId) return;

    const fetchVersions = async () => {
      try {
        const { data } = await api.get(`/specs/${projectId}`);
        setVersions(data);

        if (data.length > 0) {
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

  // ----------------------------------------------------
  // 3. FETCH BLUEPRINTS FOR SELECTED VERSION
  // ----------------------------------------------------
  useEffect(() => {
    if (!selectedVersionId) return;

    const fetchBlueprints = async () => {
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

    fetchBlueprints();
  }, [selectedVersionId]);

  // ----------------------------------------------------
  // STATUS BADGE
  // ----------------------------------------------------
  const StatusBadge = ({ status }: { status: string }) => {
    const styles = {
      PENDING_APPROVAL: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
      APPROVED: 'bg-green-500/10 text-green-500 border-green-500/20',
      REJECTED: 'bg-red-500/10 text-red-500 border-red-500/20',
    };

    const icons = {
      PENDING_APPROVAL: Clock,
      APPROVED: CheckCircle2,
      REJECTED: XCircle,
    };

    const Icon = icons[status as keyof typeof icons] || Clock;

    return (
      <span
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
          styles[status as keyof typeof styles]
        }`}
      >
        <Icon className="w-3.5 h-3.5" />
        {status.replace('_', ' ')}
      </span>
    );
  };

  // ----------------------------------------------------
  // LOADING STATE
  // ----------------------------------------------------
  if (loadingVersions) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-zinc-500" />
      </div>
    );
  }

  // ----------------------------------------------------
  // RENDER
  // ----------------------------------------------------
  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader
        title="Test Blueprints"
        description="Review and approve AI-generated testing strategies."
      >
        <Button disabled={!selectedVersionId}>
          <Bot className="w-4 h-4 mr-2" />
          Generate New Plan
        </Button>
      </PageHeader>

      {/* API VERSION TABS */}
      {versions.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-zinc-800 rounded-xl">
          <FileJson className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-white">
            No API Specs Found
          </h3>
          <p className="text-zinc-500 text-sm mt-1">
            Upload a Swagger/OpenAPI file first.
          </p>
          <Link
            href={`/projects/${projectId}/specs`}
            className="mt-4 inline-block text-blue-500 hover:underline"
          >
            Go to Specs Upload →
          </Link>
        </div>
      ) : (
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
          {versions.map((v) => (
            <button
              key={v.id}
              onClick={() => setSelectedVersionId(v.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                selectedVersionId === v.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white'
              }`}
            >
              {v.version}
              <span className="ml-2 text-xs opacity-60">
                {new Date(v.created_at).toLocaleDateString()}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* BLUEPRINT LIST */}
      {selectedVersionId && (
        <div className="space-y-4">
          {loadingBlueprints ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-6 h-6 animate-spin text-zinc-500" />
            </div>
          ) : blueprints.length === 0 ? (
            <div className="text-center py-12 bg-zinc-900/30 rounded-xl border border-dashed border-zinc-800">
              <p className="text-zinc-400">
                No blueprints generated for this version yet.
              </p>
              <Button variant="outline" className="mt-4">
                Generate with AI
              </Button>
            </div>
          ) : (
            blueprints.map((bp) => (
              <Card
                key={bp.id}
                className="p-6 hover:border-zinc-600 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold text-white">
                        AI Strategy #{bp.id.slice(0, 8)}
                      </h3>
                      <StatusBadge status={bp.status} />
                    </div>

                    <p className="text-zinc-400 text-sm max-w-2xl line-clamp-2">
                      {bp.summary ||
                        'AI-generated automated test strategy based on your API spec.'}
                    </p>

                    <span className="flex items-center gap-1 text-xs text-zinc-500">
                      <Clock className="w-3.5 h-3.5" />
                      {new Date(bp.created_at).toLocaleString()}
                    </span>
                  </div>

                  <Link
                    href={`/projects/${projectId}/blueprints/${bp.id}`}
                  >
                    <Button variant="secondary">
                      View Details
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  );
}