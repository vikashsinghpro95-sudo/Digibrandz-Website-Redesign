# Content Map

This document maps all the visual and textual content from the React frontend to the new centralized SQLite Database schema. 

## Global Settings
- **Site Title, Tagline, Logo, Favicon**: Mapped to `settings` table (e.g. `siteTitle`, `siteTagline`). Used in `<Helmet>` (to be added) and `<Navbar>`.
- **Primary / Secondary Colors**: Mapped to `settings`. Injected in `SettingsContext.jsx`.
- **Contact Details** (Email, Phone, Address, WhatsApp): Mapped to `settings`. Used in `<Footer>`, `<Contact>`, `<ContactPage>`, `<Navbar>`.
- **Hero Title & Subtitle**: Mapped to `settings` (`heroTitle`, `heroSubtitle`). Used in `<Hero>`.
- **About Title & Text**: Mapped to `settings`. Used in `<AboutUs>`.
- **Services Title & Subtitle**: Mapped to `settings`. Used in `<ServicesOverview>`.
- **Footer Text**: Mapped to `settings`. Used in `<Footer>`.
- **Hero Slider Facts**: Mapped to `settings` (JSON array or pipe-separated) or `form_options` table. Used in `<Hero>`.

## Core Entities
1. **Services** (`src/data/content.js` -> `SERVICES`)
   - Fields: `id` (slug), `title`, `description`, `offers` (JSON array), `faqs` (JSON array).
   - Components: `<ServicesOverview>`, `<ServiceDetails>`, `<Services>`.

2. **Case Studies / Portfolio** (`src/data/content.js` -> `CASE_STUDIES`)
   - Fields: `slug`, `client`, `title`, `category`, `metrics` (JSON array), `challenge`, `solution`, `image`, `logo`, `website`, `testimonial` (JSON object).
   - Components: `<CaseStudies>`, `<Portfolio>`, `<TrustedBy>`.

3. **Team Members** (`src/data/team.js` -> `TEAM_MEMBERS`)
   - Fields: `id` (slug), `name`, `role`, `image`, `bio`, `specialties` (JSON array), `experience`, `education`, `certifications`, `social` (JSON object).
   - Components: `<Team>`, `<TeamMemberDetails>`.

4. **Testimonials** (`src/data/testimonials.js` -> `TESTIMONIALS`)
   - Fields: `id`, `name`, `role`, `company`, `image`, `content`, `rating`, `project`.
   - Components: `<Testimonials>`, `<TestimonialsPage>`.

5. **Industries** (`src/data/content.js` -> `INDUSTRIES`)
   - Fields: `id` (slug), `title`, `description`, `icon` (string/SVG name), `challenges` (JSON array), `solutions` (JSON array), `caseStudy` (JSON object).
   - Components: `<Industries>`, `<IndustryDetails>`.

6. **Careers / Jobs** (`src/data/content.js` -> `CAREERS`)
   - Fields: `id`, `title`, `department`, `location`, `type`, `description`, `requirements` (JSON array).
   - Components: `<Careers>`.

7. **Blogs** (Currently in `public/api/blogs.php` SQLite)
   - Fields: `id`, `title`, `slug`, `excerpt`, `content`, `author`, `date`, `readTime`, `category`, `image`, `status`.
   - Components: `<BlogList>`, `<BlogPost>`, `<Blog>`.

8. **Projects Stats Counters** (Not cleanly separated yet, hardcoded in some places)
   - Fields: `label`, `value`, `suffix`, `order`.
   - Components: `<AboutUs>`, `<Process>`, `<CaseStudies>` metrics.

## Form Submissions (Leads)
- **Tables**: `form_submissions`
- **Types**: `contact` (from ContactPage), `consultation` (from ConsultationModal), `career` (from Careers).

## SEO & Meta (New)
- **Table**: `pages_seo`
- Maps to routes like `/`, `/about`, `/services`, `/portfolio`. Controls Meta title, description, OG images.

## Main Navigation (New)
- **Table**: `nav_items`
- Fields: `label`, `path`, `order`, `parent_id`.
- Components: `<Navbar>`, `<Footer>`.
