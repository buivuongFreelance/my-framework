<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use JWTAuth;
use JWTFactory;
use Tymon\JWTAuth\Exceptions\JWTException;
use App\User;
use App\Client;
use DB;
use Hash;
use Uuid;
use ValidationException;

class AuthenticateController extends Controller
{
    public function authenticate(Request $request){
    	$credentials = $request->only('email', 'password');
    	
    	try{
    		if(!$token = JWTAuth::attempt($credentials)){
    			return response()->json(['error' => 'invalid_credentials'], 401);
    		}
    	}catch(JWTException $e){
    		return response()->json(['error' => 'could_not_create_token'], 500);
    	}
    	return response()->json(compact('token'));
    }

    public function clientRegistration(Request $request){
        $all = $request->all();
        $userUid = Uuid::generate();
        $clientUid = Uuid::generate();

        DB::beginTransaction();

        try{
            $user = new User();
            $user->uid = $userUid;
            $user->name = $all['name'];
            $user->email = $all['email'];
            $user->password = Hash::make($all['password']);
            $user->save();
        }catch(ValidationException $e){
            DB::rollback();
        }catch(\Exception $e){
            DB::rollback();
            throw $e;
        }

        try{
            $client = new Client();
            $client->uid = $clientUid;
            $client->user_uid = $userUid;
            $client->birthday = $all['birthday'];
            $client->address = $all['address'];
            $client->phone = $all['phone'];
            $client->save();
        }catch(ValidationException $e){
            DB::rollback();
        }catch(\Exception $e){
            DB::rollback();
            throw $e;
        }
        DB::commit();
        return response()->json(['message'=>'success']);
    }
}