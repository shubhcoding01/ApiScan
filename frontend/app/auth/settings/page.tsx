'use client';

import Link from 'next/link';
import { 
  Plus, 
  FolderGit2, 
  PlayCircle, 
  ShieldAlert, 
  Activity 
} from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';
import { Button } from '@/components/ui/button';

export default function DashboardPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Dashboard</h1>
          <p className="text-zinc-400 mt-1">
            Overview of your API security posture and automated test results.
          </p>
        </div>
        
        <Link href="/projects">
          <Button className="bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20">
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </Button>
        </Link>
      </div>

      {/* 2. Key Metrics Grid (Uses the Reusable StatCard) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          label="Active Projects"
          value="12"
          icon={FolderGit2}
          trend="+2 this week"
          trendDirection="up"
          color="blue"
        />
        <StatCard 
          label="Total Test Runs"
          value="1,240"
          icon={PlayCircle}
          trend="+15% vs last month"
          trendDirection="up"
          color="purple"
        />
        <StatCard 
          label="Critical Bugs"
          value="3"
          icon={ShieldAlert}
          trend="Requires Attention"
          trendDirection="down"
          color="red"
        />
        <StatCard 
          label="Avg. Coverage"
          value="84%"
          icon={Activity}
          trend="+5% improvement"
          trendDirection="up"
          color="green"
        />
      </div>

      {/* 3. Recent Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left: Recent Projects */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-white">Recent Projects</h3>
            <Link href="/projects" className="text-sm text-blue-400 hover:text-blue-300">
              View All
            </Link>
          </div>
          
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-zinc-800/50 transition-colors cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center text-zinc-400 group-hover:bg-blue-600/10 group-hover:text-blue-500 transition-colors">
                    <FolderGit2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors">
                      Payment Service API
                    </div>
                    <div className="text-xs text-zinc-500">Updated 2 hours ago</div>
                  </div>
                </div>
                <div className="px-2 py-1 text-xs font-medium bg-green-500/10 text-green-400 rounded-full border border-green-500/20">
                  Active
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Recent Test Runs */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-white">Recent Test Runs</h3>
            <Link href="/projects" className="text-sm text-blue-400 hover:text-blue-300">
              View History
            </Link>
          </div>
          
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-zinc-800/50 transition-colors cursor-pointer">
                <div className="flex items-center gap-4">
                  {/* Status Indicator Dot */}
                  <div className={`w-2 h-2 rounded-full ${i === 1 ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]' : 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]'}`} />
                  
                  <div>
                    <div className="text-sm font-medium text-white">
                      v1.{i} Regression Suite
                    </div>
                    <div className="text-xs text-zinc-500">
                      User Auth Service • {i === 1 ? 'Failed' : 'Passed'}
                    </div>
                  </div>
                </div>
                <div className="text-xs font-mono text-zinc-600">
                  10m ago
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}