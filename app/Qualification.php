<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Qualification extends Model
{
	use SoftDeletes;

    protected $primaryKey = 'uid';
    public $incrementing = false;
    public $timestamps = true;
    protected $dates = ['deleted_at'];

    public function user(){
        return $this->belongsTo('App\User', 'user_uid', 'uid');
    }
}