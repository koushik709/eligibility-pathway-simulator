'use client';

import { useEffect, useState } from 'react';
import { fetchQuestions, submitAssessment } from '@/lib/api';
import type { CalculateResponse, ProfileAnswers, Question } from '@/lib/types';
import ProgressStamp from '@/components/simulator/ProgressStamp';
import QuestionStep from '@/components/simulator/QuestionStep';
import ResultsScreen from '@/components/simulator/ResultsScreen';

type LoadState = 'loading' | 'ready' | 'error';

export default function SimulatorPage() {
  const [loadState, setLoadState] = useState<LoadState>('loading');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<ProfileAnswers>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [result, setResult] = useState<CalculateResponse['data'] | null>(null);

  useEffect(() => {
    fetchQuestions()
      .then((res) => {
        setQuestions(res.data);
        setLoadState('ready');
      })
      .catch(() => setLoadState('error'));
  }, []);

  function updateAnswer(key: string, value: string | number | boolean) {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  }

  function reset() {
    setResult(null);
    setStepIndex(0);
    setAnswers({});
  }

  const currentQuestion = questions[stepIndex];
  const currentValue = currentQuestion ? answers[currentQuestion.key] : undefined;
  const canAdvance =
    !currentQuestion?.required ||
    (currentValue !== undefined && currentValue !== '');

  async function handleNext() {
    if (stepIndex < questions.length - 1) {
      setStepIndex((i) => i + 1);
      return;
    }

    setSubmitting(true);
    setSubmitError(null);
    try {
      const payload: ProfileAnswers = {
        ...answers,
        language_clb:
          typeof answers.language_clb === 'string' ? Number(answers.language_clb) : answers.language_clb,
      };
      const res = await submitAssessment(payload);
      setResult(res.data);
    } catch {
      setSubmitError('We could not calculate your results. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  function handleBack() {
    setStepIndex((i) => Math.max(0, i - 1));
  }

  if (loadState === 'loading') {
    return <CenteredMessage text="Loading your assessment…" />;
  }

  if (loadState === 'error') {
    return (
      <CenteredMessage text="We couldn't reach the assessment service. Confirm the API is running and NEXT_PUBLIC_API_URL is set." />
    );
  }

  if (result) {
    return (
      <main className="min-h-screen bg-[#edf3f1]">
        <ResultsScreen result={result} onRestart={reset} />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.8),_rgba(237,243,241,0.96)_40%,_rgba(227,236,234,1)_100%)] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-[32px] border border-white/70 bg-white/70 p-4 shadow-[0_30px_80px_rgba(14,42,61,0.09)] backdrop-blur-xl sm:p-6 lg:p-8">
          <div className="rounded-[28px] border border-[#edf1ef] bg-[#f8fbfa] p-4 sm:p-6">
            <ProgressStamp current={stepIndex + 1} total={questions.length} />

            {currentQuestion && (
              <QuestionStep
                question={currentQuestion}
                value={currentValue}
                onChange={(value) => updateAnswer(currentQuestion.key, value)}
              />
            )}

            {submitError && <p className="mt-4 text-sm text-[#a6472c]">{submitError}</p>}

            <div className="mt-10 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={handleBack}
                disabled={stepIndex === 0}
                className="font-mono text-[10px] uppercase tracking-[0.26em] text-ink-soft underline decoration-line underline-offset-4 transition-colors hover:text-ink disabled:opacity-0"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleNext}
                disabled={!canAdvance || submitting}
                className="inline-flex items-center justify-center rounded-full border border-stamp bg-stamp px-7 py-3 font-display text-sm uppercase tracking-[0.12em] text-white shadow-[0_18px_35px_rgba(179,63,46,0.26)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#a83326] disabled:cursor-not-allowed disabled:opacity-40"
              >
                {submitting
                  ? 'Calculating…'
                  : stepIndex === questions.length - 1
                    ? 'See my results'
                    : 'Continue →'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function CenteredMessage({ text }: { text: string }) {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="rounded-[30px] border border-white/70 bg-white/60 px-7 py-5 text-center shadow-[0_18px_50px_rgba(14,42,61,0.07)] backdrop-blur-md">
        <p className="max-w-md text-base text-ink-soft">{text}</p>
      </div>
    </main>
  );
}
