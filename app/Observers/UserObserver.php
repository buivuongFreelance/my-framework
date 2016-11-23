<?php

namespace App\Observers;

use App\User;
use Webpatser\Uuid\Uuid;

class UserObserver{
	public function creating(User $user){
		$user->uid = Uuid::generate();
	}
}