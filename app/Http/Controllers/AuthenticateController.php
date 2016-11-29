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
use Validator;
use Illuminate\Support\Facades\Mail;
use App\Mail\UserSignUp;

class AuthenticateController extends Controller
{
    public function userActive(Request $request, $token){
        $user = User::where('remember_token', $token)->first();

        if($user){
            User::where('remember_token', $token)
                ->update([
                    'remember_token' => '',
                    'status' => 'active'
                ]);
            return response()->json(['token' => 'you successfull, please login']);
        }else{
            return response()->json(['token' => 'you hacked']);
        }
    }

    public function userSignIn(Request $request){
        $all = $request->all();
        $validator = Validator::make($all, [
            'email' => 'required|email',
            'password' => 'required|min:6'
        ]);

        if($validator->fails()){
            return response()->json($validator->errors(), 401);
        }

        $user = User::getUserWithEmail($all['email'])->first();
        if(!$user)
            return response()->json(['message' => 'Email Unregistered'], 500);
        
        if($user->status !== 'active')
            return response()->json(['message' => 'Your Account Not Active. Please Check Your Email To Confirm'], 500);
        
        if(!Hash::check($all['password'], $user->password))
            return response()->json(['message' => 'Your Password Wrong !!!'], 500);
        
        $clientClaims = ['email'=>$user->email, 'name'=>$user->name];
        $credentials = ['email'=>$user->email, 'password'=>$all['password']];

        try {
            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json(['message' => 'invalid_credentials'], 500);
            }
        } catch (JWTException $e) {
            return response()->json(['message' => 'could_not_create_token'], 500);
        }

        return response()->json(['token' => $token, 'user' => $clientClaims]);
    }

    public function userSignUp(Request $request){
        $all = $request->all();
        $userUid = Uuid::generate();
        $clientUid = Uuid::generate();

        $validator = Validator::make($all, [
            'last_name' => 'required|min:4',
            'email' => 'required|unique:users,email|email',
            'password' => 'required|min:6'
        ]);

        if($validator->fails()){
            return response()->json($validator->errors(), 401);
        }

        DB::beginTransaction();

        try{
            $user = new User();
            $user->uid = $userUid;
            $user->email = $all['email'];
            $user->remember_token = Uuid::generate();
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
            $client->first_name = $all['first_name'];
            $client->last_name = $all['last_name'];
            $client->birthday = $all['birthday'];
            $client->address = $all['address'];
            $client->save();
        }catch(ValidationException $e){
            DB::rollback();
        }catch(\Exception $e){
            DB::rollback();
            throw $e;
        }
        DB::commit();

        Mail::to($all['email'])->send(new UserSignUp($all['first_name'].' '.$all['last_name'], $user->remember_token));
        return response()->json(['message'=>'success']);
    }
}