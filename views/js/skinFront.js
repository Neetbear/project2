// const fs = require("fs");
// import { box } from "./node_m";
// console.log(test);

var tmp = document.querySelectorAll('.form');
var imgicon = document.querySelectorAll('.imgicon');
var spantext = document.querySelectorAll('.champname')
// console.log("tmp length: " + tmp.length);
// console.log(tmp[6].innerHTML);
// console.log(tmp);
// console.log(imgicon);

for (let i=0; i<tmp.length; i++) {
    // console.log(tmp[i].innerHTML);
    imgicon[i].addEventListener('click', ()=> {
        console.log(i);
        tmp[i].submit();
    });
    imgicon[i].addEventListener('mouseover', () => {
        spantext[i].style.textDecoration = "underline";
    });
    imgicon[i].addEventListener('mouseout', () => {
        spantext[i].style.textDecoration = "none";
    });
}

var btn = document.querySelectorAll('.line')
var originColor = btn[1].style.backgroundColor;
var btnSelector = 0;
console.log("btn: " + btnSelector);
for (let i=0; i<btn.length; i++) {
    btn[i].addEventListener('click', ()=> {
        btn[btnSelector].style.backgroundColor = originColor;
        btn[btnSelector].style.fontWeight = "initial";
        btn[btnSelector].style.color = "initial";
        btn[i].style.backgroundColor = "rgba(70, 70, 70)";
        btn[i].style.color = "rgb(226, 164, 71)";
        btn[i].style.fontWeight = "700"
        btnSelector = i;
        console.log("btn: " + btnSelector)
    })
}
btn[0].style.backgroundColor = "rgba(70, 70, 70)";
btn[0].style.color = "rgb(226, 164, 71)";
btn[0].style.fontWeight = "700";

var imgForm = document.querySelectorAll('.imgForm');
for (let i=0; i<imgForm.length; i++) {
    imgForm[i].addEventListener('click', ()=> {
        imgForm[i].submit();
    });
}
imgForm

async function placeImg(line) {
    try {
        let res = ''
        if (line=="all") {
            res = await axios.get('/all');
        }
        else if (line=="top") {
            res = await axios.get('/top');
        }
        else if (line=="jng") {
            res = await axios.get('/jng');
        }
        else if (line=="mid") {
            res = await axios.get('/mid');
        }
        else if (line=="adc") {
            res = await axios.get('/adc');
        } 
        else {
            res = await axios.get('/sup');
        }
        const data = res.data;
        let box = document.querySelector('.main-container');
        // console.log("line: " + line);
        // console.log(box);
        box.innerHTML = '';
        // let a = {1: 1, 2: 2};
        // console.log("length: ", Object.keys(a).length);

        let dataLen = Object.keys(data).length;
        let findLen = dataLen%9;

        console.log("dataLen: " + dataLen);
        console.log("findLen: ", findLen);
        const dummy = document.createElement('div');
        dummy.setAttribute('class', 'dummy');

        Object.keys(data).map((key) => {
            const test = document.createElement('div'); //div class="test"
            const contentBox = document.createElement('div');
            const imgBox = document.createElement('div'); 
            const form = document.createElement('form');
            const champname = document.createElement('div');
            const img = document.createElement('img');
            form.setAttribute('method', 'get');
            test.setAttribute('class', 'full-box');
            champname.setAttribute('class', 'champname');
            imgBox.setAttribute('class', 'img-box');
            contentBox.setAttribute('class', 'content-box');
            img.setAttribute('src', `./img/iconimg/${key}.png`);
            form.setAttribute('class', 'form');
            form.setAttribute('action', `/skin/${key}`);
            img.setAttribute('class', 'imgicon');

            if (dataLen<=findLen) {
                console.log('here');
                champname.innerHTML = data[key];
                form.appendChild(img);
                imgBox.appendChild(form);
                contentBox.appendChild(imgBox);
                contentBox.appendChild(champname);
                test.appendChild(contentBox);
                dummy.appendChild(test);
                
                if(dataLen==1) box.appendChild(dummy);
            }

            else {
                champname.innerHTML = data[key];
                form.appendChild(img);
                imgBox.appendChild(form);
                contentBox.appendChild(imgBox);
                contentBox.appendChild(champname);
                test.appendChild(contentBox);
                box.appendChild(test);
            }
            dataLen--;

        });

        let tt = document.querySelectorAll('.form');
        let imgic = document.querySelectorAll('.imgicon');
        let st = document.querySelectorAll('.champname');

        for (let i=0; i<imgicon.length; i++) {
            if(imgic[i]) {
                imgic[i].addEventListener('click', ()=>{
                    tt[i].submit();
                });
                imgic[i].addEventListener('mouseover', () => {
                    st[i].style.textDecoration = "underline";
                });
                imgic[i].addEventListener('mouseout', () => {
                    st[i].style.textDecoration = "none";
                });
            }
        }
        return
    } catch (err) {
        console.error(err);
    }
}

var sections = document.querySelectorAll('.line');

for (var i = 0; i<sections.length; i++) {
    sections[i].addEventListener('click', (e) => {
        e.preventDefault();
        const text = e.target.innerHTML;
        // console.log(text);
        let str = '';
        try {
            if (text=="전체") {
                str = "all";
            }
            else if (text=="탑") {
                str = "top";
            }
            else if (text=="정글") {
                str = 'jng';
            }
            else if (text=="미드") {
                str = 'mid';
            }
            else if (text=="원딜") {
                str = 'adc';
            }
            else {
                str = 'sup';
            }
            // console.log("str: " + str);
            placeImg(str);
        } catch(err) {
            console.error(err);
        }
    });
}