<?php
include "db_config.php";
sleep(1000000);

$id = $_POST['id'];
$bool = $_POST['bool'];
$stmt = $conn->prepare('UPDATE posts SET `like` = ? WHERE id = ?');
$stmt->bind_param('ii', $bool, $id);

if ($stmt->execute() === TRUE) {
    echo "Record updated successfully";
} else {
    echo "Error updating record: " . $conn->error;
}

$conn->close();
?>
