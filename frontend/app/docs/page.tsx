// 'use client';

// import { useState } from 'react';
// import Link from 'next/link';
// import { 
//   BookOpen, 
//   Shield, 
//   Bot, 
//   FileJson, 
//   PlayCircle, 
//   Key,
//   Copy,
//   Check,
//   Download
// } from 'lucide-react';
// import PageHeader from '@/components/layout/PageHeader';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';

// // --- CLEAN JSON FOR DOWNLOAD/COPY (No Comments) ---
// const CLEAN_SPEC = {
//   "openapi": "3.0.0",
//   "info": {
//     "title": "My API Name",
//     "version": "1.0.0"
//   },
//   "servers": [
//     {
//       "url": "https://api.myapp.com",
//       "description": "Production Server"
//     }
//   ],
//   "components": {
//     "securitySchemes": {
//       "BearerAuth": {
//         "type": "http",
//         "scheme": "bearer"
//       }
//     }
//   },
//   "paths": {
//     "/users": {
//       "get": {
//         "summary": "Get all users",
//         "security": [{ "BearerAuth": [] }],
//         "responses": {
//           "200": { "description": "OK" }
//         }
//       }
//     }
//   }
// };

// export default function DocsPage() {
//   const [copied, setCopied] = useState(false);

//   // Smooth scroll helper
//   const scrollTo = (id: string) => {
//     const element = document.getElementById(id);
//     if (element) {
//       const y = element.getBoundingClientRect().top + window.scrollY - 100;
//       window.scrollTo({ top: y, behavior: 'smooth' });
//     }
//   };

//   // Handle Copy
//   const handleCopy = () => {
//     navigator.clipboard.writeText(JSON.stringify(CLEAN_SPEC, null, 2));
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   // Handle Download
//   const handleDownload = () => {
//     const blob = new Blob([JSON.stringify(CLEAN_SPEC, null, 2)], { type: 'application/json' });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = 'openapi-template.json';
//     a.click();
//     URL.revokeObjectURL(url);
//   };

//   return (
//     <div className="min-h-screen bg-black text-white selection:bg-blue-500/30">
      
//       {/* 1. FIXED NAVBAR */}
//       <nav className="border-b border-zinc-800 bg-black/50 backdrop-blur-md fixed top-0 w-full z-50">
//         <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
//           <Link href="/" className="flex items-center gap-2">
//             <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white">
//               A
//             </div>
//             <span className="text-xl font-bold tracking-tight">ApiScan</span>
//           </Link>
          
//           <div className="hidden md:flex items-center gap-8">
//             <Link href="/docs" className="text-sm font-medium text-white">Documentation</Link>
//             {/* <Link href="/pricing" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Pricing</Link> */}
//             {/* <Link href="/blog" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Blog</Link> */}
//           </div>

//           <div className="flex items-center gap-4">
//             <Link href="/login" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Sign In</Link>
//             <Link href="/login">
//               <Button size="sm" className="bg-white text-black hover:bg-zinc-200">Get Started</Button>
//             </Link>
//           </div>
//         </div>
//       </nav>

//       {/* 2. MAIN CONTENT */}
//       <main className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        
//         <PageHeader 
//           title="Documentation"
//           description="Learn how to use ApiScan to autonomously secure your APIs using AI-driven testing strategies."
//         />

//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          
//           {/* LEFT COLUMN: Sticky Navigation */}
//           <div className="hidden lg:block lg:col-span-1">
//             <div className="sticky top-24 space-y-4">
//               <p className="px-3 text-xs font-bold text-zinc-500 uppercase tracking-wider">Table of Contents</p>
//               <nav className="space-y-1">
//                 {[
//                   { id: 'getting-started', label: 'Getting Started', icon: PlayCircle },
//                   { id: 'spec-format', label: 'Spec Format & Template', icon: FileJson },
//                   { id: 'core-concepts', label: 'Core Concepts', icon: BookOpen },
//                   { id: 'ai-engine', label: 'How the AI Works', icon: Bot },
//                   { id: 'security', label: 'Security & Secrets', icon: Shield },
//                 ].map((item) => (
//                   <button
//                     key={item.id}
//                     onClick={() => scrollTo(item.id)}
//                     className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-800/50 rounded-lg transition-colors text-left"
//                   >
//                     <item.icon className="w-4 h-4" />
//                     {item.label}
//                   </button>
//                 ))}
//               </nav>
//             </div>
//           </div>

//           {/* RIGHT COLUMN: Content */}
//           <div className="lg:col-span-3 space-y-16">
            
//             {/* Section 1: Getting Started */}
//             <section id="getting-started" className="scroll-mt-32 space-y-6">
//               <h2 className="text-2xl font-bold text-white flex items-center gap-3 pb-4 border-b border-zinc-800">
//                 <PlayCircle className="w-6 h-6 text-blue-500" />
//                 Getting Started
//               </h2>
//               <Card className="border-zinc-800 bg-zinc-900/30">
//                 <CardContent className="pt-6 space-y-8">
//                   {/* Step 1 */}
//                   <div className="flex gap-4">
//                     <div className="flex-none w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white text-sm">1</div>
//                     <div>
//                       <h3 className="font-bold text-white text-lg">Create a Project</h3>
//                       <p className="text-zinc-400 mt-2 leading-relaxed">
//                         Go to the Projects page and click "New Project". Enter your API name and Base URL.
//                       </p>
//                     </div>
//                   </div>
//                   {/* Step 2 */}
//                   <div className="flex gap-4">
//                     <div className="flex-none w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white text-sm">2</div>
//                     <div>
//                       <h3 className="font-bold text-white text-lg">Upload API Specification</h3>
//                       <p className="text-zinc-400 mt-2 leading-relaxed">
//                         Navigate to the <strong>Specs</strong> tab. Upload your <code className="bg-zinc-950 border border-zinc-800 px-1.5 py-0.5 rounded text-blue-300 font-mono text-sm">swagger.json</code> file.
//                       </p>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             </section>

//             {/* NEW SECTION: Spec Format Guide (The Code Box) */}
//             <section id="spec-format" className="scroll-mt-32 space-y-6">
//               <h2 className="text-2xl font-bold text-white flex items-center gap-3 pb-4 border-b border-zinc-800">
//                 <FileJson className="w-6 h-6 text-yellow-500" />
//                 Required Spec Format
//               </h2>
//               <Card className="border-zinc-800 bg-zinc-900/30 overflow-hidden">
//                 <CardHeader>
//                   <CardTitle className="text-lg">Template: openapi.json</CardTitle>
//                 </CardHeader>
//                 <CardContent className="p-0">
//                   <div className="bg-[#0D0D0D] border-t border-zinc-800">
                    
//                     {/* Toolbar */}
//                     <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800 bg-zinc-900/50">
//                       <div className="flex gap-1.5">
//                         <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
//                         <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
//                         <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
//                       </div>
//                       <div className="flex gap-2">
//                         <Button size="sm" variant="ghost" onClick={handleCopy} className="h-7 text-xs hover:bg-zinc-800 text-zinc-400 hover:text-white">
//                           {copied ? <Check className="w-3 h-3 mr-1.5" /> : <Copy className="w-3 h-3 mr-1.5" />}
//                           {copied ? 'Copied' : 'Copy JSON'}
//                         </Button>
//                         <Button size="sm" variant="ghost" onClick={handleDownload} className="h-7 text-xs hover:bg-zinc-800 text-zinc-400 hover:text-white">
//                           <Download className="w-3 h-3 mr-1.5" />
//                           Download
//                         </Button>
//                       </div>
//                     </div>

//                     {/* Styled Code Block */}
//                     <div className="p-6 overflow-x-auto font-mono text-sm leading-relaxed">
//                       <div className="text-zinc-400">{`{`}</div>
//                       <div className="pl-4">
//                         <span className="text-blue-400">"openapi"</span>: <span className="text-green-400">"3.0.0"</span>, <span className="text-zinc-500 italic">// 👈 Must be 3.0 or higher</span>
//                       </div>
//                       <div className="pl-4">
//                         <span className="text-blue-400">"info"</span>: {`{`}
//                       </div>
//                       <div className="pl-8">
//                          <span className="text-blue-400">"title"</span>: <span className="text-green-400">"My API Name"</span>,
//                       </div>
//                       <div className="pl-8">
//                          <span className="text-blue-400">"version"</span>: <span className="text-green-400">"1.0.0"</span>
//                       </div>
//                       <div className="pl-4">{`},`}</div>
                      
//                       <div className="pl-4">
//                         <span className="text-blue-400">"servers"</span>: [
//                       </div>
//                       <div className="pl-8">{`{`}</div>
//                       <div className="pl-12">
//                         <span className="text-blue-400">"url"</span>: <span className="text-green-400">"https://api.myapp.com"</span> <span className="text-zinc-500 italic">// 👈 Add your production URL here</span>
//                       </div>
//                       <div className="pl-8">{`}`}],
//                       </div>

//                       <div className="pl-4">
//                          <span className="text-blue-400">"paths"</span>: {`{`}
//                       </div>
//                       <div className="pl-8">
//                          <span className="text-blue-400">"/users"</span>: {`{`} <span className="text-zinc-500 italic">// 👈 Define your endpoints</span>
//                       </div>
//                       <div className="pl-12">
//                          <span className="text-blue-400">"get"</span>: {`{`}
//                       </div>
//                       <div className="pl-16">
//                          <span className="text-blue-400">"summary"</span>: <span className="text-green-400">"Get all users"</span>,
//                       </div>
//                       <div className="pl-16">
//                          <span className="text-blue-400">"responses"</span>: {`{ ... }`}
//                       </div>
//                       <div className="pl-12">{`}`}</div>
//                       <div className="pl-8">{`}`}</div>
//                       <div className="pl-4">{`}`}</div>
//                       <div className="text-zinc-400">{`}`}</div>
//                     </div>

//                   </div>
//                 </CardContent>
//               </Card>
//             </section>

//             {/* Section 3: Core Concepts */}
//             <section id="core-concepts" className="scroll-mt-32 space-y-6">
//               <h2 className="text-2xl font-bold text-white flex items-center gap-3 pb-4 border-b border-zinc-800">
//                 <BookOpen className="w-6 h-6 text-purple-500" />
//                 Core Concepts
//               </h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <Card className="border-zinc-800 bg-zinc-900/30">
//                   <CardHeader><CardTitle className="text-base">Blueprints</CardTitle></CardHeader>
//                   <CardContent>
//                     <p className="text-sm text-zinc-400">A Blueprint is an "AI Strategy Document" generated from your spec.</p>
//                   </CardContent>
//                 </Card>
//                 <Card className="border-zinc-800 bg-zinc-900/30">
//                   <CardHeader><CardTitle className="text-base">Secrets</CardTitle></CardHeader>
//                   <CardContent>
//                     <p className="text-sm text-zinc-400">Encrypted environment variables (API Keys) used during testing.</p>
//                   </CardContent>
//                 </Card>
//               </div>
//             </section>

//             {/* Section 4: AI Engine */}
//             <section id="ai-engine" className="scroll-mt-32 space-y-6">
//               <h2 className="text-2xl font-bold text-white flex items-center gap-3 pb-4 border-b border-zinc-800">
//                 <Bot className="w-6 h-6 text-green-500" />
//                 How the AI Works
//               </h2>
//               <Card className="border-zinc-800 bg-zinc-900/30">
//                 <CardContent className="pt-6 text-zinc-400 space-y-6">
//                   <p>ApiScan uses a <strong>Multi-Agent Architecture</strong> powered by Google Gemini:</p>
                  
                  

//                   <ul className="list-disc list-inside space-y-2 ml-4">
//                     <li><strong>Analysis Agent:</strong> Maps your API structure.</li>
//                     <li><strong>Strategy Agent:</strong> Plans attacks (SQLi, IDOR).</li>
//                     <li><strong>Execution Agent:</strong> Runs the tests.</li>
//                   </ul>
//                 </CardContent>
//               </Card>
//             </section>

//             {/* Section 4: Security */}
//             <section id="security" className="scroll-mt-32 space-y-6">
//               <h2 className="text-2xl font-bold text-white flex items-center gap-3 pb-4 border-b border-zinc-800">
//                 <Shield className="w-6 h-6 text-red-500" />
//                 Security & Secrets
//               </h2>
//               <Card className="border-zinc-800 bg-zinc-900/30">
//                 <CardHeader>
//                   <CardTitle className="text-lg">Managing Environment Variables</CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-6">
//                   <p className="text-zinc-400 leading-relaxed">
//                     Your API likely needs authentication (Bearer Tokens, API Keys) to run tests. Do <strong>not</strong> hardcode these in your Swagger file. Instead, use our encrypted vault.
//                   </p>
                  
//                   <div className="space-y-4">
//                     <h3 className="text-white font-medium">How to add keys:</h3>
//                     <ol className="list-decimal list-inside text-zinc-400 space-y-2 ml-2">
//                       <li>Go to your Project <strong>Secrets</strong> tab.</li>
//                       <li>Add a key, e.g., <code className="bg-zinc-950 border border-zinc-800 px-1.5 py-0.5 rounded text-red-400 font-mono text-sm">AUTH_TOKEN</code>.</li>
//                       <li>Paste the value. It will be encrypted immediately.</li>
//                     </ol>
//                   </div>

//                   <div className="flex items-start gap-3 mt-4 p-4 bg-zinc-950 border border-zinc-800 rounded-lg">
//                     <Key className="w-5 h-5 text-zinc-500 shrink-0 mt-0.5" />
//                     <div className="text-sm text-zinc-400">
//                       <span className="text-white font-medium block mb-1">Encryption Standard</span> 
//                       We use Fernet (AES-128) symmetric encryption. The keys are only decrypted momentarily inside the isolated Test Runner container and are never logged or exposed in the UI.
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             </section>


//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }


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
  Download,
  ArrowRight,
  Sparkles,
  Lock,
  Zap,
  Terminal,
  Code2,
  CheckCircle2
} from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';


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
  const [activeSection, setActiveSection] = useState('getting-started');

  const scrollTo = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(CLEAN_SPEC, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(CLEAN_SPEC, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'openapi-template.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const navItems = [
    { id: 'getting-started', label: 'Getting Started', icon: PlayCircle, color: 'cyan' },
    { id: 'spec-format', label: 'Spec Format', icon: FileJson, color: 'amber' },
    { id: 'core-concepts', label: 'Core Concepts', icon: BookOpen, color: 'purple' },
    { id: 'ai-engine', label: 'AI Engine', icon: Bot, color: 'emerald' },
    { id: 'security', label: 'Security', icon: Shield, color: 'red' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white selection:bg-cyan-500/30">
      
      {/* NAVBAR */}
      <nav className="border-b border-white/5 bg-slate-950/80 backdrop-blur-xl fixed top-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center font-bold text-white shadow-lg shadow-cyan-900/30 group-hover:shadow-cyan-900/50 transition-all">
              <Bot className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              ApiScan
            </span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            <Link href="/#features" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
              Features
            </Link>
            <Link href="/docs" className="text-sm font-medium text-white">
              Documentation
            </Link>
            <Link href="/pricing" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
              Pricing
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white hover:bg-slate-800/50">
                Sign In
              </Button>
            </Link>
            <Link href="/login">
              <Button size="sm" className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-lg shadow-cyan-900/30 font-medium">
                Get Started
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        
        {/* Hero Header */}
        <div className="mb-16 text-center max-w-3xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 border border-slate-800/50 backdrop-blur-sm text-sm font-medium text-slate-300">
            <BookOpen className="w-4 h-4 text-cyan-400" />
            <span>Complete Developer Guide</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-black tracking-tight">
            <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              Documentation
            </span>
          </h1>
          
          <p className="text-xl text-slate-400 leading-relaxed">
            Learn how to use ApiScan to autonomously secure your APIs with AI-driven testing strategies
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          
          {/* SIDEBAR NAVIGATION */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24 space-y-2">
              <p className="px-3 text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">
                On This Page
              </p>
              <nav className="space-y-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl transition-all group ${
                      activeSection === item.id
                        ? 'bg-slate-800/80 text-white border border-slate-700/50'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                    }`}
                  >
                    <item.icon className={`w-4 h-4 transition-colors ${
                      activeSection === item.id ? `text-${item.color}-400` : 'text-slate-500 group-hover:text-slate-400'
                    }`} />
                    {item.label}
                  </button>
                ))}
              </nav>

              {/* Quick Links Card */}
              <Card className="mt-8 bg-gradient-to-br from-cyan-900/20 to-slate-900/40 border-cyan-500/30 overflow-hidden">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold text-cyan-400 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Quick Start
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Link href="/login" className="block text-sm text-slate-400 hover:text-white transition-colors">
                    → Create Account
                  </Link>
                  <Link href="/login" className="block text-sm text-slate-400 hover:text-white transition-colors">
                    → Start First Project
                  </Link>
                  <Link href="#spec-format" className="block text-sm text-slate-400 hover:text-white transition-colors">
                    → Download Template
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* CONTENT */}
          <div className="lg:col-span-3 space-y-20">
            
            {/* GETTING STARTED */}
            <section id="getting-started" className="scroll-mt-24 space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-1000">
              <div className="flex items-center gap-4 pb-6 border-b border-slate-800/50">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center">
                  <PlayCircle className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white">Getting Started</h2>
                  <p className="text-slate-400 text-sm mt-1">Your first API test in under 5 minutes</p>
                </div>
              </div>

              <div className="space-y-6">
                {/* Step 1 */}
                <Card className="group border-slate-800/50 bg-slate-900/30 hover:border-slate-700 transition-all overflow-hidden">
                  <CardContent className="pt-6">
                    <div className="flex gap-6">
                      <div className="flex-none w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center font-bold text-xl text-cyan-400 group-hover:scale-110 transition-transform">
                        1
                      </div>
                      <div className="flex-1 space-y-3">
                        <h3 className="font-bold text-white text-xl">Create Your First Project</h3>
                        <p className="text-slate-400 leading-relaxed">
                          Navigate to the Projects dashboard and click <strong className="text-white">"New Project"</strong>. Enter your API name and base URL (e.g., <code className="bg-slate-950 border border-slate-800 px-2 py-1 rounded text-cyan-400 font-mono text-sm">https://api.myapp.com</code>).
                        </p>
                        <div className="flex items-center gap-2 pt-2">
                          <Badge variant="outline" className="border-cyan-500/30 text-cyan-400 text-xs">
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            Quick Setup
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Step 2 */}
                <Card className="group border-slate-800/50 bg-slate-900/30 hover:border-slate-700 transition-all overflow-hidden">
                  <CardContent className="pt-6">
                    <div className="flex gap-6">
                      <div className="flex-none w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30 flex items-center justify-center font-bold text-xl text-blue-400 group-hover:scale-110 transition-transform">
                        2
                      </div>
                      <div className="flex-1 space-y-3">
                        <h3 className="font-bold text-white text-xl">Upload API Specification</h3>
                        <p className="text-slate-400 leading-relaxed">
                          Go to the <strong className="text-white">Specs</strong> tab and upload your OpenAPI/Swagger file. We support both JSON and YAML formats. The AI will automatically parse and validate your specification.
                        </p>
                        <div className="flex flex-wrap items-center gap-2 pt-2">
                          <Badge variant="outline" className="border-blue-500/30 text-blue-400 text-xs">
                            JSON
                          </Badge>
                          <Badge variant="outline" className="border-blue-500/30 text-blue-400 text-xs">
                            YAML
                          </Badge>
                          <Badge variant="outline" className="border-emerald-500/30 text-emerald-400 text-xs">
                            OpenAPI 3.0+
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Step 3 */}
                <Card className="group border-slate-800/50 bg-slate-900/30 hover:border-slate-700 transition-all overflow-hidden">
                  <CardContent className="pt-6">
                    <div className="flex gap-6">
                      <div className="flex-none w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 flex items-center justify-center font-bold text-xl text-purple-400 group-hover:scale-110 transition-transform">
                        3
                      </div>
                      <div className="flex-1 space-y-3">
                        <h3 className="font-bold text-white text-xl">Configure & Launch Tests</h3>
                        <p className="text-slate-400 leading-relaxed">
                          Add your environment secrets, review the AI-generated test strategy, and hit <strong className="text-white">"Run Tests"</strong>. Watch real-time execution in the console with instant vulnerability alerts.
                        </p>
                        <div className="flex items-center gap-2 pt-2">
                          <Badge variant="outline" className="border-emerald-500/30 text-emerald-400 text-xs">
                            <Zap className="w-3 h-3 mr-1" />
                            Real-time Results
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* SPEC FORMAT */}
            <section id="spec-format" className="scroll-mt-24 space-y-8">
              <div className="flex items-center gap-4 pb-6 border-b border-slate-800/50">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500/20 to-yellow-500/20 border border-amber-500/30 flex items-center justify-center">
                  <FileJson className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white">OpenAPI Specification Format</h2>
                  <p className="text-slate-400 text-sm mt-1">Required structure and template</p>
                </div>
              </div>

              <Card className="border-slate-800/50 bg-slate-900/30 overflow-hidden shadow-xl">
                <CardHeader className="border-b border-slate-800/50 bg-slate-950/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg font-semibold">openapi-template.json</CardTitle>
                      <CardDescription className="text-slate-500 text-sm mt-1">
                        Use this template to structure your API specification
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={handleCopy} 
                        className="border-slate-700 hover:bg-slate-800 text-slate-400 hover:text-white h-9"
                      >
                        {copied ? (
                          <>
                            <Check className="w-4 h-4 mr-2 text-emerald-400" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4 mr-2" />
                            Copy
                          </>
                        )}
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={handleDownload} 
                        className="border-slate-700 hover:bg-slate-800 text-slate-400 hover:text-white h-9"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                <div className="bg-slate-950">
                  {/* Terminal Header */}
                  <div className="flex items-center gap-2 px-6 py-3 border-b border-slate-800/50">
                    <div className="w-3 h-3 rounded-full bg-red-500/30 border border-red-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-500/30 border border-amber-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-500/30 border border-emerald-500/50"></div>
                    <span className="ml-3 text-xs text-slate-500 font-mono">JSON</span>
                  </div>

                  {/* Code Block */}
                  <div className="p-6 overflow-x-auto font-mono text-sm leading-loose">
                    <div className="text-slate-400">{`{`}</div>
                    <div className="pl-4">
                      <span className="text-cyan-400">"openapi"</span>: <span className="text-emerald-400">"3.0.0"</span>, <span className="text-slate-600 italic">// 👈 Must be 3.0 or higher</span>
                    </div>
                    <div className="pl-4">
                      <span className="text-cyan-400">"info"</span>: {`{`}
                    </div>
                    <div className="pl-8">
                       <span className="text-cyan-400">"title"</span>: <span className="text-emerald-400">"My API Name"</span>,
                    </div>
                    <div className="pl-8">
                       <span className="text-cyan-400">"version"</span>: <span className="text-emerald-400">"1.0.0"</span>
                    </div>
                    <div className="pl-4">{`},`}</div>
                    
                    <div className="pl-4 mt-2">
                      <span className="text-cyan-400">"servers"</span>: [
                    </div>
                    <div className="pl-8">{`{`}</div>
                    <div className="pl-12">
                      <span className="text-cyan-400">"url"</span>: <span className="text-emerald-400">"https://api.myapp.com"</span> <span className="text-slate-600 italic">// 👈 Your production URL</span>
                    </div>
                    <div className="pl-8">{`}`}],
                    </div>

                    <div className="pl-4 mt-2">
                       <span className="text-cyan-400">"paths"</span>: {`{`}
                    </div>
                    <div className="pl-8">
                       <span className="text-cyan-400">"/users"</span>: {`{`} <span className="text-slate-600 italic">// 👈 Define your endpoints</span>
                    </div>
                    <div className="pl-12">
                       <span className="text-cyan-400">"get"</span>: {`{`}
                    </div>
                    <div className="pl-16">
                       <span className="text-cyan-400">"summary"</span>: <span className="text-emerald-400">"Get all users"</span>,
                    </div>
                    <div className="pl-16">
                       <span className="text-cyan-400">"responses"</span>: {`{ ... }`}
                    </div>
                    <div className="pl-12">{`}`}</div>
                    <div className="pl-8">{`}`}</div>
                    <div className="pl-4">{`}`}</div>
                    <div className="text-slate-400 mt-2">{`}`}</div>
                  </div>
                </div>
              </Card>

              {/* Requirements Card */}
              <Card className="border-amber-500/30 bg-gradient-to-br from-amber-900/10 to-slate-900/30">
                <CardHeader>
                  <CardTitle className="text-lg text-amber-400 flex items-center gap-2">
                    <Terminal className="w-5 h-5" />
                    Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-slate-400">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                      <span>OpenAPI version <strong className="text-white">3.0.0 or higher</strong></span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                      <span>At least one <code className="bg-slate-950 border border-slate-800 px-1.5 py-0.5 rounded text-cyan-400 text-sm">server</code> URL defined</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                      <span>Endpoint <code className="bg-slate-950 border border-slate-800 px-1.5 py-0.5 rounded text-cyan-400 text-sm">paths</code> with HTTP methods (GET, POST, etc.)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                      <span>Response schemas for AI analysis (optional but recommended)</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </section>

            {/* CORE CONCEPTS */}
            <section id="core-concepts" className="scroll-mt-24 space-y-8">
              <div className="flex items-center gap-4 pb-6 border-b border-slate-800/50">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white">Core Concepts</h2>
                  <p className="text-slate-400 text-sm mt-1">Understanding ApiScan fundamentals</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="group border-slate-800/50 bg-gradient-to-br from-purple-900/10 to-slate-900/30 hover:border-purple-500/30 transition-all">
                  <CardHeader>
                    <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center mb-3">
                      <Code2 className="w-5 h-5 text-purple-400" />
                    </div>
                    <CardTitle className="text-lg">Blueprints</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      AI-generated strategy documents that outline comprehensive test scenarios based on your API specification. Each blueprint includes attack vectors, edge cases, and business logic validations.
                    </p>
                  </CardContent>
                </Card>

                <Card className="group border-slate-800/50 bg-gradient-to-br from-red-900/10 to-slate-900/30 hover:border-red-500/30 transition-all">
                  <CardHeader>
                    <div className="w-10 h-10 rounded-xl bg-red-500/20 border border-red-500/30 flex items-center justify-center mb-3">
                      <Lock className="w-5 h-5 text-red-400" />
                    </div>
                    <CardTitle className="text-lg">Secrets</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      Encrypted environment variables (API keys, tokens) stored securely in our vault. Never expose credentials in your spec files or test configurations.
                    </p>
                  </CardContent>
                </Card>

                <Card className="group border-slate-800/50 bg-gradient-to-br from-emerald-900/10 to-slate-900/30 hover:border-emerald-500/30 transition-all">
                  <CardHeader>
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mb-3">
                      <Zap className="w-5 h-5 text-emerald-400" />
                    </div>
                    <CardTitle className="text-lg">Test Runners</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      Isolated execution environments that run your tests in parallel. Each runner maintains its own state and reports results in real-time to the dashboard.
                    </p>
                  </CardContent>
                </Card>

                <Card className="group border-slate-800/50 bg-gradient-to-br from-blue-900/10 to-slate-900/30 hover:border-blue-500/30 transition-all">
                  <CardHeader>
                    <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center mb-3">
                      <Terminal className="w-5 h-5 text-blue-400" />
                    </div>
                    <CardTitle className="text-lg">Results</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      Comprehensive test reports including vulnerability severity, affected endpoints, reproduction steps, and compliance mappings (OWASP, PCI-DSS).
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* AI ENGINE */}
            <section id="ai-engine" className="scroll-mt-24 space-y-8">
              <div className="flex items-center gap-4 pb-6 border-b border-slate-800/50">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-green-500/20 border border-emerald-500/30 flex items-center justify-center">
                  <Bot className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white">How the AI Engine Works</h2>
                  <p className="text-slate-400 text-sm mt-1">Multi-agent architecture explained</p>
                </div>
              </div>

              <Card className="border-slate-800/50 bg-gradient-to-br from-emerald-900/10 to-slate-900/30">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-emerald-400" />
                    Intelligent Test Generation
                  </CardTitle>
                  <CardDescription>
                    ApiScan uses a sophisticated multi-agent architecture to analyze, strategize, and execute comprehensive API tests
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-6">
                    {/* Agent 1 */}
                    <div className="flex gap-4 p-4 rounded-xl bg-slate-950/50 border border-slate-800/50">
                      <div className="flex-none w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center font-bold text-cyan-400">
                        1
                      </div>
                      <div>
                        <h4 className="font-bold text-white mb-2">Analysis Agent</h4>
                        <p className="text-sm text-slate-400 leading-relaxed">
                          Parses your OpenAPI specification to map API structure, extract endpoints, identify authentication patterns, and understand data schemas. Creates a comprehensive API topology.
                        </p>
                      </div>
                    </div>

                    {/* Agent 2 */}
                    <div className="flex gap-4 p-4 rounded-xl bg-slate-950/50 border border-slate-800/50">
                      <div className="flex-none w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center font-bold text-purple-400">
                        2
                      </div>
                      <div>
                        <h4 className="font-bold text-white mb-2">Strategy Agent</h4>
                        <p className="text-sm text-slate-400 leading-relaxed">
                          Designs attack vectors and test scenarios including SQL injection, XSS, IDOR, broken authentication, rate limiting bypass, and business logic flaws. Prioritizes by severity and likelihood.
                        </p>
                      </div>
                    </div>

                    {/* Agent 3 */}
                    <div className="flex gap-4 p-4 rounded-xl bg-slate-950/50 border border-slate-800/50">
                      <div className="flex-none w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center font-bold text-emerald-400">
                        3
                      </div>
                      <div>
                        <h4 className="font-bold text-white mb-2">Execution Agent</h4>
                        <p className="text-sm text-slate-400 leading-relaxed">
                          Runs tests against your API in isolated environments, monitors responses in real-time, detects anomalies, and generates detailed vulnerability reports with reproduction steps.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* SECURITY */}
            <section id="security" className="scroll-mt-24 space-y-8">
              <div className="flex items-center gap-4 pb-6 border-b border-slate-800/50">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-500/20 to-orange-500/20 border border-red-500/30 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-red-400" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white">Security & Secrets Management</h2>
                  <p className="text-slate-400 text-sm mt-1">Protecting your sensitive credentials</p>
                </div>
              </div>

              <Card className="border-slate-800/50 bg-gradient-to-br from-red-900/10 to-slate-900/30">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Key className="w-5 h-5 text-red-400" />
                    Environment Variables & API Keys
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-slate-400 leading-relaxed">
                    Your API likely requires authentication tokens, API keys, or other sensitive credentials. <strong className="text-white">Never hardcode these values</strong> in your OpenAPI specification. Instead, use our encrypted secrets vault.
                  </p>
                  
                  <div className="space-y-4">
                    <h3 className="text-white font-semibold flex items-center gap-2">
                      <ArrowRight className="w-4 h-4 text-cyan-400" />
                      How to add secrets:
                    </h3>
                    <div className="space-y-3 pl-6">
                      <div className="flex gap-3">
                        <div className="flex-none w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-xs font-bold text-cyan-400">
                          1
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed">
                          Navigate to your Project's <strong className="text-white">Secrets</strong> tab
                        </p>
                      </div>
                      <div className="flex gap-3">
                        <div className="flex-none w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-xs font-bold text-cyan-400">
                          2
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed">
                          Click "Add Secret" and enter a key name (e.g., <code className="bg-slate-950 border border-slate-800 px-2 py-0.5 rounded text-red-400 font-mono">AUTH_TOKEN</code>)
                        </p>
                      </div>
                      <div className="flex gap-3">
                        <div className="flex-none w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-xs font-bold text-cyan-400">
                          3
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed">
                          Paste your credential value - it will be <strong className="text-white">encrypted immediately</strong>
                        </p>
                      </div>
                      <div className="flex gap-3">
                        <div className="flex-none w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-xs font-bold text-cyan-400">
                          4
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed">
                          Reference it in your test configuration using <code className="bg-slate-950 border border-slate-800 px-2 py-0.5 rounded text-cyan-400 font-mono">${'{AUTH_TOKEN}'}</code>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-5 bg-slate-950/50 border border-slate-800/50 rounded-xl">
                    <div className="flex-none w-10 h-10 rounded-xl bg-red-500/20 border border-red-500/30 flex items-center justify-center">
                      <Lock className="w-5 h-5 text-red-400" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-white font-semibold">Encryption Standard</h4>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        We use <strong className="text-white">Fernet (AES-128) symmetric encryption</strong>. Secrets are only decrypted momentarily inside isolated Test Runner containers and are <strong className="text-white">never logged, displayed, or exposed</strong> in the UI.
                      </p>
                      <div className="flex flex-wrap gap-2 pt-2">
                        <Badge variant="outline" className="border-red-500/30 text-red-400 text-xs">
                          AES-128
                        </Badge>
                        <Badge variant="outline" className="border-red-500/30 text-red-400 text-xs">
                          Zero-Knowledge
                        </Badge>
                        <Badge variant="outline" className="border-red-500/30 text-red-400 text-xs">
                          Isolated Execution
                        </Badge>
                      </div>
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