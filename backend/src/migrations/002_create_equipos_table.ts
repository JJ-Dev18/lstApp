import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('equipos', (table) => {
    table.increments('id').primary();
    table.string('nombre').notNullable();
    table.string('logo').notNullable();
    table.integer('categoriaId').references('id').inTable('categorias').notNullable().onDelete('CASCADE');
    table.integer('torneoId').unsigned().references('id').inTable('torneos').onDelete('CASCADE');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('equipos') ;
}
