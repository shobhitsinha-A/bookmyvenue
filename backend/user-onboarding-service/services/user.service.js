const db = require('../db/db');
const rolesService = require('./role.service');

const registerUser = async function(userDto) {

  const { user_name, password, role }  =  userDto;
  
  const roles = await rolesService.getRoles();

  let rolesObj = {};
  for( let rol of roles) {
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

const loginUser = async function(credDto) {
    const { user_name, password } = credDto;

    // check for role , if role is not satisfied then
    let hash = await db('users')
        .select('e_pass', 'role_id')
        .where({
            user_name: user_name
        });

    return hash[0];

}

const getRole = async function(role_id) {
    const role = await db('roles')
        .select('role_name')
        .where({ role_id: role_id });

    return role[0].role_name;

}

const updateUserStatus = async function(user_name, status) {
    const user_status = await db('users')
        .where({ user_name: user_name })
        .update({ is_online: status });

    console.log('update user status returned ->' + user_status);

    return user_status;
}

module.exports = { registerUser, loginUser, getRole, updateUserStatus };