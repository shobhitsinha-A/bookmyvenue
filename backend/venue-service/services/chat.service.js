const db = require('../db/db');

const createChat = async (chatDto) => {
    try {

        let { from_user, to_user, message, time, status } = chatDto;
        const info = await db('chats')
            .insert({
                from_user: from_user,
                to_user: to_user,
                message: message,
                time: time,
                status: status
                }
            );
        const id = info[0];
        console.log('chat inserted  ->' , id);
        return id;
    } catch (e) {
        return e.message;
    }
}

const getChats = async (from_user, to_user) => {
    try {
        const info = await db('chats')
            .select('*')
            .where('from_user', from_user)
            .andWhere('to_user', to_user);

        console.log('chats ->' , info);
        return info;
    } catch (e) {
        return e.message;
    }
}

const getChatUsers = async (from_user) => {
    try {
        const info = await db('chats')
            .distinct('to_user')
            .where('from_user', from_user);

        console.log('chat users ->' , info);
        return info;
    } catch (e) {
        return e.message;
    }
}

module.exports = { createChat, getChats, getChatUsers };