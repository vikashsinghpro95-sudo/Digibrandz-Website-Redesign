const fs = require('fs');

const contentStr = fs.readFileSync('src/data/content.js', 'utf8');

// The new CASE_STUDIES to add
const newCaseStudies = `
  {
    id: "tanaji-group",
    industry: "Construction",
    client: "Tanaji Group",
    overview: "Tanaji Group is a leading industrial construction company providing cost-effective and intelligent infrastructure solutions across the pharmaceutical, chemical, food & beverage, automobile, heavy engineering, warehousing, petrochemical, and institutional sectors.",
    challenges: [
      "Building a professional Digital Presence for an industrial construction company.",
      "Showcasing expertise across multiple Industrial Construction sectors.",
      "Creating a modern platform to present projects, services, and capabilities.",
      "Improving Brand Visibility among industrial clients and businesses.",
      "Developing a scalable and SEO-Friendly Website for future growth."
    ],
    whatWeDid: {
      "Dynamic Website Development": [
        "Designed and developed a modern dynamic website tailored for the industrial construction industry.",
        "Created dedicated pages to showcase services, industries served, and completed projects.",
        "Built a scalable website for easy content management and future updates.",
        "Delivered a fully responsive website for seamless access across all devices."
      ],
      "UI/UX Design": [
        "Designed a clean and professional UI/UX aligned with the company's corporate identity.",
        "Created an intuitive navigation structure for better user experience.",
        "Organized content for easy access to services and project information.",
        "Enhanced visual presentation to strengthen brand credibility."
      ],
      "Website Performance & Optimization": [
        "Optimized website speed and overall performance.",
        "Improved mobile responsiveness and cross-browser compatibility.",
        "Enhanced website functionality for smooth browsing.",
        "Delivered a reliable and user-friendly digital experience."
      ],
      "SEO-Friendly Website Structure": [
        "Built an SEO-friendly website architecture for better search engine visibility.",
        "Optimized page structure, metadata, and service content.",
        "Implemented industry-specific SEO keywords for improved discoverability.",
        "Created a strong foundation for long-term Organic Traffic growth."
      ]
    }
  },
  {
    id: "techport-solutions",
    industry: "Automation",
    client: "TechPort Solutions",
    overview: "TechPort Solutions is a leading Industrial Automation company specializing in Process Automation, Factory Automation, PLC Programming, SCADA, Machine Automation, RTU, Energy Management Systems, Building Automation, and Engineering Services.",
    challenges: [
      "No professional business website to showcase products and services.",
      "No active LinkedIn presence for corporate branding.",
      "Limited online visibility in the industrial automation sector.",
      "No platform to present technical expertise and completed projects.",
      "Difficulty reaching potential B2B clients digitally.",
      "Weak digital brand identity compared to competitors."
    ],
    whatWeDid: {
      "Static Website Development": [
        "Designed and developed a modern static website with a professional and responsive layout.",
        "Structured dedicated pages for automation services, engineering solutions, products, and company information.",
        "Created a fast-loading website with seamless navigation and mobile responsive.",
        "Built a professional digital platform to strengthen the company's online presence."
      ],
      "LinkedIn Branding": [
        "Created and optimized the company's LinkedIn Business Page.",
        "Developed a professional company profile highlighting industrial automation expertise.",
        "Published technical and industry-focused content to increase brand credibility.",
        "Improved corporate visibility and engagement among B2B professionals."
      ],
      "UI/UX Design": [
        "Designed a clean, user-friendly interface for better user experience.",
        "Maintained consistent corporate branding throughout the website.",
        "Organized content to help visitors easily explore services and solutions.",
        "Enhanced website usability with a structured navigation flow."
      ],
      "Digital Brand Presence": [
        "Established a strong online presence through a professional website and LinkedIn branding.",
        "Strengthened the company's digital identity in the Industrial Automation industry.",
        "Improved business credibility with a modern corporate presentation.",
        "Created a reliable platform to showcase technical capabilities and generate business enquiries."
      ]
    }
  },
  {
    id: "venkateshwara-agro",
    industry: "Agriculture",
    client: "Venkateshwara Co-operative Power & Agro Processing Ltd.",
    overview: "Venkateshwara Co-operative Power & Agro Processing Ltd. is a leading organization in the agriculture and agro-processing sector, committed to empowering farmers through sustainable agricultural practices, agro-processing, and cooperative development.",
    challenges: [
      "No active presence across Instagram, Facebook, YouTube, and X (Twitter).",
      "Limited brand awareness in the digital space.",
      "Low audience engagement on social media.",
      "Offline brand recognition with minimal online visibility.",
      "No structured content strategy to showcase agricultural initiatives and events.",
      "Difficulty reaching farmers, stakeholders, and the wider agricultural community online.",
      "Lack of consistent branding across digital platforms."
    ],
    whatWeDid: {
      "Social Media Marketing": [
        "Created and professionally managed Instagram, Facebook, YouTube, and X (Twitter) accounts.",
        "Developed a strategic content calendar featuring agricultural initiatives, corporate events, farmer programs, and company achievements.",
        "Published consistent reels, videos, creatives, and informative posts to increase audience engagement.",
        "Strengthened the brand's digital identity through professional and consistent communication."
      ],
      "Brand Awareness": [
        "Increased the company's online presence through regular and engaging content.",
        "Showcased agricultural projects, community activities, and corporate milestones.",
        "Improved brand recognition among farmers, business partners, and the agricultural community.",
        "Connected the offline brand with a stronger and more impactful digital presence."
      ],
      "Content Strategy & Engagement": [
        "Created event-focused, educational, and awareness-driven content.",
        "Highlighted farmer initiatives, agro-processing operations, and corporate activities.",
        "Increased engagement through interactive posts, reels, and storytelling.",
        "Built a loyal digital community around the brand."
      ],
      "Performance Optimization": [
        "Optimized social media profiles with professional branding and strategic call-to-actions.",
        "Monitored audience insights and engagement metrics to improve content performance.",
        "Enhanced profile visibility through consistent optimization and content planning.",
        "Improved overall digital reach and brand recall across multiple platforms."
      ]
    }
  },
  {
    id: "latur-mahanagar-palika",
    industry: "Government Sector",
    client: "Latur Mahanagar Palika",
    overview: "Latur Mahanagar Palika is a civic administration body responsible for managing public services, urban development, and citizen welfare initiatives in Latur city.",
    challenges: [
      "Building a strong Social Media Presence for civic communication.",
      "Increasing public awareness about Municipal Projects and Initiatives.",
      "Creating transparent communication between the organization and citizens.",
      "Improving visibility of development work across digital platforms.",
      "Building public trust through consistent and informative content."
    ],
    whatWeDid: {
      "Social Media Marketing": [
        "Managed Instagram, Facebook, YouTube, and Twitter platforms for effective public communication.",
        "Created informative content highlighting civic projects, initiatives, and updates.",
        "Developed engaging creatives and videos to improve citizen awareness.",
        "Increased digital visibility through consistent content publishing."
      ],
      "Video Content & Digital Communication": [
        "Created impactful video content showcasing municipal work and public initiatives.",
        "Developed awareness-focused videos to connect with citizens.",
        "Generated million+ views across social media platforms.",
        "Improved transparency through regular digital updates and communication."
      ],
      "Election Campaign Management": [
        "Planned and executed strategic Election Campaigns across digital platforms.",
        "Created campaign creatives, videos, and communication content.",
        "Improved audience reach and engagement during election activities.",
        "Strengthened digital communication with targeted campaign strategies."
      ],
      "Brand Presence & Content Strategy": [
        "Built a professional Digital Brand Presence for Latur Mahanagar Palika.",
        "Developed a structured Social Media Content Strategy.",
        "Maintained consistent messaging across multiple platforms.",
        "Enhanced public trust through informative and transparent communication."
      ]
    }
  },
  {
    id: "nashik-mahanagar-palika",
    industry: "Government Sector",
    client: "Nashik Mahanagar Palika",
    overview: "Nashik Mahanagar Palika is a civic governing organization responsible for city administration, public services, infrastructure development, and citizen-focused initiatives in Nashik.",
    challenges: [
      "Establishing a strong Digital Communication Platform for citizen engagement.",
      "Increasing awareness about Civic Development Projects and municipal activities.",
      "Creating a consistent content flow across multiple social media channels.",
      "Improving public interaction through modern Social Media Platforms.",
      "Communicating important updates and initiatives in a clear and engaging manner."
    ],
    whatWeDid: {
      "Social Media Marketing": [
        "Managed Instagram, Facebook, YouTube, and Twitter platforms for effective citizen communication.",
        "Created informative posts, project updates, and awareness-based content.",
        "Developed engaging visuals to highlight municipal initiatives.",
        "Improved audience connection through regular digital updates."
      ],
      "Digital Awareness Campaigns": [
        "Created content campaigns focused on public information and civic awareness.",
        "Presented development activities through engaging digital formats.",
        "Improved understanding of municipal initiatives among citizens.",
        "Strengthened communication between the organization and the public."
      ],
      "Election Campaign Management": [
        "Executed strategic Election Campaigns through digital platforms.",
        "Designed campaign creatives, videos, and communication materials.",
        "Supported wider reach and engagement during election activities.",
        "Managed timely content publishing for campaign requirements."
      ],
      "Content Planning & Digital Presence": [
        "Developed a structured Social Media Content Strategy.",
        "Maintained consistent brand communication across platforms.",
        "Improved online visibility of Nashik Mahanagar Palika initiatives.",
        "Built a professional and trustworthy digital presence."
      ]
    }
  }
`;

// Insert the new case studies before the end of the CASE_STUDIES array.
let modifiedContent = contentStr.replace(/}\n\];\n\nexport const CAREERS = {/g, '},\n' + newCaseStudies + '\n];\n\nexport const CAREERS = {');

const newJobs = `[
    {
      id: "digital-marketing-executive",
      title: "Digital Marketing Executive",
      experience: "1-3 Years",
      type: "Full-Time",
      description: "Manage end-to-end digital marketing strategies to improve brand presence and lead generation.",
      skills: ["SEO", "Social Media", "Google Ads", "Content Marketing", "Analytics"]
    },
    {
      id: "seo-executive",
      title: "SEO Executive",
      experience: "1-3 Years",
      type: "Full-Time",
      description: "Optimize websites to rank higher on Google through advanced on-page and off-page strategies.",
      skills: ["Keyword Research", "On-Page SEO", "Link Building", "Google Analytics", "Search Console", "Local SEO (GMB)"]
    },
    {
      id: "social-media-executive",
      title: "Social Media Executive",
      experience: "1-3 Years",
      type: "Full-Time",
      description: "Manage multiple brand accounts, plan content calendars, and drive audience engagement.",
      skills: ["Content Strategy", "Trend Analysis", "Copywriting", "Community Management", "Platform Knowledge (IG, FB, LI, YT)"]
    },
    {
      id: "business-development-executive",
      title: "Business Development Executive",
      experience: "1-3 Years",
      type: "Full-Time",
      description: "Generate new business opportunities, build client relationships, and drive agency sales.",
      skills: ["B2B Sales", "Lead Generation", "Client Pitching", "CRM Management", "Negotiation", "Networking"]
    },
    {
      id: "business-analyst",
      title: "Business Analyst",
      experience: "1-3 Years",
      type: "Full-Time",
      description: "Analyze business processes, gather requirements, and create data-driven strategies for client projects.",
      skills: ["Requirement Gathering", "Data Analysis", "Client Communication", "Agile Methodologies", "Documentation"]
    },
    {
      id: "graphic-designer",
      title: "Graphic Designer",
      experience: "1-3 Years",
      type: "Full-Time",
      description: "Create visually stunning graphics, social media posts, and branding materials that capture attention.",
      skills: ["Adobe Photoshop", "Illustrator", "Canva", "Typography", "Color Theory", "Brand Identity Design"]
    },
    {
      id: "video-editor",
      title: "Video Editor",
      experience: "1-3 Years",
      type: "Full-Time",
      description: "Edit engaging social media reels, promotional videos, and corporate content.",
      skills: ["Premiere Pro", "After Effects", "Color Grading", "Audio Mixing", "Motion Graphics", "Reel Editing"]
    },
    {
      id: "website-developer",
      title: "Website Developer",
      experience: "2-4 Years",
      type: "Full-Time",
      description: "Develop fast, responsive, and secure websites and web applications.",
      skills: ["HTML/CSS/JS", "React.js", "Node.js", "WordPress (Optional)", "API Integration", "Database Management"]
    },
    {
      id: "ui-ux-designer",
      title: "UI/UX Designer",
      experience: "2-4 Years",
      type: "Full-Time",
      description: "Design intuitive, user-friendly, and beautiful interfaces for websites and mobile applications.",
      skills: ["Figma", "Adobe XD", "Wireframing", "Prototyping", "User Research", "Responsive Design"]
    },
    {
      id: "content-writer",
      title: "Content Writer",
      experience: "1-3 Years",
      type: "Full-Time",
      description: "Write compelling copy for websites, blogs, social media, and advertising campaigns.",
      skills: ["SEO Writing", "Copywriting", "Blog Writing", "Social Media Captions", "Proofreading", "Creative Storytelling"]
    }
  ]
};`;

// Replace jobs array in CAREERS object
modifiedContent = modifiedContent.replace(/jobs: \[\s*\{[\s\S]*\}\s*\]\s*\};\s*$/g, 'jobs: ' + newJobs);

fs.writeFileSync('src/data/content.js', modifiedContent);
console.log('Successfully updated content.js');
