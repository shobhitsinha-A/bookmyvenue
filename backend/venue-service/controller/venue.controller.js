const venueService = require('../services/venue.service');

const { successResponse, errorResponse } = require('../commons/response.util');

const multer = require('multer');
const fs = require('fs');

const createVenue = async function(req, res) {

        let reqBody = JSON.parse(req.body);

    let { name, price, capacity, address, created_by, city, state,
        zipcode, phone_number, description, category, rating, is_available } = reqBody;

        let venueId = await venueService.createVenue(reqBody);

        let resObj = {
                    message: 'venue ' + name + ' created successfully',
                    details: {
                        venue_id: venueId,
                        name,
                        price,
                        capacity,
                        address,
                        created_by,
                        city,
                        state,
                        zipcode,
                        phone_number,
                        description,
                        category,
                        rating,
                        is_available
                    }
        };
    return successResponse(res, resObj);

};

const updateVenue = async function(req, res) {

        let reqBody = JSON.parse(req.body);

        let { name, price, capacity, address, created_by, city, state,
            zipcode, phone_number, description, category, rating, is_available } = reqBody;

        let venueId = await venueService.updateVenue(reqBody);

        let resObj = {
                    message: 'venue ' + name + ' updated successfully',
                    details: {
                        venue_id: venueId,
                        name,
                        price,
                        capacity,
                        address,
                        created_by,
                        city,
                        state,
                        zipcode,
                        phone_number,
                        description,
                        category,
                        rating,
                        is_available
                    }
        };
        return successResponse(res, resObj);

}
// https://stackoverflow.com/questions/41429355/multer-dynamic-destination-path
const uploadImages =
      imageUpload = multer({
        storage: multer.diskStorage({
            destination: function (req, file, cb) {
                const path = `./uploads/${req.params.venue_id}/`;
                fs.mkdirSync(path, { recursive: true })
                cb(null, path);
            },

            // By default, multer removes file extensions so let's add them back
            filename: function (req, file, cb) {
                cb(null, file.originalname);
            }
        }),
        limits: { fileSize: 10000000 },
        fileFilter: function (req, file, cb) {
            if (!file.originalname.match(/\.(jpg|JPG|webp|jpeg|JPEG|png|PNG|gif|GIF|jfif|JFIF)$/)) {
                req.fileValidationError = 'Only image files are allowed!';
                return cb(null, false);
            }
            cb(null, true);
        }
    }).array('image');

const createVenueImages = async function(req, res) {

    // console.log('req.params.venue_id -> ' + req.params.venue_id);
    // console.log('req.files -> ' + req.files);
    const info = await venueService.createVenueImages(req.params.venue_id, req.files);
    console.log('venue images inserted info ->' , info);
    return successResponse(res, 'venue images created successfully');

};

const getVenueImages = async function(req, res) {

    const info = await venueService.getVenueImages(req.params.venue_id);
    // console.log('venue images fetched info ->' , info);
    return successResponse(res, info);
};

const getVenuesBySearch = async function(req, res) {

    let reqBody = JSON.parse(req.body);
    let venues = await venueService.getVenuesBySearch(reqBody);

    // add images to each venue
    for (let i = 0; i < venues.length; i++) {
        let venue_images = await venueService.getVenueImages(venues[i].id);
        venues[i].venue_images = venue_images;
    }

    let responseObj = {
        "weddings" : [],
        "celebrations": [],
        "meetings": []
    }

    for (let venue of venues) {
        responseObj[venue.category].push(venue);
    }

    let resObj = {
                message: 'venues fetched successfully',
                details: responseObj
    };

    return successResponse(res, resObj);
};

const getVenuesMetadata = async function(req, res) {

    let venues = await venueService.getVenuesMetadata();

    let resObj = {
                message: 'venues metadata fetched successfully',
                details: venues
    };

    return successResponse(res, resObj);
}

const getVenueById = async function(req, res) {

    let venue = await venueService.getVenueById(req.params.venue_id);

    // add images to venue
    let venue_images = await venueService.getVenueImages(venue[0].id);
    venue[0].venue_images = venue_images;

    let resObj = {
                message: 'venue fetched successfully',
                details: venue
    };

    return successResponse(res, resObj);
};

const getVenuesByUserId = async function(req, res) {

    let venues = await venueService.getVenuesByUserId(req.params.user_id);

    // add images to each venue
    for (let i = 0; i < venues.length; i++) {
        let venue_images = await venueService.getVenueImages(venues[i].id);
        venues[i].venue_images = venue_images;
    }

    let responseObj = {
        "weddings" : [],
        "celebrations": [],
        "meetings": []
    }

    for (let venue of venues) {
        responseObj[venue.category].push(venue);
    }
        let resObj = {
                    message: 'venues fetched successfully',
                    details: responseObj
        };

        return successResponse(res, resObj);
}
const createBookmarks = async function(req, res) {

    let reqBody = JSON.parse(req.body);

    let { user_id, venue_id } = reqBody;

    let bookmarkId = await venueService.createBookmarks(reqBody);

    let resObj = {
                message: 'bookmark created successfully',
                details: {
                    bookmark_id: bookmarkId,
                    user_id,
                    venue_id
                }
    };

    return successResponse(res, resObj);
};

const getBookmarks = async function(req, res) {

    let bookmarks = await venueService.getBookmarks(req.params.user_id);

    let bookmarked_venues = [];
    for (let bookmark of bookmarks) {
        let venue = await venueService.getVenueById(bookmark.venue_id);
        let venue_images = await venueService.getVenueImages(bookmark.venue_id);
        venue[0].venue_images = venue_images;

        bookmarked_venues.push(venue[0]);
    }

    let resObj = {
                message: 'bookmarks fetched successfully',
                details: bookmarked_venues
    };

    return successResponse(res, resObj);
}

module.exports = { createVenue, updateVenue,  uploadImages, createVenueImages, getVenueImages,
                    getVenuesBySearch, getVenuesMetadata, getVenueById, getVenuesByUserId,
                    createBookmarks, getBookmarks };