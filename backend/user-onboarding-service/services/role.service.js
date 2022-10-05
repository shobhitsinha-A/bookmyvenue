const db = require('../db/db');

const getRoles = async function() {
  const roles = await db.select()
                        .table('roles');
  console.log("roles -> ", roles);

  return roles;
}

module.exports = { getRoles }
