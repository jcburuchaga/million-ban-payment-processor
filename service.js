var schedule = require('node-schedule');
var service = require('./app/service/adService');
const bananojs = require('bananojs')('http://localhost:7072');
 
var j = schedule.scheduleJob('*/5 * * * * *', async () => { 
   let ads = await service.getPendingAds(); 
   ads.forEach( async (ad) => { 
      let a = await bananojs.getPendingBlocksForAccount(ad.generated_address,4,0,false); 
      let ban_to_deposit = ad.width * ad.height;
      let ban_total = 0;
      let from_account = '';
      if(a.length > 0)
      {
         a.forEach( async (hash) => {
           let b = await bananojs.getBlock(hash);
           from_account = b.block_account; 
           ban_total =  parseInt(await bananojs.rawToBan(b.amount)) + ban_total; 
           if (ban_total >= ban_to_deposit) { 
             await service.updateAccount(ad.idx,from_account );
           } 
         });
      }
     
   }); 
});