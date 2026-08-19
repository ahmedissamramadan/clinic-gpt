import React, { useState } from 'react';
import {
  Search,
  Sparkles,
} from 'lucide-react';
import { DEMO_PATIENTS } from '../../data/mockData';
import type { Patient } from '../../api/types';
import { StatusBadge } from '../common/StatusBadge';
import { VitalChart } from '../common/VitalChart';
import { MedicalDisclaimer } from '../common/MedicalDisclaimer';
import type { PageId } from '../layout/Sidebar';

interface Props {
  onNavigate: (page: PageId) => void;
}

export const PatientsPage: React.FC<Props> = ({ onNavigate }) => {
  const [selectedPatient, setSelectedPatient] = useState<Patient>(DEMO_PATIENTS[0]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [riskFilter, setRiskFilter] = useState<string>('ALL');

  const filteredPatients = DEMO_PATIENTS.filter((patient) => {
    const matchesSearch =
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.condition.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRisk = riskFilter === 'ALL' || patient.riskLevel === riskFilter;

    return matchesSearch && matchesRisk;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Patient Clinical Telemetry</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Cardiovascular monitoring, autonomic markers, and AI-assisted triage
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-slate-500 font-medium bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs">
            Showing {filteredPatients.length} of {DEMO_PATIENTS.length} demo cohorts
          </span>
        </div>
      </div>

      {/* Main Grid: Left Roster (1/3) & Right Detail View (2/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: Patient Roster (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          {/* Filter Bar */}
          <div className="bg-white p-3 rounded-xl border border-slate-200/90 shadow-xs space-y-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search patient name, ID..."
                className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200/80 rounded-lg text-xs text-slate-700 placeholder-slate-400 focus:outline-hidden focus:border-sky-500 transition-colors"
              />
            </div>

            <div className="flex items-center gap-1 text-[11px]">
              {['ALL', 'Low', 'Moderate', 'High'].map((risk) => (
                <button
                  key={risk}
                  onClick={() => setRiskFilter(risk)}
                  className={`flex-1 py-1 rounded-md font-medium transition-all ${
                    riskFilter === risk
                      ? 'bg-slate-800 text-white'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {risk}
                </button>
              ))}
            </div>
          </div>

          {/* Patient Cards List */}
          <div className="space-y-2">
            {filteredPatients.map((p) => {
              const isSelected = selectedPatient.id === p.id;
              return (
                <div
                  key={p.id}
                  onClick={() => setSelectedPatient(p)}
                  className={`p-3.5 bg-white rounded-xl border transition-all cursor-pointer shadow-xs ${
                    isSelected
                      ? 'border-sky-500 ring-2 ring-sky-100 bg-sky-50/20'
                      : 'border-slate-200/90 hover:border-slate-300 hover:bg-slate-50/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-semibold text-xs text-slate-900">{p.name}</span>
                    <StatusBadge status={p.riskLevel} />
                  </div>

                  <p className="text-xs text-slate-500 line-clamp-1">{p.condition}</p>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 text-[10px] text-slate-400 font-mono">
                    <span>ID: {p.id}</span>
                    <span>Age: {p.age}</span>
                    <span>HR: {p.vitals.heartRate} BPM</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: Patient Deep Dive (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          {/* Selected Patient Banner */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-sm font-bold text-slate-800">
                {selectedPatient.name.split(' ').map((n) => n[0]).join('')}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-bold text-slate-900">{selectedPatient.name}</h2>
                  <span className="text-xs font-mono text-slate-400">({selectedPatient.id})</span>
                  <StatusBadge status={selectedPatient.riskLevel} />
                </div>
                <p className="text-xs text-slate-600 mt-0.5">{selectedPatient.condition}</p>
                <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-1">
                  <span>Age: <strong>{selectedPatient.age}</strong></span>
                  <span>•</span>
                  <span>Gender: <strong>{selectedPatient.gender}</strong></span>
                  <span>•</span>
                  <span>Last AI Check: <strong>{selectedPatient.lastInteraction}</strong></span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onNavigate('assistant')}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Consult AI for Patient</span>
            </button>
          </div>

          {/* 4 Vital Signs Charts */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Continuous Telemetry Waveforms (Last 12 Hours)
              </h3>
              <span className="text-[10px] text-slate-400 italic">
                *Demonstration clinical telemetry records
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* 1. Heart Rate */}
              <VitalChart
                title="Heart Rate (Resting / Ambulatory)"
                unit="BPM"
                currentValue={selectedPatient.vitals.heartRate}
                data={selectedPatient.vitalsHistory.map((h) => ({ time: h.time, value: h.heartRate }))}
                color="#0284c7"
                normalRange={{ min: 60, max: 100 }}
              />

              {/* 2. Blood Pressure (Systolic) */}
              <VitalChart
                title="Blood Pressure (Systolic)"
                unit="mmHg"
                currentValue={selectedPatient.vitals.bloodPressureSys}
                data={selectedPatient.vitalsHistory.map((h) => ({ time: h.time, value: h.bloodPressureSys }))}
                color="#0f766e"
                normalRange={{ min: 90, max: 120 }}
              />

              {/* 3. Oxygen Saturation (SpO2) */}
              <VitalChart
                title="Oxygen Saturation (SpO2)"
                unit="%"
                currentValue={selectedPatient.vitals.oxygenSat}
                data={selectedPatient.vitalsHistory.map((h) => ({ time: h.time, value: h.oxygenSat }))}
                color="#0284c7"
                normalRange={{ min: 95, max: 100 }}
              />

              {/* 4. Respiratory Rate */}
              <VitalChart
                title="Respiratory Rate"
                unit="breaths/min"
                currentValue={selectedPatient.vitals.respiratoryRate}
                data={selectedPatient.vitalsHistory.map((h) => ({ time: h.time, value: h.respiratoryRate }))}
                color="#0f766e"
                normalRange={{ min: 12, max: 20 }}
              />
            </div>
          </div>

          <MedicalDisclaimer />
        </div>
      </div>
    </div>
  );
};
