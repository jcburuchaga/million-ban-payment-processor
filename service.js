var schedule = require('node-schedule');
var service = require('./app/service/adService');
const bananojs = require('bananojs')('http://localhost:7072');
 
var j = schedule.scheduleJob('*/5 * * * * *', async () => {
     
   let ads = await service.getPendingAds();
   ads.forEach(ad => {
      let a = await bananojs.getAccountBalance(ad.generated_account);
      let ban_to_deposit = ad.x * ad.y;

      if (bananojs.rawToBan(a) >= ban_to_deposit) {
        await service.updateAccount(ad.idx);
      }
   });
   //  console.log("wal0, ", f);
});