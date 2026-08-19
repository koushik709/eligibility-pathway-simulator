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
    <div className={`bg-paper ${selected ? 'ring-2 ring-stamp' : ''}`}>
      <div className="flex items-center justify-between gap-4 px-5 py-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="truncate font-display text-lg text-ink">{pathway.label}</h3>
            {isTopMatch && (
              <span className="flex-shrink-0 font-mono text-[10px] uppercase tracking-widest text-stamp">
                Best Match
              </span>
            )}
          </div>
          <div className="mt-2 h-1.5 w-full max-w-xs bg-line">
            <div className={`h-1.5 ${STATUS_CLASS[pathway.status]}`} style={{ width: `${pct}%` }} />
          </div>
        </div>

        <div className="flex flex-shrink-0 items-center gap-4">
          <div className="text-right">
            <div className="font-mono text-2xl leading-none text-ink">{pct}</div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-ink-soft">
              {STATUS_LABEL[pathway.status]}
            </div>
          </div>
          <button
            type="button"
            onClick={() => setExpanded((e) => !e)}
            className="font-mono text-xs uppercase tracking-widest text-ink-soft underline decoration-line underline-offset-4 hover:text-ink"
          >
            {expanded ? 'Hide' : 'Why'}
          </button>
        </div>
      </div>

      {expanded && (
        <div className="tear-edge border-t border-dashed border-line px-5 pb-5 pt-4">
          <ul className="mb-4 space-y-1.5 text-sm">
            {pathway.reasons.map((reason, i) => (
              <li key={i} className="flex gap-2">
                <span className={reason.type === 'positive' ? 'text-status-excellent' : 'text-status-moderate'}>
                  {reason.type === 'positive' ? '\u2713' : '\u26A0'}
                </span>
                <span className="text-ink-soft">{reason.label}</span>
              </li>
            ))}
          </ul>

          {pathway.improvements.length > 0 && <ScoreImprovement improvements={pathway.improvements} />}

          <button
            type="button"
            onClick={onSelect}
            className={`mt-4 w-full border-2 py-2.5 font-display text-sm uppercase tracking-wide transition-colors ${
              selected
                ? 'border-stamp bg-stamp text-paper'
                : 'border-ink text-ink hover:border-stamp hover:text-stamp'
            }`}
          >
            {selected ? 'Selected for follow-up' : 'Get a personalized assessment'}
          </button>
        </div>
      )}
    </div>
  );
}
