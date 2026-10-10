import type { Question } from '@/lib/types';

interface QuestionStepProps {
  question: Question;
  value: string | number | boolean | undefined;
  onChange: (value: string | number | boolean) => void;
}

export default function QuestionStep({ question, value, onChange }: QuestionStepProps) {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink-soft">Question</p>
        <span className="rounded-full border border-line bg-white px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-ink-soft">
          {question.type}
        </span>
      </div>

      <h2 className="mb-7 max-w-xl font-display text-2xl leading-snug text-ink sm:text-3xl">
        {question.label}
      </h2>

      {question.type === 'number' && (
        <div className="max-w-xs rounded-[26px] border border-line bg-white p-4 shadow-[0_18px_50px_rgba(14,42,61,0.04)]">
          <input
            type="number"
            autoFocus
            min={question.min}
            max={question.max}
            value={typeof value === 'number' ? value : ''}
            onChange={(e) => onChange(e.target.value === '' ? '' : Number(e.target.value))}
            className="w-full border-b border-line bg-transparent px-1 pb-2 font-mono text-4xl text-ink outline-none transition-colors focus:border-stamp"
            placeholder="0"
          />
        </div>
      )}

      {question.type === 'text' && (
        <div className="max-w-xl rounded-[26px] border border-line bg-white p-4 shadow-[0_18px_50px_rgba(14,42,61,0.04)]">
          <input
            type="text"
            autoFocus
            value={typeof value === 'string' ? value : ''}
            onChange={(e) => onChange(e.target.value)}
            className="w-full border-b border-line bg-transparent px-1 pb-2 text-lg text-ink outline-none transition-colors focus:border-stamp"
            placeholder="Type your answer"
          />
        </div>
      )}

      {question.type === 'select' && (
        <div className="grid gap-3">
          {question.options?.map((option) => {
            const selected = String(value) === option.value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => onChange(option.value)}
                className={`flex items-center gap-3 rounded-[22px] border px-4 py-3.5 text-left transition-all duration-200 ${
                  selected
                    ? 'border-stamp bg-stamp/5 text-ink shadow-[0_12px_24px_rgba(179,63,46,0.08)]'
                    : 'border-line bg-white text-ink-soft hover:border-ink-soft hover:bg-[#f8faf9]'
                }`}
              >
                <span
                  className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 ${
                    selected ? 'border-stamp bg-stamp/10' : 'border-line bg-transparent'
                  }`}
                >
                  {selected && <span className="h-2.5 w-2.5 rounded-full bg-stamp" />}
                </span>
                <span className="text-base leading-6">{option.label}</span>
              </button>
            );
          })}
        </div>
      )}

      {question.type === 'boolean' && (
        <div className="flex flex-wrap gap-3">
          {[
            { label: 'Yes', val: true },
            { label: 'No', val: false },
          ].map((opt) => {
            const selected = value === opt.val;
            return (
              <button
                key={opt.label}
                type="button"
                onClick={() => onChange(opt.val)}
                className={`rounded-full border px-8 py-3 font-display text-sm uppercase tracking-[0.12em] transition-all duration-200 ${
                  selected
                    ? 'border-stamp bg-stamp text-white shadow-[0_16px_30px_rgba(179,63,46,0.25)]'
                    : 'border-line bg-white text-ink-soft hover:border-ink-soft hover:bg-[#f8faf9]'
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
