import { createClient } from '@libsql/client';

const turso = createClient({
  url: 'libsql://digibrandz-vikash909012.aws-ap-south-1.turso.io',
  authToken: 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3OTA0NDg2NjEsImlkIjoiMDFhMGRmMGMtNGYwMS03NTY4LWE0NTctZjFlZTYyMWVkOTZjIiwia2lkIjoiY1F3X1BKODQyR1NQU3pzNDR5aWdqUS1GUWN4cERlX1VZQzg3elY0N0RobyIsInJpZCI6ImM5YmVkYmE4LWFhOGQtNGE3Mi04ZWYzLTcwNjg1N2Q1YjQ0ZSJ9.59Q97APE0iPTx1gpruwyU4t0KIQWdpkPSo2fK43elAyABS2UgNgdm9n86ftIMSEFaTKzo12Star0ypD0MXjjCQ'
});

const teamBios = {
  'Balaji K': 'Driving innovation and strategic growth for DigiBrandz with a focus on scalable solutions.',
  'Prashant R': 'Leading business operations and cultivating long-lasting relationships with our global partners.',
  'Deepak M': 'Ensuring seamless project execution and maintaining high standards across all client deliverables.',
  'Kunal N': 'Crafting data-driven marketing strategies that amplify brand visibility and drive revenue growth.',
  'Mangesh P': 'Transforming complex ideas into stunning visual narratives that captivate and engage audiences.',
  'Vishwajeet N': 'Expert in performance marketing, driving targeted traffic and maximizing ROI for our clients.',
  'Priya S': 'Specializing in SEO and organic growth, helping brands dominate search engine rankings.',
  'Sourabh P': 'Creating compelling, persuasive content that resonates with audiences and builds brand authority.',
  'Sayali R': 'Bridging the gap between business needs and technical solutions through in-depth data analysis.',
  'Suraj C': 'Designing intuitive user interfaces and eye-catching marketing collateral for modern brands.',
  'Shubham P': 'Identifying new business opportunities and delivering tailored solutions to prospective clients.',
  'Vikas S': 'Architecting robust web applications and ensuring seamless technical performance across platforms.'
};

async function run() {
  for (const [name, bio] of Object.entries(teamBios)) {
    await turso.execute({
      sql: 'UPDATE team_members SET bio = ? WHERE name = ?',
      args: [bio, name]
    });
  }
  console.log("Updated team bios.");

  const jobReqs = JSON.stringify([
    'Proven experience in a similar role',
    'Strong analytical and problem-solving skills',
    'Excellent communication and teamwork abilities',
    'Ability to work in a fast-paced environment'
  ]);

  const jobDesc = 'We are looking for a passionate individual to join our team. You will be responsible for driving results, collaborating with cross-functional teams, and delivering high-quality solutions that align with our business objectives.';

  await turso.execute({
    sql: 'UPDATE jobs SET description = ?, requirements = ?',
    args: [jobDesc, jobReqs]
  });
  
  console.log("Updated jobs.");
}

run();
