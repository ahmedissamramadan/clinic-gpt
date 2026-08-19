import React from 'react';
import {
  Users,
  MessageSquare,
  BookOpen,
  Activity,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';
import type { PageId } from '../layout/Sidebar';
import { DEMO_PATIENTS, DEMO_CONVERSATION_LOGS, DEMO_KNOWLEDGE_DOCUMENTS } from '../../data/mockData';
import { StatusBadge } from '../common/StatusBadge';
import { MedicalDisclaimer } from '../common/MedicalDisclaimer';

interface Props {
  onNavigate: (page: PageId) => void;
  apiHealthy: boolean;
  apiLatency: number;
}

export const DashboardPage: React.FC<Props> = ({
  onNavigate,
  apiHealthy,
  apiLatency,
}) => {
  return (
    <div className="space-y-6">
      {/* Top Banner / Welcome card */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-1">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-200/60">
                Cardiovascular & Mental Health
              </span>
              <span className="text-xs text-slate-400">• Evidence Grounded</span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              Clinical Intelligence Dashboard
            </h1>
            <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
              Empowering healthcare clinicians with real-time vector retrieval, safe clinical prompts, and holistic somatic-psychological evaluations.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onNavigate('assistant')}
              className="flex items-center gap-2 px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              <span>Launch Clinical AI</span>
            </button>
            <button
              onClick={() => onNavigate('patients')}
              className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200/80 rounded-xl text-xs font-medium transition-colors"
            >
              View Patients
            </button>
          </div>
        </div>

        {/* Subtle background glow */}
        <div className="absolute -right-12 -top-12 w-48 h-48 bg-sky-50 rounded-full blur-2xl pointer-events-none" />
      </div>

      {/* 4 Main Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. Active Patients */}
        <div
          onClick={() => onNavigate('patients')}
          className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-xs hover:border-slate-300 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:text-slate-600 transition-colors" />
          </div>
          <p className="text-2xl font-bold text-slate-800">42</p>
          <div className="flex items-center justify-between mt-1">
            <span className="text-xs text-slate-500 font-medium">Active Patients</span>
            <span className="text-[10px] text-emerald-600 font-medium">+3 this week</span>
          </div>
        </div>

        {/* 2. AI Conversations */}
        <div
          onClick={() => onNavigate('conversations')}
          className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-xs hover:border-slate-300 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center">
              <MessageSquare className="w-4 h-4" />
            </div>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:text-slate-600 transition-colors" />
          </div>
          <p className="text-2xl font-bold text-slate-800">1,284</p>
          <div className="flex items-center justify-between mt-1">
            <span className="text-xs text-slate-500 font-medium">AI Consultations</span>
            <span className="text-[10px] text-emerald-600 font-medium">100% Guarded</span>
          </div>
        </div>

        {/* 3. Knowledge Base */}
        <div
          onClick={() => onNavigate('knowledge')}
          className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-xs hover:border-slate-300 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:text-slate-600 transition-colors" />
          </div>
          <p className="text-2xl font-bold text-slate-800">490</p>
          <div className="flex items-center justify-between mt-1">
            <span className="text-xs text-slate-500 font-medium">Supabase Vectors</span>
            <span className="text-[10px] text-slate-400 font-medium">{DEMO_KNOWLEDGE_DOCUMENTS.length} Documents</span>
          </div>
        </div>

        {/* 4. System Status */}
        <div
          onClick={() => onNavigate('settings')}
          className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-xs hover:border-slate-300 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${apiHealthy ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
              <Activity className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-mono text-slate-400">{apiHealthy ? `${apiLatency}ms` : 'Offline'}</span>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-base font-bold text-slate-800 truncate">
              {apiHealthy ? 'Connected' : 'Offline'}
            </p>
            <span className={`w-2 h-2 rounded-full ${apiHealthy ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
          </div>
          <div className="flex items-center justify-between mt-1">
            <span className="text-xs text-slate-500 font-medium">FastAPI Engine</span>
            <span className="text-[10px] text-slate-400 font-mono">Groq / Supabase</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Priority Patients & Recent Consultations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 cols): Patient Telemetry Focus */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-slate-800">Priority Clinical Roster</h2>
              <p className="text-xs text-slate-400">Continuous telemetry & AI-assisted risk stratification</p>
            </div>
            <button
              onClick={() => onNavigate('patients')}
              className="text-xs text-sky-600 hover:text-sky-700 font-medium"
            >
              View all 42 patients →
            </button>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-xl overflow-hidden shadow-xs">
            <div className="divide-y divide-slate-100">
              {DEMO_PATIENTS.slice(0, 3).map((patient) => (
                <div
                  key={patient.id}
                  onClick={() => onNavigate('patients')}
                  className="p-4 hover:bg-slate-50/70 transition-colors cursor-pointer flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-700">
                      {patient.name.split(' ').map((n) => n[0]).join('')}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-xs text-slate-900">{patient.name}</span>
                        <span className="text-[11px] text-slate-400 font-mono">({patient.id})</span>
                        <StatusBadge status={patient.riskLevel} />
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">{patient.condition}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 text-right shrink-0">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-semibold">Heart Rate</span>
                      <p className="text-xs font-bold text-slate-800">{patient.vitals.heartRate} <span className="text-[10px] text-slate-400 font-normal">BPM</span></p>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-semibold">BP</span>
                      <p className="text-xs font-bold text-slate-800">{patient.vitals.bloodPressureSys}/{patient.vitals.bloodPressureDia} <span className="text-[10px] text-slate-400 font-normal">mmHg</span></p>
                    </div>
                    <button className="p-1.5 rounded-lg text-slate-400 hover:text-sky-600 hover:bg-sky-50 transition-colors">
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <MedicalDisclaimer compact />
        </div>

        {/* Right Column (1 col): Recent AI Consultations */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-800">Recent AI Case Logs</h2>
            <button
              onClick={() => onNavigate('conversations')}
              className="text-xs text-sky-600 hover:text-sky-700 font-medium"
            >
              All Logs →
            </button>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-xs space-y-3">
            {DEMO_CONVERSATION_LOGS.slice(0, 3).map((log) => (
              <div
                key={log.id}
                onClick={() => onNavigate('assistant')}
                className="p-3 rounded-lg border border-slate-100 hover:border-slate-200 hover:bg-slate-50/50 transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span className="font-semibold text-slate-800 truncate">{log.topic}</span>
                  <span className="text-slate-400 text-[10px] shrink-0 font-mono">{log.date.split(' ')[1]}</span>
                </div>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {log.preview}
                </p>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100/80 text-[10px]">
                  <span className="text-slate-400">{log.patientName}</span>
                  <StatusBadge status={log.status} />
                </div>
              </div>
            ))}

            <button
              onClick={() => onNavigate('assistant')}
              className="w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg border border-slate-200/80 transition-colors flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-sky-600" />
              <span>Start New Consultation</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
