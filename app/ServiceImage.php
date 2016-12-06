<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ServiceImage extends Model
{
	protected $table = 'services_images';
    protected $primaryKey = 'uid';
    public $incrementing = false;
    public $timestamps = true;

   	public function service(){
        return $this->belongsTo('App\Service', 'service_uid', 'uid');
    }
}