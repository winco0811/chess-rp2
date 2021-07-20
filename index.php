Uspjesan login
<?php
require_once 'app/database/db.class.php';
require_once "model/game.class.php";

$igra = new Game();
echo "hello";
echo $igra->getUpdated_at(0);

 ?>
