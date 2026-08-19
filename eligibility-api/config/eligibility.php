<?php

/**
 * Eligibility question + pathway configuration.
 *
 * This is deliberately data, not code, so non-developers can eventually
 * manage it. For the MVP it lives in config/eligibility.php; Phase 7
 * (admin panel) should migrate this into the eligibility_questions /
 * eligibility_options tables already defined in the migrations and have
 * QuestionRepository read from the database instead. Nothing in the
 * controller or calculators needs to change when that happens as long as
 * QuestionRepository::all() keeps returning this same shape.
 */

return [

    'rule_version' => '2026.08.1',

    'pathways' => [
        'express_entry' => [
            'label' => 'Express Entry (Federal Skilled Worker)',
            'calculator' => \App\Services\Eligibility\Calculators\ExpressEntryCalculator::class,
        ],
        'pnp' => [
            'label' => 'Provincial Nominee Program',
            'calculator' => \App\Services\Eligibility\Calculators\PnpCalculator::class,
        ],
        'study_pr' => [
            'label' => 'Study \u2192 PR Pathway',
            'calculator' => \App\Services\Eligibility\Calculators\StudyPathwayCalculator::class,
        ],
        'work_permit' => [
            'label' => 'Work Permit',
            'calculator' => \App\Services\Eligibility\Calculators\WorkPermitCalculator::class,
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Questions
    |--------------------------------------------------------------------------
    | "key" is what calculators read from the validated payload.
    | "type" drives which input the frontend renders.
    */
    'questions' => [
        [
            'key' => 'age',
            'order' => 1,
            'type' => 'number',
            'label' => 'What is your age?',
            'min' => 16,
            'max' => 65,
            'required' => true,
        ],
        [
            'key' => 'citizenship_country',
            'order' => 2,
            'type' => 'text',
            'label' => 'What is your country of citizenship?',
            'required' => true,
        ],
        [
            'key' => 'current_country',
            'order' => 3,
            'type' => 'text',
            'label' => 'What country do you currently live in?',
            'required' => true,
        ],
        [
            'key' => 'education_level',
            'order' => 4,
            'type' => 'select',
            'label' => 'What is your highest level of education?',
            'required' => true,
            'options' => [
                ['value' => 'high_school', 'label' => 'High School'],
                ['value' => 'diploma', 'label' => 'Diploma / Trade Certificate'],
                ['value' => 'bachelor', 'label' => "Bachelor's Degree"],
                ['value' => 'master', 'label' => "Master's Degree"],
                ['value' => 'phd', 'label' => 'PhD'],
            ],
        ],
        [
            'key' => 'field_of_study',
            'order' => 5,
            'type' => 'text',
            'label' => 'What was your field of study?',
            'required' => false,
        ],
        [
            'key' => 'years_experience',
            'order' => 6,
            'type' => 'number',
            'label' => 'How many years of skilled work experience do you have?',
            'min' => 0,
            'max' => 40,
            'required' => true,
        ],
        [
            'key' => 'canadian_experience_years',
            'order' => 7,
            'type' => 'number',
            'label' => 'How many years of Canadian work experience do you have?',
            'min' => 0,
            'max' => 40,
            'required' => true,
        ],
        [
            'key' => 'canadian_education',
            'order' => 8,
            'type' => 'boolean',
            'label' => 'Have you completed a credential from a Canadian institution?',
            'required' => true,
        ],
        [
            'key' => 'language_clb',
            'order' => 9,
            'type' => 'select',
            'label' => 'What is your first official language score (CLB equivalent)?',
            'required' => true,
            'options' => [
                ['value' => '4', 'label' => 'CLB 4 or below'],
                ['value' => '5', 'label' => 'CLB 5'],
                ['value' => '6', 'label' => 'CLB 6'],
                ['value' => '7', 'label' => 'CLB 7'],
                ['value' => '8', 'label' => 'CLB 8'],
                ['value' => '9', 'label' => 'CLB 9'],
                ['value' => '10', 'label' => 'CLB 10+'],
            ],
        ],
        [
            'key' => 'provincial_nomination',
            'order' => 10,
            'type' => 'boolean',
            'label' => 'Do you have a provincial nomination?',
            'required' => true,
        ],
        [
            'key' => 'job_offer',
            'order' => 11,
            'type' => 'boolean',
            'label' => 'Do you have a valid Canadian job offer?',
            'required' => true,
        ],
        [
            'key' => 'has_spouse',
            'order' => 12,
            'type' => 'boolean',
            'label' => 'Are you applying with a spouse or common-law partner?',
            'required' => true,
        ],
    ],
];
