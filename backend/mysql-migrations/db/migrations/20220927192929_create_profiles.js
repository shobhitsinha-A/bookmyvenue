/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('profiles', (table) => {
    // table.increments('id').primary();
    table.string('user_name').primary();
    table.string('email').notNullable();
    table.string('first_name').notNullable();
    table.string('last_name').nullable();
    table.string('phone_no').notNullable();
    table.foreign('user_name').references('user_name').inTable('users');
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('profiles');
};
