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

'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Shield, 
  Zap, 
  Bot, 
  Terminal, 
  CheckCircle2, 
  Lock, 
  Play, 
  Github, 
  Twitter, 
  Linkedin, 
  Radar, 
  Server, 
  ChevronRight,
  Code2,
  Workflow,
  Search
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 selection:bg-blue-500/30 font-sans overflow-x-hidden">
      
      {/* --- BACKGROUND EFFECTS --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />
        
        {/* Top Spotlight */}
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-600/20 blur-[100px] rounded-full" />
        <div className="absolute top-[-10%] left-1/3 w-[600px] h-[400px] bg-cyan-500/10 blur-[120px] rounded-full" />
      </div>

      {/* --- NAVBAR --- */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-slate-950/70 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Bot className="w-5 h-5" />
            </div>
            <span className="text-lg font-bold tracking-tight text-white">
              ApiScan
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            {['Features', 'How it Works', 'Pricing', 'Docs'].map((item) => (
              <Link 
                key={item} 
                href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                className="hover:text-blue-400 transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
              Log in
            </Link>
            <Link href="/login">
              <Button size="sm" className="bg-blue-600 hover:bg-blue-500 text-white border-0 shadow-lg shadow-blue-900/20 rounded-full px-5">
                Get Started
              </Button>
            </Link>
          </div>
          
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative z-10 pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center space-y-8">
          
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            v1.0 Now Available
          </motion.div>

          {/* Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight text-white max-w-4xl mx-auto leading-[1.1]"
          >
            Automate your <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 animate-gradient">
              API Security Testing
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed"
          >
            Detect vulnerabilities, logic flaws, and broken auth in real-time. 
            Upload your OpenAPI spec and let our autonomous agents do the rest.
          </motion.p>

          {/* CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Link href="/login">
              <Button size="lg" className="h-12 px-8 bg-blue-600 hover:bg-blue-500 text-white rounded-full text-base shadow-xl shadow-blue-900/20">
                Start Scanning Free
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href="#demo">
              <Button variant="outline" size="lg" className="h-12 px-8 border-slate-700 hover:bg-slate-800 text-slate-300 rounded-full text-base">
                <Play className="mr-2 w-4 h-4" />
                View Demo
              </Button>
            </Link>
          </motion.div>

          {/* Mock Dashboard Preview */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-16 relative mx-auto max-w-5xl rounded-xl border border-slate-800 bg-slate-900/50 shadow-2xl backdrop-blur-sm overflow-hidden"
          >
             {/* Window Controls */}
             <div className="h-10 border-b border-slate-800 bg-slate-900/80 flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                <div className="ml-4 px-3 py-1 bg-slate-800/50 rounded text-[10px] text-slate-400 font-mono">
                  api-scan-dashboard.tsx
                </div>
             </div>

             {/* Inner Content Mock */}
             <div className="p-6 md:p-10 grid grid-cols-3 gap-6 text-left">
                {/* Sidebar Mock */}
                <div className="col-span-1 space-y-4 hidden md:block">
                  <div className="h-8 w-32 bg-slate-800 rounded mb-6" />
                  <div className="space-y-2">
                    {[1,2,3,4].map(i => <div key={i} className="h-4 w-full bg-slate-800/50 rounded" />)}
                  </div>
                </div>
                
                {/* Main Content Mock */}
                <div className="col-span-3 md:col-span-2 space-y-6">
                   <div className="flex gap-4 mb-8">
                      <div className="h-24 flex-1 bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                        <div className="h-4 w-8 bg-blue-500/40 rounded mb-2" />
                        <div className="h-8 w-16 bg-blue-500/20 rounded" />
                      </div>
                      <div className="h-24 flex-1 bg-slate-800/50 border border-slate-700/50 rounded-lg p-4">
                        <div className="h-4 w-8 bg-slate-700 rounded mb-2" />
                        <div className="h-8 w-16 bg-slate-700/50 rounded" />
                      </div>
                   </div>
                   
                   {/* Terminal Mock lines */}
                   <div className="space-y-3 font-mono text-xs">
                      <div className="flex gap-3 text-slate-500">
                        <span>14:32:01</span>
                        <span className="text-blue-400">INFO</span>
                        <span>Initializing autonomous agents...</span>
                      </div>
                      <div className="flex gap-3 text-slate-500">
                        <span>14:32:02</span>
                        <span className="text-green-400">SUCCESS</span>
                        <span>Spec parsed: 42 endpoints found</span>
                      </div>
                      <div className="flex gap-3 text-slate-500">
                        <span>14:32:05</span>
                        <span className="text-red-400">ALERT</span>
                        <span className="text-slate-300">SQL Injection detected on /api/login</span>
                      </div>
                   </div>
                </div>
             </div>

             {/* Glow Overlay */}
             <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent pointer-events-none" />
          </motion.div>
        </div>
      </section>

      {/* --- TRUST BADGES --- */}
      <section className="py-10 border-y border-white/5 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm font-medium text-slate-500 mb-8">TRUSTED BY DEVELOPERS AT</p>
          <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {['Acme Corp', 'GlobalTech', 'Nebula', 'Vertex', 'Orbit'].map((brand) => (
              <div key={brand} className="text-xl font-bold text-white flex items-center gap-2">
                 <div className="w-6 h-6 bg-white/20 rounded-full" /> {brand}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FEATURES (BENTO GRID) --- */}
      <section id="features" className="py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Complete Coverage for your API
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
              Our autonomous agents handle the heavy lifting, providing comprehensive security testing without the manual configuration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="md:col-span-2 relative group overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 p-8 hover:border-slate-700 transition-colors">
              <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-100 transition-opacity">
                <Radar className="w-32 h-32 text-blue-600" />
              </div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mb-6">
                   <Bot className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">AI-Driven Threat Detection</h3>
                <p className="text-slate-400 max-w-md">Our agents don't just fuzz; they understand your API logic. They generate intelligent attack vectors covering Edge cases, IDOR, and Broken Auth.</p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="relative group overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 p-8 hover:border-slate-700 transition-colors">
              <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mb-6">
                 <Code2 className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Spec-First Analysis</h3>
              <p className="text-slate-400">Simply upload your Swagger/OpenAPI file. We parse, validate, and build a test plan in seconds.</p>
            </div>

            {/* Feature 3 */}
            <div className="relative group overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 p-8 hover:border-slate-700 transition-colors">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-6">
                 <Zap className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">CI/CD Integration</h3>
              <p className="text-slate-400">Block builds if critical vulnerabilities are found. Works with GitHub Actions, GitLab, and Jenkins.</p>
            </div>

            {/* Feature 4 */}
            <div className="md:col-span-2 relative group overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 p-8 hover:border-slate-700 transition-colors">
               <div className="absolute -right-10 -bottom-10 opacity-10 group-hover:opacity-20 transition-opacity">
                 <div className="w-64 h-64 bg-green-500 rounded-full blur-[100px]" />
               </div>
               <div className="relative z-10">
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-6">
                   <Shield className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">OWASP Top 10 Coverage</h3>
                <p className="text-slate-400 max-w-md">Automatically scan for SQL Injection, XSS, SSRF, and more. We keep our vulnerability database updated daily.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- HOW IT WORKS (Steps) --- */}
      <section id="how-it-works" className="py-24 px-6 border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Zero Configuration Required</h2>
            <p className="text-slate-400">Go from upload to report in three simple steps.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {[
                { title: "Upload Spec", desc: "Drag & drop your OpenAPI JSON/YAML file.", icon: Search },
                { title: "AI Analysis", desc: "Our engine maps your API surface and generates tests.", icon: Workflow },
                { title: "Get Report", desc: "Receive a detailed report with remediation steps.", icon: CheckCircle2 }
             ].map((step, i) => (
                <div key={i} className="relative">
                   <div className="flex items-center gap-4 mb-4">
                      <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-blue-400 font-bold">
                         {i + 1}
                      </div>
                      {i !== 2 && <div className="hidden md:block h-px flex-1 bg-slate-800" />}
                   </div>
                   <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                   <p className="text-slate-400 text-sm">{step.desc}</p>
                </div>
             ))}
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-32 px-6">
         <div className="max-w-5xl mx-auto bg-gradient-to-br from-blue-900/50 to-slate-900 border border-blue-500/20 rounded-3xl p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.3),transparent_50%)]" />
            
            <div className="relative z-10 space-y-8">
               <h2 className="text-4xl md:text-5xl font-bold text-white">Ready to secure your infrastructure?</h2>
               <p className="text-blue-100 text-lg max-w-2xl mx-auto">
                 Join thousands of developers who trust ApiScan to keep their production environment safe.
               </p>
               <Link href="/login">
                  <Button size="lg" className="h-14 px-8 bg-white text-blue-900 hover:bg-blue-50 font-bold rounded-full text-lg shadow-xl">
                    Get Started for Free
                  </Button>
               </Link>
            </div>
         </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="border-t border-slate-800 bg-slate-950 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
           <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-slate-800 rounded flex items-center justify-center">
                 <Bot className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-white">ApiScan</span>
           </div>
           
           <div className="text-slate-500 text-sm">
              © 2026 ApiScan Inc. All rights reserved.
           </div>

           <div className="flex gap-6">
              <Github className="w-5 h-5 text-slate-500 hover:text-white cursor-pointer transition-colors" />
              <Twitter className="w-5 h-5 text-slate-500 hover:text-white cursor-pointer transition-colors" />
              <Linkedin className="w-5 h-5 text-slate-500 hover:text-white cursor-pointer transition-colors" />
           </div>
        </div>
      </footer>

    </div>
  );
}