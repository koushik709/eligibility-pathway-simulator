<?php

namespace App\Services\Eligibility\Calculators;

interface CalculatorInterface
{
    /**
     * Score a validated profile against this pathway's rules.
     *
     * @param  array  $profile  Validated answers, keyed by question key.
     * @return array{
     *     score: int,
     *     max_score: int,
     *     status: string,
     *     reasons: array<int, array{type: string, label: string}>,
     *     improvements: array<int, array{label: string, potential_points: int}>
     * }
     */
    public function calculate(array $profile): array;
}
