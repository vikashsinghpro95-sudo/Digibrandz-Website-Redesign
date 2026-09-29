import { jsPDF } from 'jspdf';

// ─────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────

const hexToRgb = (hex) => {
  hex = hex.replace(/^#/, '');
  if (hex.length === 3) hex = hex.split('').map((x) => x + x).join('');
  return [
    parseInt(hex.slice(0, 2), 16),
    parseInt(hex.slice(2, 4), 16),
    parseInt(hex.slice(4, 6), 16),
  ];
};

// Fixed display names instead of a regex that shreds acronyms
// (the old /([A-Z])/g approach turned "localSEO" into "local S E O")
const CATEGORY_LABELS = {
  technical: 'Technical SEO',
  onPageContent: 'On-Page Content',
  performance: 'Performance',
  mobileUsability: 'Mobile Usability',
  backlinksAuthority: 'Backlinks & Authority',
  localSEO: 'Local SEO',
};

const SEVERITY_LABELS = { critical: 'CRITICAL', warning: 'NEEDS WORK', good: 'STRONG' };

// Robust JSON extraction: strips fences, and if parsing still fails,
// falls back to grabbing the outermost {...} block (handles stray
// preamble/trailing text some free models add despite instructions).
function parseModelJson(rawText) {
  let text = rawText.trim();
  text = text.replace(/^```json/i, '').replace(/^```/, '').replace(/```$/, '').trim();
  try {
    return JSON.parse(text);
  } catch (e) {
    const start = text.indexOf('{');
    const end = text.lastIndexOf('}');
    if (start !== -1 && end !== -1 && end > start) {
      try {
        return JSON.parse(text.slice(start, end + 1));
      } catch (e2) {
        throw new Error('AI returned invalid data format. Please try again.');
      }
    }
    throw new Error('AI returned invalid data format. Please try again.');
  }
}

// ─────────────────────────────────────────────────────────
// Main
// ─────────────────────────────────────────────────────────

export async function generateSeoReport(url, settings = {}) {
  // 1. Fetch from OpenRouter ------------------------------------------------
  const prompt = `You are a senior SEO auditor writing a client-facing report for DigiBrandz.
Perform an agency-quality SEO audit for the website: ${url}.

Respond with ONLY valid JSON — no markdown fences, no commentary before or after.
IMPORTANT: You must escape all double quotes within strings (e.g., \\") and avoid using literal newlines inside string values.
Keep every text field concise (guidelines below) so the response is never cut off.

{
  "overallScore": <number 0-100>,
  "verdict": "<one short sentence, under 12 words>",
  "executiveSummary": "<2-3 sentences, plain English, for a non-technical business owner>",
  "categoryScores": {
    "technical": <0-100>,
    "onPageContent": <0-100>,
    "performance": <0-100>,
    "mobileUsability": <0-100>,
    "backlinksAuthority": <0-100>,
    "localSEO": <0-100>
  },
  "findings": [
    {
      "category": "<Technical | On-Page Content | Performance | Mobile Usability | Backlinks & Authority | Local SEO>",
      "severity": "<critical | warning | good>",
      "title": "<short finding title, under 8 words>",
      "explanation": "<1-2 sentences, under 35 words, what the issue is>",
      "businessImpact": "<1 sentence, under 25 words, why it costs them traffic/leads>",
      "recommendation": "<1-2 sentences, under 35 words, concrete fix>"
    }
    // exactly 6 findings, covering at least 4 different categories, no duplicates
  ],
  "quickWins": [
    { "title": "<short title>", "recommendation": "<1 sentence fix, under 25 words>" }
    // exactly 4 items
  ],
  "competitiveNote": "<one short paragraph, under 60 words>",
  "closingCTA": "<one short paragraph, under 45 words, soft pitch tied to the weaknesses found>"
}

Tone: confident, consultative, non-alarmist, specific to ${url} — never generic filler.
Every field must be complete; do not truncate sentences. Return ONLY the JSON object.`;

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': window.location.href,
      'X-Title': 'DigiBrandz SEO Audit',
    },
    body: JSON.stringify({
      model: 'openrouter/free',
      max_tokens: 4096, // was unset — free model was truncating mid-JSON
      temperature: 0.6,
      response_format: { type: 'json_object' },
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  if (!response.ok) throw new Error('Failed to generate audit. Please try again.');

  const data = await response.json();
  const rawText = data.choices?.[0]?.message?.content || '';
  const reportData = parseModelJson(rawText);

  // 2. PDF setup --------------------------------------------------------------
  const doc = new jsPDF();

  const pColor = hexToRgb(settings.primaryColor || '#601D49'); // Plum
  const sColor = hexToRgb(settings.secondaryColor || '#ff0844'); // Rose
  const bgBandColor = [250, 248, 252];
  const cardBg = [255, 255, 255];
  const cardBorder = [232, 226, 236];

  const colors = {
    critical: [211, 62, 48],
    warning: [217, 140, 20],
    good: [39, 155, 97],
    textDark: [35, 33, 38],
    textBody: [70, 66, 74],
    textMuted: [140, 134, 144],
  };

  const PAGE_W = 210;
  const PAGE_H = 297;
  const margin = 16;
  const contentW = PAGE_W - margin * 2;
  const bottomLimit = 272; // leave room for footer band

  let y = 35;

  const checkPageBreak = (neededSpace) => {
    if (y + neededSpace > bottomLimit) {
      doc.addPage();
      y = 35;
      return true;
    }
    return false;
  };

  // Centered, wrapped text — fixes the cover-page overflow bug where a long
  // verdict/title line ran off both edges of the page.
  const centeredWrapped = (text, x, startY, maxWidth, lineHeight) => {
    const lines = doc.splitTextToSize(text, maxWidth);
    lines.forEach((line, i) => doc.text(line, x, startY + i * lineHeight, { align: 'center' }));
    return startY + lines.length * lineHeight;
  };

  const drawHeaderFooter = (pageNo, total) => {
    doc.setFillColor(...bgBandColor);
    doc.rect(0, 0, PAGE_W, 22, 'F');
    doc.setDrawColor(...cardBorder);
    doc.line(0, 22, PAGE_W, 22);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(...pColor);
    doc.text('DigiBrandz', margin, 14);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(...colors.textMuted);
    doc.text('SEO Audit Report', PAGE_W - margin, 14, { align: 'right' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...colors.textMuted);
    doc.text(`Page ${pageNo} of ${total}`, PAGE_W - margin, PAGE_H - 10, { align: 'right' });
    doc.text('digibrandz.in', margin, PAGE_H - 10);
  };

  // ── PAGE 1: COVER ──────────────────────────────────────────────────────
  doc.setFillColor(...bgBandColor);
  doc.rect(0, 0, PAGE_W, PAGE_H, 'F');
  doc.setFillColor(...pColor);
  doc.rect(0, 0, PAGE_W, 6, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(...colors.textMuted);
  doc.text('PREPARED BY DIGIBRANDZ', 105, 55, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(32);
  doc.setTextColor(...pColor);
  doc.text('SEO Audit Report', 105, 72, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(15);
  doc.setTextColor(...colors.textDark);
  doc.text(url, 105, 84, { align: 'center' });

  doc.setFontSize(10.5);
  doc.setTextColor(...colors.textMuted);
  const dateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  doc.text(`Generated ${dateStr}`, 105, 92, { align: 'center' });

  // Score badge
  const scoreColor = reportData.overallScore > 80 ? colors.good : reportData.overallScore > 50 ? colors.warning : colors.critical;
  doc.setFillColor(...scoreColor);
  doc.circle(105, 148, 32, 'F');
  doc.setDrawColor(255, 255, 255);
  doc.setLineWidth(1.2);
  doc.circle(105, 148, 32, 'S');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(42);
  doc.text(String(reportData.overallScore), 105, 156, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.text('OUT OF 100', 105, 167, { align: 'center' });

  // Verdict — wrapped, so it can never run off the page edges
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(14);
  doc.setTextColor(...colors.textDark);
  centeredWrapped(`"${reportData.verdict}"`, 105, 200, 150, 7);

  doc.setDrawColor(...cardBorder);
  doc.line(75, 230, 135, 230);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(...colors.textMuted);
  doc.text('Confidential — prepared exclusively for the site owner', 105, 240, { align: 'center' });

  // ── PAGE 2: EXECUTIVE SUMMARY ──────────────────────────────────────────
  doc.addPage();
  y = 35;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(...pColor);
  doc.text('Executive Summary', margin, y);
  y += 11;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(...colors.textBody);
  const execLines = doc.splitTextToSize(reportData.executiveSummary, contentW);
  doc.text(execLines, margin, y, { lineHeightFactor: 1.5 });
  y += execLines.length * 6.5 + 14;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(...colors.textDark);
  doc.text('Category Breakdown', margin, y);
  y += 10;

  Object.entries(reportData.categoryScores).forEach(([cat, score]) => {
    checkPageBreak(12);
    const catName = CATEGORY_LABELS[cat] || cat;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(...colors.textBody);
    doc.text(catName, margin, y);
    doc.setFont('helvetica', 'bold');
    doc.text(`${score}/100`, PAGE_W - margin, y, { align: 'right' });

    doc.setFillColor(228, 224, 230);
    doc.roundedRect(margin, y + 2, contentW, 4.5, 2.2, 2.2, 'F');

    const fillWidth = Math.max((score / 100) * contentW, 5);
    const barColor = score > 80 ? colors.good : score > 50 ? colors.warning : colors.critical;
    doc.setFillColor(...barColor);
    doc.roundedRect(margin, y + 2, fillWidth, 4.5, 2.2, 2.2, 'F');

    y += 13;
  });

  // ── DETAILED FINDINGS ──────────────────────────────────────────────────
  doc.addPage();
  y = 35;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(...pColor);
  doc.text('Detailed Findings', margin, y);
  y += 12;

  const cardPadX = 8;
  const cardTextW = contentW - cardPadX * 2 - 4;

  reportData.findings.forEach((finding) => {
    // Measure everything FIRST, draw ONCE — this is what fixes the old
    // "double-rendered, overlapping text" bug (the previous version drew
    // the card, then redrew a second, slightly different copy on top).
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10.2);
    const explLines = doc.splitTextToSize(finding.explanation, cardTextW);
    const impactLines = doc.splitTextToSize(finding.businessImpact, cardTextW);
    const recLines = doc.splitTextToSize(finding.recommendation, cardTextW);

    const lineH = 5;
    const sectionGap = 4;
    let cardHeight = 12; // top padding + title row
    cardHeight += explLines.length * lineH + sectionGap;
    cardHeight += 5 + impactLines.length * lineH + sectionGap; // label + text
    cardHeight += 5 + recLines.length * lineH + 8; // label + text + bottom pad

    checkPageBreak(cardHeight + 6);

    const cardTop = y;

    // Card shell
    doc.setFillColor(...cardBg);
    doc.setDrawColor(...cardBorder);
    doc.setLineWidth(0.3);
    doc.roundedRect(margin, cardTop, contentW, cardHeight, 3, 3, 'FD');
    doc.setFillColor(...colors[finding.severity]);
    doc.roundedRect(margin, cardTop, 3.5, cardHeight, 3, 3, 'F');

    let cy = cardTop + 9;

    // Title + category caption on the left, severity chip on the right
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11.5);
    doc.setTextColor(...colors.textDark);
    doc.text(finding.title, margin + cardPadX, cy);

    const chipLabel = SEVERITY_LABELS[finding.severity] || finding.severity.toUpperCase();
    doc.setFontSize(7.5);
    const chipW = doc.getTextWidth(chipLabel) + 6;
    doc.setFillColor(...colors[finding.severity]);
    doc.roundedRect(margin + contentW - cardPadX - chipW, cy - 4.5, chipW, 6, 1.5, 1.5, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.text(chipLabel, margin + contentW - cardPadX - chipW / 2, cy - 0.5, { align: 'center' });

    cy += 5;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(...colors.textMuted);
    doc.text(finding.category.toUpperCase(), margin + cardPadX, cy);
    cy += 6;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10.2);
    doc.setTextColor(...colors.textBody);
    doc.text(explLines, margin + cardPadX, cy);
    cy += explLines.length * lineH + sectionGap;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(...sColor);
    doc.text('WHY IT MATTERS', margin + cardPadX, cy);
    cy += 5;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10.2);
    doc.setTextColor(...colors.textBody);
    doc.text(impactLines, margin + cardPadX, cy);
    cy += impactLines.length * lineH + sectionGap;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(...pColor);
    doc.text('RECOMMENDATION', margin + cardPadX, cy);
    cy += 5;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10.2);
    doc.setTextColor(...colors.textDark);
    doc.text(recLines, margin + cardPadX, cy);

    y = cardTop + cardHeight + 7;
  });

  // ── QUICK WINS ──────────────────────────────────────────────────────────
  doc.addPage();
  y = 35;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(...pColor);
  doc.text('Quick Wins', margin, y);
  y += 5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(...colors.textMuted);
  doc.text('The highest-impact, lowest-effort fixes to tackle first', margin, y + 6);
  y += 16;

  reportData.quickWins.forEach((qw, i) => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.8);
    const recLines = doc.splitTextToSize(qw.recommendation, contentW - 26);
    const boxH = Math.max(18, 9 + recLines.length * 5 + 5);

    checkPageBreak(boxH + 6);

    doc.setFillColor(...cardBg);
    doc.setDrawColor(...cardBorder);
    doc.roundedRect(margin, y, contentW, boxH, 2.5, 2.5, 'FD');

    doc.setFillColor(...sColor);
    doc.circle(margin + 10, y + boxH / 2, 4.2, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text(String(i + 1), margin + 10, y + boxH / 2 + 1.3, { align: 'center' });

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(...colors.textDark);
    doc.text(qw.title, margin + 20, y + 8);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.8);
    doc.setTextColor(...colors.textMuted);
    doc.text(recLines, margin + 20, y + 14);

    y += boxH + 6;
  });

  y += 4;
  checkPageBreak(60);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(...pColor);
  doc.text('How You Compare', margin, y);
  y += 8;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10.5);
  doc.setTextColor(...colors.textBody);
  const cnLines = doc.splitTextToSize(reportData.competitiveNote, contentW);
  doc.text(cnLines, margin, y);
  y += cnLines.length * 5.5 + 14;

  // CTA block — measured before drawing so text never overflows the box
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10.5);
  const ctaLines = doc.splitTextToSize(reportData.closingCTA, contentW - 20);
  const ctaBoxH = 16 + ctaLines.length * 5.5 + 8;
  checkPageBreak(ctaBoxH + 4);

  doc.setFillColor(...pColor);
  doc.roundedRect(margin, y, contentW, ctaBoxH, 4, 4, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text('Next Steps', margin + 10, y + 11);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10.5);
  doc.text(ctaLines, margin + 10, y + 19);

  // ── Header/footer on every page ─────────────────────────────────────────
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    if (i > 1) drawHeaderFooter(i, pageCount); // cover page stays clean/full-bleed
  }

  const hostname = new URL(url.startsWith('http') ? url : `https://${url}`).hostname || 'Report';
  doc.save(`SEO_Audit_${hostname}.pdf`);

  return JSON.stringify(reportData);
}