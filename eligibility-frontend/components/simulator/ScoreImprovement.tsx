import type { Improvement } from '@/lib/types';

interface ScoreImprovementProps {
  improvements: Improvement[];
}

export default function ScoreImprovement({ improvements }: ScoreImprovementProps) {
  return (
    <div className="border-t border-line pt-4">
      <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-ink-soft">
        Potential improvements
      </p>
      <ul className="space-y-2">
        {improvements.map((item, i) => (
          <li key={i} className="flex items-center justify-between gap-4 text-sm">
            <span className="text-ink">{item.label}</span>
            <span className="flex-shrink-0 font-mono text-status-excellent">
              +{item.potential_points}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
