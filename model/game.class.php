<?php

//brine se o potezima, lastMove je zadnji odigrani potez izmedu 2 igraca
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
		//inace ako ne pronade zadnji potez onda vraca FEN reprezentaciju pocetne pozicije
		$move = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
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
	public function insert($id)
	{
		$moveUser = $this->moveUser;
		$moveString = $this->moveString;
		$moveId = 1;
		
		try
		{
			$db = DB::getConnection();
			$st = $db->prepare( 'UPDATE users SET move=:move WHERE gameId=:gameId' );
			$st->execute( array( 'move' => $moveString, 'gameId' => $id ) );
		}
		catch( PDOException $e ) { exit( 'PDO error ' . $e->getMessage() ); }

	}
	
	
	
}

?>
