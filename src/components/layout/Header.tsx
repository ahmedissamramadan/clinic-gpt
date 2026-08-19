import React from 'react';
import { Search, Bell, Sparkles, RefreshCw } from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';

interface Props {
  apiHealthy: boolean;
  onRefreshHealth: () => void;
  isCheckingHealth: boolean;
  onQuickChat: () => void;
}

export const Header: React.FC<Props> = ({
  apiHealthy,
  onRefreshHealth,
  isCheckingHealth,
  onQuickChat,
}) => {
  return (
    <header className="h-16 bg-white/95 backdrop-blur-xs border-b border-slate-200/80 px-6 flex items-center justify-between sticky top-0 z-10">
      {/* Title & Subtitle */}
      <div>
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-semibold text-slate-800">Good morning</h2>
          <span className="text-xs text-slate-400">•</span>
          <span className="text-xs text-slate-500 font-medium">Cardiovascular & Mental Health AI Support</span>
        </div>
        <p className="text-[11px] text-slate-400">Clinic GPT Clinical Intelligence Platform</p>
      </div>

      {/* Right Tools */}
      <div className="flex items-center gap-3">
        {/* Search input */}
        <div className="relative hidden md:block w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search patients, guidelines, IDs..."
            className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200/80 rounded-lg text-xs text-slate-700 placeholder-slate-400 focus:outline-hidden focus:border-sky-500 focus:bg-white transition-all"
          />
        </div>

        {/* Live Status Badge with manual ping */}
        <div className="flex items-center gap-1.5">
          <StatusBadge status={apiHealthy ? 'connected' : 'disconnected'} />
          <button
            onClick={onRefreshHealth}
            title="Refresh API Connection Status"
            className="p-1 text-slate-400 hover:text-slate-600 rounded-md hover:bg-slate-100 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isCheckingHealth ? 'animate-spin text-sky-600' : ''}`} />
          </button>
        </div>

        {/* Notifications */}
        <button
          className="relative p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-50 rounded-lg border border-slate-200/80 transition-colors"
          title="Clinical Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-sky-500 rounded-full" />
        </button>

        {/* Quick Launch Clinical AI */}
        <button
          onClick={onQuickChat}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-sky-600 hover:bg-sky-700 text-white rounded-lg text-xs font-medium shadow-xs transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Ask Clinic GPT</span>
        </button>
      </div>
    </header>
  );
};
