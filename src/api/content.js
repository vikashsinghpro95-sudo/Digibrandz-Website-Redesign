import { ABOUT_US as FALLBACK_ABOUT, SERVICES as FALLBACK_SERVICES, CASE_STUDIES as FALLBACK_CASES, CAREERS as FALLBACK_CAREERS, INDUSTRIES as FALLBACK_INDUSTRIES } from '../data/content';
import { TEAM_MEMBERS as FALLBACK_TEAM } from '../data/team';
import { TESTIMONIALS as FALLBACK_TESTIMONIALS } from '../data/testimonials';

export const DEFAULT_NAV = [
  { name: 'Home', to: '/', isRoute: true },
  { name: 'About', to: '/about', isRoute: true },
  { name: 'Services', to: '/services', isRoute: true },
  { name: 'Solutions', to: '/solutions', isRoute: true },
  { name: 'Industries', to: '/industries', isRoute: true },
  { name: 'Portfolio', to: '/portfolio', isRoute: true },
  { name: 'Process', to: '/process', isRoute: true },
  { name: 'Blog', to: '/blog', isRoute: true },
  { name: 'Team', to: '/team', isRoute: true },
  { name: 'Careers', to: '/careers', isRoute: true },
];

export const FALLBACK_CONTENT = {
  about: FALLBACK_ABOUT,
  services: FALLBACK_SERVICES,
  caseStudies: FALLBACK_CASES,
  team: FALLBACK_TEAM,
  testimonials: FALLBACK_TESTIMONIALS,
  industries: FALLBACK_INDUSTRIES,
  careers: FALLBACK_CAREERS,
  navLinks: DEFAULT_NAV,
};

export function normalizeAbout(settings = {}) {
  if (!settings || typeof settings !== 'object') return FALLBACK_CONTENT.about;
  return {
    story: settings.aboutText || FALLBACK_CONTENT.about.story,
    vision: settings.aboutVision || FALLBACK_CONTENT.about.vision,
    mission: settings.aboutMission || FALLBACK_CONTENT.about.mission,
    team: settings.aboutTeam || FALLBACK_CONTENT.about.team,
    office: settings.aboutOffice || FALLBACK_CONTENT.about.office,
    awards: settings.aboutAwards || FALLBACK_CONTENT.about.awards,
  };
}

export function normalizeServices(data) {
  if (!Array.isArray(data) || data.length === 0) return FALLBACK_CONTENT.services;
  return data.map((item, idx) => {
    const fb = FALLBACK_CONTENT.services.find(s => s.id === item.slug || s.title === item.title) || {};
    let offers = item.offers;
    if (typeof offers === 'string') {
      try { offers = JSON.parse(offers); } catch (e) { offers = []; }
    }
    let faqs = item.faqs;
    if (typeof faqs === 'string') {
      try { faqs = JSON.parse(faqs); } catch (e) { faqs = []; }
    }
    return {
      id: item.slug || item.id || fb.id,
      title: item.title || fb.title,
      description: item.description || fb.description,
      offers: (Array.isArray(offers) && offers.length > 0) ? offers : (fb.offers || []),
      faqs: (Array.isArray(faqs) && faqs.length > 0) ? faqs : (fb.faqs || []),
      featuredImage: item.featured_image || item.featuredImage || fb.featuredImage || null,
    };
  });
}

export function normalizeCaseStudies(data) {
  if (!Array.isArray(data) || data.length === 0) return FALLBACK_CONTENT.caseStudies;
  return data.map((item, idx) => {
    const fb = FALLBACK_CONTENT.caseStudies.find(cs => cs.id === item.slug || cs.client === item.client) || {};

    let challenges = item.challenges;
    if (typeof challenges === 'string') {
      try { challenges = JSON.parse(challenges); } catch (e) { challenges = null; }
    }
    if (!Array.isArray(challenges) && typeof item.challenge === 'string' && item.challenge.trim()) {
      challenges = item.challenge.split('\n').map(s => s.trim()).filter(Boolean);
    }
    if (!Array.isArray(challenges) || challenges.length === 0) {
      challenges = fb.challenges || [];
    }

    let whatWeDid = item.whatWeDid;
    if (typeof whatWeDid === 'string') {
      try { whatWeDid = JSON.parse(whatWeDid); } catch (e) { whatWeDid = null; }
    }
    if ((!whatWeDid || typeof whatWeDid !== 'object' || Object.keys(whatWeDid).length === 0) && typeof item.solution === 'string' && item.solution.trim()) {
      const lines = item.solution.split('\n');
      whatWeDid = {};
      let currentCat = 'Strategy & Execution';
      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed) continue;
        if (trimmed.includes(':')) {
          const [cat, rest] = trimmed.split(':', 2);
          currentCat = cat.trim();
          if (!whatWeDid[currentCat]) whatWeDid[currentCat] = [];
          if (rest.trim()) whatWeDid[currentCat].push(rest.trim());
        } else {
          if (!whatWeDid[currentCat]) whatWeDid[currentCat] = [];
          whatWeDid[currentCat].push(trimmed);
        }
      }
    }
    if (!whatWeDid || typeof whatWeDid !== 'object' || Object.keys(whatWeDid).length === 0) {
      whatWeDid = fb.whatWeDid || {};
    }

    return {
      id: item.slug || item.id || fb.id,
      industry: item.industry || item.category || fb.industry || 'General',
      client: item.client || fb.client || item.title || '',
      logo: item.logo || fb.logo || '',
      website: item.website || fb.website || '',
      overview: item.overview || fb.overview || item.description || item.title || '',
      challenges,
      whatWeDid,
    };
  });
}

const TEAM_COLORS = [
  'from-brand-rose to-[#ff0844]',
  'from-blue-500 to-cyan-400',
  'from-brand-plum to-purple-500',
  'from-emerald-400 to-teal-500',
  'from-orange-400 to-brand-rose',
  'from-indigo-400 to-brand-plum',
];

export function normalizeTeam(data) {
  if (!Array.isArray(data) || data.length === 0) return FALLBACK_CONTENT.team;
  return data.map((item, idx) => {
    const fb = FALLBACK_CONTENT.team.find(m => m.id === item.slug || m.id === item.id || m.name === item.name) || {};

    let specialties = item.specialties || item.expertise;
    if (typeof specialties === 'string') {
      try { specialties = JSON.parse(specialties); } catch (e) { specialties = []; }
    }
    let social = item.social || item.socials;
    if (typeof social === 'string') {
      try { social = JSON.parse(social); } catch (e) { social = {}; }
    }

    const name = item.name || fb.name || '';
    let initials = item.initials || fb.initials;
    if (!initials && name) {
      initials = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
    }

    return {
      id: item.slug || item.id || fb.id,
      name,
      role: item.role || fb.role,
      bio: item.bio || fb.bio,
      fullBio: item.fullBio || fb.fullBio || item.bio || fb.bio,
      initials: initials || 'DB',
      image: item.image || fb.image || null,
      color: item.color || fb.color || TEAM_COLORS[idx % TEAM_COLORS.length],
      expertise: (Array.isArray(specialties) && specialties.length > 0) ? specialties : (fb.expertise || []),
      socials: (social && typeof social === 'object' && Object.keys(social).length > 0) ? social : (fb.socials || {}),
    };
  });
}

export function normalizeTestimonials(data) {
  if (!Array.isArray(data) || data.length === 0) return FALLBACK_CONTENT.testimonials;
  return data.map((item, idx) => {
    const fb = {};
    return {
      id: item.id || fb.id || (idx + 1),
      text: item.text || item.content || fb.text || '',
      author: item.author || item.name || fb.author || 'Anonymous',
      role: item.role ? (item.company && !item.role.includes(item.company) ? `${item.role}, ${item.company}` : item.role) : (fb.role || item.company || 'Client'),
      rating: item.rating || fb.rating || 5,
    };
  });
}

export function normalizeIndustries(data) {
  if (!Array.isArray(data) || data.length === 0) return FALLBACK_CONTENT.industries;
  return data.map((item, idx) => {
    const fb = FALLBACK_CONTENT.industries.find(ind => ind.id === item.slug || ind.title === item.title) || {};
    let offers = item.offers;
    if (typeof offers === 'string') {
      try { offers = JSON.parse(offers); } catch (e) { offers = []; }
    }
    let faqs = item.faqs;
    if (typeof faqs === 'string') {
      try { faqs = JSON.parse(faqs); } catch (e) { faqs = []; }
    }
    return {
      id: item.slug || item.id || fb.id,
      title: item.title || fb.title,
      description: item.description || fb.description,
      offers: (Array.isArray(offers) && offers.length > 0) ? offers : (fb.offers || []),
      faqs: (Array.isArray(faqs) && faqs.length > 0) ? faqs : (fb.faqs || []),
    };
  });
}

export function normalizeCareers(data) {
  if (!data) return FALLBACK_CONTENT.careers;
  const rawJobs = Array.isArray(data) ? data : (data.jobs || data.openings || FALLBACK_CONTENT.careers.jobs);
  const jobs = (Array.isArray(rawJobs) && rawJobs.length > 0 ? rawJobs : FALLBACK_CONTENT.careers.jobs).map((job, idx) => {
    const fb = {};
    let reqs = job.requirements || job.skills;
    if (typeof reqs === 'string') {
      try { reqs = JSON.parse(reqs); } catch (e) { reqs = []; }
    }
    return {
      id: job.id || fb.id || (idx + 1),
      title: job.title || fb.title,
      department: job.department || fb.department || 'General',
      location: job.location || fb.location || (data?.location || FALLBACK_CONTENT.careers.location),
      type: job.type || job.job_type || fb.type || 'Full-Time',
      experience: job.experience || fb.experience || '1–3 Years',
      description: job.description || fb.description || '',
      requirements: (Array.isArray(reqs) && reqs.length > 0) ? reqs : (fb.requirements || fb.skills || []),
      skills: (Array.isArray(reqs) && reqs.length > 0) ? reqs : (fb.skills || fb.requirements || []),
    };
  });

  return {
    intro: data.intro || FALLBACK_CONTENT.careers.intro,
    location: data.location || FALLBACK_CONTENT.careers.location,
    workingDays: data.workingDays || FALLBACK_CONTENT.careers.workingDays,
    workingHours: data.workingHours || FALLBACK_CONTENT.careers.workingHours,
    whyJoin: (Array.isArray(data.whyJoin) && data.whyJoin.length > 0) ? data.whyJoin : FALLBACK_CONTENT.careers.whyJoin,
    benefits: (Array.isArray(data.benefits) && data.benefits.length > 0) ? data.benefits : FALLBACK_CONTENT.careers.benefits,
    jobs,
  };
}

export function normalizeNav(data) {
  if (!Array.isArray(data) || data.length === 0) return FALLBACK_CONTENT.navLinks;
  return data.map(item => ({
    name: item.name || item.label,
    to: item.to || item.path,
    isRoute: typeof item.isRoute === 'boolean' ? item.isRoute : String(item.to || item.path).startsWith('/'),
  }));
}

// Backwards-compatible named exports
export const ABOUT_US = FALLBACK_CONTENT.about;
export const SERVICES = FALLBACK_CONTENT.services;
export const CASE_STUDIES = FALLBACK_CONTENT.caseStudies;
export const TEAM_MEMBERS = FALLBACK_CONTENT.team;
export const TESTIMONIALS = FALLBACK_CONTENT.testimonials;
export const INDUSTRIES = FALLBACK_CONTENT.industries;
export const CAREERS = FALLBACK_CONTENT.careers;
export const NAV_LINKS = FALLBACK_CONTENT.navLinks;
