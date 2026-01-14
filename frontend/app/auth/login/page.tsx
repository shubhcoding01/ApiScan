// import Link from 'next/link';
// import LoginForm from '@/components/auth/LoginForm';

// export default function LoginPage() {
//   return (
//     <div className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden bg-black text-white">
      
//       {/* 1. Background Glow Effect */}
//       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />
//       <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/5 blur-[100px] rounded-full pointer-events-none" />

//       {/* 2. Logo & Branding */}
//       <div className="mb-8 z-10 flex flex-col items-center">
//         <div className="flex items-center gap-3 mb-2">
//           <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-bold text-xl shadow-lg shadow-blue-900/20">
//             A
//           </div>
//           <span className="text-2xl font-bold tracking-tight">ApiScan</span>
//         </div>
//         <p className="text-zinc-500 text-sm">Autonomous API Quality Assurance</p>
//       </div>

//       {/* 3. The Login Form Component */}
//       <div className="z-10 w-full max-w-md px-4">
//         <LoginForm />
//       </div>

//       {/* 4. Footer / Navigation */}
//       <div className="mt-8 z-10 text-center space-y-4">
//         <Link 
//           href="/" 
//           className="text-sm text-zinc-500 hover:text-white transition-colors flex items-center justify-center gap-2"
//         >
//           ← Back to Landing Page
//         </Link>
        
//         <div className="text-xs text-zinc-600">
//           By signing in, you agree to our Terms of Service and Privacy Policy.
//         </div>
//       </div>

//     </div>
//   );
// }

import Link from 'next/link';
import LoginForm from '@/components/auth/LoginForm';

export default function LoginPage() {
  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden bg-black text-white">
      
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/5 blur-[100px] rounded-full pointer-events-none" />

      {/* Branding */}
      <div className="mb-8 z-10 flex flex-col items-center">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-bold text-xl shadow-lg shadow-blue-900/20">
            A
          </div>
          <span className="text-2xl font-bold tracking-tight">ApiScan</span>
        </div>
        <p className="text-zinc-500 text-sm">
          Autonomous API Quality Assurance
        </p>
      </div>

      {/* Login Form */}
      <div className="z-10 w-full max-w-md px-4">
        <LoginForm />
      </div>

      {/* Footer */}
      <div className="mt-8 z-10 text-center space-y-4">
        <Link
          href="/"
          className="text-sm text-zinc-500 hover:text-white transition-colors"
        >
          ← Back to Landing Page
        </Link>

        <p className="text-xs text-zinc-600">
          By signing in, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>

    </main>
  );
}
