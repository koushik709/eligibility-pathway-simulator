<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreLeadRequest;
use App\Models\EligibilityAssessment;
use App\Models\EligibilityLead;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Notification;

class LeadController extends Controller
{
    /**
     * POST /api/eligibility/leads
     * Turns "someone visited the site" into a qualified, scored lead the
     * sales/consultation team can triage by lead_temperature.
     */
    public function store(StoreLeadRequest $request): JsonResponse
    {
        $data = $request->validated();

        $assessment = EligibilityAssessment::findOrFail($data['assessment_id']);

        $pathwayResult = collect($assessment->results)
            ->firstWhere('key', $data['selected_pathway']);

        $temperature = $pathwayResult
            ? EligibilityLead::temperatureFor($pathwayResult['score'], $pathwayResult['max_score'])
            : 'MEDIUM';

        $lead = EligibilityLead::create([
            'assessment_id' => $assessment->id,
            'name' => $data['name'],
            'email' => $data['email'],
            'phone' => $data['phone'] ?? null,
            'selected_pathway' => $data['selected_pathway'],
            'lead_temperature' => $temperature,
            'consent_at' => now(),
        ]);

        // Hook your CRM integration here, e.g.:
        // Notification::route('crm', $lead)->notify(new NewImmigrationLead($lead, $assessment));

        return response()->json([
            'data' => [
                'lead_id' => $lead->id,
                'lead_temperature' => $lead->lead_temperature,
            ],
        ], 201);
    }
}
