<?php

use Illuminate\Http\Request;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of the routes that are handled
| by your application. Just tell Laravel the URIs it should respond
| to using a Closure or controller method. Build something great!
|
*/
Route::group(['prefix' => 'api'], function()
{
    Route::post('authenticate/user/signin', 'AuthenticateController@userSignIn');
    Route::post('authenticate/user/signup', 'AuthenticateController@userSignUp');
    Route::get('authenticate/user/active/{token}', 'AuthenticateController@userActive');

    Route::post('client/detail', 'ClientController@detail');
    Route::post('client/edit', 'ClientController@edit');

    Route::post('authenticate/admin/signin', 'AuthenticateController@adminSignIn');

    Route::post('doctor/list', 'DoctorController@doctorList');
    Route::post('doctor/create', 'DoctorController@doctorCreate');
});

Route::get('{all?}', function ($url) {
    return view('main');
})->where('all', '(.*)');