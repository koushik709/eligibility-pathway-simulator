<?php

namespace App\Services\Eligibility;

class QuestionRepository
{
    /**
     * Ordered list of question definitions for the frontend to render.
     *
     * Phase 7 note: swap this method's body to read from the
     * eligibility_questions / eligibility_options tables once the admin
     * panel ships. Every caller only depends on this method's return
     * shape, not on where the data comes from.
     */
    public function all(): array
    {
        $questions = collect(config('eligibility.questions'))
            ->sortBy('order')
            ->values();

        return $questions->all();
    }

    public function requiredKeys(): array
    {
        return collect($this->all())
            ->where('required', true)
            ->pluck('key')
            ->all();
    }
}
