import React from 'react';
import { ShieldAlert } from 'lucide-react';

interface Props {
  compact?: boolean;
}

export const MedicalDisclaimer: React.FC<Props> = ({ compact = false }) => {
  if (compact) {
    return (
      <div className="flex items-center gap-2 py-1.5 px-3 bg-slate-50 border border-slate-200/80 rounded-md text-[11px] text-slate-500">
        <ShieldAlert className="w-3.5 h-3.5 text-slate-400 shrink-0" />
        <span>
          AI-generated clinical information is for clinical support and educational purposes and does not replace professional medical advice.
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-2.5 p-3 bg-slate-50/80 border border-slate-200/90 rounded-lg text-xs text-slate-600">
      <ShieldAlert className="w-4 h-4 text-sky-700 mt-0.5 shrink-0" />
      <div>
        <p className="font-medium text-slate-700">Clinical Safety Notice</p>
        <p className="text-slate-500 mt-0.5 leading-relaxed">
          Clinic GPT provides evidence-grounded insights for cardiovascular and mental health. All responses must be correlated with clinical judgment. In acute emergencies, seek immediate in-person medical care.
        </p>
      </div>
    </div>
  );
};
