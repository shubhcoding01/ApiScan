import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface StatCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  trend?: string;
  trendDirection?: 'up' | 'down' | 'neutral';
  color?: 'blue' | 'purple' | 'red' | 'green' | 'orange';
}

export default function StatCard({ 
  label, 
  value, 
  icon: Icon, 
  trend, 
  trendDirection,
  color = 'blue'
}: StatCardProps) {
  
  // Color mapping for the icon background
  const colorStyles = {
    blue: "bg-blue-500/10 text-blue-500",
    purple: "bg-purple-500/10 text-purple-500",
    red: "bg-red-500/10 text-red-500",
    green: "bg-green-500/10 text-green-500",
    orange: "bg-orange-500/10 text-orange-500",
  };

  return (
    <Card className="border-zinc-800 bg-zinc-900/50">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-zinc-400">{label}</p>
            <h3 className="text-2xl font-bold text-white mt-2">{value}</h3>
          </div>
          <div className={`p-3 rounded-xl ${colorStyles[color]}`}>
            <Icon className="w-6 h-6" />
          </div>
        </div>
        
        {trend && (
          <div className="mt-4 flex items-center text-xs">
            <span className={`font-medium ${
              trendDirection === 'up' ? 'text-green-400' : 
              trendDirection === 'down' ? 'text-red-400' : 
              'text-zinc-500'
            }`}>
              {trend}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}