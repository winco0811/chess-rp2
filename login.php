<?php
require_once 'app/database/db.class.php';

function procesiraj_login()
{
	// Provjeri sastoji li se ime samo od slova; ako ne, crtaj login formu.
	if( !isset( $_POST["username"] ) || preg_match( '/[a-zA-Z]{1, 20}/', $_POST["username"] ) )
		draw_LogIN();

	// Možda se ne šalje password; u njemu smije biti bilo što.
	if( !isset( $_POST["password"] ) )
		draw_LogIN();

	// Sve je OK, provjeri jel ga ima u bazi.
	$db = DB::getConnection();

	try
	{
		$st = $db->prepare( 'SELECT password FROM users WHERE username=:username' );
		$st->execute( array( 'username' => $_POST["username"] ) );
	}
	catch( PDOException $e ) { draw_LogIN( 'Error:' . $e->getMessage() ); return; }

	$row = $st->fetch();

	if( $row === false )
	{
		// Taj user ne postoji, upit u bazu nije vratio ništa.
		draw_LogIN( 'Wrong username or password.' );
		return;
	}
	else
	{
		// Postoji user. Dohvati hash njegovog passworda.
		$hash = $row[ 'password'];

		// Da li je password dobar?
		if( password_verify( $_POST['password'], $hash ) )
		{
			// Dobar je. Ulogiraj ga.
      session_start();
      $_SESSION['username'] = $_POST['username'];
      header("location: ../main-page/main2.html");

			return;
		}
		else
		{
			// Nije dobar. Crtaj opet login formu s pripadnom porukom.
			draw_LogIN( 'Wrong username or password.' );
			return;
		}
	}
}

function procesiraj_novi()
{
	// Provjeri sastoji li se ime samo od slova; ako ne, crtaj login formu.
	if( !isset( $_POST["username"] ) || preg_match( '/[a-zA-Z]{1, 20}/', $_POST["username"] ) )
		draw_registration();

	// Možda se ne šalje password; u njemu smije biti bilo što.
	if( !isset( $_POST["password"] ) )
		draw_registration();
		
	if( !isset( $_POST["email"] ) )
		draw_registration();

	// Sve je OK, provjeri jel ga ima u bazi.
	$db = DB::getConnection();

	try
	{
		$st = $db->prepare( 'SELECT password FROM users WHERE username=:username' );
		$st->execute( array( 'username' => $_POST["username"] ) );
	}	
	catch( PDOException $e ) { draw_registration( 'Error:' . $e->getMessage() ); return; }

	if( $st->rowCount() > 0 )
	{
		// Taj korisnik već postoji. Ponovno crtaj login.
		draw_registration( 'Username already exist.' );
		return;
	}
	else
	{
		// Stvarno nema tog korisnika. Dodaj ga u bazu.
		try
		{
			// Prvo pripremi insert naredbu.
			$st = $db->prepare( 'INSERT INTO users (username, opponet, color, gameId, move, password) VALUES (:username, :opponet, :color, :gameId, :move, :hash)' );

			// Napravi hash od passworda kojeg je unio user.
			$hash = password_hash( $_POST["password"], PASSWORD_DEFAULT );
      $opp = "";
			$col = "";
			$game = 0;
			$mve = "";
			// Izvrši sad tu insert naredbu. Uočite da u bazu stavljamo hash, a ne $_POST["password"]!
			$st->execute( array( 'username' => $_POST["username"], 'opponet' => $opp, 'color' => $col , 'gameId' => $game, 'move' => $mve, 'hash' => $hash) );
			header('Location: succesfull_registration.php');
		}
		catch( PDOException $e ) { draw_registration( 'Error:' . $e->getMessage() ); return; }

	}
}
?>