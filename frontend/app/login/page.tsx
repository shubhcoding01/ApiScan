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


'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Bot } from 'lucide-react'; // Using Lucide icon for logo
import LoginForm from '@/components/auth/LoginForm';
import SignupForm from '@/components/auth/SignupForm'; 

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden bg-black text-white selection:bg-blue-500/30">
      
      {/* --- BACKGROUND GLOW --- */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-600/5 blur-[120px] rounded-full pointer-events-none" />

      {/* --- BRANDING HEADER --- */}
      <div className="mb-8 z-10 flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 bg-gradient-to-tr from-blue-600 to-blue-500 rounded-xl flex items-center justify-center shadow-xl shadow-blue-900/20 border border-white/10">
            <Bot className="w-7 h-7 text-white" />
          </div>
          <span className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
            ApiScan
          </span>
        </div>
        <p className="text-zinc-500 text-sm font-medium">
          {isLogin ? 'Welcome back, Commander' : 'Join the Autonomous QA Revolution'}
        </p>
      </div>

      {/* --- FORMS CONTAINER --- */}
      <div className="z-10 w-full max-w-[400px] px-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
        
        {/* The Toggle Logic */}
        {isLogin ? (
           <LoginForm />
        ) : (
           <SignupForm />
        )}

        {/* Toggle Switch */}
        <div className="mt-6 text-center text-sm">
          <span className="text-zinc-500">
            {isLogin ? "New to ApiScan? " : "Already have an account? "}
          </span>
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-400 hover:text-blue-300 font-medium transition-colors hover:underline focus:outline-none"
          >
            {isLogin ? 'Create an account' : 'Log in'}
          </button>
        </div>
      </div>

      {/* --- FOOTER --- */}
      <div className="mt-12 z-10 text-center space-y-4 animate-in fade-in duration-1000 delay-300">
        <Link
          href="/"
          className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors flex items-center justify-center gap-1"
        >
          ← Back to Landing Page
        </Link>
      </div>

    </main>
  );
}