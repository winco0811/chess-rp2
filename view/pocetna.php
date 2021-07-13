<?php
function draw_LogIN( $message = '' )
{
	?>
	<!DOCTYPE html>
	<html>
	<head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="style.css"> <!--dati ideju za bootstrap-->
		<meta charset="utf8" />
		<title>Login</title>
	</head>
	<body>
    
    <div class="login-content">
		<form id="login" method="post" action="chess.php"> <!-- mora na controller, ne na sebe -->
            <h2>Log in</h2>
		
			<br />
			<input class= "box" type="text" name="username" placeholder="username"/>
			<br />
			
			<br />
			<input class= "box" type="password" name="password" placeholder="password" />
			<br />
            <br />
			<button type="submit" class="gumb" name="gumb" value="login">Log in</button>
            <br /><br />
            <button type="submit" class="gumb2" name="gumb" value="novi">Register</button> <!--treba biti dio forme?-->
            <button type="submit" class="gumb3" name="gumb" value="forgot">Forgot password?</button> <!--isto-->

		</form>
    </div>
    

    <div class="join-us">
        <h2>Don't have an account?</h2>
    
    <h3> 
            
             <!--to ce biti doslovno variabla koju ce controller dati preko registra viewu-->
            Don't miss out on something great!
            Join your friends and show them what you can do!
    </h3>

    <img id="sah" src="sah.jpg">
             
    </div>

    <div id = "por" class="poruka">
		
        <h2>
            <?php
                //$message = 'There is no user with that username';
                if($message == ''){
                    ?>
                    <style>
                        .poruka{
                            visibility: hidden;
                        }
                    </style>
                    <?php
                }
                if( $message !== '' )
                    echo '<p>' . $message . '</p>';
            ?>
        </h2>
    </div>

    <div id = "vid" class = "video">
        <h2>Don't know how to play?
        Check out this video:
        </h2>
        <list class="lista">
            <li><a href="https://www.youtube.com/watch?v=fKxG8KjH1Qg" target="_blank" rel="noopener noreferrer">video</a></li>
            <li><a href="https://www.instructables.com/Playing-Chess/" target="_blank" rel="noopener noreferrer">instructions</a></li>
            <li><a href="https://en.wikipedia.org/wiki/Rules_of_chess" target="_blank" rel="noopener noreferrer">rules of chess - Wikipedia</a></li>
        </list>
    </div>

	</body>
	</html>
	<?php
}


// Ispiše poruku za uspješno ulogiranog korisnika.
function draw_succ_login()
{
	
    header('Location: main2.html'); //dio controllera, treba biti poseban view
	
}

function draw_Register($message = ''){   //poseban view (treci)
    ?>
<!DOCTYPE html>
	<html>
	<head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="style.css">
		<meta charset="utf8" />
		<title>Register</title>
	</head>
	<body>
    
    <div class="login-content">
		<form id="login" method="post" action="<?php echo htmlentities($_SERVER['PHP_SELF']); ?>">
            <h2>Register</h2>
		
			<br />
			<input class= "box" type="text" name="username" placeholder="username"/>
			<br />
			<br />
			<input class= "box" type="password" name="password" placeholder="password" />
			<br />
            <br />
            <input class= "box" type="email" name="email" placeholder="e-mail" />
            <br />
            <br />
			<button type="submit" class="gumb1" name="gumb" value="login">Register</button>
            <br /><br />

		</form>
    </div> <!-- moramo nekako moci nazad na login ako smo zalutali na register bez da idemo back-->
    

    <div class="join-us"> <!-- ovo se moze staviti u poseban fajl i includeati u viewove koji ga trebaju, da se smanji ponavljanje-->
        <h2>Don't have an account?</h2>
    
    <h3> 
            
            Already #thismanyusers has it.
            Don't miss out on something great!
            Join your friends and show them what you can do!
    </h3>

    <img id="sah" src="sah.jpg">
             
    </div>

    <div class="poruka">
		
        <h2>
            <?php
                if( $message !== '' )
                    echo '<p>' . $message . '</p>';
            ?>
        </h2>
    </div>
        
	</body>
</html>

<?php
}

function draw_succ_registered() //isto, controller radi, samo treba napisati view koji ce se pojaviti kad je sucessful
{
	
    header('Location: chess.php');
	
} 

?>
