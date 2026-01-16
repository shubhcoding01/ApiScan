// import { LucideIcon, ArrowUpRight, ArrowDownRight } from 'lucide-react';

// interface StatCardProps {
//   label: string;
//   value: string | number;
//   icon: LucideIcon;
//   trend?: string; // e.g. "+12%"
//   trendDirection?: 'up' | 'down' | 'neutral';
//   color?: 'blue' | 'purple' | 'green' | 'red' | 'orange';
// }

// export default function StatCard({
//   label,
//   value,
//   icon: Icon,
//   trend,
//   trendDirection = 'neutral',
//   color = 'blue',
// }: StatCardProps) {
  
//   // Dynamic color styles map
//   const colorStyles = {
//     blue:   'bg-blue-500/10 text-blue-500',
//     purple: 'bg-purple-500/10 text-purple-500',
//     green:  'bg-green-500/10 text-green-500',
//     red:    'bg-red-500/10 text-red-500',
//     orange: 'bg-orange-500/10 text-orange-500',
//   };

//   const trendColor = 
//     trendDirection === 'up' ? 'text-green-400' : 
//     trendDirection === 'down' ? 'text-red-400' : 
//     'text-zinc-500';

//   return (
//     <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-zinc-700 transition-colors">
      
//       {/* Top Row: Icon and Trend */}
//       <div className="flex items-center justify-between mb-4">
//         <div className={`p-2 rounded-lg ${colorStyles[color]}`}>
//           <Icon className="w-6 h-6" />
//         </div>
        
//         {trend && (
//           <span className={`text-xs font-medium flex items-center gap-1 ${trendColor}`}>
//             {trend}
//             {trendDirection === 'up' && <ArrowUpRight className="w-3 h-3" />}
//             {trendDirection === 'down' && <ArrowDownRight className="w-3 h-3" />}
//           </span>
//         )}
//       </div>

//       {/* Value and Label */}
//       <div className="space-y-1">
//         <div className="text-2xl font-bold text-white">{value}</div>
//         <div className="text-sm text-zinc-500">{label}</div>
//       </div>
//     </div>
//   );
// }

'use client';

import { 
  BookOpen, 
  Shield, 
  Bot, 
  FileJson, 
  PlayCircle, 
  Key
} from 'lucide-react';

import PageHeader from '@/components/layout/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function DocsPage() {

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in duration-300">

      <PageHeader
        title="Documentation"
        description="Learn how ApiScan helps you automatically test, secure, and validate APIs using AI-driven workflows."
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

        {/* LEFT SIDEBAR */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-1">
            <p className="px-3 py-2 text-xs font-semibold text-zinc-500 uppercase">
              Contents
            </p>
            {[
              { id: 'getting-started', label: 'Getting Started', icon: PlayCircle },
              { id: 'core-concepts', label: 'Core Concepts', icon: BookOpen },
              { id: 'ai-engine', label: 'AI Engine', icon: Bot },
              { id: 'security', label: 'Security & Secrets', icon: Shield },
            ].map(item => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-zinc-400 hover:text-white hover:bg-zinc-800/50 rounded-lg transition-colors"
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="lg:col-span-3 space-y-14">

          {/* GETTING STARTED */}
          <section id="getting-started" className="scroll-mt-24 space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <PlayCircle className="w-6 h-6 text-blue-500" />
              Getting Started
            </h2>

            <Card className="border-zinc-800 bg-zinc-900/30">
              <CardContent className="pt-6 space-y-6">
                {[
                  {
                    step: 1,
                    title: 'Create a Project',
                    desc: 'Create a new project and define your API base URL (example: https://api.example.com).'
                  },
                  {
                    step: 2,
                    title: 'Upload API Specification',
                    desc: 'Upload your OpenAPI or Swagger JSON file. ApiScan uses this to understand your endpoints and data models.'
                  },
                  {
                    step: 3,
                    title: 'Generate & Run Tests',
                    desc: 'Review the AI-generated Blueprint and execute automated tests against your API.'
                  }
                ].map(item => (
                  <div key={item.step} className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white">
                        {item.title}
                      </h3>
                      <p className="text-zinc-400 mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </section>

          {/* CORE CONCEPTS */}
          <section id="core-concepts" className="scroll-mt-24 space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-purple-500" />
              Core Concepts
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="border-zinc-800 bg-zinc-900/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileJson className="w-4 h-4" />
                    API Specifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-zinc-400">
                  OpenAPI or Swagger files define your API structure. They are the foundation for all test generation.
                </CardContent>
              </Card>

              <Card className="border-zinc-800 bg-zinc-900/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bot className="w-4 h-4" />
                    Test Blueprints
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-zinc-400">
                  A Blueprint is an AI-generated test strategy describing what scenarios should be tested and why.
                </CardContent>
              </Card>
            </div>
          </section>

          {/* AI ENGINE */}
          <section id="ai-engine" className="scroll-mt-24 space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Bot className="w-6 h-6 text-green-500" />
              How the AI Engine Works
            </h2>

            <Card className="border-zinc-800 bg-zinc-900/30">
              <CardContent className="pt-6 space-y-4 text-zinc-400">
                <p>
                  ApiScan uses a multi-step AI reasoning process to create meaningful API tests.
                </p>

                <ul className="list-disc list-inside space-y-2">
                  <li>
                    <strong className="text-white">Analysis Phase:</strong> Understands endpoints, parameters, and relationships.
                  </li>
                  <li>
                    <strong className="text-white">Strategy Phase:</strong> Identifies security risks, edge cases, and logic flaws.
                  </li>
                  <li>
                    <strong className="text-white">Execution Phase:</strong> Runs structured test requests against your API and records results.
                  </li>
                </ul>

                <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg text-sm text-blue-300">
                  The AI never performs destructive operations unless explicitly allowed.
                </div>
              </CardContent>
            </Card>
          </section>

          {/* SECURITY */}
          <section id="security" className="scroll-mt-24 space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Shield className="w-6 h-6 text-red-500" />
              Security & Secrets
            </h2>

            <Card className="border-zinc-800 bg-zinc-900/30">
              <CardHeader>
                <CardTitle>Environment Variables & API Keys</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-zinc-400">
                <p>
                  Authentication tokens and API keys should be stored securely using the Secrets feature.
                </p>

                <ol className="list-decimal list-inside space-y-1">
                  <li>Open your project’s <strong>Secrets</strong> tab</li>
                  <li>Add a key name (example: AUTH_TOKEN)</li>
                  <li>Paste the value — it is encrypted immediately</li>
                </ol>

                <div className="flex gap-3 p-4 bg-zinc-900 border border-zinc-700 rounded-lg">
                  <Key className="w-5 h-5 text-zinc-400 mt-0.5" />
                  <p className="text-sm">
                    Secrets are encrypted using symmetric encryption and only decrypted inside the test execution environment.
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

        </main>
      </div>
    </div>
  );
}
