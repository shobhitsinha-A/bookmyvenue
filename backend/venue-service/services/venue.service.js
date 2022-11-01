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

module.exports = { createVenue };