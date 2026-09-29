<?php
// Prevent direct access
if (basename($_SERVER['PHP_SELF']) === basename(__FILE__)) {
    header("HTTP/1.1 403 Forbidden");
    exit("Direct access not allowed.");
}

// Global Configuration
define('APP_ENV', 'production'); // 'development' or 'production'
define('BASE_DIR', dirname(__DIR__));
define('PRIVATE_DIR', __DIR__);

$publicDir = BASE_DIR . '/public_html';
if (!is_dir($publicDir)) {
    $publicDir = BASE_DIR . '/public';
}
if (!is_dir($publicDir)) {
    $publicDir = BASE_DIR; // Hostinger: private/ sits inside the web root
}
define('PUBLIC_DIR', $publicDir);
define('UPLOADS_DIR', PUBLIC_DIR . '/uploads');
define('DB_PATH', PRIVATE_DIR . '/database.sqlite');
define('LOGS_DIR', PRIVATE_DIR . '/logs');

// Session configuration
define('SESSION_LIFETIME', 86400); // 1 day
define('SESSION_NAME', 'DG_ADMIN_SESSION');

// Error Reporting Setup
if (APP_ENV === 'development') {
    error_reporting(E_ALL);
    ini_set('display_errors', '1');
} else {
    error_reporting(E_ALL);
    ini_set('display_errors', '0');
    ini_set('log_errors', '1');
    ini_set('error_log', LOGS_DIR . '/php-error.log');
}

// Security Headers Setup
function set_security_headers() {
    header("X-Content-Type-Options: nosniff");
    header("X-Frame-Options: SAMEORIGIN");
    header("X-XSS-Protection: 1; mode=block");
    header("Strict-Transport-Security: max-age=31536000; includeSubDomains");
    header("Referrer-Policy: strict-origin-when-cross-origin");
}
