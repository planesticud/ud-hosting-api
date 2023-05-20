exports.up = function(knex, Promise) {
    return knex.schema.createTable('pages', function(table) {
      table.increments();
      table.string('name').notNullable()
      table.string('last_name')
      table.string('email').notNullable()
      table.string('page_name').notNullable()
      table.timestamp('created_at').defaultTo(knex.fn.now())
      table.timestamp('updated_at').defaultTo(knex.fn.now())
    })
  }
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTable('pages');
  }