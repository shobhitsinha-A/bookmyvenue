const reservationService = require('../services/reservation.service');

const venueService = require('../services/venue.service');

const emailService = require('../services/email.service');

const profileService = require('../services/profile.service');

const { successResponse, errorResponse } = require('../commons/response.util');


const createReservation = async function(req, res) {

    try {
        let reqBody = JSON.parse(req.body);

        let { venue_id, user_id, event_name, expected_no_of_people
            , description, date, start_time, end_time, is_cancelled } = reqBody;

        // if not available, return error
        let venue = await venueService.getVenueById(venue_id);

        if (venue[0].is_available === 0) {
            return errorResponse(res, 200, 'venue not available for reservation');
        }

        // let reservationId = 5
        let reservationId = await reservationService.createReservation(reqBody);
        let profile = await profileService.getDetailsByUserName(user_id);
        let venueDetails = await venueService.getVenueById(venue_id)
        let venueOwnerProfile = await profileService.getDetailsByUserName(venueDetails[0].created_by)
        // send email to user
        let user_email = profile[0].email;

        let host_email = venueOwnerProfile[0].email;

        let subject = 'Reservation Confirmation';
        let html = '<p>Your reservation for ' + event_name + ' at ' + venueDetails[0].name + ' on ' + date + ' from ' + start_time + ' to ' + end_time + ' has been confirmed.</p>';

        let userParamBody = {
            "from" : "bookmyvenueteam15@gmail.com",
            "to" : user_email,
            "subject" : subject,
            "message" : html
        }

        let vhtml = '<p>Your venue ' + venueDetails[0].name + ' has been reserved for ' + event_name + ' on ' + date + ' from ' + start_time + ' to ' + end_time +' by user '+ user_id +'</p>';

        let venueOwnerParamBody = {
            "from" : "bookmyvenueteam15@gmail.com",
            "to" : host_email,
            "subject" : subject,
            "message" : vhtml
        }
        let userEmail = await emailService.sendEmail(userParamBody);

        let venueOwnerEmail = await emailService.sendEmail(venueOwnerParamBody);

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
                description,
                is_cancelled
            }
        }

        return successResponse(res, resObj);

    } catch (error) {
        console.log(error);
        return errorResponse(res, 500, 'Internal Server Error');
    }

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

        for (const reservation of reservations) {
            let venue = await venueService.getVenueById(reservation.venue_id);
            reservation.venue_name = venue[0].name;
        }
        let resObj = {
            message: 'reservations retrieved successfully',
            details: {
                reservations
            }
        };

        return successResponse(res, resObj);

}

const updateReservation = async function(req, res) {

        let reqBody = JSON.parse(req.body);

        let { reservation_id, venue_id, user_id, event_name, expected_no_of_people
            , description, date, start_time, end_time, is_cancelled } = reqBody;

        let reservationId = await reservationService.updateReservation(reqBody);

        let resObj = {
            message: 'reservation updated successfully',
            details: {
                reservation_id: reservationId,
                venue_id,
                user_id,
                date,
                start_time,
                end_time,
                event_name,
                expected_no_of_people,
                description,
                is_cancelled
            }
        };

        return successResponse(res, resObj);

}

const deleteReservation = async function(req, res) {

        let reservation_id = req.params.reservation_id;

        let reservation = await reservationService.deleteReservation(reservation_id);

        let resObj = {
            message: 'reservation deleted successfully',
            details: {
                reservation
            }
        };

        return successResponse(res, resObj);

}

const cancelReservations = async function(req, res) {

    try {
        let venue_id = req.params.venue_id;

        let availability = await reservationService.getReservationsByVenue(venue_id);

        for (const avail of availability) {
            let profile = await profileService.getDetailsByUserName(avail.user_id);
            let venueDetails = await venueService.getVenueById(venue_id)
            // send cancellation email to user
            let user_email = profile[0].email;

            let subject = 'Reservation Cancellation';
            let html = '<p>Your reservation for ' + avail.event_name + ' at ' + venueDetails[0].name + ' on ' + avail.date + ' from ' + avail.start_time + ' to ' + avail.end_time + ' has been cancelled.</p>';

            let userParamBody = {
                "from" : "bookmyvenueteam15@gmail.com",
                "to" : user_email,
                "subject" : subject,
                "message" : html
            }

            let userEmail = await emailService.sendEmail(userParamBody);

        }
        let reservations = await reservationService.cancelReservations(venue_id);

        let resObj = {
            message: 'reservations cancelled successfully',
            details: {
                reservations
            }
        };

        return successResponse(res, resObj);
    } catch (error) {
        console.log(error);
        //return errorResponse(res, 500, 'Internal Server Error');
    }


}

const getReservationById = async function(req, res) {

        let reservation_id = req.params.reservation_id;

        let reservation = await reservationService.getReservationById(reservation_id);

        let resObj = {
            message: 'reservation retrieved successfully',
            details: {
                reservation
            }
        }

        return successResponse(res, resObj);
}

const getReservationsByHost = async function(req, res) {

    let host_id = req.params.host_id;

    let venues = await venueService.getVenuesByUserId(host_id);

    let reservations = [];
    for (const venue of venues) {
        let reservation = await reservationService.getReservationsByVenue(venue.id);
        if (reservation.length > 0) {
            reservation[0].venue_name = venue.name;
            reservations.push(reservation[0]);
        }
     }

    let resObj = {
        message: 'reservations retrieved successfully',
        details: {
            reservations
        }
    };

    return successResponse(res, resObj);
}

const cancelReservation = async function(req, res) {

    let reservation_id = req.params.reservation_id;

    let reservation = await reservationService.getReservationById(reservation_id);
    let venueDetails = await venueService.getVenueById(reservation[0].venue_id)
    let profile = await profileService.getDetailsByUserName(reservation[0].user_id);
    // send cancellation email to user
    let user_email = profile[0].email;

    let subject = 'Reservation Cancellation';
    let html = '<p>Your reservation for ' + reservation[0].event_name + ' at ' + venueDetails[0].name + ' on ' + reservation[0].date + ' from ' + reservation[0].start_time + ' to ' + reservation[0].end_time + ' has been cancelled.</p>';

    let userParamBody = {
        "from" : "bookmyvenueteam15@gmail.com",
        "to" : user_email,
        "subject" : subject,
        "message" : html
    }

    let userEmail = await emailService.sendEmail(userParamBody);

    let reservationId = await reservationService.cancelReservation(reservation_id);

    let venueOwnerProfile = await profileService.getDetailsByUserName(venueDetails[0].created_by)
    // send cancellation email to venue owner
    let venueOwner_email = venueOwnerProfile[0].email;

    let subject1 = 'Reservation Cancellation';
    let html1 = '<p> Your venue ' + venueDetails[0].name + ' that has a reservation for ' + reservation[0].event_name + ' on ' + reservation[0].date + ' from ' + reservation[0].start_time + ' to ' + reservation[0].end_time + ' has been cancelled by user ' + reservation[0].user_id + ' </p>';
    let venueOwnerParamBody = {
        "from" : "bookmyvenueteam15@gmail.com",
        "to" : venueOwner_email,
        "subject" : subject1,
        "message" : html1
    }

    let venueOwnerEmail = await emailService.sendEmail(venueOwnerParamBody);

    let resObj = {
        message: 'reservation cancelled successfully',
        details: {
            reservationId
        }
    }

    return successResponse(res, resObj);


}
module.exports = { createReservation, getReservationsByVenue, getReservationsByUser,
                    updateReservation, deleteReservation, cancelReservations, getReservationById ,
                    getReservationsByHost, cancelReservation };