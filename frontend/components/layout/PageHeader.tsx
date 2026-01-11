import { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  description?: string;
  children?: ReactNode; // This slot is for buttons (e.g. "Create Project")
}

export default function PageHeader({ 
  title, 
  description, 
  children 
}: PageHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-zinc-800/50 pb-6">
      {/* Left Side: Title & Description */}
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">
          {title}
        </h1>
        {description && (
          <p className="text-zinc-400 text-sm mt-1">
            {description}
          </p>
        )}
      </div>

      {/* Right Side: Action Buttons */}
      {children && (
        <div className="flex items-center gap-3">
          {children}
        </div>
      )}
    </div>
  );
}