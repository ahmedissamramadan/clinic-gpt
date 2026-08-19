import React, { useState } from 'react';
import {
  Search,
  Download,
  ExternalLink,
} from 'lucide-react';
import { DEMO_CONVERSATION_LOGS } from '../../data/mockData';
import type { ConversationLog } from '../../api/types';
import { StatusBadge } from '../common/StatusBadge';
import type { PageId } from '../layout/Sidebar';

interface Props {
  onNavigate: (page: PageId) => void;
}

export const ConversationsPage: React.FC<Props> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [selectedLog, setSelectedLog] = useState<ConversationLog | null>(null);

  const filteredLogs = DEMO_CONVERSATION_LOGS.filter((log) => {
    const matchesSearch =
      log.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.userId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = categoryFilter === 'ALL' || log.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(filteredLogs, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "clinic_gpt_conversation_audit_logs.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Clinical AI Conversation Logs</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Audit trail of evidence-grounded consultations and Supabase persistent chat logs
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExport}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200/90 rounded-lg text-xs font-semibold shadow-2xs transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Audit Log</span>
          </button>
          <button
            onClick={() => onNavigate('assistant')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-sky-600 hover:bg-sky-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
          >
            <span>New Consultation</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter by topic, clinician ID, patient name..."
            className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200/80 rounded-lg text-xs text-slate-700 placeholder-slate-400 focus:outline-hidden focus:border-sky-500 transition-colors"
          />
        </div>

        <div className="flex items-center gap-1 text-xs">
          {['ALL', 'Cardiovascular', 'Mental Health', 'General'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1 rounded-lg font-medium transition-all ${
                categoryFilter === cat
                  ? 'bg-slate-800 text-white shadow-2xs'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Structured Table */}
      <div className="bg-white border border-slate-200/90 rounded-xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 border-b border-slate-100 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Case ID</th>
                <th className="py-3 px-4">Clinician User</th>
                <th className="py-3 px-4">Patient Reference</th>
                <th className="py-3 px-4">Topic / Inquiry</th>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Audit Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLogs.map((log) => (
                <tr
                  key={log.id}
                  className="hover:bg-slate-50/70 transition-colors group cursor-pointer"
                  onClick={() => setSelectedLog(log)}
                >
                  <td className="py-3 px-4 font-mono font-medium text-slate-700">
                    {log.id}
                  </td>
                  <td className="py-3 px-4 font-medium text-slate-900">
                    {log.userId}
                  </td>
                  <td className="py-3 px-4 text-slate-600">
                    {log.patientName}
                  </td>
                  <td className="py-3 px-4">
                    <p className="font-semibold text-slate-800 line-clamp-1">{log.topic}</p>
                    <p className="text-[11px] text-slate-400 line-clamp-1">{log.preview}</p>
                  </td>
                  <td className="py-3 px-4 text-slate-500 font-mono text-[11px]">
                    {log.date}
                  </td>
                  <td className="py-3 px-4">
                    <StatusBadge status={log.status} />
                  </td>
                  <td className="py-3 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => onNavigate('assistant')}
                      className="p-1.5 text-slate-400 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors"
                      title="Open in AI Assistant"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredLogs.length === 0 && (
          <div className="p-8 text-center text-xs text-slate-400">
            No matching consultation logs found.
          </div>
        )}
      </div>

      {/* Log Detail Modal */}
      {selectedLog && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-mono uppercase bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                  {selectedLog.id}
                </span>
                <h3 className="text-sm font-bold text-slate-900 mt-1">{selectedLog.topic}</h3>
              </div>
              <StatusBadge status={selectedLog.status} />
            </div>

            <div className="space-y-2 text-xs">
              <div>
                <span className="text-slate-400">Patient:</span>
                <p className="font-semibold text-slate-800">{selectedLog.patientName}</p>
              </div>
              <div>
                <span className="text-slate-400">Clinical Summary:</span>
                <p className="p-3 bg-slate-50 border border-slate-200/80 rounded-lg text-slate-700 leading-relaxed mt-1">
                  {selectedLog.preview}
                </p>
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2">
                <span>Clinician: {selectedLog.userId}</span>
                <span>Date: {selectedLog.date}</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                onClick={() => setSelectedLog(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setSelectedLog(null);
                  onNavigate('assistant');
                }}
                className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
              >
                Continue in Assistant
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
