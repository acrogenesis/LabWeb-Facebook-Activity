<?php
$servername = "127.0.0.1";
$username = "root";
$password = "";
$db_name = "facebook";

// Create connection
$conn = new mysqli($servername, $username, $password, $db_name);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
