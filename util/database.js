const mysql = require ('mysql2');
const config = require('../config/db.json');
const pool = mysql.createPool({
    host:config.host,
    user:config.user,
    database:config.database,
    password:config.password,
    port: 3306,
});
module.exports = pool.promise();

 


