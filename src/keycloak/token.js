const qs = require('qs');
const logger = require('../log/logger');
const { api_token } = require('../api/api');

const getToken = async () => {

    let requestBody = qs.stringify({
        username: process.env.KC_USERNAME,
        password: process.env.KC_PASSWORD,
        client_id: 'admin-cli',
        grant_type: 'password'
    });  

    let realmName = process.env.REALM === undefined ? 'master' : process.env.REALM;
    let accessToken = null;

    try {
        let tokenObject = await api_token.post(`/realms/${realmName}/protocol/openid-connect/token`, requestBody );        
        if(tokenObject.status === 200){
            accessToken = tokenObject.data.access_token;
            logger.logInfo("getToken# token: " + accessToken);
        }
    }
    catch(err) {
        logger.logError("getToken# Error getting token - Error message: " + err.response);
    }

    return accessToken;
  
}

module.exports = {
    getToken
}

