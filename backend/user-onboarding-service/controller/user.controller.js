const userService = require('../services/user.service');
const profileService = require('../services/profile.service');
const bcrypt = require('bcryptjs');

const { successResponse, errorResponse } = require('../commons/response.util');

const registerUser = async function(req, res) {

        let { first_name, last_name, email, phone_no, user_name, password, role } = req.body;
          // TO DO baseline checks
          // validate if role is proper or not ?
          // for the fields
          // encrpyt the password
          // username uniqueness check - need to decide based on the design

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) throw err;
                console.log('pass ->' + password);
                console.log('hash -> ' + hash);
                req.body.password = hash;
                try {

                    userService.registerUser(req.body)
                        .then(response => {
                            let registered_user_name = response;

                            profileService.createProfile(req.body)
                                .then(response => {

                                    let profile_username = response;

                                    let resObj = {};
                                    let errorMsg = [];

                                    if (registered_user_name === profile_username) {
                                        resObj = {
                                            message: 'user ' + user_name + ' created successfully',
                                            details: {
                                                first_name,
                                                last_name,
                                                email,
                                                phone_no,
                                                role
                                            }
                                        }
                                    } else {
                                        errorMsg.push(registered_user_name);
                                        errorMsg.push(profile_username);
                                        throw errorMsg
                                    }

                                    return successResponse(res, resObj);
                                });

                        })
                        .catch(err => {
                            console.log(err);
                            return errorResponse(res, 400, err.message);
                        });

                } catch (e) {
                    return errorResponse(res, 400, e);
                }

            });
        });
};
const getUserDetails = async function (req, res) {
    console.log("details request...")

    let user_name = req.url.substring(req.url.lastIndexOf('/')+1);

    try {
        let details = await profileService.getDetailsByUserName(user_name);
        return successResponse(res, { user: details});
    } catch (e) {
        return errorResponse(res, 400, e.message);
    }
};

const loginUser = async function (req, res) {
    try {
        let { user_name, password, role} = req.body;

        let hash = await userService.loginUser(req);

        let resObj = {};
        // Load hash from your password DB.

        bcrypt.compare(password, hash, function(err, res) {
            // res === true
            if(err) {
                console.log("Error Decrypting password -> ");
            }

            if (res === true) {
                resObj["status"] = true;
                resObj["data"] = {user_name: user_name, role: role};
                return successResponse(res, resObj);;
            }

            resObj["status"] = false;
            resObj["data"] = {user_name: user_name, role: role};
            return errorResponse(res, 400, resObj);
        });

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


module.exports = { registerUser, loginUser, getUserDetails, deleteUser};