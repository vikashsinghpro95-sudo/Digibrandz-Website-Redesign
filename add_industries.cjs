const fs = require('fs');

const missingIndustries = [
  {
    id: "education",
    title: "Education",
    description: "Transforming the education sector with scalable e-learning platforms, student management systems, and targeted digital marketing campaigns to drive enrollments.",
    offers: ["E-Learning Platform Development", "Student Information Systems", "Lead Generation for Admissions", "Virtual Classrooms (WebRTC)", "Alumni Network Portals"],
    faqs: [
      { q: "Can you integrate Zoom or Teams into the platform?", a: "Yes, we can seamlessly integrate video conferencing tools directly into your custom LMS." }
    ]
  },
  {
    id: "healthcare",
    title: "Healthcare",
    description: "Secure, compliant, and patient-centric digital solutions for hospitals, clinics, and telehealth providers.",
    offers: ["Telemedicine App Development", "HIPAA-Compliant Portals", "Patient Booking Systems", "Healthcare SEO & Lead Gen", "EHR/EMR Integrations"],
    faqs: [
      { q: "Are your healthcare apps HIPAA compliant?", a: "Absolutely. We follow strict security protocols and encryption standards to ensure full compliance." }
    ]
  },
  {
    id: "real-estate",
    title: "Real Estate",
    description: "Empowering real estate agencies and developers with high-converting property portals, CRM systems, and aggressive lead generation strategies.",
    offers: ["Property Listing Portals", "Real Estate CRM", "Lead Generation via Meta & Google", "3D Virtual Tours Integration", "Automated Follow-ups"],
    faqs: [
      { q: "Can you sync listings from MLS?", a: "Yes, we can build direct API integrations to sync properties from MLS or other listing networks." }
    ]
  },
  {
    id: "e-commerce",
    title: "E-Commerce",
    description: "Scalable, high-performance e-commerce platforms designed to maximize conversions and streamline inventory management.",
    offers: ["Custom Shopify Development", "Headless E-Commerce", "Multi-Vendor Marketplaces", "Abandoned Cart Automation", "Conversion Rate Optimization"],
    faqs: [
      { q: "Can you handle high-traffic flash sales?", a: "Yes, we build our custom e-commerce platforms on scalable cloud infrastructure to handle traffic spikes." }
    ]
  },
  {
    id: "finance",
    title: "Finance & Fintech",
    description: "Secure, robust financial software and marketing strategies for banks, fintech startups, and accounting firms.",
    offers: ["Secure Payment Gateways", "Fintech App Development", "Financial Dashboards", "SEO for Financial Services", "Data Encryption & Security"],
    faqs: [
      { q: "Do you follow financial compliance standards?", a: "Yes, we build software adhering to PCI-DSS and other relevant financial security standards." }
    ]
  },
  {
    id: "manufacturing",
    title: "Manufacturing",
    description: "Digital transformation for the manufacturing sector, including ERP solutions, B2B portals, and industrial IoT dashboards.",
    offers: ["Custom ERP Solutions", "B2B Wholesale Portals", "Inventory Management Systems", "Industrial Marketing", "Supply Chain Automation"],
    faqs: [
      { q: "Can your ERP integrate with our old machines?", a: "Through IoT integrations, we can often bridge the gap between legacy machinery and modern software." }
    ]
  },
  {
    id: "logistics",
    title: "Logistics",
    description: "Streamlining operations with advanced fleet management, real-time tracking, and route optimization software.",
    offers: ["Fleet Tracking Apps", "Warehouse Management Systems", "Route Optimization APIs", "B2B Lead Generation", "Customer Tracking Portals"],
    faqs: [
      { q: "Do you provide real-time GPS tracking?", a: "Yes, we integrate Google Maps and custom GPS hardware APIs for real-time tracking." }
    ]
  },
  {
    id: "restaurants",
    title: "Restaurants & Hospitality",
    description: "Enhancing the dining experience with custom POS systems, online ordering apps, and local SEO to drive foot traffic.",
    offers: ["Online Ordering Systems", "Restaurant POS Integrations", "Local SEO & GMB Optimization", "Social Media Marketing", "Loyalty Programs"],
    faqs: [
      { q: "Is the ordering system commission-free?", a: "Yes, when we build a custom ordering system for you, you own it—no third-party commissions." }
    ]
  },
  {
    id: "travel-tourism",
    title: "Travel & Tourism",
    description: "Immersive booking platforms and digital marketing campaigns that inspire wanderlust and drive bookings.",
    offers: ["Custom Booking Engines", "Travel Agency Portals", "Social Media Advertising", "SEO for Travel Agencies", "Review Management"],
    faqs: [
      { q: "Can you integrate flight and hotel APIs?", a: "Yes, we integrate with Amadeus, Sabre, and various hotel APIs for real-time inventory." }
    ]
  },
  {
    id: "automotive",
    title: "Automotive",
    description: "Accelerating growth for dealerships and automotive brands with dynamic inventory systems and targeted lead gen.",
    offers: ["Dealership Inventory Portals", "Service Booking Systems", "Targeted PPC Campaigns", "Automotive CRM", "Virtual Showrooms"],
    faqs: [
      { q: "Can the website sync with our dealership management system?", a: "Yes, we build automated data feeds to sync your existing inventory directly to the website." }
    ]
  },
  {
    id: "professional-services",
    title: "Professional Services",
    description: "Building authority and driving qualified leads for law firms, consultants, and B2B service providers.",
    offers: ["Authority Building SEO", "LinkedIn Lead Generation", "Appointment Scheduling Portals", "Client Portals", "Email Automation"],
    faqs: [
      { q: "How do you generate leads for B2B?", a: "We use a mix of LinkedIn automation, cold email outreach, and high-intent Google Search campaigns." }
    ]
  },
  {
    id: "startups",
    title: "Startups",
    description: "Agile, scalable MVPs and aggressive growth marketing strategies to help startups achieve product-market fit fast.",
    offers: ["MVP Development", "SaaS Architecture", "Growth Hacking Campaigns", "Pitch Deck Design", "Investor Portals"],
    faqs: [
      { q: "Do you build MVPs quickly?", a: "Yes, we focus on rapid prototyping and agile development to get your MVP to market in weeks, not months." }
    ]
  },
  {
    id: "retail",
    title: "Retail",
    description: "Bridging the gap between physical and digital retail with omnichannel solutions and localized marketing.",
    offers: ["Omnichannel POS Sync", "Local SEO Campaigns", "Loyalty Apps", "Click-and-Collect Systems", "Inventory Automation"],
    faqs: [
      { q: "Can you link our physical POS to the online store?", a: "Yes, we build integrations to ensure your online and in-store inventory is always perfectly synced." }
    ]
  },
  {
    id: "entertainment",
    title: "Entertainment",
    description: "Engaging digital experiences for media companies, event organizers, and creators.",
    offers: ["Ticketing Platforms", "Video Streaming Portals", "Social Media Hype Campaigns", "Influencer Marketing", "Creator Portals"],
    faqs: [
      { q: "Can you build a platform that handles high video bandwidth?", a: "Yes, we use advanced CDNs and cloud infrastructure to ensure smooth video streaming." }
    ]
  }
];

let contentStr = fs.readFileSync('src/data/content.js', 'utf8');

// Append the INDUSTRIES array at the very end of the file
const formattedIndustries = `\nexport const INDUSTRIES = [\n  ` + missingIndustries.map(ind => {
  return JSON.stringify(ind, null, 2).replace(/\\n/g, '\\n').replace(/\n/g, '\n  ');
}).join(',\n  ') + `\n];\n`;

fs.appendFileSync('src/data/content.js', formattedIndustries);
console.log("Successfully appended INDUSTRIES array to content.js");
