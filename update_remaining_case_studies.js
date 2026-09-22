import fs from 'fs';

let contentStr = fs.readFileSync('src/data/content.js', 'utf8');

const updates = {
  "tanaji-group": { logo: "https://www.tanajigroup.com/assets/images/logos/header-logo.png", website: "https://www.tanajigroup.com" },
  "techport-solutions": { logo: "https://techportsolutions.in/assets/img/logo.png", website: "https://techportsolutions.in" },
  "venkateshwara-agro": { logo: "https://www.venkateshwarapoweragro.com/assets/logo-Cf76YeYC.png", website: "https://www.venkateshwarapoweragro.com" },
  "latur-mahanagar-palika": { logo: "https://mclatur.org/wp-content/uploads/2025/10/Latur%20Logo%201.jpeg", website: "https://mclatur.org" },
  "nashik-mahanagar-palika": { logo: "https://nmc.gov.in/assets/img/nmc_logo_Marathi.png", website: "https://nmc.gov.in" }
};

for (const [id, data] of Object.entries(updates)) {
  const regex = new RegExp(`(id:\\s*"${id}",\\n\\s*industry:\\s*"[^"]+",\\n\\s*client:\\s*"[^"]+",\\n)`);
  contentStr = contentStr.replace(regex, `$1    logo: "${data.logo}",\n    website: "${data.website}",\n`);
}

fs.writeFileSync('src/data/content.js', contentStr);
console.log('Successfully updated remaining case studies with logos and websites.');
