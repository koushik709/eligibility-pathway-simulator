<?php

use App\Http\Controllers\Api\EligibilityController;
use App\Http\Controllers\Api\LeadController;
use Illuminate\Support\Facades\Route;

Route::prefix('eligibility')->group(function () {
    Route::get('/questions', [EligibilityController::class, 'questions']);
    Route::post('/calculate', [EligibilityController::class, 'calculate']);
    Route::post('/leads', [LeadController::class, 'store']);
});
