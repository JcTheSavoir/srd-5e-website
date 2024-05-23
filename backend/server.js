import { randomBytes } from 'crypto';

randomBytes(32, (err, buffer) => {
  if (err) throw err;
  console.log(buffer.toString('base64'));
});