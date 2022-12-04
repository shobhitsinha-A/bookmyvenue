const express = require('express');
const router = express.Router();

const reservationController = require('../controller/reservation.controller');

//reservation routes
router.post('/', reservationController.createReservation);

router.get('/availability/:venue_id', reservationController.getReservationsByVenue);

router.get('/user/:user_id', reservationController.getReservationsByUser);


module.exports = router;