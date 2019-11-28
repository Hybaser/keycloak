const logger = require('../log/logger');
const { api } = require('../api/api');

const createUser = async (token, user) => {
    
    let realmName = process.env.REALM === undefined ? 'master' : process.env.REALM;
    let createdUserId = '';   
    
    let newUser = {
        "email": user.Email,
        "firstName":user.FirstName,
        "lastName": user.LastName,
        "username": user.Email
    }    
    
    try {

        let header_config = {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + token
        }          
        
        let userCreated = await api.post(`/admin/realms/${realmName}/users`, newUser, {headers: header_config} );

        if(userCreated.status === 201) {
            createdUserId = userCreated.headers.location.split('/')[8];
            logger.logInfo("createUser# Created user: " + user.Email + " - id: " + createdUserId);
        }
        else {
            logger.logError("createUser# Error creating user: " + user.Email + " - response status: " + userCreated.status);
        }
    }
    catch(err) {
        if(err.response.status == 409) { 
            logger.logError("createUser# Error creating user: " + user.Email + "- response status: " + err.response.status + " - " + err.response.data.errorMessage);
        }
        else {
            logger.logError("createUser# Error creating user: " + user.Email + "- error message: " + err);
        }
        
    }
    

    return createdUserId;   
}

module.exports = {
    createUser
}

