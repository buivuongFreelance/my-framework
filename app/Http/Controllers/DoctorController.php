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

class DoctorController extends Controller
{
    public function doctorList(Request $request){
        $all = $request->all();

        return response()->json($all);
    }    
}