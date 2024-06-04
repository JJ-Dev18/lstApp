import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('jugadores', (table) => {
    table.increments('id').primary();
    table.string('nombre').notNullable();
    table.string('posicion').notNullable();
    table.string('fotoUrl').notNullable();
    table.integer('numero').notNullable() ;
    table.integer('equipoId').references('id').inTable('equipos').notNullable().onDelete('CASCADE');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('jugadores') ;
}
