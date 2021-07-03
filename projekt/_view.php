<!DOCTYPE html>
	<html>
	<head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="board.css">
		<meta charset="utf8" />
		<title>Main page</title>
	</head>
	<body>
        <?php error_reporting(0); ?>
        <div class="chess-board">
        
        <table class=board border=1> <tbody> <th></th>
            <th>a</th>
            <th>b</th>
            <th>c</th>
            <th>d</th>
            <th>e</th>
            <th>f</th>
            <th>g</th>
            <th>h</th>
            <tr><th>8</th>
            <form action='' method=post><td><input class=button-<?php echo $color["a8"];?> name="a8" type=submit value=<?php echo $gamestate["a8"];?>></td><?php echo $hidden_var;?></form>
            <form action='' method=post><td><input class=button-<?php echo $color["b8"];?> name="b8" type=submit value=<?php echo $gamestate["b8"];?>></td><?php echo $hidden_var;?></form>
            <form action='' method=post><td><input class=button-<?php echo $color["c8"];?> name="c8" type=submit value=<?php echo $gamestate["c8"];?>></td><?php echo $hidden_var;?></form>
            <form action='' method=post><td><input class=button-<?php echo $color["d8"];?> name="d8" type=submit value=<?php echo $gamestate["d8"];?>></td><?php echo $hidden_var;?></form>
            <form action='' method=post><td><input class=button-<?php echo $color["e8"];?> name="e8" type=submit value=<?php echo $gamestate["e8"];?>></td><?php echo $hidden_var;?></form>
            <form action='' method=post><td><input class=button-<?php echo $color["f8"];?> name="f8" type=submit value=<?php echo $gamestate["f8"];?>></td><?php echo $hidden_var;?></form>
            <form action='' method=post><td><input class=button-<?php echo $color["g8"];?> name="g8" type=submit value=<?php echo $gamestate["g8"];?>></td><?php echo $hidden_var;?></form>
            <form action='' method=post><td><input class=button-<?php echo $color["h8"];?> name="h8" type=submit value=<?php echo $gamestate["h8"];?>></td><?php echo $hidden_var;?></form>
            <tr><th>7</th>
            <form action='' method=post><td><input class=button-<?php echo $color["a7"];?> name="a7" type=submit value=<?php echo $gamestate["a7"];?>></td><?php echo $hidden_var;?></form>
            <form action='' method=post><td><input class=button-<?php echo $color["b7"];?> name="b7" type=submit value=<?php echo $gamestate["b7"];?>></td><?php echo $hidden_var;?></form>
            <form action='' method=post><td><input class=button-<?php echo $color["c7"];?> name="c7" type=submit value=<?php echo $gamestate["c7"];?>></td><?php echo $hidden_var;?></form>
            <form action='' method=post><td><input class=button-<?php echo $color["d7"];?> name="d7" type=submit value=<?php echo $gamestate["d7"];?>></td><?php echo $hidden_var;?></form>
            <form action='' method=post><td><input class=button-<?php echo $color["e7"];?> name="e7" type=submit value=<?php echo $gamestate["e7"];?>></td><?php echo $hidden_var;?></form>
            <form action='' method=post><td><input class=button-<?php echo $color["f7"];?> name="f7" type=submit value=<?php echo $gamestate["f7"];?>></td><?php echo $hidden_var;?></form>
            <form action='' method=post><td><input class=button-<?php echo $color["g7"];?> name="g7" type=submit value=<?php echo $gamestate["g7"];?>></td><?php echo $hidden_var;?></form>
            <form action='' method=post><td><input class=button-<?php echo $color["h7"];?> name="h7" type=submit value=<?php echo $gamestate["h7"];?>></td><?php echo $hidden_var;?></form>
            <tr><th>6</th>
            <form action='' method=post><td><input class=button-<?php echo $color["a6"];?> name="a6" type=submit value=<?php echo $gamestate["a6"];?>></td><?php echo $hidden_var;?></form>
            <form action='' method=post><td><input class=button-<?php echo $color["b6"];?> name="b6" type=submit value=<?php echo $gamestate["b6"];?>></td><?php echo $hidden_var;?></form>
            <form action='' method=post><td><input class=button-<?php echo $color["c6"];?> name="c6" type=submit value=<?php echo $gamestate["c6"];?>></td><?php echo $hidden_var;?></form>
            <form action='' method=post><td><input class=button-<?php echo $color["d6"];?> name="d6" type=submit value=<?php echo $gamestate["d6"];?>></td><?php echo $hidden_var;?></form>
            <form action='' method=post><td><input class=button-<?php echo $color["e6"];?> name="e6" type=submit value=<?php echo $gamestate["e6"];?>></td><?php echo $hidden_var;?></form>
            <form action='' method=post><td><input class=button-<?php echo $color["f6"];?> name="f6" type=submit value=<?php echo $gamestate["f6"];?>></td><?php echo $hidden_var;?></form>
            <form action='' method=post><td><input class=button-<?php echo $color["g6"];?> name="g6" type=submit value=<?php echo $gamestate["g6"];?>></td><?php echo $hidden_var;?></form>
            <form action='' method=post><td><input class=button-<?php echo $color["h6"];?> name="h6" type=submit value=<?php echo $gamestate["h6"];?>></td><?php echo $hidden_var;?></form>
            <tr><th>5</th>
            <form action='' method=post><td><input class=button-<?php echo $color["a5"];?> name="a5" type=submit value=<?php echo $gamestate["a5"];?>></td><?php echo $hidden_var;?></form>
            <form action='' method=post><td><input class=button-<?php echo $color["b5"];?> name="b5" type=submit value=<?php echo $gamestate["b5"];?>></td><?php echo $hidden_var;?></form>
            <form action='' method=post><td><input class=button-<?php echo $color["c5"];?> name="c5" type=submit value=<?php echo $gamestate["c5"];?>></td><?php echo $hidden_var;?></form>
            <form action='' method=post><td><input class=button-<?php echo $color["d5"];?> name="d5" type=submit value=<?php echo $gamestate["d5"];?>></td><?php echo $hidden_var;?></form>
            <form action='' method=post><td><input class=button-<?php echo $color["e5"];?> name="e5" type=submit value=<?php echo $gamestate["e5"];?>></td><?php echo $hidden_var;?></form>
            <form action='' method=post><td><input class=button-<?php echo $color["f5"];?> name="f5" type=submit value=<?php echo $gamestate["f5"];?>></td><?php echo $hidden_var;?></form>
            <form action='' method=post><td><input class=button-<?php echo $color["g5"];?> name="g5" type=submit value=<?php echo $gamestate["g5"];?>></td><?php echo $hidden_var;?></form>
            <form action='' method=post><td><input class=button-<?php echo $color["h5"];?> name="h5" type=submit value=<?php echo $gamestate["h5"];?>></td><?php echo $hidden_var;?></form>
            <tr><th>4</th>
            <form action='' method=post><td><input class=button-<?php echo $color["a4"];?> name="a4" type=submit value=<?php echo $gamestate["a4"];?>></td><?php echo $hidden_var;?></form>
            <form action='' method=post><td><input class=button-<?php echo $color["b4"];?> name="b4" type=submit value=<?php echo $gamestate["b4"];?>></td><?php echo $hidden_var;?></form>
            <form action='' method=post><td><input class=button-<?php echo $color["c4"];?> name="c4" type=submit value=<?php echo $gamestate["c4"];?>></td><?php echo $hidden_var;?></form>
            <form action='' method=post><td><input class=button-<?php echo $color["d4"];?> name="d4" type=submit value=<?php echo $gamestate["d4"];?>></td><?php echo $hidden_var;?></form>
            <form action='' method=post><td><input class=button-<?php echo $color["e4"];?> name="e4" type=submit value=<?php echo $gamestate["e4"];?>></td><?php echo $hidden_var;?></form>
            <form action='' method=post><td><input class=button-<?php echo $color["f4"];?> name="f4" type=submit value=<?php echo $gamestate["f4"];?>></td><?php echo $hidden_var;?></form>
            <form action='' method=post><td><input class=button-<?php echo $color["g4"];?> name="g4" type=submit value=<?php echo $gamestate["g4"];?>></td><?php echo $hidden_var;?></form>
            <form action='' method=post><td><input class=button-<?php echo $color["h4"];?> name="h4" type=submit value=<?php echo $gamestate["h4"];?>></td><?php echo $hidden_var;?></form>
            <tr><th>3</th>
            <form action='' method=post><td><input class=button-<?php echo $color["a3"];?> name="a3" type=submit value=<?php echo $gamestate["a3"];?>></td><?php echo $hidden_var;?></form>
            <form action='' method=post><td><input class=button-<?php echo $color["b3"];?> name="b3" type=submit value=<?php echo $gamestate["b3"];?>></td><?php echo $hidden_var;?></form>
            <form action='' method=post><td><input class=button-<?php echo $color["c3"];?> name="c3" type=submit value=<?php echo $gamestate["c3"];?>></td><?php echo $hidden_var;?></form>
            <form action='' method=post><td><input class=button-<?php echo $color["d3"];?> name="d3" type=submit value=<?php echo $gamestate["d3"];?>></td><?php echo $hidden_var;?></form>
            <form action='' method=post><td><input class=button-<?php echo $color["e3"];?> name="e3" type=submit value=<?php echo $gamestate["e3"];?>></td><?php echo $hidden_var;?></form>
            <form action='' method=post><td><input class=button-<?php echo $color["f3"];?> name="f3" type=submit value=<?php echo $gamestate["f3"];?>></td><?php echo $hidden_var;?></form>
            <form action='' method=post><td><input class=button-<?php echo $color["g3"];?> name="g3" type=submit value=<?php echo $gamestate["g3"];?>></td><?php echo $hidden_var;?></form>
            <form action='' method=post><td><input class=button-<?php echo $color["h3"];?> name="h3" type=submit value=<?php echo $gamestate["h3"];?>></td><?php echo $hidden_var;?></form>
            <tr><th>2</th>
            <form action='' method=post><td><input class=button-<?php echo $color["a2"];?> name="a2" type=submit value=<?php echo $gamestate["a2"];?>></td><?php echo $hidden_var;?></form>
            <form action='' method=post><td><input class=button-<?php echo $color["b2"];?> name="b2" type=submit value=<?php echo $gamestate["b2"];?>></td><?php echo $hidden_var;?></form>
            <form action='' method=post><td><input class=button-<?php echo $color["c2"];?> name="c2" type=submit value=<?php echo $gamestate["c2"];?>></td><?php echo $hidden_var;?></form>
            <form action='' method=post><td><input class=button-<?php echo $color["d2"];?> name="d2" type=submit value=<?php echo $gamestate["d2"];?>></td><?php echo $hidden_var;?></form>
            <form action='' method=post><td><input class=button-<?php echo $color["e2"];?> name="e2" type=submit value=<?php echo $gamestate["e2"];?>></td><?php echo $hidden_var;?></form>
            <form action='' method=post><td><input class=button-<?php echo $color["f2"];?> name="f2" type=submit value=<?php echo $gamestate["f2"];?>></td><?php echo $hidden_var;?></form>
            <form action='' method=post><td><input class=button-<?php echo $color["g2"];?> name="g2" type=submit value=<?php echo $gamestate["g2"];?>></td><?php echo $hidden_var;?></form>
            <form action='' method=post><td><input class=button-<?php echo $color["h2"];?> name="h2" type=submit value=<?php echo $gamestate["h2"];?>></td><?php echo $hidden_var;?></form>
            <tr><th>1</th>
            <form action='' method=post><td><input class=button-<?php echo $color["a1"];?> name="a1" type=submit value=<?php echo $gamestate["a1"];?>></td><?php echo $hidden_var;?></form>
            <form action='' method=post><td><input class=button-<?php echo $color["b1"];?> name="b1" type=submit value=<?php echo $gamestate["b1"];?>></td><?php echo $hidden_var;?></form>
            <form action='' method=post><td><input class=button-<?php echo $color["c1"];?> name="c1" type=submit value=<?php echo $gamestate["c1"];?>></td><?php echo $hidden_var;?></form>
            <form action='' method=post><td><input class=button-<?php echo $color["d1"];?> name="d1" type=submit value=<?php echo $gamestate["d1"];?>></td><?php echo $hidden_var;?></form>
            <form action='' method=post><td><input class=button-<?php echo $color["e1"];?> name="e1" type=submit value=<?php echo $gamestate["e1"];?>></td><?php echo $hidden_var;?></form>
            <form action='' method=post><td><input class=button-<?php echo $color["f1"];?> name="f1" type=submit value=<?php echo $gamestate["f1"];?>></td><?php echo $hidden_var;?></form>
            <form action='' method=post><td><input class=button-<?php echo $color["g1"];?> name="g1" type=submit value=<?php echo $gamestate["g1"];?>></td><?php echo $hidden_var;?></form>
            <form action='' method=post><td><input class=button-<?php echo $color["h1"];?> name="h1" type=submit value=<?php echo $gamestate["h1"];?>></td><?php echo $hidden_var;?></form>

                
    </div>
    </body>
    </html>
