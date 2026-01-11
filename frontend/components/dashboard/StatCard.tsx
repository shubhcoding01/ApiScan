import { LucideIcon, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string; // e.g. "+12%"
  trendDirection?: 'up' | 'down' | 'neutral';
  color?: 'blue' | 'purple' | 'green' | 'red' | 'orange';
}

export default function StatCard({
  label,
  value,
  icon: Icon,
  trend,
  trendDirection = 'neutral',
  color = 'blue',
}: StatCardProps) {
  
  // Dynamic color styles map
  const colorStyles = {
    blue:   'bg-blue-500/10 text-blue-500',
    purple: 'bg-purple-500/10 text-purple-500',
    green:  'bg-green-500/10 text-green-500',
    red:    'bg-red-500/10 text-red-500',
    orange: 'bg-orange-500/10 text-orange-500',
  };

  const trendColor = 
    trendDirection === 'up' ? 'text-green-400' : 
    trendDirection === 'down' ? 'text-red-400' : 
    'text-zinc-500';

  return (
    <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-zinc-700 transition-colors">
      
      {/* Top Row: Icon and Trend */}
      <div className="flex items-center justify-between mb-4">
        <div className={`p-2 rounded-lg ${colorStyles[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
        
        {trend && (
          <span className={`text-xs font-medium flex items-center gap-1 ${trendColor}`}>
            {trend}
            {trendDirection === 'up' && <ArrowUpRight className="w-3 h-3" />}
            {trendDirection === 'down' && <ArrowDownRight className="w-3 h-3" />}
          </span>
        )}
      </div>

      {/* Value and Label */}
      <div className="space-y-1">
        <div className="text-2xl font-bold text-white">{value}</div>
        <div className="text-sm text-zinc-500">{label}</div>
      </div>
    </div>
  );
}