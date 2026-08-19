<?php

namespace App\Services\Eligibility\Calculators;

/**
 * Simplified, CRS-inspired scoring for Express Entry.
 *
 * IMPORTANT: the point bands below are illustrative approximations for a
 * product demo. They must be reviewed and signed off by your immigration/
 * legal team against the current, official CRS grid before this is used
 * to advise real applicants. See README "Compliance" section.
 */
class ExpressEntryCalculator implements CalculatorInterface
{
    private const MAX_SCORE = 1200;

    public function calculate(array $profile): array
    {
        $age = (int) ($profile['age'] ?? 0);
        $education = (string) ($profile['education_level'] ?? '');
        $clb = (int) ($profile['language_clb'] ?? 0);
        $canadianExperience = (int) ($profile['canadian_experience_years'] ?? 0);
        $foreignExperience = max(0, (int) ($profile['years_experience'] ?? 0) - $canadianExperience);
        $canadianEducation = (bool) ($profile['canadian_education'] ?? false);
        $provincialNomination = (bool) ($profile['provincial_nomination'] ?? false);
        $jobOffer = (bool) ($profile['job_offer'] ?? false);

        $agePoints = $this->agePoints($age);
        $educationPoints = $this->educationPoints($education);
        $languagePoints = $this->languagePoints($clb);
        $canadianExpPoints = $this->cappedTable($canadianExperience, [0, 35, 46, 56, 63, 70], cap: 5);
        $foreignExpPoints = $this->cappedTable($foreignExperience, [0, 13, 25], cap: 2);
        $canadianEducationPoints = $canadianEducation ? 30 : 0;
        $jobOfferPoints = $jobOffer ? 50 : 0;
        $provincialNominationPoints = $provincialNomination ? 600 : 0;

        $score = $agePoints + $educationPoints + $languagePoints + $canadianExpPoints
            + $foreignExpPoints + $canadianEducationPoints + $jobOfferPoints + $provincialNominationPoints;

        $score = min($score, self::MAX_SCORE);

        $reasons = [];
        $reasons[] = $this->reason($languagePoints >= 124, 'Strong language score', 'Language score is limiting your points', 'language');
        $reasons[] = $this->reason($foreignExperience + $canadianExperience >= 3, 'Solid skilled work experience', 'Limited skilled work experience on record', 'experience');
        $reasons[] = $this->reason(in_array($education, ['bachelor', 'master', 'phd'], true), 'Post-secondary education credential', 'No post-secondary credential on record', 'education');
        $reasons[] = $this->reason($provincialNomination, 'Provincial nomination secured', 'No provincial nomination', 'nomination');
        $reasons[] = $this->reason($age >= 18 && $age <= 35, 'Age is in the strongest scoring band', 'Age band is reducing your core points', 'age');

        $improvements = [];

        if (! $provincialNomination) {
            $improvements[] = [
                'label' => 'Obtain a provincial nomination',
                'potential_points' => 600,
            ];
        }

        if ($clb < 9) {
            $nextClb = min($clb + 1, 10);
            $delta = $this->languagePoints($nextClb) - $languagePoints;
            if ($delta > 0) {
                $improvements[] = [
                    'label' => 'Raise your language score to CLB '.$nextClb,
                    'potential_points' => $delta,
                ];
            }
        }

        if (! $canadianEducation) {
            $improvements[] = [
                'label' => 'Complete a credential at a Canadian institution',
                'potential_points' => 30,
            ];
        }

        if ($canadianExperience < 5) {
            $delta = $this->cappedTable($canadianExperience + 1, [0, 35, 46, 56, 63, 70], cap: 5) - $canadianExpPoints;
            if ($delta > 0) {
                $improvements[] = [
                    'label' => 'Gain 1 additional year of Canadian work experience',
                    'potential_points' => $delta,
                ];
            }
        }

        if (! $jobOffer) {
            $improvements[] = [
                'label' => 'Secure a valid, LMIA-supported Canadian job offer',
                'potential_points' => 50,
            ];
        }

        return [
            'score' => $score,
            'max_score' => self::MAX_SCORE,
            'status' => $this->status($score),
            'reasons' => array_values($reasons),
            'improvements' => array_values($improvements),
        ];
    }

    private function agePoints(int $age): int
    {
        if ($age < 18 || $age > 45) {
            return 0;
        }
        if ($age <= 35) {
            return 110;
        }

        // Linear falloff from 110 at 35 to 0 at 45.
        return (int) max(0, round(110 - (($age - 35) * 11)));
    }

    private function educationPoints(string $level): int
    {
        return match ($level) {
            'high_school' => 30,
            'diploma' => 84,
            'bachelor' => 120,
            'master' => 128,
            'phd' => 140,
            default => 0,
        };
    }

    private function languagePoints(int $clb): int
    {
        return match (true) {
            $clb >= 10 => 160,
            $clb === 9 => 150,
            $clb === 8 => 136,
            $clb === 7 => 124,
            $clb === 6 => 68,
            $clb === 5 => 34,
            default => 0,
        };
    }

    /**
     * Small helper for "years -> points" tables that plateau after $cap.
     *
     * @param  int[]  $table  Points indexed by year, index 0..cap.
     */
    private function cappedTable(int $years, array $table, int $cap): int
    {
        $years = max(0, min($years, $cap));

        return $table[$years] ?? end($table);
    }

    private function reason(bool $condition, string $positiveLabel, string $negativeLabel, string $factor): array
    {
        return [
            'type' => $condition ? 'positive' : 'warning',
            'factor' => $factor,
            'label' => $condition ? $positiveLabel : $negativeLabel,
        ];
    }

    private function status(int $score): string
    {
        return match (true) {
            $score >= 470 => 'excellent',
            $score >= 350 => 'strong',
            $score >= 250 => 'moderate',
            default => 'limited',
        };
    }
}
