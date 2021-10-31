<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateModifierDetailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('modifier_details', function (Blueprint $table) {
            $table->id();
            $table->string('key', 150);
            $table->json('values');

            $table->foreignId('modifier_id');
            $table->timestamps();

            $table->foreign('modifier_id')->references('id')->on('modifiers')
                ->onDelete('cascade')
                ->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('modifier_details');
    }
}
