
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
		<form id="login" method="post" action="pocetna.php"> <!-- mora na controller, ne na sebe -->
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
            
            Already #thismanyusers has it. <!--to ce biti doslovno variabla koju ce controller dati preko registra viewu-->
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

    <div class="video">
    <h2>Don't know how to play?
        Check out this video:
        </h2>
    <video width="320" height="240" controls>
    <source src="howto.mp4">
    </video>
    </div>

	</body>
	</html>
	<?php
}


// Ispiše poruku za uspješno ulogiranog korisnika.
function draw_succ_login()
{
	
    header('Location: stranica.php'); //dio controllera, treba biti poseban view
	
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
