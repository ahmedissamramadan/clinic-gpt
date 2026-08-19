import React from 'react';

interface DataPoint {
  time: string;
  value: number;
}

interface Props {
  title: string;
  unit: string;
  data: DataPoint[];
  color?: string;
  normalRange?: { min: number; max: number };
  currentValue: number;
}

export const VitalChart: React.FC<Props> = ({
  title,
  unit,
  data,
  color = '#0284c7', // Muted Medical Blue
  normalRange,
  currentValue,
}) => {
  if (!data || data.length === 0) {
    return (
      <div className="p-4 bg-white border border-slate-200/80 rounded-xl">
        <p className="text-xs text-slate-400">No telemetry data</p>
      </div>
    );
  }

  const values = data.map((d) => d.value);
  const minVal = Math.min(...values, normalRange?.min ?? values[0]) - 5;
  const maxVal = Math.max(...values, normalRange?.max ?? values[0]) + 5;
  const range = maxVal - minVal || 1;

  const width = 280;
  const height = 90;
  const paddingX = 10;
  const paddingY = 12;

  const points = data.map((d, index) => {
    const x = paddingX + (index / (data.length - 1)) * (width - paddingX * 2);
    const y = height - paddingY - ((d.value - minVal) / range) * (height - paddingY * 2);
    return { x, y, value: d.value, time: d.time };
  });

  const pathD = points.reduce((acc, point, index, arr) => {
    if (index === 0) return `M ${point.x} ${point.y}`;
    const prev = arr[index - 1];
    const cx = (prev.x + point.x) / 2;
    return `${acc} C ${cx} ${prev.y}, ${cx} ${point.y}, ${point.x} ${point.y}`;
  }, '');

  const areaD = `${pathD} L ${points[points.length - 1].x} ${height} L ${points[0].x} ${height} Z`;

  // Normal range Y bounds
  const normMinY = normalRange ? height - paddingY - ((normalRange.min - minVal) / range) * (height - paddingY * 2) : null;
  const normMaxY = normalRange ? height - paddingY - ((normalRange.max - minVal) / range) * (height - paddingY * 2) : null;

  const isNormal = normalRange ? currentValue >= normalRange.min && currentValue <= normalRange.max : true;

  return (
    <div className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-xs transition-all hover:border-slate-300">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-slate-500">{title}</span>
        <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${isNormal ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
          {isNormal ? 'Normal' : 'Out of range'}
        </span>
      </div>

      <div className="flex items-baseline gap-1.5 mb-3">
        <span className="text-2xl font-semibold tracking-tight text-slate-800">{currentValue}</span>
        <span className="text-xs text-slate-400 font-normal">{unit}</span>
      </div>

      <div className="relative w-full overflow-hidden">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-16 overflow-visible">
          <defs>
            <linearGradient id={`grad-${title}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity="0.18" />
              <stop offset="100%" stopColor={color} stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Normal range horizontal band if available */}
          {normMinY !== null && normMaxY !== null && (
            <rect
              x={paddingX}
              y={normMaxY}
              width={width - paddingX * 2}
              height={Math.max(1, normMinY - normMaxY)}
              fill="#10b981"
              fillOpacity="0.06"
              stroke="#10b981"
              strokeDasharray="2 2"
              strokeWidth="0.5"
              strokeOpacity="0.3"
            />
          )}

          {/* Background grid line */}
          <line x1={paddingX} y1={height / 2} x2={width - paddingX} y2={height / 2} stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />

          {/* Gradient fill */}
          <path d={areaD} fill={`url(#grad-${title})`} />

          {/* Smooth line */}
          <path d={pathD} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />

          {/* Data points */}
          {points.map((p, idx) => (
            <circle
              key={idx}
              cx={p.x}
              cy={p.y}
              r={idx === points.length - 1 ? 3.5 : 2}
              fill={idx === points.length - 1 ? color : '#ffffff'}
              stroke={color}
              strokeWidth={idx === points.length - 1 ? 2 : 1.5}
            />
          ))}
        </svg>
      </div>

      <div className="flex justify-between items-center mt-2 pt-2 border-t border-slate-100 text-[10px] text-slate-400">
        <span>{data[0]?.time}</span>
        {normalRange && <span>Ref: {normalRange.min}-{normalRange.max} {unit}</span>}
        <span>{data[data.length - 1]?.time}</span>
      </div>
    </div>
  );
};
