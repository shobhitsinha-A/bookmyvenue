const db = require('../db/db');

const createReservation = async function(reservationDto) {

        let { venue_id, user_id, event_name, expected_no_of_people
            , description, date, start_time, end_time, is_cancelled } = reservationDto;

        try {
            const info = await db('reservations')
                .insert({
                    venue_id: venue_id,
                    user_id: user_id,
                    event_name: event_name,
                    expected_no_of_people: expected_no_of_people,
                    description: description,
                    date: date,
                    start_time: start_time,
                    end_time: end_time,
                    is_cancelled: is_cancelled
                });
            const id = info[0];
            console.log('reservation inserted  -> ' , id);
            return id;
        }
        catch (e) {
            return e.message;
        }
}

const getReservationsByVenue = async function(venue_id) {
    try {
        const info = await db('reservations')
            .select('*')
            .where('venue_id', venue_id)
            .andWhere('date', '>=', new Date())
            .andWhere('is_cancelled', false);
        console.log('availability ->' , info);
        return info;
    } catch (e) {
        return e.message;
    }
}

const getReservationsByVenueId = async function(venue_id) {
    try {
        const info = await db('reservations')
            .select('*')
            .where('venue_id', venue_id)
            // .andWhere('date', '>=', new Date())
            // .andWhere('is_cancelled', false);
        console.log('reservations ->' , info);
        return info;
    } catch (e) {
        return e.message;
    }
}
const getReservationsByUser = async function(user_id) {
    try {
        const info = await db('reservations')
            .select('*')
            .where('user_id', user_id)
            .andWhere('date', '>=', new Date())
            .andWhere('is_cancelled', false)
            .orderBy('date', 'asc');
        console.log('reservations ->' , info);
        return info;
    } catch (e) {
        return e.message;
    }
}

const updateReservation = async function(reservationDto) {
    let { reservation_id, venue_id, user_id, event_name, expected_no_of_people
        , description, date, start_time, end_time, is_cancelled } = reservationDto;

    try {
        const info = await db('reservations')
            .where('id', reservation_id)
            .update({
                venue_id: venue_id,
                user_id: user_id,
                event_name: event_name,
                expected_no_of_people: expected_no_of_people,
                description: description,
                date: date,
                start_time: start_time,
                end_time: end_time,
                is_cancelled: is_cancelled
            });
        console.log('reservation updated ->' , info);
        return info;
    } catch (e) {
        return e.message;
    }
}

const deleteReservation = async function(reservation_id) {
    try {
        const info = await db('reservations')
            .where('id', reservation_id)
            .del();
        console.log('reservation deleted ->' , info);
        return info;
    } catch (e) {
        return e.message;
    }
}

const cancelReservations = async function(venue_id) {
    try {
        const info = await db('reservations')
            .where('venue_id', venue_id)
            .andWhere('date', '>=', new Date())
            .update({
                is_cancelled: true
            });
        console.log('reservations cancelled ->' , info);
        return info;
    } catch (e) {
        return e.message;
    }
}

const getReservationById = async function(reservation_id) {
    try {
        const info = await db('reservations')
            .select('*')
            .where('id', reservation_id);
        console.log('reservation id ->' , info);
        return info;
    } catch (e) {
        return e.message;
    }
}

const cancelReservation = async function(reservation_id) {
    try {
        const info = await db('reservations')
            .where('id', reservation_id)
            .update({
                is_cancelled: true
            });
        console.log('reservation cancelled ->' , info);
        return info;
    } catch (e) {
        return e.message;
    }
}

module.exports = { createReservation, getReservationsByVenue, getReservationsByUser,
                    updateReservation , deleteReservation, cancelReservations, getReservationById,
                    cancelReservation, getReservationsByVenueId };