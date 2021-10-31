<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for ($x = 0; $x < 10; $x++) {
            DB::table('products')->insert([
                'title' => Str::random(10),
                'description' => Str::random(100),
                'img_uri' => 'https://source.unsplash.com/random'
            ]);
        }
    }
}
