const venueService = require('../services/venue.service');

const { successResponse, errorResponse } = require('../commons/response.util');

const multer = require('multer');
const fs = require('fs');

const createVenue = async function(req, res) {

        let reqBody = JSON.parse(req.body);

    let { name, price, capacity, address, city, state,
        zipcode, phone_number, description, category, rating } = reqBody;

        let venueId = await venueService.createVenue(reqBody);

        let resObj = {
                    message: 'venue ' + name + ' created successfully',
                    details: {
                        venue_id: venueId,
                        name,
                        price,
                        capacity,
                        address,
                        city,
                        state,
                        zipcode,
                        phone_number,
                        description,
                        category,
                        rating
                    }
        };
    return successResponse(res, resObj);

};

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
}

const getVenuesMetadata = async function(req, res) {

            let venues = await venueService.getVenuesMetadata();

            let resObj = {
                        message: 'venues metadata fetched successfully',
                        details: venues
            };

            return successResponse(res, resObj);
}

module.exports = { createVenue,  uploadImages, createVenueImages, getVenueImages,
                    getVenuesBySearch, getVenuesMetadata };