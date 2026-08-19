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
    <div className="mx-auto max-w-2xl px-6 py-16">
      <p className="mb-2 text-center font-mono text-xs uppercase tracking-widest text-ink-soft">
        Your pathway results
      </p>

      <div className="mx-auto mb-10 flex justify-center">
        <div className="relative flex h-40 w-40 rotate-3 items-center justify-center rounded-full border-2 border-stamp text-stamp">
          <div className="flex flex-col items-center">
            <span className="font-display text-4xl">{topPct}</span>
            <span className="font-mono text-[9px] uppercase tracking-[0.25em]">
              {top.status === 'excellent' || top.status === 'strong' ? 'Strong Match' : 'See details'}
            </span>
          </div>
        </div>
      </div>

      <div className="mb-10 h-52 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} layout="vertical" margin={{ left: 0, right: 24 }}>
            <XAxis type="number" domain={[0, 100]} hide />
            <YAxis
              type="category"
              dataKey="name"
              width={140}
              tick={{ fontSize: 12, fill: '#3D5566', fontFamily: 'var(--font-plex-sans)' }}
              axisLine={false}
              tickLine={false}
            />
            <Bar dataKey="pct" radius={[0, 2, 2, 0]} barSize={18}>
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

      <div className="mt-10">
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

      <p className="mt-10 text-center">
        <button
          type="button"
          onClick={onRestart}
          className="font-mono text-xs uppercase tracking-widest text-ink-soft underline decoration-line underline-offset-4 hover:text-ink"
        >
          Start over
        </button>
      </p>

      <p className="mt-6 text-center text-xs text-ink-soft">
        This is an eligibility estimate, not a guarantee of approval. Rules version {result.rule_version}.
      </p>
    </div>
  );
}
