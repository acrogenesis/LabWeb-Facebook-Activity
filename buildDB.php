<?php
$vals = ['db_user' => 'root', 'db_pass' => '', 'db_host' => '127.0.0.1', 'db_name' => 'facebook'];

$servername = '127.0.0.1';
$username = 'root';
$password = '';
$db_name = 'facebook';

// Create connection
$conn = new mysqli($servername, $username, $password);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Create database
$sql = "CREATE DATABASE $db_name";
if ($conn->query($sql) === TRUE) {
    echo "Database created successfully";
} else {
    echo "Error creating database: " . $conn->error;
}
$conn->close();
$conn = @new mysqli($servername, $username, $password, $db_name);
$sql = "CREATE TABLE `posts` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `author` varchar(255) NOT NULL,
  `message` varchar(255) NOT NULL,
  `like` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8;";

if ($conn->query($sql) === TRUE) {
    echo "Table structure created successfully";
} else {
    echo "Error creating table: " . $conn->error;
}

$conn->close();

echo 'Done';
?>
