<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="style.css">
	<meta charset="utf8" />
	<title>Forgotten password</title>
</head>
<body>

<div class="login-content">
	<form id="login" method="post" action="<?php echo htmlentities($_SERVER['PHP_SELF']); ?>">
        <h2>Forgotten password</h2>
		<p>Type in your email adress:</p>
		<br />
		<input class= "box" type="text" name="email" placeholder="email"/>
		<br />
		<button type="submit" class="gumb" name="gumb" value="login">Submit</button>
        <br /><br />
        <p id="link2"><a href="chess.php">Log in page</a></p>
        

	</form>
</div>
    

<div class="join-us">
    <h2>Don't have an account?</h2>
    
<h3> 
            
        Already #thismany has it.
        Don't miss out on something great!
        Join your friends and show them what you can do!
</h3>

<img id="sah" src="sah.jpg">
             
</div>

<div id = "por" class="poruka">
		
    <h2>
        <?php
            $message = '';
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
<div id="vid" class="video">
<h2>Don't know how to play?
    Check out this resources:
    </h2>

    <list class="lista">
    <li><a href="https://www.youtube.com/watch?v=fKxG8KjH1Qg" target="_blank" rel="noopener noreferrer">video</a></li>
    <li><a href="https://www.instructables.com/Playing-Chess/" target="_blank" rel="noopener noreferrer">instructions</a></li>
    <li><a href="https://en.wikipedia.org/wiki/Rules_of_chess" target="_blank" rel="noopener noreferrer">rules of chess - Wikipedia</a></li>
    </list>
</div>
</body>
</html>