var schedule = require('node-schedule');
var service = require('./app/service/adService');
const bananojs = require('bananojs')('http://localhost:7072');
 
 var address = "ban_3n11h9pd9qwqmbi9d1f9c3cp3h85z8fkisq9jco5eopiqgqcdk589ygdjnqh";

var j = schedule.scheduleJob('*/30 * * * * *', async () => {  
   let buyed = await service.getbuyedAds();   
   buyed.forEach( async (b) => { 
      let a = await bananojs.getAccountBalance(b.generated_address); 
      if(a > 0 )
      {   
         await bananojs.send(b.wallet,b.generated_address,address,a,b.idx); 
      } 
   }); 
});