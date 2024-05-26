import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('estadisticas', (table) => {
    table.increments('id').primary();
    table.integer('jugadorId').references('id').inTable('jugadores').notNullable().onDelete('CASCADE');
    table.integer('partidoId').references('id').inTable('partidos').notNullable().onDelete('CASCADE');
    table.integer('goles').defaultTo(0);
    table.integer('bloqueos').defaultTo(0);
    table.integer('intercepciones').defaultTo(0);
    table.integer('asistencias').defaultTo(0);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('estadisticas');
}
