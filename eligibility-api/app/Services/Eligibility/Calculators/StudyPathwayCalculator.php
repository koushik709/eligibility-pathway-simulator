<?php

namespace App\Services\Eligibility\Calculators;

/**
 * Directional estimate for a study -> post-graduation work permit -> PR
 * pathway. Simplified placeholder pending Phase 2 modelling of DLI/program
 * length rules against PGWP eligibility.
 */
class StudyPathwayCalculator implements CalculatorInterface
{
    private const MAX_SCORE = 100;

    public function calculate(array $profile): array
    {
        $age = (int) ($profile['age'] ?? 0);
        $education = (string) ($profile['education_level'] ?? '');
        $canadianEducation = (bool) ($profile['canadian_education'] ?? false);
        $clb = (int) ($profile['language_clb'] ?? 0);

        $score = 0;
        $score += $age <= 30 ? 30 : max(0, 30 - ($age - 30) * 3);
        $score += $canadianEducation ? 35 : 10;
        $score += min($clb, 10) * 3;
        $score += in_array($education, ['bachelor', 'master', 'phd'], true) ? 15 : 5;

        $score = (int) min($score, self::MAX_SCORE);

        $reasons = [
            $this->reason($canadianEducation, 'A Canadian credential is the strongest signal for this pathway', 'No Canadian study credential yet'),
            $this->reason($age <= 30, 'Age band favors a multi-year study-to-PR runway', 'Fewer years to complete a study-to-PR runway'),
            $this->reason($clb >= 7, 'Language score supports post-graduation options', 'Language score may limit post-graduation program options'),
        ];

        $improvements = [];
        if (! $canadianEducation) {
            $improvements[] = ['label' => 'Enroll in a Designated Learning Institution program', 'potential_points' => 25];
        }
        if ($clb < 9) {
            $improvements[] = ['label' => 'Raise language score to CLB 9 for stronger PGWP-to-PR options', 'potential_points' => 3];
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
