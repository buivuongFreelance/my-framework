<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Service extends Model
{
	use SoftDeletes;

    protected $primaryKey = 'uid';
    public $incrementing = false;
    public $timestamps = true;
    protected $dates = ['deleted_at'];

    public function servicesImages(){
        return $this->hasMany('App\ServiceImage', 'service_uid', 'uid');
    }
}