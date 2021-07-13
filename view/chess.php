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
	unset($username);
	session_unset();
	session_destroy();
}


?>
