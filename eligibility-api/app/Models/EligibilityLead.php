<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class EligibilityLead extends Model
{
    use HasUuids;

    protected $fillable = [
        'assessment_id',
        'name',
        'email',
        'phone',
        'selected_pathway',
        'lead_temperature',
        'consent_at',
    ];

    protected $casts = [
        'consent_at' => 'datetime',
    ];

    public function assessment()
    {
        return $this->belongsTo(EligibilityAssessment::class, 'assessment_id');
    }

    /**
     * HIGH / MEDIUM / LOW so sales can triage without opening the record.
     */
    public static function temperatureFor(int $score, int $maxScore): string
    {
        $ratio = $maxScore > 0 ? $score / $maxScore : 0;

        return match (true) {
            $ratio >= 0.7 => 'HIGH',
            $ratio >= 0.4 => 'MEDIUM',
            default => 'LOW',
        };
    }
}
