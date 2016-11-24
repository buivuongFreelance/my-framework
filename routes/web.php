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
    Route::post('authenticate/client/login', 'AuthenticateController@clientLogin');
    Route::post('authenticate/client/register', 'AuthenticateController@clientRegistration');
});

Route::get('{all?}', function ($url) {
    return view('main');
})->where('all', '(.*)');