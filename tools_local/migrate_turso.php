<?php
require_once __DIR__ . '/private/env.php';
require_once __DIR__ . '/private/TursoClient.php';

$tursoUrl = getenv('TURSO_DATABASE_URL') ?: 'libsql://digibrandz-vikash909012.aws-ap-south-1.turso.io';
$tursoToken = getenv('turso_token');

if (!$tursoToken) {
    die("No Turso Token found in .env\n");
}

echo "Connecting to Turso: $tursoUrl\n";
$pdo = new TursoClient($tursoUrl, $tursoToken);

$schemaPath = __DIR__ . '/private/migrations/schema.sql';
$seedPath = __DIR__ . '/private/migrations/seed.json';

try {
    // 1. Run Schema
    $schema = file_get_contents($schemaPath);
    $statements = array_filter(array_map('trim', explode(';', $schema)));
    
    foreach ($statements as $stmt) {
        if (!empty($stmt)) {
            $pdo->exec($stmt);
        }
    }
    echo "Schema executed successfully.\n";

    // 2. Read Seed Data
    $seedData = json_decode(file_get_contents($seedPath), true);

    // Helper for insert or replace
    function execute_prepared($pdo, $sql, $params) {
        $pdo->execute($sql, $params);
    }

    // Seed Settings
    foreach ($seedData['settings'] as $key => $val) {
        execute_prepared($pdo, "INSERT OR REPLACE INTO settings (setting_key, setting_value) VALUES (?, ?)", [$key, $val]);
    }
    echo "Settings seeded.\n";

    // Seed Services
    foreach ($seedData['services'] as $svc) {
        execute_prepared($pdo, "INSERT OR IGNORE INTO services (slug, title, description, offers, faqs) VALUES (?, ?, ?, ?, ?)", [
            $svc['id'],
            $svc['title'],
            $svc['description'],
            json_encode($svc['offers']),
            json_encode($svc['faqs'])
        ]);
    }
    echo "Services seeded.\n";

    // Seed Case Studies
    foreach ($seedData['case_studies'] as $cs) {
        execute_prepared($pdo, "INSERT OR IGNORE INTO case_studies (slug, client, title, category, challenge, solution, metrics, image, logo, website, testimonial) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [
            $cs['slug'],
            $cs['client'],
            $cs['title'],
            $cs['category'],
            $cs['challenge'] ?? '',
            $cs['solution'] ?? '',
            json_encode($cs['metrics'] ?? []),
            $cs['image'] ?? '',
            $cs['logo'] ?? '',
            $cs['website'] ?? '',
            json_encode($cs['testimonial'] ?? [])
        ]);
    }
    echo "Case Studies seeded.\n";

    // Seed Team
    foreach ($seedData['team'] as $member) {
        execute_prepared($pdo, "INSERT OR IGNORE INTO team_members (slug, name, role, image, bio, experience, education, certifications, specialties, social) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [
            $member['id'],
            $member['name'],
            $member['role'],
            $member['image'],
            $member['bio'] ?? '',
            $member['experience'] ?? '',
            $member['education'] ?? '',
            $member['certifications'] ?? '',
            json_encode($member['specialties'] ?? []),
            json_encode($member['social'] ?? [])
        ]);
    }
    echo "Team seeded.\n";

    // Seed Testimonials
    foreach ($seedData['testimonials'] as $test) {
        execute_prepared($pdo, "INSERT OR IGNORE INTO testimonials (name, role, company, image, rating, content, project) VALUES (?, ?, ?, ?, ?, ?, ?)", [
            $test['name'],
            $test['role'] ?? '',
            $test['company'] ?? '',
            $test['image'] ?? '',
            $test['rating'] ?? 5,
            $test['content'],
            $test['project'] ?? ''
        ]);
    }
    echo "Testimonials seeded.\n";

    // Seed Industries
    foreach ($seedData['industries'] as $ind) {
        execute_prepared($pdo, "INSERT OR IGNORE INTO industries (slug, title, description, icon, challenges, solutions, case_study) VALUES (?, ?, ?, ?, ?, ?, ?)", [
            $ind['id'],
            $ind['title'],
            $ind['description'],
            $ind['icon'],
            json_encode($ind['challenges'] ?? []),
            json_encode($ind['solutions'] ?? []),
            json_encode($ind['caseStudy'] ?? [])
        ]);
    }
    echo "Industries seeded.\n";

    // Seed Jobs (Careers)
    if (isset($seedData['careers']['openings'])) {
        foreach ($seedData['careers']['openings'] as $job) {
            execute_prepared($pdo, "INSERT OR IGNORE INTO jobs (title, department, location, job_type, description, requirements) VALUES (?, ?, ?, ?, ?, ?)", [
                $job['title'],
                $job['department'],
                $job['location'],
                $job['type'],
                $job['description'],
                json_encode($job['requirements'] ?? [])
            ]);
        }
        echo "Jobs seeded.\n";
    }

    // Seed Nav Items
    $checkNav = $pdo->query("SELECT COUNT(*) as c FROM nav_items")->fetchColumn();
    if ($checkNav == 0) {
        $links = [
            ["Home", "/", 1],
            ["About", "/about", 2],
            ["Services", "/services", 3],
            ["Solutions", "/solutions", 4],
            ["Industries", "/industries", 5],
            ["Portfolio", "/portfolio", 6],
            ["Process", "/process", 7],
            ["Blog", "/blog", 8],
            ["Team", "/team", 9],
            ["Careers", "/careers", 10]
        ];
        foreach ($links as $l) {
            execute_prepared($pdo, "INSERT INTO nav_items (label, path, display_order) VALUES (?, ?, ?)", $l);
        }
        echo "Nav items seeded.\n";
    }

    $checkAdmin = $pdo->query("SELECT COUNT(*) FROM users WHERE role = 'superadmin'")->fetchColumn();
    if ($checkAdmin == 0) {
        $adminPass = getenv('ADMIN_PASSWORD');
        if (!$adminPass) {
            echo "No superadmin found. Set ADMIN_PASSWORD and re-run to create one.\n";
        } else {
            $hash = password_hash($adminPass, PASSWORD_DEFAULT);
            $adminUser = getenv('ADMIN_USERNAME') ?: 'admin';
            $adminEmail = getenv('ADMIN_EMAIL') ?: 'admin@digibrandz.com';
            execute_prepared($pdo, "INSERT INTO users (username, email, password_hash, role) VALUES (?, ?, ?, ?)", [$adminUser, $adminEmail, $hash, 'superadmin']);
            echo "SUPER ADMIN CREATED: {$adminUser}\n";
        }
    }

    echo "\nTurso Database seeding completed successfully.\n";

} catch (Exception $e) {
    die("DB Error: " . $e->getMessage() . "\n");
}
