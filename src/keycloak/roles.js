const logger = require('../log/logger');
const { api } = require('../api/api');

const addRoleToUser = async (token, userId) => {
    
    let realmName = process.env.REALM === undefined ? 'master' : process.env.REALM;
    let roleAddedToUser = false;   
    
    let userRoleData = [  
            {
                "id": process.env.KC_ROLE_ID,
                "name": process.env.KC_ROLE_NAME
            }
        ];
    
    try {

        let header_config = {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + token
        }          
        
        let roleAddedToUser = await api.post(`/admin/realms/${realmName}/users/${userId}/role-mappings/realm`, userRoleData, {headers: header_config} );

        if(roleAddedToUser.status === 204) {
            roleAddedToUser = true;
            logger.logInfo("addRoleToUser# Role added to userId: " + userId + " - roleId: " + process.env.KC_ROLE_ID);
        }
        else {
            logger.logError("addRoleToUser# Error adding role to user: " + userId + " - response status: " + roleAddedToUser.status);
        }
    }
    catch(err) { 
        logger.logError("addRoleToUser# Error adding role to user: " + userId + "- error message: " + err.response);
    }    

    return roleAddedToUser;   
}

module.exports = {
    addRoleToUser
}

