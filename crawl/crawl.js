//https://senticoding.tistory.com/34 여기서 코드 따옴!!

var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var url = "https://www.leagueoflegends.com/ko-kr/champions/garen/"
// const axios = require('axios');

//class="style__NoScriptImg-g183su-0 style__Img-g183su-1 cipsic dBitJH"
//li class="style__CarouselItem-gky2mu-12 gskvxH swiper-slide swiper-slide-prev"

function getSrc(){
    var dataArr = [];
    var dataPath='garen.json';
    request(url, async function(err,res,body) {
        var $=cheerio.load(body);
        var lastLen=$('.style__CarouselItem-gky2mu-12').find('label').length;
        console.log("lastlen: " + lastLen);
		//it means the length of last one, sunday
        var idx=0;
		
        // class="style__Text-n3ovyt-3 gMLOLF" - 팸피언 이름 담긴 클래스
        //li class='style__CarouselItem-gky2mu-12 gskvxH swiper-slide'
		$('.style__CarouselItem-gky2mu-12').each(async function (index, item){
			$(item).find('label').each(function(num, item){
                var skinName=$(item).text();
                console.log(skinName+', '+index);
                let data = {
                skin:skinName
                }
                dataArr.push(data);
                    
                if(index==lastLen-1){
                    //this means last, should be modified
                    fs.writeFileSync(dataPath, JSON.stringify(dataArr));
                    console.log('wrote json file!');
                }
			});
        });
	});	
};

// console.log(tmp);
// console.log("type of tmp: " + typeof(tmp)); //string

getSrc();
