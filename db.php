<?php
//https://codereview.stackexchange.com/questions/273542/using-php-and-js-to-fetch-data-for-an-entry
//https://www.mikestreety.co.uk/blog/how-to-use-fetch-in-javascript-to-get-or-post-data/

require_once('pass.php');

header("Content-Type: application/json; charset=UTF-8");
/*header("Access-Control-Allow-Origin: *");
    if ($_SERVER['REQUEST_METHOD'] != 'POST' || !isset($_POST['entryID'])){
        exit('Bad request data');
    }*/
$result = "{\"Placemark\": [\n";
try {  
  $db = new PDO("mysql:host=$servername;dbname=$database", $username, $password);
  $first=true;
  foreach($db->query("SELECT * FROM pothole") as $row) 
  {
	if ($first) $first=false; else $result=$result.",\n";	
    $result=$result."{\"id\":{$row['id']},\"latitude\":{$row['latitude']},\"longitude\":{$row['longitude']}}";    
	//{$row['name']}
  }  
} catch (PDOException $e) {
    print "Error!: " . $e->getMessage() . "<br/>";
    die();
}
echo $result."\n]}";
//100% пример echo '{"Placemark": [{"id":1,"latitude":44.027111,"longitude":43.073238},{"id":2,"latitude":44.025133,"longitude":43.0716}]}';
?>