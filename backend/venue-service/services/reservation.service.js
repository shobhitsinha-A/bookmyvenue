const db = require('../db/db');

const createReservation = async function(reservationDto) {

        let { venue_id, user_id, event_name, expected_no_of_people
            , description, date, start_time, end_time } = reservationDto;

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
                    end_time: end_time
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
            .andWhere('date', '>=', new Date());
        console.log('availability ->' , info);
        return info;
    } catch (e) {
        return e.message;
    }
}

const getReservationsByUser = async function(user_id) {
    try {
        const info = await db('reservations')
            .select('venue_id', 'date', 'start_time', 'end_time', 'event_name', 'expected_no_of_people', 'description')
            .where('user_id', user_id)
            .andWhere('date', '>=', new Date());
        console.log('reservations ->' , info);
        return info;
    } catch (e) {
        return e.message;
    }
}

module.exports = { createReservation, getReservationsByVenue, getReservationsByUser };