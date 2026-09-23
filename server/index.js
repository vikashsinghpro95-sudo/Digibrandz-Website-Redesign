require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const cheerio = require('cheerio');
const PDFDocument = require('pdfkit');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/audit', async (req, res) => {
  let { url } = req.body;
  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  // Ensure URL has protocol
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = 'https://' + url;
  }

  try {
    // 1. Scrape the website
    const response = await axios.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
      timeout: 10000
    });
    
    const html = response.data;
    const $ = cheerio.load(html);

    // Extract SEO metrics
    const title = $('title').text() || 'No Title Found';
    const description = $('meta[name="description"]').attr('content') || 'No Meta Description Found';
    const h1 = $('h1').first().text().trim() || 'No H1 Tag Found';
    
    let imagesTotal = 0;
    let imagesMissingAlt = 0;
    $('img').each((i, el) => {
      imagesTotal++;
      if (!$(el).attr('alt')) {
        imagesMissingAlt++;
      }
    });

    const linksTotal = $('a').length;

    // 2. Query OpenRouter AI for analysis
    let aiAnalysis = 'AI analysis could not be generated at this time.';
    try {
      const prompt = `You are an expert SEO auditor. Based on the following metrics from the website ${url}, provide a detailed, elaborated analysis highlighting the main SEO problems with the website and actionable recommendations to fix them.

Title: "${title}"
Meta Description: "${description}"
Primary H1: "${h1}"
Images: ${imagesTotal} total, ${imagesMissingAlt} missing alt tags
Links: ${linksTotal} total links

Please provide a concise (max 300 words), professional SEO analysis report highlighting the main problems and how to fix them.`;

      const aiResponse = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
        model: 'nex-agi/nex-n2.5-pro:free',
        messages: [{ role: 'user', content: prompt }]
      }, {
        headers: {
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json'
        },
        timeout: 20000 // Allow extra time for the AI model to respond
      });

      if (aiResponse.data && aiResponse.data.choices && aiResponse.data.choices[0]) {
        aiAnalysis = aiResponse.data.choices[0].message.content.trim();
      }
    } catch (aiError) {
      console.error('Error fetching AI analysis:', aiError.response ? aiError.response.data : aiError.message);
    }

    // 3. Generate PDF
    const doc = new PDFDocument({ margin: 50 });
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="SEO_Audit_${new URL(url).hostname}.pdf"`);
    
    doc.pipe(res);

    // PDF Branding and Styles
    const brandPlum = '#601D49';
    const brandRose = '#BD5579';

    // Header
    doc.rect(0, 0, doc.page.width, 100).fill(brandPlum);
    doc.fillColor('#FFEBB8').fontSize(24).font('Helvetica-Bold').text('DigiBrandz', 50, 35);
    doc.fillColor('white').fontSize(12).font('Helvetica').text('Instant SEO Audit Report', 50, 65);
    
    doc.moveDown(4);

    // Target URL
    doc.fillColor(brandPlum).fontSize(18).font('Helvetica-Bold').text('Audit Results For:');
    doc.fillColor('#333333').fontSize(14).font('Helvetica').text(url);
    doc.moveDown(2);

    // Section Helper
    const addSection = (label, value, goodCondition = null) => {
      doc.fillColor(brandRose).fontSize(14).font('Helvetica-Bold').text(label);
      doc.fillColor('#444444').fontSize(12).font('Helvetica').text(value);
      if (goodCondition !== null) {
        if (goodCondition) {
          doc.fillColor('green').fontSize(10).text('✓ Good', { continued: false });
        } else {
          doc.fillColor('red').fontSize(10).text('⚠ Needs Improvement', { continued: false });
        }
      }
      doc.moveDown(1);
    };

    // Metrics
    const titleGood = title.length >= 30 && title.length <= 60;
    addSection('Page Title', title, titleGood);

    const descGood = description !== 'No Meta Description Found' && description.length >= 120 && description.length <= 160;
    addSection('Meta Description', description, descGood);

    addSection('Primary Heading (H1)', h1, h1 !== 'No H1 Tag Found');

    addSection('Images & Alt Tags', `Total Images: ${imagesTotal} | Missing Alt Tags: ${imagesMissingAlt}`, imagesMissingAlt === 0);
    
    addSection('Internal/External Links', `Total Links Found: ${linksTotal}`);

    // AI Analysis Section
    doc.moveDown(2);
    doc.fillColor(brandPlum).fontSize(16).font('Helvetica-Bold').text('AI Expert Analysis & Recommendations');
    doc.moveDown(1);
    doc.fillColor('#333333').fontSize(11).font('Helvetica').text(aiAnalysis, { align: 'justify' });

    // Footer CTA
    doc.moveDown(3);
    doc.rect(50, doc.y, doc.page.width - 100, 2).fill(brandRose);
    doc.moveDown(2);
    doc.fillColor(brandPlum).fontSize(16).font('Helvetica-Bold').text('Want to improve these metrics?');
    doc.fillColor('#555555').fontSize(12).font('Helvetica').text('Contact DigiBrandz today for a comprehensive digital strategy and technical overhaul.');

    // Finalize PDF
    doc.end();

  } catch (error) {
    console.error('Error auditing URL:', error.message);
    res.status(500).json({ error: 'Failed to audit the website. It might be blocking scrapers or invalid.' });
  }
});

const db = require('./db');

// --- BLOG CMS ENDPOINTS ---

// Get all blogs
app.get('/api/blogs', (req, res) => {
  db.all('SELECT id, title, slug, excerpt, coverImage, createdAt FROM blogs ORDER BY createdAt DESC', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ blogs: rows });
  });
});

// Get a single blog by slug
app.get('/api/blogs/:slug', (req, res) => {
  db.get('SELECT * FROM blogs WHERE slug = ?', [req.params.slug], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Blog not found' });
    res.json({ blog: row });
  });
});

// Create a new blog post
app.post('/api/blogs', (req, res) => {
  const { title, slug, excerpt, content, coverImage } = req.body;
  if (!title || !slug || !content) {
    return res.status(400).json({ error: 'Title, slug, and content are required' });
  }

  const query = `INSERT INTO blogs (title, slug, excerpt, content, coverImage) VALUES (?, ?, ?, ?, ?)`;
  db.run(query, [title, slug, excerpt, content, coverImage], function(err) {
    if (err) {
      if (err.message.includes('UNIQUE constraint failed')) {
        return res.status(400).json({ error: 'Slug must be unique' });
      }
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: this.lastID, title, slug });
  });
});

// Update an existing blog post
app.put('/api/blogs/:id', (req, res) => {
  const { title, slug, excerpt, content, coverImage } = req.body;
  if (!title || !slug || !content) {
    return res.status(400).json({ error: 'Title, slug, and content are required' });
  }

  const query = `UPDATE blogs SET title = ?, slug = ?, excerpt = ?, content = ?, coverImage = ? WHERE id = ?`;
  db.run(query, [title, slug, excerpt, content, coverImage, req.params.id], function(err) {
    if (err) {
      if (err.message.includes('UNIQUE constraint failed')) {
        return res.status(400).json({ error: 'Slug must be unique' });
      }
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    res.json({ message: 'Updated successfully', id: req.params.id });
  });
});

// Delete a blog post
app.delete('/api/blogs/:id', (req, res) => {
  db.run('DELETE FROM blogs WHERE id = ?', [req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Deleted successfully', changes: this.changes });
  });
});

// --- END BLOG CMS ENDPOINTS ---

// AI Chatbot Endpoint
app.post('/api/chat', async (req, res) => {
  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Messages array is required' });
  }

  const systemMessage = {
    role: 'system',
    content: 'You are a helpful, professional digital marketing expert working as an AI assistant for DigiBrandz. DigiBrandz is a premium digital agency that builds digital ecosystems (Software, Web Dev, Marketing, Automation, AI). Keep your answers concise, persuasive, and very helpful. Format responses elegantly using markdown if needed.'
  };

  try {
    const aiResponse = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
      model: 'nex-agi/nex-n2.5-pro:free',
      messages: [systemMessage, ...messages]
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json'
      },
      timeout: 15000 
    });

    if (aiResponse.data && aiResponse.data.choices && aiResponse.data.choices[0]) {
      res.json({ reply: aiResponse.data.choices[0].message.content });
    } else {
      throw new Error('Invalid response structure from OpenRouter');
    }
  } catch (error) {
    console.error('Error in chat endpoint:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Failed to generate response. Please try again later.' });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`SEO Audit Backend running on http://localhost:${PORT}`);
});
