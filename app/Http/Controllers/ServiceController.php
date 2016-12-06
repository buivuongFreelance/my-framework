<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Service;
use App\ServiceImage;
use DB;
use Uuid;
use ValidationException;
use Validator;
use Illuminate\Validation\Rule;

class ServiceController extends Controller
{
    public function serviceRemoveImage(Request $request){
        $all = $request->all();

        $serviceImage = ServiceImage::where('uid', $all['uid'])
                ->delete();
    }
    public function serviceUpAvatar(Request $request){
        try{
            $path = $request->image->store('public/service/avatars');
        }catch(\Exception $e){
            return response()->json(['message' => 'Cannot Upload Image'], 500);
        }
        $pathName = str_replace('public/', '', $path);
        $service = Service::where('uid', $request->uid)
                ->update(['avatar' => $pathName]);
        return response()->json(['message' => 'success']);
    }

    public function serviceUpImage(Request $request){
        try{
            $path = $request->image->store('public/service/images');
        }catch(\Exception $e){
            return response()->json(['message' => 'Cannot Upload Image'], 500);
        }
        $serviceImageUid = Uuid::generate();
        $pathName = str_replace('public/', '', $path);
        $serviceImage = new ServiceImage();
        $serviceImage->uid = $serviceImageUid;
        $serviceImage->service_uid = $request->uid;
        $serviceImage->image = $pathName;
        $serviceImage->save();
        return response()->json(['message' => 'success']);
    }

    public function serviceList(Request $request){
        $all = $request->all();
        $services = Service::where('name', 'like', '%'.$all['search']['name'].'%')
                ->offset($all['offset'])
                ->limit($all['limit'])
                ->orderBy('created_at', 'desc')
                ->get();

        $servicesCount = Service::where('name', 'like', '%'.$all['search']['name'].'%')
                ->count();

        return response()->json(['list' => $services, 'all' => $servicesCount]);
    }

    public function serviceDetail(Request $request){
        $all = $request->all();

        $service = Service::where('uid', $all['uid'])
                ->with('servicesImages')
                ->first();

        return response()->json($service);
    }

    public function serviceCreate(Request $request){
    	$all = $request->all();
    	$serviceUid = Uuid::generate();

    	$validator = Validator::make($all, [
    		'name' => 'required'
        ]);

        if($validator->fails())
            return response()->json($validator->errors(), 401);

        $service = new Service();
        $service->uid = $serviceUid;
        $service->name = $all['name'];
        $service->description = $all['description'];
        $service->content = $all['content'];
        $service->created_by = $all['user_uid'];
        $service->save();

    	return response()->json(['message'=>'success']);
    }

    public function serviceUpdate(Request $request){
        $all = $request->all();

        $validator = Validator::make($all, [
            'name' => [
                'required',
                Rule::unique('services')->ignore($all['uid'], 'uid')
            ]
        ]);

        if($validator->fails())
            return response()->json($validator->errors(), 401);

        $service = Service::where('uid', $all['uid'])
            ->update([
                'name' => $all['name'],
                'description' => $all['description'],
                'content' => $all['content']
            ]);
        return response()->json(['message' => 'success']);
    }

    public function serviceRemove(Request $request){
        $all = $request->all();
        $service = Service::where('uid', $all['uid'])
                ->delete();

        return response()->json(['message' => 'success']);
    }
}