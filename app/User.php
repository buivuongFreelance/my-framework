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
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    public function rules(){
        return [
            'name' => 'required|min:4',
        ];
    }

    public function client(){
        return $this->hasOne('App\Client', 'user_uid', 'uid');
    }
}
