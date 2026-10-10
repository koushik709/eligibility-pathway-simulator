import Link from 'next/link';

const checkpoints = [
  { label: 'Pathways assessed', value: 'Express Entry, PNP, study-to-PR, and work permits' },
  { label: 'Time required', value: 'About 3 minutes with 12 focused questions' },
  { label: 'What you get', value: 'A clear score, reasons, and actions to improve it' },
];

const snapshot = [
  'Eligibility match scan',
  'Priority pathway ranking',
  'Actionable improvement plan',
];

export default function LandingPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#edf4f2] text-ink">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-8rem] top-[-5rem] h-80 w-80 rounded-full bg-[#d7e7eb]/80 blur-3xl" />
        <div className="absolute bottom-[-6rem] right-[-4rem] h-96 w-96 rounded-full bg-[#f4d2c8]/70 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.85),_transparent_50%)]" />
      </div>

      <header className="relative mx-auto flex max-w-6xl items-center justify-between px-6 py-8 sm:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-sm font-semibold text-white shadow-lg shadow-ink/20">
            N
          </div>
          <div>
            <div className="font-display text-xl leading-none tracking-tight text-ink">Northbound</div>
            <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink-soft">Immigration</div>
          </div>
        </div>

        <span className="hidden rounded-full border border-ink/10 bg-white/60 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.3em] text-ink-soft shadow-sm sm:block">
          Pathway Simulator
        </span>
      </header>

      <section className="relative mx-auto grid max-w-6xl gap-10 px-6 pb-20 pt-8 sm:px-8 lg:grid-cols-[1.12fr_0.88fr] lg:items-center lg:gap-16">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-stamp/20 bg-stamp/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.26em] text-stamp shadow-sm">
            Eligibility Check • Canada
          </div>

          <h1 className="mt-6 max-w-xl font-display text-4xl leading-[0.98] text-ink sm:text-5xl lg:text-6xl">
            Find the right immigration pathway before the consultation starts.
          </h1>

          <p className="mt-5 max-w-xl text-base leading-7 text-ink-soft sm:text-lg">
            Answer a few simple questions about your profile and get a clear snapshot of
            where you stand across the most relevant Canadian immigration programs.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href="/simulator"
              className="inline-flex items-center justify-center rounded-full border border-stamp bg-stamp px-6 py-3 font-display text-sm uppercase tracking-[0.12em] text-white shadow-[0_18px_35px_rgba(179,63,46,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#a83326]"
            >
              Begin assessment
            </Link>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-soft">
              No account needed
            </span>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {checkpoints.map((item) => (
              <div key={item.label} className="rounded-[24px] border border-white/80 bg-white/70 p-4 shadow-[0_10px_32px_rgba(14,42,61,0.06)] backdrop-blur-sm">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-soft">{item.label}</div>
                <p className="mt-3 text-sm leading-6 text-ink">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 -z-10 rounded-[36px] bg-gradient-to-br from-[#dfeae7] via-[#f1f6f3] to-[#f7e7e0] blur-2xl" />
          <div className="rounded-[34px] border border-white/70 bg-white/65 p-5 shadow-[0_30px_80px_rgba(14,42,61,0.10)] backdrop-blur-lg sm:p-6">
            <div className="flex items-center justify-between">
              <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink-soft">
                Immigration fit
              </div>
              <div className="rounded-full border border-emerald-200 bg-emerald-50 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-emerald-700">
                Live score
              </div>
            </div>

            <div className="mt-6 flex items-center gap-4 rounded-[26px] bg-[#f4f7f6] p-4 ring-1 ring-ink/5">
              <div className="flex h-20 w-20 items-center justify-center rounded-[22px] bg-gradient-to-br from-[#0e2a3d] to-[#234c68] text-3xl font-semibold text-white shadow-lg shadow-ink/20">
                72
              </div>
              <div>
                <p className="font-display text-2xl text-ink">Strong potential</p>
                <p className="mt-1 text-sm text-ink-soft">Based on your profile summary</p>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {snapshot.map((item) => (
                <div key={item} className="flex items-center justify-between rounded-2xl border border-line bg-[#f8faf9] px-3 py-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#dfece8] text-sm text-emerald-700">
                      ✓
                    </span>
                    <span className="text-sm text-ink-soft">{item}</span>
                  </div>
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink-soft">Ready</span>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-[24px] border border-dashed border-[#cbd9d5] bg-[#f7faf8] p-4">
              <div className="mb-3 flex items-center justify-between text-[10px] uppercase tracking-[0.22em] text-ink-soft">
                <span>Program fit</span>
                <span>score</span>
              </div>

              <div className="space-y-3">
                {[
                  ['Express Entry', 81],
                  ['PNP', 74],
                  ['Study to PR', 63],
                ].map(([label, value]) => (
                  <div key={label}>
                    <div className="mb-1 flex items-center justify-between text-xs text-ink-soft">
                      <span>{label}</span>
                      <span>{value}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-[#dfe8e5]">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-[#0e2a3d] via-[#346d85] to-[#b33f2e]"
                        style={{ width: `${value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
