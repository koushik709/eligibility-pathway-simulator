<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class EligibilityAssessment extends Model
{
    use HasUuids;

    protected $fillable = [
        'profile',
        'results',
        'rule_version',
        'calculated_at',
    ];

    protected $casts = [
        'profile' => 'array',
        'results' => 'array',
        'calculated_at' => 'datetime',
    ];

    public function leads()
    {
        return $this->hasMany(EligibilityLead::class, 'assessment_id');
    }
}
