import bcrypt from 'bcryptjs';

const hash = '$2y$12$ba4rfA9Y3uy.On/dajVn3.TZJpyKl.JHpnkYgzhorc1b5l5pUsAmm';
const password = 'admin'; // Is it admin? Let's assume the user was testing with 'admin'. Wait, we'll see if it errors.

try {
  // If bcryptjs doesn't support $2y$, it might throw an error. But actually bcryptjs does support $2y$ (it just replaces it internally or it accepts it as $2a$).
  const match = bcrypt.compareSync(password, hash);
  console.log("Match:", match);
} catch (e) {
  console.log("Error:", e.message);
}
