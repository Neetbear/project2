// const fs = require('fs');
// // let test = {};
// // test['gi'] = 20;
// // console.log(test);

// function price(){
//     let tmp = fs.readdirSync('./views/skin');
//     let dataArr = {};
//     let dataPath = 'price.json';
//     let i = 0;
//     let j = 0;
//     tmp.forEach(element => {
//         // console.log(element);
//         let imgName = fs.readdirSync(`./views/skin/${element}`); //[Garen_0.jpg...]
//         let L = imgName.length //배열의 길이
//         // console.log(L);
//         if (L==1) {
//             dataArr[imgName[0]] = 20;
//             j++; //기본 이미지인 경우 20point
//         }

//         else {
//             L-=1;
//             let rareSkinLen = Math.ceil(L / 8); //전체 스킨 비율의 12% 해당하는 것에 레어부여
//             let normalSkinLen = Math.ceil((L / 8)*5);
//             let restSkinLen = L - (rareSkinLen + normalSkinLen);
            
//             let rarePrice = [70, 80, 90, 100]; //0이 나올 때
//             let normalPrice = [40, 45, 50, 55, 60, 65]; //1이 나올 때
//             let restPrice = [20, 25, 30, 35, 40]; //2
//             // let k = 0;
//             imgName.forEach(val => {
//                 if (val.endsWith('_0.jpg')) {
//                     dataArr[val] = 20; //0을 포함하면 기본스킨
//                     i++;
//                     j++;
//                     // k++;
//                 }
//                 else {
//                     while (true) {
//                         let choice = Math.floor(Math.random()*3); //0~2
//                         if (choice==0) {
//                             if (rareSkinLen > 0) {
//                                 dataArr[val] = rarePrice[Math.floor(Math.random()*4)];
//                                 rareSkinLen-=1;
//                                 j++;
//                                 break
//                             }
//                             else continue
//                         }
//                         else if (choice==1) {
//                             if (normalSkinLen > 0) {
//                                 dataArr[val] = normalPrice[Math.floor(Math.random()*6)];
//                                 normalSkinLen-=1;
//                                 j++;
//                                 break
//                             }
//                             else continue
//                         }
//                         else {
//                             if (restSkinLen > 0) {
//                                 dataArr[val] = restPrice[Math.floor(Math.random()*5)];
//                                 restSkinLen -=1;
//                                 j++;
//                                 break
//                             }
//                             else continue
//                         }
//                     }
//                 }
//             })
//             // console.log(element + ": " + k);
//         }
    
//     }); //챔피언 다 읽은 후
//     // console.log('i:' +i);
//     // console.log('j:' +j);
//     console.log()
//     fs.writeFileSync(dataPath, JSON.stringify(dataArr));
//     console.log("written file!");
// }
// price();

//밑에는 위에 price함수 실행하여 price.json파일 생성 후 실행
const fs = require("fs")
const mysql = require('sync-mysql');
var dbconfig = require('./mydbsql.json');
var priceFile = JSON.parse(fs.readFileSync('price.json'));

var connection = new mysql({
    host: dbconfig.host,
    user: dbconfig.user,
    password: dbconfig.password,
    database: dbconfig.database
})

for (let key in priceFile) {
    connection.query(`UPDATE skininfo SET cpoint = ${priceFile[key]} WHERE imgsrc= "${key}"`);
}