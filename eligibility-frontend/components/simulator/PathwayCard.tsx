'use client';

import { useState } from 'react';
import type { PathwayResult } from '@/lib/types';
import ScoreImprovement from './ScoreImprovement';

const STATUS_LABEL: Record<PathwayResult['status'], string> = {
  excellent: 'Excellent',
  strong: 'Strong',
  moderate: 'Possible',
  limited: 'Limited',
};

const STATUS_CLASS: Record<PathwayResult['status'], string> = {
  excellent: 'bg-status-excellent',
  strong: 'bg-status-strong',
  moderate: 'bg-status-moderate',
  limited: 'bg-status-limited',
};

interface PathwayCardProps {
  pathway: PathwayResult;
  isTopMatch: boolean;
  selected: boolean;
  onSelect: () => void;
}

export default function PathwayCard({ pathway, isTopMatch, selected, onSelect }: PathwayCardProps) {
  const [expanded, setExpanded] = useState(isTopMatch);
  const pct = Math.round((pathway.score / pathway.max_score) * 100);

  return (
    <div className={`overflow-hidden rounded-[26px] border bg-[#f8faf9] transition-all duration-200 ${selected ? 'border-stamp/40 shadow-[0_16px_35px_rgba(179,63,46,0.08)]' : 'border-[#e8efed]'}`}>
      <div className="flex items-center justify-between gap-4 px-5 py-4 sm:px-6">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="truncate font-display text-lg text-ink">{pathway.label}</h3>
            {isTopMatch && (
              <span className="flex-shrink-0 rounded-full border border-stamp/20 bg-stamp/10 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-stamp">
                Best Match
              </span>
            )}
          </div>
          <div className="mt-3 h-2 w-full max-w-xs overflow-hidden rounded-full bg-[#dde7e4]">
            <div className={`h-full ${STATUS_CLASS[pathway.status]}`} style={{ width: `${pct}%` }} />
          </div>
        </div>

        <div className="flex flex-shrink-0 items-center gap-4">
          <div className="text-right">
            <div className="font-mono text-2xl leading-none text-ink">{pct}</div>
            <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-soft">
              {STATUS_LABEL[pathway.status]}
            </div>
          </div>
          <button
            type="button"
            onClick={() => setExpanded((e) => !e)}
            className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink-soft underline decoration-line underline-offset-4 transition-colors hover:text-ink"
          >
            {expanded ? 'Hide' : 'Why'}
          </button>
        </div>
      </div>

      {expanded && (
        <div className="border-t border-dashed border-line bg-white/60 px-5 pb-5 pt-4 sm:px-6">
          <ul className="mb-4 space-y-2 text-sm">
            {pathway.reasons.map((reason, i) => (
              <li key={i} className="flex gap-2">
                <span className={reason.type === 'positive' ? 'text-status-excellent' : 'text-status-moderate'}>
                  {reason.type === 'positive' ? '✓' : '⚠'}
                </span>
                <span className="text-ink-soft">{reason.label}</span>
              </li>
            ))}
          </ul>

          {pathway.improvements.length > 0 && <ScoreImprovement improvements={pathway.improvements} />}

          <button
            type="button"
            onClick={onSelect}
            className={`mt-4 w-full rounded-full border py-2.5 font-display text-sm uppercase tracking-[0.12em] transition-all duration-200 ${
              selected
                ? 'border-stamp bg-stamp text-white shadow-[0_16px_28px_rgba(179,63,46,0.2)]'
                : 'border-line bg-white text-ink hover:border-stamp hover:text-stamp'
            }`}
          >
            {selected ? 'Selected for follow-up' : 'Get a personalized assessment'}
          </button>
        </div>
      )}
    </div>
  );
}
