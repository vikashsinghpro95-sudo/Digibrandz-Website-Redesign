<?php
// Prevent direct access
if (basename($_SERVER['PHP_SELF']) === basename(__FILE__)) {
    header("HTTP/1.1 403 Forbidden");
    exit("Direct access not allowed.");
}

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/env.php';
require_once __DIR__ . '/TursoClient.php';

function get_db_connection() {
    static $pdo = null;
    if ($pdo === null) {
        $tursoUrl = getenv('TURSO_DATABASE_URL') ?: 'libsql://digibrandz-vikash909012.aws-ap-south-1.turso.io';
        $tursoToken = getenv('turso_token'); // User specified this variable name

        if (!$tursoToken) {
            error_log("Database credentials not configured");
            http_response_code(500);
            exit(json_encode(['error' => 'Database credentials not configured']));
        }

        try {
            $pdo = new TursoClient($tursoUrl, $tursoToken);
            // Pragmas not needed for Turso HTTP API
        } catch (Throwable $e) {
            if (APP_ENV === 'development') {
                die("Database connection failed: " . $e->getMessage());
            } else {
                error_log("Database connection failed: " . $e->getMessage());
                http_response_code(500);
                exit(json_encode(['success' => false, 'error' => 'Internal server error']));
            }
        }
    }
    return $pdo;
}
