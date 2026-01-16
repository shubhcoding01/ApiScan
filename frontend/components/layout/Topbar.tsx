// 'use client';

// import { usePathname } from 'next/navigation';

// export default function Topbar() {
//   const pathname = usePathname();

//   // 1. Generate Breadcrumbs from URL
//   // Example: "/projects/123" -> ["Projects", "123"]
//   const breadcrumbs = pathname
//     .split('/')
//     .filter(Boolean) // Remove empty strings
//     .map((part) => part.charAt(0).toUpperCase() + part.slice(1)); // Capitalize

//   return (
//     <header className="h-16 border-b border-zinc-800 bg-black/50 backdrop-blur-sm flex items-center justify-between px-8 sticky top-0 z-10">
      
//       {/* Left: Dynamic Breadcrumbs */}
//       <div className="flex items-center text-sm text-zinc-400">
//         <span className="text-zinc-100 font-medium">Workspace</span>
        
//         {breadcrumbs.map((crumb, index) => (
//           <div key={index} className="flex items-center">
//             <span className="mx-2 text-zinc-600">/</span>
//             <span className={index === breadcrumbs.length - 1 ? "text-white" : ""}>
//               {crumb}
//             </span>
//           </div>
//         ))}
//       </div>

//       {/* Right: User Profile */}
//       <div className="flex items-center gap-4">
//         {/* User Info (Hidden on mobile) */}
//         <div className="text-right hidden md:block">
//           <div className="text-sm font-medium text-white">Admin User</div>
//           <div className="text-xs text-zinc-500">admin@apiscan.com</div>
//         </div>
        
//         {/* Avatar Circle */}
//         <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 border border-zinc-700 flex items-center justify-center text-sm font-bold text-white shadow-lg">
//           AD
//         </div>
//       </div>
//     </header>
//   );
// }

'use client';

import { usePathname } from 'next/navigation';

const LABEL_MAP: Record<string, string> = {
  dashboard: 'Dashboard',
  projects: 'Projects',
  specs: 'Specs',
  blueprints: 'Blueprints',
  'test-runs': 'Test Runs',
  secrets: 'Secrets',
  settings: 'Settings',
  docs: 'Documentation',
};

export default function Topbar() {
  const pathname = usePathname();

  // Build breadcrumbs safely
  const breadcrumbs = pathname
    .split('/')
    .filter(Boolean)
    .filter(part => !/^[0-9a-fA-F-]{8,}$/.test(part)) // hide UUIDs
    .map(part => LABEL_MAP[part] || part.replace('-', ' '))
    .map(label => label.charAt(0).toUpperCase() + label.slice(1));

  return (
    <header className="h-16 border-b border-zinc-800 bg-black/50 backdrop-blur-sm flex items-center justify-between px-8 sticky top-0 z-10">

      {/* Breadcrumbs */}
      <div className="flex items-center text-sm text-zinc-400">
        <span className="text-zinc-100 font-medium">Workspace</span>

        {breadcrumbs.map((crumb, index) => (
          <div key={index} className="flex items-center">
            <span className="mx-2 text-zinc-600">/</span>
            <span
              className={
                index === breadcrumbs.length - 1
                  ? 'text-white font-medium'
                  : ''
              }
            >
              {crumb}
            </span>
          </div>
        ))}
      </div>

      {/* User Info */}
      <div className="flex items-center gap-4">
        <div className="text-right hidden md:block">
          <div className="text-sm font-medium text-white">
            Admin User
          </div>
          <div className="text-xs text-zinc-500">
            admin@apiscan.com
          </div>
        </div>

        <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 border border-zinc-700 flex items-center justify-center text-sm font-bold text-white shadow-lg">
          AD
        </div>
      </div>

    </header>
  );
}
