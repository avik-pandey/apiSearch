const express = require('express');
const router = express.Router();
const elastic = require('elasticsearch');
const bodyParser = require('body-parser').json();
const fs = require('fs')
const csv = require('csv-parser')
const randomWords = require('random-words')
const dataset = require('./data');
// console.log(dataSet);
// 
var client = new elastic.Client({
  host: 'localhost:9200',
  log: 'trace'
});

//delete indices
client.indices.delete({
  index:'dataset'
},function(err,resp){
  if(err){
    console.log(err);
  }
  else{
    console.log("deleted");
    console.log("11111");
  }
})
// add index 
async function f1(req,res){
    let temp = await client.ping({
      
      requestTimeout: Infinity,
      
      hello: "elasticsearch!"
    }, function (error) {
      if (error) {
        console.trace('elasticsearch cluster is down!');
      } else {
        console.log('All is well');
      }
    });

    if(temp.err){
      console.log(err);
    }
    else{
      console.log("1");
    }
   
    
    for(var i=0;i<dataset.length;i++){
       client.index({
        index:'dataset',
        body:dataset[i]
      },function(err,res){
        if(err)console.log(err)
        else console.log("done !");
      })
      if(i==0)console.log(dataset[i]);
    }
    
}
var n = 1200;
    setInterval(function(){

        f1();
          
      }, n * 1000);  

// check if index exist or not
client.indices.exists({
  index:'dataset'
}).then(function(resp){
  console.log("yes")
})
.catch(err=>{
  console.log(err);
})
// search string 
async function f2(req,res){
    
    const {temp} = await client.search({  
      index: 'dataset',
      
      body: {
        query: {
          match: { heading: 'ATMs to become virtual bank branches, accept deposits with instant credit' }
        }
      }
    },function (error, response,status) {
        if (error){
          console.log("search error: "+error)
        }
        else {
          console.log("--- Response ---");
          console.log(response);
          console.log("--- Hits ---");
          response.hits.hits.forEach(function(hit){
            console.log(hit);
          })
        }
    });

    console.log(temp); 
      // console.log(temp.hits.hits)
      // console.log(1);
    

}
f2().catch(console.log);






//add document
router.post('/add',bodyParser,(req,res)=>{
  client.index({
    index:'dataset',
    body:req.body
  },function(res,err){
      if(err){
        console.log(err);
      }
      else{
        console.log(res);
      }
  })
  dataset.push(req.body);
})
 



module.exports = router;