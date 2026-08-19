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

    // Last question -> submit.
    setSubmitting(true);
    setSubmitError(null);
    try {
      const payload: ProfileAnswers = {
        ...answers,
        // language_clb comes through the form as a string select value.
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
    return <CenteredMessage text="Loading your assessment\u2026" />;
  }

  if (loadState === 'error') {
    return (
      <CenteredMessage text="We couldn't reach the assessment service. Confirm the API is running and NEXT_PUBLIC_API_URL is set." />
    );
  }

  if (result) {
    return (
      <main className="min-h-screen">
        <ResultsScreen result={result} onRestart={reset} />
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-xl px-6 py-16">
        <ProgressStamp current={stepIndex + 1} total={questions.length} />

        {currentQuestion && (
          <QuestionStep
            question={currentQuestion}
            value={currentValue}
            onChange={(value) => updateAnswer(currentQuestion.key, value)}
          />
        )}

        {submitError && <p className="mt-4 text-sm text-status-limited">{submitError}</p>}

        <div className="mt-10 flex items-center justify-between">
          <button
            type="button"
            onClick={handleBack}
            disabled={stepIndex === 0}
            className="font-mono text-xs uppercase tracking-widest text-ink-soft underline decoration-line underline-offset-4 disabled:opacity-0"
          >
            Back
          </button>
          <button
            type="button"
            onClick={handleNext}
            disabled={!canAdvance || submitting}
            className="border-2 border-stamp bg-stamp px-8 py-3 font-display text-sm uppercase tracking-wide text-paper transition-colors hover:bg-transparent hover:text-stamp disabled:cursor-not-allowed disabled:opacity-40"
          >
            {submitting
              ? 'Calculating\u2026'
              : stepIndex === questions.length - 1
                ? 'See my results'
                : 'Continue \u2192'}
          </button>
        </div>
      </div>
    </main>
  );
}

function CenteredMessage({ text }: { text: string }) {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <p className="max-w-sm text-center text-ink-soft">{text}</p>
    </main>
  );
}
