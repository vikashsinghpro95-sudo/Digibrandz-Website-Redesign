const fs = require('fs');
const path = require('path');

const iconMap = {
  Menu: 'FaBars',
  X: 'FaXmark',
  Moon: 'FaMoon',
  Sun: 'FaSun',
  Briefcase: 'FaBriefcase',
  Target: 'FaBullseye',
  Maximize: 'FaExpand',
  Handshake: 'FaHandshake',
  Code2: 'FaCode',
  MonitorPlay: 'FaDesktop',
  Smartphone: 'FaMobileScreen',
  Megaphone: 'FaBullhorn',
  Search: 'FaMagnifyingGlass',
  Share2: 'FaShareNodes',
  PenTool: 'FaPenNib',
  Bot: 'FaRobot',
  MousePointerClick: 'FaArrowPointer',
  FileText: 'FaFileLines',
  Mail: 'FaEnvelope',
  Users: 'FaUsers',
  TrendingUp: 'FaArrowTrendUp',
  Code: 'FaCode',
  Settings: 'FaGear',
  Server: 'FaServer',
  AppWindow: 'FaWindowMaximize',
  Database: 'FaDatabase',
  Globe: 'FaGlobe',
  Cloud: 'FaCloud',
  Layers: 'FaLayerGroup',
  Blocks: 'FaCubes',
  Cpu: 'FaMicrochip',
  BarChart: 'FaChartSimple',
  Webhook: 'FaNetworkWired',
  MessageSquare: 'FaMessage',
  PhoneCall: 'FaPhone',
  Cog: 'FaGear',
  BrainCircuit: 'FaBrain',
  Workflow: 'FaDiagramProject',
  LayoutDashboard: 'FaGauge',
  FileScan: 'FaFileInvoice',
  Sparkles: 'FaWandMagicSparkles',
  Layout: 'FaTableLayout',
  Paintbrush: 'FaPaintbrush',
  Play: 'FaPlay',
  CheckCircle: 'FaCircleCheck',
  GraduationCap: 'FaGraduationCap',
  Stethoscope: 'FaStethoscope',
  Home: 'FaHouse',
  ShoppingCart: 'FaCartShopping',
  Landmark: 'FaLandmark',
  Factory: 'FaIndustry',
  Truck: 'FaTruck',
  Utensils: 'FaUtensils',
  Plane: 'FaPlane',
  Car: 'FaCar',
  Rocket: 'FaRocket',
  Tag: 'FaTag',
  Tv: 'FaTv',
  ArrowRight: 'FaArrowRight',
  CheckCircle2: 'FaCircleCheck',
  ExternalLink: 'FaArrowUpRightFromSquare',
  Activity: 'FaChartLine',
  Quote: 'FaQuoteRight',
  Check: 'FaCheck',
  MapPin: 'FaLocationDot',
  Phone: 'FaPhone',
  Clock: 'FaClock'
};

const componentsDir = path.join(__dirname, 'src', 'components');

function replaceIconsInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Find the lucide-react import
  const importRegex = /import\s+\{([^}]+)\}\s+from\s+['"]lucide-react['"]/g;
  
  let match;
  let importedIcons = [];
  while ((match = importRegex.exec(content)) !== null) {
    importedIcons = match[1].split(',').map(s => s.trim()).filter(s => s);
  }
  
  if (importedIcons.length === 0) return; // No lucide imports
  
  const faIcons = new Set();
  
  // Replace JSX tags
  importedIcons.forEach(lucideIcon => {
    const faIcon = iconMap[lucideIcon];
    if (faIcon) {
      faIcons.add(faIcon);
      // Replace <Icon ...
      content = content.replace(new RegExp(`<${lucideIcon}\\b`, 'g'), `<${faIcon}`);
      // Replace {React.cloneElement(item.icon... if the icon is passed in an array but wait, array definitions don't use JSX tags as strings, they use them as identifiers like <Search /> which is matched above!
    } else {
      console.warn(`No FA mapping for ${lucideIcon} in ${filePath}`);
    }
  });
  
  // Replace the import statement
  if (faIcons.size > 0) {
    const faImport = `import { ${Array.from(faIcons).join(', ')} } from 'react-icons/fa6'`;
    content = content.replace(importRegex, faImport);
  } else {
    // Just remove it if no mappings
    content = content.replace(importRegex, '');
  }
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ${path.basename(filePath)}`);
}

fs.readdirSync(componentsDir).forEach(file => {
  if (file.endsWith('.jsx')) {
    replaceIconsInFile(path.join(componentsDir, file));
  }
});
