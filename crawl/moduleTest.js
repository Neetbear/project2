var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var url = "https://talk.op.gg/s/lol/all?sort=popular"
// const axios = require('axios');

//body > div > div > div > div > section > div > section > div > a > span > img
//class="style__NoScriptImg-g183su-0 style__Img-g183su-1 cipsic dBitJH"

function getSrc(){
    var dataArr = [];
    var dataPath='data.json';
    request(url, async function(err,res,body) {
        let $=cheerio.load(body);
        // var lastLen=$('.ajxce').find('img').length;
        // console.log("lastlen: " + lastLen);
		//it means the length of last one, sunday
        var index=0;
		
        $('.article-list-item__info').each(async function (chamName, item){
			var chamName = $(item).attr("href")
            // console.log(chamName);
            request(chamName, async function (err, res, body) {
                let $=cheerio.load(body);
                $('.article-content').each(async function (board, item){
                    var boardcon = $(item).find('p').html();
                    console.log(boardcon);
                    var data = {
                        // boardurl:chamName,
                        boardcontent:boardcon,
                    }
                    dataArr.push(data);
                })
                
                fs.writeFileSync(dataPath, JSON.stringify(dataArr))
            })
            
            // if($(item).attr("data-positions").includes("top")){
            //     $(item).find('span').each(function(chmpname, item){
            //         var chamName=$(item).text()
            //         var data = {
            //             chamName:chamName,
            //         }
            //         dataArr.push(data);
            //     })
            // }
            
        })
        

			// $(item).find('img').each(function(num, item){;
            // var src=$(item).attr('src');
            // console.log(champNum+', '+index);
            // var data={
            //     src:src, 
            // };
            // dataArr.push(data);
				
			// 	if(champNum==156){
			// 		//this means last, should be modified
			// 		fs.writeFileSync(dataPath, JSON.stringify(dataArr));
			// 		console.log('wrote json file!');
			// 	}
			// });
		// });
		
})
}
    
		
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
    
    getSrc();
    console.log("getSrc Success!");
    let tmp = fs.readFileSync('./data.json', 'utf-8', 'r');
    let temp = tmp.slice(2, tmp.length-2).split('},{');
    // console.log(temp[0]);
    // console.log("length of temp: " + temp.length);
    // let main = document.getElementById("main");

    let test = ''
    temp.map((val) => {
        let src = val.split('":')[1];
        test+= `<div>${src}</div>`
    });
    return test;
}
// window.onload = getImg;

exports.letsgo = {getSrc, getNumberInFormat, getImg};

