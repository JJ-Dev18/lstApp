import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('eventos', (table) => {
    table.increments('id').primary();
    table.integer('partidoId').references('id').inTable('partidos').notNullable().onDelete('CASCADE');
    table.string('tipo').notNullable();
    table.string('tiempo').notNullable();
    table.integer('jugadorId').references('id').inTable('jugadores').notNullable().onDelete('CASCADE');
    table.integer('planilleroId').references('id').inTable('usuarios').notNullable().onDelete('CASCADE');
    table.text('comentario').nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('eventos');
}
