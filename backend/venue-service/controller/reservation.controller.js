const reservationService = require('../services/reservation.service');

const { successResponse, errorResponse } = require('../commons/response.util');


const createReservation = async function(req, res) {

        let reqBody = JSON.parse(req.body);

        let { venue_id, user_id, event_name, expected_no_of_people
            , description, date, start_time, end_time } = reqBody;

        let reservationId = await reservationService.createReservation(reqBody);

        let resObj = {
            message: 'reservation created successfully',
            details: {
                reservation_id: reservationId,
                venue_id,
                user_id,
                date,
                start_time,
                end_time,
                event_name,
                expected_no_of_people,
                description
            }
        };

        return successResponse(res, resObj);

}

const getReservationsByVenue = async function(req, res) {

            let venue_id = req.params.venue_id;

            let availability = await reservationService.getReservationsByVenue(venue_id);

            let resObj = {
                message: 'availability retrieved successfully',
                details: {
                    availability
                }
            };

            return successResponse(res, resObj);

}

const getReservationsByUser = async function(req, res) {

            let user_id = req.params.user_id;

            let reservations = await reservationService.getReservationsByUser(user_id);

            let resObj = {
                message: 'reservations retrieved successfully',
                details: {
                    reservations
                }
            };

            return successResponse(res, resObj);

}

// const updateReservation = async function(req, res) {
//
//                 let reqBody = JSON.parse(req.body);
//
//                 let { reservation_id, venue_id, user_id, date, time, duration, status } = reqBody;
//
//                 let reservationUpdatedId = await reservationService.updateReservation(reqBody);
//
//                 let resObj = {
//                     message: 'reservation updated successfully',
//                     details: {
//                         reservation_id: reservationUpdatedId,
//                         venue_id,
//                         user_id,
//                         date,
//                         time,
//                         duration,
//                         status
//                     }
//                 };
//
//                 return successResponse(res, resObj);
//
// }
//
// const deleteReservation = async function(req, res) {
//
//                         let reservation_id = req.params.reservation_id;
//
//                         let reservationDeletedId = await reservationService.deleteReservation(reservation_id);
//
//                         let resObj = {
//                             message: 'reservation deleted successfully',
//                             details: {
//                                 reservation_id: reservationDeletedId
//                             }
//                         };
//
//                         return successResponse(res, resObj);
//
// }


module.exports = { createReservation, getReservationsByVenue, getReservationsByUser };