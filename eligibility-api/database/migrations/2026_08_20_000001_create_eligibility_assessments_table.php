<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('eligibility_assessments', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->json('profile'); // raw validated answers
            $table->json('results'); // full engine output, all pathways
            $table->string('rule_version'); // ties this result to the rules that produced it
            $table->timestamp('calculated_at');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('eligibility_assessments');
    }
};
