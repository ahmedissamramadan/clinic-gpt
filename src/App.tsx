import { useState, useEffect, useCallback } from 'react';
import { Layout } from './components/layout/Layout';
import type { PageId } from './components/layout/Sidebar';
import { DashboardPage } from './components/pages/DashboardPage';
import { AssistantPage } from './components/pages/AssistantPage';
import { PatientsPage } from './components/pages/PatientsPage';
import { ConversationsPage } from './components/pages/ConversationsPage';
import { KnowledgePage } from './components/pages/KnowledgePage';
import { AnalyticsPage } from './components/pages/AnalyticsPage';
import { SettingsPage } from './components/pages/SettingsPage';
import { apiClient } from './api/client';

export function App() {
  const [activePage, setActivePage] = useState<PageId>('dashboard');
  const [apiHealthy, setApiHealthy] = useState<boolean>(true);
  const [apiLatency, setApiLatency] = useState<number>(42);
  const [isCheckingHealth, setIsCheckingHealth] = useState<boolean>(false);

  const checkHealth = useCallback(async () => {
    setIsCheckingHealth(true);
    try {
      const result = await apiClient.checkHealth();
      setApiHealthy(result.isHealthy);
      setApiLatency(result.latencyMs);
    } catch {
      setApiHealthy(false);
    } finally {
      setIsCheckingHealth(false);
    }
  }, []);

  useEffect(() => {
    // Initial health check
    checkHealth();

    // Check health every 30 seconds
    const interval = setInterval(() => {
      checkHealth();
    }, 30000);

    return () => clearInterval(interval);
  }, [checkHealth]);

  const renderActivePage = () => {
    switch (activePage) {
      case 'dashboard':
        return (
          <DashboardPage
            onNavigate={setActivePage}
            apiHealthy={apiHealthy}
            apiLatency={apiLatency}
          />
        );
      case 'assistant':
        return <AssistantPage apiHealthy={apiHealthy} />;
      case 'patients':
        return <PatientsPage onNavigate={setActivePage} />;
      case 'conversations':
        return <ConversationsPage onNavigate={setActivePage} />;
      case 'knowledge':
        return <KnowledgePage />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'settings':
        return (
          <SettingsPage
            apiHealthy={apiHealthy}
            apiLatency={apiLatency}
            onRefreshHealth={checkHealth}
            isCheckingHealth={isCheckingHealth}
          />
        );
      default:
        return <DashboardPage onNavigate={setActivePage} apiHealthy={apiHealthy} apiLatency={apiLatency} />;
    }
  };

  return (
    <Layout
      activePage={activePage}
      onNavigate={setActivePage}
      apiHealthy={apiHealthy}
      apiLatency={apiLatency}
      onRefreshHealth={checkHealth}
      isCheckingHealth={isCheckingHealth}
    >
      {renderActivePage()}
    </Layout>
  );
}

export default App;
