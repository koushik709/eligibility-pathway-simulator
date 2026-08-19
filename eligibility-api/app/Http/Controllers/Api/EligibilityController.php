<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreAssessmentRequest;
use App\Models\EligibilityAssessment;
use App\Services\Eligibility\EligibilityEngine;
use App\Services\Eligibility\QuestionRepository;
use Illuminate\Http\JsonResponse;

class EligibilityController extends Controller
{
    public function __construct(
        private readonly EligibilityEngine $engine,
        private readonly QuestionRepository $questions,
    ) {}

    /**
     * GET /api/eligibility/questions
     * Drives the frontend form so the question set stays config-driven
     * rather than hardcoded in the React app.
     */
    public function questions(): JsonResponse
    {
        return response()->json([
            'data' => $this->questions->all(),
        ]);
    }

    /**
     * POST /api/eligibility/calculate
     * Scores the submitted profile against every configured pathway and
     * persists the result so a later lead-capture step can reference it.
     */
    public function calculate(StoreAssessmentRequest $request): JsonResponse
    {
        $profile = $request->validated();

        $result = $this->engine->calculate($profile);

        $assessment = EligibilityAssessment::create([
            'profile' => $profile,
            'results' => $result['pathways'],
            'rule_version' => $result['rule_version'],
            'calculated_at' => $result['calculated_at'],
        ]);

        return response()->json([
            'data' => [
                'assessment_id' => $assessment->id,
                'rule_version' => $result['rule_version'],
                'calculated_at' => $result['calculated_at'],
                'pathways' => $result['pathways'],
            ],
        ], 201);
    }
}
