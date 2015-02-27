<?php
include "db_config.php";

$message = $_POST['message'];
$author = $_POST['author'];
http_response_code(501);
try {
  $stmt = $conn->prepare('INSERT INTO  posts (message, author) VALUES (?, ?)');
  $stmt->bind_param('ss', $message, $author);
  if ($stmt->execute() === TRUE) {
    http_response_code(200);
    echo "Record updated successfully";
  } else {
    die(json_encode(['error' => 501]));
  }
} catch(Exception $e) {
  die(json_encode(['error' => 501]));
}
$conn->close();
?>
