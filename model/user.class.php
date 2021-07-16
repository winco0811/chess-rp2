<?php


class User
{
	protected $username, $opponet, $color, $gameId, $move, $password;

	function __construct( $username, $opponet, $color, $gameId, $move, $password )
	{
	 	$this->username = $username;
		$this->opponet = $opponet;
		$this->color = $color;
		$this->gameId = $gameId;
		$this->move = $move;
		$this->password = $password;
	}

	function __get( $prop ) { return $this->$prop; }
	function __set( $prop, $val ) { $this->$prop = $val; return $this; }
	
	//funkcija koja dohvaca sve korisnike, iz ove funkcije dohvatimo username i sve ostale informacije o svim korisnicima
	public static function getAllUsers( )
	{
		try
		{
			$db = DB::getConnection();
			$st = $db->prepare( 'SELECT username, opponet, color, gameId, move, password FROM users' );
			$st->execute();
		}
		catch( PDOException $e ) { exit( 'PDO error ' . $e->getMessage() ); }

		$arr = array();
		while( $row = $st->fetch() )
		{
			$arr[] = new User( $row['username'], $row['opponet'], $row['color'],$row['gameId'], $row['move'] ,$row['password'] );
		}

		return $arr;
	}
	
	//dohvaca korisnika sa usernameom
	public static function getUserByUsername( $username )
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
			return null;
		else
			return new User( $row['username'], $row['opponet'], $row['color'], $row['gameId'], $row['move'], $row['password'] );
	}
	
	//dohvati sve slobodne igrace(ne igraju s nikim, gameId im je nula)
	public static function availablePlayers ()
	{
		try
		{
			$db = DB::getConnection();
			$st = $db->prepare( 'SELECT username, opponet, color, gameId, move, password FROM users WHERE gameId=0' );
			$st->execute();
		}
		catch( PDOException $e ) { exit( 'PDO error ' . $e->getMessage() ); }

		$arr = array();
		while( $row = $st->fetch() )
		{
			$arr[] = new User( $row['username'], $row['opponet'], $row['color'],$row['gameId'], $row['move'] ,$row['password'] );
		}
		return $arr;
	}
	
	//obrisi igru sa gameId = $gameId (postavi gameId na 0, izbrisi boju, varijablu move i opponet)
	public static function deleteGame ($gameId)
	{
		try
		{
			$db = DB::getConnection();
			$st = $db->prepare( 'UPDATE  users set gameId=0, opponet="", move="", color="" WHERE gameId=:gameId' );
			$st->execute( array( 'gameId' => $gameId ) );
		}
		catch( PDOException $e ) { exit( 'PDO error ' . $e->getMessage() ); }
		try
		{
			$db = DB::getConnection();
			$st = $db->prepare( 'UPDATE  users set gameId=0, opponet="", move="", color="" WHERE gameId=:gameId' );
			$st->execute( array( 'gameId' => $gameId ) );
		}
		catch( PDOException $e ) { exit( 'PDO error ' . $e->getMessage() ); }
	}	

}

?>

