<?php 

require_once 'chess.php';
require_once '../login.php';

if( isset( $_POST["gumb" ] ) && $_POST["gumb"] === "login" )
	procesiraj_login();
else if( isset( $_POST["gumb" ] ) && $_POST["gumb"] === "novi" )
	procesiraj_novi();
else
	draw_LogIN();

?>