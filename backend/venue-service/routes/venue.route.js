const express = require('express');
const router = express.Router();


const venueController = require('../controller/venue.controller');

//venes
router.post('/venues', venueController.createVenue);

router.post('/venues/:venue_id/images',venueController.uploadImages, venueController.createVenueImages);

router.get('/venues/:venue_id/images', venueController.getVenueImages);
module.exports = router;

