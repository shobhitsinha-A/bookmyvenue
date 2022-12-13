const userService = require('../services/user.service');
const profileService = require('../services/profile.service');
const forgotPasswordService = require('../services/forgotpassword.service');
const bcrypt = require('bcryptjs');
const { Client } = require('@duosecurity/duo_universal');

const { successResponse, errorResponse } = require('../commons/response.util');

const duoClient = new Client({
    clientId: 'DIJG5KQ4EXKE1K9LJGR1',
    clientSecret: '0mR1NrzwVt5Apwrd2xYsfRYM7lLyUeDRc8182KCw',
    apiHost: 'api-65f53927.duosecurity.com',
    redirectUrl: 'https://bookmyvenue.live/profile',
});

const registerUser = async function(req, res) {

        let reqBody = JSON.parse(req.body);
        let { first_name, last_name, email, phone_no, user_name, password, role } = reqBody;
          // TO DO baseline checks
          // validate if role is proper or not ?
          // for the fields
          // encrypt the password
          // username uniqueness check - need to decide based on the design

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) throw err;
                // console.log('pass ->' + password);
                // console.log('hash -> ' + hash);
                reqBody.password = hash;
                try {

                    userService.registerUser(reqBody)
                        .then(response => {
                            let registered_user_name = response;

                            profileService.createProfile(reqBody)
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

const updateUserDetails = async function (req, res) {
    let reqBody = JSON.parse(req.body);
    try {
        let result = await profileService.updateUserDetails(reqBody);
        return successResponse(res, result);
    } catch (e) {
        return errorResponse(res, 400, e.message);
    }
}
const getUserDetails = async function (req, res) {

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
        let reqBody = JSON.parse(req.body);
        let { user_name, password} = reqBody;
        let hash = await userService.loginUser(reqBody);
        let role_id = hash.role_id;
        let role = await userService.getRole(role_id);

        await duoClient.healthCheck();
        let resObj = {};
        // Load hash from your password DB.
        bcrypt.compare(password, hash.e_pass).then((response) => {
            if (response === true) {
                try {
                    const state = duoClient.generateState();
                    const url = duoClient.createAuthUrl(user_name, state);
                    resObj["status"] = true;
                    resObj["data"] = {"user_name": user_name, "role": role, "url": url};

                    let user_status =  userService.updateUserStatus(user_name, true);
                    console.log("user status updated..." , user_status);

                    return successResponse(res, resObj);
                } catch (err) {
                    console.error(err);
                }
            } else {
                return errorResponse(res, 400, "Error");
            }
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

const forgotPassword = async function (req, res) {
    let reqBody = JSON.parse(req.body);
    try {
        let result = await forgotPasswordService.updatePassword(
            reqBody.user_name,
            reqBody.password
        );
        return successResponse(res, result);
    } catch (e) {
        return errorResponse(res, 400, e.message);
    }
};

const updateUserStatus = async function (req, res) {
    try {
        let reqBody = JSON.parse(req.body);
        let { user_name, is_online} = reqBody;
        let result = await userService.updateUserStatus(user_name, is_online);
        return successResponse(res, result);
    } catch (e) {
        return errorResponse(res, 400, e.message);
    }
}
module.exports = { registerUser, loginUser, getUserDetails,
                    updateUserDetails, deleteUser, forgotPassword, updateUserStatus };