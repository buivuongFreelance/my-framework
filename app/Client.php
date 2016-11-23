<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    protected $primaryKey = 'uid';
    public $incrementing = false;
    public $timestamps = false;

    public function user(){
        return $this->belongsTo('App\User', 'user_uid', 'uid');
    }
}