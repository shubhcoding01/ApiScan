// 'use client';

// import { useState, useEffect } from 'react';
// import { 
//   User, 
//   Mail, 
//   Shield, 
//   Bell, 
//   Moon, 
//   LogOut, 
//   Loader2, 
//   Save 
// } from 'lucide-react';

// import { useAuth } from '@/hooks/useAuth';
// import PageHeader from '@/components/layout/PageHeader';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

// export default function SettingsPage() {
//   const { user, isLoading } = useAuth(); // Uses the hook we built
//   const [isSaving, setIsSaving] = useState(false);

//   // Form State (Mocking user preferences for now)
//   const [formData, setFormData] = useState({
//     fullName: '',
//     email: '',
//     notifications: true,
//     theme: 'dark'
//   });

//   // Load User Data
//   useEffect(() => {
//     if (user) {
//       setFormData(prev => ({
//         ...prev,
//         fullName: user.email.split('@')[0] || 'Admin User',
//         email: user.email
//       }));
//     }
//   }, [user]);

//   const handleSave = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSaving(true);
    
//     // Simulate API call
//     await new Promise(resolve => setTimeout(resolve, 1000));
    
//     setIsSaving(false);
//     alert("Profile updated successfully (Mock).");
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     window.location.href = '/login';
//   };

//   if (isLoading) {
//     return (
//       <div className="flex justify-center py-20">
//         <Loader2 className="w-8 h-8 animate-spin text-zinc-500" />
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
      
//       <PageHeader 
//         title="Settings" 
//         description="Manage your profile, preferences, and account security."
//       />

//       {/* 1. Profile Information */}
//       <Card className="border-zinc-800 bg-zinc-900/30">
//         <CardHeader>
//           <div className="flex items-center gap-2">
//             <User className="w-5 h-5 text-blue-500" />
//             <div>
//               <CardTitle>Profile Information</CardTitle>
//               <CardDescription>Update your personal details.</CardDescription>
//             </div>
//           </div>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSave} className="space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
//               <div className="space-y-2">
//                 <label className="text-sm font-medium text-zinc-300">Full Name</label>
//                 <div className="relative">
//                   <User className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
//                   <Input 
//                     value={formData.fullName}
//                     onChange={(e) => setFormData({...formData, fullName: e.target.value})}
//                     className="pl-10"
//                   />
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <label className="text-sm font-medium text-zinc-300">Email Address</label>
//                 <div className="relative">
//                   <Mail className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
//                   <Input 
//                     value={formData.email}
//                     disabled // Usually email changes require verify flows
//                     className="pl-10 bg-zinc-900/50 text-zinc-500 cursor-not-allowed"
//                   />
//                 </div>
//               </div>

//             </div>

//             <div className="flex justify-end">
//               <Button type="submit" disabled={isSaving}>
//                 {isSaving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
//                 <Save className="w-4 h-4 mr-2" />
//                 Save Changes
//               </Button>
//             </div>
//           </form>
//         </CardContent>
//       </Card>

//       {/* 2. Preferences & Appearance */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
//         {/* Notifications */}
//         <Card className="border-zinc-800 bg-zinc-900/30">
//           <CardHeader>
//             <div className="flex items-center gap-2">
//               <Bell className="w-5 h-5 text-purple-500" />
//               <CardTitle>Notifications</CardTitle>
//             </div>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div className="flex items-center justify-between p-3 border border-zinc-800 rounded-lg">
//               <div className="space-y-0.5">
//                 <div className="text-sm font-medium text-white">Email Alerts</div>
//                 <div className="text-xs text-zinc-500">Receive results when tests fail.</div>
//               </div>
//               <div className="h-6 w-11 bg-blue-600 rounded-full relative cursor-pointer">
//                 <div className="absolute right-1 top-1 h-4 w-4 bg-white rounded-full" />
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Appearance */}
//         <Card className="border-zinc-800 bg-zinc-900/30">
//           <CardHeader>
//             <div className="flex items-center gap-2">
//               <Moon className="w-5 h-5 text-zinc-400" />
//               <CardTitle>Appearance</CardTitle>
//             </div>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div className="flex items-center justify-between p-3 border border-zinc-800 rounded-lg bg-black/20">
//               <span className="text-sm text-zinc-300">Theme</span>
//               <span className="text-xs font-medium bg-zinc-800 text-white px-2 py-1 rounded">
//                 Dark Mode (Locked)
//               </span>
//             </div>
//           </CardContent>
//         </Card>

//       </div>

//       {/* 3. Session Management */}
//       <Card className="border-red-500/20 bg-red-500/5">
//         <CardHeader>
//           <div className="flex items-center gap-2">
//             <Shield className="w-5 h-5 text-red-400" />
//             <CardTitle className="text-red-400">Session Management</CardTitle>
//           </div>
//         </CardHeader>
//         <CardContent>
//           <div className="flex items-center justify-between">
//             <p className="text-sm text-zinc-400">
//               Securely sign out of your account on this device.
//             </p>
//             <Button variant="destructive" onClick={handleLogout}>
//               <LogOut className="w-4 h-4 mr-2" />
//               Sign Out
//             </Button>
//           </div>
//         </CardContent>
//       </Card>

//     </div>
//   );
// }

'use client';

import { useState, useEffect } from 'react';
import { 
  User, 
  Mail, 
  Shield, 
  Bell, 
  Moon, 
  LogOut, 
  Loader2, 
  Save 
} from 'lucide-react';

import { useAuth } from '@/hooks/useAuth';
import { removeToken } from '@/lib/auth';
import PageHeader from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function SettingsPage() {
  const { user, isLoading } = useAuth();
  const [isSaving, setIsSaving] = useState(false);

  /**
   * NOTE:
   * Profile updates are MOCK for MVP.
   * Backend endpoints can be added later.
   */
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    notifications: true,
    theme: 'dark'
  });

  // Load authenticated user
  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.email?.split('@')[0] || 'Admin User',
        email: user.email,
        notifications: true,
        theme: 'dark'
      });
    }
  }, [user]);

  // Mock save handler (future API)
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    // Simulated delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    setIsSaving(false);
    alert('Profile updated successfully (mock).');
  };

  // Logout (REAL)
  const handleLogout = () => {
    removeToken();
    window.location.href = '/auth/login';
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-zinc-500" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
      
      <PageHeader 
        title="Settings" 
        description="Manage your profile, preferences, and account security."
      />

      {/* PROFILE INFORMATION */}
      <Card className="border-zinc-800 bg-zinc-900/30">
        <CardHeader>
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-blue-500" />
            <div>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal details.</CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Full Name */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
                  <Input 
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Email (Read Only) */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
                  <Input 
                    value={formData.email}
                    disabled
                    className="pl-10 bg-zinc-900/50 text-zinc-500 cursor-not-allowed"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={isSaving}>
                {isSaving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* PREFERENCES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Notifications */}
        <Card className="border-zinc-800 bg-zinc-900/30">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-purple-500" />
              <CardTitle>Notifications</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-3 border border-zinc-800 rounded-lg">
              <div>
                <div className="text-sm font-medium text-white">
                  Email Alerts
                </div>
                <div className="text-xs text-zinc-500">
                  Receive alerts when tests fail.
                </div>
              </div>
              <div className="h-6 w-11 bg-blue-600 rounded-full relative">
                <div className="absolute right-1 top-1 h-4 w-4 bg-white rounded-full" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Appearance */}
        <Card className="border-zinc-800 bg-zinc-900/30">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Moon className="w-5 h-5 text-zinc-400" />
              <CardTitle>Appearance</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-3 border border-zinc-800 rounded-lg bg-black/20">
              <span className="text-sm text-zinc-300">Theme</span>
              <span className="text-xs bg-zinc-800 px-2 py-1 rounded">
                Dark Mode (Locked)
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* SESSION */}
      <Card className="border-red-500/20 bg-red-500/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-red-400" />
            <CardTitle className="text-red-400">
              Session Management
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <p className="text-sm text-zinc-400">
              Securely sign out of your account on this device.
            </p>
            <Button variant="destructive" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </CardContent>
      </Card>

    </div>
  );
}
