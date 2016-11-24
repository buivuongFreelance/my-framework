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
    Route::get('authenticate/client/active/{token}', 'AuthenticateController@clientActive');

    Route::post('client/detail', 'ClientController@detail');
    Route::post('client/edit', 'ClientController@edit');
});

Route::get('sendemail', function () {

    $data = array(
        'name' => "Learning Laravel",
    );

    Mail::send('emails.welcome', $data, function ($message) {

        $message->from('buivuongdhmo@gmail.com', 'Learning Laravel');

        $message->to('buivuongdhmo@gmail.com')->subject('Learning Laravel test email');

    });

    return "Your email has been sent successfully";

});

Route::get('{all?}', function ($url) {
    return view('main');
})->where('all', '(.*)');