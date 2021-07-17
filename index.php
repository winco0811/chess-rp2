Uspjesan login
<?php
require_once "model/game.class.php";

$igra = new Game();

$igra->insert(4,"e4");
$t = $igra->getUpdated_at("ff");

echo $t;
 ?>