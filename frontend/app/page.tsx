// import Link from 'next/link';
// import { Button } from '@/components/ui/button';
// import { 
//   ArrowRight, 
//   Shield, 
//   Zap, 
//   Bot, 
//   FileJson, 
//   Terminal,
//   Menu // Added for mobile menu icon if needed later
// } from 'lucide-react';

// export default function LandingPage() {
//   return (
//     <div className="min-h-screen bg-black text-white selection:bg-blue-500/30">
      
//       {/* 1. Navbar */}
//       <nav className="border-b border-zinc-800 bg-black/50 backdrop-blur-md fixed top-0 w-full z-50">
//         <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          
//           {/* LEFT: Logo */}
//           <div className="flex items-center gap-2">
//             <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white">
//               A
//             </div>
//             <span className="text-xl font-bold tracking-tight">ApiScan</span>
//           </div>

//           {/* CENTER: Navigation Links (Hidden on small mobile screens) */}
//           <div className="hidden md:flex items-center gap-8">
//             <Link 
//               href="/docs" 
//               className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
//             >
//               Documentation
//             </Link>
//             <Link 
//               href="/pricing" 
//               className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
//             >
//               Pricing
//             </Link>
//             <Link 
//               href="/blog" 
//               className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
//             >
//               Blog
//             </Link>
//           </div>

//           {/* RIGHT: Auth Buttons */}
//           <div className="flex items-center gap-4">
//             <Link href="/login" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
//               Sign In
//             </Link>
//             <Link href="/login">
//               <Button size="sm" className="bg-white text-black hover:bg-zinc-200">
//                 Get Started
//               </Button>
//             </Link>
//           </div>
          
//         </div>
//       </nav>

//       {/* 2. Hero Section */}
//       <section className="relative pt-32 pb-20 px-6 overflow-hidden">
//         {/* Background Glows */}
//         <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />
//         <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-600/10 blur-[100px] rounded-full pointer-events-none" />

//         <div className="max-w-4xl mx-auto text-center relative z-10">
//           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-medium text-zinc-400 mb-6">
//             <span className="relative flex h-2 w-2">
//               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
//               <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
//             </span>
//             Powered by Google Gemini AI
//           </div>
          
//           <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-500">
//             Autonomous <br /> API Quality Assurance
//           </h1>
          
//           <p className="text-lg md:text-xl text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed">
//             Upload your OpenAPI spec and let our AI agents generate, execute, and analyze test scenarios automatically. No manual scripting required.
//           </p>
          
//           <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
//             <Link href="/login">
//               <Button size="lg" className="h-12 px-8 text-base bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-900/20">
//                 Start Testing Free
//                 <ArrowRight className="ml-2 w-5 h-5" />
//               </Button>
//             </Link>
//             <Link href="/docs">
//               <Button variant="outline" size="lg" className="h-12 px-8 text-base border-zinc-700 hover:bg-zinc-800">
//                 Read Documentation
//               </Button>
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* 3. Features Grid */}
//       <section className="py-24 bg-zinc-950 border-t border-zinc-900">
//         <div className="max-w-7xl mx-auto px-6">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl font-bold mb-4">Why Choose ApiScan?</h2>
//             <p className="text-zinc-400">Comprehensive security and logic testing for modern API stacks.</p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {/* Feature 1 */}
//             <div className="p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-colors">
//               <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6">
//                 <FileJson className="w-6 h-6 text-blue-500" />
//               </div>
//               <h3 className="text-xl font-bold mb-3">Instant Parsing</h3>
//               <p className="text-zinc-400 leading-relaxed">
//                 Drag and drop your Swagger/OpenAPI JSON. We automatically map endpoints, parameters, and data types in seconds.
//               </p>
//             </div>

//             {/* Feature 2 */}
//             <div className="p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-colors">
//               <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-6">
//                 <Bot className="w-6 h-6 text-purple-500" />
//               </div>
//               <h3 className="text-xl font-bold mb-3">AI Agent Strategy</h3>
//               <p className="text-zinc-400 leading-relaxed">
//                 Gemini AI analyzes your business logic to create complex test blueprints, covering edge cases standard scanners miss.
//               </p>
//             </div>

//             {/* Feature 3 */}
//             <div className="p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-colors">
//               <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center mb-6">
//                 <Zap className="w-6 h-6 text-green-500" />
//               </div>
//               <h3 className="text-xl font-bold mb-3">Live Execution</h3>
//               <p className="text-zinc-400 leading-relaxed">
//                 Run tests against your staging environment. View real-time logs, pass/fail rates, and detailed bug reports.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* 4. How It Works (Steps) */}
//       <section className="py-24 px-6 relative overflow-hidden">
//         <div className="max-w-5xl mx-auto">
//           <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            
//             {/* Left: Text */}
//             <div className="md:w-1/2 space-y-8">
//               <h2 className="text-3xl font-bold">Automated Workflow</h2>
              
//               <div className="space-y-6">
//                 <div className="flex gap-4">
//                   <div className="flex-none w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center font-bold text-sm">1</div>
//                   <div>
//                     <h4 className="font-bold text-lg">Upload Spec</h4>
//                     <p className="text-zinc-400 text-sm">Import your v2 or v3 OpenAPI definition.</p>
//                   </div>
//                 </div>
//                 <div className="flex gap-4">
//                   <div className="flex-none w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center font-bold text-sm">2</div>
//                   <div>
//                     <h4 className="font-bold text-lg">Configure Secrets</h4>
//                     <p className="text-zinc-400 text-sm">Add env vars (API Keys) securely encrypted.</p>
//                   </div>
//                 </div>
//                 <div className="flex gap-4">
//                   <div className="flex-none w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center font-bold text-sm">3</div>
//                   <div>
//                     <h4 className="font-bold text-lg">Review & Run</h4>
//                     <p className="text-zinc-400 text-sm">Approve the AI strategy and watch the console.</p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Right: Code/Terminal Visual */}
//             <div className="md:w-1/2 w-full">
//               <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-4 shadow-2xl">
//                 <div className="flex items-center gap-2 mb-4 border-b border-zinc-800 pb-2">
//                   <div className="w-3 h-3 rounded-full bg-red-500" />
//                   <div className="w-3 h-3 rounded-full bg-yellow-500" />
//                   <div className="w-3 h-3 rounded-full bg-green-500" />
//                   <span className="text-xs text-zinc-500 ml-2 font-mono">execution-logs</span>
//                 </div>
//                 <div className="space-y-2 font-mono text-xs md:text-sm">
//                   <div className="flex gap-2">
//                     <span className="text-zinc-500">[10:02:45]</span>
//                     <span className="text-blue-400">INFO</span>
//                     <span className="text-zinc-300">Parsing swagger.json...</span>
//                   </div>
//                   <div className="flex gap-2">
//                     <span className="text-zinc-500">[10:02:47]</span>
//                     <span className="text-blue-400">INFO</span>
//                     <span className="text-zinc-300">Generating test vectors...</span>
//                   </div>
//                   <div className="flex gap-2">
//                     <span className="text-zinc-500">[10:02:49]</span>
//                     <span className="text-green-400">PASS</span>
//                     <span className="text-zinc-300">GET /users returned 200 OK</span>
//                   </div>
//                   <div className="flex gap-2">
//                     <span className="text-zinc-500">[10:02:50]</span>
//                     <span className="text-green-400">PASS</span>
//                     <span className="text-zinc-300">POST /auth/login returned Token</span>
//                   </div>
//                   <div className="flex gap-2">
//                     <span className="text-zinc-500">[10:02:52]</span>
//                     <span className="text-red-400">FAIL</span>
//                     <span className="text-zinc-300">SQL Injection detected on /search</span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//           </div>
//         </div>
//       </section>

//       {/* 5. Footer */}
//       <footer className="py-12 border-t border-zinc-900 text-center text-zinc-500 text-sm">
//         <div className="flex items-center justify-center gap-2 mb-4">
//           <Shield className="w-5 h-5 text-zinc-400" />
//           <span className="text-white font-bold">ApiScan</span>
//         </div>
//         <p>&copy; 2026 ApiScan Inc. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// }


import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight, 
  Shield, 
  Zap, 
  Bot, 
  FileJson, 
  Terminal,
  CheckCircle2,
  Code2,
  Lock,
  Activity,
  Sparkles,
  Search,
  AlertTriangle,
  Play,
  Github,
  Twitter,
  Linkedin
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white selection:bg-cyan-500/30 overflow-x-hidden">
      
      {/* 1. NAVBAR */}
      <nav className="border-b border-white/5 bg-slate-950/80 backdrop-blur-xl fixed top-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center font-bold text-white shadow-lg shadow-cyan-900/30 group-hover:shadow-cyan-900/50 transition-all">
              <Bot className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              ApiScan
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link 
              href="#features" 
              className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
            >
              Features
            </Link>
            <Link 
              href="#how-it-works" 
              className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
            >
              How It Works
            </Link>
            <Link 
              href="/docs" 
              className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
            >
              Documentation
            </Link>
            <Link 
              href="/pricing" 
              className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
            >
              Pricing
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white hover:bg-slate-800/50">
                Sign In
              </Button>
            </Link>
            <Link href="/login">
              <Button size="sm" className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-lg shadow-cyan-900/30 font-medium">
                Get Started Free
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
          
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-600/20 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '4s' }} />
          <div className="absolute top-20 right-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '6s' }} />
          <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '5s' }} />
        </div>

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_80%)]" />

        <div className="max-w-6xl mx-auto text-center relative z-10 space-y-8">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 border border-slate-800/50 backdrop-blur-sm text-sm font-medium text-slate-300 animate-in fade-in slide-in-from-bottom-3 duration-700">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>AI-Powered API Testing Platform</span>
          </div>
          
          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.1] animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              Autonomous API
            </span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Quality Assurance
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg md:text-xl lg:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-light animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-200">
            Upload your OpenAPI specification and let our intelligent agents generate comprehensive test scenarios, execute them automatically, and uncover vulnerabilities you didn't know existed.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-300">
            <Link href="/login">
              <Button size="lg" className="h-14 px-10 text-base font-semibold bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow-2xl shadow-cyan-900/40 hover:shadow-cyan-900/60 transition-all group">
                Start Testing Free
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="#how-it-works">
              <Button variant="outline" size="lg" className="h-14 px-10 text-base font-semibold border-slate-700 hover:bg-slate-800/50 backdrop-blur-sm hover:border-slate-600 group">
                <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                See How It Works
              </Button>
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-8 pt-12 text-sm text-slate-500 animate-in fade-in duration-1000 delay-500">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Free tier available</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>5-minute setup</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURES SECTION */}
      <section id="features" className="py-32 bg-slate-950/50 border-y border-slate-900/50 relative">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Section Header */}
          <div className="text-center mb-20 space-y-4">
            <div className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-semibold uppercase tracking-wider">
              Core Features
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                Everything You Need for
              </span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Bulletproof API Testing
              </span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Comprehensive security and logic testing powered by advanced AI analysis
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Feature 1 */}
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-slate-900/80 to-slate-900/40 border border-slate-800/50 hover:border-cyan-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-900/10 backdrop-blur-sm">
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <FileJson className="w-7 h-7 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Smart Spec Parsing</h3>
              <p className="text-slate-400 leading-relaxed">
                Instant analysis of OpenAPI 2.0 and 3.0 specifications. Automatically extracts endpoints, parameters, schemas, and authentication patterns in seconds.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-slate-900/80 to-slate-900/40 border border-slate-800/50 hover:border-blue-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-blue-900/10 backdrop-blur-sm">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Bot className="w-7 h-7 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">AI Test Generation</h3>
              <p className="text-slate-400 leading-relaxed">
                Advanced AI agents analyze your API logic to create intelligent test scenarios, covering edge cases and attack vectors traditional scanners miss.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-slate-900/80 to-slate-900/40 border border-slate-800/50 hover:border-emerald-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-900/10 backdrop-blur-sm">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-500/20 to-green-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Zap className="w-7 h-7 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Real-Time Execution</h3>
              <p className="text-slate-400 leading-relaxed">
                Run comprehensive test suites against your staging or production environment. Watch live execution logs with instant pass/fail feedback.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-slate-900/80 to-slate-900/40 border border-slate-800/50 hover:border-red-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-red-900/10 backdrop-blur-sm">
              <div className="w-14 h-14 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <AlertTriangle className="w-7 h-7 text-red-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Vulnerability Detection</h3>
              <p className="text-slate-400 leading-relaxed">
                Automatically detect SQL injection, XSS, authentication flaws, broken access control, and OWASP API Top 10 vulnerabilities with detailed remediation steps.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-slate-900/80 to-slate-900/40 border border-slate-800/50 hover:border-purple-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-purple-900/10 backdrop-blur-sm">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Lock className="w-7 h-7 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Secure Secrets Management</h3>
              <p className="text-slate-400 leading-relaxed">
                Store API keys, tokens, and environment variables with enterprise-grade encryption. Never expose credentials in test configurations.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-slate-900/80 to-slate-900/40 border border-slate-800/50 hover:border-amber-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-amber-900/10 backdrop-blur-sm">
              <div className="w-14 h-14 bg-gradient-to-br from-amber-500/20 to-yellow-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Activity className="w-7 h-7 text-amber-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Detailed Reporting</h3>
              <p className="text-slate-400 leading-relaxed">
                Generate comprehensive test reports with vulnerability severity, affected endpoints, reproduction steps, and compliance mappings (OWASP, PCI-DSS).
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS */}
      <section id="how-it-works" className="py-32 px-6 relative overflow-hidden">
        <div className="max-w-6xl mx-auto">
          
          {/* Section Header */}
          <div className="text-center mb-20 space-y-4">
            <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-semibold uppercase tracking-wider">
              Simple Workflow
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                From Upload to
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Insights in Minutes
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left: Steps */}
            <div className="space-y-8">
              
              {/* Step 1 */}
              <div className="flex gap-6 group">
                <div className="flex-none w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center font-bold text-xl text-cyan-400 group-hover:scale-110 transition-transform">
                  1
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold text-xl text-white">Upload Your Spec</h4>
                  <p className="text-slate-400 leading-relaxed">
                    Drag and drop your OpenAPI/Swagger JSON or YAML file. Alternatively, let our AI generate the spec from your API description.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-6 group">
                <div className="flex-none w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30 flex items-center justify-center font-bold text-xl text-blue-400 group-hover:scale-110 transition-transform">
                  2
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold text-xl text-white">Configure Environment</h4>
                  <p className="text-slate-400 leading-relaxed">
                    Add your API base URL and securely store authentication credentials (API keys, OAuth tokens) using encrypted secrets management.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-6 group">
                <div className="flex-none w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 flex items-center justify-center font-bold text-xl text-purple-400 group-hover:scale-110 transition-transform">
                  3
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold text-xl text-white">AI Strategy Review</h4>
                  <p className="text-slate-400 leading-relaxed">
                    Review the AI-generated test strategy covering security checks, business logic validation, and edge cases. Customize as needed.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex gap-6 group">
                <div className="flex-none w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-green-500/20 border border-emerald-500/30 flex items-center justify-center font-bold text-xl text-emerald-400 group-hover:scale-110 transition-transform">
                  4
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold text-xl text-white">Execute & Monitor</h4>
                  <p className="text-slate-400 leading-relaxed">
                    Launch the test suite and watch real-time execution in the console. Get instant alerts on vulnerabilities, failures, and performance issues.
                  </p>
                </div>
              </div>

            </div>

            {/* Right: Terminal Visual */}
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 blur-3xl rounded-3xl" />
              
              <div className="relative bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl shadow-slate-950/50 overflow-hidden">
                {/* Terminal Header */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-800 bg-slate-950/50">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-xs text-slate-500 ml-2 font-mono">test-execution.log</span>
                </div>

                {/* Terminal Content */}
                <div className="p-6 space-y-2 font-mono text-sm bg-gradient-to-b from-slate-900 to-slate-950">
                  <div className="flex gap-3 animate-in fade-in duration-500">
                    <span className="text-slate-600">[14:32:01]</span>
                    <span className="text-cyan-400">INFO</span>
                    <span className="text-slate-300">Parsing OpenAPI specification...</span>
                  </div>
                  <div className="flex gap-3 animate-in fade-in duration-500 delay-100">
                    <span className="text-slate-600">[14:32:03]</span>
                    <span className="text-cyan-400">INFO</span>
                    <span className="text-slate-300">Found 47 endpoints across 8 resources</span>
                  </div>
                  <div className="flex gap-3 animate-in fade-in duration-500 delay-200">
                    <span className="text-slate-600">[14:32:05]</span>
                    <span className="text-blue-400">AI</span>
                    <span className="text-slate-300">Generating test vectors...</span>
                  </div>
                  <div className="flex gap-3 animate-in fade-in duration-500 delay-300">
                    <span className="text-slate-600">[14:32:08]</span>
                    <span className="text-blue-400">AI</span>
                    <span className="text-slate-300">Created 284 test scenarios</span>
                  </div>
                  <div className="flex gap-3 animate-in fade-in duration-500 delay-400">
                    <span className="text-slate-600">[14:32:10]</span>
                    <span className="text-emerald-400">PASS</span>
                    <span className="text-slate-300">GET /api/v1/users → 200 OK</span>
                  </div>
                  <div className="flex gap-3 animate-in fade-in duration-500 delay-500">
                    <span className="text-slate-600">[14:32:12]</span>
                    <span className="text-emerald-400">PASS</span>
                    <span className="text-slate-300">POST /api/v1/auth/login → Token Valid</span>
                  </div>
                  <div className="flex gap-3 animate-in fade-in duration-500 delay-600">
                    <span className="text-slate-600">[14:32:15]</span>
                    <span className="text-red-400">FAIL</span>
                    <span className="text-slate-300">SQL Injection detected: /api/v1/search</span>
                  </div>
                  <div className="flex gap-3 animate-in fade-in duration-500 delay-700">
                    <span className="text-slate-600">[14:32:17]</span>
                    <span className="text-amber-400">WARN</span>
                    <span className="text-slate-300">Broken auth: /api/v1/admin/users</span>
                  </div>
                  <div className="flex gap-3 animate-in fade-in duration-500 delay-800">
                    <span className="text-slate-600">[14:32:20]</span>
                    <span className="text-cyan-400">INFO</span>
                    <span className="text-slate-300">Tests complete: 282/284 passed (2 critical)</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. CTA SECTION */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/10 via-blue-600/10 to-purple-600/10 blur-3xl" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-8">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              Ready to Secure
            </span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Your API?
            </span>
          </h2>
          
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Join developers who trust ApiScan to protect their APIs from vulnerabilities and ensure bulletproof quality.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/login">
              <Button size="lg" className="h-14 px-10 text-base font-semibold bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow-2xl shadow-cyan-900/40 group">
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/docs">
              <Button variant="outline" size="lg" className="h-14 px-10 text-base font-semibold border-slate-700 hover:bg-slate-800/50 backdrop-blur-sm">
                View Documentation
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 6. FOOTER */}
      <footer className="py-16 border-t border-slate-900/50 bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-12">
            
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">ApiScan</span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed">
                Intelligent API testing platform powered by advanced AI agents.
              </p>
            </div>

            {/* Product */}
            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-3 text-sm text-slate-400">
                <li><Link href="#features" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="/docs" className="hover:text-white transition-colors">Documentation</Link></li>
                <li><Link href="/changelog" className="hover:text-white transition-colors">Changelog</Link></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-3 text-sm text-slate-400">
                <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-3 text-sm text-slate-400">
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link href="/security" className="hover:text-white transition-colors">Security</Link></li>
                <li><Link href="/compliance" className="hover:text-white transition-colors">Compliance</Link></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-slate-900/50 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-sm">
              © 2026 ApiScan Inc. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link href="https://github.com" className="text-slate-500 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </Link>
              <Link href="https://twitter.com" className="text-slate-500 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="https://linkedin.com" className="text-slate-500 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}