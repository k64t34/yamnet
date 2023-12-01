<!DOCTYPE html><html lang='ru'>
<head>
<link rel="icon" type="image/ico" href="favicon.ico"/>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link rel="stylesheet" type="text/css" href="light.css">
<title>Обработка формы 1 </title>
</head>
<body>	
<?php
// define variables and set to empty values
$name = $email = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $name = GetInput($_POST["name"]);
  $email = GetInput($_POST["email"]);
}

echo "name=\"$name\"<br>";
echo "email=\"$email\"<br>";


function GetInput($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}
?>

</body>
</html>
