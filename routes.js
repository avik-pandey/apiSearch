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


// client.indices.delete({
//   index:'dataset'
// },function(err,resp){
//   if(err){
//     console.log(err);
//   }
//   else{
//     console.log("deleted");
//     console.log("11111");
//   }
// })

async function f1(req,res){
    let temp = await client.ping({
      // ping usually has a 3000ms timeout
      requestTimeout: Infinity,
      // undocumented params are appended to the query string
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
   
    

    //   let temp2 = client.index({
    //     index:'dataset',
    
    // },function(err,resp,status){
    //     if(err){
    //         console.log(err);
    //     }
    //     else{
    //         console.log("ok");
    //         console.log("create",resp);
    //         console.log(dataset[0]);
    //     }
    
    // });

    // if(temp2.err){
    //   console.log(err)
    // }
    // else{
    //   console.log(3);
    // }
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

        // f1();
          
      }, n * 1000);  
// f1();

client.indices.exists({
  index:'dataset'
}).then(function(resp){
  console.log("yes")
})
.catch(err=>{
  console.log(err);
})

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


// async function run () {
//   // Let's start by indexing some data
//   await client.index({
//     index: 'game-of-thrones',
//     body: {
//       character: 'Ned Stark',
//       quote: 'Winter is coming.'
//     }
//   })

//   await client.index({
//     index: 'game-of-thrones',
//     body: {
//       character: 'Daenerys Targaryen',
//       quote: 'I am the blood of the dragon.'
//     }
//   })

//   await client.index({
//     index: 'game-of-thrones',
//     // here we are forcing an index refresh,
//     // otherwise we will not get any result
//     // in the consequent search
//     refresh: true,
//     body: {
//       character: 'Tyrion Lannister',
//       quote: 'A mind needs books like a sword needs a whetstone.'
//     }
//   })

//   // Let's search!
//   const { body } = await client.search({
//     index: 'game-of-thrones',
//     body: {
//       query: {
//         match: {
//           quote: 'winter'
//         }
//       }
//     }
//   })

//   console.log(body)
// }

// run().catch(console.log)
// client.ping({
//   // ping usually has a 3000ms timeout
//   requestTimeout: Infinity,
//   // undocumented params are appended to the query string
//   hello: "elasticsearch!"
// }, function (error) {
//   if (error) {
//     console.trace('elasticsearch cluster is down!');
//   } else {
//     console.log('All is well');
//   }
// });

// articles = [];

// fs.createReadStream('IndianFinancialNews.csv')
//   .pipe(csv())
//   .on('data', function (row) {
//     const art = {
//       heading : row.Title,
//       description : row.Description
//     }
//     articles.push(art);
//   })
//   .on('end', function () {
//     console.log(articles[0]);
//   })
 
// client.indices.create({
//     index:'names',

// },function(err,resp,status){
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log("ok");
//         console.log("create",resp);
//     }

// });

// router.post('/products',bodyParser,(req,res)=>{
//     elasticClient.index({
//         index:'products',
//         body:req.body
//     })
//     .then(resp=>{
//         return res.status(200).json({
//             msg:'product indexed'
//         });
//     })
//     .catch(err=>{
//         return res.status(500).json({
//             msg:'Error',
//             err
//         });
//     })

// });


module.exports = router;