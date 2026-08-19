import type { Question } from '@/lib/types';

interface QuestionStepProps {
  question: Question;
  value: string | number | boolean | undefined;
  onChange: (value: string | number | boolean) => void;
}

export default function QuestionStep({ question, value, onChange }: QuestionStepProps) {
  return (
    <div>
      <h2 className="mb-6 max-w-lg font-display text-2xl leading-snug text-ink sm:text-3xl">
        {question.label}
      </h2>

      {question.type === 'number' && (
        <input
          type="number"
          autoFocus
          min={question.min}
          max={question.max}
          value={typeof value === 'number' ? value : ''}
          onChange={(e) => onChange(e.target.value === '' ? '' : Number(e.target.value))}
          className="w-40 border-b-2 border-line bg-transparent px-1 py-2 font-mono text-3xl text-ink outline-none focus:border-stamp"
          placeholder="0"
        />
      )}

      {question.type === 'text' && (
        <input
          type="text"
          autoFocus
          value={typeof value === 'string' ? value : ''}
          onChange={(e) => onChange(e.target.value)}
          className="w-full max-w-sm border-b-2 border-line bg-transparent px-1 py-2 text-xl text-ink outline-none focus:border-stamp"
          placeholder="Type your answer"
        />
      )}

      {question.type === 'select' && (
        <div className="flex flex-col gap-2">
          {question.options?.map((option) => {
            const selected = String(value) === option.value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => onChange(option.value)}
                className={`flex items-center gap-3 border px-4 py-3 text-left transition-colors ${
                  selected
                    ? 'border-stamp bg-stamp/5 text-ink'
                    : 'border-line text-ink-soft hover:border-ink-soft'
                }`}
              >
                <span
                  className={`flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full border-2 ${
                    selected ? 'border-stamp' : 'border-line'
                  }`}
                >
                  {selected && <span className="h-2 w-2 rounded-full bg-stamp" />}
                </span>
                {option.label}
              </button>
            );
          })}
        </div>
      )}

      {question.type === 'boolean' && (
        <div className="flex gap-3">
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
                className={`border-2 px-8 py-3 font-display text-sm uppercase tracking-wide transition-colors ${
                  selected
                    ? 'border-stamp bg-stamp text-paper'
                    : 'border-line text-ink-soft hover:border-ink-soft'
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
