var schedule = require('node-schedule');
var service = require('./app/service/adService');
const bananojs = require('bananojs')('http://localhost:7072');
 
 var address = "ban_3n11h9pd9qwqmbi9d1f9c3cp3h85z8fkisq9jco5eopiqgqcdk589ygdjnqh";

var j = schedule.scheduleJob('*/15 * * * * *', async () => {  
   let buyed = await service.getbuyedAds();  
   let pass = true;
   buyed.forEach( async (b) => { 
      let a = await bananojs.getAccountBalance(b.generated_address); 
      if(a.balance > 0 && pass )
      { 
          pass = false;
          console.log("going to send");
         await bananojs.send(b.wallet,b.generated_address,address,a.balance,0);
         console.log("sended :)");
      }
      console.log("nothing to do :)");
   }); 
});