<?php

class History
{
	protected $game_id, $username1, $username2, $winner;

	function __construct( $game_id, $username1, $username2, $winner )
	{
		$this->game_id = $game_id;
		$this->username1 = $username1;
		$this->username2 = $username2;
		$this->winner = $winner;
	}

	function __get( $prop ) { return $this->$prop; }
	function __set( $prop, $value ) { $this->$prop = $value; return $this; }
}

?>

