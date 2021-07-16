<?php 

session_start();
require_once '../app/database/db.class.php';

while(1)
{
  try
  {
    $db = DB::getConnection();
    $st = $db->prepare( 'SELECT username, gameId, color, opponet FROM users WHERE username=:username' );
    $st->execute( array('username' => $_SESSION['username']));
  }
  catch( PDOException $e ) { exit( 'PDO error ' . $e->getMessage() ); }
  
  $row = $st->fetch();
  if($row['gameId'] !== 0)
  {
    $_SESSION['gameId'] = $row['gameId'];
    $_SESSION['color'] = $row['color'];
    $_SESSION['username'] = $row['username'];
    $_SESSION['opponet'] = $row['opponet'];
    break;
  }
  
  sleep(1);
}

header('Location: ../chess-js/igra-test-crni.php');
?>