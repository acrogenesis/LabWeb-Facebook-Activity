<?php
$servername = "127.0.0.1";
$username = "root";
$password = "";
$db_name = "facebook";

// Create connection
$conn = @new mysqli($servername, $username, $password, $db_name);

// Check connection
if ($conn->connect_error) {
  http_response_code(503);
  die(json_encode(['error' => 503]));
}
?>
