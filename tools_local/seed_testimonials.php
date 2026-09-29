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

$testimonials = [
    [
        'name' => 'Rahul Sharma',
        'role' => 'Founder',
        'company' => 'TechSolutions India',
        'content' => 'DigiBrandz ne humari website ka pura look change kar diya. Pehle humara UI bahut purana lagta tha, par abhi ekdum premium lagta hai. Leads mein bhi 40% growth dekhi hai humne pichle mahine. Best UI/UX service!',
        'project' => 'Website Redesign & UI/UX'
    ],
    [
        'name' => 'Priya Desai',
        'role' => 'Marketing Head',
        'company' => 'StyleVibes Clothing',
        'content' => 'Inki SEO team sach mein bohot accha kaam karti hai. Humari e-commerce site Google ke 3rd page par thi, aur abhi 4 keywords ke liye first page pe rank kar rahi hai. Traffic badhne ki wajah se sales bhi bohot badh gayi hai.',
        'project' => 'SEO & Organic Growth'
    ],
    [
        'name' => 'Amit Patel',
        'role' => 'Owner',
        'company' => 'Patel Realty',
        'content' => 'Real estate market mein competition bahut hai, but DigiBrandz ke Facebook aur Insta ads ne game change kar diya. Cost per lead kafi kam ho gayi aur quality leads milne lagi. Inki digital marketing strategies ekdum top notch hain!',
        'project' => 'Social Media Marketing'
    ],
    [
        'name' => 'Neha Gupta',
        'role' => 'CEO',
        'company' => 'GlowUp Beauty',
        'content' => 'Starting mein thoda doubt tha ki branding pe itna spend karna chahiye ya nahi. Par jab inhone logo aur brand identity design karke di, I was blown away! Ekdum international standard ka kaam hai. Client feedback bhi bohot positive raha hai.',
        'project' => 'Brand Identity & Logo'
    ],
    [
        'name' => 'Vikram Singh',
        'role' => 'Director',
        'company' => 'Singh Logistics',
        'content' => 'Humari company ke liye inki team ne ek custom software develop kiya. Kaam bahut professional tha aur time pe delivery hui. Ab humara operations completely automated ho gaya hai aur errors almost zero hain. Thanks to the whole tech team!',
        'project' => 'Custom Software Development'
    ]
];

try {
    foreach ($testimonials as $t) {
        $pdo->execute(
            "INSERT INTO testimonials (name, role, company, content, project) VALUES (?, ?, ?, ?, ?)",
            [$t['name'], $t['role'], $t['company'], $t['content'], $t['project']]
        );
    }
    echo "Hinglish Testimonials successfully seeded into Turso!\n";
} catch (Exception $e) {
    die("Error inserting testimonials: " . $e->getMessage() . "\n");
}
