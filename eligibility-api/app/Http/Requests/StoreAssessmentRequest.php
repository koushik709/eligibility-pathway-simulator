<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAssessmentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'age' => ['required', 'integer', 'min:16', 'max:65'],
            'citizenship_country' => ['required', 'string', 'max:100'],
            'current_country' => ['required', 'string', 'max:100'],
            'education_level' => ['required', 'in:high_school,diploma,bachelor,master,phd'],
            'field_of_study' => ['nullable', 'string', 'max:150'],
            'years_experience' => ['required', 'integer', 'min:0', 'max:40'],
            'canadian_experience_years' => ['required', 'integer', 'min:0', 'max:40'],
            'canadian_education' => ['required', 'boolean'],
            'language_clb' => ['required', 'integer', 'min:0', 'max:10'],
            'provincial_nomination' => ['required', 'boolean'],
            'job_offer' => ['required', 'boolean'],
            'has_spouse' => ['required', 'boolean'],
        ];
    }
}
