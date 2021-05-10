const fs = require('fs')
const csv = require('csv-parser')
const randomWords = require('random-words')

articles = [
{name:'i am avik',surname:'i am pandey'},
{name:'this is i am',surname:'yeah right'},
{name:'this is not right',surname:'cool'}
];
fin = [];
string_to_array = function (str) {
    return str.trim().split(" ");
};
for(var i = 0;i<articles.length;i++){
    var s = articles[i].name;
    
    var arr = string_to_array(s);
    var mp1 = new Map();

    for(var j=0;j<arr.length;j++)mp1.set(arr[j],1);
    var arr2 = [];
    for(var j = 0;j<articles.length;j++){
        if(j == i)continue;
        var arr1 = string_to_array(articles[j].name);
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
console.log(fin);


