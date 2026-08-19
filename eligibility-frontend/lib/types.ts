export type QuestionType = 'number' | 'text' | 'select' | 'boolean';

export interface QuestionOption {
  value: string;
  label: string;
}

export interface Question {
  key: string;
  order: number;
  type: QuestionType;
  label: string;
  required: boolean;
  min?: number;
  max?: number;
  options?: QuestionOption[];
}

export type PathwayStatus = 'excellent' | 'strong' | 'moderate' | 'limited';

export interface Reason {
  type: 'positive' | 'warning';
  label: string;
  factor?: string;
}

export interface Improvement {
  label: string;
  potential_points: number;
}

export interface PathwayResult {
  key: string;
  label: string;
  score: number;
  max_score: number;
  status: PathwayStatus;
  reasons: Reason[];
  improvements: Improvement[];
}

export interface CalculateResponse {
  data: {
    assessment_id: string;
    rule_version: string;
    calculated_at: string;
    pathways: PathwayResult[];
  };
}

export type ProfileAnswers = Record<string, string | number | boolean | undefined>;
