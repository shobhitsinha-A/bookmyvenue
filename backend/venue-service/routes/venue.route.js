const express = require('express');
const router = express.Router();

const venueController = require('../controller/venue.controller');

//venue routes
router.post('/venues', venueController.createVenue);

router.put('/venues', venueController.updateVenue);

router.delete('/venues/:venue_id', venueController.deleteVenue);

router.post('/venues/:venue_id/images',venueController.uploadImages, venueController.createVenueImages);

router.get('/venues/:venue_id/images', venueController.getVenueImages);

router.post('/venues/search', venueController.getVenuesBySearch);

router.get('/venues/filter', venueController.getVenuesMetadata);

router.get('/venues/:venue_id', venueController.getVenueById);

router.get('/venues/created_by/:user_id', venueController.getVenuesByUserId);

router.post('/venues/bookmarks', venueController.createBookmarks);

router.get('/venues/bookmarks/:user_id', venueController.getBookmarks);

router.get('/venues/bookmarks/:user_id/:venue_id', venueController.isVenueBookmarked);

router.delete('/venues/bookmarks/:user_id/:venue_id', venueController.deleteBookmark);

router.post('/venues/ratings', venueController.createRating);

router.get('/venues/ratings/:user_id', venueController.getRatingsByUserId);

router.get('/venues/past/reserved/:user_id', venueController.getPastReservedVenuesByUserId);

// upcoming reserved venues
router.get('/venues/upcoming/reserved/:user_id', venueController.getUpcomingReservedVenuesByUserId);

router.get('/venues/avg/rating', venueController.getAvgRating);

module.exports = router;

