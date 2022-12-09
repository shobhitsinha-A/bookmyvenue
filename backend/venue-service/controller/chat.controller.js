const chatService = require('../services/chat.service');

const { successResponse, errorResponse } = require('../commons/response.util');

const createChat = async function(req, res) {

    let reqBody = JSON.parse(req.body);

    let { from_user, to_user, message, time, status } = reqBody;

    let chatCreatedId = await chatService.createChat(reqBody);

    let resObj = {
        message: 'chat created successfully',
        details: {
            chat_entry_id: chatCreatedId,
            from_user,
            to_user,
            message,
            time,
            status
        }
    };

    return successResponse(res, resObj);
}

const getChats = async function(req, res) {

    let from_user = req.params.from_user;
    let to_user = req.params.to_user;

    let chats = await chatService.getChats(from_user, to_user);

    let resObj = {
        message: 'chats retrieved successfully',
        details: {
            chats
        }
    };

    return successResponse(res, resObj);
};

const getChatUsers = async function(req, res) {

    let from_user = req.params.from_user;

    let chatUsers = await chatService.getChatUsers(from_user);

    let resObj = {
        message: 'chat users retrieved successfully',
        details: {
            chatUsers
        }
    };

    return successResponse(res, resObj);
}

const updateChatStatus = async function(req, res) {

        let reqBody = JSON.parse(req.body);

        let { from_user, to_user, status } = reqBody;

        let chatUpdatedId = await chatService.updateChatStatus(reqBody);

        let resObj = {
            message: 'chat status updated successfully',
            details: {
                chat_updated_id: chatUpdatedId,
                from_user,
                to_user,
                status
            }
        };

        return successResponse(res, resObj);
}

module.exports = { createChat , getChats, getChatUsers, updateChatStatus };