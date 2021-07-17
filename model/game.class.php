<?php

//brine se o potezima, lastMove je zadnji odigrani potez izmedu 2 igraca
class DB
{
	private static $db = null;

	private function __construct() { }
	private function __clone() { }

	public static function getConnection() 
	{
		if( DB::$db === null )
	    {
	    	try
	    	{
		    	DB::$db = new PDO('mysql:host=localhost;dbname=chess;charset=utf8','root','root');
		    	DB::$db-> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		    }
		    catch( PDOException $e ) { exit( 'PDO Error: ' . $e->getMessage() ); }
	    }
		return DB::$db;
	}
}

class Game
{
	protected $moveId, $moveUser, $lastMove, $moveString;

	function __get( $prop ) { return $this->$prop; }
	function __set( $prop, $val ) { $this->$prop = $val; return $this; }
	
	//zadnja pozicija igraca sa igrom gameId
	public function findLastMove($id)
	{
		try
		{
			$db = DB::getConnection();
			$st = $db->prepare( 'SELECT  username, opponet, color, gameId, move, password FROM users WHERE gameId=:gameId' );
			$st->execute( array( 'gameId' => $id ) );
		}
		catch( PDOException $e ) { exit( 'PDO error ' . $e->getMessage() ); }

		while( $row = $st->fetch() )
		{
			$gameId = $row["gameId"];
			$move = $row["move"];
			if($gameId == $id)
			{
				return $move;
			}
		}
		$move = "";
		return $move;		
	}
	
	//vrati s kojom bojom korisnik igra.
	public function findColor($username)
	{
		try
		{
			$db = DB::getConnection();
			$st = $db->prepare( 'SELECT  username, opponet, color, gameId, move, password FROM users WHERE username=:username' );
			$st->execute( array( 'username' => $username ) );
		}
		catch( PDOException $e ) { exit( 'PDO error ' . $e->getMessage() ); }

		$row = $st->fetch();
		if( $row === false )
		{
				$col = "";
				return $col;
		}
		else
			return $row["color"];
	}
	
	//ubaci potez u bazu gdje je gameId = Id i postavi move = moveString
	public function insert($id, $move)
	{
		try
		{
			$db = DB::getConnection();
			$st = $db->prepare( 'UPDATE users SET move=:move WHERE gameId=:gameId' );
			$st->execute( array( 'move' => $move, 'gameId' => $id ) );
		}
		catch( PDOException $e ) { exit( 'PDO error ' . $e->getMessage() ); }

	}
	
	public function getUpdated_at($username)
	{
		try
		{
			$db = DB::getConnection();
			$st = $db->prepare( 'SELECT updated_at FROM users WHERE username=:username' );
			$st->execute( array( 'username' => $username ) );
		}
		catch( PDOException $e ) { exit( 'PDO error ' . $e->getMessage() ); }
		
		$row = $st->fetch();
		return $row["updated_at"];
	}
	
}

?>
