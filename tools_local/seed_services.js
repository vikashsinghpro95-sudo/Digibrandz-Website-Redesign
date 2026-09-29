import { createClient } from '@libsql/client';

const turso = createClient({
  url: 'libsql://digibrandz-vikash909012.aws-ap-south-1.turso.io',
  authToken: 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3OTA0NDg2NjEsImlkIjoiMDFhMGRmMGMtNGYwMS03NTY4LWE0NTctZjFlZTYyMWVkOTZjIiwia2lkIjoiY1F3X1BKODQyR1NQU3pzNDR5aWdqUS1GUWN4cERlX1VZQzg3elY0N0RobyIsInJpZCI6ImM5YmVkYmE4LWFhOGQtNGE3Mi04ZWYzLTcwNjg1N2Q1YjQ0ZSJ9.59Q97APE0iPTx1gpruwyU4t0KIQWdpkPSo2fK43elAyABS2UgNgdm9n86ftIMSEFaTKzo12Star0ypD0MXjjCQ'
});

const services = [
  { title: "AI Chatbots", description: "Intelligent, conversational AI chatbots that understand natural language, engage website visitors 24/7, and guide users through complex sales funnels." },
  { title: "AI Customer Support", description: "Automate tier-1 and tier-2 customer support with AI agents capable of resolving tickets, answering queries, and escalating complex issues seamlessly." },
  { title: "WhatsApp Automation", description: "Turn the world's most popular messaging app into a powerful sales and support channel with custom conversational flows and AI integration." },
  { title: "Business Process Automation", description: "Replace manual, error-prone corporate processes with intelligent, automated workflows that connect your disparate software systems." },
  { title: "AI Content Generation", description: "Scale your marketing efforts with custom-tuned AI models that generate brand-aligned blogs, social media posts, and product descriptions at scale." },
  { title: "AI Agents", description: "Deploy autonomous AI agents capable of researching, reasoning, and executing complex multi-step tasks across the internet on your behalf." },
  { title: "Workflow Automation", description: "Seamlessly connect your tech stack using Zapier, Make, and custom webhooks so data flows perfectly without human intervention." },
  { title: "AI Dashboards", description: "Visualize complex data and receive AI-driven insights, predictive forecasts, and anomaly detection in real-time." },
  { title: "Document Processing", description: "Instantly extract, categorize, and validate data from thousands of PDFs, invoices, and forms using intelligent OCR and AI." },
  { title: "Recommendation Systems", description: "Increase cart size and user retention with AI models that predict user behavior and recommend hyper-personalized products or content." },
  { title: "API & AI Integrations", description: "Connect the world's most powerful AI models (OpenAI, Anthropic, Google) directly into your proprietary software and workflows." },
  { title: "Custom Software", description: "We build tailored software solutions from the ground up, designed to perfectly match your specific business requirements, workflows, and long-term goals." },
  { title: "Web Apps", description: "High-performance, scalable web applications built with modern frameworks like React, Node.js, and Next.js, delivering seamless user experiences across all devices." },
  { title: "Mobile Apps", description: "Engaging, high-performance native and cross-platform mobile applications for iOS and Android that users love and businesses rely on." },
  { title: "SaaS Platforms", description: "End-to-end development of Software-as-a-Service (SaaS) products, featuring multi-tenant architectures, subscription billing, and robust security." },
  { title: "CRM Systems", description: "Custom Customer Relationship Management systems designed to streamline your sales pipeline, automate follow-ups, and improve customer retention." },
  { title: "ERP Solutions", description: "Comprehensive Enterprise Resource Planning systems that unify your business processes, from inventory and HR to finance and supply chain." },
  { title: "E-Commerce", description: "High-converting, scalable custom e-commerce platforms designed to provide frictionless shopping experiences and drive online sales." },
  { title: "API Development", description: "Secure, well-documented, and highly scalable RESTful and GraphQL APIs that connect your software systems and enable seamless data exchange." },
  { title: "Database Design", description: "Optimized, scalable database architectures tailored for high performance, data integrity, and complex querying requirements." },
  { title: "Enterprise Software", description: "Robust, enterprise-grade software solutions designed to solve complex corporate challenges, improve efficiency, and scale securely." },
  { title: "Business Automation", description: "Replace repetitive manual tasks with intelligent automated workflows, reducing human error and freeing your team to focus on growth." },
  { title: "AI Applications", description: "Cutting-edge artificial intelligence integration, from custom LLMs and chatbots to predictive analytics and machine learning models." },
  { title: "Search Engine Optimization (SEO)", description: "Dominate search rankings and drive high-intent organic traffic to your website through technical optimization, authoritative content, and ethical backlinking." },
  { title: "Meta Advertising", description: "Scale your customer acquisition with data-driven social advertising across Facebook, Instagram, and WhatsApp." },
  { title: "Social Media Marketing", description: "Build a loyal community and elevate your brand presence with engaging, platform-native content strategies." },
  { title: "Content Marketing", description: "Establish industry authority and educate your audience with high-quality blogs, videos, and high-converting lead magnets." },
  { title: "Email Automation", description: "Nurture leads and maximize customer lifetime value with highly personalized, automated email sequences." },
  { title: "B2B Lead Generation", description: "Fill your sales pipeline with qualified prospects using proven multi-channel acquisition funnels and outreach." },
  { title: "Social Media Management", description: "Build a strong digital presence with DigiBrandz Social Media Management Services. We create platform-specific strategies, engaging content, and visually appealing creatives that help your brand connect with the right audience. From content planning and creative design to community engagement and performance tracking, our team manages every aspect of your social media to increase brand awareness, boost engagement, and generate quality leads. Whether you're a startup or an established business, we help you grow consistently across Instagram, Facebook, LinkedIn, YouTube, and other leading social platforms." },
  { title: "Meta Ads", description: "Reach the right audience at the right time with Digibrandz's Meta Ads Services. We create high-performing advertising campaigns across Facebook and Instagram to increase brand awareness, generate quality leads, drive website traffic, and boost sales. From audience targeting and creative ad design to campaign management and performance optimization, our team ensures every ad is strategically planned to deliver measurable results and maximize your return on investment (ROI)." },
  { title: "Google Ads / PPC", description: "Drive instant visibility and reach customers actively searching for your products or services with Digibrandz's Google Ads (PPC) Services. We create and manage result-driven campaigns that help businesses generate quality leads, increase website traffic, and maximize conversions. From keyword research and ad copy creation to bid management and continuous optimization, our experts ensure every campaign is focused on delivering the best possible return on your advertising investment." },
  { title: "Website SEO", description: "Improve your website's visibility and attract high-quality organic traffic with Digibrandz's Website SEO Services. We use proven, search engine-friendly strategies to help your website rank higher on Google, increase online visibility, and drive long-term business growth. From in-depth keyword research and on-page optimization to technical SEO and content enhancement, our team focuses on improving your website's performance while delivering a seamless user experience." },
  { title: "Google My Business / Local SEO", description: "Increase your local visibility and connect with customers searching for your business nearby through Digibrandz's Google My Business & Local SEO Services. We optimize your Google Business Profile and implement effective local SEO strategies to improve your presence in local search results and Google Maps. From profile optimization and local keyword targeting to review management and location-based SEO, we help your business attract more local customers, generate quality leads, and build a trusted online reputation." },
  { title: "Website & App Development", description: "Create powerful digital experiences with Digibrandz's Website & App Development Services. We design and develop responsive websites and user-friendly mobile applications that combine modern design, seamless functionality, and high performance. Whether you need a business website, e-commerce platform, portfolio, or custom mobile application, our solutions are built to enhance user experience, strengthen your online presence, and support long-term business growth." },
  { title: "Real Estate Lead Generation", description: "Generate high-quality property enquiries with Digibrandz's Real Estate Lead Generation Services. We create targeted digital marketing campaigns that connect builders, developers, brokers, and real estate agencies with genuine homebuyers and investors. By combining strategic advertising, optimized landing pages, and audience-focused campaigns, we help you attract qualified leads, increase site visits, and maximize your property sales." },
  { title: "E-Commerce / Quick Commerce", description: "Accelerate your online sales with Digibrandz's E-Commerce & Quick Commerce Solutions. We help businesses build, optimize, and market online stores that deliver seamless shopping experiences and faster customer conversions. Whether you're launching a new e-commerce brand or scaling your presence on quick commerce platforms, our data-driven strategies, performance marketing, and user-focused solutions are designed to increase visibility, boost sales, and support sustainable business growth." },
  { title: "Performance Marketing", description: "Grow your business with Digibrandz's Performance Marketing Services, designed to deliver measurable results and maximize your return on investment (ROI). We create data-driven campaigns across multiple digital platforms to generate quality leads, increase website traffic, improve conversions, and drive sustainable business growth. Every campaign is continuously monitored and optimized to ensure your marketing budget delivers the best possible performance." },
  { title: "AI Video Creation", description: "Transform your ideas into engaging visual content with Digibrandz's AI Video Creation Services. We create high-quality AI-powered videos that help businesses capture attention, communicate their message effectively, and strengthen their digital presence. Whether it's promotional videos, product showcases, social media reels, explainer videos, or corporate presentations, our creative team combines AI technology with compelling storytelling to deliver professional videos that drive engagement and brand growth." },
  { title: "Influencer Marketing", description: "Expand your brand's reach with Digibrandz's Influencer Marketing Services. We connect your business with trusted content creators and influencers who genuinely resonate with your target audience. From campaign planning and influencer selection to content collaboration and performance tracking, we create authentic partnerships that increase brand awareness, build credibility, and drive meaningful engagement across social media platforms." },
  { title: "Video Editing & Creative Designing", description: "Bring your brand to life with Digibrandz's Video Editing & Creative Designing Services. We create visually compelling content that captures attention, strengthens brand identity, and enhances audience engagement across digital platforms. From professional video editing to eye-catching graphics and marketing creatives, our team delivers high-quality designs that communicate your message effectively and leave a lasting impression." },
  { title: "WhatsApp & SMS Marketing", description: "Connect with your customers instantly through Digibrandz's WhatsApp & SMS Marketing Services. We help businesses deliver personalized messages, promotional offers, updates, and customer notifications directly to their audience. Using targeted campaigns and automation, we improve customer engagement, increase response rates, and drive more leads, sales, and repeat business through fast and effective communication." },
  { title: "Videography & Photography", description: "Capture your brand's story with Digibrandz's Videography & Photography Services. We produce high-quality visual" }
];

async function run() {
  for (const s of services) {
    const slug = s.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    
    // Check if exists
    const res = await turso.execute({
      sql: 'SELECT id FROM services WHERE title = ?',
      args: [s.title]
    });
    if (res.rows.length === 0) {
      await turso.execute({
        sql: 'INSERT OR IGNORE INTO services (title, slug, description, status, display_order) VALUES (?, ?, ?, ?, ?)',
        args: [s.title, slug, s.description, 'published', 0]
      });
      console.log('Inserted:', s.title);
    } else {
      console.log('Skipped (already exists):', s.title);
    }
  }
}

run();
