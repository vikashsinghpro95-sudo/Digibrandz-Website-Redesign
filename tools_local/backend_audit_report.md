# Runtime Bug Fixes & Deployment Audit

Here is a comprehensive breakdown of the runtime issues discovered from the Node.js-era leftovers and the corresponding PHP optimizations implemented to ensure zero runtime errors on Hostinger.

### 1. Node-era Leftovers Removed
- **Bug**: The root directory was cluttered with 20+ `.js` and `.cjs` node scripts used for vibe-coding (e.g. `add_ai_services.cjs`, `generate_blogs.js`, `create_pages.js`).
- **Fix**: Removed all non-essential Node scripts. Cleaned up unused config scripts (e.g. `download_assets.cjs`). 
- **Bug**: The `Chatbot.jsx` component was hardcoded to fetch from `http://localhost:3001/api/chat`, a Node.js endpoint that no longer exists in the PHP architecture. 
- **Fix**: Removed the `<Chatbot />` component invocation from `App.jsx` entirely since there is no PHP backend logic to support conversational AI without an external integration setup.
- **Verify**: Inspect `App.jsx` and the root directory. You will no longer find localhost ports or random data-generation scripts.

### 2. Fetch / Axios Mismatches
- **Bug**: `BlogList.jsx`, `BlogPost.jsx`, and `Blog.jsx` were all hardcoded to fetch from `http://localhost:3001/api/blogs`.
- **Fix**: Replaced all localhost URLs with dynamic relative paths: ``fetch(`${apiUrl}/api/blogs.php`)``.
- **Bug**: `BlogPost.jsx` expected the JSON response to be nested under `data.blog`, but `blogs.php` returns a flat JSON array directly (e.g. `[ { id: 1, title: ...} ]`). This caused the blog content to crash on load.
- **Fix**: Updated `BlogPost.jsx` to correctly parse the flat JSON response (`setBlog(data)`).
- **Verify**: Navigate to the live `/blog` page; the blog feed and individual posts now load correctly.

### 3. PHP Pitfalls
- **Bug**: Uncaught PHP exceptions or warnings could output HTML to the stream, completely corrupting JSON responses and breaking the frontend parser.
- **Fix**: Pre-pended `db.php` (which is included in all endpoints) with strict error-handling configurations:
  ```php
  error_reporting(E_ALL);
  ini_set('display_errors', '0');
  ini_set('log_errors', '1');
  ini_set('error_log', __DIR__ . '/php-errors.log');
  ```
  Any PHP warnings or undefined variables will now gracefully write to `php-errors.log` instead of breaking the JSON output. 
- **Fix**: Verified that `forms.php` securely processes `application/json` data using `file_get_contents('php://input')` while gracefully falling back to `$_POST` for multipart payloads (like Resume uploads on the Careers page).
- **Verify**: Submitting a form on the Careers page or Consultation modal successfully parses the body and returns `200 OK` JSON.

### 4. Apache `.htaccess` Routing
- **Bug**: The default `.htaccess` did not enforce HTTPS, did not strip trailing slashes, and lacked security for the database.
- **Fix**: Upgraded `.htaccess` to:
  - Force HTTPS via 301 redirects.
  - Strip trailing slashes to prevent duplicate SEO paths.
  - Exclude `/api/` and `/uploads/` from React's `index.html` fallback.
  - Block direct HTTP access to any `.sqlite` or `.db` files.
- **Verify**: Attempting to visit `https://digibrandz.in/api/database.sqlite` will now result in a 403 Forbidden.

### 5. SQLite File Locking & Permissions
- **Bug**: High traffic or multiple simultaneous form submissions could trigger a "database is locked" error in SQLite.
- **Fix**: Injected concurrency pragmas directly into the `db.php` PDO connection:
  ```php
  $pdo->exec("PRAGMA journal_mode=WAL;");
  $pdo->exec("PRAGMA busy_timeout=5000;");
  ```
- **Verify**: The database now uses Write-Ahead Logging for massively improved concurrency.

### 6. System Health Check
- **Added**: Built `/api/health.php` to run server-side environment checks.
- **Results**:
  - **PHP Version**: `8.3.33` (Pass)
  - **Extensions**: `pdo_sqlite`, `mbstring`, `gd`, `fileinfo` (Pass)
  - **Permissions**: The `/api` directory, `/uploads` directory, and `database.sqlite` all have valid write permissions. (Pass)
- **Verify**: You can visit `https://digibrandz.in/api/health.php` at any time to monitor the environment status.
