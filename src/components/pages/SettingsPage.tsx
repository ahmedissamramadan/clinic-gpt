import React, { useState } from 'react';
import {
  Server,
  ShieldCheck,
  CheckCircle,
  RefreshCw,
  User,
  Database,
} from 'lucide-react';
import { apiClient } from '../../api/client';

interface Props {
  apiHealthy: boolean;
  apiLatency: number;
  onRefreshHealth: () => void;
  isCheckingHealth: boolean;
}

export const SettingsPage: React.FC<Props> = ({
  apiHealthy,
  apiLatency,
  onRefreshHealth,
}) => {
  const [apiUrl, setApiUrl] = useState<string>(apiClient.getBaseUrl());
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);
  const [testResult, setTestResult] = useState<{ isHealthy: boolean; latencyMs: number; error?: string } | null>(null);
  const [isTesting, setIsTesting] = useState<boolean>(false);

  const handleSaveApiUrl = () => {
    apiClient.setBaseUrl(apiUrl);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
    onRefreshHealth();
  };

  const handleTestConnection = async () => {
    setIsTesting(true);
    setTestResult(null);
    try {
      const result = await apiClient.checkHealth();
      setTestResult(result);
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">Platform Settings & Diagnostics</h1>
        <p className="text-xs text-slate-400 mt-0.5">
          API connectivity, clinician profile, and Supabase integration configuration
        </p>
      </div>

      {/* 1. Backend API Configuration Card */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <Server className="w-5 h-5 text-sky-600" />
            <div>
              <h2 className="text-sm font-bold text-slate-900">FastAPI Backend Integration</h2>
              <p className="text-xs text-slate-400">Configure target API host endpoint</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${apiHealthy ? 'bg-emerald-500' : 'bg-amber-500'}`} />
            <span className="text-xs font-semibold text-slate-700">
              {apiHealthy ? `Live (${apiLatency}ms)` : 'Standby'}
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Backend Service URL (<code className="font-mono text-sky-700">VITE_API_URL</code>)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={apiUrl}
                onChange={(e) => setApiUrl(e.target.value)}
                placeholder="http://127.0.0.1:8000 or https://...trycloudflare.com"
                className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-sky-500 focus:bg-white transition-all"
              />
              <button
                onClick={handleSaveApiUrl}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors shrink-0"
              >
                Save URL
              </button>
            </div>
            {savedSuccess && (
              <p className="text-[11px] text-emerald-600 font-medium mt-1 flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Endpoint updated and saved to local storage.</span>
              </p>
            )}
          </div>

          <div className="pt-2 flex items-center gap-3">
            <button
              onClick={handleTestConnection}
              disabled={isTesting}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200/80 rounded-lg text-xs font-semibold transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isTesting ? 'animate-spin' : ''}`} />
              <span>{isTesting ? 'Testing connection...' : 'Test Health Endpoint (/health)'}</span>
            </button>
          </div>

          {testResult && (
            <div
              className={`p-3 rounded-xl border text-xs leading-relaxed ${
                testResult.isHealthy
                  ? 'bg-emerald-50/80 border-emerald-200 text-emerald-800'
                  : 'bg-rose-50/80 border-rose-200 text-rose-800'
              }`}
            >
              <p className="font-semibold">
                {testResult.isHealthy ? 'Connection Successful!' : 'Connection Failed'}
              </p>
              <p className="text-[11px] mt-0.5">
                {testResult.isHealthy
                  ? `Successfully reached API in ${testResult.latencyMs}ms. Ready to handle clinical requests.`
                  : testResult.error}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 2. Clinician Profile Card */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
          <User className="w-5 h-5 text-slate-700" />
          <div>
            <h2 className="text-sm font-bold text-slate-900">Clinician Profile</h2>
            <p className="text-xs text-slate-400">Logged in practitioner account</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="text-slate-400">Full Name</label>
            <p className="font-semibold text-slate-800 mt-0.5">Ahmed Issam Ramadan</p>
          </div>
          <div>
            <label className="text-slate-400">Role / Designation</label>
            <p className="font-semibold text-slate-800 mt-0.5">Lead Clinical AI Orchestrator</p>
          </div>
          <div>
            <label className="text-slate-400">Primary Domain</label>
            <p className="font-semibold text-slate-800 mt-0.5">Cardiovascular & Somatic Mental Health</p>
          </div>
          <div>
            <label className="text-slate-400">Security Clearance</label>
            <p className="font-semibold text-emerald-600 mt-0.5 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Full Clinical Access</span>
            </p>
          </div>
        </div>
      </div>

      {/* 3. Linked Cloud & Storage Services */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
          <Database className="w-5 h-5 text-indigo-600" />
          <div>
            <h2 className="text-sm font-bold text-slate-900">Connected Cloud Infrastructure</h2>
            <p className="text-xs text-slate-400">Supabase & Groq engine status</p>
          </div>
        </div>

        <div className="space-y-3 text-xs">
          <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200/80 rounded-xl">
            <div>
              <p className="font-semibold text-slate-800">Supabase Vector Database</p>
              <p className="text-[11px] text-slate-400 font-mono">Project: Team 18 (cyrsjfruayuiskrgwswc)</p>
            </div>
            <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-md font-semibold text-[11px] border border-emerald-200">
              Active EU-West-1
            </span>
          </div>

          <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200/80 rounded-xl">
            <div>
              <p className="font-semibold text-slate-800">Groq High-Speed LLM Inference</p>
              <p className="text-[11px] text-slate-400 font-mono">Model: openai/gpt-oss-120b</p>
            </div>
            <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-md font-semibold text-[11px] border border-emerald-200">
              Active LPU
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
