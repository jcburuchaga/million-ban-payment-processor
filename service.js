var schedule = require('node-schedule');
var service = require('./app/service/adService');
const bananojs = require('bananojs')('http://localhost:7072');
 
var j = schedule.scheduleJob('*/5 * * * * *', async () => {
     
    //let f = await bananojs.getPendingBlocks("ban_1133ybpysnzc5xmaectsoeg8t5iewm87bzpat1tgz7a1dbyfr18g5ii5oxws");
    let f = await bananojs.getAccountInfo("ban_1cbaaa1yqeu81sifri3rpi6pkr8q7sxrqhikcaj6zwds619kz8fjzbuu5k59");
    //let f = await bananojs.getWalletBalances("0DDAC49E9782D48E19A502E64FFC85EF5603C1B7E04E8A9CCF75AB29C8176519");
     
    console.log("wal0, ", f)
   console.log('The answer to life, the universe, and everything!');
});