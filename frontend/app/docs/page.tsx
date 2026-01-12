'use client';

import Link from 'next/link';
import { 
  BookOpen, 
  Shield, 
  Bot, 
  FileJson, 
  PlayCircle, 
  Key,
  ChevronRight
} from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function DocsPage() {
  
  // smooth scroll helper
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-300">
      
      <PageHeader 
        title="Documentation" 
        description="Learn how to use ApiScan to autonomously secure your APIs."
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* LEFT COLUMN: Sticky Navigation */}
        <div className="hidden lg:block lg:col-span-1">
          <div className="sticky top-24 space-y-1">
            <p className="px-3 py-2 text-xs font-bold text-zinc-500 uppercase tracking-wider">
              Table of Contents
            </p>
            <nav className="space-y-0.5">
              {[
                { id: 'getting-started', label: 'Getting Started', icon: PlayCircle },
                { id: 'core-concepts', label: 'Core Concepts', icon: BookOpen },
                { id: 'ai-engine', label: 'How the AI Works', icon: Bot },
                { id: 'security', label: 'Security & Secrets', icon: Shield },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm text-zinc-400 hover:text-white hover:bg-zinc-800/50 rounded-lg transition-colors text-left"
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* RIGHT COLUMN: Content */}
        <div className="lg:col-span-3 space-y-12">
          
          {/* Section 1: Getting Started */}
          <section id="getting-started" className="scroll-mt-24 space-y-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <PlayCircle className="w-6 h-6 text-blue-500" />
              Getting Started
            </h2>
            <Card className="border-zinc-800 bg-zinc-900/30">
              <CardContent className="pt-6 space-y-6">
                <div className="flex gap-4">
                  <div className="flex-none w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white">1</div>
                  <div>
                    <h3 className="font-medium text-white text-lg">Create a Project</h3>
                    <p className="text-zinc-400 mt-1">
                      Go to the Projects page and click "New Project". Enter your API name and Base URL (e.g., <code className="bg-black px-1 py-0.5 rounded text-zinc-300">https://api.myapp.com</code>).
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-none w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white">2</div>
                  <div>
                    <h3 className="font-medium text-white text-lg">Upload API Specification</h3>
                    <p className="text-zinc-400 mt-1">
                      Navigate to the <strong>Specs</strong> tab inside your project. Upload your <code className="bg-black px-1 py-0.5 rounded text-zinc-300">swagger.json</code> or <code className="bg-black px-1 py-0.5 rounded text-zinc-300">openapi.json</code> file. This teaches the AI about your endpoints.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-none w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white">3</div>
                  <div>
                    <h3 className="font-medium text-white text-lg">Generate & Run Tests</h3>
                    <p className="text-zinc-400 mt-1">
                      Go to the <strong>Blueprints</strong> tab. The AI will analyze your spec and propose a test plan. Review it and click "Run Tests" to execute the attack simulation.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Section 2: Core Concepts */}
          <section id="core-concepts" className="scroll-mt-24 space-y-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-purple-500" />
              Core Concepts
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="border-zinc-800 bg-zinc-900/30">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <FileJson className="w-4 h-4 text-zinc-400" />
                    Specs (Specifications)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-zinc-400">
                    The source of truth. We currently support OpenAPI v3.0 and Swagger v2.0 formats. JSON format is preferred.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-zinc-800 bg-zinc-900/30">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Bot className="w-4 h-4 text-zinc-400" />
                    Blueprints
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-zinc-400">
                    A Blueprint is an "AI Strategy Document". Instead of writing tests manually, the AI generates a JSON plan that dictates <em>what</em> to test and <em>how</em>.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Section 3: AI Engine */}
          <section id="ai-engine" className="scroll-mt-24 space-y-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Bot className="w-6 h-6 text-green-500" />
              How the AI Works
            </h2>
            <Card className="border-zinc-800 bg-zinc-900/30">
              <CardContent className="pt-6 text-zinc-400 space-y-4">
                <p>
                  ApiScan uses a <strong>Multi-Agent Architecture</strong> powered by Google Gemini.
                </p>
                <ul className="space-y-2 list-disc list-inside">
                  <li>
                    <strong className="text-white">Analysis Agent:</strong> Reads your Swagger file to understand data types, required fields, and logical relationships.
                  </li>
                  <li>
                    <strong className="text-white">Strategy Agent:</strong> Decides which attack vectors to use (e.g., SQL Injection, IDOR, BOLA).
                  </li>
                  <li>
                    <strong className="text-white">Execution Agent:</strong> Converts the strategy into real Python `pytest` code and runs it against your live API.
                  </li>
                </ul>
                <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg text-sm text-blue-300">
                  <strong>Note:</strong> The AI is designed to be "Safe by Default". It will not perform destructive tests (like DELETE /users) unless explicitly enabled in the Blueprint configuration.
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Section 4: Security */}
          <section id="security" className="scroll-mt-24 space-y-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Shield className="w-6 h-6 text-red-500" />
              Security & Secrets
            </h2>
            <Card className="border-zinc-800 bg-zinc-900/30">
              <CardHeader>
                <CardTitle className="text-lg">Managing Environment Variables</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-zinc-400">
                  Your API likely needs authentication (Bearer Tokens, API Keys) to run tests. Do <strong>not</strong> hardcode these in your Swagger file.
                </p>
                
                <h3 className="text-white font-medium">How to add keys:</h3>
                <ol className="list-decimal list-inside text-zinc-400 space-y-1">
                  <li>Go to your Project  <strong>Secrets</strong> tab.</li>
                  <li>Add a key, e.g., <code className="text-red-400">AUTH_TOKEN</code>.</li>
                  <li>Paste the value. It will be encrypted immediately.</li>
                </ol>

                <div className="flex items-start gap-3 mt-4 p-4 bg-zinc-900 border border-zinc-700 rounded-lg">
                  <Key className="w-5 h-5 text-zinc-400 shrink-0 mt-0.5" />
                  <div className="text-sm text-zinc-400">
                    <span className="text-white font-medium">Encryption Standard:</span> We use Fernet (AES-128) symmetric encryption. The keys are only decrypted momentarily inside the isolated Test Runner container and are never logged.
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

        </div>
      </div>
    </div>
  );
}