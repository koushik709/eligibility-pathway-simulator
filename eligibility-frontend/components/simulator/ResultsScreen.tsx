'use client';

import { useState } from 'react';
import { Bar, BarChart, Cell, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import type { CalculateResponse, PathwayResult } from '@/lib/types';
import PathwayCard from './PathwayCard';
import LeadCaptureForm from './LeadCaptureForm';

const STATUS_COLOR: Record<PathwayResult['status'], string> = {
  excellent: '#2F6B4F',
  strong: '#3D7A9E',
  moderate: '#C48A2E',
  limited: '#A6472C',
};

interface ResultsScreenProps {
  result: CalculateResponse['data'];
  onRestart: () => void;
}

export default function ResultsScreen({ result, onRestart }: ResultsScreenProps) {
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const top = result.pathways[0];
  const topPct = Math.round((top.score / top.max_score) * 100);

  const chartData = result.pathways.map((p) => ({
    name: p.label.length > 18 ? p.label.slice(0, 16) + '\u2026' : p.label,
    pct: Math.round((p.score / p.max_score) * 100),
    status: p.status,
  }));

  const selected = result.pathways.find((p) => p.key === selectedKey) ?? null;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <div className="rounded-[32px] border border-white/70 bg-white/75 p-4 shadow-[0_30px_80px_rgba(14,42,61,0.08)] backdrop-blur-xl sm:p-6 lg:p-8">
        <div className="mb-8 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink-soft">
            Your pathway results
          </p>
          <h1 className="mt-3 font-display text-3xl text-ink sm:text-4xl">Your best-fit immigration options</h1>
        </div>

        <div className="mb-8 flex justify-center">
          <div className="relative flex h-40 w-40 rotate-3 items-center justify-center rounded-full border-[3px] border-[#d8e4e0] bg-gradient-to-br from-white to-[#eef6f4] shadow-[0_26px_45px_rgba(14,42,61,0.08)]">
            <div className="flex flex-col items-center text-ink">
              <span className="font-display text-5xl leading-none">{topPct}</span>
              <span className="mt-2 font-mono text-[9px] uppercase tracking-[0.24em] text-ink-soft">
                {top.status === 'excellent' || top.status === 'strong' ? 'Strong Match' : 'See details'}
              </span>
            </div>
          </div>
        </div>

        <div className="mb-8 h-56 w-full rounded-[28px] border border-[#edf2f0] bg-[#f8faf9] p-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout="vertical" margin={{ left: 0, right: 16 }}>
              <XAxis type="number" domain={[0, 100]} hide />
              <YAxis
                type="category"
                dataKey="name"
                width={150}
                tick={{ fontSize: 12, fill: '#3D5566', fontFamily: 'var(--font-plex-sans)' }}
                axisLine={false}
                tickLine={false}
              />
              <Bar dataKey="pct" radius={[0, 10, 10, 0]} barSize={18}>
                {chartData.map((entry, i) => (
                  <Cell key={i} fill={STATUS_COLOR[entry.status as PathwayResult['status']]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-3">
          {result.pathways.map((pathway) => (
            <PathwayCard
              key={pathway.key}
              pathway={pathway}
              isTopMatch={pathway.key === top.key}
              selected={pathway.key === selectedKey}
              onSelect={() => {
                setSelectedKey(pathway.key);
                requestAnimationFrame(() => {
                  document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                });
              }}
            />
          ))}
        </div>

        <div className="mt-8">
          {selected ? (
            <LeadCaptureForm
              assessmentId={result.assessment_id}
              selectedPathwayKey={selected.key}
              selectedPathwayLabel={selected.label}
            />
          ) : (
            <p className="text-center text-sm text-ink-soft">
              Choose &ldquo;Get a personalized assessment&rdquo; on a pathway above to talk to a specialist.
            </p>
          )}
        </div>

        <div className="mt-10 flex flex-col items-center gap-4">
          <button
            type="button"
            onClick={onRestart}
            className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink-soft underline decoration-line underline-offset-4 transition-colors hover:text-ink"
          >
            Start over
          </button>
          <p className="text-center text-xs text-ink-soft">
            This is an eligibility estimate, not a guarantee of approval. Rules version {result.rule_version}.
          </p>
        </div>
      </div>
    </div>
  );
}
