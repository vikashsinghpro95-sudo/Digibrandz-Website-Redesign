const fs = require('fs');

const missingServices = [
  // Software Development
  {
    id: "custom-software",
    title: "Custom Software",
    description: "We build tailored software solutions from the ground up, designed to perfectly match your specific business requirements, workflows, and long-term goals.",
    offers: ["Requirements Analysis", "System Architecture Design", "Full-Stack Development", "Legacy System Modernization", "Testing & QA", "Deployment & Maintenance"],
    faqs: [
      { q: "How long does custom software development take?", a: "Timelines vary based on complexity, but most projects range from 3 to 6 months." },
      { q: "Will I own the source code?", a: "Yes, upon project completion and full payment, you own 100% of the intellectual property." }
    ]
  },
  {
    id: "web-apps",
    title: "Web Apps",
    description: "High-performance, scalable web applications built with modern frameworks like React, Node.js, and Next.js, delivering seamless user experiences across all devices.",
    offers: ["Single Page Applications (SPA)", "Progressive Web Apps (PWA)", "Custom Portals", "Cloud-Native Development", "API Integrations"],
    faqs: [
      { q: "Are your web apps mobile-friendly?", a: "Absolutely. All our web applications are built with a mobile-first, responsive design approach." },
      { q: "What technologies do you use?", a: "We specialize in the MERN stack (MongoDB, Express, React, Node) and Next.js for high performance." }
    ]
  },
  {
    id: "mobile-apps",
    title: "Mobile Apps",
    description: "Engaging, high-performance native and cross-platform mobile applications for iOS and Android that users love and businesses rely on.",
    offers: ["iOS App Development", "Android App Development", "Cross-Platform (React Native/Flutter)", "App UI/UX Design", "App Store Optimization (ASO)"],
    faqs: [
      { q: "Do you build for both iOS and Android?", a: "Yes, we build native apps for both platforms as well as cost-effective cross-platform solutions." },
      { q: "Can you help publish the app to the stores?", a: "Yes, we handle the entire submission process for both the Apple App Store and Google Play Store." }
    ]
  },
  {
    id: "saas-platforms",
    title: "SaaS Platforms",
    description: "End-to-end development of Software-as-a-Service (SaaS) products, featuring multi-tenant architectures, subscription billing, and robust security.",
    offers: ["Multi-Tenant Architecture", "Subscription Billing Integration", "User Role Management", "Data Analytics Dashboards", "Scalable Cloud Hosting"],
    faqs: [
      { q: "Can you integrate Stripe or PayPal for subscriptions?", a: "Yes, we have extensive experience integrating Stripe, PayPal, Razorpay, and other payment gateways." },
      { q: "Is the architecture scalable?", a: "We design SaaS platforms using scalable cloud infrastructures (AWS/GCP) to support rapid user growth." }
    ]
  },
  {
    id: "crm-systems",
    title: "CRM Systems",
    description: "Custom Customer Relationship Management systems designed to streamline your sales pipeline, automate follow-ups, and improve customer retention.",
    offers: ["Lead Management", "Sales Pipeline Tracking", "Automated Workflows", "Email Integration", "Custom Analytics & Reporting"],
    faqs: [
      { q: "Why choose a custom CRM over Salesforce or HubSpot?", a: "A custom CRM is tailored exactly to your unique processes without the expensive recurring licensing fees of off-the-shelf products." },
      { q: "Can it integrate with my website?", a: "Yes, we can seamlessly connect your website lead forms directly into the CRM." }
    ]
  },
  {
    id: "erp-solutions",
    title: "ERP Solutions",
    description: "Comprehensive Enterprise Resource Planning systems that unify your business processes, from inventory and HR to finance and supply chain.",
    offers: ["Inventory Management", "HR & Payroll Modules", "Financial Accounting", "Supply Chain Tracking", "Real-Time Dashboard Reporting"],
    faqs: [
      { q: "Is it possible to migrate data from our old system?", a: "Yes, we provide secure data migration services to ensure a smooth transition to your new ERP." },
      { q: "How secure is the ERP data?", a: "We implement enterprise-grade security protocols, encryption, and role-based access controls." }
    ]
  },
  {
    id: "e-commerce",
    title: "E-Commerce",
    description: "High-converting, scalable custom e-commerce platforms designed to provide frictionless shopping experiences and drive online sales.",
    offers: ["Custom Storefronts", "Secure Payment Gateways", "Inventory Syncing", "Order Management Systems", "Abandoned Cart Recovery"],
    faqs: [
      { q: "Do you build on Shopify or custom stacks?", a: "We offer both headless Shopify development and fully custom e-commerce solutions built from scratch." },
      { q: "Can you handle multi-vendor marketplaces?", a: "Yes, we have the technical expertise to build complex multi-vendor marketplace platforms." }
    ]
  },
  {
    id: "api-development",
    title: "API Development",
    description: "Secure, well-documented, and highly scalable RESTful and GraphQL APIs that connect your software systems and enable seamless data exchange.",
    offers: ["REST & GraphQL APIs", "Third-Party API Integration", "API Gateway Setup", "OAuth & Security Implementation", "Comprehensive Documentation"],
    faqs: [
      { q: "Do you provide API documentation?", a: "Yes, we use tools like Swagger/OpenAPI to provide clear, interactive documentation for your developers." },
      { q: "How do you ensure API security?", a: "We use robust authentication (like JWT/OAuth), rate limiting, and encryption to secure all endpoints." }
    ]
  },
  {
    id: "database-design",
    title: "Database Design",
    description: "Optimized, scalable database architectures tailored for high performance, data integrity, and complex querying requirements.",
    offers: ["Relational Databases (SQL)", "NoSQL Databases (MongoDB)", "Database Migration", "Performance Tuning", "Data Warehousing"],
    faqs: [
      { q: "What databases do you work with?", a: "We work with PostgreSQL, MySQL, MongoDB, Redis, and various cloud-native databases." },
      { q: "Can you optimize our slow queries?", a: "Yes, our database tuning services involve indexing, query refactoring, and caching to improve speed." }
    ]
  },
  {
    id: "enterprise-software",
    title: "Enterprise Software",
    description: "Robust, enterprise-grade software solutions designed to solve complex corporate challenges, improve efficiency, and scale securely.",
    offers: ["Corporate Intranets", "Workflow Automation", "Legacy Modernization", "Data Security & Compliance", "Cloud Infrastructure"],
    faqs: [
      { q: "Do you offer post-launch support?", a: "Yes, we provide SLA-backed maintenance and support to ensure maximum uptime." },
      { q: "Is your software compliant with industry standards?", a: "We can build software compliant with GDPR, HIPAA, or other industry-specific regulations upon request." }
    ]
  },
  {
    id: "business-automation",
    title: "Business Automation",
    description: "Replace repetitive manual tasks with intelligent automated workflows, reducing human error and freeing your team to focus on growth.",
    offers: ["Robotic Process Automation (RPA)", "Zapier/Make Integrations", "Custom Scripting", "Data Sync Automation", "Automated Reporting"],
    faqs: [
      { q: "What kind of tasks can be automated?", a: "Data entry, email responses, invoice generation, lead routing, and file transfers are just a few examples." },
      { q: "Will automation replace my staff?", a: "No, it empowers your staff by removing tedious tasks so they can focus on high-value, strategic work." }
    ]
  },
  {
    id: "ai-applications",
    title: "AI Applications",
    description: "Cutting-edge artificial intelligence integration, from custom LLMs and chatbots to predictive analytics and machine learning models.",
    offers: ["Custom AI Chatbots", "OpenAI/LLM Integration", "Predictive Analytics", "Image & Text Processing", "Machine Learning Models"],
    faqs: [
      { q: "Can you train an AI on our company data?", a: "Yes, we can build specialized AI models (like RAG systems) trained securely on your proprietary documents." },
      { q: "How much does AI integration cost?", a: "It depends on the complexity and token usage of the models, but we offer scalable solutions for all budgets." }
    ]
  },

  // Digital Marketing Missing Slugs
  {
    id: "seo",
    title: "Search Engine Optimization (SEO)",
    description: "Dominate search rankings and drive high-intent organic traffic to your website through technical optimization, authoritative content, and ethical backlinking.",
    offers: ["On-Page SEO", "Technical SEO", "Link Building", "Local SEO", "Content Strategy"],
    faqs: [
      { q: "How long does SEO take to see results?", a: "SEO is a long-term strategy. Significant results typically take 3 to 6 months depending on competition." }
    ]
  },
  {
    id: "meta-advertising",
    title: "Meta Advertising",
    description: "Scale your customer acquisition with data-driven social advertising across Facebook, Instagram, and WhatsApp.",
    offers: ["Campaign Strategy", "A/B Testing", "Retargeting", "Creative Design", "Conversion Tracking"],
    faqs: [
      { q: "What is a good budget for Meta Ads?", a: "We recommend starting with at least $1000/month to gather enough data for proper optimization." }
    ]
  },
  {
    id: "social-media-marketing",
    title: "Social Media Marketing",
    description: "Build a loyal community and elevate your brand presence with engaging, platform-native content strategies.",
    offers: ["Content Creation", "Community Management", "Influencer Outreach", "Analytics Reporting", "Brand Strategy"],
    faqs: [
      { q: "Which platforms should we focus on?", a: "It depends on your audience. B2B often performs best on LinkedIn, while B2C thrives on Instagram and TikTok." }
    ]
  },
  {
    id: "content-marketing",
    title: "Content Marketing",
    description: "Establish industry authority and educate your audience with high-quality blogs, videos, and high-converting lead magnets.",
    offers: ["Blog Writing", "Video Production", "Ebooks & Whitepapers", "Email Newsletters", "SEO Content"],
    faqs: [
      { q: "Do you write the content?", a: "Yes, our team of expert copywriters and industry researchers handle all content creation." }
    ]
  },
  {
    id: "email-automation",
    title: "Email Automation",
    description: "Nurture leads and maximize customer lifetime value with highly personalized, automated email sequences.",
    offers: ["Drip Campaigns", "Newsletter Management", "Abandoned Cart Flows", "List Segmentation", "A/B Testing"],
    faqs: [
      { q: "What email platforms do you use?", a: "We work with Mailchimp, Klaviyo, ActiveCampaign, HubSpot, and more." }
    ]
  },
  {
    id: "lead-generation",
    title: "B2B Lead Generation",
    description: "Fill your sales pipeline with qualified prospects using proven multi-channel acquisition funnels and outreach.",
    offers: ["Cold Email Outreach", "LinkedIn Automation", "Landing Page Optimization", "Lead Magnet Creation", "CRM Setup"],
    faqs: [
      { q: "Are the leads qualified?", a: "Yes, we use strict targeting parameters to ensure you only speak with decision-makers in your target market." }
    ]
  },
  {
    id: "performance-marketing",
    title: "Performance Marketing",
    description: "A holistic, revenue-focused approach where every dollar spent is meticulously tracked, optimized, and scaled.",
    offers: ["Omnichannel Strategy", "ROI Tracking", "Conversion Rate Optimization", "Data Analytics", "Budget Scaling"],
    faqs: [
      { q: "What does performance marketing mean?", a: "It means our primary focus is on measurable actions: leads, sales, and ROI, rather than just brand awareness." }
    ]
  }
];

let contentStr = fs.readFileSync('src/data/content.js', 'utf8');

// Find the export const SERVICES = [ and insert immediately after it
const searchString = 'export const SERVICES = [';
const insertIndex = contentStr.indexOf(searchString) + searchString.length;

if (contentStr.indexOf(searchString) === -1) {
  console.error("Could not find SERVICES array");
  process.exit(1);
}

// Convert missingServices to string and format properly
const formattedMissing = missingServices.map(service => {
  return `\n  ${JSON.stringify(service, null, 2).replace(/\\n/g, '\\n').replace(/\n/g, '\n  ')},`;
}).join('');

const newContentStr = contentStr.slice(0, insertIndex) + formattedMissing + contentStr.slice(insertIndex);

fs.writeFileSync('src/data/content.js', newContentStr);
console.log("Successfully injected 19 missing services into content.js");
