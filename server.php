<?php
include "db_config.php";

$message = $_POST['message'];
$author = $_POST['author'];

$sql = "INSERT INTO posts (message, author)
VALUES ('$message', '$author')";

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
