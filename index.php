Uspjesan login
<?php
require_once "model/game.class.php";

$igra = new Game();
echo $igra->findLastMove(4);

 ?>