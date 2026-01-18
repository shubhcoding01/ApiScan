'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  Shield, 
  Bot, 
  FileJson, 
  PlayCircle, 
  Key,
  Copy,
  Check,
  Download
} from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// --- CLEAN JSON FOR DOWNLOAD/COPY (No Comments) ---
const CLEAN_SPEC = {
  "openapi": "3.0.0",
  "info": {
    "title": "My API Name",
    "version": "1.0.0"
  },
  "servers": [
    {
      "url": "https://api.myapp.com",
      "description": "Production Server"
    }
  ],
  "components": {
    "securitySchemes": {
      "BearerAuth": {
        "type": "http",
        "scheme": "bearer"
      }
    }
  },
  "paths": {
    "/users": {
      "get": {
        "summary": "Get all users",
        "security": [{ "BearerAuth": [] }],
        "responses": {
          "200": { "description": "OK" }
        }
      }
    }
  }
};

export default function DocsPage() {
  const [copied, setCopied] = useState(false);

  // Smooth scroll helper
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // Handle Copy
  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(CLEAN_SPEC, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Handle Download
  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(CLEAN_SPEC, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'openapi-template.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-500/30">
      
      {/* 1. FIXED NAVBAR */}
      <nav className="border-b border-zinc-800 bg-black/50 backdrop-blur-md fixed top-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white">
              A
            </div>
            <span className="text-xl font-bold tracking-tight">ApiScan</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            <Link href="/docs" className="text-sm font-medium text-white">Documentation</Link>
            {/* <Link href="/pricing" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Pricing</Link> */}
            {/* <Link href="/blog" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Blog</Link> */}
          </div>

          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Sign In</Link>
            <Link href="/login">
              <Button size="sm" className="bg-white text-black hover:bg-zinc-200">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* 2. MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        
        <PageHeader 
          title="Documentation"
          description="Learn how to use ApiScan to autonomously secure your APIs using AI-driven testing strategies."
        />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          
          {/* LEFT COLUMN: Sticky Navigation */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              <p className="px-3 text-xs font-bold text-zinc-500 uppercase tracking-wider">Table of Contents</p>
              <nav className="space-y-1">
                {[
                  { id: 'getting-started', label: 'Getting Started', icon: PlayCircle },
                  { id: 'spec-format', label: 'Spec Format & Template', icon: FileJson },
                  { id: 'core-concepts', label: 'Core Concepts', icon: BookOpen },
                  { id: 'ai-engine', label: 'How the AI Works', icon: Bot },
                  { id: 'security', label: 'Security & Secrets', icon: Shield },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-800/50 rounded-lg transition-colors text-left"
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* RIGHT COLUMN: Content */}
          <div className="lg:col-span-3 space-y-16">
            
            {/* Section 1: Getting Started */}
            <section id="getting-started" className="scroll-mt-32 space-y-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3 pb-4 border-b border-zinc-800">
                <PlayCircle className="w-6 h-6 text-blue-500" />
                Getting Started
              </h2>
              <Card className="border-zinc-800 bg-zinc-900/30">
                <CardContent className="pt-6 space-y-8">
                  {/* Step 1 */}
                  <div className="flex gap-4">
                    <div className="flex-none w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white text-sm">1</div>
                    <div>
                      <h3 className="font-bold text-white text-lg">Create a Project</h3>
                      <p className="text-zinc-400 mt-2 leading-relaxed">
                        Go to the Projects page and click "New Project". Enter your API name and Base URL.
                      </p>
                    </div>
                  </div>
                  {/* Step 2 */}
                  <div className="flex gap-4">
                    <div className="flex-none w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white text-sm">2</div>
                    <div>
                      <h3 className="font-bold text-white text-lg">Upload API Specification</h3>
                      <p className="text-zinc-400 mt-2 leading-relaxed">
                        Navigate to the <strong>Specs</strong> tab. Upload your <code className="bg-zinc-950 border border-zinc-800 px-1.5 py-0.5 rounded text-blue-300 font-mono text-sm">swagger.json</code> file.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* NEW SECTION: Spec Format Guide (The Code Box) */}
            <section id="spec-format" className="scroll-mt-32 space-y-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3 pb-4 border-b border-zinc-800">
                <FileJson className="w-6 h-6 text-yellow-500" />
                Required Spec Format
              </h2>
              <Card className="border-zinc-800 bg-zinc-900/30 overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-lg">Template: openapi.json</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="bg-[#0D0D0D] border-t border-zinc-800">
                    
                    {/* Toolbar */}
                    <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800 bg-zinc-900/50">
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="ghost" onClick={handleCopy} className="h-7 text-xs hover:bg-zinc-800 text-zinc-400 hover:text-white">
                          {copied ? <Check className="w-3 h-3 mr-1.5" /> : <Copy className="w-3 h-3 mr-1.5" />}
                          {copied ? 'Copied' : 'Copy JSON'}
                        </Button>
                        <Button size="sm" variant="ghost" onClick={handleDownload} className="h-7 text-xs hover:bg-zinc-800 text-zinc-400 hover:text-white">
                          <Download className="w-3 h-3 mr-1.5" />
                          Download
                        </Button>
                      </div>
                    </div>

                    {/* Styled Code Block */}
                    <div className="p-6 overflow-x-auto font-mono text-sm leading-relaxed">
                      <div className="text-zinc-400">{`{`}</div>
                      <div className="pl-4">
                        <span className="text-blue-400">"openapi"</span>: <span className="text-green-400">"3.0.0"</span>, <span className="text-zinc-500 italic">// 👈 Must be 3.0 or higher</span>
                      </div>
                      <div className="pl-4">
                        <span className="text-blue-400">"info"</span>: {`{`}
                      </div>
                      <div className="pl-8">
                         <span className="text-blue-400">"title"</span>: <span className="text-green-400">"My API Name"</span>,
                      </div>
                      <div className="pl-8">
                         <span className="text-blue-400">"version"</span>: <span className="text-green-400">"1.0.0"</span>
                      </div>
                      <div className="pl-4">{`},`}</div>
                      
                      <div className="pl-4">
                        <span className="text-blue-400">"servers"</span>: [
                      </div>
                      <div className="pl-8">{`{`}</div>
                      <div className="pl-12">
                        <span className="text-blue-400">"url"</span>: <span className="text-green-400">"https://api.myapp.com"</span> <span className="text-zinc-500 italic">// 👈 Add your production URL here</span>
                      </div>
                      <div className="pl-8">{`}`}],
                      </div>

                      <div className="pl-4">
                         <span className="text-blue-400">"paths"</span>: {`{`}
                      </div>
                      <div className="pl-8">
                         <span className="text-blue-400">"/users"</span>: {`{`} <span className="text-zinc-500 italic">// 👈 Define your endpoints</span>
                      </div>
                      <div className="pl-12">
                         <span className="text-blue-400">"get"</span>: {`{`}
                      </div>
                      <div className="pl-16">
                         <span className="text-blue-400">"summary"</span>: <span className="text-green-400">"Get all users"</span>,
                      </div>
                      <div className="pl-16">
                         <span className="text-blue-400">"responses"</span>: {`{ ... }`}
                      </div>
                      <div className="pl-12">{`}`}</div>
                      <div className="pl-8">{`}`}</div>
                      <div className="pl-4">{`}`}</div>
                      <div className="text-zinc-400">{`}`}</div>
                    </div>

                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Section 3: Core Concepts */}
            <section id="core-concepts" className="scroll-mt-32 space-y-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3 pb-4 border-b border-zinc-800">
                <BookOpen className="w-6 h-6 text-purple-500" />
                Core Concepts
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-zinc-800 bg-zinc-900/30">
                  <CardHeader><CardTitle className="text-base">Blueprints</CardTitle></CardHeader>
                  <CardContent>
                    <p className="text-sm text-zinc-400">A Blueprint is an "AI Strategy Document" generated from your spec.</p>
                  </CardContent>
                </Card>
                <Card className="border-zinc-800 bg-zinc-900/30">
                  <CardHeader><CardTitle className="text-base">Secrets</CardTitle></CardHeader>
                  <CardContent>
                    <p className="text-sm text-zinc-400">Encrypted environment variables (API Keys) used during testing.</p>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Section 4: AI Engine */}
            <section id="ai-engine" className="scroll-mt-32 space-y-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3 pb-4 border-b border-zinc-800">
                <Bot className="w-6 h-6 text-green-500" />
                How the AI Works
              </h2>
              <Card className="border-zinc-800 bg-zinc-900/30">
                <CardContent className="pt-6 text-zinc-400 space-y-6">
                  <p>ApiScan uses a <strong>Multi-Agent Architecture</strong> powered by Google Gemini:</p>
                  
                  

                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Analysis Agent:</strong> Maps your API structure.</li>
                    <li><strong>Strategy Agent:</strong> Plans attacks (SQLi, IDOR).</li>
                    <li><strong>Execution Agent:</strong> Runs the tests.</li>
                  </ul>
                </CardContent>
              </Card>
            </section>

            {/* Section 4: Security */}
            <section id="security" className="scroll-mt-32 space-y-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3 pb-4 border-b border-zinc-800">
                <Shield className="w-6 h-6 text-red-500" />
                Security & Secrets
              </h2>
              <Card className="border-zinc-800 bg-zinc-900/30">
                <CardHeader>
                  <CardTitle className="text-lg">Managing Environment Variables</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-zinc-400 leading-relaxed">
                    Your API likely needs authentication (Bearer Tokens, API Keys) to run tests. Do <strong>not</strong> hardcode these in your Swagger file. Instead, use our encrypted vault.
                  </p>
                  
                  <div className="space-y-4">
                    <h3 className="text-white font-medium">How to add keys:</h3>
                    <ol className="list-decimal list-inside text-zinc-400 space-y-2 ml-2">
                      <li>Go to your Project <strong>Secrets</strong> tab.</li>
                      <li>Add a key, e.g., <code className="bg-zinc-950 border border-zinc-800 px-1.5 py-0.5 rounded text-red-400 font-mono text-sm">AUTH_TOKEN</code>.</li>
                      <li>Paste the value. It will be encrypted immediately.</li>
                    </ol>
                  </div>

                  <div className="flex items-start gap-3 mt-4 p-4 bg-zinc-950 border border-zinc-800 rounded-lg">
                    <Key className="w-5 h-5 text-zinc-500 shrink-0 mt-0.5" />
                    <div className="text-sm text-zinc-400">
                      <span className="text-white font-medium block mb-1">Encryption Standard</span> 
                      We use Fernet (AES-128) symmetric encryption. The keys are only decrypted momentarily inside the isolated Test Runner container and are never logged or exposed in the UI.
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>


          </div>
        </div>
      </main>
    </div>
  );
}