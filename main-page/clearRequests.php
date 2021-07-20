<?php 

session_start();
require_once '../app/database/db.class.php';

$id = 0;
$clr = "";
$mv = "";
$opnt = "";
try
  {
    $db = DB::getConnection();
    
    $st = $db->prepare( 'UPDATE users SET opponet=:opponet, gameId=:gameId, color=:color, move=:move WHERE username=:username' );
    $st->execute( array('opponet' => $opnt, 'gameId' => $id, 'color' => $clr, 'move' => $mv, 'username' => $_SESSION['username']));
  }
catch( PDOException $e ) { exit( 'PDO error ' . $e->getMessage() ); }
  
  if(isset($_SESSION["opponet"]))
      unset($_SESSION["opponet"]);
      
  if(isset($_SESSION["color"]))
      unset($_SESSION["color"]);
      
  if(isset($_SESSION["gameId"]))
      unset($_SESSION["gameId"]);
  
  if(isset($_SESSION["move"]))
      unset($_SESSION["move"]);
      
header('Location: main2.html');
?>