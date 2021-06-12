<?php

class User
{
	protected $username, $forgotten_password, $in_game, $mute_requests, $password;

	function __construct( $username, $forgotten_password, $in_game, $mute_requests, $password )
	{
	 	$this->username = $username;
		$this->forgotten_password = $forgotten_password;
		$this->in_game = $in_game;
		$this->mute_requests = $mute_requests;
		$this->password = $password;
	}

	function __get( $prop ) { return $this->$prop; }
	function __set( $prop, $val ) { $this->$prop = $val; return $this; }
}

?>

