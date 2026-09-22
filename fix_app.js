import fs from 'fs';

let content = fs.readFileSync('src/App.jsx', 'utf8');

// The multi_replace_file_content accidentally removed ScrollToTop function and added it as a lazy import.
// Let's remove the lazy import of ScrollToTop and add the function back.

content = content.replace("const ScrollToTop = lazy(() => import('./components/ScrollToTop'))\n", "");

const scrollToTopFunc = `
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
`;

if (!content.includes('function ScrollToTop')) {
  content = content.replace('function App() {', scrollToTopFunc + '\nfunction App() {');
}

fs.writeFileSync('src/App.jsx', content);
console.log('Fixed App.jsx');
