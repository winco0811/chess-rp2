<?php

session_start();

function sendJSONandExit( $message )
{
    // Kao izlaz skripte pošalji $message u JSON formatu i prekini izvođenje.
    header( 'Content-type:application/json;charset=utf-8' );
    echo json_encode( $message );
    flush();
    exit( 0 );
}

$response = array();
error_log($_SESSION["color"] . $_SESSION["gameId"]);
$response[ 'color' ] = $_SESSION["color"];
$response[ 'id' ] = $_SESSION["gameId"];

sendJSONandExit( $response );
?>
