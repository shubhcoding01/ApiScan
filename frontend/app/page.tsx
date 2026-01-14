import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight, 
  Shield, 
  Zap, 
  Bot, 
  FileJson, 
  CheckCircle, 
  Terminal 
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-500/30">
      
      {/* 1. Navbar */}
      <nav className="border-b border-zinc-800 bg-black/50 backdrop-blur-md fixed top-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white">
              A
            </div>
            <span className="text-xl font-bold tracking-tight">ApiScan</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/auth/login" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
              Sign In
            </Link>
            <Link href="/auth/login">
              <Button size="sm" className="bg-white text-black hover:bg-zinc-200">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Background Glows */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-600/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-medium text-zinc-400 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Powered by Google Gemini AI
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-500">
            Autonomous <br /> API Quality Assurance
          </h1>
          
          <p className="text-lg md:text-xl text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Upload your OpenAPI spec and let our AI agents generate, execute, and analyze test scenarios automatically. No manual scripting required.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/auth/login">
              <Button size="lg" className="h-12 px-8 text-base bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-900/20">
                Start Testing Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/docs">
              <Button variant="outline" size="lg" className="h-12 px-8 text-base border-zinc-700 hover:bg-zinc-800">
                Read Documentation
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Features Grid */}
      <section className="py-24 bg-zinc-950 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose ApiScan?</h2>
            <p className="text-zinc-400">Comprehensive security and logic testing for modern API stacks.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-colors">
              <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6">
                <FileJson className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">Instant Parsing</h3>
              <p className="text-zinc-400 leading-relaxed">
                Drag and drop your Swagger/OpenAPI JSON. We automatically map endpoints, parameters, and data types in seconds.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-colors">
              <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-6">
                <Bot className="w-6 h-6 text-purple-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">AI Agent Strategy</h3>
              <p className="text-zinc-400 leading-relaxed">
                Gemini AI analyzes your business logic to create complex test blueprints, covering edge cases standard scanners miss.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-colors">
              <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-green-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">Live Execution</h3>
              <p className="text-zinc-400 leading-relaxed">
                Run tests against your staging environment. View real-time logs, pass/fail rates, and detailed bug reports.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. How It Works (Steps) */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            
            {/* Left: Text */}
            <div className="md:w-1/2 space-y-8">
              <h2 className="text-3xl font-bold">Automated Workflow</h2>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-none w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center font-bold text-sm">1</div>
                  <div>
                    <h4 className="font-bold text-lg">Upload Spec</h4>
                    <p className="text-zinc-400 text-sm">Import your v2 or v3 OpenAPI definition.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-none w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center font-bold text-sm">2</div>
                  <div>
                    <h4 className="font-bold text-lg">Configure Secrets</h4>
                    <p className="text-zinc-400 text-sm">Add env vars (API Keys) securely encrypted.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-none w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center font-bold text-sm">3</div>
                  <div>
                    <h4 className="font-bold text-lg">Review & Run</h4>
                    <p className="text-zinc-400 text-sm">Approve the AI strategy and watch the console.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Code/Terminal Visual */}
            <div className="md:w-1/2 w-full">
              <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-4 shadow-2xl">
                <div className="flex items-center gap-2 mb-4 border-b border-zinc-800 pb-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-xs text-zinc-500 ml-2 font-mono">execution-logs</span>
                </div>
                <div className="space-y-2 font-mono text-xs md:text-sm">
                  <div className="flex gap-2">
                    <span className="text-zinc-500">[10:02:45]</span>
                    <span className="text-blue-400">INFO</span>
                    <span className="text-zinc-300">Parsing swagger.json...</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-zinc-500">[10:02:47]</span>
                    <span className="text-blue-400">INFO</span>
                    <span className="text-zinc-300">Generating test vectors...</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-zinc-500">[10:02:49]</span>
                    <span className="text-green-400">PASS</span>
                    <span className="text-zinc-300">GET /users returned 200 OK</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-zinc-500">[10:02:50]</span>
                    <span className="text-green-400">PASS</span>
                    <span className="text-zinc-300">POST /auth/login returned Token</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-zinc-500">[10:02:52]</span>
                    <span className="text-red-400">FAIL</span>
                    <span className="text-zinc-300">SQL Injection detected on /search</span>
                  </div>
                  <div className="flex gap-2 animate-pulse">
                    <span className="text-zinc-500">[10:02:53]</span>
                    <span className="text-zinc-500">...</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Footer */}
      <footer className="py-12 border-t border-zinc-900 text-center text-zinc-500 text-sm">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Shield className="w-5 h-5 text-zinc-400" />
          <span className="text-white font-bold">ApiScan</span>
        </div>
        <p>&copy; 2026 ApiScan Inc. All rights reserved.</p>
      </footer>
    </div>
  );
}