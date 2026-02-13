// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { Loader2, Mail, Lock, User, Github, ArrowRight } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';

// export default function SignupForm() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);

//   const handleSignup = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
    
//     // Simulate API call
//     setTimeout(() => {
//       setLoading(false);
//       router.push('/dashboard'); 
//     }, 1500);
//   };

//   return (
//     <div className="bg-zinc-900/50 backdrop-blur-xl border border-white/5 rounded-2xl p-6 shadow-2xl">
//       <form onSubmit={handleSignup} className="space-y-4">
        
//         {/* Name Field */}
//         <div className="space-y-2">
//           <Label className="text-xs font-medium text-zinc-400 ml-1">Full Name</Label>
//           <div className="relative group">
//             <User className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500 group-focus-within:text-blue-500 transition-colors" />
//             <Input 
//               required
//               placeholder="John Doe" 
//               className="pl-9 bg-zinc-950/50 border-zinc-800 focus:border-blue-500/50 focus:ring-blue-500/20 text-white placeholder:text-zinc-600 transition-all" 
//             />
//           </div>
//         </div>

//         {/* Email Field */}
//         <div className="space-y-2">
//           <Label className="text-xs font-medium text-zinc-400 ml-1">Email</Label>
//           <div className="relative group">
//             <Mail className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500 group-focus-within:text-blue-500 transition-colors" />
//             <Input 
//               required
//               type="email" 
//               placeholder="name@company.com" 
//               className="pl-9 bg-zinc-950/50 border-zinc-800 focus:border-blue-500/50 focus:ring-blue-500/20 text-white placeholder:text-zinc-600 transition-all" 
//             />
//           </div>
//         </div>

//         {/* Password Field */}
//         <div className="space-y-2">
//           <Label className="text-xs font-medium text-zinc-400 ml-1">Password</Label>
//           <div className="relative group">
//             <Lock className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500 group-focus-within:text-blue-500 transition-colors" />
//             <Input 
//               required
//               type="password" 
//               placeholder="••••••••" 
//               className="pl-9 bg-zinc-950/50 border-zinc-800 focus:border-blue-500/50 focus:ring-blue-500/20 text-white placeholder:text-zinc-600 transition-all" 
//             />
//           </div>
//         </div>

//         {/* Submit Button */}
//         <Button 
//           type="submit" 
//           disabled={loading}
//           className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-5 mt-2 shadow-lg shadow-blue-900/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
//         >
//           {loading ? (
//             <Loader2 className="w-4 h-4 animate-spin" />
//           ) : (
//             <>
//               Create Account <ArrowRight className="w-4 h-4 ml-2" />
//             </>
//           )}
//         </Button>
//       </form>

//       {/* Divider */}
//       <div className="relative my-6">
//         <div className="absolute inset-0 flex items-center">
//           <span className="w-full border-t border-zinc-800" />
//         </div>
//         <div className="relative flex justify-center text-[10px] uppercase tracking-widest">
//           <span className="bg-black px-2 text-zinc-600 font-medium">Or continue with</span>
//         </div>
//       </div>

//       {/* Social Login */}
//       <Button 
//         variant="outline" 
//         type="button"
//         className="w-full border-zinc-800 bg-zinc-900/30 hover:bg-white hover:text-black hover:border-white text-zinc-400 transition-all duration-300"
//       >
//         <Github className="mr-2 h-4 w-4" />
//         GitHub
//       </Button>
//     </div>
//   );
// }

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Loader2, Mail, Lock, User, Github, ArrowRight, Eye, EyeOff, Check, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function SignupForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');

  // Password strength checker
  const getPasswordStrength = (pass: string) => {
    if (pass.length === 0) return { strength: 0, label: '', color: '' };
    if (pass.length < 6) return { strength: 1, label: 'Weak', color: 'red' };
    if (pass.length < 10) return { strength: 2, label: 'Fair', color: 'amber' };
    if (pass.length >= 10 && /[A-Z]/.test(pass) && /[0-9]/.test(pass)) {
      return { strength: 3, label: 'Strong', color: 'emerald' };
    }
    return { strength: 2, label: 'Fair', color: 'amber' };
  };

  const passwordStrength = getPasswordStrength(password);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      router.push('/dashboard'); 
    }, 1500);
  };

  return (
    <div className="relative">
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/10 via-blue-600/10 to-purple-600/10 blur-3xl rounded-3xl" />
      
      <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-2xl p-8 shadow-2xl">
        
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-900/30">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Create Account
            </h2>
          </div>
          <p className="text-slate-400 text-sm">
            Start securing your APIs in minutes
          </p>
        </div>

        <form onSubmit={handleSignup} className="space-y-5">
          
          {/* Name Field */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-slate-300">Full Name</Label>
            <div className="relative group">
              <User className="absolute left-3.5 top-3 h-5 w-5 text-slate-500 group-focus-within:text-cyan-400 transition-colors pointer-events-none z-10" />
              <Input 
                required
                placeholder="John Doe" 
                className="pl-11 h-12 bg-slate-950/50 border-slate-800 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 text-white placeholder:text-slate-600 transition-all rounded-xl" 
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-slate-300">Email Address</Label>
            <div className="relative group">
              <Mail className="absolute left-3.5 top-3 h-5 w-5 text-slate-500 group-focus-within:text-cyan-400 transition-colors pointer-events-none z-10" />
              <Input 
                required
                type="email" 
                placeholder="name@company.com" 
                className="pl-11 h-12 bg-slate-950/50 border-slate-800 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 text-white placeholder:text-slate-600 transition-all rounded-xl" 
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-slate-300">Password</Label>
            <div className="relative group">
              <Lock className="absolute left-3.5 top-3 h-5 w-5 text-slate-500 group-focus-within:text-cyan-400 transition-colors pointer-events-none z-10" />
              <Input 
                required
                type={showPassword ? 'text' : 'password'}
                placeholder="Create a strong password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-11 pr-11 h-12 bg-slate-950/50 border-slate-800 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 text-white placeholder:text-slate-600 transition-all rounded-xl" 
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3 text-slate-500 hover:text-slate-300 transition-colors z-10"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>

            {/* Password Strength Indicator */}
            {password.length > 0 && (
              <div className="space-y-2 pt-1">
                <div className="flex gap-1">
                  {[1, 2, 3].map((level) => (
                    <div
                      key={level}
                      className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                        level <= passwordStrength.strength
                          ? passwordStrength.color === 'red'
                            ? 'bg-red-500'
                            : passwordStrength.color === 'amber'
                            ? 'bg-amber-500'
                            : 'bg-emerald-500'
                          : 'bg-slate-800'
                      }`}
                    />
                  ))}
                </div>
                <p className={`text-xs font-medium ${
                  passwordStrength.color === 'red'
                    ? 'text-red-400'
                    : passwordStrength.color === 'amber'
                    ? 'text-amber-400'
                    : 'text-emerald-400'
                }`}>
                  Password strength: {passwordStrength.label}
                </p>
              </div>
            )}
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-start gap-3 pt-2">
            <input
              type="checkbox"
              id="terms"
              required
              className="mt-1 w-4 h-4 rounded border-slate-700 bg-slate-950/50 text-cyan-600 focus:ring-2 focus:ring-cyan-500/20 focus:ring-offset-0"
            />
            <label htmlFor="terms" className="text-xs text-slate-400 leading-relaxed">
              I agree to the{' '}
              <Link href="/terms" className="text-cyan-400 hover:text-cyan-300 underline">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="text-cyan-400 hover:text-cyan-300 underline">
                Privacy Policy
              </Link>
            </label>
          </div>

          {/* Submit Button */}
          <Button 
            type="submit" 
            disabled={loading}
            className="w-full h-12 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold mt-2 shadow-lg shadow-cyan-900/30 transition-all hover:shadow-cyan-900/50 hover:scale-[1.02] active:scale-[0.98] rounded-xl"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                Create Account
                <ArrowRight className="w-5 h-5 ml-2" />
              </>
            )}
          </Button>
        </form>

        {/* Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-slate-800" />
          </div>
          <div className="relative flex justify-center text-[11px] uppercase tracking-widest">
            <span className="bg-slate-900 px-3 text-slate-500 font-semibold">Or continue with</span>
          </div>
        </div>

        {/* Social Login */}
        <Button 
          variant="outline" 
          type="button"
          className="w-full h-12 border-slate-700 bg-slate-950/30 hover:bg-slate-800 hover:border-slate-600 text-slate-300 hover:text-white transition-all duration-300 rounded-xl group"
        >
          <Github className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
          Continue with GitHub
        </Button>

        {/* Sign In Link */}
        <p className="text-center text-sm text-slate-400 mt-6">
          Already have an account?{' '}
          <Link href="/login" className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors">
            Sign in
          </Link>
        </p>

        {/* Features */}
        <div className="mt-8 pt-6 border-t border-slate-800/50 space-y-3">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">What you get:</p>
          <div className="space-y-2">
            {[
              'Unlimited API specifications',
              'AI-powered test generation',
              'Real-time vulnerability scanning',
            ].map((feature, index) => (
              <div key={index} className="flex items-center gap-2 text-sm text-slate-400">
                <div className="w-5 h-5 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-cyan-400" />
                </div>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}