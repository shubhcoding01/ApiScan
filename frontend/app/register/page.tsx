// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { motion } from 'framer-motion';
// import { Bot, Loader2, Mail, Lock, User, ArrowRight, ShieldCheck } from 'lucide-react';

// import api from '@/lib/api';
// import { setToken } from '@/lib/auth';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

// export default function RegisterPage() {
//   const router = useRouter();
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleRegister = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError('');

//     try {
//       // 1. Register the user (Adjust endpoint to match your FastAPI backend)
//       await api.post('/users/', {
//         email: email,
//         password: password,
//         full_name: name,
//         is_active: true
//       });

//       // 2. Automatically log them in after successful registration
//       const formData = new FormData();
//       formData.append('username', email);
//       formData.append('password', password);

//       const { data } = await api.post('/auth/login', formData, {
//         headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
//       });
      
//       setToken(data.access_token);
//       router.push('/dashboard');
      
//     } catch (err: any) {
//       console.error('Registration failed:', err);
//       setError(err.response?.data?.detail || 'Failed to create account. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#020617] text-slate-100 font-sans selection:bg-blue-500/30 flex flex-col justify-center items-center p-6 relative overflow-hidden">
      
//       {/* --- AMBIENT BACKGROUND --- */}
//       <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
//         <div className="absolute w-[600px] h-[600px] bg-blue-600/10 blur-[150px] rounded-full mix-blend-screen animate-pulse" style={{ animationDuration: '5s' }} />
//         <div className="absolute w-[500px] h-[500px] bg-cyan-600/10 blur-[120px] rounded-full mix-blend-screen -translate-y-32 -translate-x-32" />
//       </div>

//       <motion.div 
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="w-full max-w-md relative z-10"
//       >
//         {/* Logo */}
//         <div className="flex justify-center mb-8">
//           <Link href="/" className="flex items-center gap-3 group">
//             <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
//               <Bot className="h-7 w-7 text-white" />
//               <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/20" />
//             </div>
//             <span className="text-3xl font-bold tracking-tight text-white">
//               ApiScan
//             </span>
//           </Link>
//         </div>

//         <Card className="bg-slate-900/40 border-slate-800 backdrop-blur-xl shadow-2xl shadow-black/50">
//           <CardHeader className="space-y-2 text-center pb-6">
//             <CardTitle className="text-2xl font-bold text-white tracking-tight">Create an account</CardTitle>
//             <CardDescription className="text-slate-400">
//               Start securing your API infrastructure in seconds.
//             </CardDescription>
//           </CardHeader>
          
//           <CardContent>
//             <form onSubmit={handleRegister} className="space-y-5">
              
//               {error && (
//                 <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-start gap-2">
//                   <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5" />
//                   <span>{error}</span>
//                 </div>
//               )}

//               <div className="space-y-2">
//                 <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
//                   Full Name
//                 </label>
//                 <div className="relative">
//                   <User className="absolute left-3 top-2.5 h-5 w-5 text-slate-500" />
//                   <Input 
//                     type="text" 
//                     placeholder="John Doe" 
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     className="pl-10 h-11 bg-slate-950/50 border-slate-800 text-slate-200 focus:border-blue-500/50 transition-colors"
//                     required
//                   />
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
//                   Email Address
//                 </label>
//                 <div className="relative">
//                   <Mail className="absolute left-3 top-2.5 h-5 w-5 text-slate-500" />
//                   <Input 
//                     type="email" 
//                     placeholder="you@company.com" 
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     className="pl-10 h-11 bg-slate-950/50 border-slate-800 text-slate-200 focus:border-blue-500/50 transition-colors"
//                     required
//                   />
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
//                   Password
//                 </label>
//                 <div className="relative">
//                   <Lock className="absolute left-3 top-2.5 h-5 w-5 text-slate-500" />
//                   <Input 
//                     type="password" 
//                     placeholder="••••••••" 
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="pl-10 h-11 bg-slate-950/50 border-slate-800 text-slate-200 focus:border-blue-500/50 transition-colors"
//                     required
//                     minLength={8}
//                   />
//                 </div>
//                 <p className="text-[10px] text-slate-500 ml-1">Must be at least 8 characters long.</p>
//               </div>

//               <Button 
//                 type="submit" 
//                 disabled={isLoading || !email || !password || !name}
//                 className="w-full h-11 bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-lg shadow-blue-900/20 transition-all mt-2"
//               >
//                 {isLoading ? (
//                   <Loader2 className="w-5 h-5 animate-spin" />
//                 ) : (
//                   <>
//                     Sign Up <ArrowRight className="w-4 h-4 ml-2" />
//                   </>
//                 )}
//               </Button>

//             </form>
//           </CardContent>
//         </Card>

//         {/* Footer Area */}
//         <div className="mt-8 text-center space-y-6">
//           <p className="text-slate-400 text-sm">
//             Already have an account?{' '}
//             <Link href="/login" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
//               Log in instead
//             </Link>
//           </p>
          
//           <div className="flex items-center justify-center gap-2 text-xs font-medium text-slate-600 uppercase tracking-widest">
//             <span>Powered by AI</span>
//             <span>•</span>
//             <span>Built in Patna, Bihar</span>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// }


'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Bot, Loader2, Mail, Lock, User, ArrowRight, ShieldCheck } from 'lucide-react';

import api from '@/lib/api';
import { setToken } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // 1. Hit the new /auth/signup endpoint in our backend
      await api.post('/auth/signup', {
        email: email,
        password: password,
        full_name: name,
        is_active: true
      });

      // 2. Automatically log them in after successful registration
      const formData = new FormData();
      formData.append('username', email);
      formData.append('password', password);

      const { data } = await api.post('/auth/login', formData, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });
      
      setToken(data.access_token);
      router.push('/dashboard');
      
    } catch (err: any) {
      console.error('Registration failed:', err);
      // Display the specific error message returned by our backend
      setError(err.response?.data?.detail || 'Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-sans selection:bg-blue-500/30 flex flex-col justify-center items-center p-6 relative overflow-hidden">
      
      {/* --- AMBIENT BACKGROUND --- */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
        <div className="absolute w-[600px] h-[600px] bg-blue-600/10 blur-[150px] rounded-full mix-blend-screen animate-pulse" style={{ animationDuration: '5s' }} />
        <div className="absolute w-[500px] h-[500px] bg-cyan-600/10 blur-[120px] rounded-full mix-blend-screen -translate-y-32 -translate-x-32" />
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
            <CardTitle className="text-2xl font-bold text-white tracking-tight">Create an account</CardTitle>
            <CardDescription className="text-slate-400">
              Start securing your API infrastructure in seconds.
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleRegister} className="space-y-5">
              
              {error && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-5 w-5 text-slate-500" />
                  <Input 
                    type="text" 
                    placeholder="John Doe" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10 h-11 bg-slate-950/50 border-slate-800 text-slate-200 focus:border-blue-500/50 transition-colors"
                    required
                  />
                </div>
              </div>

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
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-5 w-5 text-slate-500" />
                  <Input 
                    type="password" 
                    placeholder="••••••••" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 h-11 bg-slate-950/50 border-slate-800 text-slate-200 focus:border-blue-500/50 transition-colors"
                    required
                    minLength={8}
                  />
                </div>
                <p className="text-[10px] text-slate-500 ml-1">Must be at least 8 characters long.</p>
              </div>

              <Button 
                type="submit" 
                disabled={isLoading || !email || !password || !name}
                className="w-full h-11 bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-lg shadow-blue-900/20 transition-all mt-2"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    Sign Up <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>

            </form>
          </CardContent>
        </Card>

        {/* Footer Area */}
        <div className="mt-8 text-center space-y-6">
          <p className="text-slate-400 text-sm">
            Already have an account?{' '}
            <Link href="/login" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
              Log in instead
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