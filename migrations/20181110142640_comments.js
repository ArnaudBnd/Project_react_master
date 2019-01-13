/**
 * Migration stores
 * Creation d'une table comments
 * dans la BDD
 */
exports.up = function(knex, Promise) {
  return knex.schema.createTable('comments', function(table) {
    table.increments();
    table.string('comment').notNullable();
    table.string('user').notNullable();
    table.string('date').notNullable();
    table.integer('ID_post');
  })
};

/**
 * Suppression d'une table comments
 * dans la BDD
 */
exports.down = function(knex, Promise) {
  return knex.schema.dropTable('comments');
};
