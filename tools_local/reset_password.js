import { createClient } from '@libsql/client';
import bcrypt from 'bcryptjs';

const turso = createClient({
  url: 'libsql://digibrandz-vikash909012.aws-ap-south-1.turso.io',
  authToken: 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3OTA0NDg2NjEsImlkIjoiMDFhMGRmMGMtNGYwMS03NTY4LWE0NTctZjFlZTYyMWVkOTZjIiwia2lkIjoiY1F3X1BKODQyR1NQU3pzNDR5aWdqUS1GUWN4cERlX1VZQzg3elY0N0RobyIsInJpZCI6ImM5YmVkYmE4LWFhOGQtNGE3Mi04ZWYzLTcwNjg1N2Q1YjQ0ZSJ9.59Q97APE0iPTx1gpruwyU4t0KIQWdpkPSo2fK43elAyABS2UgNgdm9n86ftIMSEFaTKzo12Star0ypD0MXjjCQ'
});

async function run() {
  const hash = bcrypt.hashSync('admin123', 10);
  await turso.execute({
    sql: 'UPDATE users SET password_hash = ? WHERE username = ?',
    args: [hash, 'admin']
  });
  console.log('Password reset successfully to admin123');
}

run();
