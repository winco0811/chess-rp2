<?php 

session_start();
require_once '../app/database/db.class.php';

$changed = 0;

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
    $changed = 1;

  }
  
  sleep(1);

if($changed === 1)
    header('Location: ../chess-js/igra-test-crni.php');
else
    header('Location: main2.html');
?>