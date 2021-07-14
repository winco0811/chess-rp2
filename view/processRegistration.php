<?php 
session_start();

require_once 'register.php';
require_once '../login.php';

if( isset( $_POST["gumb" ] ) && $_POST["gumb"] === "register" )
	procesiraj_novi();
else
	draw_registration();


?>
