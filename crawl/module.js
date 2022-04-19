var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var url = "https://www.leagueoflegends.com/ko-kr/champions/?_gl=1*18stenv*_ga*MTc5MTE1MjUwMC4xNjM4MjM0MjY3*_ga_FXBJE5DEDD*MTYzODIzNDI2NS4xLjAuMTYzODIzNDI2NS42MA.."
// const axios = require('axios');

//body > div > div > div > div > section > div > section > div > a > span > img
//class="style__NoScriptImg-g183su-0 style__Img-g183su-1 cipsic dBitJH"

function getSrc(){
    var dataArr = [];
    var dataPath='data.json';
    request(url, async function(err,res,body) {
        var $=cheerio.load(body);
        // var lastLen=$('.ajxce').find('img').length;
        // console.log("lastlen: " + lastLen);
		//it means the length of last one, sunday
        var index=0;
		
        // class="style__Text-n3ovyt-3 gMLOLF" - 팸피언 이름 담긴 클래스
        let a = [1,2,3];
		$('.ajxce').each(async function (champNum, item){
			$(item).find('img').each(function(num, item){;
            var src=$(item).attr('src');
            console.log(champNum+', '+index);
            var data={
                src:src, 
            };
            dataArr.push(data);
				
				if(champNum==156){
					//this means last, should be modified
					fs.writeFileSync(dataPath, JSON.stringify(dataArr));
					console.log('wrote json file!');
				}
			});
		});
	});	
};
		
function getNumberInFormat(num){
	var min=0, max=156;
	if(min<=num && num<=max){
		if(0<=num && num<=9){
			return '0'+num;
		}
		else{
			return num;
		}
	}
}

// console.log(tmp);
// console.log("type of tmp: " + typeof(tmp)); //string

function getImg() {
    // getSrc();
    console.log("getSrc Success!");
    let tmp = fs.readFileSync('./data.json', 'utf-8', 'r');
    let temp = tmp.slice(2, tmp.length-2).split('},{');
    // console.log(temp[0]);
    // console.log("length of temp: " + temp.length);
    // let main = document.getElementById("main");

    let test = ''
    temp.map((val) => {
        let src = val.split('":')[1];
        test+= `<div><img src=${src}></div>`
    });
    return test;
}
// window.onload = getImg;

exports.letsgo = {getSrc, getNumberInFormat, getImg};

