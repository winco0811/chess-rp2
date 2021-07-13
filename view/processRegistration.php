<?php 
session_start();

require_once 'register.php';
require_once '../login.php';

if( isset( $_POST["gumb" ] ) && $_POST["gumb"] === "register" )
	procesiraj_novi();
else
	draw_registration();

if( isset($_SESSION['username']) && isset($_POST['logout'] ) ){
  	unset($username);
  	session_unset();
  	session_destroy();
}


?>
