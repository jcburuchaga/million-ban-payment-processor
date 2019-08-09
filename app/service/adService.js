const {Advertisement, sequelize} = require('../sequelize/sequelize');

getPendingAds = () =>{
    return new Promise((resolve, reject) => {
        Advertisement.findAll({raw: true, where: {            
            enabled : '0',
            created : new Date()
          }})
        .then((data) => { 
            resolve(data);
        }).catch(error => { 
            reject(error);
        }); 
    });
}

getbuyedAds = () =>{
    return new Promise((resolve, reject) => {
        Advertisement.findAll({raw: true, where: {            
            enabled : '1'
          }})
        .then((data) => { 
            resolve(data);
        }).catch(error => { 
            reject(error);
        }); 
    });
}


updateAccount = (id, account, enabled ) =>{
    return new Promise((resolve, reject) => {
        Advertisement.update({enabled:enabled, owner: account},{where: {            
            idx : id
          }})
        .then((data) => { 
            resolve(data);
        }).catch(error => { 
            reject(error);
        }); 
    });
}

isCollide = (x,y,x2,y2 ) =>{
    return new Promise((resolve, reject) => {
        sequelize.query("select * from  million_ban.advertisement where (x >= "+x+" and x <= "+x2+" and enabled = '1') or (y >= "+y+" and y <= "+y2+" and enabled = '1') ", { type: sequelize.QueryTypes.SELECT})
        .then(users => { 
            console.log("select * from  million_ban.advertisement where (x >= "+x+" and x <= "+x2+" and enabled = '1') or (y >= "+y+" and y <= "+y2+" and enabled = '1') ");
            if (users.length > 0) {
              resolve(true);
            }
            else
            {
                resolve(false);
            }
        })    
    });
}

 

// select * from  million_ban.advertisement where 
// (x >= 90 and x <= 100) or (y >= 90 and y <= 119)
// and enabled = '1'
module.exports = {
    getPendingAds:getPendingAds,
    updateAccount:updateAccount,
    isCollide:isCollide,
    getbuyedAds:getbuyedAds
}