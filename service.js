var schedule = require('node-schedule');
var service = require('./app/service/adService');
const bananojs = require('bananojs')('http://localhost:7072');
 
var grid = [];
function grid_array2d(w, h) {
   grid = [];
   grid.length = h;
 
   for (let x=0; x<100; x++) {
     const row = [];
     row.length = w;
     for(let y=0; y<100; y++) row[y] = 0;
     grid[x] = row;
   }
   return grid;
}

function isCollide(x1, y1, x2, y2) {
   // Returns true if has collision, inclusive.
   if (x1 < 0 || y1 < 0 || x2 >= 100 || y2 >= 100) return true;

   for (let x=Number(x1); x<=x2; x++) {
     for (let y=Number(y1); y<=y2; y++) {
       if(grid[x][y]) return true;
     }
   }
   return false;
 }

 function setPoints(x1, y1, x2, y2) {
   for (let x=Number(x1); x<=x2; x++) {
     for (let y=Number(y1); y<=y2; y++) {
       grid[x][y] = true;
     }
   }
 }

var j = schedule.scheduleJob('*/5 * * * * *', async () => { 
   let ads = await service.getPendingAds(); 
   let buyed = await service.getbuyedAds(); 
   if (ads) {
      grid_array2d(100,100);
      buyed.forEach(ad => {
         const x1 = Math.floor(ad.x/10);
         const y1 = Math.floor(ad.y/10);
         const x2 = (Number(ad.x)+Number(ad.width)-1)/10;
         const y2 = (Number(ad.y)+Number(ad.height)-1)/10;
         setPoints(x1,y1,x2,y2);
      });
   }
   ads.forEach( async (ad) => { 
      let a = await bananojs.getAccountHistory(ad.generated_address); 
      let ban_to_deposit = ad.width * ad.height;
      let ban_total = 0;
      let from_account = '';
      if(a.length > 0)
      {
         a.forEach( async (history) => { 
           from_account = history.account; 
           ban_total =  parseInt(await bananojs.rawToBan(history.amount)) + ban_total; 
           if (ban_total >= ban_to_deposit) { 
            const x1 = Math.floor(ad.x/10);
            const y1 = Math.floor(ad.y/10);
            const x2 = x1 + Math.floor(ad.width/10) - 1;
            const y2 = y1 + Math.floor(ad.height/10) - 1;
            if(!isCollide(x1, y1, x2, y2))
            {
               await service.updateAccount(ad.idx,from_account,'1' );
            }
            else
            {
               await service.updateAccount("return funds to:"+ad.idx,from_account,'0' );
            }
             
           } 
         });
      }
     
   }); 
});