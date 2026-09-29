import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Mock imports for the data files
// Since they are ES modules and we are running in Node, we can import them.
import { ABOUT_US, SERVICES, CASE_STUDIES, CAREERS, INDUSTRIES } from './src/data/content.js';
import { TEAM_MEMBERS } from './src/data/team.js';
import { TESTIMONIALS } from './src/data/testimonials.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const seedData = {
    settings: {
        heroTitle: 'Empowering Your Digital Evolution',
        heroSubtitle: 'We engineer high-performance software and execute data-driven marketing strategies to accelerate your growth.',
        aboutTitle: 'Driving Digital Innovation Since 2018',
        aboutText: ABOUT_US.story,
        aboutVision: ABOUT_US.vision,
        aboutMission: ABOUT_US.mission,
        aboutTeam: ABOUT_US.team,
        aboutOffice: ABOUT_US.office,
        aboutAwards: ABOUT_US.awards,
        servicesTitle: 'Our Expertise',
        servicesSubtitle: 'Comprehensive digital solutions tailored to scale your business and dominate your market.',
        primaryColor: '#601D49',
        secondaryColor: '#BD5579',
        contactEmail: 'contact@digibrandz.com',
        contactPhone: '+91 (123) 456-7890',
        contactAddress: '123 Innovation Drive, Tech District, 400001',
        footerText: 'Building digital experiences that scale. Let us build your next big idea.',
        heroFacts: JSON.stringify([
            "Great Content Keeps People Engaged",
            "Right SEO Brings Consistent Traffic",
            "Data Leads to Better Decisions",
            "Social Media Strengthens Your Brand",
            "Effective Ads Show Quick Results",
            "Videos Grab More Attention",
            "Building Trust Increases Sales",
            "Consistency Drives Growth",
            "Reaching the Right Audience is Key",
            "Clear CTAs Encourage Action",
            "Email Marketing Retains Customers",
            "Retargeting Brings Back Interest",
            "Analytics Shows What Works",
            "Right Keywords Increase Search Traffic",
            "Strong Branding is Memorable",
            "Clean Code is Easy to Understand",
            "Testing Catches Bugs Early",
            "Git Keeps Code Changes Safe",
            "Good Documentation Saves Time",
            "Security Should Be Built-In",
            "Small Functions Simplify Code",
            "Reusable Code Saves Effort",
            "APIs Connect Different Systems",
            "Databases Secure Application Data",
            "Debugging Finds the Root Cause",
            "Automation Simplifies Repetitive Tasks",
            "Version Control Recovers Old Changes",
            "Good UI Makes Apps Easy to Use",
            "Fast Performance Improves UX",
            "AI is Transforming Software Development"
        ])
    },
    services: SERVICES,
    case_studies: CASE_STUDIES,
    careers: CAREERS,
    industries: INDUSTRIES,
    team: TEAM_MEMBERS,
    testimonials: TESTIMONIALS
};

fs.writeFileSync(
    path.join(__dirname, 'private', 'migrations', 'seed.json'), 
    JSON.stringify(seedData, null, 2)
);

console.log('Successfully generated seed.json from frontend data.');
