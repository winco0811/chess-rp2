<?php

require_once '../app/database/db.class.php';
require_once '../model/user.class.php';

if(isset($_GET['q']))
    $ulaz = $_GET['q'];

if(isset($_GET['op']))
    $op = $_GET['op'];

$db = DB::getConnection();

function getAllUsers( )
{
  try
  {
    $db = DB::getConnection();
    $st = $db->prepare( 'SELECT username, opponet, color, gameId, move, password FROM users' );
    $st->execute();
  }
  catch( PDOException $e ) { exit( 'PDO error ' . $e->getMessage() ); }

  $arr = array();
  while( $row = $st->fetch() )
  {
        $user = new User( $row['username'], $row['opponet'], $row['color'],$row['gameId'], $row['move'] ,$row['password'] );
        $arr[] = $user->username;
  }

  return $arr;
}

$imena = getAllUsers(); //treba sadržavati sve username-ove u bazi

if(isset($op)){

    if($op === "search"){

        if(isset($ulaz)){
            if($ulaz === '')
                echo "Enter username you want to search for";
        

            else{

                foreach($imena as $ime)
                    if(isset($ulaz))
                        if($ulaz !== ''){
                            if( strpos($ime, $ulaz) !== false ){
                                echo "<li>" . $ime . "</li><button type=\"submit\" class=\"gumb2\" name=\"gumb2\" value=\"send\" id=\" " . $ime . "\">Send request</button>\n\n";
                            }
                        }
                }
        }
    }
}
?>
