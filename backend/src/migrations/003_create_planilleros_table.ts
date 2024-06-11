import { Knex } from "knex";

exports.up = function(knex:Knex) {
    return knex.schema.createTable('planilleros', function(table) {
      table.increments('id').primary();
      table.integer('usuarioId').unsigned().notNullable();
      table.integer('torneoId').unsigned().notNullable();
      table.foreign('usuarioId').references('id').inTable('usuarios').onDelete('CASCADE');
      table.foreign('torneoId').references('id').inTable('torneos').onDelete('CASCADE');
    });
  };
  
  exports.down = function(knex:Knex) {
    return knex.schema.dropTable('planilleros');
  };
  