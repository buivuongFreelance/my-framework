<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Qualification;
use DB;
use Uuid;
use ValidationException;
use Validator;
use Illuminate\Validation\Rule;

class QualificationController extends Controller
{
    public function qualificationRemove(Request $request){
        $all = $request->all();
        $qualification = Qualification::where('uid', $all['uid'])
                ->delete();

        return response()->json(['message' => 'success']);
    }

    public function qualificationListByDoctor(Request $request){
        $all = $request->all();
        $qualifications = Qualification::where('user_uid', $all['user_uid'])
                ->get();

        return response()->json(['list' => $qualifications]);
    }

    public function qualificationCreate(Request $request){
    	$qualificationUid = Uuid::generate();

        $pathName = null;

        if($request->image !== 'null'){
            try{
                $path = $request->image->store('public/qualification/avatars');
            }catch(\Exception $e){
                return response()->json(['message' => 'Cannot Upload Image'], 500);
            }
            $pathName = str_replace('public/', '', $path);
        }
        
        $qualification = new Qualification();
        $qualification->uid = $qualificationUid;
        $qualification->name = $request->name;
        $qualification->avatar = $pathName;
        $qualification->description = $request->description;
        $qualification->user_uid = $request->user_uid;
        $qualification->created_by = $request->admin_uid;
        $qualification->save();

    	return response()->json(['message'=>'success']);
    }

    public function qualificationUpdate(Request $request){
        $pathName = null;

        $update = [
            'name' => $request->name,
            'description' => $request->description,
        ];

        if($request->image !== 'null' && $request->image !== 'undefined'){
            try{
                $path = $request->image->store('public/qualification/avatars');
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


        
        $qualification = Qualification::where('uid', $request->uid)
                        ->update($update);

        return response()->json(['message'=>'success']);
    }
}