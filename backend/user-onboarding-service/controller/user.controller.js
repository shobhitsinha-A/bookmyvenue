const userService = require('../services/user.service');
const profileService = require('../services/profile.service');

const { successResponse, errorResponse } = require('../commons/response.util');

const registerUser = async function(req, res) {
    try {
      let { first_name, last_name, email, phone_no, user_name, password, role } = req.body;
      // TO DO baseline checks
      // validate if role is proper or not ?
      // for the fields
      // encrpyt the password
      // username uniqueness check - need to decide based on the design

      let registered_user_name = await userService.registerUser(req.body);
      let profile_username = await profileService.createProfile(req.body);

      let resObj = {};
      let errorMsg = [];

      if (registered_user_name === profile_username) {
          resObj = {
              message : 'user ' + user_name +' created successfully',
              details : {
                  first_name,
                  last_name,
                  email,
                  phone_no,
                  role
              }//,
              //token : tokenService.generateJwtToken(id)
          }
       } else {
          errorMsg.push(registered_user_name);
          errorMsg.push(profile_username);
         throw errorMsg
      }

      return successResponse(res, resObj);
    } catch (e) {
      return errorResponse(res, 400, e);
    }
};

const loginUser = async function (req, res) {
    try {
        let result = await userService.loginUser(req);
        return successResponse(res, result);
    } catch (e) {
        return errorResponse(res, 400, e.message);
    }
};

const deleteUser = async function (req, res) {
    try {
        let result = await profileService.deleteUser(req);
        return successResponse(res, result);
    } catch (e) {
        return errorResponse(res, 400, e.message);
    }
};


module.exports = { registerUser, loginUser, deleteUser};