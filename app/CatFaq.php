<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CatFaq extends Model
{
	use SoftDeletes;

	protected $table = 'cat_faqs';
    protected $primaryKey = 'uid';
    public $incrementing = false;
    public $timestamps = true;
    protected $dates = ['deleted_at'];
}