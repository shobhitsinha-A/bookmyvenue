const db = require('../db/db');

const createVenue = async function(venueDto) {

    let { name, price, capacity, address, city, state,
        zipcode, phone_number, description, category, rating } = venueDto;


    try {
        const info = await db('venues')
            .insert({
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
                rating: rating
            });
        const id = info[0];
        console.log('venue inserted  ->' , id);
        return id;
    } catch (e) {
        return e.message;
    }

};

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
    console.log('venue images ->' , info);
    return info;
  } catch (e) {
      return e.message;
  }
};

module.exports = { createVenue , createVenueImages, getVenueImages};