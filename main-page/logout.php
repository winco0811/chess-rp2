<?php

session_start();

/*echo 'Are you sure you want to logout? . <br><br>';*/

//echo '<a href="stranica.php">Return to the main page</a> . <br><br>';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <link rel="stylesheet" href="logout.css">
    <meta charset="UTF-8">
    <title>Logout</title>
    <style>
</style>
</head>
<body>

<div id = "logo">
    <h2>Are you sure you want to logout?</h2><br><br>
    <div>
    <a href="main2.html" class="button1"><h3>Return to the main page</h3></a>
    <a href="../view/pocetna.php" class="button2"><h3>Log out</h3></a>
    </div>
</div>

</body>
</html>