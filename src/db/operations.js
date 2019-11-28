const { Pool, Client } = require('pg');
const logger = require('../log/logger');

const getUsersFromDb = async () => {
    let users = null;
    try {
        const pool = new Pool({ connectionString: process.env.DB_CONNECTION_STRING  });
      
        let _users = await pool.query(process.env.DB_QUERY);
        await pool.end();
        users = _users.rows;
    }
    catch(err){
        logger.logError("getUsers# Error getting users from db. - error message: " + err.response);
    }
    return users;
    
}

module.exports = {
    getUsersFromDb
}

