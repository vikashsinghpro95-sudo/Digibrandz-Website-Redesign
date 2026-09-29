import { createClient } from '@libsql/client';

const turso = createClient({
  url: 'libsql://digibrandz-vikash909012.aws-ap-south-1.turso.io',
  authToken: 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3OTA0NDg2NjEsImlkIjoiMDFhMGRmMGMtNGYwMS03NTY4LWE0NTctZjFlZTYyMWVkOTZjIiwia2lkIjoiY1F3X1BKODQyR1NQU3pzNDR5aWdqUS1GUWN4cERlX1VZQzg3elY0N0RobyIsInJpZCI6ImM5YmVkYmE4LWFhOGQtNGE3Mi04ZWYzLTcwNjg1N2Q1YjQ0ZSJ9.59Q97APE0iPTx1gpruwyU4t0KIQWdpkPSo2fK43elAyABS2UgNgdm9n86ftIMSEFaTKzo12Star0ypD0MXjjCQ'
});

async function run() {
  await turso.execute(`
    CREATE TABLE IF NOT EXISTS seo_audits (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      website_url TEXT NOT NULL,
      report_content TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await turso.execute(`
    CREATE TABLE IF NOT EXISTS chat_sessions (
      session_id TEXT PRIMARY KEY,
      messages TEXT,
      last_updated DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  console.log("Tables created!");
}

run();
