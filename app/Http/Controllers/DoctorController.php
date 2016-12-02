<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Doctor;
use DB;
use Hash;
use Uuid;
use ValidationException;
use Validator;

class DoctorController extends Controller
{
    public function doctorUpAvatar(Request $request){
        try{
            $path = $request->image->store('public/avatars');
        }catch(\Exception $e){
            return response()->json(['message' => 'Cannot Upload Image'], 500);
        }
        $pathName = str_replace('public/', '', $path);
        $doctor = Doctor::where('user_uid', $request->uid)
                ->update(['avatar' => $pathName]);
        return response()->json(['message' => 'success']);
    }

    public function doctorList(Request $request){
        $doctors = User::where('status', 'active')
                ->where('role', 'doctor')
                ->with('doctor')
                ->orderBy('created_at', 'desc')
                ->get();

        return response()->json($doctors);
    }

    public function doctorDetail(Request $request){
        $all = $request->all();

        $doctor = User::where('status', 'active')
                ->where('role', 'doctor')
                ->where('uid', $all['uid'])
                ->with('doctor')
                ->first();

        return response()->json($doctor);
    }

    public function doctorCreate(Request $request){
    	$all = $request->all();
    	$userUid = Uuid::generate();
    	$doctorUid = Uuid::generate();

    	$validator = Validator::make($all, [
    		'last_name' => 'required|min:2',
            'email' => 'required|unique:users,email|email',
            'password' => 'required|min:6'
        ]);

        if($validator->fails())
            return response()->json($validator->errors(), 401);

        DB::beginTransaction();
        try{
            $user = new User();
            $user->uid = $userUid;
            $user->email = $all['email'];
            $user->password = Hash::make($all['password']);
            $user->status = 'active';
            $user->role = 'doctor';
            $user->save();
        }catch(ValidationException $e){
            DB::rollback();
        }catch(\Exception $e){
            DB::rollback();
            throw $e;
        }

        try{
            $doctor = new Doctor();
            $doctor->uid = $doctorUid;
            $doctor->user_uid = $userUid;
            $doctor->first_name = $all['first_name'];
            $doctor->last_name = $all['last_name'];
            $doctor->birthday = $all['birthday'];
            $doctor->address = $all['address'];
            $doctor->phone = $all['phone'];
            $doctor->job_title = $all['job_title'];
            $doctor->description = $all['description'];
            $doctor->save();
        }catch(ValidationException $e){
            DB::rollback();
        }catch(\Exception $e){
            DB::rollback();
            throw $e;
        }
        DB::commit();

    	return response()->json(['message'=>'success']);
    }

    public function doctorUpdate(Request $request){
        $all = $request->all();

        $validator = Validator::make($all, [
            'last_name' => 'required|min:2'
        ]);

        if($validator->fails())
            return response()->json($validator->errors(), 401);

        $doctor = Doctor::where('user_uid', $all['user_uid'])
            ->update([
                'first_name' => $all['first_name'],
                'last_name' => $all['last_name'],
                'birthday' => $all['birthday'],
                'phone' => $all['phone'],
                'address' => $all['address'],
                'job_title' => $all['job_title'],
                'description' => $all['description']
            ]);
        return response()->json(['message' => 'success']);
    }
}