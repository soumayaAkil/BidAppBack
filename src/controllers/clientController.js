const Client = require('../models/clientModel');
const{ validationResult } = require('express-validator');

 
exports.findAll = async(req, res, next) => {
try {
const [allclients] = await Client.fetchAll();
res.status(200).json(allclients);

}catch(err) {
    if(!err.statuscode){
        err.statuscode = 500
    }
    next(err);

    }
 
};
