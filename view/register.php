<?php
function draw_registration( $message = '' )
{
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

	<form id="login" method="post" action="processRegistration.php">
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
		<button type="submit" class="gumb2" name="gumb" value="register">Register</button>
        <br /><br />
	</form>

    <p id="link2"><a href="pocetna.php">Log in page</a></p>
</div>
    

<div class="join-us">
    <h2>Don't have an account?</h2>
    
<h3> 
            
        Don't miss out on something great!
        Join your friends and show them what you can do!
</h3>

    <img id="sah" src="sah.jpg">
             
</div>

<div class="poruka">
	
<h2>
    <?php
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

        
	</body>
</html>

<?php } 

?>