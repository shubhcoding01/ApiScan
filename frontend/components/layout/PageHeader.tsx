// import { ReactNode } from 'react';

// interface PageHeaderProps {
//   title: string;
//   description?: string;
//   children?: ReactNode; // This slot is for buttons (e.g. "Create Project")
// }

// export default function PageHeader({ 
//   title, 
//   description, 
//   children 
// }: PageHeaderProps) {
//   return (
//     <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-zinc-800/50 pb-6">
//       {/* Left Side: Title & Description */}
//       <div>
//         <h1 className="text-2xl font-bold text-white tracking-tight">
//           {title}
//         </h1>
//         {description && (
//           <p className="text-zinc-400 text-sm mt-1">
//             {description}
//           </p>
//         )}
//       </div>

//       {/* Right Side: Action Buttons */}
//       {children && (
//         <div className="flex items-center gap-3">
//           {children}
//         </div>
//       )}
//     </div>
//   );
// }

// import { ReactNode } from 'react';

// interface PageHeaderProps {
//   title: string;
//   description?: string;
//   children?: ReactNode; // Action buttons slot
//   id?: string; // Optional: useful for anchors or testing
// }

// export default function PageHeader({
//   title,
//   description,
//   children,
//   id,
// }: PageHeaderProps) {
//   return (
//     <header
//       id={id}
//       className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-zinc-800/50 pb-6"
//     >
//       {/* Left: Title & Description */}
//       <div>
//         <h1 className="text-2xl font-bold text-white tracking-tight">
//           {title}
//         </h1>
//         {description && (
//           <p className="text-zinc-400 text-sm mt-1 max-w-2xl">
//             {description}
//           </p>
//         )}
//       </div>

//       {/* Right: Actions */}
//       {children && (
//         <div className="flex items-center gap-3">
//           {children}
//         </div>
//       )}
//     </header>
//   );
// }


import { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  description?: ReactNode; // CHANGED: from 'string' to 'ReactNode'
  children?: ReactNode;
  id?: string;
}

export default function PageHeader({
  title,
  description,
  children,
  id,
}: PageHeaderProps) {
  return (
    <header
      id={id}
      className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8 border-b border-zinc-800/50 pb-6"
    >
      {/* Left: Title & Description */}
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">
          {title}
        </h1>
        {description && (
          <div className="text-zinc-400 text-sm mt-2 max-w-2xl leading-relaxed">
            {description}
          </div>
        )}
      </div>

      {/* Right: Actions */}
      {children && (
        <div className="flex items-center gap-3 mt-1">
          {children}
        </div>
      )}
    </header>
  );
}