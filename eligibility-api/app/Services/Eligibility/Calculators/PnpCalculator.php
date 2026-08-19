<?php

namespace App\Services\Eligibility\Calculators;

/**
 * Provincial Nominee Program is really 80+ distinct streams across 11
 * provinces/territories, each with its own criteria. Modelling all of them
 * is out of scope for this MVP calculator - this produces a directional
 * 0-100 "likelihood" estimate based on the general factors PNP streams
 * tend to reward (work experience, language, connection signals), not a
 * literal points grid. Treat this as a placeholder to replace stream-by-
 * stream once Phase 2+ prioritizes specific provinces.
 */
class PnpCalculator implements CalculatorInterface
{
    private const MAX_SCORE = 100;

    public function calculate(array $profile): array
    {
        $experience = (int) ($profile['years_experience'] ?? 0);
        $canadianExperience = (int) ($profile['canadian_experience_years'] ?? 0);
        $clb = (int) ($profile['language_clb'] ?? 0);
        $jobOffer = (bool) ($profile['job_offer'] ?? false);
        $education = (string) ($profile['education_level'] ?? '');

        $score = 0;
        $score += min($experience, 8) * 4;
        $score += min($canadianExperience, 5) * 6;
        $score += min($clb, 10) * 3;
        $score += $jobOffer ? 20 : 0;
        $score += in_array($education, ['bachelor', 'master', 'phd'], true) ? 12 : 0;

        $score = (int) min($score, self::MAX_SCORE);

        $reasons = [
            $this->reason($canadianExperience >= 1, 'Canadian work experience strengthens most PNP streams', 'No Canadian work experience recorded'),
            $this->reason($jobOffer, 'A valid job offer unlocks several employer-driven streams', 'No job offer to anchor an employer-driven stream'),
            $this->reason($clb >= 7, 'Language score clears most stream minimums', 'Language score may fall below common stream minimums'),
        ];

        $improvements = [];
        if (! $jobOffer) {
            $improvements[] = ['label' => 'Secure a job offer in a province with a matching stream', 'potential_points' => 20];
        }
        if ($canadianExperience < 1) {
            $improvements[] = ['label' => 'Gain Canadian work experience to unlock more streams', 'potential_points' => 6];
        }
        if ($clb < 9) {
            $improvements[] = ['label' => 'Raise language score to CLB 9', 'potential_points' => 3];
        }

        return [
            'score' => $score,
            'max_score' => self::MAX_SCORE,
            'status' => $this->status($score),
            'reasons' => $reasons,
            'improvements' => $improvements,
        ];
    }

    private function reason(bool $condition, string $positive, string $negative): array
    {
        return ['type' => $condition ? 'positive' : 'warning', 'label' => $condition ? $positive : $negative];
    }

    private function status(int $score): string
    {
        return match (true) {
            $score >= 75 => 'excellent',
            $score >= 55 => 'strong',
            $score >= 35 => 'moderate',
            default => 'limited',
        };
    }
}
