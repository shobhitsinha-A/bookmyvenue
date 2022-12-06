/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('bookmarks', (table) => {
        table.increments('id').primary();
        table.string('user_id').notNullable();
        table.integer('venue_id').unsigned().notNullable();
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
    return knex.schema.dropTable('bookmarks');
};
