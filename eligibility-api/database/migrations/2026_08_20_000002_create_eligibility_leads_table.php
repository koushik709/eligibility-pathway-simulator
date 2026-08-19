<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('eligibility_leads', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('assessment_id')->constrained('eligibility_assessments')->cascadeOnDelete();
            $table->string('name');
            $table->string('email');
            $table->string('phone')->nullable();
            $table->string('selected_pathway');
            $table->string('lead_temperature'); // HIGH / MEDIUM / LOW
            $table->timestamp('consent_at');
            $table->timestamps();

            $table->index('email');
            $table->index('lead_temperature');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('eligibility_leads');
    }
};
