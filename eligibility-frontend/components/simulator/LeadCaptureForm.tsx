'use client';

import { useState, type FormEvent } from 'react';
import { submitLead } from '@/lib/api';

interface LeadCaptureFormProps {
  assessmentId: string;
  selectedPathwayKey: string;
  selectedPathwayLabel: string;
}

export default function LeadCaptureForm({
  assessmentId,
  selectedPathwayKey,
  selectedPathwayLabel,
}: LeadCaptureFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'done' | 'error'>('idle');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus('submitting');
    try {
      await submitLead({
        assessment_id: assessmentId,
        name,
        email,
        phone: phone || undefined,
        selected_pathway: selectedPathwayKey,
        consent,
      });
      setStatus('done');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'done') {
    return (
      <div className="border-2 border-status-excellent bg-status-excellent/5 px-6 py-8 text-center">
        <p className="font-display text-xl text-ink">Request received.</p>
        <p className="mt-2 text-sm text-ink-soft">
          An immigration specialist will review your {selectedPathwayLabel} profile and reach out.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} id="lead-form" className="border-2 border-ink bg-paper p-6">
      <p className="mb-1 font-mono text-[10px] uppercase tracking-widest text-stamp">
        Selected pathway: {selectedPathwayLabel}
      </p>
      <h3 className="mb-5 font-display text-xl text-ink">
        Want a specialist to review your pathway?
      </h3>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1 block text-ink-soft">Full name</span>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border-b-2 border-line bg-transparent py-2 outline-none focus:border-stamp"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-ink-soft">Email</span>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border-b-2 border-line bg-transparent py-2 outline-none focus:border-stamp"
          />
        </label>
        <label className="block text-sm sm:col-span-2">
          <span className="mb-1 block text-ink-soft">Phone (optional)</span>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border-b-2 border-line bg-transparent py-2 outline-none focus:border-stamp"
          />
        </label>
      </div>

      <label className="mt-5 flex items-start gap-2 text-xs text-ink-soft">
        <input
          required
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5"
        />
        I consent to be contacted about my immigration options based on the answers I provided.
      </label>

      {status === 'error' && (
        <p className="mt-3 text-sm text-status-limited">
          Something went wrong sending this. Please try again.
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="mt-5 w-full border-2 border-stamp bg-stamp py-3 font-display text-sm uppercase tracking-wide text-paper transition-colors hover:bg-transparent hover:text-stamp disabled:opacity-60"
      >
        {status === 'submitting' ? 'Sending\u2026' : 'Get a personalized assessment'}
      </button>
    </form>
  );
}
