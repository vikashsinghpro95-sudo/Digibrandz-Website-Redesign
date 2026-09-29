<?php
require_once __DIR__ . '/private/db.php';

$pdo = get_db_connection();

$pdo->exec("CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'editor',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_login DATETIME
)");

$username = getenv('ADMIN_USERNAME') ?: 'admin';
$email = getenv('ADMIN_EMAIL') ?: 'admin@digibrandz.com';
$password = getenv('ADMIN_PASSWORD');

if (!$password) {
    fwrite(STDERR, "Set ADMIN_PASSWORD in the environment (or .env) before seeding an admin user.\n");
    exit(1);
}

$hash = password_hash($password, PASSWORD_DEFAULT);

$check = $pdo->prepare("SELECT COUNT(*) as count FROM users WHERE username = ?");
$check->execute([$username]);
$res = $check->fetch();
$count = (int) ($res['count'] ?? 0);

if ($count === 0) {
    $stmt = $pdo->prepare("INSERT INTO users (username, email, password_hash, role) VALUES (?, ?, ?, 'superadmin')");
    $stmt->execute([$username, $email, $hash]);
    echo "Created superadmin user: {$username}\n";
} elseif (getenv('FORCE_ADMIN_PASSWORD') === '1') {
    $stmt = $pdo->prepare("UPDATE users SET password_hash = ? WHERE username = ?");
    $stmt->execute([$hash, $username]);
    echo "Updated password for user: {$username}\n";
} else {
    echo "Admin user '{$username}' already exists. Set FORCE_ADMIN_PASSWORD=1 to reset.\n";
}
