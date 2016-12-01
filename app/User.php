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

    public function scopeGetUserWithEmail($query, $email){
        $query->where('email', $email)
            ->where('role', 'client')
            ->first();
        return $query;
    }

    public function scopeGetClientWithEmail($query, $email){
        $query->where('email', $email)
            ->with('client')
            ->where('role', 'client')
            ->first();
        return $query;
    }

    public function client(){
        return $this->hasOne('App\Client', 'user_uid', 'uid');
    }

    public function doctor(){
        return $this->hasOne('App\Doctor', 'user_uid', 'uid');
    }
}
