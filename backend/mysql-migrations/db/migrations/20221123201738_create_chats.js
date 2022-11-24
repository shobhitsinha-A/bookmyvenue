/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('chats', (table) => {

        table.increments('id').primary();
        table.string('from_user').notNullable();
        table.string('to_user').notNullable();
        table.string('message').notNullable();
        table.string('time').notNullable();
        table.string('status');
        table.foreign('from_user').references('user_name').inTable('users');
        table.foreign('to_user').references('user_name').inTable('users');
        table.timestamps(true, true);

    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('chats');
};
