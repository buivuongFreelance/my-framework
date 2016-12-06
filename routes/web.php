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
    Route::post('doctor/update', 'DoctorController@doctorUpdate');
    Route::post('doctor/detail', 'DoctorController@doctorDetail');
    Route::post('doctor/upAvatar', 'DoctorController@doctorUpAvatar');
    Route::post('doctor/upImage', 'DoctorController@doctorUpImage');
    Route::post('doctor/removeImage', 'DoctorController@doctorRemoveImage');

    Route::post('page/create', 'PageController@pageCreate');
    Route::post('page/list', 'PageController@pageList');
    Route::post('page/remove', 'PageController@pageRemove');
    Route::post('page/detail', 'PageController@pageDetail');
    Route::post('page/update', 'PageController@pageUpdate');

    Route::post('service/list', 'ServiceController@serviceList');
    Route::post('service/create', 'ServiceController@serviceCreate');
    Route::post('service/update', 'ServiceController@serviceUpdate');
    Route::post('service/remove', 'ServiceController@serviceRemove');
    Route::post('service/detail', 'ServiceController@serviceDetail');
    Route::post('service/upAvatar', 'ServiceController@serviceUpAvatar');
    Route::post('service/upImage', 'ServiceController@serviceUpImage');
    Route::post('service/removeImage', 'ServiceController@serviceRemoveImage');

    Route::post('blog/create', 'BlogController@blogCreate');
    Route::post('blog/list', 'BlogController@blogList');
    Route::post('blog/remove', 'BlogController@blogRemove');
    Route::post('blog/detail', 'BlogController@blogDetail');
    Route::post('blog/update', 'BlogController@blogUpdate');
    Route::post('blog/upAvatar', 'BlogController@blogUpAvatar');

    Route::post('catFaq/create', 'CatFaqController@catFaqCreate');
    Route::post('catFaq/list', 'CatFaqController@catFaqList');
    Route::post('catFaq/remove', 'CatFaqController@catFaqRemove');
    Route::post('catFaq/detail', 'CatFaqController@catFaqDetail');
    Route::post('catFaq/update', 'CatFaqController@catFaqUpdate');

    Route::post('qualification/create', 'QualificationController@qualificationCreate');
    Route::post('qualification/listByDoctor', 'QualificationController@qualificationListByDoctor');
    Route::post('qualification/remove', 'QualificationController@qualificationRemove');
    Route::post('qualification/update', 'QualificationController@qualificationUpdate');

    Route::post('site/detail', 'SiteController@siteDetail');
    Route::post('site/updateInfo', 'SiteController@siteUpdateInfo');
    Route::post('site/updateSocial', 'SiteController@siteUpdateSocial');

    Route::post('slideshow/create', 'SlideshowController@slideshowCreate');
    Route::post('slideshow/list', 'SlideshowController@slideshowList');
    Route::post('slideshow/detail', 'SlideshowController@slideshowDetail');
    Route::post('slideshow/remove', 'SlideshowController@slideshowRemove');
    Route::post('slideshow/update', 'SlideshowController@slideshowUpdate');
});

/*Route::get('/', function(){
    return view('aaa');
});*/

Route::get('{all?}', function ($url) {
    return view('main');
})->where('all', '(.*)');