<?php 
if (!isset($_SESSION['session']) )
{
session_start();	
$_SESSION["session"] = 1;
}	

require_once('yapikey.php');?>
<!DOCTYPE html><html lang='ru'>
<head>
<link rel="icon" type="image/ico" href="favicon.ico"/>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />		
<link rel="stylesheet" type="text/css" href="light.css">
<script src="yamap.js" type="text/javascript"></script>
<script src="https://api-maps.yandex.ru/2.1/?lang=ru_RU&amp;apikey=<?=$yapikey?>" type="text/javascript"></script>
<title>Карта опасных мест в городе Пятигорске</title>
</head>
<body>	
	<div id="map" class="yamap" style="width: 100%; height: 100%; padding: 0; margin: 0;" ></div>	
</body>
</html>

<!--
Согласно действующему в России ГОСТ 50597–93, размеры ям не должны быть больше 15 см по длине, 60 см в ширину и 5 см в глубину. Все ямы, которые больше хотя бы по одному параметру, должны быть обозначены дорожными знаками, а в условиях недостаточной видимости — заграждением с сигнальными огнями.

Добавляется фото на сайт и отправляется заявление в местное ГИБДД. На устранение ямы дается 37 дней. Если срок истек, а яма не заделана то заявление передается в прокуратуру.

 -->