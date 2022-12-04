const express = require('express');
const router = express.Router();

const venueController = require('../controller/venue.controller');

//venue routes
router.post('/venues', venueController.createVenue);

router.post('/venues/:venue_id/images',venueController.uploadImages, venueController.createVenueImages);

router.get('/venues/:venue_id/images', venueController.getVenueImages);

router.post('/venues/search', venueController.getVenuesBySearch);

router.get('/venues/filter', venueController.getVenuesMetadata);

router.get('/venues/:venue_id', venueController.getVenueById);

module.exports = router;

