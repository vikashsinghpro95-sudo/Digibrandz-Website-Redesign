import { createClient } from '@libsql/client';

const turso = createClient({
  url: 'libsql://digibrandz-vikash909012.aws-ap-south-1.turso.io',
  authToken: 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3OTA0NDg2NjEsImlkIjoiMDFhMGRmMGMtNGYwMS03NTY4LWE0NTctZjFlZTYyMWVkOTZjIiwia2lkIjoiY1F3X1BKODQyR1NQU3pzNDR5aWdqUS1GUWN4cERlX1VZQzg3elY0N0RobyIsInJpZCI6ImM5YmVkYmE4LWFhOGQtNGE3Mi04ZWYzLTcwNjg1N2Q1YjQ0ZSJ9.59Q97APE0iPTx1gpruwyU4t0KIQWdpkPSo2fK43elAyABS2UgNgdm9n86ftIMSEFaTKzo12Star0ypD0MXjjCQ'
});

const team = [
  { name: 'Balaji K', role: 'Co-Founder' },
  { name: 'Prashant R', role: 'Co-Founder' },
  { name: 'Deepak M', role: 'Manager' },
  { name: 'Kunal N', role: 'Marketing Head' },
  { name: 'Mangesh P', role: 'Senior Graphic Designer' },
  { name: 'Vishwajeet N', role: 'Digital Marketer' },
  { name: 'Priya S', role: 'Digital Marketer' },
  { name: 'Sourabh P', role: 'Content Writer' },
  { name: 'Sayali R', role: 'Business Analyst' },
  { name: 'Suraj C', role: 'Graphic Designer' },
  { name: 'Shubham P', role: 'Sales Executive' },
  { name: 'Vikas S', role: 'Senior Software Developer' }
];

async function run() {
  for (const t of team) {
    const slug = t.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    try {
      await turso.execute({
        sql: 'INSERT INTO team_members (name, slug, role, status) VALUES (?, ?, ?, ?)',
        args: [t.name, slug, t.role, 'published']
      });
      console.log('Inserted:', t.name);
    } catch(e) {
      console.log('Skipped (already exists):', t.name);
    }
  }
}

run();
