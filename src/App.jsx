import React, { useEffect, lazy, Suspense } from 'react'
import { Routes, Route, useLocation, Outlet } from 'react-router-dom'
import Lenis from 'lenis'
import { ThemeProvider } from './components/ThemeProvider'
import { SettingsProvider } from './contexts/SettingsContext'
import { ContentProvider } from './contexts/ContentContext'
import { AuthProvider } from './admin/AuthContext'

// Public Components
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
const Careers = lazy(() => import('./pages/Careers'))
const Team = lazy(() => import('./pages/Team'))
const BlogList = lazy(() => import('./pages/BlogList'))
const BlogPost = lazy(() => import('./pages/BlogPost'))
const About = lazy(() => import('./pages/About'))
const Services = lazy(() => import('./pages/Services'))
const ServiceDetails = lazy(() => import('./pages/ServiceDetails'))
const ConsultationModal = lazy(() => import('./components/ConsultationModal'))
const Chatbot = lazy(() => import('./components/Chatbot'))
const Solutions = lazy(() => import('./pages/Solutions'))
const Industries = lazy(() => import('./pages/Industries'))
const IndustryDetails = lazy(() => import('./pages/IndustryDetails'))
const Portfolio = lazy(() => import('./pages/Portfolio'))
const Process = lazy(() => import('./pages/Process'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const TestimonialsPage = lazy(() => import('./pages/TestimonialsPage'))
const TeamMemberDetails = lazy(() => import('./pages/TeamMemberDetails'))
const NotFound = lazy(() => import('./pages/NotFound'))

// Admin Components
const AdminLayout = lazy(() => import('./admin/components/AdminLayout'))
const Login = lazy(() => import('./admin/pages/Login'))
const Dashboard = lazy(() => import('./admin/pages/Dashboard'))
const BlogsAdmin = lazy(() => import('./admin/pages/BlogsAdmin'))
const ServicesAdmin = lazy(() => import('./admin/pages/ServicesAdmin'))
const IndustriesAdmin = lazy(() => import('./admin/pages/IndustriesAdmin'))
const PortfolioAdmin = lazy(() => import('./admin/pages/PortfolioAdmin'))
const TeamAdmin = lazy(() => import('./admin/pages/TeamAdmin'))
const CareersAdmin = lazy(() => import('./admin/pages/CareersAdmin'))
const SettingsAdmin = lazy(() => import('./admin/pages/SettingsAdmin'))
const ClientRequestsAdmin = lazy(() => import('./admin/pages/ClientRequestsAdmin'))
const AuditsAdmin = lazy(() => import('./admin/pages/AuditsAdmin'))
const ChatsAdmin = lazy(() => import('./admin/pages/ChatsAdmin'))

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}

function PublicLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-brand-rose/30 selection:text-brand-rose">
      <Navbar />
      <main className="flex-grow">
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
          <Outlet />
        </Suspense>
        <Suspense fallback={null}>
          <ConsultationModal />
          <Chatbot />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}

function App() {
  useEffect(() => {
    let lenis;
    let rafId;

    function initLenis() {
      if (lenis) return;
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (window.innerWidth >= 768 && !prefersReducedMotion) {
        lenis = new Lenis({
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          direction: 'vertical',
          gestureDirection: 'vertical',
          smooth: true,
          mouseMultiplier: 1,
          smoothTouch: false,
          touchMultiplier: 2,
          infinite: false,
        });

        window.lenis = lenis; // Expose globally for ScrollToTop

        function raf(time) {
          lenis.raf(time);
          rafId = requestAnimationFrame(raf);
        }
        rafId = requestAnimationFrame(raf);
      }
    }

    function destroyLenis() {
      if (lenis) {
        if (rafId) cancelAnimationFrame(rafId);
        lenis.destroy();
        lenis = null;
        window.lenis = null;
      }
    }

    function handleResize() {
      if (window.innerWidth >= 768) {
        initLenis();
      } else {
        destroyLenis();
      }
    }

    initLenis();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      destroyLenis();
    };
  }, []);

  return (
    <ThemeProvider>
      <SettingsProvider>
        <ContentProvider>
          <AuthProvider>
            <ScrollToTop />
            <Routes>
              {/* Admin Routes */}
              <Route path="/admin">
                <Route path="login" element={
                  <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
                    <Login />
                  </Suspense>
                } />
                <Route element={
                  <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
                    <AdminLayout />
                  </Suspense>
                }>
                  <Route index element={<Dashboard />} />
                  <Route path="blogs" element={<BlogsAdmin />} />
                  <Route path="services" element={<ServicesAdmin />} />
                  <Route path="industries" element={<IndustriesAdmin />} />
                  <Route path="portfolio" element={<PortfolioAdmin />} />
                  <Route path="team" element={<TeamAdmin />} />
                  <Route path="careers" element={<CareersAdmin />} />
                  <Route path="settings" element={<SettingsAdmin />} />
                  <Route path="client-requests" element={<ClientRequestsAdmin />} />
                  <Route path="audits" element={<AuditsAdmin />} />
                  <Route path="chats" element={<ChatsAdmin />} />
                </Route>
              </Route>

              {/* Public Routes */}
              <Route element={<PublicLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/services/:id" element={<ServiceDetails />} />
                <Route path="/solutions" element={<Solutions />} />
                <Route path="/industries" element={<Industries />} />
                <Route path="/industries/:id" element={<IndustryDetails />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/process" element={<Process />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/testimonials" element={<TestimonialsPage />} />
                <Route path="/team" element={<Team />} />
                <Route path="/team/:id" element={<TeamMemberDetails />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/blog" element={<BlogList />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </AuthProvider>
        </ContentProvider>
      </SettingsProvider>
    </ThemeProvider>
  )
}

export default App
