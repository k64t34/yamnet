<?php 
//https://habr.com/ru/articles/137664/
//https://phpfaq.ru/pdo
if (!isset($_SESSION['session']) )
{
require_once('form2.php');
exit();
}

require_once('pass.php');
$result=false;
$address = $latitude = $longitude = "";// define variables and set to empty values
if ($_SERVER["REQUEST_METHOD"] == "POST")
	{	
	//var_dump($_POST["address"]);echo("<br>");	
	//var_dump($_POST["latitude"]);echo("<br>");	
	//var_dump($_POST["longitude"]);echo("<br>");	
	
	$address   = GetInput($_POST["address"]);
	$latitude  = floatval(GetInput($_POST["latitude" ]));
	$longitude = floatval(GetInput($_POST["longitude"]));
	if ( 43.999061 > $latitude  || $latitude   < 44.079634 )   die();
    if ( 42.934643 > $longitude ||  $longitude < 43.233336 )   die();

	
	//var_dump($address);echo("<br>");	
	//var_dump($latitude);echo("<br>");	
	//var_dump($longitude);echo("<br>");	
  
	try {			
		$conn = new PDO("mysql:host=$servername;dbname=$database", $username, $password);		
		$sql="INSERT INTO pothole (address_breach, latitude,longitude) VALUES (:address ,:latitude,:longitude )";
		$statement = $conn->prepare($sql);
		$statement->bindValue(":address",  $address);
		$statement->bindValue(":latitude", $latitude);
		$statement->bindValue(":longitude",$longitude);
		$affectedRowsNumber=$statement->execute();				
		//var_dump($affectedRowsNumber);
		//error_log($_SERVER['PHP_SELF']." ".$affectedRowsNumber);		
		if (!$affectedRowsNumber) throw new Exception($sql." ".$address.", ".$latitude.", ".$longitude);
		$result=true;
		}  
	catch (PDOException $e) {
		error_log($_SERVER['PHP_SELF'].$e->getMessage());
		die();
		}   
	}


function GetInput($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}

function WriteLog($data) {
error_log($_SERVER['PHP_SELF']."\t".$data);
}
?>
<!DOCTYPE html><html lang='ru'>
<head>
<link rel="icon" type="image/ico" href="favicon.ico"/>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="refresh" content="60;URL=<?
if ($result) echo "index.php";
else echo "form2.php";
?>" />
</head>
<body>
	<center>
		<a href="index.php"><H1>Карта нарушений безопасности дорожного движения в городе Пятигорске </H1></a>
	</center>
</body>
</html>


