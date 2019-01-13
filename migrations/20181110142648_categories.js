/**
 * Migration stores
 * Creation d'une table categories
 * dans la BDD
 */
exports.up = function(knex, Promise) {
  return knex.schema.createTable('categories', function(table) {
    table.increments();
    table.string('name');
    table.timestamps();
  })
};

/**
 * Suppression d'une table categories
 * dans la BDD
 */
exports.down = function(knex, Promise) {
  return knex.schema.dropTable('categories');
};
