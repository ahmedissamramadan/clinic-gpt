import React, { type ReactNode } from 'react';
import { Sidebar, type PageId } from './Sidebar';
import { Header } from './Header';

interface Props {
  activePage: PageId;
  onNavigate: (page: PageId) => void;
  apiHealthy: boolean;
  apiLatency: number;
  onRefreshHealth: () => void;
  isCheckingHealth: boolean;
  children: ReactNode;
}

export const Layout: React.FC<Props> = ({
  activePage,
  onNavigate,
  apiHealthy,
  apiLatency,
  onRefreshHealth,
  isCheckingHealth,
  children,
}) => {
  return (
    <div className="min-h-screen bg-slate-50/60 flex">
      {/* Fixed Left Navigation */}
      <Sidebar
        activePage={activePage}
        onNavigate={onNavigate}
        apiHealthy={apiHealthy}
        apiLatency={apiLatency}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          apiHealthy={apiHealthy}
          onRefreshHealth={onRefreshHealth}
          isCheckingHealth={isCheckingHealth}
          onQuickChat={() => onNavigate('assistant')}
        />
        <main className="flex-1 p-6 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
