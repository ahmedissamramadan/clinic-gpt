import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Sparkles,
  RefreshCw,
  Trash2,
  Copy,
  Check,
  Bot,
  User,
  ShieldCheck,
  AlertCircle,
  Plus,
  Search,
  BookOpen,
} from 'lucide-react';
import { apiClient } from '../../api/client';
import type { ChatMessage, ChatSession } from '../../api/types';
import { DEMO_CHAT_SESSIONS } from '../../data/mockData';
import { MedicalDisclaimer } from '../common/MedicalDisclaimer';

interface Props {
  apiHealthy?: boolean;
}

const CLINICAL_PROMPT_SUGGESTIONS = [
  {
    title: 'Angina vs. Panic Attack',
    desc: 'Clinical differential criteria for chest pain vs acute panic.',
    query: 'What are the key clinical indicators differentiating acute angina pectoris from a panic-induced somatic symptom?'
  },
  {
    title: 'Resting Heart Rate & Anxiety',
    desc: 'Normal adult resting BPM and autonomic anxiety responses.',
    query: 'What is the normal resting heart rate range for an adult, and how does chronic anxiety affect autonomic heart rate variability?'
  },
  {
    title: 'Hypertension Lifestyle Protocols',
    desc: 'Non-pharmacological guidance for Stage 1 Hypertension.',
    query: 'What evidence-grounded non-pharmacological lifestyle interventions are recommended for patients with Stage 1 Hypertension and elevated stress?'
  },
  {
    title: 'Beta-Blocker Caution Notes',
    desc: 'Cardiovascular medication notes with psychological comorbidities.',
    query: 'What precautions should be observed when prescribing beta-blockers to patients with concurrent depressive or asthma symptoms?'
  }
];

export const AssistantPage: React.FC<Props> = () => {
  const [sessions, setSessions] = useState<ChatSession[]>(DEMO_CHAT_SESSIONS);
  const [activeSessionId, setActiveSessionId] = useState<string>('SESS-01');
  const [inputQuery, setInputQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [sessionSearch, setSessionSearch] = useState<string>('');

  // Initial welcome messages for current session
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'ai',
      text: 'Welcome to Clinic GPT. I am your clinical AI assistant specializing in cardiovascular and mental health evidence support.\n\nAll responses are strictly grounded in validated medical literature and our Supabase clinical vector database. How can I assist your clinical evaluation today?',
      timestamp: '10:00 AM'
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (customText?: string) => {
    const textToSend = (customText || inputQuery).trim();
    if (!textToSend || isLoading) return;

    const userMessageId = `user-${Date.now()}`;
    const userMsg: ChatMessage = {
      id: userMessageId,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setErrorMessage(null);
    setIsLoading(true);

    try {
      // Direct call to the existing Team 18 FastAPI backend (/chat)
      const response = await apiClient.sendChatMessage('dr_ahmed_issam', textToSend);

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: response.answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to receive response from Clinic GPT backend.');
    } finally {
      setIsLoading(false);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleCopyMessage = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: `msg-reset-${Date.now()}`,
        sender: 'ai',
        text: 'Consultation session cleared. Ask a question regarding cardiovascular or mental health management.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setErrorMessage(null);
  };

  const handleNewSession = () => {
    const newId = `SESS-${Date.now().toString().slice(-4)}`;
    const newSession: ChatSession = {
      id: newId,
      title: 'New Clinical Consultation',
      lastUpdated: 'Just now',
      messagesCount: 0,
      category: 'General Clinical'
    };
    setSessions([newSession, ...sessions]);
    setActiveSessionId(newId);
    handleClearChat();
  };

  const filteredSessions = sessions.filter(s =>
    s.title.toLowerCase().includes(sessionSearch.toLowerCase()) ||
    s.category.toLowerCase().includes(sessionSearch.toLowerCase())
  );

  return (
    <div className="h-[calc(100vh-6.5rem)] flex gap-4">
      {/* LEFT: Session & Case History Panel */}
      <div className="w-80 bg-white border border-slate-200/90 rounded-2xl flex flex-col shrink-0 shadow-xs overflow-hidden">
        {/* Panel Header */}
        <div className="p-3.5 border-b border-slate-100 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-800">Consultation History</span>
            <button
              onClick={handleNewSession}
              className="flex items-center gap-1 px-2.5 py-1 bg-sky-50 hover:bg-sky-100 text-sky-700 rounded-lg text-xs font-semibold border border-sky-200/60 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Case</span>
            </button>
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={sessionSearch}
              onChange={(e) => setSessionSearch(e.target.value)}
              placeholder="Search previous cases..."
              className="w-full pl-7 pr-2.5 py-1 bg-slate-50 border border-slate-200/80 rounded-lg text-xs text-slate-700 placeholder-slate-400 focus:outline-hidden focus:border-sky-500 transition-colors"
            />
          </div>
        </div>

        {/* Sessions List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {filteredSessions.map((session) => {
            const isActive = activeSessionId === session.id;
            return (
              <div
                key={session.id}
                onClick={() => setActiveSessionId(session.id)}
                className={`p-3 rounded-xl cursor-pointer transition-all border text-left ${
                  isActive
                    ? 'bg-sky-50/70 border-sky-200 text-slate-900 shadow-2xs'
                    : 'border-transparent hover:bg-slate-50 text-slate-600 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                  <span className="font-semibold uppercase tracking-wider text-sky-700 bg-sky-100/60 px-1.5 py-0.2 rounded">
                    {session.category}
                  </span>
                  <span>{session.lastUpdated}</span>
                </div>
                <h4 className="text-xs font-semibold line-clamp-1 leading-snug">
                  {session.title}
                </h4>
                {session.patientId && (
                  <p className="text-[10px] text-slate-400 mt-1 flex items-center gap-1 font-mono">
                    <User className="w-3 h-3 text-slate-400" />
                    <span>Patient: {session.patientId}</span>
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Supabase Status Footer in Sidebar */}
        <div className="p-3 border-t border-slate-100 bg-slate-50/60 text-[11px] text-slate-500 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-slate-400" />
            <span>Supabase RAG Linked</span>
          </span>
          <span className="text-[10px] font-mono text-emerald-600 font-semibold">pgvector</span>
        </div>
      </div>

      {/* MAIN: Chat Interface */}
      <div className="flex-1 bg-white border border-slate-200/90 rounded-2xl flex flex-col shadow-xs overflow-hidden">
        {/* Chat Top Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between shrink-0 bg-white">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-sky-50 border border-sky-200/60 text-sky-700 flex items-center justify-center shrink-0">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold text-slate-900 tracking-tight">Clinical AI Assistant</h2>
                <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                  Active
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Evidence-grounded cardiovascular and mental health support — Clinic GPT
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleClearChat}
              title="Clear current consultation messages"
              className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg border border-slate-200/80 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Message Cards Scroll Area */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {messages.map((msg) => {
            const isAI = msg.sender === 'ai';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-3xl ${isAI ? 'mr-auto' : 'ml-auto flex-row-reverse'}`}
              >
                {/* Avatar Icon */}
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs shrink-0 mt-0.5 ${
                    isAI
                      ? 'bg-sky-600 text-white shadow-2xs'
                      : 'bg-slate-800 text-white'
                  }`}
                >
                  {isAI ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                </div>

                {/* Message Bubble Card */}
                <div
                  className={`rounded-2xl p-4 text-xs leading-relaxed transition-all shadow-xs ${
                    isAI
                      ? 'bg-white border border-slate-200/90 text-slate-800'
                      : 'bg-sky-50/90 border border-sky-100 text-slate-900 font-medium'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4 mb-1.5 pb-1 border-b border-slate-100 text-[10px] text-slate-400">
                    <span className="font-semibold">{isAI ? 'Clinic GPT Engine' : 'Dr. Ahmed Issam'}</span>
                    <div className="flex items-center gap-2">
                      <span>{msg.timestamp}</span>
                      {isAI && (
                        <button
                          onClick={() => handleCopyMessage(msg.id, msg.text)}
                          title="Copy clinical answer"
                          className="hover:text-slate-600 transition-colors"
                        >
                          {copiedId === msg.id ? (
                            <Check className="w-3 h-3 text-emerald-600" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Message Content */}
                  <div className="whitespace-pre-wrap font-normal text-slate-700 text-xs leading-relaxed space-y-1.5">
                    {msg.text}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex gap-3 max-w-3xl mr-auto">
              <div className="w-7 h-7 rounded-lg bg-sky-600 text-white flex items-center justify-center text-xs shrink-0 mt-0.5 shadow-2xs">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl px-4 py-3 shadow-xs flex items-center gap-2 text-xs text-slate-500">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-sky-600" />
                <span>Evaluating context with Supabase vectors & Groq LLM...</span>
              </div>
            </div>
          )}

          {/* Error Message with Retry */}
          {errorMessage && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-start justify-between gap-3">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-rose-900">Inference Request Error</p>
                  <p className="mt-0.5 text-rose-700">{errorMessage}</p>
                </div>
              </div>
              <button
                onClick={() => handleSendMessage()}
                className="px-2.5 py-1 bg-white border border-rose-300 rounded-lg text-xs font-semibold text-rose-700 hover:bg-rose-100 transition-colors shrink-0"
              >
                Retry
              </button>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Clinical Prompts (Only if message count is small) */}
        {messages.length <= 2 && (
          <div className="px-5 py-2 border-t border-slate-100 bg-slate-50/40">
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 mb-2">
              <Sparkles className="w-3 h-3 text-sky-600" />
              <span>Recommended Clinical Inquiries</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {CLINICAL_PROMPT_SUGGESTIONS.map((item, i) => (
                <button
                  key={i}
                  onClick={() => handleSendMessage(item.query)}
                  className="p-2.5 bg-white border border-slate-200/80 hover:border-sky-300 hover:bg-sky-50/40 rounded-xl text-left transition-all group"
                >
                  <p className="text-xs font-semibold text-slate-800 group-hover:text-sky-700 truncate">{item.title}</p>
                  <p className="text-[11px] text-slate-400 line-clamp-1">{item.desc}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input & Safety Notice Footer */}
        <div className="p-4 border-t border-slate-100 bg-white space-y-2.5 shrink-0">
          <div className="relative flex items-end gap-2 bg-slate-50 border border-slate-200/90 rounded-2xl p-2 focus-within:border-sky-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-sky-100 transition-all">
            <textarea
              ref={inputRef}
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask a clinical question about cardiovascular or mental health..."
              rows={2}
              className="w-full resize-none bg-transparent px-2 py-1 text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden"
              disabled={isLoading}
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputQuery.trim() || isLoading}
              className={`p-2.5 rounded-xl font-medium transition-all shrink-0 ${
                inputQuery.trim() && !isLoading
                  ? 'bg-sky-600 hover:bg-sky-700 text-white shadow-xs'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Evidence-Grounded • Medical Safeguards Active</span>
            </div>
            <span className="hidden sm:inline">Press <kbd className="font-mono bg-slate-100 px-1 py-0.5 rounded border border-slate-200 text-[10px]">Enter ↵</kbd> to submit</span>
          </div>

          <MedicalDisclaimer compact />
        </div>
      </div>
    </div>
  );
};
