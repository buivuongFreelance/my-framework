<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Slideshow;
use DB;
use Uuid;
use ValidationException;
use Validator;
use Illuminate\Validation\Rule;

class SlideshowController extends Controller
{
    public function slideshowRemove(Request $request){
        $all = $request->all();
        $slideshow = Slideshow::where('uid', $all['uid'])
                ->delete();

        return response()->json(['message' => 'success']);
    }

    public function slideshowList(Request $request){
        $all = $request->all();
        $slideshows = Slideshow::where('name', 'like', '%'.$all['search']['name'].'%')
                ->offset($all['offset'])
                ->limit($all['limit'])
                ->orderBy($all['sort']['field'], $all['sort']['value'])
                ->get();
        
        $slideshowsCount = Slideshow::where('name', 'like', '%'.$all['search']['name'].'%')
                ->count();

        return response()->json(['list' => $slideshows, 'all' => $slideshowsCount]);
    }

    public function slideshowCreate(Request $request){
    	$slideshowUid = Uuid::generate();

        $pathName = null;

        if($request->image !== 'null'){
            try{
                $path = $request->image->store('public/slideshow/avatars');
            }catch(\Exception $e){
                return response()->json(['message' => 'Cannot Upload Image'], 500);
            }
            $pathName = str_replace('public/', '', $path);
        }
        
        $slideshow = new Slideshow();
        $slideshow->uid = $slideshowUid;
        $slideshow->name = $request->name;
        $slideshow->description = $request->description;
        $slideshow->avatar = $pathName;
        $slideshow->created_by = $request->user_uid;
        $slideshow->save();

    	return response()->json(['message'=>'success']);
    }

    public function slideshowDetail(Request $request){
        $all = $request->all();

        $slideshow = Slideshow::where('uid', $all['uid'])
                ->first();

        return response()->json($slideshow);
    }

    public function slideshowUpdate(Request $request){
        $pathName = null;

        $update = [
            'name' => $request->name,
            'description' => $request->description,
        ];

        if($request->image !== 'null' && $request->image !== 'undefined'){
            try{
                $path = $request->image->store('public/slideshow/avatars');
            }catch(\Exception $e){
                return response()->json(['message' => 'Cannot Upload Image'], 500);
            }
            $pathName = str_replace('public/', '', $path);

            $update = [
                'name' => $request->name,
                'description' => $request->description,
                'avatar' => $pathName
            ];
        }

        $slideshow = Slideshow::where('uid', $request->uid)
                        ->update($update);

        return response()->json(['message'=>'success']);
    }
}