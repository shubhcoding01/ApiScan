// 'use client';

// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import { 
//   LayoutDashboard, 
//   FolderGit2, 
//   ShieldAlert, 
//   BookOpen, 
//   Settings, 
//   LogOut 
// } from 'lucide-react';

// const navigation = [
//   { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
//   { name: 'Projects', href: '/projects', icon: FolderGit2 },
//   { name: 'Secrets', href: '/secrets', icon: ShieldAlert },
//   { name: 'Documentation', href: '/docs', icon: BookOpen },
//   { name: 'Settings', href: '/settings', icon: Settings },
// ];

// export default function Sidebar() {
//   const pathname = usePathname();

//   return (
//     <div className="flex h-full w-64 flex-col bg-zinc-900 border-r border-zinc-800">
      
//       {/* 1. Logo Section */}
//       <div className="flex h-16 items-center px-6 border-b border-zinc-800">
//         <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white mr-3">
//           A
//         </div>
//         <span className="text-xl font-bold text-white tracking-tight">ApiScan</span>
//       </div>

//       {/* 2. Navigation Links */}
//       <nav className="flex-1 px-4 py-6 space-y-1">
//         {navigation.map((item) => {
//           // Check if current path starts with the link (e.g., /projects/123 matches /projects)
//           const isActive = pathname.startsWith(item.href);
          
//           return (
//             <Link
//               key={item.name}
//               href={item.href}
//               className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
//                 isActive
//                   ? 'bg-blue-600/10 text-blue-500' // Active Style
//                   : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50' // Inactive Style
//               }`}
//             >
//               <item.icon className={`h-5 w-5 ${isActive ? 'text-blue-500' : 'text-zinc-500'}`} />
//               {item.name}
//             </Link>
//           );
//         })}
//       </nav>

//       {/* 3. Bottom Section (Logout) */}
//       <div className="p-4 border-t border-zinc-800">
//         <button 
//           onClick={() => {
//              // Basic logout logic
//              localStorage.removeItem('token');
//              window.location.href = '/login';
//           }}
//           className="flex w-full items-center gap-3 px-3 py-2 text-sm font-medium text-zinc-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
//         >
//           <LogOut className="h-5 w-5" />
//           Sign Out
//         </button>
//       </div>
//     </div>
//   );
// }

'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  FolderGit2,
  ShieldAlert,
  BookOpen,
  Settings,
  LogOut,
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Projects', href: '/projects', icon: FolderGit2 },
  { name: 'Secrets', href: '/secrets', icon: ShieldAlert },
  { name: 'Documentation', href: '/docs', icon: BookOpen },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const isActiveRoute = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.replace('/login');
  };

  return (
    <aside className="flex h-full w-64 flex-col bg-zinc-900 border-r border-zinc-800">

      {/* Logo */}
      <div className="flex h-16 items-center px-6 border-b border-zinc-800">
        <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white mr-3">
          A
        </div>
        <span className="text-xl font-bold text-white tracking-tight">
          ApiScan
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navigation.map((item) => {
          const active = isActiveRoute(item.href);

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                active
                  ? 'bg-blue-600/10 text-blue-500'
                  : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50'
              }`}
            >
              <item.icon
                className={`h-5 w-5 ${
                  active ? 'text-blue-500' : 'text-zinc-500'
                }`}
              />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-zinc-800">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 px-3 py-2 text-sm font-medium text-zinc-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
        >
          <LogOut className="h-5 w-5" />
          Sign Out
        </button>
      </div>

    </aside>
  );
}
