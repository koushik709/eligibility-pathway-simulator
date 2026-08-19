interface ProgressStampProps {
  current: number;
  total: number;
}

export default function ProgressStamp({ current, total }: ProgressStampProps) {
  const pct = Math.round((current / total) * 100);

  return (
    <div className="mb-10">
      <div className="mb-2 flex items-baseline justify-between font-mono text-xs uppercase tracking-widest text-ink-soft">
        <span>
          Checkpoint {current} of {total}
        </span>
        <span>{pct}%</span>
      </div>
      <div className="h-1.5 w-full bg-line">
        <div
          className="h-1.5 bg-stamp transition-[width] duration-300 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
