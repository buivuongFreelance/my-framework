<?php

use Illuminate\Database\Seeder;
use App\User;
use Illuminate\Support\Facades\Hash;
use Webpatser\Uuid\Uuid;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
    	$user = new User;
        $user->uid = Uuid::generate();
    	$user->email = 'buivuongdhmo@gmail.com';
    	$user->password = Hash::make('123456');
    	$user->role = 'admin';
    	$user->status = 'active';
    	$user->save();
    }
}