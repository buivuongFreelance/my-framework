<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Page;
use DB;
use Uuid;
use ValidationException;
use Validator;
use Illuminate\Validation\Rule;

class PageController extends Controller
{
    public function pageRemove(Request $request){
        $all = $request->all();
        $page = Page::where('uid', $all['uid'])
                ->delete();

        return response()->json(['message' => 'success']);
    }

    public function pageList(Request $request){
        $all = $request->all();
        $pages = Page::where('name', 'like', '%'.$all['search']['name'].'%')
                ->where('seo_title', 'like', '%'.$all['search']['seo_title'].'%')
                ->offset($all['offset'])
                ->limit($all['limit'])
                ->orderBy($all['sort']['field'], $all['sort']['value'])
                ->get();
        
        $pagesCount = Page::where('name', 'like', '%'.$all['search']['name'].'%')
                ->where('seo_title', 'like', '%'.$all['search']['seo_title'].'%')
                ->count();

        return response()->json(['list' => $pages, 'all' => $pagesCount]);
    }

    public function pageDetail(Request $request){
        $all = $request->all();

        $page = Page::where('uid', $all['uid'])
                ->first();

        return response()->json($page);
    }

    public function pageCreate(Request $request){
    	$all = $request->all();
    	$pageUid = Uuid::generate();

    	$validator = Validator::make($all, [
    		'name' => 'required'
        ]);

        if($validator->fails())
            return response()->json($validator->errors(), 401);
        
        $page = new Page();
        $page->uid = $pageUid;
        $page->name = $all['name'];
        $page->slug = str_slug($all['name'], '-');
        $page->seo_title = $all['seo_title'];
        $page->content = $all['content'];
        $page->created_by = $all['user_uid'];
        $page->save();

    	return response()->json(['message'=>'success']);
    }

    public function pageUpdate(Request $request){
        $all = $request->all();

        $validator = Validator::make($all, [
            'name' => [
                'required',
                Rule::unique('pages')->ignore($all['uid'], 'uid')
            ]
        ]);

        if($validator->fails())
            return response()->json($validator->errors(), 401);

        $page = Page::where('uid', $all['uid'])
            ->update([
                'name' => $all['name'],
                'slug' => str_slug($all['name'], '-'),
                'seo_title' => $all['seo_title'],
                'content' => $all['content']
            ]);
        return response()->json(['message' => 'success']);
    }
}