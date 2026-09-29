<?php
require_once __DIR__ . '/private/db.php';

$pdo = get_db_connection();

// 1. Settings
$settings = [
    'aboutTitle' => 'Driving Digital Innovation Since 2018',
    'aboutText' => 'Established in 2024, DigiBrandz IT Solutions was built with one mission—to help businesses grow, innovate, and succeed in the digital world. What started as a vision has quickly evolved into a results-driven Digital Marketing & IT Solutions Company, empowering startups, SMEs, and enterprises with innovative digital strategies.\nToday, we deliver end-to-end solutions including Website Development, Search Engine Optimization (SEO), Social Media Marketing, Google Ads, Meta Ads, Performance Marketing, Branding, AI Video Creation, and creative design services. Guided by innovation, transparency, and measurable results, we partner with businesses to build strong brands, generate quality leads, and achieve long-term digital success.',
    'aboutVision' => 'To become a globally recognized digital transformation partner by empowering businesses with innovative technology, creative strategies, and result-driven digital solutions that inspire growth and create lasting impact.',
    'aboutMission' => 'Our mission is to help businesses succeed in the digital world by delivering SEO-focused websites, powerful branding, AI-powered video solutions, performance marketing, and customer-centric digital strategies that generate measurable results and long-term value.',
    'aboutTeam' => 'Behind every successful project is a passionate team of creative designers, developers, digital marketers, SEO specialists,Photo/Videography, Metam Ads Experts,GMB Experts, AI creators, content strategists, and branding experts. We work collaboratively to deliver innovative solutions that help our clients stand out in today\'s competitive digital landscape.',
    'aboutOffice' => 'Our workspace is designed to inspire creativity, collaboration, and innovation. From brainstorming ideas to launching successful digital campaigns, our office reflects the energy and passion that drive DigiBrandz IT Solutions. Every corner is built to encourage teamwork, creativity, and continuous learning.',
    'aboutAwards' => 'Our greatest achievement is the trust and success of our clients. DigiBrandz continues to earn recognition for delivering innovative digital solutions, exceptional customer experiences, and measurable business results. As we grow, we remain committed to maintaining the highest standards of creativity, quality, and digital excellence.',
    'contactAddress' => "Digibrandz IT Solutions\nOffice No. 323, Aston Plaza, Ambegaon Budruk, Pune, Maharashtra – 411046, India."
];

foreach ($settings as $k => $v) {
    $pdo->execute("INSERT OR REPLACE INTO settings (setting_key, setting_value, setting_group) VALUES (?, ?, 'about')", [$k, $v]);
}
echo "Settings updated.\n";

// 2. Services
$pdo->execute("DELETE FROM services");
$services = [
    [
        'slug' => 'social-media-management',
        'title' => '1. Social Media Management',
        'description' => 'Build a strong digital presence with DigiBrandz Social Media Management Services. We create platform-specific strategies, engaging content, and visually appealing creatives that help your brand connect with the right audience. From content planning and creative design to community engagement and performance tracking, our team manages every aspect of your social media to increase brand awareness, boost engagement, and generate quality leads. Whether you\'re a startup or an established business, we help you grow consistently across Instagram, Facebook, LinkedIn, YouTube, and other leading social platforms.',
        'offers' => json_encode(['Social Media Strategy', 'Content Calendar Planning', 'Creative Post & Reel Design', 'Caption & Hashtag Optimization', 'Community Management', 'Monthly Performance Reports', 'Brand Growth & Audience Engagement']),
        'faqs' => json_encode([
            ['q' => 'Why is social media management important for my business?', 'a' => 'Social media management helps increase brand awareness, engage your audience, build customer trust, and generate quality leads through consistent and strategic content.'],
            ['q' => 'Which social media platforms do you manage?', 'a' => 'We manage Instagram, Facebook, LinkedIn, YouTube, X (Twitter), Pinterest, and Google Business Profile based on your business goals.'],
            ['q' => 'How often will you post on my social media accounts?', 'a' => 'Posting frequency depends on your selected package and marketing objectives. We create a customized content calendar for every client.'],
            ['q' => 'Can social media marketing generate leads?', 'a' => 'Yes. With the right strategy, creative content, and targeted campaigns, social media can generate qualified leads and increase sales.'],
            ['q' => 'Do you provide monthly performance reports?', 'a' => 'Yes. We share detailed reports that include reach, engagement, audience growth, and campaign performance.']
        ])
    ],
    [
        'slug' => 'meta-ads',
        'title' => '2. Meta ads',
        'description' => 'Reach the right audience at the right time with Digibrandz\'s Meta Ads Services. We create high-performing advertising campaigns across Facebook and Instagram to increase brand awareness, generate quality leads, drive website traffic, and boost sales. From audience targeting and creative ad design to campaign management and performance optimization, our team ensures every ad is strategically planned to deliver measurable results and maximize your return on investment (ROI).',
        'offers' => json_encode(['Facebook & Instagram Advertising', 'Lead Generation Campaigns', 'Brand Awareness Campaigns', 'Website Traffic Campaigns', 'Sales & Conversion Campaigns', 'Audience Research & Targeting', 'Creative Ad Design & Copywriting', 'A/B Testing & Campaign Optimization', 'Pixel Setup & Conversion Tracking', 'Performance Analytics & Monthly Reports']),
        'faqs' => json_encode([
            ['q' => 'What are Meta Ads?', 'a' => 'Meta Ads are paid advertising campaigns that run on Facebook and Instagram to reach targeted audiences and generate business results.'],
            ['q' => 'How do Meta Ads help my business?', 'a' => 'They help increase brand awareness, website traffic, lead generation, app installs, and online sales.'],
            ['q' => 'How do you target the right audience?', 'a' => 'We use demographics, interests, behaviours, custom audiences, and retargeting strategies to reach potential customers.'],
            ['q' => 'How long does it take to see results?', 'a' => 'Most campaigns start generating insights within a few days, while optimized performance improves over time.'],
            ['q' => 'Do you manage ad budgets?', 'a' => 'Yes. We optimize your advertising budget to maximize ROI and improve campaign performance.']
        ])
    ],
    [
        'slug' => 'google-ads',
        'title' => '3. Google Ads / PPC',
        'description' => 'Drive instant visibility and reach customers actively searching for your products or services with Digibrandz\'s Google Ads (PPC) Services. We create and manage result-driven campaigns that help businesses generate quality leads, increase website traffic, and maximize conversions. From keyword research and ad copy creation to bid management and continuous optimization, our experts ensure every campaign is focused on delivering the best possible return on your advertising investment.',
        'offers' => json_encode(['Google Search Ads', 'Display Advertising', 'YouTube Ads', 'Shopping Ads', 'Performance Max Campaigns', 'Keyword Research & Competitor Analysis', 'Ad Copy Creation', 'Landing Page Recommendations', 'Conversion Tracking & Campaign Optimization', 'Performance Reports & ROI Analysis']),
        'faqs' => json_encode([
            ['q' => 'What are Google Ads (PPC)?', 'a' => 'Google Ads is a pay-per-click advertising platform that helps businesses appear in Google search results and reach customers instantly.'],
            ['q' => 'Is Google Ads suitable for small businesses?', 'a' => 'Yes. Google Ads can be customized for businesses of all sizes and budgets.'],
            ['q' => 'How do you choose keywords?', 'a' => 'We conduct detailed keyword research based on search intent, competition, and business goals.'],
            ['q' => 'Can Google Ads increase website traffic?', 'a' => 'Yes. Properly managed Google Ads campaigns drive targeted traffic and improve conversions.'],
            ['q' => 'Do you provide campaign reports?', 'a' => 'Yes. We provide regular reports with clicks, conversions, cost analysis, and performance insights.']
        ])
    ],
    [
        'slug' => 'website-seo',
        'title' => '4. Website SEO',
        'description' => 'Improve your website\'s visibility and attract high-quality organic traffic with Digibrandz\'s Website SEO Services. We use proven, search engine-friendly strategies to help your website rank higher on Google, increase online visibility, and drive long-term business growth. From in-depth keyword research and on-page optimization to technical SEO and content enhancement, our team focuses on improving your website\'s performance while delivering a seamless user experience.',
        'offers' => json_encode(['SEO Audit & Website Analysis', 'Keyword Research & Strategy', 'On-Page', 'Off-Page', 'Technical SEO', 'Content Optimization', 'Local SEO', 'Link Building Strategies', 'Website Speed Optimization', 'SEO Performance Monitoring', 'Monthly SEO Reports & Insights']),
        'faqs' => json_encode([
            ['q' => 'What is SEO?', 'a' => 'SEO (Search Engine Optimization) improves your website\'s visibility in search engines like Google to attract organic traffic.'],
            ['q' => 'How long does SEO take?', 'a' => 'SEO is a long-term strategy, and noticeable improvements generally begin within a few months.'],
            ['q' => 'Do you optimize existing websites?', 'a' => 'Yes. We perform complete SEO audits and optimize existing websites.'],
            ['q' => 'What does Website SEO include?', 'a' => 'It includes keyword research, on-page SEO, technical SEO, Off-Page SEO, content optimization, and performance improvements.'],
            ['q' => 'Will SEO improve my website rankings?', 'a' => 'Our SEO strategies follow best practices designed to improve rankings, visibility, and long-term organic growth.']
        ])
    ],
    [
        'slug' => 'google-my-business',
        'title' => '5. Google My Business / Local SEO',
        'description' => 'Increase your local visibility and connect with customers searching for your business nearby through Digibrandz\'s Google My Business & Local SEO Services. We optimize your Google Business Profile and implement effective local SEO strategies to improve your presence in local search results and Google Maps. From profile optimization and local keyword targeting to review management and location-based SEO, we help your business attract more local customers, generate quality leads, and build a trusted online reputation.',
        'offers' => json_encode(['Google Business Profile Setup & Optimization', 'Local SEO Strategy', 'Google Maps Ranking Optimization', 'Local Keyword Research', 'Business Profile Management', 'Customer Review Management', 'Local Citation & Directory Listings', 'Location-Based Content Optimization', 'Performance Monitoring & Insights', 'Monthly Local SEO Reports']),
        'faqs' => json_encode([
            ['q' => 'What is Google My Business Profile?', 'a' => 'It\'s a free Google listing that helps customers find your business in Google Search and Google Maps.'],
            ['q' => 'Why is Local SEO/GMB important?', 'a' => 'Local SEO helps your business appear when nearby customers search for your products or services.'],
            ['q' => 'Can you optimize my existing Google My Business Profile?', 'a' => 'Yes. We optimize existing profiles and also create new listings.'],
            ['q' => 'How do customer reviews affect rankings?', 'a' => 'Positive reviews improve credibility, customer trust, and local search visibility.'],
            ['q' => 'Can Local SEO/GMB increase walk-in customers?', 'a' => 'Yes. Better local visibility can drive more phone calls, website visits, and store visits.']
        ])
    ],
    [
        'slug' => 'website-app-development',
        'title' => '6. Website & App Development',
        'description' => 'Create powerful digital experiences with Digibrandz\'s Website & App Development Services. We design and develop responsive websites and user-friendly mobile applications that combine modern design, seamless functionality, and high performance. Whether you need a business website, e-commerce platform, portfolio, or custom mobile application, what we did? are built to enhance user experience, strengthen your online presence, and support long-term business growth.',
        'offers' => json_encode(['Custom Website Development', 'Responsive Web Design', 'E-commerce Website Development', 'Business & Corporate Websites', 'Landing Page Development', 'UI/UX Design', 'Android & iOS App Development', 'Web Application Development', 'Website Maintenance & Support', 'Speed, Security & Performance Optimization']),
        'faqs' => json_encode([
            ['q' => 'Do you develop custom websites?', 'a' => 'Yes. We create custom websites based on your business requirements.'],
            ['q' => 'Are your websites mobile-friendly?', 'a' => 'Absolutely. Every website is responsive and optimized for all devices.'],
            ['q' => 'Do you build e-commerce websites?', 'a' => 'Yes. We develop secure and scalable online stores.'],
            ['q' => 'Can you redesign my existing website?', 'a' => 'Yes. We modernize outdated websites with improved design and functionality.'],
            ['q' => 'Do you provide website maintenance?', 'a' => 'Yes. We offer ongoing support, updates, and maintenance services.']
        ])
    ],
    [
        'slug' => 'real-estate-lead-generation',
        'title' => '7. Real Estate Lead Generation',
        'description' => 'Generate high-quality property enquiries with Digibrandz\'s Real Estate Lead Generation Services. We create targeted digital marketing campaigns that connect builders, developers, brokers, and real estate agencies with genuine homebuyers and investors. By combining strategic advertising, optimized landing pages, and audience-focused campaigns, we help you attract qualified leads, increase site visits, and maximize your property sales.',
        'offers' => json_encode(['Real Estate Lead Generation Campaigns', 'Facebook & Instagram Property Ads', 'Google Ads for Real Estate', 'Landing Page Development', 'Audience Targeting & Retargeting', 'Project Promotion Campaigns', 'Lead Form & CRM Integration', 'Performance Tracking & Optimization', 'ROI-Focused Marketing Strategy', 'Monthly Campaign Reports']),
        'faqs' => json_encode([
            ['q' => 'How do you generate real estate leads?', 'a' => 'We use targeted digital marketing strategies, including Meta Ads, Google Ads, landing pages, and audience targeting to generate high-quality leads for real estate businesses.'],
            ['q' => 'Can you promote residential and commercial projects?', 'a' => 'Yes. We create customized marketing campaigns for residential, commercial, luxury, and upcoming real estate projects.'],
            ['q' => 'Which advertising platforms do you use?', 'a' => 'We use Facebook, Instagram, Google Ads, YouTube, and other digital platforms to maximize your project\'s visibility and lead generation.'],
            ['q' => 'Are the leads verified?', 'a' => 'Our campaigns are optimized to attract genuine enquiries from interested buyers and investors, helping improve lead quality.'],
            ['q' => 'Do you provide campaign performance reports?', 'a' => 'Yes. We provide detailed reports with lead performance, campaign insights, and recommendations for continuous improvement.']
        ])
    ],
    [
        'slug' => 'e-commerce-quick-commerce',
        'title' => '8. E-Commerce / Quick Commerce',
        'description' => 'Accelerate your online sales with Digibrandz\'s E-Commerce & Quick Commerce Solutions. We help businesses build, optimize, and market online stores that deliver seamless shopping experiences and faster customer conversions. Whether you\'re launching a new e-commerce brand or scaling your presence on quick commerce platforms, our data-driven strategies, performance marketing, and user-focused solutions are designed to increase visibility, boost sales, and support sustainable business growth.',
        'offers' => json_encode(['E-Commerce Website Development', 'Quick Commerce Marketing Solutions', 'Product Listing & Catalo Management', 'Marketplace Optimization', 'Google Shopping & Performance Marketing', 'Social Commerce Strategies', 'Conversion Rate Optimization (CRO)', 'Payment & Shipping Integration', 'Analytics & Sales Performance Tracking', 'Ongoing Store Management & Support']),
        'faqs' => json_encode([
            ['q' => 'Can you build an online store for my business?', 'a' => 'Yes. We develop secure, responsive, and user-friendly e-commerce websites tailored to your business needs.'],
            ['q' => 'Which e-commerce platforms do you support?', 'a' => 'We work with platforms like Shopify, WooCommerce, Magento, and custom-built e-commerce solutions.'],
            ['q' => 'Do you help increase online sales?', 'a' => 'Yes. We combine performance marketing, SEO, conversion optimization, and user experience improvements to help grow your online sales.'],
            ['q' => 'Can you optimize product listings?', 'a' => 'Absolutely. We optimize product titles, descriptions, images, and keywords to improve search visibility and conversions.'],
            ['q' => 'Do you provide ongoing store management?', 'a' => 'Yes. We offer website maintenance, product updates, performance monitoring, and continuous optimization.']
        ])
    ],
    [
        'slug' => 'performance-marketing',
        'title' => '9. Performance Marketing',
        'description' => 'Grow your business with Digibrandz\'s Performance Marketing Services, designed to deliver measurable results and maximize your return on investment (ROI). We create data-driven campaigns across multiple digital platforms to generate quality leads, increase website traffic, improve conversions, and drive sustainable business growth. Every campaign is continuously monitored and optimized to ensure your marketing budget delivers the best possible performance.',
        'offers' => json_encode(['Lead Generation Campaigns', 'Google Ads & Meta Ads Management', 'Conversion-Focused Marketing', 'Audience Targeting & Retargeting', 'Landing Page Optimization', 'A/B Testing & Campaign Optimization', 'Conversion Tracking & Analytics', 'ROI & Performance Reporting', 'Sales Funnel Optimization', 'Continuous Campaign Scaling']),
        'faqs' => json_encode([
            ['q' => 'What is Performance Marketing?', 'a' => 'Performance Marketing is a results-driven digital marketing approach where campaigns are optimized to achieve measurable goals such as leads, sales, conversions, and website traffic.'],
            ['q' => 'Which platforms do you use?', 'a' => 'We manage campaigns across Google Ads, Facebook, Instagram, LinkedIn, YouTube, and other digital advertising platforms.'],
            ['q' => 'How do you measure campaign success?', 'a' => 'We monitor key performance metrics such as conversions, cost per lead (CPL), return on ad spend (ROAS), click-through rates (CTR), and ROI.'],
            ['q' => 'Can Performance Marketing generate leads?', 'a' => 'Yes. Our campaigns are designed to attract high-intent audiences and generate quality leads that support business growth.'],
            ['q' => 'Do you continuously optimize campaigns?', 'a' => 'Absolutely. We regularly analyse campaign performance and make data-driven improvements to maximize results.']
        ])
    ],
    [
        'slug' => 'ai-video-creation',
        'title' => '10. AI Video Creation',
        'description' => 'Transform your ideas into engaging visual content with Digibrandz\'s AI Video Creation Services. We create high-quality AI-powered videos that help businesses capture attention, communicate their message effectively, and strengthen their digital presence. Whether it\'s promotional videos, product showcases, social media reels, explainer videos, or corporate presentations, our creative team combines AI technology with compelling storytelling to deliver professional videos that drive engagement and brand growth.',
        'offers' => json_encode(['AI Promotional Videos', 'AI Trending Videos', 'AI Product Demo Videos', 'AI Social Media Reels & Shorts', 'AI Explainer Videos', 'AI Corporate Videos', 'AI Voiceovers & Avatars', 'Motion Graphics & Animation', 'Video Script & Storyboarding', 'Video Editing & Optimization', 'Platform-Ready Video Content']),
        'faqs' => json_encode([
            ['q' => 'What types of AI videos do you create?', 'a' => 'We create promotional videos, product videos, explainer videos, social media reels, corporate videos, AI avatar videos, and marketing content.'],
            ['q' => 'Are AI videos suitable for social media?', 'a' => 'Yes. Our AI videos are optimized for platforms like Instagram, Facebook, YouTube, LinkedIn, and other digital channels.'],
            ['q' => 'Can you create videos using our brand identity?', 'a' => 'Absolutely. Every video is customized with your brand colours, logo, messaging, and style guidelines.'],
            ['q' => 'How long does AI video production take?', 'a' => 'Project timelines vary based on complexity, but most AI videos are delivered within a few hours.'],
            ['q' => 'Do you provide voiceovers and subtitles?', 'a' => 'Yes. We offer AI voiceovers, multilingual subtitles, captions, and professional audio enhancements.']
        ])
    ],
    [
        'slug' => 'influencer-marketing',
        'title' => '11. Influencer Marketing',
        'description' => 'Expand your brand\'s reach with Digibrandz\'s Influencer Marketing Services. We connect your business with trusted content creators and influencers who genuinely resonate with your target audience. From campaign planning and influencer selection to content collaboration and performance tracking, we create authentic partnerships that increase brand awareness, build credibility, and drive meaningful engagement across social media platforms.',
        'offers' => json_encode(['Influencer Discovery & Outreach', 'Campaign Strategy & Planning', 'Instagram & YouTube Influencer Campaigns', 'Product & Brand Collaborations', 'Micro & Macro Influencer Marketing', 'Content Collaboration Management', 'Performance Tracking & Analytics', 'Brand Awareness Campaigns', 'Lead Generation Through Influencers', 'Campaign Reporting & ROI Analysis']),
        'faqs' => json_encode([
            ['q' => 'How do you choose influencers for my brand?', 'a' => 'We select influencers based on your niche, industry, target audience, engagement rate, content quality, and campaign objectives.'],
            ['q' => 'Do you work with micro and macro influencers?', 'a' => 'Yes. We collaborate with both micro and macro influencers depending on your marketing goals and budget.'],
            ['q' => 'Can influencer marketing generate sales?', 'a' => 'Yes. Authentic influencer collaborations help build trust, increase brand awareness, and drive customer purchases.'],
            ['q' => 'Which platforms do you support?', 'a' => 'We manage influencer campaigns across Instagram, YouTube, Facebook, LinkedIn, and other relevant social media platforms.'],
            ['q' => 'Do you track campaign performance?', 'a' => 'Yes. We provide detailed reports covering reach, engagement, impressions, clicks, conversions, and overall campaign effectiveness.']
        ])
    ],
    [
        'slug' => 'video-editing-creative-designing',
        'title' => '12. Video Editing & Creative Designing',
        'description' => 'Bring your brand to life with Digibrandz\'s Video Editing & Creative Designing Services. We create visually compelling content that captures attention, strengthens brand identity, and enhances audience engagement across digital platforms. From professional video editing to eye-catching graphics and marketing creatives, our team delivers high-quality designs that communicate your message effectively and leave a lasting impression.',
        'offers' => json_encode(['Professional Video Editing', 'Social Media Reels & Shorts', 'Motion Graphics & Visual Effects', 'Corporate & Promotional Videos', 'Social Media Post & Carousel Design', 'Logo & Brand Identity Design', 'Marketing Creatives & Ad Banners', 'Brochures, Flyers & Print Designs', 'Presentation & Corporate Design', 'Creative Content for Digital Campaigns']),
        'faqs' => json_encode([
            ['q' => 'What creative design services do you offer?', 'a' => 'We create social media posts, ad creatives, branding materials, brochures, banners, presentations, logos, and marketing graphics.'],
            ['q' => 'Can you edit short-form videos for social media?', 'a' => 'Yes. We professionally edit Instagram Reels, YouTube Shorts, Facebook videos, and promotional content.'],
            ['q' => 'Do you create branding materials?', 'a' => 'Absolutely. We design logos, brand identity kits, marketing collateral, and visual assets that maintain brand consistency.'],
            ['q' => 'Can you work with our existing brand guidelines?', 'a' => 'Yes. We ensure all creative content aligns with your brand identity, colors, typography, and messaging.'],
            ['q' => 'Do you provide multiple design revisions?', 'a' => 'Yes. We offer revisions based on the selected project scope to ensure the final design meets your expectations.']
        ])
    ],
    [
        'slug' => 'whatsapp-sms-marketing',
        'title' => '13. WhatsApp & SMS Marketing',
        'description' => 'Connect with your customers instantly through Digibrandz\'s WhatsApp & SMS Marketing Services. We help businesses deliver personalized messages, promotional offers, updates, and customer notifications directly to their audience. Using targeted campaigns and automation, we improve customer engagement, increase response rates, and drive more leads, sales, and repeat business through fast and effective communication.',
        'offers' => json_encode(['WhatsApp Business Marketing', 'Bulk SMS Campaigns', 'Promotional & Transactional Messaging', 'Broadcast & Customer Engagement Campaigns', 'Automated WhatsApp Messages', 'Lead Nurturing & Follow-Ups', 'Customer Support Integration', 'Campaign Personalization', 'Performance Tracking & Analytics', 'ROI-Focused Messaging Strategies']),
        'faqs' => json_encode([
            ['q' => 'How can WhatsApp Marketing help my business?', 'a' => 'WhatsApp Marketing enables you to connect directly with customers through personalized messages, promotions, updates, and customer support.'],
            ['q' => 'What is the difference between WhatsApp and SMS marketing?', 'a' => 'WhatsApp allows rich media communication such as images, videos, and documents, while SMS provides fast text-based communication with a wider reach.'],
            ['q' => 'Can campaigns be personalized?', 'a' => 'Yes. We create personalized campaigns based on customer preferences, behaviour, and business objectives.'],
            ['q' => 'Do you provide automated messaging solutions?', 'a' => 'Yes. We set up automated messages for greetings, follow-ups, reminders, customer support, and promotional campaigns.'],
            ['q' => 'How do you measure campaign success?', 'a' => 'We track delivery rates, open rates, click-through rates, customer responses, and overall campaign performance.']
        ])
    ],
    [
        'slug' => 'videography-photography',
        'title' => '14. Videography & Photography',
        'description' => 'Capture your brand\'s story with Digibrandz\'s Videography & Photography Services. We produce high-quality visual content that showcases your products, services, team, and brand identity with creativity and professionalism. From corporate shoots and product photography to promotional videos, events, and social media content, we create visuals that enhance your brand image, engage your audience, and support your marketing goals.',
        'offers' => json_encode(['Corporate Photography & Videography', 'Product Photography', 'Brand & Promotional Videos', 'Event Coverage', 'Social Media Content Shoots', 'Commercial & Advertising Shoots', 'Drone Photography & Videography', 'Lifestyle & Business Photography', 'Photo & Video Post-Production', 'Creative Visual Content for Marketing']),
        'faqs' => json_encode([
            ['q' => 'What types of photography and videography services do you offer?', 'a' => 'We provide corporate shoots, product photography, promotional videos, event coverage, drone shoots, and social media content creation.'],
            ['q' => 'Do you cover corporate events and product shoots?', 'a' => 'Yes. We capture conferences, exhibitions, corporate events, product launches, and commercial photography sessions.'],
            ['q' => 'Can you create content for social media marketing?', 'a' => 'Absolutely. We produce platform-optimized photos and videos for Instagram, Facebook, YouTube, LinkedIn, and other digital channels.'],
            ['q' => 'Do you provide edited photos and videos?', 'a' => 'Yes. Every project includes professional editing, color correction, retouching, and final optimized files ready for marketing use.'],
            ['q' => 'How long does it take to deliver the final files?', 'a' => 'Delivery timelines depend on the project size, but most edited photos and videos are delivered within the agreed project schedule.']
        ])
    ]
];

foreach ($services as $i => $srv) {
    $pdo->execute("INSERT INTO services (slug, title, description, offers, faqs, display_order) VALUES (?, ?, ?, ?, ?, ?)", 
    [$srv['slug'], $srv['title'], $srv['description'], $srv['offers'], $srv['faqs'], $i]);
}
echo "Services updated.\n";


// 3. Case Studies
$pdo->execute("DELETE FROM case_studies");
$cases = [
    [
        'slug' => 'speed-homes',
        'client' => 'Speed Homes (Projects: Elite Sparsh, Aura Bliss, Vision Group, Krishna Kapital & Dugad Heights)',
        'title' => 'Real Estate Digital Marketing',
        'category' => 'Real Estate',
        'challenge' => "High cost per lead (CPL) from paid campaigns.\nLow website traffic and fewer project visitors.\nReceiving irrelevant or out-of-state leads.\nLimited advertising budget.\nLow property enquiries and sales conversions.\nInconsistent content publishing across digital platforms.\nPoor website optimization affecting user experience.\nLow Google Business Profile (GMB) visibility in local searches.\nWeak brand awareness compared to competitors.",
        'solution' => "Social Media Marketing: Created structured content strategy, premium creatives, reels, and maintained consistent posting.\nMeta Ads & Performance Marketing: Optimized campaigns to reduce CPL, refined audience targeting, focused on location-based campaigns.\nWebsite Optimization: Improved landing page structure, optimized enquiry forms, enhanced speed and mobile responsiveness.\nSEO: Optimized content using Real Estate SEO best practices, improved on-page SEO, increased organic visibility.\nGoogle Business Profile (GMB) Optimization: Optimized profile with accurate project info, improved local search visibility."
    ],
    [
        'slug' => 'health-easy-emi',
        'client' => 'Health Easy EMI',
        'title' => 'Healthcare Startup Launch',
        'category' => 'Healthcare',
        'challenge' => "Launching a new healthcare startup\nDeveloping a budget-friendly website and mobile application without compromising quality.\nNo existing Social Media Presence or digital branding.\nBuilding a secure and user-friendly platform for Healthcare Financing services.\nEstablishing a strong Online Presence in a competitive healthcare industry.\nCreating a scalable platform capable of supporting future business growth.",
        'solution' => "Social Media Marketing: Established professional presence, developed healthcare-focused content, created informative creatives.\nMeta Ads & Performance Marketing: Planned scalable strategy for lead generation, identified target audience.\nWebsite Optimization: Designed fully responsive website and scalable mobile application.\nSEO: Structured website using SEO-friendly architecture, optimized content with Medical EMI keywords.\nGoogle Business Profile Optimization: Created strong foundation for local SEO."
    ],
    [
        'slug' => 'dr-hamades-curesure',
        'client' => 'Dr. Hamade’s CureSure Surgery Centre',
        'title' => 'Clinic Digital Presence',
        'category' => 'Healthcare',
        'challenge' => "Building a professional Digital Presence for a specialized healthcare clinic.\nCreating a consistent Healthcare Brand Identity.\nDeveloping a responsive and informative Healthcare Website.\nEstablishing a strong Google Business Profile (GBP) for local patient discovery.\nExpanding patient reach through strategic Social Media Marketing.",
        'solution' => "Social Media Marketing: Managed Instagram, Facebook, and YouTube with structured content, designed educational creatives.\nMeta Ads & Performance Marketing: Targeted campaigns for patient enquiries, increased qualified lead generation.\nWebsite Optimization: Responsive Healthcare Website, structured treatment pages, enhanced performance.\nSEO: Implemented Healthcare SEO, optimized website content.\nGoogle Business Profile: Optimized profile with accurate clinic info, improved Local SEO visibility."
    ],
    [
        'slug' => 'bharati-vidyapeeth',
        'client' => 'Bharati Vidyapeeth (Deemed to be University)',
        'title' => 'University Digital Marketing',
        'category' => 'Education',
        'challenge' => "Low student admission enquiries through digital platforms.\nLimited brand awareness among prospective students.\nLow engagement across digital channels.\nLack of department-specific promotional content.\nWeak visibility during the admission season.\nLimited reach among students outside the local region.",
        'solution' => "AI Video Production & Creative Content: Created AI-generated promotional videos, admission-focused campaigns.\nSocial Media Marketing: Consistent admission updates, event highlights, engaging educational content.\nMeta Ads & Lead Generation: Targeted campaigns based on location, interests, optimized for admission leads.\nInfluencer Marketing: Collaborated with educational influencers and campus creators.\nBrand Awareness: Strengthened online brand identity, promoted campus events."
    ],
    [
        'slug' => 'sparktech-pro-agile',
        'client' => 'Sparktech Pro Agile',
        'title' => 'IT Training Institute Marketing',
        'category' => 'Education',
        'challenge' => "No active presence on social media platforms.\nLow student enquiries through digital channels.\nNo Google Business Profile (GMB) for local visibility.\nLow brand awareness in a competitive education market.\nLimited online credibility and trust.",
        'solution' => "Social Media Marketing: Managed Instagram, Facebook, LinkedIn, YouTube, developed content calendar.\nMeta Ads & Lead Generation: Targeted campaigns for prospective students, optimized audience targeting.\nGoogle Business Profile: Created and optimized profile from scratch, improved local SEO.\nSEO & Online Visibility: Education SEO best practices, keyword relevance for IT training.\nBrand Building: Established professional brand identity, highlighted placement success stories."
    ],
    [
        'slug' => 'shamudri-tourism',
        'client' => 'Shamudri Tourism LLC',
        'title' => 'Travel & Tourism Branding',
        'category' => 'Travel & Tourism',
        'challenge' => "No active presence on major social media platforms.\nLow brand awareness in the competitive travel industry.\nLimited online visibility and customer reach.\nLow engagement across digital channels.\nFew travel enquiries generated through online platforms.",
        'solution' => "Social Media Marketing: Managed multiple accounts, developed consistent content calendar, designed premium creatives.\nMeta Ads & Lead Generation: Targeted campaigns for travel packages and seasonal offers, generated high-quality enquiries.\nContent Strategy & Video Marketing: Engaging travel reels, promotional videos, SEO-friendly captions.\nBrand Awareness: Established strong digital brand identity, improved online presence.\nPerformance Analysis: Tracked campaign performance, optimized content."
    ],
    [
        'slug' => 'happenstance',
        'client' => 'Happenstance',
        'title' => 'Footwear Brand Growth',
        'category' => 'Footwear Brand',
        'challenge' => "Building a professional Social Media Presence.\nEstablishing Google Business Profiles for multiple locations.\nIncreasing Offline Store Footfall across major cities.\nStrengthening Brand Visibility in competitive retail markets.\nCreating a consistent Digital Marketing Strategy.",
        'solution' => "Social Media Marketing: Managed Instagram and Facebook, developed premium creatives, grew to 243K+ followers.\nMeta Ads & Performance Marketing: Targeted campaigns for offline store promotions, location-based advertising.\nSEO: Retail SEO strategies, optimized website content for footwear-related keywords.\nGoogle Business Profile: Created and optimized profiles for all store locations, improved Local SEO visibility."
    ],
    [
        'slug' => 'bluesky-scaffolding',
        'client' => 'Bluesky Scaffolding',
        'title' => 'Construction Brand Awareness',
        'category' => 'Construction',
        'challenge' => "Building strong Brand Awareness in the competitive construction industry.\nCreating a professional Digital Presence for an industrial brand.\nNo dedicated Business Website.\nImproving visibility among Civil Engineers, Builders, and Contractors.",
        'solution' => "Social Media Marketing: Structured strategy, project showcases, focused on LinkedIn Marketing.\nMeta Ads & Performance Marketing: Targeted campaigns to reach business clients and construction professionals.\nWebsite Optimization: Planned professional Business Website structure.\nSEO: Industrial SEO strategies, optimized service-related keywords.\nGoogle Business Profile: Optimized for better local visibility, updated project details."
    ],
    [
        'slug' => 'tanaji-group',
        'client' => 'Tanaji Group',
        'title' => 'Industrial Construction Website',
        'category' => 'Construction',
        'challenge' => "Building a professional Digital Presence.\nShowcasing expertise across multiple Industrial Construction sectors.\nCreating a modern platform to present projects and services.\nImproving Brand Visibility among industrial clients.\nDeveloping a scalable and SEO-Friendly Website.",
        'solution' => "Dynamic Website Development: Designed modern dynamic website, dedicated pages for services and projects.\nUI/UX Design: Clean and professional UI/UX, intuitive navigation structure.\nWebsite Performance: Optimized speed and performance, improved mobile responsiveness.\nSEO-Friendly Website Structure: Built architecture for search engine visibility, industry-specific keywords."
    ],
    [
        'slug' => 'yashraj-systems',
        'client' => 'YashRaj Systems & Services',
        'title' => 'Automation Solutions Website',
        'category' => 'Automation',
        'challenge' => "No professional business website to showcase services.\nLimited online visibility and digital presence.\nDifficulty presenting industrial solutions.\nNo centralized platform for customer enquiries.\nLack of a modern and responsive website experience.",
        'solution' => "Static Website Development: Designed modern static website, fully responsive, structured service pages.\nUI/UX Design: User-friendly interface, organized layout, consistent branding.\nPerformance & Optimization: Optimized website speed, page loading, compatibility.\nBrand Presence: Established professional digital presence, strengthened brand image."
    ],
    [
        'slug' => 'techport-solutions',
        'client' => 'TechPort Solutions',
        'title' => 'Industrial Automation Branding',
        'category' => 'Automation',
        'challenge' => "No professional business website.\nNo active LinkedIn presence for corporate branding.\nLimited online visibility in the industrial automation sector.\nDifficulty reaching potential B2B clients digitally.",
        'solution' => "Static Website Development: Designed modern static website, structured dedicated pages.\nLinkedIn Branding: Created and optimized LinkedIn Business Page, published technical content.\nUI/UX Design: Clean, user-friendly interface, organized content.\nDigital Brand Presence: Established strong online presence, improved business credibility."
    ],
    [
        'slug' => 'venkateshwara-agro',
        'client' => 'Venkateshwara Co-operative Power & Agro Processing Ltd.',
        'title' => 'Agriculture Digital Marketing',
        'category' => 'Agriculture',
        'challenge' => "No active presence across social media platforms.\nLimited brand awareness in the digital space.\nLow audience engagement.\nNo structured content strategy for agricultural initiatives.\nDifficulty reaching farmers and stakeholders.",
        'solution' => "Social Media Marketing: Managed multiple accounts, developed strategic content calendar, published consistent content.\nBrand Awareness: Showcased agricultural projects, improved brand recognition.\nContent Strategy: Event-focused, educational content, highlighted farmer initiatives.\nPerformance Optimization: Optimized profiles, monitored audience insights, improved overall digital reach."
    ],
    [
        'slug' => 'latur-mahanagar-palika',
        'client' => 'Latur Mahanagar Palika',
        'title' => 'Civic Social Media Management',
        'category' => 'Government Sector',
        'challenge' => "Building a strong Social Media Presence for civic communication.\nIncreasing public awareness about Municipal Projects.\nCreating transparent communication.\nImproving visibility of development work.\nBuilding public trust.",
        'solution' => "Social Media Marketing: Managed platforms for public communication, highlighted civic projects.\nVideo Content & Digital Communication: Created impactful video content, generated million+ views.\nElection Campaign Management: Executed strategic Election Campaigns.\nBrand Presence & Content Strategy: Built professional Digital Brand Presence, maintained consistent messaging."
    ],
    [
        'slug' => 'nashik-mahanagar-palika',
        'client' => 'Nashik Mahanagar Palika',
        'title' => 'Municipal Digital Awareness',
        'category' => 'Government Sector',
        'challenge' => "Establishing a strong Digital Communication Platform.\nIncreasing awareness about Civic Development Projects.\nCreating a consistent content flow.\nCommunicating important updates clearly.",
        'solution' => "Social Media Marketing: Managed platforms, created informative posts and awareness content.\nDigital Awareness Campaigns: Content campaigns focused on public info, presented development activities.\nElection Campaign Management: Strategic campaigns through digital platforms.\nContent Planning & Digital Presence: Structured Content Strategy, maintained consistent brand communication."
    ],
    [
        'slug' => 'shri-samartha-krupa-ghee',
        'client' => 'Shri Samartha Krupa Ghee',
        'title' => 'FMCG Digital Expansion',
        'category' => 'Food',
        'challenge' => "Strong offline presence but limited online brand visibility.\nNo active social media presence.\nNo professional e-commerce website.\nProducts not listed on quick commerce platforms.\nLow online product sales.",
        'solution' => "Social Media Marketing: Managed Instagram and Facebook, consistent content strategy.\nE-commerce & Quick Commerce Onboarding: Created seller accounts on Amazon, Flipkart, Blinkit, Zepto, Swiggy Instamart, JioMart.\nWebsite Development: Designed dynamic e-commerce website.\nInfluencer Marketing: Collaborated with food creators.\nBrand Awareness & Online Sales: Built strong digital brand presence, increased product sales."
    ]
];

foreach ($cases as $i => $c) {
    $pdo->execute("INSERT INTO case_studies (slug, client, title, category, challenge, solution, display_order) VALUES (?, ?, ?, ?, ?, ?, ?)", 
    [$c['slug'], $c['client'], $c['title'], $c['category'], $c['challenge'], $c['solution'], $i]);
}
echo "Case studies updated.\n";


// 4. Jobs
$pdo->execute("DELETE FROM jobs");
$jobs = [
    'Digital Marketing Executive',
    'SEO Executive',
    'Social Media Executive',
    'Business Development Executive',
    'Business Analyst',
    'Graphic Designer',
    'Video Editor',
    'Website Developer',
    'UI/UX Designer',
    'Content Writer'
];

foreach ($jobs as $job) {
    $pdo->execute("INSERT INTO jobs (title, department, location, job_type, description, status) VALUES (?, 'Various', 'Pune, Maharashtra', 'Full-Time', 'Join Digibrandz IT Solutions and become part of a dynamic team.', 'open')", 
    [$job]);
}
echo "Jobs updated.\n";

echo "Done!\n";
