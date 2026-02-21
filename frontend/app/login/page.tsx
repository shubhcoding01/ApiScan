// import Link from 'next/link';
// import LoginForm from '@/components/auth/LoginForm';

// export default function LoginPage() {
//   return (
//     <main className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden bg-black text-white">
      
//       {/* Background Glow */}
//       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />
//       <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/5 blur-[100px] rounded-full pointer-events-none" />

//       {/* Branding */}
//       <div className="mb-8 z-10 flex flex-col items-center">
//         <div className="flex items-center gap-3 mb-2">
//           <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-bold text-xl shadow-lg shadow-blue-900/20">
//             A
//           </div>
//           <span className="text-2xl font-bold tracking-tight">ApiScan</span>
//         </div>
//         <p className="text-zinc-500 text-sm">
//           Autonomous API Quality Assurance
//         </p>
//       </div>

//       {/* Login Form */}
//       <div className="z-10 w-full max-w-md px-4">
//         <LoginForm />
//       </div>

//       {/* Footer */}
//       <div className="mt-8 z-10 text-center space-y-4">
//         <Link
//           href="/"
//           className="text-sm text-zinc-500 hover:text-white transition-colors"
//         >
//           ← Back to Landing Page
//         </Link>

//         <p className="text-xs text-zinc-600">
//           By signing in, you agree to our Terms of Service and Privacy Policy.
//         </p>
//       </div>

//     </main>
//   );
// }


// 'use client';

// import { useState } from 'react';
// import Link from 'next/link';
// import { Bot } from 'lucide-react'; // Using Lucide icon for logo
// import LoginForm from '@/components/auth/LoginForm';
// import SignupForm from '@/components/auth/SignupForm'; 

// export default function LoginPage() {
//   const [isLogin, setIsLogin] = useState(true);

//   return (
//     <main className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden bg-black text-white selection:bg-blue-500/30">
      
//       {/* --- BACKGROUND GLOW --- */}
//       <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
//       <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-600/5 blur-[120px] rounded-full pointer-events-none" />

//       {/* --- BRANDING HEADER --- */}
//       <div className="mb-8 z-10 flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-700">
//         <div className="flex items-center gap-3 mb-3">
//           <div className="w-12 h-12 bg-gradient-to-tr from-blue-600 to-blue-500 rounded-xl flex items-center justify-center shadow-xl shadow-blue-900/20 border border-white/10">
//             <Bot className="w-7 h-7 text-white" />
//           </div>
//           <span className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
//             ApiScan
//           </span>
//         </div>
//         <p className="text-zinc-500 text-sm font-medium">
//           {isLogin ? 'Welcome back, Commander' : 'Join the Autonomous QA Revolution'}
//         </p>
//       </div>

//       {/* --- FORMS CONTAINER --- */}
//       <div className="z-10 w-full max-w-[400px] px-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
        
//         {/* The Toggle Logic */}
//         {isLogin ? (
//            <LoginForm />
//         ) : (
//            <SignupForm />
//         )}

//         {/* Toggle Switch */}
//         <div className="mt-6 text-center text-sm">
//           <span className="text-zinc-500">
//             {isLogin ? "New to ApiScan? " : "Already have an account? "}
//           </span>
//           <button 
//             onClick={() => setIsLogin(!isLogin)}
//             className="text-blue-400 hover:text-blue-300 font-medium transition-colors hover:underline focus:outline-none"
//           >
//             {isLogin ? 'Create an account' : 'Log in'}
//           </button>
//         </div>
//       </div>

//       {/* --- FOOTER --- */}
//       <div className="mt-12 z-10 text-center space-y-4 animate-in fade-in duration-1000 delay-300">
//         <Link
//           href="/"
//           className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors flex items-center justify-center gap-1"
//         >
//           ← Back to Landing Page
//         </Link>
//       </div>

//     </main>
//   );
// }


'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Bot, Loader2, Mail, Lock, ArrowRight, ShieldCheck } from 'lucide-react';

import api from '@/lib/api';
import { setToken } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Adjust this payload based on your FastAPI auth setup (e.g., OAuth2PasswordRequestForm expects formData)
      const formData = new FormData();
      formData.append('username', email);
      formData.append('password', password);

      const { data } = await api.post('/auth/login', formData, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });
      
      setToken(data.access_token);
      router.push('/dashboard');
    } catch (err: any) {
      console.error('Login failed:', err);
      setError(err.response?.data?.detail || 'Invalid email or password.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-sans selection:bg-blue-500/30 flex flex-col justify-center items-center p-6 relative overflow-hidden">
      
      {/* --- AMBIENT BACKGROUND --- */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
        <div className="absolute w-[600px] h-[600px] bg-blue-600/10 blur-[150px] rounded-full mix-blend-screen animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute w-[400px] h-[400px] bg-indigo-600/10 blur-[120px] rounded-full mix-blend-screen translate-y-24 translate-x-24" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Bot className="h-7 w-7 text-white" />
              <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/20" />
            </div>
            <span className="text-3xl font-bold tracking-tight text-white">
              ApiScan
            </span>
          </Link>
        </div>

        <Card className="bg-slate-900/40 border-slate-800 backdrop-blur-xl shadow-2xl shadow-black/50">
          <CardHeader className="space-y-2 text-center pb-6">
            <CardTitle className="text-2xl font-bold text-white tracking-tight">Welcome back</CardTitle>
            <CardDescription className="text-slate-400">
              Enter your credentials to access your workspace.
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-5">
              
              {error && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-5 w-5 text-slate-500" />
                  <Input 
                    type="email" 
                    placeholder="you@company.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-11 bg-slate-950/50 border-slate-800 text-slate-200 focus:border-blue-500/50 transition-colors"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between ml-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Password
                  </label>
                  <Link href="#" className="text-xs text-blue-400 hover:text-blue-300 transition-colors font-medium">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-5 w-5 text-slate-500" />
                  <Input 
                    type="password" 
                    placeholder="••••••••" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 h-11 bg-slate-950/50 border-slate-800 text-slate-200 focus:border-blue-500/50 transition-colors"
                    required
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                disabled={isLoading || !email || !password}
                className="w-full h-11 bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-lg shadow-blue-900/20 transition-all"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    Sign In <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>

            </form>
          </CardContent>
        </Card>

        {/* Footer Area */}
        <div className="mt-8 text-center space-y-6">
          <p className="text-slate-400 text-sm">
            Don't have an account?{' '}
            <Link href="/register" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
              Create an account
            </Link>
          </p>
          
          <div className="flex items-center justify-center gap-2 text-xs font-medium text-slate-600 uppercase tracking-widest">
            <span>Powered by AI</span>
            <span>•</span>
            <span>Built in Patna, Bihar</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}