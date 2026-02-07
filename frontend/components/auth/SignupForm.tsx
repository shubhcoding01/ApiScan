'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Mail, Lock, User, Github, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function SignupForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

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
    <div className="bg-zinc-900/50 backdrop-blur-xl border border-white/5 rounded-2xl p-6 shadow-2xl">
      <form onSubmit={handleSignup} className="space-y-4">
        
        {/* Name Field */}
        <div className="space-y-2">
          <Label className="text-xs font-medium text-zinc-400 ml-1">Full Name</Label>
          <div className="relative group">
            <User className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500 group-focus-within:text-blue-500 transition-colors" />
            <Input 
              required
              placeholder="John Doe" 
              className="pl-9 bg-zinc-950/50 border-zinc-800 focus:border-blue-500/50 focus:ring-blue-500/20 text-white placeholder:text-zinc-600 transition-all" 
            />
          </div>
        </div>

        {/* Email Field */}
        <div className="space-y-2">
          <Label className="text-xs font-medium text-zinc-400 ml-1">Email</Label>
          <div className="relative group">
            <Mail className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500 group-focus-within:text-blue-500 transition-colors" />
            <Input 
              required
              type="email" 
              placeholder="name@company.com" 
              className="pl-9 bg-zinc-950/50 border-zinc-800 focus:border-blue-500/50 focus:ring-blue-500/20 text-white placeholder:text-zinc-600 transition-all" 
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <Label className="text-xs font-medium text-zinc-400 ml-1">Password</Label>
          <div className="relative group">
            <Lock className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500 group-focus-within:text-blue-500 transition-colors" />
            <Input 
              required
              type="password" 
              placeholder="••••••••" 
              className="pl-9 bg-zinc-950/50 border-zinc-800 focus:border-blue-500/50 focus:ring-blue-500/20 text-white placeholder:text-zinc-600 transition-all" 
            />
          </div>
        </div>

        {/* Submit Button */}
        <Button 
          type="submit" 
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-5 mt-2 shadow-lg shadow-blue-900/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              Create Account <ArrowRight className="w-4 h-4 ml-2" />
            </>
          )}
        </Button>
      </form>

      {/* Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-zinc-800" />
        </div>
        <div className="relative flex justify-center text-[10px] uppercase tracking-widest">
          <span className="bg-black px-2 text-zinc-600 font-medium">Or continue with</span>
        </div>
      </div>

      {/* Social Login */}
      <Button 
        variant="outline" 
        type="button"
        className="w-full border-zinc-800 bg-zinc-900/30 hover:bg-white hover:text-black hover:border-white text-zinc-400 transition-all duration-300"
      >
        <Github className="mr-2 h-4 w-4" />
        GitHub
      </Button>
    </div>
  );
}