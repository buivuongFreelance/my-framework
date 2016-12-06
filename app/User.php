<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Foundation;

class User extends Authenticatable
{
    use Notifiable;

    protected $primaryKey = 'uid';
    public $incrementing = false;
    public $timestamps = true;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        //'password', 'remember_token',
    ];

    public function doctor(){
        return $this->hasOne('App\Doctor', 'user_uid', 'uid');
    }

    public function doctorsImages(){
        return $this->hasMany('App\DoctorImage', 'user_uid', 'uid');
    }

    public function qualifications(){
        return $this->hasMany('App\Qualification', 'user_uid', 'uid');
    }
}
