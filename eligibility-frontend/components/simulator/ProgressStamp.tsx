interface ProgressStampProps {
  current: number;
  total: number;
}

export default function ProgressStamp({ current, total }: ProgressStampProps) {
  const pct = Math.round((current / total) * 100);

  return (
    <div className="mb-8">
      <div className="mb-3 flex items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-ink-soft">
        <span>
          Checkpoint {current} of {total}
        </span>
        <span className="rounded-full border border-line bg-white px-2 py-1 text-[9px] text-stamp">
          {pct}%
        </span>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-[#dfe8e5]">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#0e2a3d] via-[#3b6d82] to-[#b33f2e] transition-[width] duration-300 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
