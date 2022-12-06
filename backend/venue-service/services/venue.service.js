const db = require('../db/db');

const createVenue = async function(venueDto) {

    let { name, price, capacity, address, created_by, city, state,
        zipcode, phone_number, description, category, rating, is_available } = venueDto;


    try {
        const info = await db('venues')
            .insert({
                name: name,
                price : price,
                capacity: capacity,
                address: address,
                created_by: created_by,
                city: city,
                state: state,
                zipcode: zipcode,
                phone_number: phone_number,
                description: description,
                category: category,
                rating: rating,
                is_available: is_available
            });
        const id = info[0];
        console.log('venue inserted  ->' , id);
        return id;
    } catch (e) {
        return e.message;
    }

};

const updateVenue = async function(venueDto) {
    let { id, name, price, capacity, address, city, state,
        zipcode, phone_number, description, category, rating, is_available } = venueDto;
    try {
        const info = await db('venues')
            .where('id', id)
            .update({
                name: name,
                price : price,
                capacity: capacity,
                address: address,
                city: city,
                state: state,
                zipcode: zipcode,
                phone_number: phone_number,
                description: description,
                category: category,
                rating: rating,
                is_available: is_available
            });

        console.log('venue updated  ->' , info);
        return info;
    } catch (e) {
        return e.message;
    }
}

const deleteVenue = async function(venue_id) {
    try {
        const info = await db('venues')
            .where('id', venue_id)
            .del();
        // console.log('venue ->' , info);
        return info;
    } catch (e) {
        return e.message;
    }
}
const createVenueImages = async function(venue_id, files) {

    let venue_images = []
    files.forEach(file => {
        venue_images.push({venue_id: venue_id, image_name: file.originalname});
    });
    try {
        const info = await db('venue_images')
            .insert(venue_images);

        return info;
    } catch (e) {
        return e.message;
    }

};

const getVenueImages = async function(venue_id) {
  try {
    const info = await db('venue_images')
        .select('image_name')
        .where('venue_id', venue_id);
    // console.log('venue images ->' , info);
    return info;
  } catch (e) {
      return e.message;
  }
};

const getVenuesBySearch = async function(searchDto) {
    try {

        let selectString = '';

        let  query =  db('venues')
            .select('id', 'name', 'price', 'capacity', 'address', 'city', 'state', 'zipcode', 'phone_number', 'description', 'category', 'rating');

        if (searchDto.city) {
            query = query.whereIn('city', searchDto.city);
        }
        if (searchDto.state) {
            query = query.whereIn('state', searchDto.state);
        }
        if (searchDto.capacity) {
            query = query.whereBetween('capacity', [searchDto.capacity.low, searchDto.capacity.high]);
        }

        if (searchDto.price) {
            query = query.whereBetween('price', [searchDto.price.low, searchDto.price.high]);
        }
        if (searchDto.rating) {
            query = query.whereBetween('rating', [searchDto.rating.low, searchDto.rating.high]);
        }

        const info = await query;
        // console.log('venues ->' , info);
        return info;
    } catch (e) {
        return e.message;
    }
}

const getVenuesMetadata = async function(filterDto) {
    try {
        let result = {};
        let locations =  await db('venues')
            .distinct('city', 'state')

        let prices = await db('venues')
            .min('price as min_price')
            .min('capacity as min_capacity')
            .max('price as max_price')
            .max('capacity as max_capacity')

        result.cities = [];
        result.states = [];

        for (let location of locations) {
            result.cities.push(location.city);
            result.states.push(location.state);
        }

        result.min_price = prices[0].min_price;
        result.max_price = prices[0].max_price;
        result.min_capacity = prices[0].min_capacity;
        result.max_capacity = prices[0].max_capacity;

        // console.log('venues metadata ..->.. ' , locations);
        // console.log('venues metadata 2 ..->.. ' , prices);
        return result;
    } catch (e) {
        return e.message;
    }
}

const getVenueById = async function(venue_id) {
    try {
        const info = await db('venues')
            .select('id', 'name', 'price', 'capacity', 'address', 'city', 'state', 'zipcode', 'phone_number', 'description', 'category', 'rating')
            .where('id', venue_id);
        // console.log('venue ->' , info);
        return info;
    } catch (e) {
        return e.message;
    }
}

const getVenuesByUserId = async function(user_id) {
    try {
        const info = await db('venues')
            .select('id', 'name', 'price', 'capacity', 'address', 'city', 'state', 'zipcode', 'phone_number', 'description', 'category', 'rating')
            .where('created_by', user_id);
        // console.log('venue ->' , info);
        return info;
    } catch (e) {
        return e.message;
    }
}
const createBookmarks = async function(bookmarkDto) {
    let { user_id, venue_id } = bookmarkDto;
    try {
        const info = await db('bookmarks')
            .insert({
                user_id: user_id,
                venue_id: venue_id
            });
        const id = info[0];
        console.log('bookmark inserted  ->' , id);
        return id;
    } catch (e) {
        return e.message;
    }
};

const getBookmarks = async function(user_id) {
    try {
        const info = await db('bookmarks')
            .select('venue_id')
            .where('user_id', user_id);
        console.log('bookmarks ->' , info);
        return info;
    } catch (e) {
        return e.message;
    }
}

const deleteBookmark = async function(user_id, venue_id) {
    try {
        const info = await db('bookmarks')
            .where({'user_id': user_id, 'venue_id': venue_id})
            .del();
        console.log('bookmark ->' , info);
        return info;
    } catch (e) {
        return e.message;
    }
}

module.exports = { createVenue , updateVenue, deleteVenue
    , createVenueImages, getVenueImages, getVenuesBySearch, getVenuesMetadata,
    getVenueById, getVenuesByUserId, createBookmarks, getBookmarks, deleteBookmark };