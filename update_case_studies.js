import fs from 'fs';

let contentStr = fs.readFileSync('src/data/content.js', 'utf8');

const updates = {
  "speed-homes": { logo: "https://speedhomesandloans.com/wp-content/uploads/2023/12/Happy__10_-removebg-preview-e1703595200684.png", website: "https://speedhomesandloans.com" },
  "health-easy-emi": { logo: "https://healtheasyemi.com/logo/logo.png", website: "https://healtheasyemi.com" },
  "dr-hamades-curesure": { logo: "https://drhemadescuresure.com/Images/Logo.jpg", website: "https://drhemadescuresure.com" },
  "bharati-vidyapeeth": { logo: "https://www.bvuniversity.edu.in/images/bharati_vidyapeeth_logo-new.webp", website: "https://www.bvuniversity.edu.in" },
  "sparktech-pro-agile": { logo: "https://sparktechproagile.com/logo.png", website: "https://sparktechproagile.com" },
  "shamudri-tourism": { logo: "https://www.shamudritourism.ae/logo%20only%20(1).png", website: "https://www.shamudritourism.ae" },
  "happenstance": { logo: "https://happenstance.com/storage/media/vNWKNshyEJFpsHVuKOvBFwHICC9WNGtlJi8klASZ.webp", website: "https://happenstance.com" },
  "bluesky-scaffolding": { logo: "http://blueskyscaffolding.com/assets/img/logo.png", website: "http://blueskyscaffolding.com" },
  "yashraj-systems": { logo: "https://www.yashrajsystems.com/YASHRAJ%20LOGO%204.png", website: "https://www.yashrajsystems.com" },
  "shri-samartha-krupa-ghee": { logo: "https://www.shrisamarthakrupamilkproducts.com/uploads/Logo.png", website: "https://www.shrisamarthakrupamilkproducts.com" }
};

for (const [id, data] of Object.entries(updates)) {
  const regex = new RegExp(`(id:\\s*"${id}",\\n\\s*industry:\\s*"[^"]+",\\n\\s*client:\\s*"[^"]+",\\n)`);
  contentStr = contentStr.replace(regex, `$1    logo: "${data.logo}",\n    website: "${data.website}",\n`);
}

fs.writeFileSync('src/data/content.js', contentStr);
console.log('Successfully updated case studies with logos and websites.');
