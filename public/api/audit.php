<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// 1. Get URL from request
$input = json_decode(file_get_contents('php://input'), true);
$url = isset($input['url']) ? $input['url'] : '';

if (empty($url)) {
    http_response_code(400);
    echo json_encode(['error' => 'URL is required']);
    exit;
}

if (!preg_match("~^(?:f|ht)tps?://~i", $url)) {
    $url = "https://" . $url;
}

// Read API Key from .env file
$envPath = __DIR__ . '/../../.env';
$apiKey = '';
if (file_exists($envPath)) {
    $env = parse_ini_file($envPath);
    $apiKey = isset($env['OPENROUTER_API_KEY']) ? $env['OPENROUTER_API_KEY'] : '';
}

// 2. Scrape the website
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 10);
curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)');
$html = curl_exec($ch);
curl_close($ch);

$title = 'Not found';
$h1 = 'Not found';
$imagesTotal = 0;
$imagesMissingAlt = 0;
$linksTotal = 0;

if ($html) {
    $dom = new DOMDocument();
    @$dom->loadHTML($html);
    
    // Get Title
    $titleNodes = $dom->getElementsByTagName('title');
    if ($titleNodes->length > 0) {
        $title = $titleNodes->item(0)->nodeValue;
    }
    
    // Get H1
    $h1Nodes = $dom->getElementsByTagName('h1');
    if ($h1Nodes->length > 0) {
        $h1 = $h1Nodes->item(0)->nodeValue;
    }
    
    // Get Images
    $imageNodes = $dom->getElementsByTagName('img');
    $imagesTotal = $imageNodes->length;
    foreach ($imageNodes as $img) {
        if (!$img->hasAttribute('alt') || trim($img->getAttribute('alt')) === '') {
            $imagesMissingAlt++;
        }
    }
    
    // Get Links
    $linksTotal = $dom->getElementsByTagName('a')->length;
}

// 3. Request AI Analysis
$aiAnalysis = "AI Analysis is currently unavailable or API key is missing.";

if ($apiKey) {
    $prompt = "Act as an expert SEO Consultant. I have scraped the following website: $url\n\nTitle: \"$title\"\nPrimary H1: \"$h1\"\nImages: $imagesTotal total, $imagesMissingAlt missing alt tags\nLinks: $linksTotal total links\n\nPlease provide a concise (max 300 words), professional SEO analysis report highlighting the main problems and how to fix them.";

    $aiData = [
        "model" => "nex-agi/nex-n2.5-pro:free",
        "messages" => [
            ["role" => "user", "content" => $prompt]
        ]
    ];

    $chAi = curl_init('https://openrouter.ai/api/v1/chat/completions');
    curl_setopt($chAi, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($chAi, CURLOPT_POST, true);
    curl_setopt($chAi, CURLOPT_POSTFIELDS, json_encode($aiData));
    curl_setopt($chAi, CURLOPT_HTTPHEADER, [
        'Authorization: Bearer ' . $apiKey,
        'Content-Type: application/json'
    ]);
    curl_setopt($chAi, CURLOPT_TIMEOUT, 20);

    $aiResponse = curl_exec($chAi);
    curl_close($chAi);

    if ($aiResponse) {
        $aiJson = json_decode($aiResponse, true);
        if (isset($aiJson['choices'][0]['message']['content'])) {
            $aiAnalysis = trim($aiJson['choices'][0]['message']['content']);
        }
    }
}

// 4. Generate PDF using FPDF
require __DIR__ . '/fpdf/fpdf.php';

$pdf = new FPDF();
$pdf->AddPage();
$pdf->SetAutoPageBreak(true, 15);

// Header
$pdf->SetFillColor(96, 29, 73); // brandPlum
$pdf->Rect(0, 0, 210, 35, 'F');
$pdf->SetFont('Arial', 'B', 24);
$pdf->SetTextColor(255, 235, 184); // brandCream
$pdf->Cell(0, 15, 'DigiBrandz', 0, 1, 'L');
$pdf->SetFont('Arial', '', 12);
$pdf->SetTextColor(255, 255, 255);
$pdf->Cell(0, 5, 'Instant SEO Audit Report', 0, 1, 'L');

$pdf->Ln(15);

// Report Content
$pdf->SetTextColor(0, 0, 0);

$pdf->SetFont('Arial', 'B', 16);
$pdf->Cell(0, 10, 'Website Audited:', 0, 1);
$pdf->SetFont('Arial', '', 12);
$pdf->SetTextColor(0, 102, 204);
$pdf->Cell(0, 10, $url, 0, 1);
$pdf->SetTextColor(0, 0, 0);

$pdf->Ln(5);

$pdf->SetFont('Arial', 'B', 14);
$pdf->Cell(0, 10, 'On-Page SEO Factors', 0, 1);
$pdf->SetFont('Arial', '', 12);
$pdf->MultiCell(0, 8, "Title Tag: " . utf8_decode($title));
$pdf->MultiCell(0, 8, "Primary H1: " . utf8_decode($h1));
$pdf->MultiCell(0, 8, "Total Images: $imagesTotal");
$pdf->MultiCell(0, 8, "Images Missing Alt Tags: $imagesMissingAlt");
$pdf->MultiCell(0, 8, "Total Links: $linksTotal");

$pdf->Ln(10);

$pdf->SetFont('Arial', 'B', 14);
$pdf->Cell(0, 10, 'AI Consultant Analysis & Recommendations', 0, 1);
$pdf->SetFont('Arial', '', 11);
$pdf->MultiCell(0, 6, utf8_decode($aiAnalysis));

$pdf->Ln(15);
$pdf->SetFont('Arial', 'I', 10);
$pdf->SetTextColor(128, 128, 128);
$pdf->Cell(0, 10, 'Generated automatically by DigiBrandz SEO Tool.', 0, 1, 'C');

// Output PDF
header('Content-Type: application/pdf');
$parsedUrl = parse_url($url);
$host = isset($parsedUrl['host']) ? $parsedUrl['host'] : 'website';
header('Content-Disposition: attachment; filename="SEO_Audit_' . $host . '.pdf"');

$pdf->Output('D', 'SEO_Audit.pdf');
?>
