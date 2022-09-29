const db = require('../db/db');

const createProfile = async function(userDto) {
  try {
    const { user_name, email, first_name, last_name, phone_no} = userDto;
    const info = await db('profiles')
      .insert({
        user_name: user_name,
        email: email,
        first_name: first_name,
        last_name: last_name,
        phone_no: phone_no
      });
    
    console.log('info -> ', info);
    const id = info[0];
    console.log('create profile returned ->' + id);
    return user_name;
  } catch (e) {
    return e.message;
  }
};


module.exports = { createProfile };