<?php 
session_start();
require_once "../model/user.class.php";
require_once "../model/game.class.php";
require_once "../app/database/db.class.php";

//kliknut je gumb za igranje s nekim od igrača
if(isset( $_POST["user"]))
{ 
  $user = $_SESSION["username"];
  //gameId je random broj, pretpostavljamo da su svi razliciti.
  $gameId = rand(1,1000000);
  //dohvati username protivnika 
  $opponet = substr( $_POST["user"], 5 );
  
  //ako je kliknuo na sebe, ne valja
  $gme = new Game();
  $userColor = $gme->findColor($user);
  $color = "white";
  if($opponet !== $user && $userColor === "")
  {
	   
    //update bazu podataka u tablicu user (trenutni user). Sada jos treba i za protivnika updateat
    try
	   {
		     $db = DB::getConnection();
		     $st = $db->prepare( 'UPDATE  users set gameId=:gameId, opponet=:opponet, color=:color WHERE username=:username' );
		     $st->execute( array( 'gameId' => $gameId, 'opponet' => $opponet, 'color' => $color, 'username' => $user ) );
	   }
	 catch( PDOException $e ) { exit( 'PDO error ' . $e->getMessage() ); }	
   $_SESSION["color"] = $color;
   $_SESSION["opponet"] = $opponet;
   $_SESSION["gameId"] = $gameId;
   //protivnik igra sa crnim
    $color = "black";
    try
    {
      $db = DB::getConnection();
      $st = $db->prepare( 'UPDATE  users set gameId=:gameId, opponet=:opponet, color=:color WHERE username=:username' );
      $st->execute( array( 'gameId' => $gameId, 'opponet' => $user, 'color' => $color, 'username' => $opponet ) );
    }
    catch( PDOException $e ) { exit( 'PDO error ' . $e->getMessage() ); }	
  }
  header('Location: ../chess-js/igra-test-bijeli.php');
}



?>