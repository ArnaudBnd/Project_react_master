/**
 * Migration stores
 * Creation d'une table users
 * dans la BDD
 */
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table) {
    table.increments();
    table.string('username').notNullable().unique();
    table.string('email').notNullable().unique();
    table.string('password_digest').notNullable();
    table.string('resetPasswordToken').notNullable();
    table.timestamps();
  });
};

/**
 * Suppression d'une table users
 * dans la BDD
 */
exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
