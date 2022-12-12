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
            .andWhere('to_user', to_user)
            .unionAll([
                db('chats')
                    .select('*')
                    .where('from_user', to_user)
                    .andWhere('to_user', from_user)
            ])
            .orderBy('time', 'asc');

        console.log('chats ->' , info);
        return info;
    } catch (e) {
        return e.message;
    }
}

const getChatUsers = async (from_user) => {
    try {
        const info = await db('chats')
            .distinct('to_user as user')
            .where('from_user', from_user)
            .union([
                db('chats')
                    .distinct('from_user as user')
                    .where('to_user', from_user)
            ]);

        console.log('chat users ->' , info);
        return info;
    } catch (e) {
        return e.message;
    }
}

const updateChatStatus = async (chatDto) => {
    try {
        const info = await db('chats')
            .where({
                'from_user': chatDto.from_user,
                'to_user': chatDto.to_user
            })
            .update({status: chatDto.status});
        console.log('chat status updated ->', info);
        return info;
    } catch (e) {
        return e.message;
    }
}

module.exports = { createChat, getChats, getChatUsers , updateChatStatus};