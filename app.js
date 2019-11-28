require('dotenv').config();
const schedule = require('node-schedule');
const db = require('./src/db/operations');
const keycloakUsers = require('./src/keycloak/users');
const keycloakToken = require('./src/keycloak/token');
const keycloakRoles = require('./src/keycloak/roles');

const retrieveUsers = async () => {
    let token = await keycloakToken.getToken();
    
    if(token != null){
        let dbUsers = await db.getUsersFromDb();

        if(dbUsers != null){            
            dbUsers.map(async user => {
                let userId = await keycloakUsers.createUser(token,user);
                if(userId != '')
                    await keycloakRoles.addRoleToUser(token, userId);
            }); 
        }
    }
}

retrieveUsers();

//every 30 minutes
//var j = schedule.scheduleJob('*/30 * * * *', function(){
//    retrieveUsers();
//});

    

