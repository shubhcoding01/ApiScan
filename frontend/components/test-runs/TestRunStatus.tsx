import { 
  CheckCircle2, 
  XCircle, 
  Loader2, 
  Clock, 
  AlertTriangle 
} from 'lucide-react';

// Define the allowed status strings (matching your backend)
export type RunStatus = 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED' | 'PASSED';

interface TestRunStatusProps {
  status: string; // We accept string to be flexible, but logic expects specific values
}

export default function TestRunStatus({ status }: TestRunStatusProps) {
  
  // Normalize status to uppercase just in case
  const normalizedStatus = status.toUpperCase();

  // 1. Configuration for each status type
  const statusConfig = {
    PASSED: {
      label: 'Passed',
      icon: CheckCircle2,
      style: 'bg-green-500/10 text-green-400 border-green-500/20',
      animate: false
    },
    COMPLETED: { // Sometimes used interchangeably with PASSED depending on logic
      label: 'Completed',
      icon: CheckCircle2,
      style: 'bg-green-500/10 text-green-400 border-green-500/20',
      animate: false
    },
    FAILED: {
      label: 'Failed',
      icon: XCircle,
      style: 'bg-red-500/10 text-red-400 border-red-500/20',
      animate: false
    },
    RUNNING: {
      label: 'Running',
      icon: Loader2,
      style: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      animate: true
    },
    PENDING: {
      label: 'Pending',
      icon: Clock,
      style: 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20',
      animate: false
    }
  };

  // 2. Get config or fallback to default
  const config = statusConfig[normalizedStatus as keyof typeof statusConfig] || {
    label: status,
    icon: AlertTriangle,
    style: 'bg-zinc-800 text-zinc-400 border-zinc-700',
    animate: false
  };

  const Icon = config.icon;

  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${config.style}`}>
      <Icon className={`w-3.5 h-3.5 ${config.animate ? 'animate-spin' : ''}`} />
      <span>{config.label}</span>
      
      {/* Optional: Add a pulsing dot for running state */}
      {normalizedStatus === 'RUNNING' && (
        <span className="relative flex h-2 w-2 ml-1">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
        </span>
      )}
    </div>
  );
}