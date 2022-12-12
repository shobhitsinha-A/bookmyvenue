/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('users', (table) => {
    table.string('user_name').primary();
    table.string('e_pass').notNullable();
    table.integer('role_id').notNullable();
    table.boolean('is_online').defaultTo(false);
    table.foreign('role_id').references('role_id').inTable('roles');
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
