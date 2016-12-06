<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Slideshow extends Model
{
	use SoftDeletes;

	protected $table = 'slideshows';
    protected $primaryKey = 'uid';
    public $incrementing = false;
    public $timestamps = true;
    protected $dates = ['deleted_at'];
}