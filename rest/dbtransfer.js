const fs = require("fs")
const mysql = require('sync-mysql');
const crypto = require('crypto');
const dbconfig = require('./mydbsql.json');
const ENCRYPTION_KEY = 'abcdefghijklmnop'.repeat(2);
const IV_LENGTH = 16;
var userid = ["마서기영이","안성준","위성진","노진형", "ahnSJ","wsjSJ", "NEETBear", "Sungjin","Ahnsungjhun", "skyshr", "sky", "lol은중독이다", "롤창인생베이비", "나도몰라", "jirals", "ParkKyungBae", "Jidoil", "지도일", "박경배", "노진탁", "mrno", "이혜진", "김기원", "KKO", "김민욱", "kmW", "김재연", "KJYeon", "김재원", "김진경", "박승재", "박경배_스테파노", "안성욱", "박태현", "이시은", "장보은", "전민수", "정종찬", "정태수", "현", "Heidi", "HomePlus", "효마플러스", "권원현", "이삭park","이충현", "dlfldhs", "enttt1", "wkfrkdysotkfkd", "sjfmftkfkd", "lovee", "nature", "fsss", "fart", "ggji", "mlggg", "sjdmldntsmsahtmqdl", "snrnqhekdPQMswl", "rmtkfkadkf", "rlskgksl", "hani", "wjdakfwjdakf", "dkfrheh", "sjfmf", "dnfflsl", "dlfmaah", "fmsms", "ekdtlsdp", "rpqnxkr", "gkskaks", "gksmseptk", "fkdgownjdy,", "tkfkd", "gownjdysork", "soak", "dmaeh", "ahffk", "wnsmsrmsu", "fmfrmsurk", "tkfkdgksmstkfka", "ekdtlsdlslRKek", "tlsmsdnffl", "wlsmsakfdkdy", "rmfjgrp", "askgdltk", "fkdgksek", "goTsmsepdlwp", "ditkfkddmfdkf", "rjtrkxdkdy", "qnxkrdldlT", "djwp", "qkfdyd", "tjaktpdy", "dhsmfskfekd", "tlsdmsdnf", "flfurhgo", "wpqkfdjfrnf", "dmfemfdjqhkdy", "skfmfdnl", "gotjckadk", "dkdhkTejs", "dkvms", "tkfkddmfh", "skfmfwkq", "dkwnjdy", "eksgkskdml", "tkfkddmfh1"];

var connection = new mysql({
    host: dbconfig.host,
    user: dbconfig.user,
    password: dbconfig.password,
    database: dbconfig.database
})

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

// console.log(encrypt('sky'));
// console.log(decrypt('584d128b2a321faee6e9eac05febf1dc:305c62b298245a3b0e0aa3beb467f558'));

//userinfo에 데이터 삽입
// console.log(tmp['마서기영이'].userpassword);

// var tmp = JSON.parse(fs.readFileSync('dummyuser.json'));
// for (var key in tmp) {
//     let pwcrypto = encrypt(tmp[key].userpassword);
//     // console.log(pwcrypto);
//     const sql = `INSERT INTO userinfo (userid, userpassword, useremail, username, useraddress, useraddressdetail, userpoint, champseq) VALUES ("${key}", "${pwcrypto}",
//     "${tmp[key].useremail}", "${tmp[key].username}", "${tmp[key].useraddress}", "${tmp[key].useraddressdetail}", ${tmp[key].userpoint}, "${tmp[key].champseq}")`;
//     connection.query(sql);
// }

var tmp = JSON.parse(fs.readFileSync('dummyuserboard.json'));
console.log(tmp["현"]);

let i=1;
for (var key in tmp) {
    let j = 0;
    console.log(i)
    const sql = `INSERT INTO userboard (userid, title, content, regdate, modidate, hit, likeuser) VALUES ("${key}", "${tmp[key].title}", "${tmp[key].content}", "${tmp[key].regdate}", "${tmp[key].modidate}", ${tmp[key].hit}, "${tmp[key].likeuser}")`
    connection.query(sql);
    let cmt = tmp[key].comments;
    let cmtLen = cmt.length;
    let arr = chooseId(cmtLen);
    for (element of cmt) {
        const sql1 = `INSERT INTO commentboard (userid, comments, board_idx) VALUES ("${arr[j]}", "${cmt[j]}", ${i})`
        connection.query(sql1);
        j++;
    }
    i++;
}

function chooseId(num) {
    let tmp = new Set();
    while(tmp.size<num) {
        tmp.add(userid[Math.floor(Math.random()*107)]);
    }
    return Array.from(tmp);
}