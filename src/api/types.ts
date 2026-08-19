export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  status?: 'sending' | 'sent' | 'error';
  citations?: string[];
}

export interface ChatSession {
  id: string;
  title: string;
  lastUpdated: string;
  messagesCount: number;
  category: 'Cardiovascular' | 'Mental Health' | 'General Clinical' | 'Medication';
  patientId?: string;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  condition: string;
  lastInteraction: string;
  riskLevel: 'Low' | 'Moderate' | 'High';
  vitals: {
    heartRate: number; // BPM
    bloodPressureSys: number; // mmHg
    bloodPressureDia: number; // mmHg
    oxygenSat: number; // %
    respiratoryRate: number; // breaths/min
  };
  vitalsHistory: {
    time: string;
    heartRate: number;
    bloodPressureSys: number;
    bloodPressureDia: number;
    oxygenSat: number;
    respiratoryRate: number;
  }[];
}

export interface ConversationLog {
  id: string;
  userId: string;
  patientName: string;
  date: string;
  topic: string;
  status: 'Completed' | 'Requires Review' | 'Flagged';
  preview: string;
  category: 'Cardiovascular' | 'Mental Health' | 'General';
}

export interface KnowledgeDocument {
  id: string;
  name: string;
  category: 'Cardiology' | 'Psychiatry' | 'Pharmacology' | 'Emergency Guidelines';
  status: 'Indexed' | 'Syncing' | 'Pending Review';
  lastUpdated: string;
  chunksCount: number;
  source: 'Supabase Vector Store' | 'Manual Upload';
  sizeKb: number;
}

export interface AnalyticsSummary {
  totalConversations: number;
  activePatients: number;
  knowledgeChunks: number;
  avgResponseTimeMs: number;
  safetyScorePercent: number;
  topicBreakdown: {
    name: string;
    count: number;
    percentage: number;
  }[];
  weeklyTrends: {
    day: string;
    cardio: number;
    mentalHealth: number;
  }[];
}
