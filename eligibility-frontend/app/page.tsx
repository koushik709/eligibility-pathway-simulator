import Link from 'next/link';

const checkpoints = [
  { label: 'PATHWAYS ASSESSED', value: 'Express Entry, PNP, Study \u2192 PR, Work Permit' },
  { label: 'TIME REQUIRED', value: 'About 3 minutes, 12 questions' },
  { label: 'WHAT YOU GET', value: 'A score, the reasons behind it, and how to raise it' },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      <header className="mx-auto flex max-w-5xl items-center justify-between px-6 py-8">
        <span className="font-display text-lg tracking-tight">Northbound Immigration</span>
        <span className="hidden font-mono text-xs uppercase tracking-widest text-ink-soft sm:block">
          Pathway Simulator
        </span>
      </header>

      <section className="mx-auto grid max-w-5xl gap-12 px-6 pb-24 pt-8 md:grid-cols-[1.1fr_0.9fr] md:items-center">
        <div>
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-stamp">
            Eligibility Check &middot; Canada
          </p>
          <h1 className="max-w-xl font-display text-4xl leading-[1.1] text-ink sm:text-5xl">
            Find your immigration pathway before you book a consultation.
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-ink-soft">
            Answer 12 questions about your profile. We&apos;ll score you against four
            pathways, explain what&apos;s driving each score, and show exactly what
            would move the number.
          </p>
          <div className="mt-8 flex items-center gap-4">
            <Link
              href="/simulator"
              className="inline-flex items-center gap-2 border-2 border-stamp bg-stamp px-6 py-3 font-display text-sm uppercase tracking-wide text-paper transition-colors hover:bg-transparent hover:text-stamp"
            >
              Begin Assessment
            </Link>
            <span className="font-mono text-xs text-ink-soft">No account needed</span>
          </div>

          <dl className="mt-14 space-y-4 border-t border-line pt-6">
            {checkpoints.map((item) => (
              <div key={item.label} className="grid grid-cols-[160px_1fr] gap-4 text-sm">
                <dt className="font-mono text-xs uppercase tracking-wider text-ink-soft">{item.label}</dt>
                <dd className="text-ink">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="flex justify-center md:justify-end">
          <div
            className="relative flex h-56 w-56 -rotate-6 select-none items-center justify-center rounded-full border-[3px] border-dashed border-stamp/70 text-center"
            aria-hidden="true"
          >
            <div className="flex h-44 w-44 flex-col items-center justify-center rounded-full border-2 border-stamp text-stamp">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Eligibility</span>
              <span className="mt-2 font-display text-4xl">?/100</span>
              <span className="mt-2 font-mono text-[10px] uppercase tracking-[0.3em]">Your Score</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
