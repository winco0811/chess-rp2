<!DOCTYPE html>
	<html>
	<head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="style_history.css">
		<meta charset="utf8" />
		<title>History</title>
	</head>
	<body>
    
    <div class="naslov">
        <h1>Your game history</h1>             
    </div>

    <div class="lista">
        <ul>
            <?php 
                $history="h4 b5 c6 ddddddddddddddddd d";
                for($i = 0; $i < 150; $i++){
              ?>  <li> <?php echo $history; ?> </li>
              <?php } ?>
        </ul>
    </div>
    <div>
        <img id="sah1" src="board.png">
        <img id="sah2" src="board.png">
    </div>

    <p id="link"><a href="main2.php">Return to the main page</a></p>
    </body>
	</html>