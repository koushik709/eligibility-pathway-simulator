<?php

namespace App\Services\Eligibility\Calculators;

/**
 * Directional estimate for an employer-driven (LMIA or LMIA-exempt) work
 * permit. Job offer dominates this pathway in practice, so it carries most
 * of the weight here.
 */
class WorkPermitCalculator implements CalculatorInterface
{
    private const MAX_SCORE = 100;

    public function calculate(array $profile): array
    {
        $jobOffer = (bool) ($profile['job_offer'] ?? false);
        $experience = (int) ($profile['years_experience'] ?? 0);
        $education = (string) ($profile['education_level'] ?? '');

        $score = 0;
        $score += $jobOffer ? 55 : 5;
        $score += min($experience, 10) * 3;
        $score += in_array($education, ['diploma', 'bachelor', 'master', 'phd'], true) ? 15 : 5;

        $score = (int) min($score, self::MAX_SCORE);

        $reasons = [
            $this->reason($jobOffer, 'A job offer is the single biggest driver for this pathway', 'No job offer on record, this pathway is hard to pursue without one'),
            $this->reason($experience >= 2, 'Work experience supports most occupation-specific requirements', 'Limited work experience may narrow eligible occupations'),
        ];

        $improvements = [];
        if (! $jobOffer) {
            $improvements[] = ['label' => 'Secure a Canadian employer willing to extend an offer', 'potential_points' => 50];
        }
        if ($experience < 5) {
            $improvements[] = ['label' => 'Gain additional years of experience in your occupation', 'potential_points' => 3];
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
