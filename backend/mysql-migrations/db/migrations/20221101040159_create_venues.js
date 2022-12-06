/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

/**
 * name, price, capacity, address, city, state,
 *         zipcode, phone_number, description, category, rating
 * @param knex
 * @returns {Knex.SchemaBuilder}
 */
exports.up = function(knex) {
    return knex.schema.createTable('venues', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.integer('price');
        table.integer('capacity').notNullable();
        table.string('address').notNullable();
        table.string('created_by').notNullable();
        table.string('city');
        table.string('state');
        table.string('zipcode');
        table.string('phone_number');
        table.string('description');
        table.string('category');
        table.integer('rating');
        table.boolean('is_available').defaultTo(true);
        table.foreign('created_by').references('user_name').inTable('users');

        //table.foreign('role_id').references('role_id').inTable('roles');
        table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('venues');
};
