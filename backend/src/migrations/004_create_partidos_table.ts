import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('partidos', (table) => {
    table.increments('id').primary();
    table.integer('equipo1Id').references('id').inTable('equipos').notNullable().onDelete('CASCADE');
    table.integer('equipo2Id').references('id').inTable('equipos').notNullable().onDelete('CASCADE');
    table.timestamp('fecha').notNullable();
    table.integer('duracion').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('partidos');
}
