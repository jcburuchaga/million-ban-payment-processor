const {Advertisement} = require('../sequelize/sequelize');

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

updateAccount = (id) =>{
    return new Promise((resolve, reject) => {
        Advertisement.findAll({enabled:'1'},{where: {            
            idx : id
          }})
        .then((data) => { 
            resolve(data);
        }).catch(error => { 
            reject(error);
        }); 
    });
}
 


module.exports = {
    getPendingAds:getPendingAds,
    updateAccount:updateAccount
}