/**
 * Migration stores
 * Creation d'une table posts
 * dans la BDD
 */
exports.up = function(knex, Promise) {
  return knex.schema.createTable('posts', function(table) {
    table.increments();
    table.integer('idUser');
    table.string('idCategorie');
    table.string('title');
    table.string('content');
    table.timestamps();
  });
};

/**
 * Suppression d'une table posts
 * dans la BDD
 */
exports.down = function(knex, Promise) {
  return knex.schema.dropTable('posts');
};
