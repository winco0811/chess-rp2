<?php

require_once 'db.class.php';

$imena = ["Ana123", "Mirko456", "Anaaa"];

if(isset($_GET['q']))
    $ulaz = $_GET['q'];

if(isset($_GET['op']))
    $op = $_GET['op'];

/*$db = DB::getConnection();

try
    {
        $st = $db->prepare( 'SELECT username FROM user' );
        $st->execute( array() );
    }
    catch( PDOException $e ) { echo 'Greška:' . $e->getMessage(); exit(); }

    $imena = $st->fetch(); //treba sadržavati sve username-ove u bazi*/

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
                                #echo "<a href=\"info.php?kor_ime=" . $ime . "\"><li>" . $ime . "</li></a>\n";
                                echo "<li>" . $ime . "</li><button type=\"submit\" class=\"gumb2\" name=\"gumb2\" value=\"send\" id=\" " . $ime . "\">Send request</button>\n\n";
                            }
                        }
                }
        }
    }
}
?>