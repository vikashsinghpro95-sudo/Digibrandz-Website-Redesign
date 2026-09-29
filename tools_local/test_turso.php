<?php
require_once __DIR__ . '/private/db.php';
$pdo = get_db_connection();
try {
    $stmt = $pdo->prepare("INSERT INTO clients (name, logo, display_order) VALUES (?, ?, ?)");
    $stmt->execute(['Test Client', '/test.png', 1]);
    echo "Success!\n";
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
