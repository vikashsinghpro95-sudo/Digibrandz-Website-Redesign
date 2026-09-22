import fs from 'fs';

let contentStr = fs.readFileSync('src/components/Navbar.jsx', 'utf8');

// Update NAV_LINKS
contentStr = contentStr.replace(
  /const NAV_LINKS = \[[\s\S]*?\]/,
  `const NAV_LINKS = [
  { name: 'Home', to: '/', isRoute: true },
  { name: 'About', to: '/about', isRoute: true },
  { name: 'Services', to: '/services', isRoute: true },
  { name: 'Solutions', to: '/solutions', isRoute: true },
  { name: 'Industries', to: '/industries', isRoute: true },
  { name: 'Portfolio', to: '/portfolio', isRoute: true },
  { name: 'Process', to: '/process', isRoute: true },
  { name: 'Pricing', to: '/pricing', isRoute: true },
  { name: 'Blog', to: '/blog', isRoute: true },
  { name: 'Team', to: '/team', isRoute: true },
  { name: 'Careers', to: '/careers', isRoute: true },
]`
);

// Update handleContactClick
contentStr = contentStr.replace(
  /const handleContactClick = \(\) => \{\n\s*handleNavClick\('contact'\)\n\s*\}/,
  `const handleContactClick = () => {
    navigate('/contact')
  }`
);

// Update bottom dock array
contentStr = contentStr.replace(
  /\{\[\s*\{\s*id:\s*'hero'[\s\S]*?\]\.map\(\(item\) => \([\s\S]*?\)\)\}/,
  `{[
          { id: '/', icon: FaHouse, label: 'Home' },
          { id: '/services', icon: FaLayerGroup, label: 'Services' },
          { id: '/pricing', icon: FaTag, label: 'Pricing' },
        ].map((item) => (
          <RouterLink
            key={item.id}
            to={item.id}
            className={\`flex flex-col items-center gap-1 transition-all cursor-pointer \${location.pathname === item.id ? 'text-brand-rose opacity-100 scale-110' : 'text-muted-foreground opacity-60 hover:opacity-100'}\`}
          >
            <item.icon size={20} />
            <span className="text-[10px] font-medium">{item.label}</span>
          </RouterLink>
        ))}`
);

// Update bottom dock contact button
contentStr = contentStr.replace(
  /\{location\.pathname === '\/' \? \([\s\S]*?\)\}/,
  `<RouterLink
             to="/contact"
             className={\`flex flex-col items-center gap-1 transition-all cursor-pointer group \${location.pathname === '/contact' ? 'text-brand-plum dark:text-white scale-110' : 'text-brand-rose hover:text-brand-rose/80'}\`}
           >
             <div className="bg-brand-rose/10 p-2.5 rounded-full -mt-6 bg-background border border-brand-rose/30 shadow-lg group-hover:scale-110 transition-transform">
                <FaEnvelope size={22} className={\`transition-colors \${location.pathname === '/contact' ? 'text-brand-plum dark:text-white' : 'text-brand-rose'}\`} />
             </div>
             <span className="text-[10px] font-bold mt-0.5">Contact</span>
           </RouterLink>`
);

fs.writeFileSync('src/components/Navbar.jsx', contentStr);
console.log('Successfully updated Navbar.jsx');
