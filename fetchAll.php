<?php
include "db_config.php";

header('Content-Type: application/json');
$sql = "SELECT * FROM posts";

$result = $conn->query($sql);
if (!$result) {
  http_response_code(501);
  die(json_encode(['error' => 501]));
}
$response = array();
while($row = $result->fetch_assoc()) {
  array_push($response, $row);
}
echo json_encode($response);
// echo "Retrieved data successfully.";

$conn->close();
?>
