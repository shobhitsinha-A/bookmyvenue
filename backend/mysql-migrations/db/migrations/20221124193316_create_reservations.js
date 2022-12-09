/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function(knex) {
    return knex.schema.createTable('reservations', (table) => {
        table.increments('id').primary();
        table.integer('venue_id').unsigned().notNullable();
        table.string('user_id').notNullable();
        table.string('event_name').notNullable();
        table.integer('expected_no_of_people').notNullable();
        table.date('date').notNullable();
        table.string('start_time').notNullable();
        table.string('end_time').notNullable();
        table.string('description').notNullable();
        table.boolean('is_cancelled').defaultTo(false);
        table.foreign('venue_id').references('id').inTable('venues');
        table.foreign('user_id').references('user_name').inTable('users');
        table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('reservations');
};
