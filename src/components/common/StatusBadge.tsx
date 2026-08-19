import React from 'react';

export type StatusType = 
  | 'connected' 
  | 'disconnected' 
  | 'connecting' 
  | 'Low' 
  | 'Moderate' 
  | 'High' 
  | 'Indexed' 
  | 'Syncing' 
  | 'Pending Review' 
  | 'Completed' 
  | 'Requires Review' 
  | 'Flagged';

interface Props {
  status: StatusType;
  label?: string;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<Props> = ({ status, label, size = 'sm' }) => {
  let bg = 'bg-slate-100 text-slate-700 border-slate-200';
  let dotColor = 'bg-slate-400';
  let displayLabel = label || status;

  switch (status) {
    case 'connected':
      bg = 'bg-emerald-50 text-emerald-700 border-emerald-200/80';
      dotColor = 'bg-emerald-500 animate-pulse';
      displayLabel = label || 'API Connected';
      break;
    case 'disconnected':
      bg = 'bg-rose-50 text-rose-700 border-rose-200/80';
      dotColor = 'bg-rose-500';
      displayLabel = label || 'API Offline';
      break;
    case 'connecting':
      bg = 'bg-amber-50 text-amber-700 border-amber-200/80';
      dotColor = 'bg-amber-500 animate-ping';
      displayLabel = label || 'Checking API...';
      break;
    case 'Low':
    case 'Indexed':
    case 'Completed':
      bg = 'bg-emerald-50 text-emerald-700 border-emerald-200/70';
      dotColor = 'bg-emerald-500';
      break;
    case 'Moderate':
    case 'Syncing':
    case 'Pending Review':
    case 'Requires Review':
      bg = 'bg-amber-50 text-amber-700 border-amber-200/70';
      dotColor = 'bg-amber-500';
      break;
    case 'High':
    case 'Flagged':
      bg = 'bg-rose-50 text-rose-700 border-rose-200/70';
      dotColor = 'bg-rose-500';
      break;
  }

  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs';

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border font-medium ${sizeClasses} ${bg}`}>
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotColor}`} />
      <span>{displayLabel}</span>
    </span>
  );
};
