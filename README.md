# DigiBrandz Website ReDesign - Deployment & Admin Guide

## Architecture Overview
This project uses a hybrid architecture designed perfectly for Hostinger:
- **Frontend**: React (Vite) Single Page Application (SPA).
- **Backend API**: Core PHP 8 endpoints (`/api/`) fetching JSON from an SQLite database.
- **Admin Panel**: Pure Vanilla PHP 8, HTML, and JS (`/admin/`).
- **Database**: SQLite 3, securely stored outside the web root (`private/database.sqlite`).

---

## 1. Initial Setup on Hostinger

### Folder Structure
You need to set up two main directories on your Hostinger server:
1. `public_html/` (Your web root - this will hold your React frontend, `/admin`, and `/api`)
2. `private/` (MUST BE PLACED **OUTSIDE** `public_html/` for security)

Example Server Structure:
```
/domains/digibrandz.com/
├── private/
│   ├── database.sqlite
│   ├── uploads/
│   ├── db.php
│   ├── auth.php
│   ├── helpers.php
│   └── migrations/
└── public_html/
    ├── admin/
    ├── api/
    ├── assets/
    ├── index.html
    ├── sitemap.xml
    ├── robots.txt
    └── .htaccess
```

### File Permissions
To allow the PHP application to upload files and modify the database, you must grant write permissions to the `private` folder:
- Set `private/` directory permissions to `755` or `775`.
- Set `private/database.sqlite` permissions to `664` or `666`.
- Set `private/uploads/` directory permissions to `775`.

---

## 2. First-Run Admin Creation

For security, there are no hardcoded default passwords in the codebase. To create your first Super Admin account:

1. Upload the files to the server.
2. Navigate to `private/migrations/seed.php` via command line/SSH on your server, and run:
   ```bash
   php private/migrations/seed.php
   ```
3. This script will initialize the database tables and prompt you to create an initial admin username and password.
4. Once created, delete `seed.php` for security.

---

## 3. Deployment Script (Safe Deploy)

When pushing updates to the live server, you must **never** overwrite the `private/database.sqlite` file or the `private/uploads/` directory, otherwise you will lose all live data and images.

Use `rsync` to safely deploy the application:

```bash
#!/bin/bash
# deploy.sh

echo "Building React Frontend..."
npm run build

echo "Syncing frontend to Hostinger public_html..."
rsync -avz --exclude '.env' dist/ user@hostinger:/domains/digibrandz.com/public_html/

echo "Syncing Admin and API to Hostinger public_html..."
rsync -avz --exclude '.env' public/ user@hostinger:/domains/digibrandz.com/public_html/

echo "Syncing private backend (excluding DB and Uploads) to Hostinger private..."
rsync -avz --exclude 'database.sqlite' --exclude 'uploads/' private/ user@hostinger:/domains/digibrandz.com/private/

echo "Deployment Complete!"
```

---

## 4. Backups

To back up your website data:
1. Log in to the `/admin` portal.
2. Navigate to **System -> Backup & Health** in the sidebar.
3. Click **"Download Backup (.zip)"**.
4. This will instantly package your `database.sqlite` file and the entire `uploads/` folder into a zip file for you to store safely offline.

---

## 5. Admin User Guide

### Accessing the Dashboard
- Navigate to `https://digibrandz.com/admin`
- Log in using your securely created credentials.

### Managing Content
- **Global Settings**: Go to `Global Settings` to modify Hero text, company descriptions, primary/secondary colors (using Hex codes), and footer text. Changes reflect instantly on the frontend.
- **Content Modules**: Use the specific tabs (Services, Case Studies, Team, etc.) to Create, Edit, or Delete content. You can manage the display order and toggle items between "Published" and "Draft".
- **Blog Engine**: Navigate to `Blogs` to write articles using the built-in rich-text editor (Quill.js). You can insert images, format text, and write custom excerpts.
- **Media Library**: Upload and manage images here. You can copy the URLs generated here to paste into your Blogs or Case Studies.
- **Forms & Leads**: Submissions from the Contact, Consultation, Careers, and Newsletter forms will land in `Leads & Submissions`. You can review them, download resumes, leave internal notes, and update their status (e.g., "Contacted", "Qualified").

### SEO & Redirects
- **Pages SEO**: Under the `SEO & Redirects` tab, you can define specific Meta Titles, Descriptions, Canonical URLs, and Open Graph Images for every individual route (e.g., `/`, `/about`, `/services`). 
- **301 Redirects**: If you change a URL, add a 301 Redirect to ensure you do not lose SEO value. The system will automatically catch requests to the old URL and forward them.
- **Sitemap**: Your sitemap is automatically generated at `/sitemap.xml` and includes all live pages and published blog posts.
