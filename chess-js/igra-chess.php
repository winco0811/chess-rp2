<!DOCTYPE html>

<!--
crni top - &#9820;
crni konj - &#9822;
crni lovac - &#9821;
crna kraljica - &#9819;
crni kralj - &#9818;
crni pijun - &#9823;
bijeli top - &#9814;
bijeli konj - &#9816;
bijeli lovac - &#9815;
bijeli kraljica - &#9813;
bijeli kralj - &#9812;
bijeli pijun - &#9817;
-->


<html>
<head>
	<meta charset="utf8" />
	<title>Chess</title>
	<link rel="stylesheet" href="game_style.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.js"></script>
	<script src="chess.js"></script>
</head>
<body>
<?php
session_start();
$piece_color=$_SESSION["color"];
$game_id=$_SESSION["gameId"];
?>
	<table class="ploca">
		<tr>
			<td class="white-row" id="a8">&#9820;</td>
			<td class="white-row" id="b8">&#9822;</td>
			<td class="white-row" id="c8">&#9821;</td>
			<td class="white-row" id="d8">&#9819;</td>
			<td class="white-row" id="e8">&#9818;</td>
			<td class="white-row" id="f8">&#9821;</td>
			<td class="white-row" id="g8">&#9822;</td>
			<td class="white-row" id="h8">&#9820;</td>
		</tr>
		<tr>
                        <td class="black-row" id="a7">&#9823;</td>
                        <td class="black-row" id="b7">&#9823;</td>
                        <td class="black-row" id="c7">&#9823;</td>
                        <td class="black-row" id="d7">&#9823;</td>
                        <td class="black-row" id="e7">&#9823;</td>
                        <td class="black-row" id="f7">&#9823;</td>
                        <td class="black-row" id="g7">&#9823;</td>
                        <td class="black-row" id="h7">&#9823;</td>
                </tr>

<?php 
for ($j = 0; $j < 4; $j++) {
		echo "<tr>\r\n";
	for ($i = 0; $i < 8; $i++) {
		echo "<td class=";
		echo ($j%2)?'"black-row"':'"white-row"';
	       	echo ' id="' . chr(ord('a')+$i); 
		echo strval(6-$j) . '"></td>';
		echo "\r\n";
	}
		echo "</tr>\r\n";
}

?>

		<tr>
                        <td class="white-row" id="a2">&#9817;</td>
                        <td class="white-row" id="b2">&#9817;</td>
                        <td class="white-row" id="c2">&#9817;</td>
                        <td class="white-row" id="d2">&#9817;</td>
                        <td class="white-row" id="e2">&#9817;</td>
                        <td class="white-row" id="f2">&#9817;</td>
                        <td class="white-row" id="g2">&#9817;</td>
                        <td class="white-row" id="h2">&#9817;</td>
                </tr>
                <tr>
                        <td class="black-row" id="a1">&#9814;</td>
                        <td class="black-row" id="b1">&#9816;</td>
                        <td class="black-row" id="c1">&#9815;</td>
                        <td class="black-row" id="d1">&#9813;</td>
                        <td class="black-row" id="e1">&#9812;</td>
                        <td class="black-row" id="f1">&#9815;</td>
                        <td class="black-row" id="g1">&#9816;</td>
                        <td class="black-row" id="h1">&#9814;</td>
                </tr>
	</table>
<div id="overlay">
	<table class="ploca prom_ploca">
		<tr>
		<td class="promocija" id="pq"><?php if ($piece_color == "white") {echo "&#9813;";} else {echo "&#9819;";}?></td>
		<td class="promocija" id="pr"><?php if ($piece_color == "white") {echo "&#9814;";} else {echo "&#9820;";}?></td>
		<td class="promocija" id="pb"><?php if ($piece_color == "white") {echo "&#9815;";} else {echo "&#9821;";}?></td>
		<td class="promocija" id="pn"><?php if ($piece_color == "white") {echo "&#9816;";} else {echo "&#9822;";}?></td>
		</tr>
	</table>	
</div> 
</body>
</html>
