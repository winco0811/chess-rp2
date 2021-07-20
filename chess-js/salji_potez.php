<?php
require_once "../model/game.class.php";
require_once "../model/user.class.php";
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
$error = "";

//if( $error !== "" ) {
//    $response = [];
//    $response[ 'error' ] = $error;
//
//    sendJSONandExit( $response );
//}

if( $msg != '' && $id != '' ) {
	$game=new Game();
	$game->insert($id,$msg);
	$response = [];
	$response[ 'id' ] = $id;
	$response[ 'msg' ] = $msg;
    	sendJSONandExit( $response );
}
else {
    $response = [];
    $response[ 'error' ] = "Poruka nema definirano polje ime ili polje msg.";

    sendJSONandExit( $response );
}

?>

