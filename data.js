const fs = require('fs')
const csv = require('csv-parser')
const randomWords = require('random-words')

articles = [];
fin = [];
allData = [];
string_to_array = function (str) {
    return str.trim().split(" ");
};
function data(){
fs.createReadStream('IndianFinancialNews.csv')
      .pipe(csv())
      .on('data', function (row) {
        const art = {
          heading : row.Title,
          description : row.Description
        }
        articles.push(art);
      })
      .on('end', function () {
        // algorithm to group data
        
        for(var i = 0;i<10000;i++){
            var s = articles[i].heading;
            // console.log(s);
            var arr = string_to_array(s);
            // console.log(arr);
            var mp1 = new Map();
        
            for(var j=0;j<arr.length;j++)mp1.set(arr[j],1);
            var arr2 = [];
            for(var j = 0;j<10000;j++){
                if(j == i)continue;
                var arr1 = string_to_array(articles[j].heading);
                var cnt = 0;
                for(var k = 0;k<arr1.length;k++){
                    if(mp1.has(arr1[k]) == true){
                        cnt++;
                    }
                }
               arr2.push([cnt,j]);
               
            }
            arr2.sort();
            arr2.reverse();
            var k = arr2[0][0];
            var arts = [];
            arts.push(articles[i]);
            for(var j = 0;j<arr2.length;j++){
                if(k == arr2[j][0])arts.push(articles[arr2[j][1]]);
                else break;
            }
            fin.push(arts);
        
        }
        // console.log("test");
        // console.log(fin);
        
        for(var i  =0;i<fin.length;i++){
            const finArt = {
                heading :articles[i].heading,
                description:articles[i].description,
                groups:fin[i]
            }
            allData.push(finArt);
        }
        // console.log(allData);
      })
    }
    
    data();
module.exports = allData;




