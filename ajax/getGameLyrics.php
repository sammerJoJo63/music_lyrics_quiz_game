<?php
require 'config.php';
$conn = mysqli_connect(HOST, USERNAME, PASSWORD, DBNAME);
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}


$tablename = TABLENAME;

$id = $_GET['id'];
$sql = "SELECT * FROM $tablename WHERE id = $id";

$result = mysqli_query($conn, $sql);
$q = array();
if (mysqli_num_rows($result) > 0) {
  while($row = mysqli_fetch_assoc($result)) {
	$q[] = $row;
	echo json_encode($q);
   }
} else {
  echo "0 results";
}
mysqli_close($conn);
?>