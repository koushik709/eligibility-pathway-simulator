import type { CalculateResponse, ProfileAnswers, Question } from './types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000/api';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...options?.headers,
    },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.message ?? `Request to ${path} failed with ${res.status}`);
  }

  return res.json();
}

export function fetchQuestions(): Promise<{ data: Question[] }> {
  return request('/eligibility/questions');
}

export function submitAssessment(profile: ProfileAnswers): Promise<CalculateResponse> {
  return request('/eligibility/calculate', {
    method: 'POST',
    body: JSON.stringify(profile),
  });
}

export function submitLead(payload: {
  assessment_id: string;
  name: string;
  email: string;
  phone?: string;
  selected_pathway: string;
  consent: boolean;
}): Promise<{ data: { lead_id: string; lead_temperature: string } }> {
  return request('/eligibility/leads', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
