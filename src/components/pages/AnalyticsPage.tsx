import React, { useState } from 'react';
import {
  TrendingUp,
  Clock,
  ShieldCheck,
  HeartPulse,
  Users,
} from 'lucide-react';
import { DEMO_ANALYTICS } from '../../data/mockData';

export const AnalyticsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState<string>('7d');
  const { totalConversations, avgResponseTimeMs, safetyScorePercent, topicBreakdown, weeklyTrends } = DEMO_ANALYTICS;

  const maxWeekly = Math.max(...weeklyTrends.map((d) => d.cardio + d.mentalHealth));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Clinical AI & Telemetry Analytics</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Query distribution, safety compliance, and response latency benchmarks
          </p>
        </div>

        <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 shadow-2xs text-xs">
          {['24h', '7d', '30d', 'Quarter'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1 rounded-lg font-medium transition-all ${
                timeRange === range
                  ? 'bg-slate-800 text-white shadow-2xs'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Total AI Inquiries</span>
          <p className="text-2xl font-bold text-slate-800 mt-1">{totalConversations.toLocaleString()}</p>
          <div className="flex items-center gap-1 text-[11px] text-emerald-600 mt-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+14.2% vs previous period</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Average Response Latency</span>
          <p className="text-2xl font-bold text-slate-800 mt-1">{avgResponseTimeMs} <span className="text-xs font-normal text-slate-400">ms</span></p>
          <div className="flex items-center gap-1 text-[11px] text-sky-600 mt-1">
            <Clock className="w-3.5 h-3.5" />
            <span>Groq LPU Engine Active</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Safety Guard Compliance</span>
          <p className="text-2xl font-bold text-emerald-600 mt-1">{safetyScorePercent}%</p>
          <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>0 Hallucination Breaches</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Telemetry Monitored Patients</span>
          <p className="text-2xl font-bold text-slate-800 mt-1">42</p>
          <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-1">
            <Users className="w-3.5 h-3.5" />
            <span>4 High-Risk Triage Flagged</span>
          </div>
        </div>
      </div>

      {/* Analytics Visual Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Volume Trends (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-800">Weekly Clinical Consultation Volume</h3>
              <p className="text-xs text-slate-400">Comparison of cardiovascular vs mental health inquiries</p>
            </div>
            <div className="flex items-center gap-3 text-[11px] font-medium">
              <span className="flex items-center gap-1.5 text-sky-700">
                <span className="w-2.5 h-2.5 rounded-xs bg-sky-600" />
                Cardiovascular
              </span>
              <span className="flex items-center gap-1.5 text-teal-700">
                <span className="w-2.5 h-2.5 rounded-xs bg-teal-600" />
                Mental Health
              </span>
            </div>
          </div>

          {/* Simple Clean Bar Trend Chart */}
          <div className="h-48 flex items-end justify-between gap-3 pt-6 pb-2 px-2 border-b border-slate-100">
            {weeklyTrends.map((trend) => {
              const cardioHeight = (trend.cardio / maxWeekly) * 100;
              const mentalHeight = (trend.mentalHealth / maxWeekly) * 100;

              return (
                <div key={trend.day} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                  <div className="w-full flex items-end justify-center gap-1 h-full">
                    {/* Cardio Bar */}
                    <div
                      style={{ height: `${cardioHeight}%` }}
                      className="w-1/2 bg-sky-500 hover:bg-sky-600 rounded-t-xs transition-all relative"
                      title={`${trend.day} Cardio: ${trend.cardio}`}
                    />
                    {/* Mental Health Bar */}
                    <div
                      style={{ height: `${mentalHeight}%` }}
                      className="w-1/2 bg-teal-500 hover:bg-teal-600 rounded-t-xs transition-all relative"
                      title={`${trend.day} Mental: ${trend.mentalHealth}`}
                    />
                  </div>
                  <span className="text-[10px] font-medium text-slate-400 group-hover:text-slate-700">
                    {trend.day}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span>Peak Consultation Day: <strong>Friday (131 cases)</strong></span>
            <span className="italic">*Demonstration clinical analytics</span>
          </div>
        </div>

        {/* Right: Topic Breakdown (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs space-y-4">
          <div>
            <h3 className="text-sm font-bold text-slate-800">Domain Inquiry Distribution</h3>
            <p className="text-xs text-slate-400">Proportion of clinical questions by sub-specialty</p>
          </div>

          <div className="space-y-3.5">
            {topicBreakdown.map((topic) => (
              <div key={topic.name} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-700">{topic.name}</span>
                  <span className="font-mono text-slate-500 font-semibold">{topic.percentage}% ({topic.count})</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${topic.percentage}%` }}
                    className="h-full bg-sky-600 rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl text-xs text-slate-600 flex items-center gap-2">
            <HeartPulse className="w-4 h-4 text-sky-600 shrink-0" />
            <span>Cardiovascular remains primary clinical workload (42%).</span>
          </div>
        </div>
      </div>
    </div>
  );
};
