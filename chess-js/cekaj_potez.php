<?php
//napisao profesor, modificirao tim
/*
    Ova skripta nam služi i za spremanje novih poruka koje klijent šalje
    i za slanje poruka klijentu koje je netko drugi napisao.
*/

function sendJSONandExit( $message )
{
    // Kao izlaz skripte pošalji $message u JSON formatu i prekini izvođenje.
    header( 'Content-type:application/json;charset=utf-8' );
    echo json_encode( $message );
    flush();
    exit( 0 );
}


// Sad ide dio koda koji detektira je li netko drugi napisao poruku.
// Ovo je "long polling" u skripti.

// Klijent će u zahtjevu poslati svoje trenutno vrijeme.
$lastmodif    = isset( $_GET['timestamp'] ) ? $_GET['timestamp'] : 0;
$id = isset( $_GET['id'] ) ? $_GET['id'] : '';
error_log($id);
$filename  = $id . '.log';

$error = "";
if( !file_exists( $filename ) )
	$fajl= fopen($filename,"w");	
else
{
    if( !is_readable( $filename ) )
        $error = $error . "Ne mogu čitati iz datoteke " . $filename . ". ";

    if( !is_writable( $filename ) )
        $error = $error . "Ne mogu pisati u datoteku " . $filename . ". ";
}


if( $error !== "" )
{
    $response = [];
    $response[ 'error' ] = $error;

    sendJSONandExit( $response );
}

// Otkrij kad je zadnji put bio promijenjena datoteka u kojoj je spremljena zadnja poruka.
$currentmodif = filemtime( $filename );

// Petlja koja se vrti sve dok se datoteka ne promijeni
while( $currentmodif <= $lastmodif )
{
    usleep( 10000 ); // odspavaj 10ms da CPU malo odmori :)
    clearstatcache();
    $currentmodif = filemtime( $filename ); // ponovno dohvati vrijeme zadnje promjene datoteke
}

// Kad dođemo do ovdje, znamo da je datoteka bila promijenjena.
// Spremi njen sadržaj u $response[ 'msg' ] i vrijeme zadnje promjene u $response[ 'timestamp' ]
$response = array();
$response[ 'msg' ]       = file_get_contents( $filename );
$response[ 'timestamp' ] = $currentmodif;

// Napravi JSON string od ovog i ispiši ga (tj. pošalji klijentu).
sendJSONandExit( $response );

?>
