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
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { 
  ArrowRight, 
  Shield, 
  Zap, 
  Bot, 
  Activity,
  Terminal,
  CheckCircle2,
  Lock,
  Layers,
  Play,
  Github,
  Twitter,
  Linkedin,
  Radio,
  Network,
  ScanLine,
  Radar,
  Binary,
  Bug,
  AlertTriangle,
  Server,
  Globe
} from 'lucide-react';

export default function LandingPage() {
  const [scanningNodes, setScanningNodes] = useState<number[]>([]);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 150 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setScanningNodes(prev => {
        const newNodes = [...prev, Math.floor(Math.random() * 6)];
        return newNodes.slice(-3);
      });
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white overflow-x-hidden relative">
      
      {/* Cursor Follower with Scan Glow */}
      <motion.div
        className="fixed w-64 h-64 rounded-full pointer-events-none z-50 mix-blend-screen"
        style={{
          background: 'radial-gradient(circle, rgba(0,255,65,0.15), transparent 70%)',
          left: cursorXSpring,
          top: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />

      {/* NAVBAR with Scan Line */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 w-full z-50 border-b border-[#1e293b] bg-[#0a0e1a]/95 backdrop-blur-xl"
      >
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#00ff41] to-transparent opacity-50" />
        
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div 
              className="relative w-11 h-11"
              whileHover={{ scale: 1.1 }}
            >
              <div className="absolute inset-0 bg-[#00ff41] rounded-lg opacity-20 blur-md group-hover:opacity-40 transition-opacity" />
              <div className="relative w-full h-full bg-gradient-to-br from-[#00ff41] to-[#00d9ff] rounded-lg flex items-center justify-center border border-[#00ff41]/30">
                <Radar className="w-6 h-6 text-[#0a0e1a]" />
              </div>
            </motion.div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tighter text-[#00ff41]">
                APISCAN
              </span>
              <span className="text-[9px] font-mono text-[#64748b] tracking-widest uppercase">
                Network Security
              </span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {['Features', 'Scan Types', 'Documentation', 'Pricing'].map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link 
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  className="text-sm font-bold text-[#64748b] hover:text-[#00ff41] transition-colors relative group font-mono uppercase tracking-wider"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#00ff41] group-hover:w-full transition-all duration-300" />
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="text-[#64748b] hover:text-[#00ff41] hover:bg-[#00ff41]/5 font-mono font-bold uppercase tracking-wider">
                Login
              </Button>
            </Link>
            <Link href="/login">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="sm" className="btn-scan">
                  Start Scan
                  <Radio className="ml-2 w-4 h-4" />
                </Button>
              </motion.div>
            </Link>
          </div>
          
        </div>
      </motion.nav>

      {/* HERO SECTION with Radar */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        
        {/* Radar Background */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] opacity-20">
          <div className="radar-container w-full h-full">
            <div className="radar-sweep" />
            <div className="radar-rings" />
          </div>
        </div>

        {/* Packet Traces */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="packet-trace"
              style={{
                top: `${20 + i * 15}%`,
                animationDelay: `${i * 0.4}s`,
              }}
            />
          ))}
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10 space-y-10">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full glass-panel border border-[#00ff41]/20"
          >
            <div className="status-indicator scanning" />
            <span className="text-[#00ff41] font-mono font-bold text-sm uppercase tracking-widest">
              Real-Time API Security Scanner
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl lg:text-[110px] font-black tracking-tighter leading-[0.9]"
          >
            <span className="inline-block text-white">
              AUTONOMOUS
            </span>
            <br />
            <span className="inline-block text-[#00ff41]">
              API SCANNING
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-[#64748b] max-w-3xl mx-auto leading-relaxed font-mono"
          >
            Deep network analysis. Real-time vulnerability detection. Upload your OpenAPI spec and watch our <span className="text-[#00d9ff] font-bold">scanning agents</span> probe every endpoint for <span className="text-[#ff1744] font-bold">critical security flaws</span>.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6"
          >
            <Link href="/login">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" className="h-16 px-12 text-lg btn-scan">
                  <ScanLine className="mr-3 w-5 h-5" />
                  Initialize Scan
                </Button>
              </motion.div>
            </Link>
            <Link href="#how-it-works">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" size="lg" className="h-16 px-12 text-lg font-bold glass-panel border-[#334155] hover:bg-[#00ff41]/5 hover:border-[#00ff41]/30 font-mono uppercase">
                  <Play className="mr-3 w-5 h-5" />
                  View Demo
                </Button>
              </motion.div>
            </Link>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex flex-wrap items-center justify-center gap-8 pt-12 font-mono text-sm text-[#64748b]"
          >
            {[
              { icon: CheckCircle2, text: "No credit card", color: "#00ff41" },
              { icon: CheckCircle2, text: "Free tier", color: "#00d9ff" },
              { icon: CheckCircle2, text: "Deploy in 60s", color: "#b388ff" }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 + i * 0.1 }}
                className="flex items-center gap-2"
              >
                <item.icon className="w-4 h-4" style={{ color: item.color }} />
                <span className="font-bold uppercase tracking-wide">{item.text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Scanning Nodes Visualization */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="flex items-center justify-center gap-4 pt-8"
          >
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className={`hex-node ${scanningNodes.includes(i) ? 'active' : ''}`}
                style={{
                  background: scanningNodes.includes(i) ? '#00ff41' : '#334155',
                }}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="py-32 px-6 relative z-20">
        <div className="max-w-7xl mx-auto">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-24 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass-panel border border-[#00d9ff]/20">
              <Network className="w-4 h-4 text-[#00d9ff]" />
              <span className="text-[#00d9ff] text-sm font-bold uppercase tracking-widest font-mono">
                Scan Capabilities
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black tracking-tight">
              <span className="text-white">
                COMPREHENSIVE
              </span>
              <br />
              <span className="text-[#00ff41]">
                THREAT DETECTION
              </span>
            </h2>
            <p className="text-[#64748b] text-xl max-w-2xl mx-auto leading-relaxed font-mono">
              Multi-layer security analysis powered by autonomous scanning agents
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {[
              {
                icon: Binary,
                title: "SPEC PARSER",
                description: "Instant OpenAPI 2.0/3.0 analysis. Extracts endpoints, parameters, schemas, and auth patterns in milliseconds with zero configuration.",
                color: "#00ff41",
                delay: 0
              },
              {
                icon: Bot,
                title: "AI AGENTS",
                description: "Autonomous testing agents generate intelligent attack vectors, covering edge cases and vulnerabilities traditional scanners can't detect.",
                color: "#00d9ff",
                delay: 0.1
              },
              {
                icon: Zap,
                title: "LIVE EXECUTION",
                description: "Real-time test suite deployment against staging or production. Monitor live logs with instant pass/fail feedback and packet analysis.",
                color: "#00ff41",
                delay: 0.2
              },
              {
                icon: Bug,
                title: "VULN DETECTION",
                description: "Automatic detection of SQL injection, XSS, broken authentication, IDOR, and complete OWASP API Top 10 coverage with exploit PoC.",
                color: "#ff1744",
                delay: 0.3
              },
              {
                icon: Lock,
                title: "SECRETS VAULT",
                description: "Military-grade encryption for API keys, OAuth tokens, and environment variables. Zero-knowledge architecture with HSM integration.",
                color: "#b388ff",
                delay: 0.4
              },
              {
                icon: Activity,
                title: "INTEL REPORTS",
                description: "Generate comprehensive threat intelligence reports with CVE mappings, severity scores, remediation steps, and compliance tracking.",
                color: "#ffa000",
                delay: 0.5
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: feature.delay }}
                className="group glass-panel p-8 relative overflow-hidden motion-trail"
              >
                <div className="scan-wave" style={{ animationDelay: `${i * 0.5}s` }} />
                
                <motion.div 
                  className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 relative z-10 border"
                  style={{
                    background: `rgba(${feature.color === '#00ff41' ? '0,255,65' : feature.color === '#00d9ff' ? '0,217,255' : feature.color === '#ff1744' ? '255,23,68' : feature.color === '#b388ff' ? '179,136,255' : '255,160,0'},0.1)`,
                    borderColor: feature.color,
                    boxShadow: `0 0 20px ${feature.color}40`,
                  }}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <feature.icon className="w-8 h-8" style={{ color: feature.color }} />
                </motion.div>
                
                <h3 className="text-xl font-black mb-4 text-white font-mono uppercase tracking-wider relative z-10">{feature.title}</h3>
                <p className="text-[#64748b] leading-relaxed relative z-10 font-mono text-sm">{feature.description}</p>
                
                <div 
                  className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                  style={{ background: feature.color }}
                />
              </motion.div>
            ))}

          </div>
        </div>
      </section>

      {/* HOW IT WORKS with Terminal */}
      <section id="scan-types" className="py-32 px-6 relative z-20">
        <div className="max-w-6xl mx-auto">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-24 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass-panel border border-[#00ff41]/20">
              <Terminal className="w-4 h-4 text-[#00ff41]" />
              <span className="text-[#00ff41] text-sm font-bold uppercase tracking-widest font-mono">
                Scan Protocol
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black tracking-tight">
              <span className="text-white">
                FROM UPLOAD TO
              </span>
              <br />
              <span className="text-[#00d9ff]">
                THREAT INTEL
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            
            <div className="space-y-6">
              
              {[
                {
                  number: "01",
                  title: "UPLOAD SPEC",
                  description: "Deploy OpenAPI/Swagger file via CLI, API, or drag-drop interface. Auto-detection and parsing in <100ms.",
                  color: "#00ff41"
                },
                {
                  number: "02",
                  title: "CONFIGURE ENV",
                  description: "Define target base URL. Store credentials in encrypted vault. Configure rate limits and request headers.",
                  color: "#00d9ff"
                },
                {
                  number: "03",
                  title: "AI STRATEGY",
                  description: "Review autonomous agent-generated test vectors covering security, logic, and performance attack surfaces.",
                  color: "#b388ff"
                },
                {
                  number: "04",
                  title: "EXECUTE SCAN",
                  description: "Deploy scan agents. Monitor real-time packet analysis. Receive instant vulnerability alerts with severity scores.",
                  color: "#ffa000"
                },
              ].map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="api-card group"
                >
                  <div className="flex gap-6">
                    <motion.div 
                      className="flex-none w-14 h-14 rounded-lg border flex items-center justify-center font-black text-xl font-mono"
                      style={{
                        borderColor: step.color,
                        color: step.color,
                        background: `rgba(${step.color === '#00ff41' ? '0,255,65' : step.color === '#00d9ff' ? '0,217,255' : step.color === '#b388ff' ? '179,136,255' : '255,160,0'},0.1)`,
                      }}
                      whileHover={{ scale: 1.15, rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      {step.number}
                    </motion.div>
                    <div className="space-y-2">
                      <h4 className="font-black text-xl text-white font-mono uppercase tracking-wider">{step.title}</h4>
                      <p className="text-[#64748b] leading-relaxed font-mono text-sm">{step.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}

            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="terminal">
                <div className="terminal-header">
                  <div className="terminal-dot" />
                  <div className="terminal-dot" />
                  <div className="terminal-dot active" />
                  <span className="text-xs text-[#64748b] ml-3 font-mono font-bold uppercase">scan-execution.log</span>
                </div>

                <div className="terminal-content">
                  {[
                    { time: "14:32:01", type: "SCAN", color: "#b388ff", message: "Initializing OpenAPI parser..." },
                    { time: "14:32:03", type: "SCAN", color: "#b388ff", message: "Discovered 47 endpoints | 8 resources" },
                    { time: "14:32:05", type: "AI", color: "#00d9ff", message: "Generating attack vectors..." },
                    { time: "14:32:08", type: "AI", color: "#00d9ff", message: "Created 284 test scenarios" },
                    { time: "14:32:10", type: "OK", color: "#00ff41", message: "GET /api/v1/users → 200 [PASS]" },
                    { time: "14:32:12", type: "OK", color: "#00ff41", message: "POST /auth/login → Token valid [PASS]" },
                    { time: "14:32:15", type: "VULN", color: "#ff1744", message: "SQLi detected: /api/v1/search [CRITICAL]" },
                    { time: "14:32:17", type: "WARN", color: "#ffa000", message: "Broken auth: /admin/users [HIGH]" },
                    { time: "14:32:20", type: "SCAN", color: "#b388ff", message: "Scan complete | 282/284 passed | 2 critical" },
                  ].map((log, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="terminal-line"
                    >
                      <span className="terminal-timestamp">[{log.time}]</span>
                      <span className="terminal-type font-black uppercase" style={{ color: log.color }}>
                        {log.type}
                      </span>
                      <span className="text-[#e2e8f0]">{log.message}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Sonar Pulses */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                  <div className="sonar-pulse" />
                  <div className="sonar-pulse" />
                  <div className="sonar-pulse" />
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-32 px-6 relative z-20">
        <div className="absolute inset-0 opacity-30">
          <div className="radar-container w-full h-full">
            <div className="radar-sweep" />
          </div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center relative z-10 space-y-10"
        >
          <h2 className="text-5xl md:text-7xl font-black tracking-tight leading-tight">
            <span className="text-white">
              READY TO
            </span>
            <br />
            <span className="text-[#00ff41]">
              SCAN YOUR API?
            </span>
          </h2>
          
          <p className="text-2xl text-[#64748b] max-w-2xl mx-auto leading-relaxed font-mono">
            Deploy <span className="text-[#00ff41] font-bold">APISCAN</span> and detect vulnerabilities before attackers do. Real-time threat intelligence in 60 seconds.
          </p>

          <div className="scan-progress max-w-md mx-auto">
            <div className="scan-progress-bar" style={{ width: '100%' }} />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <Link href="/login">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" className="h-16 px-12 text-lg btn-scan">
                  <Radar className="mr-3 w-5 h-5" />
                  Deploy Scanner
                </Button>
              </motion.div>
            </Link>
            <Link href="/docs">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" size="lg" className="h-16 px-12 text-lg font-bold glass-panel border-[#334155] hover:bg-[#00ff41]/5 hover:border-[#00ff41]/30 font-mono uppercase">
                  <Server className="mr-3 w-5 h-5" />
                  Documentation
                </Button>
              </motion.div>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="py-20 border-t border-[#1e293b] glass-panel relative z-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-16 mb-16">
            
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-[#00ff41] to-[#00d9ff] rounded-lg flex items-center justify-center border border-[#00ff41]/30">
                  <Radar className="w-5 h-5 text-[#0a0e1a]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-black text-[#00ff41]">APISCAN</span>
                  <span className="text-[8px] font-mono text-[#64748b] tracking-widest uppercase">
                    Security Platform
                  </span>
                </div>
              </div>
              <p className="text-[#64748b] text-sm leading-relaxed font-mono">
                Autonomous API security scanning powered by AI threat intelligence.
              </p>
            </div>

            {[
              {
                title: "PLATFORM",
                links: ["Features", "Pricing", "Documentation", "API"]
              },
              {
                title: "COMPANY",
                links: ["About", "Blog", "Careers", "Contact"]
              },
              {
                title: "LEGAL",
                links: ["Privacy", "Terms", "Security", "Compliance"]
              }
            ].map((section, i) => (
              <div key={i}>
                <h4 className="font-black text-white mb-5 text-sm font-mono uppercase tracking-widest">{section.title}</h4>
                <ul className="space-y-3 text-sm text-[#64748b] font-mono">
                  {section.links.map((link, j) => (
                    <li key={j}>
                      <Link href={`/${link.toLowerCase()}`} className="hover:text-[#00ff41] transition-colors uppercase tracking-wide">
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="pt-10 border-t border-[#1e293b] flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-[#64748b] text-sm font-mono font-bold uppercase tracking-wide">
              © 2026 APISCAN · All Rights Reserved
            </p>
            <div className="flex items-center gap-6">
              {[
                { Icon: Github, href: "https://github.com" },
                { Icon: Twitter, href: "https://twitter.com" },
                { Icon: Linkedin, href: "https://linkedin.com" }
              ].map((social, i) => (
                <Link key={i} href={social.href}>
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    className="text-[#64748b] hover:text-[#00ff41] transition-colors"
                  >
                    <social.Icon className="w-5 h-5" />
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}