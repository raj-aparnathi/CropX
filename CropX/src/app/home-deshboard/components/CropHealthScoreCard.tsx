'use client';

import React, { useEffect, useState } from 'react';
import { AlertTriangle, TrendingDown, Activity } from 'lucide-react';

const HEALTH_SCORE = 72;
const CIRCUMFERENCE = 251.2; // 2 * PI * 40

function getScoreColor(score: number): string {
  if (score >= 80) return '#388E3C';
  if (score >= 60) return '#F9A825';
  if (score >= 40) return '#E65100';
  return '#C62828';
}

function getScoreLabel(score: number): string {
  if (score >= 80) return 'Healthy';
  if (score >= 60) return 'Fair — Monitor';
  if (score >= 40) return 'At Risk';
  return 'Critical';
}

export default function CropHealthScoreCard() {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 300);
    return () => clearTimeout(t);
  }, []);

  const scoreColor = getScoreColor(HEALTH_SCORE);
  const dashOffset = animated
    ? CIRCUMFERENCE - (HEALTH_SCORE / 100) * CIRCUMFERENCE
    : CIRCUMFERENCE;

  const breakdown = [
    { label: 'Tomato Field A', score: 68, area: '2.4 ac' },
    { label: 'Rice Paddy B', score: 81, area: '3.1 ac' },
    { label: 'Wheat Plot C', score: 74, area: '1.8 ac' },
  ];

  return (
    <div className="card-base h-full flex flex-col" style={{ minHeight: '220px' }}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Overall Crop Health</p>
          <p className="text-sm text-muted-foreground mt-0.5">3 active fields · 7.3 acres</p>
        </div>
        <div className="flex items-center gap-1.5 rounded-full bg-severity-medium-bg border border-severity-medium/30 px-2.5 py-1">
          <AlertTriangle size={12} className="text-severity-medium" />
          <span className="text-xs font-semibold text-severity-medium">Needs Attention</span>
        </div>
      </div>

      <div className="flex items-center gap-6 mb-5">
        {/* Radial score */}
        <div className="relative flex-shrink-0">
          <svg width="96" height="96" viewBox="0 0 96 96">
            {/* Background ring */}
            <circle cx="48" cy="48" r="40" fill="none" stroke="var(--border)" strokeWidth="8" />
            {/* Score ring */}
            <circle
              cx="48"
              cy="48"
              r="40"
              fill="none"
              stroke={scoreColor}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={dashOffset}
              style={{
                transform: 'rotate(-90deg)',
                transformOrigin: 'center',
                transition: 'stroke-dashoffset 1.2s ease-out',
              }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold tabular-nums" style={{ color: scoreColor }}>{HEALTH_SCORE}</span>
            <span className="text-xs text-muted-foreground font-medium">/ 100</span>
          </div>
        </div>

        {/* Score details */}
        <div className="flex-1 min-w-0">
          <p className="text-lg font-bold text-foreground">{getScoreLabel(HEALTH_SCORE)}</p>
          <div className="flex items-center gap-1.5 mt-1 mb-3">
            <TrendingDown size={13} className="text-severity-high" />
            <p className="text-xs text-severity-high font-medium">Down 4 pts from last week</p>
          </div>
          <div className="flex items-center gap-2">
            <Activity size={12} className="text-muted-foreground" />
            <p className="text-xs text-muted-foreground">Late blight risk elevated in Field A</p>
          </div>
        </div>
      </div>

      {/* Field breakdown */}
      <div className="space-y-2.5 mt-auto">
        {breakdown.map((field) => {
          const color = getScoreColor(field.score);
          const pct = field.score;
          return (
            <div key={`field-${field.label}`}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-foreground">{field.label}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">{field.area}</span>
                  <span className="text-xs font-bold tabular-nums" style={{ color }}>{field.score}</span>
                </div>
              </div>
              <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${pct}%`, backgroundColor: color }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}