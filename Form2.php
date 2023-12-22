<?php 
/*if (!isset($_SESSION['session']) )
{
session_start();	
$_SESSION["session"] = 1;
}*/
require_once('yapikey.php');?>
<!DOCTYPE html><html lang='ru'>
<head>
<link rel="icon" type="image/ico" href="favicon.ico"/>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link rel="stylesheet" type="text/css" href="light.css">
<script src="yamap.form2.js" type="text/javascript"></script>
<script src="https://api-maps.yandex.ru/2.1/?lang=ru_RU&amp;apikey=<?=$yapikey?>" type="text/javascript"></script>
<title>Дефект на дороге</title>
</head>
<body>	
<h1>Дефект на дороге</h1>
	<form action="ResponseForm2.PHP"  method="post" >
	<table width="50%" id="Address">
	<tr width="20%"><td>Адрес</td><td>  <textarea name="address" id="address" rows="2"> г.Пятигорск </textarea></td></tr>
	<tr><td>Широта</td><td> <input type="text" name="latitude"  id="latitude"  value="44.036056" onchange="OnChange()"></td></tr>
	<tr><td>Долгота</td><td><input type="text" name="longitude" id="longitude" value="43.066394" onchange="OnChange()"></td></tr>
	<!--<tr><td>Дата подачи обращения </td><td><input type="text" name="date_appeal" ></td></tr>	-->
	<tr><td colspan="2" style="text-align:center;"><input type="submit" value="Отправить"></td></tr>
	</table>	
	</form>	
	<div id="map" class="yamap" style="width: 100%; height: 50%; padding: 0; margin: 0;" ></div>
</body>
</html>

