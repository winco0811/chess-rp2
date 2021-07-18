<?php 

session_start();
require_once '../app/database/db.class.php';

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
    $playable = 1;
  }
  
  sleep(1);

if($_SESSION['gameId'] != 0){
  //nemoze igrat
    header('Location: ../chess-js/igra-test-crni.php');
  }
else{
  //moze igrat, preusmjeri ga na crnog igraca
    header('Location: main2.html');
  }
?>