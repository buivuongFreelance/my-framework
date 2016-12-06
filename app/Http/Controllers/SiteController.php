<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Site;
use DB;
use Uuid;
use ValidationException;
use Validator;
use Illuminate\Validation\Rule;

class SiteController extends Controller
{
    public function siteDetail(Request $request){
        $all = $request->all();

        $site = Site::first();

        return response()->json($site);
    }

    public function siteUpdateInfo(Request $request){
        $pathName = null;

        $update = [
            'name' => $request->name,
            'email' => $request->email,
            'address' => $request->address,
            'phone' => $request->phone
        ];

        if($request->image !== 'null' && $request->image !== 'undefined'){
            try{
                $path = $request->image->store('public/site/avatars');
            }catch(\Exception $e){
                return response()->json(['message' => 'Cannot Upload Image'], 500);
            }
            $pathName = str_replace('public/', '', $path);

            $update = [
                'name' => $request->name,
                'email' => $request->email,
                'address' => $request->address,
                'phone' => $request->phone,
                'avatar' => $pathName
            ];
        }
        
        $site = Site::where('uid', $request->uid)
                        ->update($update);

        return response()->json(['message'=>'success']);
    }

    public function siteUpdateSocial(Request $request){
        $all = $request->all();

        $site = Site::where('uid', $all['uid'])
                    ->update([
                        'facebook_link' => $all['facebook_link'],
                        'twitter_link' => $all['twitter_link'],
                        'gplus_link' => $all['gplus_link'],
                        'youtube_link' => $all['youtube_link'],
                        'instagram_link' => $all['instagram_link']
                    ]);

        return response()->json(['message'=>'success']);   
    }
}