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
 


module.exports = {
    getPendingAds:getPendingAds
}