// localStorage.setItem('point', 100);
// import {a} from "./test"
// console.log('a:' + a);
var saleSkin = ['산타 브라움', '산타 그라가스', '얼음 왕자 문도', '눈사람 하이머딩거', '당돌한 엘프 징크스', '겨울 동화 카르마', '루돌프 코그모', '달콤 쌉싸름한 룰루', '겨울 동화 룰루', '눈맞이 축제 마오카이', '눈사람 마스터이', '겨울 동화 니코','눈토끼 니달리','겨울 동화 오리아나','눈꽃사슴 뽀삐','눈꽃 시비르','고요한 밤 소나', '겨울 동화 소라카', '행복한 엘프 티모', '나쁜 산타 베이가', '산타 질리언'];

var btn = document.querySelectorAll('.buy');
var point = document.querySelectorAll('.point');
var skin = document.querySelectorAll('.text-box');
var price = document.querySelectorAll('.price');

console.log("btn length: " + btn.length);

function make() {
    // let currentPoint = 100;
    // if (localStorage.getItem('point')) currentPoint = Number(localStorage.getItem('point'));
    // console.log(Number(localStorage.getItem('point')));
    // console.log(currentPoint);
    let data = document.querySelector('.infoBoxUserPoint').innerHTML;
    // console.log('data:' + data);
    // console.log(data.split(':')[1].split('<')[0]);
    let currentPoint = Number((data.split(':')[1].split('<')[0]).replace(' ',''));
    // console.log("currentPoint: " + currentPoint);
    // console.log(typeof(currentPoint));
    for (let element=0; element< btn.length; element++) {
        let btnBox = document.querySelectorAll('.btn-box');
        let p = point[element].innerHTML;
        let skinName = skin[element].innerHTML;
        // console.log(check);

        if (saleSkin.includes(skinName)) {
            p = Math.floor(p*4/5);
            var tmp = price[element].innerHTML;
            price[element].innerHTML = `<del>${tmp}</del>&nbsp&nbsp`;
            let img = document.createElement('img');
            img.setAttribute('class','money-icon');
            img.setAttribute('src', '/img/money.png');
            let span = document.createElement('span');
            span.setAttribute('class', 'point');
            span.innerHTML = p;
            price[element].appendChild(img);
            price[element].appendChild(span);
        }


        if (p > currentPoint) {
            // if (check) {
            //     check.innerHTML = '포인트 부족';
            // }
            // else {
                let tmp = document.createElement('span');
                tmp.setAttribute('id', 'signer');
                tmp.innerHTML = '포인트 부족';
                tmp.style.fontSize = "80%";
                tmp.style.fontWeight = "600";
                tmp.style.color = "red";
                btnBox[element].appendChild(tmp);
            // }
        }
        else {
            // if (check!=null) {
            //     check.innerHTML = "구매 가능";
            // }
            // else {
                let tmp = document.createElement('span');
                tmp.setAttribute('id', 'signer');
                tmp.innerHTML = '구매 가능';
                tmp.style.fontSize = "80%";
                tmp.style.fontWeight = "600";
                tmp.style.color = "white"
                btnBox[element].appendChild(tmp);
            // }
        }
    
            // setTimeout( () => {
            //     document.querySelectorAll('.btn-box')[element].appendChild(tmp);
            // },600);
    
        btn[element].addEventListener('click', () => {
            if (currentPoint >= p) {
                let tmp = confirm(`${p} 포인트가 차감됩니다.
정말 진행하시겠습니까?`);
                if (tmp) {
                    document.querySelectorAll('.form')[element].submit();
                }
            }
            
            else {
                alert('포인트가 부족합니다.');
            }
            // window.location.href = "./garen.html";
            // console.log("point: " + currentPoint);
            // window.location.href = './garen.html';
            // history(0);
            
        });
    }
}
// make();
window.onload = make();