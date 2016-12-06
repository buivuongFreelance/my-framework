<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DoctorImage extends Model
{
	protected $table = 'doctors_images';
    protected $primaryKey = 'uid';
    public $incrementing = false;
    public $timestamps = true;

   	public function user(){
        return $this->belongsTo('App\User', 'user_uid', 'uid');
    }
}