<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateServicesImagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('services_images', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            
            $table->uuid('uid')->nullable();
            $table->uuid('service_uid')->nullable();
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
        Schema::dropIfExists('services_images');
    }
}
