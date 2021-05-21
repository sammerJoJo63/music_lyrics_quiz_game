<?php
require '../config.php';

$mysqli = new mysqli(HOST, USERNAME, PASSWORD, DBNAME);

$r = $mysqli->query("SELECT * FROM lyrics_quiz WHERE shown = 1");

$currLyric = array();
if (mysqli_num_rows($r) > 0) {
  while($row = mysqli_fetch_assoc($r)) {

    $currLyric[] = $row;

    echo json_encode($currLyric);
   }

} else {
  echo "0 results";
}

mysqli_close($conn);

?>