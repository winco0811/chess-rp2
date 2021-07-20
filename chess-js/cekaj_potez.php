<?php
require_once "../model/game.class.php";
require_once "../model/user.class.php";
//napisao profesor, modificirao tim

function sendJSONandExit( $message )
{
    // Kao izlaz skripte pošalji $message u JSON formatu i prekini izvođenje.
    header( 'Content-type:application/json;charset=utf-8' );
    echo json_encode( $message );
    flush();
    exit( 0 );
}


$lastmodif    = isset( $_GET['timestamp'] ) ? $_GET['timestamp'] : 0;
$id = isset( $_GET['id'] ) ? $_GET['id'] : '';
error_log($id);
$filename  = $id . '.log';

$error = "";
$game = new Game();

// Otkrij kad je zadnji put bio promijenjena datoteka u kojoj je spremljena zadnja poruka.
$currentmodif = $game->getUpdated_at($id);

// Petlja koja se vrti sve dok se datoteka ne promijeni
while( $currentmodif <= $lastmodif ) {
	usleep( 10000 ); // odspavaj 10ms da CPU malo odmori :)
	$currentmodif = $game->getUpdated_at($id);
}

// Kad dođemo do ovdje, znamo da je datoteka bila promijenjena.
// Spremi njen sadržaj u $response[ 'msg' ] i vrijeme zadnje promjene u $response[ 'timestamp' ]
$response = array();
$response[ 'msg' ]       = $game->findLastMove($id);
$response[ 'timestamp' ] = $currentmodif;

// Napravi JSON string od ovog i ispiši ga (tj. pošalji klijentu).
sendJSONandExit( $response );

?>
