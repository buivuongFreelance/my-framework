<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSlideshowsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('slideshows', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            
            $table->uuid('uid')->nullable();
            $table->string('name')->nullable();
            $table->string('description')->nullable();
            $table->string('avatar')->nullable();
            $table->uuid('created_by')->nullable();
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
        Schema::dropIfExists('slideshows');
    }
}
