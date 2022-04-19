//https://yceffort.kr/2020/06/encryption-decryption-nodejs

// 'use strict'
const crypto = require('crypto');

const ENCRYPTION_KEY = process.env.ENCRYTPTION_KEY || 'abcdefghijklmnop'.repeat(2);
const IV_LENGTH = 16;

function encrypt(text) {
    const iv = crypto.randomBytes(IV_LENGTH)
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);

    const encrypted = cipher.update(text);

    return (iv.toString('hex') + ':' + Buffer.concat([encrypted, cipher.final()]).toString('hex'));
}

function decrypt(text) {
    const textParts = text.split(':');
    const iv = Buffer.from(textParts.shift(), 'hex');
    const encryptedText = Buffer.from(textParts.join(':'), 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);

    const decrypted = decipher.update(encryptedText);

    return Buffer.concat([decrypted, decipher.final()]).toString();
}

const text= 'hello my name is sky!';
const encryptResult = encrypt(text);
console.log('encrypt result:', encryptResult);

const decryptResult = decrypt(encryptResult);
console.log('decrypt result:', decryptResult);
console.log('61E9E0589CC10B2659C425EE943572B42522CCE317CCF9163AAA847F490C859E'.length)