
<?php
function draw_LogIN( $message = '' )
{
	?>
	<!DOCTYPE html>
	<html>
	<head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="style.css">
		<meta charset="utf8" />
		<title>Login</title>
	</head>
	<body>
    
    <div class="login-content">
		<form id="login" method="post" action="<?php echo htmlentities($_SERVER['PHP_SELF']); ?>">
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
            <button type="submit" class="gumb2" name="gumb" value="login">Register</button>
            <button type="submit" class="gumb3" name="gumb" value="login">Forgot password?</button>

		</form>
    </div>
    

    <div class="join-us">
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
	
    header('Location: stranica.php');
	
}

function draw_Register($message = ''){
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
    </div>
    

    <div class="join-us">
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

function draw_succ_registered()
{
	
    header('Location: chess.php');
	
} 
?>