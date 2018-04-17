exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('favoritesong', function(table) {
      table.string('user_id');
      table.string('image');
      table.string('trackName');
      table.string('artistName');
      table.string('GenreName');
      table.string('releaseDate');
      table.string('previewUrl');
      table.string('itunesUrl');
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('favoritesong'),
  ]);
};
