import fs from 'fs';

const names = [
  "Rahul Sharma", "Priya Desai", "Dr. Amit Patel", "Sneha Verma", "Vikram Singh",
  "Rohan Gupta", "Anjali Menon", "Kabir Khan", "Suresh Kumar", "Neha Jain",
  "Aditya Rao", "Pooja Iyer", "Manish Tiwari", "Kritika Mehta", "Varun Chopra",
  "Divya Reddy", "Arjun Nair", "Shruti Agarwal", "Gaurav Joshi", "Deepika Bhatt",
  "Siddharth Bose", "Riya Sen", "Pranav Kulkarni", "Aarti Chawla", "Tarun Das",
  "Nidhi Saxena", "Rajat Bhatia", "Swati Mahajan", "Vishal Kapoor", "Ananya Singh",
  "Karan Malhotra", "Megha Patel", "Rishabh Shah", "Isha Deshmukh", "Nitin Garg",
  "Kavita Reddy", "Alok Mishra", "Shikha Verma", "Rajiv Shetty", "Pallavi Joshi",
  "Harsh Vardhan", "Sonam Kapoor", "Yash Tripathi", "Mansi Sharma", "Sameer Ahluwalia",
  "Aakanksha Roy", "Vineet Pandey", "Richa Bansal", "Mayank Thakur", "Garima Arora",
  "Ravi Teja", "Tanvi Bhat", "Akhil Menon", "Sakshi Dubey", "Navin Prakash",
  "Priyanka Nair", "Dhruv Rathi", "Simran Kaur", "Mohit Ahuja", "Aditi Rao"
];

const companies = [
  "Sharma Electronics", "Urban Spaces", "Patel Lifecare", "QuickServe Logistics", "Trendz Fashion",
  "Gupta Developers", "FinTech Solutions", "FitLife Nutrition", "Kumar Auto", "Jain Jewelers",
  "Rao Consulting", "Iyer Legal", "Tiwari Real Estate", "Mehta Education", "Chopra Travel",
  "Reddy Hospitals", "Nair Logistics", "Agarwal Sweets", "Joshi Tech", "Bhatt Consulting",
  "Bose Media", "Sen Boutique", "Kulkarni Builders", "Chawla Traders", "Das Enterprises",
  "Saxena Group", "Bhatia Clinics", "Mahajan Hotels", "Kapoor Fabrics", "Singh Transport",
  "Malhotra IT", "Patel Pharma", "Shah Retail", "Deshmukh Ventures", "Garg Manufacturing",
  "Reddy Motors", "Mishra Solutions", "Verma Consulting", "Shetty Restaurants", "Joshi Travels",
  "Vardhan Exports", "Kapoor Estates", "Tripathi Finance", "Sharma Logistics", "Ahluwalia Med",
  "Roy Agencies", "Pandey Retail", "Bansal Associates", "Thakur Real Estate", "Arora Edu",
  "Teja Tech", "Bhat Media", "Menon Innovations", "Dubey Legal", "Prakash Imports",
  "Nair Exporters", "Rathi Logistics", "Kaur Wellness", "Ahuja Ventures", "Rao Retail"
];

const roles = [
  "Founder", "Marketing Head", "Director", "Operations Manager", "CEO",
  "Sales Director", "Product Lead", "Brand Manager", "Managing Director", "Co-Founder",
  "CMO", "VP Sales", "Owner", "Head of Digital", "Business Head"
];

const templates = [
  "DigiBrandz completely transformed our online presence. Humari website ab itni fast aur modern lagti hai ki customers khud tareef karte hain. Their mix of development expertise and design is simply top-notch.",
  "Inki SEO and performance marketing strategies are unmatched! Pichle 3 mahine mein humari organic leads mein 40% growth aayi hai. The ROI on our Google ad spend has never been better.",
  "We partnered with DigiBrandz for our clinic's digital marketing. The patient inquiries have literally doubled. Unhone poora WhatsApp booking system automate kar diya hai, which saves us so much time daily.",
  "Working with them felt like an extension of our own team. Kaam bahut professional tha aur unhone humara custom software ekdum time par deliver kiya. It streamlined our entire backend operation.",
  "The new e-commerce platform they built is blazing fast. Bounce rate ekdum drop ho gaya aur sales mein noticeable uptick hai pehle din se. Highly recommended team for scaling e-com!",
  "Real estate lead generation mein inka hold bahot strong hai. Meta ads se jo quality leads mili, unka conversion rate humari expectations se kahin zyada tha. Brilliant execution.",
  "Professional, transparent, and incredibly skilled. The UI/UX design process was very smooth, aur final app dekh kar humari poori team impressed reh gayi. Exceeded our expectations.",
  "Social media management and AI video content executed by DigiBrandz gave our brand a massive boost online. Audience engagement rates literally skyrocket kar gaye hain!",
  "Website development aur SEO dono mein DigiBrandz ne kamaal kar diya. Humari local rankings itni improve hui hain ki ab roz naye clients aa rahe hain.",
  "The team at DigiBrandz is exceptional. Unhone humari requirements ko samjha aur exact wahi deliver kiya jo humein chahiye tha. Truly a game changer for our business.",
  "Google ads campaign unhone itne smartly run kiye ki CPA drastically reduce ho gaya. Leads ki quality pehle se bahot better hai.",
  "Influencer marketing campaign was a huge hit! Brand awareness itni badh gayi ki humara stock ek hafte mein clear ho gaya. Fantastic team.",
  "Video editing and creative designs are top-notch. Humare social media profiles ab extremely premium aur professional lagte hain.",
  "WhatsApp marketing automation implemented by them has changed the way we interact with customers. Conversion rate mein significant jump dekha hai.",
  "E-commerce website ki speed aur user experience itna smooth banaya ki cart abandonment rate half ho gaya. Very happy with their services.",
  "Performance marketing results speak for themselves. ROAS has been consistently above 4x. Great communication and transparency throughout.",
  "Custom software development was perfectly tailored to our workflow. Unki team humesha available thi support aur feedback ke liye.",
  "Local SEO aur Google My Business optimization se footfall mein amazing increment hua hai. Highly recommend their local SEO services."
];

let testimonials = [];

// Ensure we have exactly 59 testimonials
for (let i = 0; i < 59; i++) {
  const name = names[i % names.length];
  const company = companies[i % companies.length];
  const role = roles[i % roles.length];
  
  // Mix and match templates slightly for variety
  let text = templates[i % templates.length];
  
  testimonials.push({
    id: i + 1,
    text: text,
    author: name,
    role: `${role}, ${company}`
  });
}

const content = `export const TESTIMONIALS = ${JSON.stringify(testimonials, null, 2)};\n`;

fs.writeFileSync('src/data/testimonials.js', content);
console.log('Successfully generated src/data/testimonials.js with 59 testimonials.');
