<?php
//Napisao profesor, modificirao tim
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


// Ako klijent šalje novu poruku, pospremi ju u datoteku
$msg = isset( $_GET['msg'] ) ? $_GET['msg'] : '';
$id = isset( $_GET['id'] ) ? $_GET['id'] : '';

// File u kojem se nalazi samo zadnja poruka.
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

if( $msg != '' && $id != '' )
{
	// Spremi poruku u datoteku (ovo će prebrisati njen sadržaj)
	
    file_put_contents( $filename,  $msg );
   // Iako klijent zapravo ne treba odgovor kada šalje novu poruku,
    // možemo mu svejeno nešto odgovoriti da olakšamo debugiranje na strani klijenta.
    $response = [];
    $response[ 'id' ] = $id;
    $response[ 'msg' ] = $msg;
    sendJSONandExit( $response );
}
else
{
    $response = [];
    $response[ 'error' ] = "Poruka nema definirano polje ime ili polje msg.";

    sendJSONandExit( $response );
}

?>

