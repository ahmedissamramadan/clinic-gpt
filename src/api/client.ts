/**
 * Clinic GPT – Unified API Client
 * Connects directly to the existing Team 18 FastAPI RAG Backend.
 */

const DEFAULT_API_URL = 
  import.meta.env.VITE_API_URL || 
  'http://127.0.0.1:8000';

export class ClinicApiClient {
  private static instance: ClinicApiClient;
  private baseUrl: string;

  private constructor() {
    const savedUrl = typeof window !== 'undefined' ? localStorage.getItem('CLINIC_GPT_API_URL') : null;
    this.baseUrl = savedUrl || DEFAULT_API_URL;
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
    this.baseUrl = url.replace(/\/+$/, '');
    if (typeof window !== 'undefined') {
      localStorage.setItem('CLINIC_GPT_API_URL', this.baseUrl);
    }
  }

  public async checkHealth(): Promise<{ isHealthy: boolean; latencyMs: number; error?: string }> {
    const startTime = performance.now();
    try {
      // Try /health or fallback to /
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);
      
      const response = await fetch(`${this.baseUrl}/health`, {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
        signal: controller.signal
      }).catch(async () => {
        // Fallback check to root or docs
        return fetch(`${this.baseUrl}/`, {
          method: 'GET',
          signal: controller.signal
        });
      });

      clearTimeout(timeoutId);
      const latencyMs = Math.round(performance.now() - startTime);

      if (response.ok) {
        return { isHealthy: true, latencyMs };
      } else {
        return { isHealthy: false, latencyMs, error: `HTTP ${response.status}: ${response.statusText}` };
      }
    } catch (err: any) {
      const latencyMs = Math.round(performance.now() - startTime);
      return { 
        isHealthy: false, 
        latencyMs, 
        error: err.name === 'AbortError' ? 'Connection timed out (6s)' : (err.message || 'Unable to connect to backend API')
      };
    }
  }

  public async sendChatMessage(userId: string, question: string): Promise<{ answer: string }> {
    const endpoint = `${this.baseUrl}/chat`;
    
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        user_id: userId || 'clinical_clinician_default',
        question: question.trim()
      }),
    });

    if (!response.ok) {
      let errorMessage = `Server error (HTTP ${response.status})`;
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
  }
}

export const apiClient = ClinicApiClient.getInstance();
