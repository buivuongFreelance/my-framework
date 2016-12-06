<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Site extends Model
{
    protected $primaryKey = 'uid';
    public $incrementing = false;
    public $timestamps = false;
}