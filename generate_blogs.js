
async function generateBlogs() {
  const topics = [
    "Digital Marketing", "SEO Strategy", "Web Development", "AI in Business", 
    "Social Media Trends", "E-commerce Growth", "Lead Generation", 
    "Content Marketing", "UI/UX Design", "Brand Identity"
  ];

  const images = [
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800"
  ];

  let successCount = 0;
  
  for (let i = 1; i <= 100; i++) {
    const topic = topics[Math.floor(Math.random() * topics.length)];
    const title = `${topic}: The Ultimate Guide for 2026 - Part ${i}`;
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const excerpt = `Learn everything you need to know about ${topic} in this comprehensive guide. We cover the latest trends, strategies, and tools to help your business grow.`;
    
    // Add some realistic HTML content
    const content = `
      <h2>Introduction to ${topic}</h2>
      <p>In today's fast-paced digital landscape, mastering <strong>${topic}</strong> is no longer optional—it's a critical requirement for scaling your business.</p>
      
      <h3>Key Strategies</h3>
      <ul>
        <li>Understand your audience deeply.</li>
        <li>Leverage data-driven insights.</li>
        <li>Stay consistent across all channels.</li>
      </ul>
      
      <h3>Why It Matters</h3>
      <p>Many businesses struggle because they ignore the foundational elements of ${topic}. By implementing these proven frameworks, you can expect a massive ROI in Q3 and Q4.</p>
      
      <blockquote>"The companies that adapt quickest to new trends are the ones that dominate their industry."</blockquote>
      
      <p>Need help implementing this? <a href="/contact">Contact DigiBrandz</a> today for a free consultation.</p>
    `;

    const coverImage = images[Math.floor(Math.random() * images.length)];

    const payload = { title, slug, excerpt, content, coverImage };

    try {
      const res = await fetch('http://localhost:3001/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        successCount++;
        console.log(`Generated blog ${i}/100: ${title}`);
      } else {
        console.error(`Failed to generate blog ${i}`);
      }
    } catch (err) {
      console.error(`Error generating blog ${i}:`, err.message);
    }
  }

  console.log(`\nSuccessfully generated ${successCount} blogs!`);
}

generateBlogs();
