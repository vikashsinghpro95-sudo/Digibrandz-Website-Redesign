<?php
require_once __DIR__ . '/private/db.php';
$pdo = get_db_connection();

$testimonials = [
    [
        'name' => 'Rahul Sharma',
        'role' => 'Founder',
        'company' => 'TechSolutions India',
        'image' => '/images/testimonials/rahul.jpg',
        'rating' => 5,
        'content' => 'DigiBrandz ne hamari website ka design aur SEO itna badhiya kar diya hai ki leads ab rukne ka naam hi nahi le rahi! Bhot sahi kaam karte hain yaar yeh log. Highly recommended!',
        'project' => 'SEO & Web Development'
    ],
    [
        'name' => 'Priya Patel',
        'role' => 'Marketing Head',
        'company' => 'Trendz E-commerce',
        'image' => '/images/testimonials/priya.jpg',
        'rating' => 5,
        'content' => 'Social media campaigns jo inlogo ne run kiye, usse hamari sales double ho gayi 2 mahine mein. ROI ek number hai. Bhai maza aa gaya inke saath kaam karke.',
        'project' => 'Social Media Marketing'
    ],
    [
        'name' => 'Amit Desai',
        'role' => 'CEO',
        'company' => 'Desai Logistics',
        'image' => '/images/testimonials/amit.jpg',
        'rating' => 5,
        'content' => 'Mobile app ka UI/UX itna smooth banaya hai ki hamare customers ko order track karne me koi dikkat nahi aati. Support team bhi hamesha available rehti hai. Great job DigiBrandz team!',
        'project' => 'Mobile App Development'
    ],
    [
        'name' => 'Neha Gupta',
        'role' => 'Director',
        'company' => 'Gupta Jewels',
        'image' => '/images/testimonials/neha.jpg',
        'rating' => 4,
        'content' => 'Hamari branding puri tarah se change kar di inhone. Ek premium look nikal ke aaya hai. Kuch minor delays the starting mein, par end result bahut badiya nikla.',
        'project' => 'Brand Identity Design'
    ],
    [
        'name' => 'Vikram Singh',
        'role' => 'Operations Manager',
        'company' => 'Singh Travels',
        'image' => '/images/testimonials/vikram.jpg',
        'rating' => 5,
        'content' => 'Custom software development ke liye DigiBrandz best choice thi. Hamara pura booking system ab automate ho chuka hai. Inka tech stack aur problem solving skills top-notch hain.',
        'project' => 'Custom Software Solutions'
    ]
];

try {
    foreach ($testimonials as $t) {
        $stmt = $pdo->prepare("INSERT INTO testimonials (name, role, company, image, rating, content, project) VALUES (?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([
            $t['name'],
            $t['role'],
            $t['company'],
            $t['image'],
            $t['rating'],
            $t['content'],
            $t['project']
        ]);
    }
    echo "Hinglish Testimonials successfully inserted into Turso DB!\n";
} catch (Exception $e) {
    echo "Error inserting testimonials: " . $e->getMessage() . "\n";
}
?>
