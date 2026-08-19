import type { Patient, ConversationLog, KnowledgeDocument, AnalyticsSummary, ChatSession } from '../api/types';

export const DEMO_PATIENTS: Patient[] = [
  {
    id: 'PT-8821',
    name: 'Sarah Jenkins',
    age: 48,
    gender: 'Female',
    condition: 'Hypertension Stage 1 & Generalized Anxiety',
    lastInteraction: '10 mins ago',
    riskLevel: 'Moderate',
    vitals: {
      heartRate: 86,
      bloodPressureSys: 138,
      bloodPressureDia: 88,
      oxygenSat: 98,
      respiratoryRate: 18,
    },
    vitalsHistory: [
      { time: '08:00', heartRate: 74, bloodPressureSys: 124, bloodPressureDia: 80, oxygenSat: 99, respiratoryRate: 16 },
      { time: '11:00', heartRate: 78, bloodPressureSys: 128, bloodPressureDia: 82, oxygenSat: 98, respiratoryRate: 16 },
      { time: '14:00', heartRate: 92, bloodPressureSys: 142, bloodPressureDia: 90, oxygenSat: 97, respiratoryRate: 19 },
      { time: '17:00', heartRate: 88, bloodPressureSys: 136, bloodPressureDia: 86, oxygenSat: 98, respiratoryRate: 17 },
      { time: '20:00', heartRate: 86, bloodPressureSys: 138, bloodPressureDia: 88, oxygenSat: 98, respiratoryRate: 18 },
    ]
  },
  {
    id: 'PT-6419',
    name: 'Robert Vance',
    age: 62,
    gender: 'Male',
    condition: 'Post-MI Rehabilitation & Mild Depressive Episode',
    lastInteraction: '1 hour ago',
    riskLevel: 'High',
    vitals: {
      heartRate: 98,
      bloodPressureSys: 146,
      bloodPressureDia: 92,
      oxygenSat: 95,
      respiratoryRate: 21,
    },
    vitalsHistory: [
      { time: '08:00', heartRate: 82, bloodPressureSys: 132, bloodPressureDia: 84, oxygenSat: 97, respiratoryRate: 17 },
      { time: '11:00', heartRate: 89, bloodPressureSys: 138, bloodPressureDia: 88, oxygenSat: 96, respiratoryRate: 19 },
      { time: '14:00', heartRate: 104, bloodPressureSys: 152, bloodPressureDia: 96, oxygenSat: 94, respiratoryRate: 23 },
      { time: '17:00', heartRate: 96, bloodPressureSys: 144, bloodPressureDia: 90, oxygenSat: 95, respiratoryRate: 20 },
      { time: '20:00', heartRate: 98, bloodPressureSys: 146, bloodPressureDia: 92, oxygenSat: 95, respiratoryRate: 21 },
    ]
  },
  {
    id: 'PT-3104',
    name: 'Elena Rostova',
    age: 34,
    gender: 'Female',
    condition: 'Sinus Tachycardia Secondary to Panic Disorder',
    lastInteraction: 'Yesterday',
    riskLevel: 'Low',
    vitals: {
      heartRate: 72,
      bloodPressureSys: 118,
      bloodPressureDia: 76,
      oxygenSat: 99,
      respiratoryRate: 15,
    },
    vitalsHistory: [
      { time: '08:00', heartRate: 70, bloodPressureSys: 116, bloodPressureDia: 74, oxygenSat: 99, respiratoryRate: 14 },
      { time: '11:00', heartRate: 74, bloodPressureSys: 120, bloodPressureDia: 78, oxygenSat: 99, respiratoryRate: 15 },
      { time: '14:00', heartRate: 78, bloodPressureSys: 122, bloodPressureDia: 78, oxygenSat: 98, respiratoryRate: 16 },
      { time: '17:00', heartRate: 73, bloodPressureSys: 119, bloodPressureDia: 75, oxygenSat: 99, respiratoryRate: 15 },
      { time: '20:00', heartRate: 72, bloodPressureSys: 118, bloodPressureDia: 76, oxygenSat: 99, respiratoryRate: 15 },
    ]
  },
  {
    id: 'PT-1945',
    name: 'Marcus Sterling',
    age: 55,
    gender: 'Male',
    condition: 'Atrial Fibrillation Management & Stress-Induced Insomnia',
    lastInteraction: '2 days ago',
    riskLevel: 'Moderate',
    vitals: {
      heartRate: 84,
      bloodPressureSys: 130,
      bloodPressureDia: 82,
      oxygenSat: 97,
      respiratoryRate: 16,
    },
    vitalsHistory: [
      { time: '08:00', heartRate: 80, bloodPressureSys: 126, bloodPressureDia: 80, oxygenSat: 98, respiratoryRate: 16 },
      { time: '11:00', heartRate: 86, bloodPressureSys: 132, bloodPressureDia: 84, oxygenSat: 97, respiratoryRate: 17 },
      { time: '14:00', heartRate: 90, bloodPressureSys: 136, bloodPressureDia: 86, oxygenSat: 96, respiratoryRate: 18 },
      { time: '17:00', heartRate: 85, bloodPressureSys: 130, bloodPressureDia: 82, oxygenSat: 97, respiratoryRate: 16 },
      { time: '20:00', heartRate: 84, bloodPressureSys: 130, bloodPressureDia: 82, oxygenSat: 97, respiratoryRate: 16 },
    ]
  }
];

export const DEMO_CHAT_SESSIONS: ChatSession[] = [
  {
    id: 'SESS-01',
    title: 'Differential: Angina vs. Acute Panic Attack',
    lastUpdated: '10m ago',
    messagesCount: 4,
    category: 'Cardiovascular',
    patientId: 'PT-8821'
  },
  {
    id: 'SESS-02',
    title: 'Beta-Blocker Titration & Nighttime Anxiety Protocol',
    lastUpdated: '1h ago',
    messagesCount: 6,
    category: 'Medication',
    patientId: 'PT-6419'
  },
  {
    id: 'SESS-03',
    title: 'Autonomic Dysregulation Assessment',
    lastUpdated: '3h ago',
    messagesCount: 2,
    category: 'Mental Health',
    patientId: 'PT-3104'
  },
  {
    id: 'SESS-04',
    title: 'Cardiac Rehabilitation Exercise Tolerance Guidelines',
    lastUpdated: 'Yesterday',
    messagesCount: 5,
    category: 'Cardiovascular',
    patientId: 'PT-1945'
  }
];

export const DEMO_CONVERSATION_LOGS: ConversationLog[] = [
  {
    id: 'CNV-1094',
    userId: 'dr_ahmed',
    patientName: 'Sarah Jenkins (PT-8821)',
    date: '2026-08-19 22:45',
    topic: 'Palpitations with situational anxiety',
    status: 'Completed',
    preview: 'Advised on somatic symptom evaluation and non-pharmacological pacing.',
    category: 'Cardiovascular'
  },
  {
    id: 'CNV-1093',
    userId: 'dr_ahmed',
    patientName: 'Robert Vance (PT-6419)',
    date: '2026-08-19 20:12',
    topic: 'Post-infarct recovery fatigue and mood changes',
    status: 'Requires Review',
    preview: 'Flagged persistent depressive feelings interfering with cardiac medication adherence.',
    category: 'Mental Health'
  },
  {
    id: 'CNV-1092',
    userId: 'dr_sarah_m',
    patientName: 'Elena Rostova (PT-3104)',
    date: '2026-08-19 18:30',
    topic: 'Resting tachycardia correlation with sleep deprivation',
    status: 'Completed',
    preview: 'Evidence summary on vagal nerve stimulation exercises and sleep hygiene.',
    category: 'Cardiovascular'
  },
  {
    id: 'CNV-1091',
    userId: 'dr_tariq',
    patientName: 'Marcus Sterling (PT-1945)',
    date: '2026-08-18 16:20',
    topic: 'Warfarin interactions with psychotropic botanicals',
    status: 'Completed',
    preview: 'Identified potential cytochrome P450 contraindications with St Johns Wort.',
    category: 'General'
  },
  {
    id: 'CNV-1090',
    userId: 'clinical_fellow',
    patientName: 'Anonymous Telemetry (PT-5012)',
    date: '2026-08-18 11:05',
    topic: 'Hypertensive urgency threshold identification',
    status: 'Flagged',
    preview: 'Systolic >180 mmHg triage protocol verified against clinical criteria.',
    category: 'Cardiovascular'
  }
];

export const DEMO_KNOWLEDGE_DOCUMENTS: KnowledgeDocument[] = [
  {
    id: 'DOC-CV-01',
    name: 'ACC/AHA Guidelines on Heart Failure & Somatic Stress.pdf',
    category: 'Cardiology',
    status: 'Indexed',
    lastUpdated: '2026-08-19',
    chunksCount: 142,
    source: 'Supabase Vector Store',
    sizeKb: 1240
  },
  {
    id: 'DOC-MH-02',
    name: 'APA Clinical Practice Manual – Anxiety & Cardiac Manifestations.pdf',
    category: 'Psychiatry',
    status: 'Indexed',
    lastUpdated: '2026-08-19',
    chunksCount: 98,
    source: 'Supabase Vector Store',
    sizeKb: 860
  },
  {
    id: 'DOC-PH-03',
    name: 'Pharmacotherapy Reference – Beta-Blockers & SSRI Interactions.pdf',
    category: 'Pharmacology',
    status: 'Indexed',
    lastUpdated: '2026-08-18',
    chunksCount: 76,
    source: 'Supabase Vector Store',
    sizeKb: 620
  },
  {
    id: 'DOC-EM-04',
    name: 'Emergency Triage Protocols for Acute Coronary Syndromes.pdf',
    category: 'Emergency Guidelines',
    status: 'Indexed',
    lastUpdated: '2026-08-17',
    chunksCount: 110,
    source: 'Supabase Vector Store',
    sizeKb: 1150
  },
  {
    id: 'DOC-CV-05',
    name: 'Autonomic Nervous System & Arrhythmia Modulation Research.pdf',
    category: 'Cardiology',
    status: 'Indexed',
    lastUpdated: '2026-08-15',
    chunksCount: 64,
    source: 'Supabase Vector Store',
    sizeKb: 480
  }
];

export const DEMO_ANALYTICS: AnalyticsSummary = {
  totalConversations: 1284,
  activePatients: 42,
  knowledgeChunks: 490,
  avgResponseTimeMs: 420,
  safetyScorePercent: 100,
  topicBreakdown: [
    { name: 'Cardiovascular Evaluation', count: 540, percentage: 42 },
    { name: 'Mental Health & Anxiety', count: 410, percentage: 32 },
    { name: 'Medication Safety & Interactions', count: 215, percentage: 17 },
    { name: 'General Preventive Care', count: 119, percentage: 9 }
  ],
  weeklyTrends: [
    { day: 'Mon', cardio: 42, mentalHealth: 30 },
    { day: 'Tue', cardio: 58, mentalHealth: 44 },
    { day: 'Wed', cardio: 65, mentalHealth: 52 },
    { day: 'Thu', cardio: 51, mentalHealth: 38 },
    { day: 'Fri', cardio: 70, mentalHealth: 61 },
    { day: 'Sat', cardio: 34, mentalHealth: 28 },
    { day: 'Sun', cardio: 29, mentalHealth: 22 },
  ]
};
