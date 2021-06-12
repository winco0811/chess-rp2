<?php

// Stvaramo tablice u bazi (ako već ne postoje od ranije).
require_once __DIR__ . '/db.class.php';

create_table_users();
create_table_games();
create_table_history();

// ------------------------------------------
function create_table_users()
{
	$db = DB::getConnection();

	// Stvaram tablicu users.
	try
	{
		$st = $db->prepare(
			'CREATE TABLE IF NOT EXISTS users (' .
			'username varchar(50) NOT NULL PRIMARY KEY,' .
			'forgotten_password INT NOT NULL,' .
			'email INT NOT NULL,' .
			'in_game INT NOT NULL,' .
			'mute_requests INT NOT NULL,' .
			'password varchar(255) NOT NULL)'
		);

		$st->execute();
	}
	catch( PDOException $e ) { exit( "PDO error (create_table_users): " . $e->getMessage() ); }

	echo "Napravio tablicu users.<br />";
}


function create_table_games()
{
	$db = DB::getConnection();

	// Stvaramo tablicu games.
	try
	{
		$st = $db->prepare(
			'CREATE TABLE IF NOT EXISTS games (' .
			'id int NOT NULL PRIMARY KEY AUTO_INCREMENT,' .
			'draw int NOT NULL,' .
			'resign int NOT NULL,' .
			'username_white INT NOT NULL,' .
			'username_black INT NOT NULL)'
		);

		$st->execute();
	}
	catch( PDOException $e ) { exit( "PDO error (create_table_games): " . $e->getMessage() ); }

	echo "Napravio tablicu games.<br />";
}


function create_table_history()
{
	$db = DB::getConnection();

	//stvori tablicu history.
	try
	{
		$st = $db->prepare(
			'CREATE TABLE IF NOT EXISTS loans (' .
			'game_id int NOT NULL PRIMARY KEY,' .
			'username1 varchar(50) NOT NULL,' .
			'username2 varchar(50) NOT NULL,' .
			'winner INT NOT NULL)'
		);

		$st->execute();
	}
	catch( PDOException $e ) { exit( "PDO error (create_table_history): " . $e->getMessage() ); }

	echo "Napravio tablicu history.<br />";
}

?>
