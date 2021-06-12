<?php

class Game
{
	protected $id, $draw, $resign, $username_white, $username_black;

	function __construct( $id, $draw, $resign, $username_white, $username_black )
	{
		$this->id = $id;
		$this->draw = $draw;
		$this->resign = $resign;
		$this->username_white = $username_white;
		$this->username_black = $username_black;
	}

	function __get( $prop ) { return $this->$prop; }
	function __set( $prop, $val ) { $this->$prop = $val; return $this; }
}

?>
