const axios = require('axios');

const api_token = axios.create({
    baseURL: process.env.KC_SERVER_URL,
    timeout: 30000,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
});

const api = axios.create({
    baseURL: process.env.KC_SERVER_URL,
    timeout: 30000    
});

module.exports = {
    api_token, api
}