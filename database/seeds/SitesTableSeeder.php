<?php

use Illuminate\Database\Seeder;
use App\Site;
use Illuminate\Support\Facades\Hash;
use Webpatser\Uuid\Uuid;

class SitesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $site = new Site();
        $site->uid = Uuid::generate();
        $site->email = 'site@domain.com';
        $site->name = 'Site Name';
        $site->address = 'Your Address';
        $site->phone = '123456';
    	$site->save();
    }
}
