import React, { useState } from 'react';
import {
  Search,
  Plus,
  Layers,
  Database,
  FileText,
  ShieldCheck,
} from 'lucide-react';
import { DEMO_KNOWLEDGE_DOCUMENTS } from '../../data/mockData';
import type { KnowledgeDocument } from '../../api/types';
import { StatusBadge } from '../common/StatusBadge';

export const KnowledgePage: React.FC = () => {
  const [documents] = useState<KnowledgeDocument[]>(DEMO_KNOWLEDGE_DOCUMENTS);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [showUploadModal, setShowUploadModal] = useState<boolean>(false);

  const filteredDocs = documents.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = categoryFilter === 'ALL' || doc.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  const totalChunks = documents.reduce((acc, d) => acc + d.chunksCount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Clinical Medical Knowledge Base</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Vectorized literature & guidelines powering Clinic GPT RAG in Supabase
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowUploadModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-sky-600 hover:bg-sky-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Ingest Document</span>
          </button>
        </div>
      </div>

      {/* Vector Store Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-xs">
          <div className="flex items-center gap-2 text-slate-400 mb-2">
            <Database className="w-4 h-4 text-sky-600" />
            <span className="text-xs font-medium text-slate-600">Vector Store Engine</span>
          </div>
          <p className="text-lg font-bold text-slate-800">Supabase pgvector</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Table: <code className="font-mono text-slate-600">documents</code> (1536 / ONNX)</p>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-xs">
          <div className="flex items-center gap-2 text-slate-400 mb-2">
            <Layers className="w-4 h-4 text-teal-600" />
            <span className="text-xs font-medium text-slate-600">Indexed Chunks</span>
          </div>
          <p className="text-lg font-bold text-slate-800">{totalChunks}</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Across {documents.length} clinical references</p>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-xs">
          <div className="flex items-center gap-2 text-slate-400 mb-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-medium text-slate-600">Retrieval Verification</span>
          </div>
          <p className="text-lg font-bold text-emerald-600">Strict Match Active</p>
          <p className="text-[11px] text-slate-400 mt-0.5">k=3 semantic neighborhood</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search documents, guidelines, topics..."
            className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200/80 rounded-lg text-xs text-slate-700 placeholder-slate-400 focus:outline-hidden focus:border-sky-500 transition-colors"
          />
        </div>

        <div className="flex items-center gap-1 text-xs">
          {['ALL', 'Cardiology', 'Psychiatry', 'Pharmacology', 'Emergency Guidelines'].map((cat) => (
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

      {/* Documents List Table */}
      <div className="bg-white border border-slate-200/90 rounded-xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 border-b border-slate-100 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Document Title</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Vector Chunks</th>
                <th className="py-3 px-4">Source</th>
                <th className="py-3 px-4">Last Indexed</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredDocs.map((doc) => (
                <tr key={doc.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4 font-medium text-slate-900 flex items-center gap-2.5">
                    <FileText className="w-4 h-4 text-sky-600 shrink-0" />
                    <div>
                      <p className="font-semibold text-slate-800">{doc.name}</p>
                      <span className="text-[10px] text-slate-400 font-mono">ID: {doc.id} • {doc.sizeKb} KB</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-slate-600 font-medium">
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md text-[11px]">
                      {doc.category}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-700 font-semibold">
                    {doc.chunksCount} chunks
                  </td>
                  <td className="py-3 px-4 text-slate-500">
                    {doc.source}
                  </td>
                  <td className="py-3 px-4 text-slate-500 font-mono text-[11px]">
                    {doc.lastUpdated}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <StatusBadge status={doc.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Ingestion Info Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center gap-2 text-slate-800">
              <Database className="w-5 h-5 text-sky-600" />
              <h3 className="text-sm font-bold">Vector Ingestion Pipeline</h3>
            </div>

            <div className="p-3 bg-sky-50/80 border border-sky-100 rounded-xl text-xs text-slate-600 space-y-2">
              <p className="font-semibold text-sky-900">Direct Supabase pgvector Management</p>
              <p className="leading-relaxed">
                Knowledge documents are chunked and vectorized into the <code className="font-mono text-sky-800">documents</code> table in your linked Supabase project (<code className="font-mono text-sky-800">Team 18</code>).
              </p>
            </div>

            <div className="space-y-3 text-xs text-slate-600">
              <p className="font-medium text-slate-700">Supported Manual Methods:</p>
              <ul className="list-disc list-inside space-y-1 text-slate-500">
                <li>Insert directly via Supabase Dashboard SQL editor.</li>
                <li>LangChain Python vector loader script in backend.</li>
                <li>Bulk embedding generation via FastEmbed or OpenAI embeddings.</li>
              </ul>
            </div>

            <div className="flex justify-end pt-3 border-t border-slate-100">
              <button
                onClick={() => setShowUploadModal(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-semibold transition-colors"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
