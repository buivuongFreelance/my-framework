<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Client;
use DB;
use Hash;
use Uuid;
use ValidationException;
use Validator;

class ClientController extends Controller
{
    public function detail(Request $request){
        $all = $request->all();

        $user = User::getClientWithEmail($all['email'])->first();
        return response()->json($user);
    }

    public function edit(Request $request){
        $all = $request->all();

        DB::beginTransaction();

        try{
			User::where('email', $all['email'])
            ->update(['name' => $all['params']['name'] ]);
        }catch(ValidationException $e){
            DB::rollback();
        }catch(\Exception $e){
            DB::rollback();
            throw $e;
        }

        try{
            $user = User::where('email', $all['email'])->first();

            Client::where('user_uid', $user->uid)
            ->update([
                'birthday' => $all['params']['birthday'],
                'address' => $all['params']['address'],
                'phone' => $all['params']['phone']
            ]);
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