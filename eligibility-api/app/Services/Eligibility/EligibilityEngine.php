<?php

namespace App\Services\Eligibility;

class EligibilityEngine
{
    /**
     * Run a validated profile against every configured pathway.
     *
     * @param  array  $profile  Validated answers, keyed by question key.
     * @return array{
     *     rule_version: string,
     *     calculated_at: string,
     *     pathways: array<string, array>
     * }
     */
    public function calculate(array $profile): array
    {
        $results = [];

        foreach (config('eligibility.pathways') as $key => $pathway) {
            /** @var \App\Services\Eligibility\Calculators\CalculatorInterface $calculator */
            $calculator = app($pathway['calculator']);

            $results[$key] = array_merge(
                ['key' => $key, 'label' => $pathway['label']],
                $calculator->calculate($profile)
            );
        }

        // Best-first ordering makes the "Explore My Best Pathway" CTA trivial
        // on the frontend: results[0] is always the strongest match.
        uasort($results, fn ($a, $b) => ($b['score'] / max($b['max_score'], 1)) <=> ($a['score'] / max($a['max_score'], 1)));

        return [
            'rule_version' => config('eligibility.rule_version'),
            'calculated_at' => now()->toIso8601String(),
            'pathways' => array_values($results),
        ];
    }
}
