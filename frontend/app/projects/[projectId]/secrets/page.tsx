// 'use client';

// import { useState, useEffect, useCallback } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import { Plus, Shield, Loader2, Save } from 'lucide-react';

// import api from '@/lib/api';
// import { getToken } from '@/lib/auth';
// import { Secret } from '@/lib/types';
// import PageHeader from '@/components/layout/PageHeader';
// import SecretTable from '@/components/secrets/SecretTable';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// export default function SecretsPage() {
//   const router = useRouter();
//   const params = useParams();
//   const projectId = params.projectId as string;

//   // ----------------------------------------------------
//   // STATE
//   // ----------------------------------------------------
//   const [secrets, setSecrets] = useState<Secret[]>([]);
//   const [isLoading, setIsLoading] = useState(true);

//   const [newKey, setNewKey] = useState('');
//   const [newValue, setNewValue] = useState('');
//   const [isAdding, setIsAdding] = useState(false);
//   const [isDeleting, setIsDeleting] = useState(false);

//   // ----------------------------------------------------
//   // AUTH GUARD
//   // ----------------------------------------------------
//   useEffect(() => {
//     const token = getToken();
//     if (!token) {
//       router.replace('/login');
//       return;
//     }

//     api.get('/auth/me').catch(() => {
//       router.replace('/login');
//     });
//   }, [router]);

//   // ----------------------------------------------------
//   // FETCH SECRETS
//   // ----------------------------------------------------
//   const fetchSecrets = useCallback(async () => {
//     try {
//       const { data } = await api.get(`/secrets/${projectId}`);
//       setSecrets(data);
//     } catch (err) {
//       console.error('Failed to load secrets', err);
//     } finally {
//       setIsLoading(false);
//     }
//   }, [projectId]);

//   useEffect(() => {
//     fetchSecrets();
//   }, [fetchSecrets]);

//   // ----------------------------------------------------
//   // ADD SECRET
//   // ----------------------------------------------------
//   const handleAddSecret = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!newKey || !newValue) return;

//     setIsAdding(true);
//     try {
//       const { data } = await api.post('/secrets/', {
//         project_id: projectId,
//         key_name: newKey.toUpperCase(),
//         value: newValue,
//         environment: 'default', // backend expects this
//         scope: 'runtime',       // backend expects this
//       });

//       setSecrets((prev) => [...prev, data]);
//       setNewKey('');
//       setNewValue('');
//     } catch (err) {
//       console.error('Failed to add secret', err);
//       alert('Failed to add secret');
//     } finally {
//       setIsAdding(false);
//     }
//   };

//   // ----------------------------------------------------
//   // DELETE SECRET
//   // ----------------------------------------------------
//   const handleDeleteSecret = async (secretId: string) => {
//     setIsDeleting(true);
//     try {
//       await api.delete(`/secrets/${secretId}`);
//       setSecrets((prev) => prev.filter((s) => s.id !== secretId));
//     } catch (err) {
//       console.error('Failed to delete secret', err);
//       alert('Could not delete secret');
//     } finally {
//       setIsDeleting(false);
//     }
//   };

//   // ----------------------------------------------------
//   // RENDER
//   // ----------------------------------------------------
//   return (
//     <div className="max-w-5xl mx-auto space-y-8">
//       <PageHeader
//         title="Environment Variables"
//         description="Securely store API keys and tokens. These are encrypted and injected into the test runner at runtime."
//       />

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         {/* ADD SECRET */}
//         <div className="lg:col-span-1">
//           <Card className="sticky top-24 border-zinc-800 bg-zinc-900/50">
//             <CardHeader>
//               <CardTitle className="text-lg flex items-center gap-2">
//                 <Plus className="w-5 h-5 text-blue-500" />
//                 Add Variable
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <form onSubmit={handleAddSecret} className="space-y-4">
//                 <div>
//                   <label className="text-xs text-zinc-400 uppercase">
//                     Key Name
//                   </label>
//                   <Input
//                     placeholder="STRIPE_API_KEY"
//                     value={newKey}
//                     onChange={(e) => setNewKey(e.target.value)}
//                     className="font-mono"
//                   />
//                 </div>

//                 <div>
//                   <label className="text-xs text-zinc-400 uppercase">
//                     Value
//                   </label>
//                   <Input
//                     type="password"
//                     placeholder="sk_live_..."
//                     value={newValue}
//                     onChange={(e) => setNewValue(e.target.value)}
//                     className="font-mono"
//                   />
//                 </div>

//                 <Button
//                   type="submit"
//                   className="w-full"
//                   disabled={isAdding || !newKey || !newValue}
//                 >
//                   {isAdding ? (
//                     <Loader2 className="w-4 h-4 animate-spin" />
//                   ) : (
//                     <>
//                       <Save className="w-4 h-4 mr-2" />
//                       Save Secret
//                     </>
//                   )}
//                 </Button>
//               </form>
//             </CardContent>
//           </Card>

//           {/* SECURITY NOTE */}
//           <div className="mt-4 p-4 bg-blue-900/10 border border-blue-900/30 rounded-xl flex gap-3">
//             <Shield className="w-5 h-5 text-blue-400" />
//             <p className="text-xs text-blue-300">
//               Secrets are encrypted at rest and never returned in plain text.
//             </p>
//           </div>
//         </div>

//         {/* LIST */}
//         <div className="lg:col-span-2">
//           {isLoading ? (
//             <div className="flex justify-center py-12">
//               <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
//             </div>
//           ) : (
//             <SecretTable
//               secrets={secrets}
//               onDelete={handleDeleteSecret}
//               isDeleting={isDeleting}
//             />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }


'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Shield, 
  Loader2, 
  Save, 
  Bot, 
  ChevronRight, 
  Search, 
  Bell, 
  LogOut, 
  User, 
  Settings,
  Lock
} from 'lucide-react';

import api from '@/lib/api';
import { getToken } from '@/lib/auth';
import { Secret } from '@/lib/types';
import PageHeader from '@/components/layout/PageHeader';
import SecretTable from '@/components/secrets/SecretTable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function SecretsPage() {
  const router = useRouter();
  const params = useParams();
  const projectId = params.projectId as string;

  // --- STATE ---
  const [secrets, setSecrets] = useState<Secret[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // --- AUTH GUARD ---
  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.replace('/login');
      return;
    }

    api.get('/auth/me').catch(() => {
      router.replace('/login');
    });
  }, [router]);

  // --- FETCH SECRETS ---
  const fetchSecrets = useCallback(async () => {
    try {
      const { data } = await api.get(`/secrets/${projectId}`);
      setSecrets(data);
    } catch (err) {
      console.error('Failed to load secrets', err);
    } finally {
      setIsLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    fetchSecrets();
  }, [fetchSecrets]);

  // --- ADD SECRET ---
  const handleAddSecret = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKey || !newValue) return;

    setIsAdding(true);
    try {
      const { data } = await api.post('/secrets/', {
        project_id: projectId,
        key_name: newKey.toUpperCase(),
        value: newValue,
        environment: 'default', // backend expects this
        scope: 'runtime',       // backend expects this
      });

      setSecrets((prev) => [...prev, data]);
      setNewKey('');
      setNewValue('');
    } catch (err) {
      console.error('Failed to add secret', err);
      alert('Failed to add secret');
    } finally {
      setIsAdding(false);
    }
  };

  // --- DELETE SECRET ---
  const handleDeleteSecret = async (secretId: string) => {
    setIsDeleting(true);
    try {
      await api.delete(`/secrets/${secretId}`);
      setSecrets((prev) => prev.filter((s) => s.id !== secretId));
    } catch (err) {
      console.error('Failed to delete secret', err);
      alert('Could not delete secret');
    } finally {
      setIsDeleting(false);
    }
  };

  // --- RENDER ---
  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-sans selection:bg-blue-500/30">
      
      {/* --- NAVBAR --- */}
      <nav className="sticky top-0 z-50 border-b border-white/5 bg-[#020617]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          
          {/* Left: Brand & Breadcrumbs */}
          <div className="flex items-center gap-2 text-sm">
            <Link href="/projects" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/20">
                <Bot className="h-5 w-5 text-white" />
                <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-white/20" />
              </div>
              <span className="font-bold text-white hidden sm:block">ApiScan</span>
            </Link>
            <ChevronRight className="w-4 h-4 text-slate-600" />
            <Link href={`/projects/${projectId}`} className="text-slate-400 hover:text-white transition-colors">
              Project
            </Link>
            <ChevronRight className="w-4 h-4 text-slate-600" />
            <span className="font-medium text-white">Vault</span>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex relative w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
                <input 
                    type="text" 
                    placeholder="Search..." 
                    className="h-9 w-full bg-slate-900/50 border border-slate-800 rounded-full pl-9 pr-4 text-sm text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 placeholder:text-slate-600 transition-all"
                />
            </div>

            <button className="p-2 text-slate-400 hover:text-white transition-colors relative">
                <Bell className="w-5 h-5" />
            </button>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full ring-2 ring-slate-800 hover:ring-slate-700 transition-all">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback className="bg-slate-800 text-slate-400">JD</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-[#0B1120] border-slate-800 text-slate-300" align="end">
                  <DropdownMenuLabel className="text-white">John Doe</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-slate-800" />
                  <DropdownMenuItem className="focus:bg-slate-800 focus:text-white cursor-pointer">
                    <User className="mr-2 h-4 w-4" /> Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem className="focus:bg-slate-800 focus:text-white cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" /> Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-slate-800" />
                  <DropdownMenuItem className="text-red-400 focus:bg-red-950/20 focus:text-red-300 cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" /> Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
          </div>
        </div>
      </nav>

      {/* --- MAIN CONTENT --- */}
      <main className="max-w-7xl mx-auto px-6 py-10 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        <PageHeader
          title="Secrets Vault"
          description="Securely store API keys and tokens. These are encrypted via AES-256 and injected into the test runner only at runtime."
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT: ADD SECRET FORM */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-1 space-y-6"
          >
            <Card className="sticky top-24 border-slate-800 bg-slate-900/30 backdrop-blur-sm shadow-xl">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-2 text-white">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                    <Plus className="w-4 h-4 text-blue-400" />
                  </div>
                  Add Variable
                </CardTitle>
                <CardDescription className="text-xs text-slate-400 mt-2">
                  Create a new environment variable to be used in your API tests.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddSecret} className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">
                      Key Name
                    </label>
                    <Input
                      placeholder="e.g. STRIPE_API_KEY"
                      value={newKey}
                      onChange={(e) => setNewKey(e.target.value)}
                      className="font-mono text-sm bg-slate-950/50 border-slate-800 focus:border-blue-500/50 transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">
                      Value
                    </label>
                    <Input
                      type="password"
                      placeholder="sk_live_..."
                      value={newValue}
                      onChange={(e) => setNewValue(e.target.value)}
                      className="font-mono text-sm bg-slate-950/50 border-slate-800 focus:border-blue-500/50 transition-colors"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20 transition-all font-medium"
                    disabled={isAdding || !newKey || !newValue}
                  >
                    {isAdding ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" /> Save Secret
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* SECURITY NOTE */}
            <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-xl flex gap-4">
              <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center shrink-0">
                <Lock className="w-4 h-4 text-slate-400" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-semibold text-white">Military-Grade Encryption</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Secrets are encrypted at rest using AES-256 and are <strong className="text-slate-300">never</strong> returned to the frontend or logged in plain text.
                </p>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: SECRETS LIST */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="border-slate-800 bg-slate-900/30 backdrop-blur-sm min-h-[500px] shadow-xl">
              <CardHeader className="border-b border-slate-800/50 pb-4">
                <CardTitle className="flex items-center gap-2 text-lg text-white">
                  <Shield className="w-5 h-5 text-slate-500" />
                  Active Environment Variables
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center py-32 text-slate-500">
                    <Loader2 className="w-8 h-8 animate-spin mb-4 text-blue-500" />
                    <p className="text-sm font-medium">Loading vault...</p>
                  </div>
                ) : (
                  <div className="p-6">
                    <SecretTable
                      secrets={secrets}
                      onDelete={handleDeleteSecret}
                      isDeleting={isDeleting}
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

        </div>
      </main>
    </div>
  );
}