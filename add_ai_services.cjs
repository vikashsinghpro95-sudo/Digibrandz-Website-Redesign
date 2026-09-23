const fs = require('fs');

const missingServices = [
  {
    id: "ai-chatbots",
    title: "AI Chatbots",
    description: "Intelligent, conversational AI chatbots that understand natural language, engage website visitors 24/7, and guide users through complex sales funnels.",
    offers: ["Custom LLM Integration", "Lead Qualification Bots", "E-commerce Shopping Assistants", "Multi-lingual Support", "CRM Syncing"],
    faqs: [
      { q: "Are these simple rule-based bots?", a: "No, we build advanced NLP (Natural Language Processing) bots using LLMs like OpenAI that understand context and intent." },
      { q: "Can the chatbot answer specific questions about our business?", a: "Yes, we train the AI on your specific company data, FAQs, and documents using RAG (Retrieval-Augmented Generation)." }
    ]
  },
  {
    id: "ai-customer-support",
    title: "AI Customer Support",
    description: "Automate tier-1 and tier-2 customer support with AI agents capable of resolving tickets, answering queries, and escalating complex issues seamlessly.",
    offers: ["Zendesk/Intercom Integration", "Ticket Auto-Resolution", "Sentiment Analysis", "24/7 Global Support", "Agent Handoff Workflows"],
    faqs: [
      { q: "Will AI replace my support team?", a: "AI handles the repetitive inquiries, allowing your human agents to focus on complex, high-value customer interactions." }
    ]
  },
  {
    id: "whatsapp-automation",
    title: "WhatsApp Automation",
    description: "Turn the world's most popular messaging app into a powerful sales and support channel with custom conversational flows and AI integration.",
    offers: ["WhatsApp Business API Setup", "Automated Order Updates", "Drip Campaigns", "Conversational Commerce", "Broadcast Messaging"],
    faqs: [
      { q: "Can users buy directly through WhatsApp?", a: "Yes, we can build end-to-end conversational commerce flows where users browse and purchase within WhatsApp." }
    ]
  },
  {
    id: "business-process-automation",
    title: "Business Process Automation",
    description: "Replace manual, error-prone corporate processes with intelligent, automated workflows that connect your disparate software systems.",
    offers: ["Robotic Process Automation (RPA)", "Data Entry Automation", "Invoice Processing", "HR Onboarding Workflows", "Cross-Platform Syncing"],
    faqs: [
      { q: "What systems can you integrate with?", a: "We can connect almost any modern software that has an API, including ERPs, CRMs, and accounting software." }
    ]
  },
  {
    id: "ai-content-generation",
    title: "AI Content Generation",
    description: "Scale your marketing efforts with custom-tuned AI models that generate brand-aligned blogs, social media posts, and product descriptions at scale.",
    offers: ["Programmatic SEO", "Social Media Post Generation", "Dynamic Email Copy", "Product Description Generation", "Brand Voice Fine-tuning"],
    faqs: [
      { q: "Will the content sound robotic?", a: "No, we fine-tune the models using your existing content to ensure it perfectly mimics your unique brand voice." }
    ]
  },
  {
    id: "ai-agents",
    title: "AI Agents",
    description: "Deploy autonomous AI agents capable of researching, reasoning, and executing complex multi-step tasks across the internet on your behalf.",
    offers: ["Autonomous Task Execution", "Web Scraping Agents", "Competitive Analysis Bots", "Scheduling Assistants", "Multi-Agent Systems"],
    faqs: [
      { q: "What is the difference between a chatbot and an AI agent?", a: "A chatbot responds to user input. An AI agent is given a goal and autonomously decides the steps needed to achieve it." }
    ]
  },
  {
    id: "workflow-automation",
    title: "Workflow Automation",
    description: "Seamlessly connect your tech stack using Zapier, Make, and custom webhooks so data flows perfectly without human intervention.",
    offers: ["Zapier & Make Setup", "Custom Webhooks", "Trigger-Based Workflows", "Error Handling & Logging", "API Scripting"],
    faqs: [
      { q: "Do we need enterprise software for this?", a: "No, we can automate workflows between everyday tools like Google Sheets, Slack, Gmail, and Trello." }
    ]
  },
  {
    id: "ai-dashboards",
    title: "AI Dashboards",
    description: "Visualize complex data and receive AI-driven insights, predictive forecasts, and anomaly detection in real-time.",
    offers: ["Predictive Analytics", "Real-Time Data Visualization", "Anomaly Detection", "Natural Language Querying", "Custom KPI Tracking"],
    faqs: [
      { q: "Can I ask the dashboard questions?", a: "Yes, we can build 'Chat-to-Data' interfaces where you can type questions and get instant charts and insights." }
    ]
  },
  {
    id: "document-processing",
    title: "Document Processing",
    description: "Instantly extract, categorize, and validate data from thousands of PDFs, invoices, and forms using intelligent OCR and AI.",
    offers: ["Intelligent OCR", "Invoice & Receipt Parsing", "Contract Analysis", "Automated Data Entry", "Language Translation"],
    faqs: [
      { q: "Is the data extraction accurate?", a: "Modern AI models achieve near-human accuracy, even with unstructured data or varying document layouts." }
    ]
  },
  {
    id: "recommendation-systems",
    title: "Recommendation Systems",
    description: "Increase cart size and user retention with AI models that predict user behavior and recommend hyper-personalized products or content.",
    offers: ["Collaborative Filtering", "Content-Based Filtering", "E-commerce Upselling", "Real-Time Personalization", "User Behavior Tracking"],
    faqs: [
      { q: "How much data is needed for this to work?", a: "While more data is better, we can implement hybrid models that work effectively even for new users (cold start problem)." }
    ]
  },
  {
    id: "api-ai-integrations",
    title: "API & AI Integrations",
    description: "Connect the world's most powerful AI models (OpenAI, Anthropic, Google) directly into your proprietary software and workflows.",
    offers: ["OpenAI API Integration", "Anthropic Claude Setup", "Local LLM Deployment", "Voice & Speech APIs", "Vision AI Integration"],
    faqs: [
      { q: "Is our data safe with these APIs?", a: "Yes, enterprise API endpoints for models like OpenAI are private and do not use your data for training future models." }
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
console.log("Successfully injected 11 missing AI services into content.js");
