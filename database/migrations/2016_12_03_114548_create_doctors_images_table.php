<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDoctorsImagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('doctors_images', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            
            $table->uuid('uid')->nullable();
            $table->uuid('user_uid')->nullable();
            $table->string('image')->nullable();
            $table->timestampsTz();

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
        Schema::dropIfExists('doctors_images');
    }
}
