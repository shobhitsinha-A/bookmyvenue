const db = require('../db/db');
const rolesService = require('./role.service');

const registerUser = async function(userDto) {

  const { user_name, password, role }  =  userDto;
  
  const roles = await rolesService.getRoles();

  let rolesObj = {};
  for( rol of roles) {
      rolesObj[rol.role_name] = rol.role_id;
  }

  // TO DO : add only if not exists
    try {
        const info = await db('users')
            .insert({
                user_name: user_name,
                e_pass : password,
                role_id: rolesObj[role]
            });
        const id = info[0];
        console.log('register user returned ->' + id);
        return user_name;
    } catch (e) {
        return e.message;
    }

};

module.exports = { registerUser };