const venueService = require('../services/venue.service');
const reservationService = require('../services/reservation.service');

const reservationController = require('../controller/reservation.controller');

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

    try {
        let reqBody = JSON.parse(req.body);
        let venues = await venueService.getVenuesBySearch(reqBody);

        // add images to each venue
        for (let i = 0; i < venues.length; i++) {
            let venue_images = await venueService.getVenueImages(venues[i].id);
            venues[i].venue_images = venue_images;
        }

        // add the aggregated rating
        for (let i = 0; i < venues.length; i++) {
            let venue_rating = await venueService.getAvgRatingByVenueId(venues[i].id);
            if (venue_rating.length > 0) {
                venues[i].rating = venue_rating[0].avg_rating;
            } else {
                venues[i].rating = 0;
            }
        }

        let responseObj = {
            "Weddings" : [],
            "Celebrations": [],
            "Meetings": []
        }

        for (let venue of venues) {
            const firstLetter = venue.category.charAt(0)
            const firstLetterCap = firstLetter.toUpperCase()
            const remainingLetters = venue.category.slice(1)

            const capitalizedWord = firstLetterCap + remainingLetters

            responseObj[capitalizedWord].push(venue);
        }

        let resObj = {
            message: 'venues fetched successfully',
            details: responseObj
        };

        return successResponse(res, resObj);
    }
    catch (err) {
        console.log(err);
        return errorResponse(res, err);
    }
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

    try {
        let venue = await venueService.getVenueById(req.params.venue_id);

        // add images to venue
        let venue_images = await venueService.getVenueImages(venue[0].id);
        venue[0].venue_images = venue_images;

        // add the aggregated rating
        let venue_rating = await venueService.getAvgRatingByVenueId(venue[0].id);
        if (venue_rating.length > 0) {
            venue[0].rating = venue_rating[0].avg_rating;
        } else {
            venue[0].rating = "0";
        }
        let resObj = {
            message: 'venue fetched successfully',
            details: venue
        };

        return successResponse(res, resObj);
    } catch (err) {
        console.log(err);
        return errorResponse(res, err);
    }

};

const getVenuesByUserId = async function(req, res) {

    try {
        let venues = await venueService.getVenuesByUserId(req.params.user_id);

        // add images to each venue
        for (let i = 0; i < venues.length; i++) {
            let venue_images = await venueService.getVenueImages(venues[i].id);
            venues[i].venue_images = venue_images;
        }

        // add the aggregated rating
        for (let i = 0; i < venues.length; i++) {
            let venue_rating = await venueService.getAvgRatingByVenueId(venues[i].id);
            if (venue_rating.length > 0) {
                venues[i].rating = venue_rating[0].avg_rating;
            } else {
                venues[i].rating = "0";
            }
        }

        let responseObj = {
            "Weddings" : [],
            "Celebrations": [],
            "Meetings": []
        }

        for (let venue of venues) {
            const firstLetter = venue.category.charAt(0)
            const firstLetterCap = firstLetter.toUpperCase()
            const remainingLetters = venue.category.slice(1)

            const capitalizedWord = firstLetterCap + remainingLetters
            responseObj[capitalizedWord].push(venue);
        }

        let resObj = {
            message: 'venues fetched successfully',
            details: responseObj
        };

        return successResponse(res, resObj);
    } catch (e) {
        console.log(e);
        return errorResponse(res, e);
    }

}

const deleteVenue = async function(req, res) {
    // cancel the reservations
    let canceledReservations =  await reservationController.cancelReservations(req, null);
    console.log('canceledReservations -> ', canceledReservations);

    let reservations = await reservationService.getReservationsByVenueId(req.params.venue_id);
    // delete the reservations
    for (let i = 0; i < reservations.length; i++) {
       let deletedReservation =  await reservationService.deleteReservation(reservations[i].id);
       console.log('deletedReservation -> ', deletedReservation);
    }

    // delete the venue images
    let venue_images =  venueService.deleteImageByVenueId(req.params.venue_id);
    console.log('deleted venue_images -> ', venue_images);
    // delete the ratings
   let deletedRatings =  venueService.deleteRatingsByVenueId(req.params.venue_id);
    console.log('deletedRatings -> ', deletedRatings);
    // delete the bookmarks
    let deletedBookmarks =  venueService.deleteBookmarksByVenueId(req.params.venue_id);
    console.log('deletedBookmarks -> ', deletedBookmarks);
    // delete the venue

    let venue =  venueService.deleteVenue(req.params.venue_id);

    let resObj = {
                message: 'venue deleted successfully',
                details: venue
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
    try {
        let bookmarks = await venueService.getBookmarks(req.params.user_id);

        let bookmarked_venues = [];
        for (let bookmark of bookmarks) {
            let venue = await venueService.getVenueById(bookmark.venue_id);
            let venue_images = await venueService.getVenueImages(bookmark.venue_id);
            venue[0].venue_images = venue_images;

            bookmarked_venues.push(venue[0]);
        }

        // add the aggregated rating
        for (let i = 0; i < bookmarked_venues.length; i++) {
            let venue_rating = await venueService.getAvgRatingByVenueId(bookmarked_venues[i].id);
            if (venue_rating.length > 0) {
                bookmarked_venues[i].rating = venue_rating[0].avg_rating;
            } else {
                bookmarked_venues[i].rating = "0";
            }
        }

        let responseObj = {
            "Weddings" : [],
            "Celebrations": [],
            "Meetings": []
        }

        for (let venue of bookmarked_venues) {
            const firstLetter = venue.category.charAt(0)
            const firstLetterCap = firstLetter.toUpperCase()
            const remainingLetters = venue.category.slice(1)

            const capitalizedWord = firstLetterCap + remainingLetters
            responseObj[capitalizedWord].push(venue);
        }

        let resObj = {
            message: 'bookmarks fetched successfully',
            details: responseObj
        };

        return successResponse(res, resObj);
    } catch (e) {
        console.log(e);
        return errorResponse(res, e);
    }

}

const isVenueBookmarked = async function(req, res) {

        let user_id = req.params.user_id;
        let venue_id = req.params.venue_id;

        let isBookmarked = await venueService.isVenueBookmarked(user_id, venue_id);

        let resObj = {
                    message: 'bookmark fetched successfully',
                    is_bookmarked: isBookmarked
        };

        return successResponse(res, resObj);
}
const deleteBookmark = async function(req, res) {

        let bookmark = await venueService.deleteBookmark(req.params.user_id, req.params.venue_id);

        let resObj = {
                    message: 'bookmark deleted successfully',
                    details: bookmark
        };

        return successResponse(res, resObj);
}

const createRating = async function(req, res) {

        let reqBody = JSON.parse(req.body);

        let { user_id, venue_id, rating } = reqBody;

        let ratingId = await venueService.createRating(reqBody);

        let resObj = {
                    message: 'rating created successfully',
                    details: {
                        rating_id: ratingId,
                        user_id,
                        venue_id,
                        rating
                    }
        };

        return successResponse(res, resObj);
}

const getRatingsByUserId = async function(req, res) {

        let ratings = await venueService.getRatingsByUserId(req.params.user_id);

        // ratings -> [ { venue_id: 1, rating: 4 }, { venue_id: 2, rating: 3 } ]

        let rated_venues = [];
        for (let rating of ratings) {
            let venue = await venueService.getVenueById(rating.venue_id);
            console.log('venue -> ', venue);
            venue[0].rating = rating.rating;

            rated_venues.push(venue[0]);
        }
        let resObj = {
                    message: 'ratings fetched successfully',
                    details: rated_venues
        };

        return successResponse(res, resObj);
}

const getPastReservedVenuesByUserId = async function(req, res) {

    try {
        let reservations = await venueService.getPastReservedVenuesByUserId(req.params.user_id);

        let reserved_venues = [];

        for (let reservation of reservations) {
            let venue = await venueService.getVenueById(reservation.venue_id);
            let ratings = await venueService.getRatingsByUserIdAndVenueId(req.params.user_id, venue[0].id);
            if (ratings.length > 0) {
                venue[0].rating = ratings[0].rating;
            } else {
                venue[0].rating = 0;
            }
            reserved_venues.push(venue[0]);
        }


        let resObj = {
            message: 'past reserved venues fetched successfully',
            details: reserved_venues
        };

        return successResponse(res, resObj);
    } catch (e) {
        console.log('error -> ', e);
        return errorResponse(res, e);
    }

}

const getUpcomingReservedVenuesByUserId = async function(req, res) {

    try {
        let reservations = await venueService.getUpcomingReservedVenuesByUserId(req.params.user_id);

        let reserved_venues = [];

        for (let reservation of reservations) {
            let venue = await venueService.getVenueById(reservation.venue_id);
            let ratings = await venueService.getRatingsByUserIdAndVenueId(req.params.user_id, venue[0].id);

            if (ratings.length > 0) {
                venue[0].rating = ratings[0].rating;
            } else {
                venue[0].rating = 0;
            }
            reserved_venues.push(venue[0]);
        }

        let resObj = {
            message: 'upcoming reserved venues fetched successfully',
            details: reserved_venues
        };

        return successResponse(res, resObj);
    } catch (e) {
        console.log('error -> ', e);
        return errorResponse(res, e);
    }
}

const getAvgRating = async function(req, res) {

            let avgRating = await venueService.getAvgRating();

            let resObj = {
                        message: 'avg rating fetched successfully',
                        details: avgRating
            };

            return successResponse(res, resObj);
}
module.exports = { createVenue, updateVenue, deleteVenue,  uploadImages, createVenueImages, getVenueImages,
                    getVenuesBySearch, getVenuesMetadata, getVenueById, getVenuesByUserId,
                    createBookmarks, getBookmarks, isVenueBookmarked, deleteBookmark, createRating, getRatingsByUserId,
                    getPastReservedVenuesByUserId , getUpcomingReservedVenuesByUserId, getAvgRating };