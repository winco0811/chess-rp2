<?php 

session_start();

require_once 'pocetna.php';
require_once '../login.php';

if( isset( $_POST["gumb" ] ) && $_POST["gumb"] === "login" )
	procesiraj_login();
else if( isset( $_POST["gumb" ] ) && $_POST["gumb"] === "novi" )
	header('Location: processRegistration.php');
else
	draw_LogIN();

if( isset($_SESSION['username']) && isset($_POST['logout'] ) ){
	unset($_SESSION["username"]);
	if(isset($_SESSION["opponet"]))
			unset($_SESSION["opponet"]);
			
	if(isset($_SESSION["color"]))
			unset($_SESSION["color"]);
			
	if(isset($_SESSION["gameId"]))
			unset($_SESSION["gameId"]);
	
	if(isset($_SESSION["move"]))
			unset($_SESSION["move"]);
	session_unset();
	session_destroy();
}


?>
