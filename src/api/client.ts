/**
 * Clinic GPT – Unified Production API Client
 * Connects directly to the FastAPI RAG Backend on Railway/Render.
 */

const getInitialBaseUrl = (): string => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('CLINIC_GPT_API_URL');
    if (saved && saved.trim()) {
      return saved.trim().replace(/\/+$/, '');
    }
  }

  const envUrl = 
    (import.meta as any).env?.VITE_API_URL || 
    (import.meta as any).env?.NEXT_PUBLIC_API_URL ||
    '';

  if (envUrl && envUrl.trim()) {
    return envUrl.trim().replace(/\/+$/, '');
  }

  // Default fallback
  return 'http://127.0.0.1:8000';
};

export class ClinicApiClient {
  private static instance: ClinicApiClient;
  private baseUrl: string;

  private constructor() {
    this.baseUrl = getInitialBaseUrl();
  }

  public static getInstance(): ClinicApiClient {
    if (!ClinicApiClient.instance) {
      ClinicApiClient.instance = new ClinicApiClient();
    }
    return ClinicApiClient.instance;
  }

  public getBaseUrl(): string {
    return this.baseUrl;
  }

  public setBaseUrl(url: string): void {
    const cleaned = (url || '').trim().replace(/\/+$/, '');
    this.baseUrl = cleaned || 'http://127.0.0.1:8000';
    if (typeof window !== 'undefined') {
      localStorage.setItem('CLINIC_GPT_API_URL', this.baseUrl);
    }
  }

  public async checkHealth(): Promise<{ isHealthy: boolean; latencyMs: number; error?: string }> {
    const startTime = performance.now();
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);
      
      const response = await fetch(`${this.baseUrl}/health`, {
        method: 'GET',
        mode: 'cors',
        headers: { 'Accept': 'application/json' },
        signal: controller.signal
      }).catch(async () => {
        return fetch(`${this.baseUrl}/`, {
          method: 'GET',
          mode: 'cors',
          headers: { 'Accept': 'application/json' },
          signal: controller.signal
        });
      });

      clearTimeout(timeoutId);
      const latencyMs = Math.round(performance.now() - startTime);

      if (response.ok) {
        return { isHealthy: true, latencyMs };
      } else {
        return { 
          isHealthy: false, 
          latencyMs, 
          error: `HTTP ${response.status}: ${response.statusText}` 
        };
      }
    } catch (err: any) {
      const latencyMs = Math.round(performance.now() - startTime);
      return { 
        isHealthy: false, 
        latencyMs, 
        error: err.name === 'AbortError' 
          ? 'Connection timed out (8s) – Check if backend is awake' 
          : (err.message || 'Failed to fetch (Check CORS / Backend URL)')
      };
    }
  }

  public async sendChatMessage(userId: string, question: string): Promise<{ answer: string }> {
    const endpoint = `${this.baseUrl}/chat`;
    
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId || 'dr_ahmed_issam',
          question: question.trim()
        }),
      });

      if (!response.ok) {
        let errorMessage = `HTTP ${response.status} (${response.statusText})`;
        try {
          const errorData = await response.json();
          if (errorData.detail) {
            errorMessage = typeof errorData.detail === 'string' ? errorData.detail : JSON.stringify(errorData.detail);
          }
        } catch {
          // ignore json parse error
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      if (!data || typeof data.answer !== 'string') {
        throw new Error('Invalid response format received from Clinic GPT backend.');
      }

      return { answer: data.answer };
    } catch (err: any) {
      if (err.message && err.message.includes('Failed to fetch')) {
        throw new Error(`Failed to fetch from ${endpoint}. Ensure backend is running and CORS is enabled.`);
      }
      throw err;
    }
  }
}

export const apiClient = ClinicApiClient.getInstance();
