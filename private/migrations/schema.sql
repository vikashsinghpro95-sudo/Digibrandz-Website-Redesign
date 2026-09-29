-- DigiBrandz Database Schema
-- SQLite Version

PRAGMA foreign_keys = ON;

-- 1. Users & Security
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'editor', -- superadmin, editor, sales
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_login DATETIME
);

CREATE TABLE IF NOT EXISTS login_attempts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ip_address TEXT NOT NULL,
    attempt_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    success BOOLEAN NOT NULL
);

CREATE TABLE IF NOT EXISTS activity_log (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id INTEGER,
    details TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- 2. Global Settings
CREATE TABLE IF NOT EXISTS settings (
    setting_key TEXT PRIMARY KEY,
    setting_value TEXT,
    setting_type TEXT DEFAULT 'text', -- text, textarea, image, color, boolean
    setting_group TEXT DEFAULT 'general' -- general, hero, about, services, contact, seo, scripts
);

-- 3. SEO & Pages
CREATE TABLE IF NOT EXISTS pages_seo (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    route TEXT UNIQUE NOT NULL, -- e.g., '/', '/about', '/services'
    meta_title TEXT,
    meta_description TEXT,
    canonical_url TEXT,
    og_image TEXT,
    robots TEXT DEFAULT 'index, follow',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS redirects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    old_url TEXT UNIQUE NOT NULL,
    new_url TEXT NOT NULL,
    type INTEGER DEFAULT 301,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 4. Content Modules
CREATE TABLE IF NOT EXISTS services (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    offers TEXT, -- JSON Array
    faqs TEXT, -- JSON Array
    status TEXT DEFAULT 'published',
    display_order INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS case_studies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT UNIQUE NOT NULL,
    client TEXT NOT NULL,
    title TEXT NOT NULL,
    category TEXT,
    challenge TEXT,
    solution TEXT,
    metrics TEXT, -- JSON Array
    image TEXT,
    logo TEXT,
    website TEXT,
    testimonial TEXT, -- JSON Object
    status TEXT DEFAULT 'published',
    display_order INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS projects_stats (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    label TEXT NOT NULL,
    value TEXT NOT NULL,
    suffix TEXT,
    display_order INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS clients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    logo TEXT NOT NULL,
    url TEXT,
    display_order INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS testimonials (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    role TEXT,
    company TEXT,
    image TEXT,
    rating INTEGER DEFAULT 5,
    content TEXT NOT NULL,
    project TEXT,
    status TEXT DEFAULT 'published',
    display_order INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS team_members (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    image TEXT,
    bio TEXT,
    experience TEXT,
    education TEXT,
    certifications TEXT,
    specialties TEXT, -- JSON Array
    social TEXT, -- JSON Object
    status TEXT DEFAULT 'published',
    display_order INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS industries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    icon TEXT,
    challenges TEXT, -- JSON Array
    solutions TEXT, -- JSON Array
    case_study TEXT, -- JSON Object
    status TEXT DEFAULT 'published',
    display_order INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS nav_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    label TEXT NOT NULL,
    path TEXT NOT NULL,
    parent_id INTEGER DEFAULT NULL,
    display_order INTEGER DEFAULT 0,
    FOREIGN KEY(parent_id) REFERENCES nav_items(id) ON DELETE CASCADE
);

-- 5. Blogs
CREATE TABLE IF NOT EXISTS blog_categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS blog_tags (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS blogs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    excerpt TEXT,
    content TEXT,
    author TEXT DEFAULT 'Admin',
    featured_image TEXT,
    read_time TEXT,
    category_id INTEGER,
    status TEXT DEFAULT 'draft', -- draft, published, scheduled
    published_at DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    meta_title TEXT,
    meta_description TEXT,
    FOREIGN KEY(category_id) REFERENCES blog_categories(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS blog_post_tags (
    blog_id INTEGER,
    tag_id INTEGER,
    PRIMARY KEY (blog_id, tag_id),
    FOREIGN KEY(blog_id) REFERENCES blogs(id) ON DELETE CASCADE,
    FOREIGN KEY(tag_id) REFERENCES blog_tags(id) ON DELETE CASCADE
);

-- 6. Media Library
CREATE TABLE IF NOT EXISTS media (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    filename TEXT UNIQUE NOT NULL,
    original_name TEXT NOT NULL,
    mime_type TEXT NOT NULL,
    size_bytes INTEGER NOT NULL,
    alt_text TEXT,
    width INTEGER,
    height INTEGER,
    uploaded_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    uploaded_by INTEGER,
    FOREIGN KEY(uploaded_by) REFERENCES users(id) ON DELETE SET NULL
);

-- 7. Forms and Leads
CREATE TABLE IF NOT EXISTS form_options (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    group_name TEXT NOT NULL, -- e.g., 'budgets', 'timelines', 'business_types'
    label TEXT NOT NULL,
    value TEXT NOT NULL,
    display_order INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS jobs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    department TEXT NOT NULL,
    location TEXT NOT NULL,
    job_type TEXT NOT NULL, -- Full-time, Part-time, Contract
    description TEXT NOT NULL,
    requirements TEXT, -- JSON Array
    status TEXT DEFAULT 'open', -- open, closed
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS form_submissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT NOT NULL, -- contact, consultation, career
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    message TEXT,
    extra_data TEXT, -- JSON Object for dynamic fields or resume URLs
    status TEXT DEFAULT 'new', -- new, contacted, qualified, won, lost, archived
    notes TEXT,
    is_read BOOLEAN DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_forms_created ON form_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_blogs_slug ON blogs(slug);

