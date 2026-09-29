<?php
// Initialize database and run migrations & seeder
error_reporting(E_ALL);
ini_set('display_errors', 1);

$dbPath = __DIR__ . '/../database.sqlite';
$schemaPath = __DIR__ . '/schema.sql';
$seedPath = __DIR__ . '/seed.json';

try {
    $pdo = new PDO('sqlite:' . $dbPath);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // 1. Run Schema
    $schema = file_get_contents($schemaPath);
    $pdo->exec($schema);
    echo "Schema executed successfully.\n";

    // 2. Read Seed Data
    $seedData = json_decode(file_get_contents($seedPath), true);

    // Seed Settings
    $stmt = $pdo->prepare("INSERT OR REPLACE INTO settings (setting_key, setting_value) VALUES (?, ?)");
    foreach ($seedData['settings'] as $key => $val) {
        $stmt->execute([$key, $val]);
    }
    echo "Settings seeded.\n";

    // Seed Services
    $stmt = $pdo->prepare("INSERT OR IGNORE INTO services (slug, title, description, offers, faqs) VALUES (?, ?, ?, ?, ?)");
    foreach ($seedData['services'] as $svc) {
        $stmt->execute([
            $svc['id'],
            $svc['title'],
            $svc['description'],
            json_encode($svc['offers']),
            json_encode($svc['faqs'])
        ]);
    }
    echo "Services seeded.\n";

    // Seed Case Studies
    $stmt = $pdo->prepare("INSERT OR IGNORE INTO case_studies (slug, client, title, category, challenge, solution, metrics, image, logo, website, testimonial) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    foreach ($seedData['case_studies'] as $cs) {
        $stmt->execute([
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
    $stmt = $pdo->prepare("INSERT OR IGNORE INTO team_members (slug, name, role, image, bio, experience, education, certifications, specialties, social) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    foreach ($seedData['team'] as $member) {
        $stmt->execute([
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
    $stmt = $pdo->prepare("INSERT OR IGNORE INTO testimonials (name, role, company, image, rating, content, project) VALUES (?, ?, ?, ?, ?, ?, ?)");
    foreach ($seedData['testimonials'] as $test) {
        $stmt->execute([
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
    $stmt = $pdo->prepare("INSERT OR IGNORE INTO industries (slug, title, description, icon, challenges, solutions, case_study) VALUES (?, ?, ?, ?, ?, ?, ?)");
    foreach ($seedData['industries'] as $ind) {
        $stmt->execute([
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
    $stmt = $pdo->prepare("INSERT OR IGNORE INTO jobs (title, department, location, job_type, description, requirements) VALUES (?, ?, ?, ?, ?, ?)");
    if (isset($seedData['careers']['openings'])) {
        foreach ($seedData['careers']['openings'] as $job) {
            $stmt->execute([
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
    $checkNav = $pdo->query("SELECT COUNT(*) FROM nav_items");
    if ($checkNav->fetchColumn() == 0) {
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
        $stmt = $pdo->prepare("INSERT INTO nav_items (label, path, display_order) VALUES (?, ?, ?)");
        foreach ($links as $l) {
            $stmt->execute($l);
        }
        echo "Nav items seeded.\n";
    }

    // 3. Create Super Admin User
    $checkAdmin = $pdo->query("SELECT COUNT(*) FROM users WHERE role = 'superadmin'");
    if ($checkAdmin->fetchColumn() == 0) {
        $tempPassword = bin2hex(random_bytes(6)); // 12-char random string
        $hash = password_hash($tempPassword, PASSWORD_DEFAULT);
        $stmt = $pdo->prepare("INSERT INTO users (username, email, password_hash, role) VALUES (?, ?, ?, ?)");
        $stmt->execute(['admin', 'admin@digibrandz.com', $hash, 'superadmin']);
        echo "\n============================================\n";
        echo "SUPER ADMIN CREATED!\n";
        echo "Username: admin\n";
        echo "Password: $tempPassword\n";
        echo "Please save this password securely. It will not be shown again.\n";
        echo "============================================\n";
    }

    echo "\nDatabase seeding completed successfully.\n";

} catch (PDOException $e) {
    die("DB Error: " . $e->getMessage());
}
