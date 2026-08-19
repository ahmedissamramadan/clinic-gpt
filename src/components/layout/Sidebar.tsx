import React from 'react';
import {
  LayoutDashboard,
  Bot,
  Users,
  MessageSquare,
  BookOpen,
  BarChart2,
  Settings,
  HeartPulse,
  ShieldCheck,
} from 'lucide-react';

export type PageId = 'dashboard' | 'assistant' | 'patients' | 'conversations' | 'knowledge' | 'analytics' | 'settings';

interface Props {
  activePage: PageId;
  onNavigate: (page: PageId) => void;
  apiHealthy: boolean;
  apiLatency: number;
}

export const Sidebar: React.FC<Props> = ({
  activePage,
  onNavigate,
  apiHealthy,
  apiLatency,
}) => {
  const navItems = [
    { id: 'dashboard' as PageId, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'assistant' as PageId, label: 'AI Assistant', icon: Bot, highlight: true },
    { id: 'patients' as PageId, label: 'Patients', icon: Users },
    { id: 'conversations' as PageId, label: 'Conversations', icon: MessageSquare },
    { id: 'knowledge' as PageId, label: 'Medical Knowledge', icon: BookOpen },
    { id: 'analytics' as PageId, label: 'Analytics', icon: BarChart2 },
    { id: 'settings' as PageId, label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200/90 flex flex-col justify-between h-screen sticky top-0 shrink-0 select-none">
      {/* Brand Header */}
      <div>
        <div className="p-5 border-b border-slate-100 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-sky-600 flex items-center justify-center text-white shadow-xs">
            <HeartPulse className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="font-semibold text-base tracking-tight text-slate-900">Clinic GPT</h1>
              <span className="text-[10px] font-semibold bg-sky-50 text-sky-700 px-1.5 py-0.2 rounded border border-sky-200/60">
                PRO
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-normal">Cardio & Mental Health AI</p>
          </div>
        </div>

        {/* Navigation Section */}
        <div className="p-3">
          <div className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
            Clinical Platform
          </div>
          <nav className="space-y-0.5 mt-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs transition-all text-left ${
                    isActive
                      ? 'bg-sky-50/80 text-sky-800 font-semibold border border-sky-100/90 shadow-xs'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium'
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 shrink-0 transition-colors ${
                      isActive ? 'text-sky-600' : 'text-slate-400 group-hover:text-slate-600'
                    }`}
                  />
                  <span className="flex-1 truncate">{item.label}</span>
                  {item.highlight && !isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Bottom Profile & Status Section */}
      <div className="p-3 border-t border-slate-100 space-y-2">
        {/* System Connectivity Indicator */}
        <div className="px-3 py-2 bg-slate-50 border border-slate-200/80 rounded-lg flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full shrink-0 ${
                apiHealthy ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
              }`}
            />
            <span className="text-[11px] font-medium text-slate-600 truncate">
              {apiHealthy ? 'API Connected' : 'API Standby'}
            </span>
          </div>
          {apiHealthy && (
            <span className="text-[10px] text-slate-400 font-mono">{apiLatency}ms</span>
          )}
        </div>

        {/* User Card */}
        <div className="px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center text-xs font-semibold shrink-0">
            AR
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-slate-800 truncate">Ahmed Issam</p>
            <p className="text-[10px] text-slate-400 truncate">Lead Orchestrator</p>
          </div>
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
        </div>
      </div>
    </aside>
  );
};
