<?php 

/*
session_start();
require_once '../app/database/db.class.php';

try
  {
    $db = DB::getConnection();
    $st = $db->prepare( 'SELECT username, gameId, color, opponet FROM users WHERE username=:username' );
    $st->execute( array('username' => $_SESSION['username']));
  }
  catch( PDOException $e ) { exit( 'PDO error ' . $e->getMessage() ); }
  
  $row = $st->fetch();
  if($row['gameId'] !== 0)
  {
    $_SESSION['gameId'] = $row['gameId'];
    $_SESSION['color'] = $row['color'];
    $_SESSION['username'] = $row['username'];
    $_SESSION['opponet'] = $row['opponet'];
    $playable = 1;
  }

if($_SESSION['gameId'] != 0)
{
    echo "changed";
}
*/

session_start();
require_once '../app/database/db.class.php';

function sendJSONandExit( $message )
{
    // Kao izlaz skripte pošalji $message u JSON formatu i prekini izvođenje.
    header( 'Content-type:application/json;charset=utf-8' );
    echo json_encode( $message );
    flush();
    exit( 0 );
}


function sendErrorAndExit( $messageText )
{
	$message = [];
	$message[ 'error' ] = $messageText;
	sendJSONandExit( $message );
}

while( 1 )
{
  $db = DB::getConnection();
  $st = $db->prepare( 'SELECT username, gameId, color, opponet FROM users WHERE username=:username' );
  $st->execute( array('username' => $_SESSION['username']));

	$row = $st->fetch();
  $message = [];
  if($row['gameId'] != 0)
  {
    //posalji poruku da je gameId razlicit od 0
    $message[ 'changed' ] = "true";
  }
  else 
  {
    //inace, gameId je 0...korisnik nije dobio request jos
    $message['changed'] = "false";
  }
  
  sendJSONandExit( $message );
	// Odspavaj par sekundi.
	usleep( 2000000 );
}

?>