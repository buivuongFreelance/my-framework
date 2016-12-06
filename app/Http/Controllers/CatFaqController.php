<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\CatFaq;
use DB;
use Uuid;
use ValidationException;
use Validator;
use Illuminate\Validation\Rule;

class CatFaqController extends Controller
{
    public function catFaqRemove(Request $request){
        $all = $request->all();
        $catFaq = CatFaq::where('uid', $all['uid'])
                ->delete();

        return response()->json(['message' => 'success']);
    }

    public function catFaqList(Request $request){
        $all = $request->all();
        $catFaqs = CatFaq::where('name', 'like', '%'.$all['search']['name'].'%')
                ->offset($all['offset'])
                ->limit($all['limit'])
                ->orderBy($all['sort']['field'], $all['sort']['value'])
                ->get();
        
        $catFaqsCount = CatFaq::where('name', 'like', '%'.$all['search']['name'].'%')
                ->count();

        return response()->json(['list' => $catFaqs, 'all' => $catFaqsCount]);
    }

    public function catFaqDetail(Request $request){
        $all = $request->all();

        $catFaq = CatFaq::where('uid', $all['uid'])
                ->first();

        return response()->json($catFaq);
    }

    public function catFaqCreate(Request $request){
    	$all = $request->all();
    	$catFaqUid = Uuid::generate();

    	$validator = Validator::make($all, [
    		'name' => 'required'
        ]);

        if($validator->fails())
            return response()->json($validator->errors(), 401);
        
        $catFaq = new CatFaq();
        $catFaq->uid = $catFaqUid;
        $catFaq->name = $all['name'];
        $catFaq->description = $all['description'];
        $catFaq->created_by = $all['user_uid'];
        $catFaq->save();

    	return response()->json(['message'=>'success']);
    }

    public function catFaqUpdate(Request $request){
        $all = $request->all();

        $validator = Validator::make($all, [
            'name' => [
                'required',
                Rule::unique('cat_faqs')->ignore($all['uid'], 'uid')
            ]
        ]);

        if($validator->fails())
            return response()->json($validator->errors(), 401);

        $catFaq = CatFaq::where('uid', $all['uid'])
            ->update([
                'name' => $all['name'],
                'description' => $all['description']
            ]);
        return response()->json(['message' => 'success']);
    }
}