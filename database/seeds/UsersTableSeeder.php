<?php

use Illuminate\Database\Seeder;
use App\User;
use Hash;

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
    	$user->email = 'buivuongdhmo@gmail.com';
    	$user->password = Hash::make('123456');
    	$user->role = 'admin';
    	$user->status = 'active';
    	$user->save();
    }
}