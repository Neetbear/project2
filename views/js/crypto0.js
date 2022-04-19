//https://backend-intro.vlpt.us/3/02.html
const crypto = require('crypto');

const password = 'abc123';
const secret = 'MySecretKey1$1$234';

const hashed = crypto.createHmac('sha256', secret).update(password).digest('hex');

console.log(hashed);
console.log(hashed.length);
