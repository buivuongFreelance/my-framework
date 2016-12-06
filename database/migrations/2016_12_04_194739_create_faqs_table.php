<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFaqsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('faqs', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            
            $table->uuid('uid')->nullable();
            $table->uuid('cat_faq_uid')->nullable();
            $table->string('question')->nullable();
            $table->string('answer')->nullable();
            $table->timestampsTz();
            $table->softDeletes();

            $table->primary('uid');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('faqs');
    }
}
