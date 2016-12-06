<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Blog;
use DB;
use Uuid;
use ValidationException;
use Validator;
use Illuminate\Validation\Rule;

class BlogController extends Controller
{
    public function blogRemove(Request $request){
        $all = $request->all();
        $blog = Blog::where('uid', $all['uid'])
                ->delete();

        return response()->json(['message' => 'success']);
    }

    public function blogList(Request $request){
        $all = $request->all();
        $blogs = Blog::where('name', 'like', '%'.$all['search']['name'].'%')
                ->where('seo_title', 'like', '%'.$all['search']['seo_title'].'%')
                ->offset($all['offset'])
                ->limit($all['limit'])
                ->orderBy('created_at', 'desc')
                ->get();
        
        $blogsCount = Blog::where('name', 'like', '%'.$all['search']['name'].'%')
                ->where('seo_title', 'like', '%'.$all['search']['seo_title'].'%')
                ->count();

        return response()->json(['list' => $blogs, 'all' => $blogsCount]);
    }

    public function blogDetail(Request $request){
        $all = $request->all();

        $blog = Blog::where('uid', $all['uid'])
                ->first();

        return response()->json($blog);
    }

    public function blogCreate(Request $request){
    	$all = $request->all();
    	$blogUid = Uuid::generate();

    	$validator = Validator::make($all, [
    		'name' => 'required'
        ]);

        if($validator->fails())
            return response()->json($validator->errors(), 401);
        
        $blog = new Blog();
        $blog->uid = $blogUid;
        $blog->name = $all['name'];
        $blog->slug = str_slug($all['name'], '-');
        $blog->seo_title = $all['seo_title'];
        $blog->description = $all['description'];
        $blog->content = $all['content'];
        $blog->created_by = $all['user_uid'];
        $blog->save();

    	return response()->json(['message'=>'success']);
    }

    public function blogUpdate(Request $request){
        $all = $request->all();

        $validator = Validator::make($all, [
            'name' => [
                'required',
                Rule::unique('blogs')->ignore($all['uid'], 'uid')
            ]
        ]);

        if($validator->fails())
            return response()->json($validator->errors(), 401);

        $blog = Blog::where('uid', $all['uid'])
            ->update([
                'name' => $all['name'],
                'slug' => str_slug($all['name'], '-'),
                'description' => $all['description'],
                'seo_title' => $all['seo_title'],
                'content' => $all['content']
            ]);
        return response()->json(['message' => 'success']);
    }

    public function blogUpAvatar(Request $request){
        try{
            $path = $request->image->store('public/blog/avatars');
        }catch(\Exception $e){
            return response()->json(['message' => 'Cannot Upload Image'], 500);
        }
        $pathName = str_replace('public/', '', $path);
        $blog = Blog::where('uid', $request->uid)
                ->update(['avatar' => $pathName]);
        return response()->json(['message' => 'success']);
    }
}