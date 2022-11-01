/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('venue_images', (table) => {
        table.increments('id').primary();
        table.integer('venue_id').unsigned().notNullable();
        table.string('image_name').nullable();
        table.foreign('venue_id').references('id').inTable('venues');
        table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('venue_images');
};
