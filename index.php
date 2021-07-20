Uspjesan login
<?php
require_once 'app/database/db.class.php';
require_once "model/game.class.php";

session_start();
echo $_SESSION["color"];
echo $_SESSION["username"];
echo $_SESSION["gameId"];

 ?>
