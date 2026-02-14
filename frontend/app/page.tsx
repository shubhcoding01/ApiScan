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
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
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
  Linkedin,
  Layers,
  Orbit,
  Cpu
} from 'lucide-react';

export default function LandingPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-[#020817] text-white selection:bg-cyan-500/30 overflow-x-hidden relative">
      
      {/* Animated Grid Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,black,transparent)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-blue-500/5" />
      </div>

      {/* Floating Orbs */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[150px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute top-40 right-1/4 w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-[120px]"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, -30, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-20 left-1/3 w-[350px] h-[350px] bg-purple-500/15 rounded-full blur-[100px]"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.25, 0.35, 0.25],
            x: [0, 40, 0],
            y: [0, -40, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Cursor Follower Glow */}
      <motion.div
        className="fixed w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none z-10"
        animate={{
          x: mousePosition.x - 192,
          y: mousePosition.y - 192,
        }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 200,
        }}
      />

      {/* NAVBAR */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#020817]/80 backdrop-blur-2xl"
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div 
              className="relative w-11 h-11"
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.6 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-2xl opacity-80 blur-sm" />
              <div className="relative w-full h-full bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-900/50">
                <Bot className="w-6 h-6 text-white" />
              </div>
            </motion.div>
            <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-white via-cyan-100 to-blue-100 bg-clip-text text-transparent">
              ApiScan
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {['Features', 'How It Works', 'Documentation', 'Pricing'].map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link 
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  className="text-sm font-semibold text-slate-400 hover:text-white transition-colors relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 group-hover:w-full transition-all duration-300" />
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white hover:bg-white/5 font-semibold">
                Sign In
              </Button>
            </Link>
            <Link href="/login">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="sm" className="relative bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 hover:from-cyan-500 hover:via-blue-500 hover:to-purple-500 text-white shadow-lg shadow-cyan-900/50 font-semibold overflow-hidden group">
                  <span className="relative z-10 flex items-center">
                    Get Started Free
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400 opacity-0 group-hover:opacity-20 transition-opacity" />
                </Button>
              </motion.div>
            </Link>
          </div>
          
        </div>
      </motion.nav>

      {/* HERO SECTION */}
      <section ref={heroRef} className="relative pt-32 pb-32 px-6 overflow-hidden">
        <motion.div style={{ opacity, scale }} className="max-w-6xl mx-auto text-center relative z-10 space-y-10">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-card border border-cyan-500/20 text-sm font-semibold text-slate-200"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-4 h-4 text-cyan-400" />
            </motion.div>
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              AI-Powered API Testing Platform
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl lg:text-[120px] font-black tracking-tighter leading-[0.9]"
          >
            <span className="inline-block bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
              Autonomous
            </span>
            <br />
            <span className="inline-block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent animate-gradient">
              API Security
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-light"
          >
            Upload your OpenAPI spec and let our <span className="text-cyan-400 font-semibold">intelligent agents</span> generate comprehensive test scenarios, execute them automatically, and uncover <span className="text-purple-400 font-semibold">critical vulnerabilities</span> you didn't know existed.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6"
          >
            <Link href="/login">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" className="h-16 px-12 text-lg font-bold bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 hover:from-cyan-500 hover:via-blue-500 hover:to-purple-500 shadow-2xl shadow-cyan-900/50 hover:shadow-cyan-900/70 transition-all group relative overflow-hidden">
                  <span className="relative z-10 flex items-center">
                    Start Testing Free
                    <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                    animate={{ x: ['-200%', '200%'] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                  />
                </Button>
              </motion.div>
            </Link>
            <Link href="#how-it-works">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" size="lg" className="h-16 px-12 text-lg font-bold border-slate-700/50 glass-card hover:bg-white/5 hover:border-cyan-500/30 group">
                  <Play className="mr-3 w-5 h-5 group-hover:scale-125 transition-transform" />
                  See How It Works
                </Button>
              </motion.div>
            </Link>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex flex-wrap items-center justify-center gap-8 pt-12 text-sm text-slate-500"
          >
            {[
              { icon: CheckCircle2, text: "No credit card required" },
              { icon: CheckCircle2, text: "Free tier available" },
              { icon: CheckCircle2, text: "5-minute setup" }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 + i * 0.1 }}
                className="flex items-center gap-2"
              >
                <item.icon className="w-4 h-4 text-emerald-500" />
                <span className="text-slate-400 font-medium">{item.text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Floating Icons */}
          <div className="absolute inset-0 pointer-events-none">
            {[
              { Icon: Shield, left: '10%', top: '20%', delay: 0 },
              { Icon: Zap, right: '15%', top: '30%', delay: 2 },
              { Icon: Lock, left: '15%', bottom: '25%', delay: 4 },
              { Icon: Cpu, right: '10%', bottom: '20%', delay: 1 },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{ left: item.left, right: item.right, top: item.top, bottom: item.bottom }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: [0.1, 0.3, 0.1],
                  scale: [1, 1.2, 1],
                  y: [0, -20, 0]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  delay: item.delay,
                  ease: "easeInOut"
                }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/5">
                  <item.Icon className="w-8 h-8 text-cyan-400/60" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
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
            <div className="inline-block px-5 py-2 rounded-full glass-card border border-cyan-500/20 text-cyan-400 text-sm font-bold uppercase tracking-wider">
              Core Features
            </div>
            <h2 className="text-5xl md:text-6xl font-black tracking-tight">
              <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                Everything You Need for
              </span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                Bulletproof API Testing
              </span>
            </h2>
            <p className="text-slate-400 text-xl max-w-2xl mx-auto leading-relaxed">
              Comprehensive security and logic testing powered by advanced AI analysis
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {[
              {
                icon: FileJson,
                title: "Smart Spec Parsing",
                description: "Instant analysis of OpenAPI 2.0 and 3.0 specifications. Automatically extracts endpoints, parameters, schemas, and authentication patterns in seconds.",
                gradient: "from-cyan-500/20 to-blue-500/20",
                iconColor: "text-cyan-400",
                borderColor: "hover:border-cyan-500/30",
                shadowColor: "hover:shadow-cyan-900/20"
              },
              {
                icon: Bot,
                title: "AI Test Generation",
                description: "Advanced AI agents analyze your API logic to create intelligent test scenarios, covering edge cases and attack vectors traditional scanners miss.",
                gradient: "from-blue-500/20 to-purple-500/20",
                iconColor: "text-blue-400",
                borderColor: "hover:border-blue-500/30",
                shadowColor: "hover:shadow-blue-900/20"
              },
              {
                icon: Zap,
                title: "Real-Time Execution",
                description: "Run comprehensive test suites against your staging or production environment. Watch live execution logs with instant pass/fail feedback.",
                gradient: "from-emerald-500/20 to-green-500/20",
                iconColor: "text-emerald-400",
                borderColor: "hover:border-emerald-500/30",
                shadowColor: "hover:shadow-emerald-900/20"
              },
              {
                icon: AlertTriangle,
                title: "Vulnerability Detection",
                description: "Automatically detect SQL injection, XSS, authentication flaws, broken access control, and OWASP API Top 10 vulnerabilities with detailed remediation steps.",
                gradient: "from-red-500/20 to-orange-500/20",
                iconColor: "text-red-400",
                borderColor: "hover:border-red-500/30",
                shadowColor: "hover:shadow-red-900/20"
              },
              {
                icon: Lock,
                title: "Secure Secrets Management",
                description: "Store API keys, tokens, and environment variables with enterprise-grade encryption. Never expose credentials in test configurations.",
                gradient: "from-purple-500/20 to-pink-500/20",
                iconColor: "text-purple-400",
                borderColor: "hover:border-purple-500/30",
                shadowColor: "hover:shadow-purple-900/20"
              },
              {
                icon: Activity,
                title: "Detailed Reporting",
                description: "Generate comprehensive test reports with vulnerability severity, affected endpoints, reproduction steps, and compliance mappings (OWASP, PCI-DSS).",
                gradient: "from-amber-500/20 to-yellow-500/20",
                iconColor: "text-amber-400",
                borderColor: "hover:border-amber-500/30",
                shadowColor: "hover:shadow-amber-900/20"
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                className={`group p-8 rounded-3xl glass-card ${feature.borderColor} transition-all duration-500 ${feature.shadowColor} shadow-2xl relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <motion.div 
                  className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 relative z-10`}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <feature.icon className={`w-8 h-8 ${feature.iconColor}`} />
                </motion.div>
                
                <h3 className="text-2xl font-bold mb-4 text-white relative z-10">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed relative z-10">{feature.description}</p>
                
                <div className={`absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-br ${feature.gradient} rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
              </motion.div>
            ))}

          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-32 px-6 relative z-20">
        <div className="max-w-6xl mx-auto">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-24 space-y-6"
          >
            <div className="inline-block px-5 py-2 rounded-full glass-card border border-blue-500/20 text-blue-400 text-sm font-bold uppercase tracking-wider">
              Simple Workflow
            </div>
            <h2 className="text-5xl md:text-6xl font-black tracking-tight">
              <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                From Upload to
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Insights in Minutes
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            
            <div className="space-y-8">
              
              {[
                {
                  number: "1",
                  title: "Upload Your Spec",
                  description: "Drag and drop your OpenAPI/Swagger JSON or YAML file. Alternatively, let our AI generate the spec from your API description.",
                  gradient: "from-cyan-500/20 to-blue-500/20",
                  borderColor: "border-cyan-500/30",
                  textColor: "text-cyan-400"
                },
                {
                  number: "2",
                  title: "Configure Environment",
                  description: "Add your API base URL and securely store authentication credentials (API keys, OAuth tokens) using encrypted secrets management.",
                  gradient: "from-blue-500/20 to-purple-500/20",
                  borderColor: "border-blue-500/30",
                  textColor: "text-blue-400"
                },
                {
                  number: "3",
                  title: "AI Strategy Review",
                  description: "Review the AI-generated test strategy covering security checks, business logic validation, and edge cases. Customize as needed.",
                  gradient: "from-purple-500/20 to-pink-500/20",
                  borderColor: "border-purple-500/30",
                  textColor: "text-purple-400"
                },
                {
                  number: "4",
                  title: "Execute & Monitor",
                  description: "Launch the test suite and watch real-time execution in the console. Get instant alerts on vulnerabilities, failures, and performance issues.",
                  gradient: "from-emerald-500/20 to-green-500/20",
                  borderColor: "border-emerald-500/30",
                  textColor: "text-emerald-400"
                },
              ].map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="flex gap-6 group"
                >
                  <motion.div 
                    className={`flex-none w-14 h-14 rounded-2xl bg-gradient-to-br ${step.gradient} border ${step.borderColor} flex items-center justify-center font-black text-2xl ${step.textColor} shadow-lg`}
                    whileHover={{ scale: 1.15, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    {step.number}
                  </motion.div>
                  <div className="space-y-2">
                    <h4 className="font-bold text-2xl text-white">{step.title}</h4>
                    <p className="text-slate-400 leading-relaxed text-lg">{step.description}</p>
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
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/30 to-blue-600/30 blur-[100px] rounded-3xl animate-pulse-glow" />
              
              <div className="relative glass-card rounded-3xl border border-slate-800/50 shadow-2xl overflow-hidden">
                <div className="flex items-center gap-2 px-6 py-4 border-b border-slate-800/50 bg-slate-950/50">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-xs text-slate-500 ml-3 font-mono font-semibold">test-execution.log</span>
                </div>

                <div className="p-8 space-y-3 font-mono text-sm bg-gradient-to-b from-slate-900/50 to-slate-950">
                  {[
                    { time: "14:32:01", type: "INFO", color: "text-cyan-400", message: "Parsing OpenAPI specification..." },
                    { time: "14:32:03", type: "INFO", color: "text-cyan-400", message: "Found 47 endpoints across 8 resources" },
                    { time: "14:32:05", type: "AI", color: "text-blue-400", message: "Generating test vectors..." },
                    { time: "14:32:08", type: "AI", color: "text-blue-400", message: "Created 284 test scenarios" },
                    { time: "14:32:10", type: "PASS", color: "text-emerald-400", message: "GET /api/v1/users → 200 OK" },
                    { time: "14:32:12", type: "PASS", color: "text-emerald-400", message: "POST /api/v1/auth/login → Token Valid" },
                    { time: "14:32:15", type: "FAIL", color: "text-red-400", message: "SQL Injection detected: /api/v1/search" },
                    { time: "14:32:17", type: "WARN", color: "text-amber-400", message: "Broken auth: /api/v1/admin/users" },
                    { time: "14:32:20", type: "INFO", color: "text-cyan-400", message: "Tests complete: 282/284 passed (2 critical)" },
                  ].map((log, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex gap-4 items-start"
                    >
                      <span className="text-slate-600 flex-none">[{log.time}]</span>
                      <span className={`${log.color} font-bold flex-none min-w-[50px]`}>{log.type}</span>
                      <span className="text-slate-300">{log.message}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-32 px-6 relative z-20">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/10 via-blue-600/15 to-purple-600/10 blur-[150px]" />
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center relative z-10 space-y-10"
        >
          <h2 className="text-5xl md:text-7xl font-black tracking-tight leading-tight">
            <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Ready to Secure
            </span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent animate-gradient">
              Your API?
            </span>
          </h2>
          
          <p className="text-2xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Join developers who trust <span className="text-white font-bold">ApiScan</span> to protect their APIs from vulnerabilities and ensure bulletproof quality.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <Link href="/login">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" className="h-16 px-12 text-lg font-bold bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 hover:from-cyan-500 hover:via-blue-500 hover:to-purple-500 shadow-2xl shadow-cyan-900/50 group relative overflow-hidden">
                  <span className="relative z-10 flex items-center">
                    Start Free Trial
                    <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                    animate={{ x: ['-200%', '200%'] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                  />
                </Button>
              </motion.div>
            </Link>
            <Link href="/docs">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" size="lg" className="h-16 px-12 text-lg font-bold glass-card border-slate-700/50 hover:bg-white/5 hover:border-cyan-500/30">
                  View Documentation
                </Button>
              </motion.div>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="py-20 border-t border-slate-900/50 glass-card relative z-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-16 mb-16">
            
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <span className="text-2xl font-black">ApiScan</span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed">
                Intelligent API testing platform powered by advanced AI agents.
              </p>
            </div>

            {[
              {
                title: "Product",
                links: ["Features", "Pricing", "Documentation", "Changelog"]
              },
              {
                title: "Company",
                links: ["About Us", "Blog", "Careers", "Contact"]
              },
              {
                title: "Legal",
                links: ["Privacy Policy", "Terms of Service", "Security", "Compliance"]
              }
            ].map((section, i) => (
              <div key={i}>
                <h4 className="font-bold text-white mb-5 text-lg">{section.title}</h4>
                <ul className="space-y-3 text-sm text-slate-400">
                  {section.links.map((link, j) => (
                    <li key={j}>
                      <Link href={`/${link.toLowerCase().replace(' ', '-')}`} className="hover:text-white transition-colors hover:translate-x-1 inline-block">
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="pt-10 border-t border-slate-900/50 flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-slate-500 text-sm font-medium">
              © 2026 ApiScan Inc. All rights reserved.
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
                    className="text-slate-500 hover:text-white transition-colors"
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