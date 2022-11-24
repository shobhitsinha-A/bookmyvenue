const emailService = require('../services/email.service');

const { successResponse, errorResponse } = require('../commons/response.util');

const sendEmail = async function(req, res) {

        let reqBody = JSON.parse(req.body);

        let { to, subject, text, message } = reqBody;

        let emailSent = await emailService.sendEmail(reqBody);

        let resObj = {
            message: 'email sent successfully',
            details: {
                to,
                subject,
                text,
                message
            }
        };

        return successResponse(res, resObj);
};

module.exports = {  sendEmail };